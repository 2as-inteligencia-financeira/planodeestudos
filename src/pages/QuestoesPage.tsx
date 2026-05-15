import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useConcurso } from '../contexts/ConcursoContext'
import type { Dificuldade as DificuldadeQ } from '../data/sedes2026_questoes'

const QUESTOES_KEY = 'pec_questoes_respondidas'

type ResultadoCE = 'certo' | 'errado' | 'branco'

function getRespostas(): Record<string, 'acerto' | 'erro'> {
  try { return JSON.parse(localStorage.getItem(QUESTOES_KEY) || '{}') } catch { return {} }
}
function saveResposta(id: string, resultado: 'acerto' | 'erro') {
  const atual = getRespostas()
  atual[id] = resultado
  localStorage.setItem(QUESTOES_KEY, JSON.stringify(atual))
}

const DISC_LABELS: Record<string, string> = {
  lp: 'Língua Portuguesa',
  df: 'Conhecimentos do DF',
  tga: 'TGA',
  gp: 'Gestão de Pessoas',
  afo: 'AFO',
  osm: 'OS&M',
  projetos: 'Projetos',
  suas: 'SUAS/LOAS',
  direitos: 'Direitos',
  programas: 'Programas DF',
}

function getDisciplinaLabel(id: string): string {
  return DISC_LABELS[id] || id
}

const DIFIC_LABELS: Record<DificuldadeQ, string> = {
  FACIL: 'Fácil',
  MEDIO: 'Médio',
  DIFICIL: 'Difícil',
}

