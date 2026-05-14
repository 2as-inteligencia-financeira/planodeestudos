import type { TemaEstudoCaso } from '../data/sedes2026_estudodecaso'
import { supabase } from '../lib/supabaseClient'

export type ResultadoCorrecao = {
  notaCAC: number
  notaOT: number
  notaDLP: number
  notaFinal: number
  aprovado: boolean
  feedbackCAC: string
  feedbackOT: string
  feedbackDLP: string
  pontosCobertosFaltando: { cobertos: string[]; faltando: string[] }
  pontosFortes: string[]
  aMelhorar: string[]
  recomendacao: string
}

export type TentativaCorrecao = {
  temaId: string
  data: string
  notaFinal: number
  resposta: string
}

const HIST_KEY = 'pec_correcoes'

export function getHistorico(): Record<string, TentativaCorrecao[]> {
  try {
    return JSON.parse(localStorage.getItem(HIST_KEY) || '{}')
  } catch {
    return {}
  }
}

export function salvarTentativa(t: TentativaCorrecao) {
  const hist = getHistorico()
  if (!hist[t.temaId]) hist[t.temaId] = []
  hist[t.temaId].unshift(t)
  hist[t.temaId] = hist[t.temaId].slice(0, 10)
  localStorage.setItem(HIST_KEY, JSON.stringify(hist))
}

async function salvarTentativaSupabase(
  temaId: string,
  notaFinal: number,
  resposta: string,
  resultado: ResultadoCorrecao,
) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  await supabase.from('correcoes').insert({
    user_id: user.id,
    tema_id: temaId,
    nota_final: notaFinal,
    resposta,
    resultado,
  })
}

export async function corrigirComIA(
  tema: TemaEstudoCaso,
  resposta: string,
): Promise<ResultadoCorrecao> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined

  let resultado: ResultadoCorrecao

  if (supabaseUrl) {
    // Chama a Edge Function — chave Anthropic fica segura no servidor
    const { data: { session } } = await supabase.auth.getSession()
    const resp = await fetch(`${supabaseUrl}/functions/v1/corrigir`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${session?.access_token ?? ''}`,
      },
      body: JSON.stringify({ tema, resposta }),
    })
    if (!resp.ok) {
      const errText = await resp.text()
      throw new Error(`Erro na Edge Function (${resp.status}): ${errText.slice(0, 200)}`)
    }
    resultado = await resp.json() as ResultadoCorrecao
  } else {
    // Fallback direto — modo dev sem Supabase configurado
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined
    if (!apiKey) throw new Error('Configure VITE_SUPABASE_URL ou VITE_ANTHROPIC_API_KEY no .env')

    const userPrompt = `TEMA: ${tema.titulo}
COMANDO: ${tema.comando}
PONTOS OBRIGATÓRIOS: ${JSON.stringify(tema.pontosObrigatorios)}
LEGISLAÇÃO RELEVANTE: ${JSON.stringify(tema.legislacaoRelevante)}

CRITÉRIOS (fórmula: [(CAC×7)+(OT×1,5)+(DLP×1,5)]÷0,3):
- CAC (Conteúdo e Atendimento ao Comando): peso 7, nota 0-3
- OT (Organização Textual): peso 1,5, nota 0-3
- DLP (Domínio da Língua Portuguesa): peso 1,5, nota 0-3

RESPOSTA DO CANDIDATO:
${resposta}

Retorne JSON exatamente neste formato (sem markdown, sem texto extra):
{
  "notaCAC": 0.0,
  "notaOT": 0.0,
  "notaDLP": 0.0,
  "notaFinal": 0,
  "aprovado": false,
  "feedbackCAC": "",
  "feedbackOT": "",
  "feedbackDLP": "",
  "pontosCobertosFaltando": { "cobertos": [], "faltando": [] },
  "pontosFortes": [],
  "aMelhorar": [],
  "recomendacao": ""
}`

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1200,
        system:
          'Você é um avaliador de provas discursivas de concursos públicos brasileiros, especializado na banca Quadrix. Seja criterioso e justo. Retorne APENAS JSON válido, sem markdown, sem texto adicional.',
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!resp.ok) {
      const errText = await resp.text()
      throw new Error(`Erro na API (${resp.status}): ${errText.slice(0, 200)}`)
    }

    const data = await resp.json()
    const text: string = data.content[0].text
    const clean = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim()
    resultado = JSON.parse(clean) as ResultadoCorrecao
  }

  // Salva histórico local e no Supabase (se autenticado)
  salvarTentativa({ temaId: tema.id, data: new Date().toISOString(), notaFinal: resultado.notaFinal, resposta })
  salvarTentativaSupabase(tema.id, resultado.notaFinal, resposta, resultado)

  return resultado
}
