import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { tema, resposta } = await req.json()

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

    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY')
    if (!anthropicKey) throw new Error('ANTHROPIC_API_KEY não configurada na edge function')

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
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
      throw new Error(`Erro na API Anthropic (${resp.status}): ${errText.slice(0, 200)}`)
    }

    const data = await resp.json()
    const text: string = data.content[0].text
    const clean = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim()
    const resultado = JSON.parse(clean)

    return new Response(JSON.stringify(resultado), {
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    })
  }
})