const DIFIC_STYLE: Record<DificuldadeQ, React.CSSProperties> = {
  FACIL: { background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' },
  MEDIO: { background: '#fef9c3', color: '#713f12', border: '1px solid #fef08a' },
  DIFICIL: { background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' },
}

const monoLabel: React.CSSProperties = {
  fontFamily: '"DM Mono", monospace',
  fontSize: '0.65rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  border: '1px solid #e2e2dc',
  borderRadius: 0,
  background: '#ffffff',
  color: '#0a0a0a',
  fontSize: '0.8rem',
  appearance: 'none' as const,
  cursor: 'pointer',
}

type Modo = 'quiz' | 'revisao'
type OpcaoKey = 'a' | 'b' | 'c' | 'd' | 'e'

// ========================
// CERTO/ERRADO MODE
// ========================

interface QuizCEState {
  acertos: number
  erros: number
  brancos: number
  respondida: ResultadoCE | null
  revelado: boolean
}

function QuizCertoErrado({
  questao,
  bancaPerfil,
  onNext,
}: {
  questao: Record<string, unknown>
  bancaPerfil: Record<string, unknown>
  onNext: (resultado: ResultadoCE) => void
}) {
  const [state, setState] = useState<QuizCEState>({
    acertos: 0, erros: 0, brancos: 0, respondida: null, revelado: false,
  })

  const gabarito = questao.gabarito as string | undefined // 'certo' | 'errado'

  const gaboritoBool: boolean | null =
    gabarito === 'certo' || gabarito === 'C' ? true :
    gabarito === 'errado' || gabarito === 'E' ? false : null

  const enunciado = questao.enunciado as string ?? questao.assertiva as string ?? ''
  const comentario = questao.comentario as string ?? questao.justificativa as string ?? ''
  const disciplina = questao.disciplinaId as string ?? questao.disciplina as string ?? ''
  const topico = questao.topico as string ?? ''

  const estilo = (bancaPerfil as Record<string, unknown>).estilo as Record<string, unknown> | undefined
  const penalizaErro = estilo?.penalizaErro as boolean ?? true
  const penalizacao = estilo?.fatorPenalizacao as number ?? -1

  function responder(escolha: ResultadoCE) {
    if (state.revelado) return
    setState(prev => ({ ...prev, respondida: escolha, revelado: true }))
  }

  function avancar() {
    const r = state.respondida
    onNext(r ?? 'branco')
    setState({ acertos: 0, erros: 0, brancos: 0, respondida: null, revelado: false })
  }

  const acertou = state.respondida === 'branco'
    ? null
    : (state.respondida === 'certo') === gaboritoBool

  return (
    <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '12px 20px', background: '#fafaf7', borderBottom: '1px solid #e2e2dc', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        {disciplina && (
          <span style={{ ...monoLabel, background: '#f0f0ea', padding: '2px 8px', color: '#606060' }}>
            {getDisciplinaLabel(disciplina)}
          </span>
        )}
        {topico && (
          <span style={{ ...monoLabel, color: '#999999', marginLeft: 'auto' }}>{topico}</span>
        )}
        {/* Badge Cebraspe penaliza erro */}
        {penalizaErro && (
          <span style={{ ...monoLabel, padding: '2px 8px', background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', fontSize: '0.58rem' }}>
            CEBRASPE — PENALIZA ERRO
          </span>
        )}
      </div>

      {/* Enunciado */}
      <div style={{ padding: '24px 20px 16px' }}>
        <p style={{ fontSize: '0.95rem', color: '#0a0a0a', lineHeight: 1.8, fontWeight: 400 }}>
          {enunciado}
        </p>
      </div>

      {/* Botões CERTO / ERRADO / BRANCO */}
      {!state.revelado ? (
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => responder('certo')}
              style={{
                flex: 1,
                padding: '18px 12px',
                fontSize: '1.1rem',
                fontWeight: 800,
                background: '#d1fae5',
                color: '#065f46',
                border: '2px solid #34d399',
                borderRadius: 8,
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.1s',
              }}
            >
              ✓ CERTO
            </button>
            <button
              onClick={() => responder('errado')}
              style={{
                flex: 1,
                padding: '18px 12px',
                fontSize: '1.1rem',
                fontWeight: 800,
                background: '#fee2e2',
                color: '#991b1b',
                border: '2px solid #f87171',
                borderRadius: 8,
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.1s',
              }}
            >
              ✗ ERRADO
            </button>
          </div>
          <button
            onClick={() => responder('branco')}
            style={{
              width: '100%',
              padding: '10px',
              background: 'none',
              color: '#606060',
              border: '1px dashed #c0c0ba',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '0.82rem',
              ...monoLabel,
            }}
          >
            DEIXAR EM BRANCO (dúvida)
          </button>
        </div>
      ) : (
        <>
          {/* Resultado */}
          <div style={{ padding: '0 20px 20px' }}>
            {state.respondida === 'branco' ? (
              <div style={{ padding: '16px', background: '#f9fafb', border: '1px solid #e2e2dc', borderRadius: 8, marginBottom: 12 }}>
                <p style={{ ...monoLabel, color: '#606060', marginBottom: 6 }}>Deixou em branco</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0a0a0a' }}>
                  Gabarito: a assertiva é {gaboritoBool ? 'CERTA' : 'ERRADA'}
                </p>
                {penalizaErro && (
                  <p style={{ ...monoLabel, color: '#92400e', fontSize: '0.6rem', marginTop: 4 }}>
                    Decisão correta: branco não penaliza
                  </p>
                )}
              </div>
            ) : acertou ? (
              <div style={{ padding: '16px', background: '#d1fae5', border: '1px solid #34d399', borderRadius: 8, marginBottom: 12 }}>
                <p style={{ ...monoLabel, color: '#065f46', marginBottom: 4 }}>✓ Acertou!</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#065f46' }}>
                  A assertiva é {gaboritoBool ? 'CERTA' : 'ERRADA'}. +1 ponto
                </p>
              </div>
            ) : (
              <div style={{ padding: '16px', background: '#fee2e2', border: '1px solid #f87171', borderRadius: 8, marginBottom: 12 }}>
                <p style={{ ...monoLabel, color: '#991b1b', marginBottom: 4 }}>✗ Errou!</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#991b1b' }}>
                  A assertiva é {gaboritoBool ? 'CERTA' : 'ERRADA'}.
                  {penalizaErro && ` Penalidade: ${penalizacao} ponto.`}
                </p>
              </div>
            )}

            {/* Comentário */}
            {comentario && (
              <div style={{ padding: '14px 16px', background: 'rgba(245,158,11,0.07)', borderLeft: '3px solid #f59e0b', marginBottom: 12 }}>
                <p style={{ ...monoLabel, color: '#92400e', marginBottom: 6 }}>Comentário</p>
                <p style={{ fontSize: '0.82rem', color: '#0a0a0a', lineHeight: 1.65 }}>{comentario}</p>
              </div>
            )}

            <button
              onClick={avancar}
              style={{ width: '100%', padding: '12px', background: '#0a0a0a', color: '#ffffff', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', borderRadius: 6 }}
            >
              Próxima questão →
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ========================
// PAINEL ESTRATÉGIA CEBRASPE
// ========================

function PainelCebraspe({ atencoes }: { atencoes: string[] }) {
  const [aberto, setAberto] = useState(false)
  return (
    <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', marginBottom: 20 }}>
      <button
        onClick={() => setAberto(!aberto)}
        style={{
          width: '100%',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left' as const,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1rem' }}>⚡</span>
          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#92400e' }}>Estratégia Cebraspe — Armadilhas</span>
          <span style={{ ...monoLabel, background: '#f59e0b', color: '#fff', padding: '1px 6px', fontSize: '0.58rem' }}>
            {atencoes.length} dicas
          </span>
        </div>
        <span style={{ color: '#92400e', fontSize: '0.75rem' }}>{aberto ? '▲ Ocultar' : '▼ Ver dicas'}</span>
      </button>
      {aberto && (
        <div style={{ padding: '0 16px 16px', borderTop: '1px solid #fed7aa' }}>
          <ul style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {atencoes.map((a, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ ...monoLabel, background: '#f59e0b', color: '#fff', padding: '1px 6px', borderRadius: 3, flexShrink: 0, fontSize: '0.6rem' }}>
                  {i + 1}
                </span>
                <p style={{ fontSize: '0.82rem', color: '#78350f', lineHeight: 1.6, margin: 0 }}>{a}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ========================
// COMPONENTE PRINCIPAL
// ========================

export default function QuestoesPage() {
  const { questoes, bancaPerfil, meta } = useConcurso()
  const [searchParams] = useSearchParams()

  // Detectar modo CERTO_ERRADO
  const estilo = bancaPerfil
    ? (bancaPerfil as Record<string, unknown>).estilo as Record<string, unknown> | undefined
    : undefined
  const isCertoErrado = estilo?.tipoQuestao === 'CERTO_ERRADO'
  const atencoes = bancaPerfil
    ? (bancaPerfil as Record<string, unknown>).atencoes as string[] | undefined
    : undefined

  const disciplinas = Array.from(new Set(questoes.map((q) => q.disciplinaId))).sort()

  const [discFiltro, setDiscFiltro] = useState<string>(() => {
    const p = searchParams.get('disc')
    return p && disciplinas.includes(p) ? p : ''
  })
  const [dificFiltro, setDificFiltro] = useState<DificuldadeQ | ''>('')
  const [modo, setModo] = useState<Modo>('quiz')

  // Score CERTO_ERRADO (acumulado da sessão)
  const [scoreCE, setScoreCE] = useState({ acertos: 0, erros: 0, brancos: 0 })
  const [idxCE, setIdxCE] = useState(0)

  // Quiz multipla escolha state
  const [idxAtual, setIdxAtual] = useState(0)
  const [selecionada, setSelecionada] = useState<OpcaoKey | null>(null)
  const [revelado, setRevelado] = useState(false)
  const [respostas, setRespostas] = useState<Record<string, 'acerto' | 'erro'>>(getRespostas)

  // Revisão state
  const [gabsRevelados, setGabsRevelados] = useState<Set<string>>(new Set())

  const questoesFiltradas = questoes.filter((q) => {
    const matchDisc = !discFiltro || q.disciplinaId === discFiltro
    const matchDific = !dificFiltro || q.dificuldade === dificFiltro
    return matchDisc && matchDific
  })

  const questaoAtual = questoesFiltradas[idxAtual] ?? null
  const questoeCEAtual = questoesFiltradas[idxCE] ?? null

  function limparFiltros() {
    setDiscFiltro('')
    setDificFiltro('')
    setIdxAtual(0)
    setIdxCE(0)
    setSelecionada(null)
    setRevelado(false)
  }

  function handleSelecionar(opcao: OpcaoKey) {
    if (revelado) return
    setSelecionada(opcao)
  }

  function handleVerGabarito() {
    if (!selecionada || !questaoAtual) return
    setRevelado(true)
    const resultado: 'acerto' | 'erro' = selecionada === questaoAtual.gabarito ? 'acerto' : 'erro'
    saveResposta(questaoAtual.id, resultado)
    setRespostas((prev) => ({ ...prev, [questaoAtual.id]: resultado }))
  }

  function handleProxima() {
    if (idxAtual < questoesFiltradas.length - 1) {
      setIdxAtual((i) => i + 1)
    } else {
      setIdxAtual(0)
    }
    setSelecionada(null)
    setRevelado(false)
  }

  function handleNextCE(resultado: ResultadoCE) {
    setScoreCE(prev => ({
      acertos: prev.acertos + (resultado === 'certo' || resultado === 'errado' ? 1 : 0), // will be updated below
      erros: prev.erros,
      brancos: prev.brancos,
    }))
    // determine actual score
    const q = (questoesFiltradas[idxCE] as unknown) as Record<string, unknown>
    const gabarito = q?.gabarito as string | boolean | undefined
    const gabBool = gabarito === 'certo' || gabarito === 'C' || gabarito === true
    if (resultado === 'branco') {
      setScoreCE(prev => ({ ...prev, brancos: prev.brancos + 1, acertos: prev.acertos }))
    } else {
      const acertou = (resultado === 'certo') === gabBool
      if (acertou) {
        setScoreCE(prev => ({ ...prev, acertos: prev.acertos + 1, erros: prev.erros }))
      } else {
        setScoreCE(prev => ({ ...prev, erros: prev.erros + 1, acertos: prev.acertos }))
      }
    }
    setIdxCE(i => i < questoesFiltradas.length - 1 ? i + 1 : 0)
  }

  const toggleGab = useCallback((id: string) => {
    setGabsRevelados((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  function getOpcaoStyle(opcao: OpcaoKey): React.CSSProperties {
    const base: React.CSSProperties = {
      width: '100%',
      textAlign: 'left',
      padding: '10px 14px',
      border: '1px solid #e2e2dc',
      borderRadius: 0,
      background: '#fafaf7',
      color: '#0a0a0a',
      fontSize: '0.875rem',
      cursor: revelado ? 'default' : 'pointer',
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      lineHeight: 1.5,
      transition: 'background 0.1s, border-color 0.1s',
    }
    if (!revelado) {
      if (selecionada === opcao) return { ...base, background: '#fff3cd', borderColor: '#f59e0b' }
      return base
    }
    if (opcao === questaoAtual?.gabarito) return { ...base, background: '#d1fae5', borderColor: '#34d399', color: '#065f46' }
    if (selecionada === opcao) return { ...base, background: '#fee2e2', borderColor: '#f87171', color: '#991b1b' }
    return { ...base, opacity: 0.5 }
  }

  const acertos = Object.values(respostas).filter((v) => v === 'acerto').length
  const erros = Object.values(respostas).filter((v) => v === 'erro').length

  // Saldo Cebraspe: acertos - erros
  const saldoCE = scoreCE.acertos - scoreCE.erros
  const estilo_ = bancaPerfil
    ? (bancaPerfil as Record<string, unknown>).estilo as Record<string, unknown> | undefined
    : undefined
  const penalizaErro_ = estilo_?.penalizaErro as boolean ?? false

  // =====================
  // MODO CERTO/ERRADO
  // =====================
  if (isCertoErrado) {
    return (
      <div>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0a0a0a' }}>
            Questões
          </h1>
          <span style={{ ...monoLabel, color: '#999999', marginBottom: 4 }}>
            {estilo_?.bancaProvavel as string ?? meta.banca} · Certo ou Errado
          </span>
        </div>

        {/* Score C/E */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {[
            { label: 'Acertos', val: scoreCE.acertos, color: '#065f46', bg: '#d1fae5' },
            { label: 'Erros', val: scoreCE.erros, color: '#991b1b', bg: '#fee2e2' },
            { label: 'Em branco', val: scoreCE.brancos, color: '#4b5563', bg: '#f3f4f6' },
            {
              label: 'Saldo',
              val: saldoCE >= 0 ? `+${saldoCE}` : String(saldoCE),
              color: saldoCE > 0 ? '#065f46' : saldoCE < 0 ? '#991b1b' : '#4b5563',
              bg: saldoCE > 0 ? '#d1fae5' : saldoCE < 0 ? '#fee2e2' : '#f3f4f6',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ background: stat.bg, border: `1px solid ${stat.bg}`, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: stat.color }}>{stat.val}</span>
              <span style={{ ...monoLabel, color: stat.color }}>{stat.label}</span>
            </div>
          ))}
          {penalizaErro_ && (
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', background: '#fff7ed', border: '1px solid #fed7aa' }}>
              <span style={{ ...monoLabel, color: '#92400e', fontSize: '0.58rem' }}>⚠ penaliza erro (-1)</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          {/* Filtros */}
          <aside style={{ width: 220, flexShrink: 0 }}>
            <p style={{ ...monoLabel, marginBottom: 12 }}>Filtros</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ ...monoLabel, display: 'block', marginBottom: 4 }}>Disciplina</label>
                <select
                  value={discFiltro}
                  onChange={(e) => { setDiscFiltro(e.target.value); limparFiltros() }}
                  style={selectStyle}
                >
                  <option value="">Todas</option>
                  {disciplinas.map((d) => (
                    <option key={d} value={d}>{getDisciplinaLabel(d)}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={limparFiltros}
                style={{ padding: '8px 0', background: 'none', color: '#606060', border: '1px solid #e2e2dc', borderRadius: 0, fontSize: '0.8rem', cursor: 'pointer', ...monoLabel }}
              >
                LIMPAR FILTROS
              </button>
              <p style={{ ...monoLabel, color: '#999999', marginTop: 4 }}>
                {questoesFiltradas.length} questão{questoesFiltradas.length !== 1 ? 'ões' : ''} · #{idxCE + 1}
              </p>
            </div>

            {/* Estratégia colapsável */}
            {atencoes && atencoes.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <PainelCebraspe atencoes={atencoes} />
              </div>
            )}
          </aside>

          {/* Área principal */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Navegação */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <p style={{ ...monoLabel, color: '#999999' }}>
                {idxCE + 1} / {questoesFiltradas.length}
              </p>
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  onClick={() => setIdxCE(Math.max(0, idxCE - 1))}
                  disabled={idxCE === 0}
                  style={{ padding: '5px 12px', background: 'none', border: '1px solid #e2e2dc', color: '#606060', borderRadius: 0, cursor: idxCE === 0 ? 'not-allowed' : 'pointer', opacity: idxCE === 0 ? 0.4 : 1, fontSize: '0.75rem' }}
                >
                  ← Anterior
                </button>
              </div>
            </div>

            {questoesFiltradas.length === 0 ? (
              <p style={{ color: '#606060', fontWeight: 300 }}>Nenhuma questão encontrada.</p>
            ) : questoeCEAtual ? (
              <QuizCertoErrado
                key={idxCE}
                questao={(questoeCEAtual as unknown) as Record<string, unknown>}
                bancaPerfil={bancaPerfil as Record<string, unknown>}
                onNext={handleNextCE}
              />
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  // =====================
  // MODO MÚLTIPLA ESCOLHA (padrão — Quadrix / SEDES)
  // =====================
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0a0a0a' }}>
          Questões
        </h1>
        <span style={{ ...monoLabel, color: '#999999', marginBottom: 4 }}>banco Quadrix</span>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          {(['quiz', 'revisao'] as Modo[]).map((m) => (
            <button
              key={m}
              onClick={() => setModo(m)}
              style={{
                padding: '6px 14px',
                fontSize: '0.75rem',
                fontWeight: 700,
                background: modo === m ? '#0a0a0a' : '#ffffff',
                color: modo === m ? '#ffffff' : '#606060',
                border: '1px solid #e2e2dc',
                borderRadius: 0,
                cursor: 'pointer',
                ...monoLabel,
              }}
            >
              {m === 'quiz' ? 'QUIZ' : 'REVISÃO'}
            </button>
          ))}
        </div>
      </div>

      {/* Estatísticas */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Respondidas', val: acertos + erros, color: '#0a0a0a' },
          { label: 'Acertos', val: acertos, color: '#065f46' },
          { label: 'Erros', val: erros, color: '#991b1b' },
        ].map((stat) => (
          <div key={stat.label} style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: stat.color }}>{stat.val}</span>
            <span style={{ ...monoLabel, color: '#999999' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {/* Filtros */}
        <aside style={{ width: 220, flexShrink: 0 }}>
          <p style={{ ...monoLabel, marginBottom: 12 }}>Filtros</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ ...monoLabel, display: 'block', marginBottom: 4 }}>Disciplina</label>
              <select
                value={discFiltro}
                onChange={(e) => { setDiscFiltro(e.target.value); setIdxAtual(0); setSelecionada(null); setRevelado(false) }}
                style={selectStyle}
              >
                <option value="">Todas</option>
                {disciplinas.map((d) => (
                  <option key={d} value={d}>{getDisciplinaLabel(d)}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ ...monoLabel, display: 'block', marginBottom: 4 }}>Dificuldade</label>
              <select
                value={dificFiltro}
                onChange={(e) => { setDificFiltro(e.target.value as DificuldadeQ | ''); setIdxAtual(0); setSelecionada(null); setRevelado(false) }}
                style={selectStyle}
              >
                <option value="">Todas</option>
                {(['FACIL', 'MEDIO', 'DIFICIL'] as DificuldadeQ[]).map((d) => (
                  <option key={d} value={d}>{DIFIC_LABELS[d]}</option>
                ))}
              </select>
            </div>

            <button
              onClick={limparFiltros}
              style={{ padding: '8px 0', background: 'none', color: '#606060', border: '1px solid #e2e2dc', borderRadius: 0, fontSize: '0.8rem', cursor: 'pointer', ...monoLabel }}
            >
              LIMPAR FILTROS
            </button>

            <p style={{ ...monoLabel, color: '#999999', marginTop: 4 }}>
              {questoesFiltradas.length} questão{questoesFiltradas.length !== 1 ? 'ões' : ''} encontrada{questoesFiltradas.length !== 1 ? 's' : ''}
            </p>
          </div>
        </aside>

        {/* Área principal */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {questoesFiltradas.length === 0 && (
            <p style={{ color: '#606060', fontWeight: 300 }}>Nenhuma questão encontrada com esses filtros.</p>
          )}

          {/* MODO QUIZ */}
          {modo === 'quiz' && questaoAtual && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <p style={{ ...monoLabel, color: '#999999' }}>{idxAtual + 1} / {questoesFiltradas.length}</p>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button
                    onClick={() => { setIdxAtual(Math.max(0, idxAtual - 1)); setSelecionada(null); setRevelado(false) }}
                    disabled={idxAtual === 0}
                    style={{ padding: '5px 12px', background: 'none', border: '1px solid #e2e2dc', color: '#606060', borderRadius: 0, cursor: idxAtual === 0 ? 'not-allowed' : 'pointer', opacity: idxAtual === 0 ? 0.4 : 1, fontSize: '0.75rem' }}
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={handleProxima}
                    style={{ padding: '5px 12px', background: 'none', border: '1px solid #e2e2dc', color: '#606060', borderRadius: 0, cursor: 'pointer', fontSize: '0.75rem' }}
                  >
                    Próxima →
                  </button>
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', overflow: 'hidden' }}>
                <div style={{ padding: '12px 20px', background: '#fafaf7', borderBottom: '1px solid #e2e2dc', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ ...monoLabel, background: '#f0f0ea', padding: '2px 8px', color: '#606060' }}>
                    {getDisciplinaLabel(questaoAtual.disciplinaId)}
                  </span>
                  <span style={{ ...monoLabel, padding: '2px 8px', fontSize: '0.6rem', ...DIFIC_STYLE[questaoAtual.dificuldade] }}>
                    {DIFIC_LABELS[questaoAtual.dificuldade]}
                  </span>
                  <span style={{ ...monoLabel, color: '#999999', marginLeft: 'auto' }}>{questaoAtual.topico}</span>
                  {respostas[questaoAtual.id] && (
                    <span style={{ ...monoLabel, padding: '2px 8px', background: respostas[questaoAtual.id] === 'acerto' ? '#d1fae5' : '#fee2e2', color: respostas[questaoAtual.id] === 'acerto' ? '#065f46' : '#991b1b' }}>
                      {respostas[questaoAtual.id] === 'acerto' ? 'ACERTOU' : 'ERROU'}
                    </span>
                  )}
                </div>

                <div style={{ padding: '20px 20px 16px' }}>
                  <p style={{ fontSize: '0.9rem', color: '#0a0a0a', lineHeight: 1.75, fontWeight: 400 }}>{questaoAtual.enunciado}</p>
                </div>

                <div style={{ padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {(['a', 'b', 'c', 'd', 'e'] as OpcaoKey[]).map((opcao) => (
                    <button key={opcao} onClick={() => handleSelecionar(opcao)} style={getOpcaoStyle(opcao)}>
                      <span style={{ fontFamily: '"DM Mono", monospace', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0, marginTop: 1, color: 'inherit' }}>
                        {opcao.toUpperCase()}
                      </span>
                      <span style={{ flex: 1 }}>{questaoAtual.opcoes[opcao]}</span>
                      {revelado && opcao === questaoAtual.gabarito && (
                        <span style={{ color: '#065f46', fontWeight: 700, flexShrink: 0 }}>✓</span>
                      )}
                    </button>
                  ))}
                </div>

                <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e2dc', display: 'flex', gap: 8, alignItems: 'center' }}>
                  {!revelado ? (
                    <button
                      onClick={handleVerGabarito}
                      disabled={!selecionada}
                      style={{ padding: '9px 20px', background: selecionada ? '#f59e0b' : '#e2e2dc', color: selecionada ? '#0a0a0a' : '#999999', border: 'none', borderRadius: 0, fontWeight: 700, fontSize: '0.82rem', cursor: selecionada ? 'pointer' : 'not-allowed', letterSpacing: '0.02em' }}
                    >
                      Ver gabarito
                    </button>
                  ) : (
                    <button
                      onClick={handleProxima}
                      style={{ padding: '9px 20px', background: '#0a0a0a', color: '#ffffff', border: 'none', borderRadius: 0, fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                    >
                      Próxima questão →
                    </button>
                  )}
                </div>

                {revelado && (
                  <div style={{ margin: '0 20px 20px', padding: '14px 16px', background: 'rgba(245,158,11,0.07)', borderLeft: '3px solid #f59e0b' }}>
                    <p style={{ ...monoLabel, color: '#92400e', marginBottom: 6 }}>Comentário</p>
                    <p style={{ fontSize: '0.82rem', color: '#0a0a0a', lineHeight: 1.65 }}>{questaoAtual.comentario}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MODO REVISÃO */}
          {modo === 'revisao' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {questoesFiltradas.map((q, idx) => {
                const gabRevelado = gabsRevelados.has(q.id)
                const resposta = respostas[q.id]
                return (
                  <div key={q.id} style={{ background: '#ffffff', border: '1px solid #e2e2dc', overflow: 'hidden' }}>
                    <div style={{ padding: '12px 18px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                          <span style={{ ...monoLabel, background: '#f0f0ea', padding: '2px 7px', color: '#606060' }}>
                            {getDisciplinaLabel(q.disciplinaId)}
                          </span>
                          <span style={{ ...monoLabel, padding: '2px 7px', fontSize: '0.6rem', ...DIFIC_STYLE[q.dificuldade] }}>
                            {DIFIC_LABELS[q.dificuldade]}
                          </span>
                          <span style={{ ...monoLabel, color: '#999999' }}>#{idx + 1}</span>
                          {resposta && (
                            <span style={{ ...monoLabel, padding: '2px 7px', background: resposta === 'acerto' ? '#d1fae5' : '#fee2e2', color: resposta === 'acerto' ? '#065f46' : '#991b1b' }}>
                              {resposta === 'acerto' ? 'ACERTOU' : 'ERROU'}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#606060', fontWeight: 300 }}>{q.topico}</p>
                      </div>
                      <button
                        onClick={() => toggleGab(q.id)}
                        style={{ padding: '5px 12px', background: 'none', border: '1px solid #e2e2dc', borderRadius: 0, fontSize: '0.75rem', color: '#606060', cursor: 'pointer', flexShrink: 0, ...monoLabel }}
                      >
                        {gabRevelado ? '▲ OCULTAR' : '▼ REVELAR'}
                      </button>
                    </div>

                    {gabRevelado && (
                      <div style={{ borderTop: '1px solid #f0f0ea', padding: '12px 18px', background: '#fafaf7' }}>
                        <p style={{ fontSize: '0.82rem', color: '#0a0a0a', marginBottom: 10, lineHeight: 1.6 }}>{q.enunciado}</p>
                        <div style={{ padding: '10px 14px', background: '#d1fae5', border: '1px solid #a7f3d0', marginBottom: 10, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <span style={{ fontFamily: '"DM Mono", monospace', fontWeight: 700, fontSize: '0.8rem', color: '#065f46', flexShrink: 0 }}>
                            {q.gabarito.toUpperCase()} ✓
                          </span>
                          <span style={{ fontSize: '0.82rem', color: '#065f46' }}>{q.opcoes[q.gabarito]}</span>
                        </div>
                        <p style={{ fontSize: '0.78rem', color: '#606060', lineHeight: 1.6 }}>{q.comentario}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
