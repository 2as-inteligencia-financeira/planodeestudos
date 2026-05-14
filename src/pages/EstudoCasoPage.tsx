import { useState, useEffect, useRef } from 'react'
import { useConcurso } from '../contexts/ConcursoContext'
import type { Dificuldade as DificuldadeEC } from '../data/sedes2026_estudodecaso'
import {
  corrigirComIA,
  salvarTentativa,
  getHistorico,
  type ResultadoCorrecao,
  type TentativaCorrecao,
} from '../services/correcaoApi'

const DIFIC_STYLE: Record<DificuldadeEC, React.CSSProperties> = {
  FACIL: { background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' },
  MEDIO: { background: '#fef9c3', color: '#713f12', border: '1px solid #fef08a' },
  DIFICIL: { background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' },
}

const DIFIC_LABELS: Record<DificuldadeEC, string> = {
  FACIL: 'Fácil',
  MEDIO: 'Médio',
  DIFICIL: 'Difícil',
}

const monoLabel: React.CSSProperties = {
  fontFamily: '"DM Mono", monospace',
  fontSize: '0.65rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  color: '#999999',
}

const TEMPO_TOTAL = 2400

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function CriterioBar({
  label,
  peso,
  nota,
  color,
}: {
  label: string
  peso: number
  nota: number
  color: string
}) {
  const pct = (nota / 3) * 100
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 4 }}>
        <span style={{ fontWeight: 600, color: '#0a0a0a' }}>
          {label}
          <span style={{ ...monoLabel, marginLeft: 6, fontSize: '0.58rem' }}>peso {peso}</span>
        </span>
        <span style={{ fontFamily: '"DM Mono", monospace', fontWeight: 700, color }}>{nota.toFixed(1)} / 3</span>
      </div>
      <div style={{ width: '100%', height: 8, background: '#f0f0ea' }}>
        <div style={{ height: '100%', width: `${Math.max(pct, 2)}%`, background: color, transition: 'width 0.6s' }} />
      </div>
    </div>
  )
}

export default function EstudoCasoPage() {
  const { temasEstudoCaso } = useConcurso()

  const [temaSelecionadoId, setTemaSelecionadoId] = useState(temasEstudoCaso[0]?.id ?? '')
  const [respostaAberta, setRespostaAberta] = useState(false)

  // Correction state
  const [respostaTexto, setRespostaTexto] = useState('')
  const [corrigindo, setCorrigindo] = useState(false)
  const [resultado, setResultado] = useState<ResultadoCorrecao | null>(null)
  const [erroApi, setErroApi] = useState<string | null>(null)
  const [historico, setHistorico] = useState<Record<string, TentativaCorrecao[]>>(getHistorico)
  const resultadoRef = useRef<HTMLDivElement>(null)

  // Timer
  const [timerAtivo, setTimerAtivo] = useState(false)
  const [timerPausado, setTimerPausado] = useState(false)
  const [tempoRestante, setTempoRestante] = useState(TEMPO_TOTAL)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (timerAtivo && !timerPausado) {
      intervalRef.current = setInterval(() => {
        setTempoRestante((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!)
            setTimerAtivo(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [timerAtivo, timerPausado])

  function iniciarTimer() { setTempoRestante(TEMPO_TOTAL); setTimerAtivo(true); setTimerPausado(false) }
  function pausarTimer() { setTimerPausado((p) => !p) }
  function reiniciarTimer() { setTimerAtivo(false); setTimerPausado(false); setTempoRestante(TEMPO_TOTAL) }

  const tema = temasEstudoCaso.find((t) => t.id === temaSelecionadoId)
  const timerPercent = ((TEMPO_TOTAL - tempoRestante) / TEMPO_TOTAL) * 100
  const timerCritico = tempoRestante <= 300

  const linhas = respostaTexto === '' ? 0 : respostaTexto.split('\n').length
  const linhasAlerta = respostaTexto.trim() !== '' && (linhas < 20 || linhas > 30)

  function handleSelecionarTema(id: string) {
    setTemaSelecionadoId(id)
    setRespostaAberta(false)
    setRespostaTexto('')
    setResultado(null)
    setErroApi(null)
  }

  async function handleCorrigir() {
    if (!tema || !respostaTexto.trim()) return
    setCorrigindo(true)
    setErroApi(null)
    setResultado(null)
    try {
      const res = await corrigirComIA(tema, respostaTexto)
      setResultado(res)
      const tentativa: TentativaCorrecao = {
        temaId: tema.id,
        data: new Date().toISOString(),
        notaFinal: res.notaFinal,
        resposta: respostaTexto,
      }
      salvarTentativa(tentativa)
      setHistorico(getHistorico())
      setTimeout(() => resultadoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err) {
      setErroApi(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setCorrigindo(false)
    }
  }

  function handleTentarNovamente() {
    setRespostaTexto('')
    setResultado(null)
    setErroApi(null)
  }

  function getMelhorNota(temaId: string) {
    const hist = historico[temaId]
    if (!hist || hist.length === 0) return null
    return Math.max(...hist.map((t) => t.notaFinal))
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0a0a0a', marginBottom: 4 }}>
          Estudo de Caso
        </h1>
        <p style={{ ...monoLabel, fontSize: '0.7rem' }}>Discursiva — texto dissertativo · 20-30 linhas</p>
      </div>

      {/* Timer banner */}
      {timerAtivo && (
        <div
          style={{
            background: timerCritico ? '#fef2f2' : 'rgba(245,158,11,0.08)',
            border: `1px solid ${timerCritico ? '#fecaca' : 'rgba(245,158,11,0.3)'}`,
            padding: '12px 20px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '1.75rem',
              fontWeight: 700,
              color: timerCritico ? '#991b1b' : '#f59e0b',
              letterSpacing: '0.04em',
              lineHeight: 1,
            }}
          >
            {formatTimer(tempoRestante)}
          </span>
          <div style={{ flex: 1, minWidth: 120 }}>
            <div style={{ width: '100%', height: 4, background: '#e2e2dc' }}>
              <div
                style={{
                  height: '100%',
                  width: `${timerPercent}%`,
                  background: timerCritico ? '#dc2626' : '#f59e0b',
                  transition: 'width 1s linear',
                }}
              />
            </div>
            <p style={{ ...monoLabel, marginTop: 4 }}>
              {timerPausado ? 'PAUSADO' : timerCritico ? 'TEMPO CRÍTICO' : 'EM ANDAMENTO'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={pausarTimer}
              style={{ padding: '6px 14px', background: 'none', border: '1px solid #e2e2dc', borderRadius: 0, fontSize: '0.75rem', color: '#606060', cursor: 'pointer' }}
            >
              {timerPausado ? 'Retomar' : 'Pausar'}
            </button>
            <button
              onClick={reiniciarTimer}
              style={{ padding: '6px 14px', background: 'none', border: '1px solid #e2e2dc', borderRadius: 0, fontSize: '0.75rem', color: '#606060', cursor: 'pointer' }}
            >
              Reiniciar
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {/* Lista de temas */}
        <aside style={{ width: 260, flexShrink: 0 }}>
          <p style={{ ...monoLabel, marginBottom: 10 }}>Temas</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {temasEstudoCaso.map((t) => {
              const isAtivo = t.id === temaSelecionadoId
              const melhorNota = getMelhorNota(t.id)
              const tentativas = historico[t.id]?.length ?? 0
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelecionarTema(t.id)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    background: isAtivo ? '#f59e0b' : '#ffffff',
                    border: `1px solid ${isAtivo ? '#f59e0b' : '#e2e2dc'}`,
                    borderRadius: 0,
                    cursor: 'pointer',
                  }}
                >
                  <p style={{ fontSize: '0.8rem', fontWeight: isAtivo ? 700 : 500, color: '#0a0a0a', lineHeight: 1.4, marginBottom: 4 }}>
                    {t.titulo}
                  </p>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: tentativas > 0 ? 4 : 0 }}>
                    <span style={{ ...monoLabel, padding: '1px 5px', fontSize: '0.55rem', ...DIFIC_STYLE[t.dificuldade] }}>
                      {DIFIC_LABELS[t.dificuldade]}
                    </span>
                    {t.disciplinas.slice(0, 2).map((d) => (
                      <span key={d} style={{ ...monoLabel, fontSize: '0.55rem', background: isAtivo ? 'rgba(0,0,0,0.1)' : '#f0f0ea', color: isAtivo ? '#0a0a0a' : '#606060', padding: '1px 5px' }}>
                        {d.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                  {tentativas > 0 && (
                    <p style={{ ...monoLabel, fontSize: '0.58rem', color: isAtivo ? '#92400e' : '#999999', marginTop: 2 }}>
                      Melhor: {melhorNota}pts · {tentativas} tentativa{tentativas !== 1 ? 's' : ''}
                    </p>
                  )}
                </button>
              )
            })}
          </div>
        </aside>

        {/* Painel do tema */}
        {tema && (
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Título + cronômetro */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.02em', marginBottom: 6 }}>
                  {tema.titulo}
                </h2>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ ...monoLabel, padding: '2px 7px', fontSize: '0.6rem', ...DIFIC_STYLE[tema.dificuldade] }}>
                    {DIFIC_LABELS[tema.dificuldade]}
                  </span>
                  {tema.disciplinas.map((d) => (
                    <span key={d} style={{ ...monoLabel, background: '#f0f0ea', padding: '2px 7px', color: '#606060' }}>{d}</span>
                  ))}
                </div>
              </div>
              {!timerAtivo && (
                <button
                  onClick={iniciarTimer}
                  style={{ padding: '8px 18px', background: '#f59e0b', color: '#0a0a0a', border: 'none', borderRadius: 0, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', flexShrink: 0 }}
                >
                  Modo cronômetro (40 min)
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Contexto */}
              <div style={{ background: '#fafaf7', borderLeft: '3px solid #f59e0b', padding: '14px 18px', border: '1px solid #e2e2dc', borderLeftColor: '#f59e0b' }}>
                <p style={{ ...monoLabel, color: '#92400e', marginBottom: 8 }}>Contexto do caso</p>
                <p style={{ fontSize: '0.875rem', color: '#0a0a0a', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{tema.contexto}</p>
              </div>

              {/* Comando */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: '14px 18px' }}>
                <p style={{ ...monoLabel, marginBottom: 8 }}>Comando dissertativo</p>
                <p style={{ fontSize: '0.9rem', color: '#0a0a0a', lineHeight: 1.7, fontWeight: 500 }}>{tema.comando}</p>
              </div>

              {/* Perguntas orientadoras */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: '14px 18px' }}>
                <p style={{ ...monoLabel, marginBottom: 10 }}>Perguntas orientadoras</p>
                <ol style={{ padding: '0 0 0 20px', margin: 0 }}>
                  {tema.perguntasOrientadoras.map((p, i) => (
                    <li key={i} style={{ fontSize: '0.85rem', color: '#0a0a0a', lineHeight: 1.65, marginBottom: 6 }}>{p}</li>
                  ))}
                </ol>
              </div>

              {/* ── MÓDULO DE CORREÇÃO COM IA ── */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e2dc' }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0ea', background: '#fafaf7' }}>
                  <p style={{ ...monoLabel, color: '#0a0a0a', fontWeight: 700, marginBottom: 2 }}>Sua resposta dissertativa</p>
                  <p style={{ ...monoLabel, fontSize: '0.58rem', marginTop: 2 }}>Escreva e corrija com IA — histórico salvo localmente</p>
                </div>

                <div style={{ padding: '16px 18px' }}>
                  <textarea
                    value={respostaTexto}
                    onChange={(e) => setRespostaTexto(e.target.value)}
                    placeholder="Escreva sua resposta dissertativa aqui..."
                    rows={18}
                    disabled={corrigindo}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '1px solid #e2e2dc',
                      background: corrigindo ? '#fafaf7' : '#ffffff',
                      color: '#0a0a0a',
                      fontSize: '0.875rem',
                      lineHeight: 1.75,
                      borderRadius: 0,
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                    }}
                  />

                  {/* Counter + button row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span
                        style={{
                          fontFamily: '"DM Mono", monospace',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: linhasAlerta ? '#dc2626' : respostaTexto.trim() ? '#065f46' : '#999999',
                        }}
                      >
                        {linhas} / 30 linhas
                        {linhasAlerta && linhas < 20 && ' — mínimo 20'}
                        {linhasAlerta && linhas > 30 && ' — máximo 30'}
                      </span>
                      {respostaTexto.trim() && (
                        <span style={{ ...monoLabel, color: '#999999', fontSize: '0.6rem' }}>
                          {respostaTexto.trim().split(/\s+/).length} palavras
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleCorrigir}
                      disabled={!respostaTexto.trim() || corrigindo}
                      style={{
                        padding: '10px 24px',
                        background: respostaTexto.trim() && !corrigindo ? '#f59e0b' : '#e2e2dc',
                        color: respostaTexto.trim() && !corrigindo ? '#0a0a0a' : '#999999',
                        border: 'none',
                        borderRadius: 0,
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: respostaTexto.trim() && !corrigindo ? 'pointer' : 'not-allowed',
                        letterSpacing: '0.02em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      {corrigindo ? (
                        <>
                          <span
                            style={{
                              display: 'inline-block',
                              width: 14,
                              height: 14,
                              border: '2px solid #999',
                              borderTopColor: '#0a0a0a',
                              borderRadius: '50%',
                              animation: 'spin 0.7s linear infinite',
                            }}
                          />
                          Avaliando seu texto...
                        </>
                      ) : (
                        '✦ Corrigir com IA'
                      )}
                    </button>
                  </div>

                  {erroApi && (
                    <div style={{ marginTop: 12, padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca' }}>
                      <p style={{ fontSize: '0.82rem', color: '#991b1b' }}>{erroApi}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ── PAINEL DE RESULTADO ── */}
              {resultado && (
                <div ref={resultadoRef} style={{ background: '#ffffff', border: '1px solid #e2e2dc', overflow: 'hidden' }}>
                  {/* Nota final */}
                  <div
                    style={{
                      padding: '24px 24px 20px',
                      background: resultado.aprovado ? 'rgba(5,150,105,0.05)' : 'rgba(220,38,38,0.05)',
                      borderBottom: `3px solid ${resultado.aprovado ? '#059669' : '#dc2626'}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20,
                      flexWrap: 'wrap',
                    }}
                  >
                    <div>
                      <p style={{ ...monoLabel, marginBottom: 4 }}>Nota final</p>
                      <p
                        style={{
                          fontSize: '3.5rem',
                          fontWeight: 800,
                          letterSpacing: '-0.04em',
                          lineHeight: 1,
                          color: resultado.aprovado ? '#059669' : '#dc2626',
                        }}
                      >
                        {resultado.notaFinal}
                        <span style={{ fontSize: '1.5rem', fontWeight: 400, color: '#606060' }}>/100</span>
                      </p>
                    </div>
                    <div
                      style={{
                        padding: '8px 20px',
                        background: resultado.aprovado ? '#059669' : '#dc2626',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '1rem',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {resultado.aprovado ? '✓ APROVADO' : '✗ REPROVADO'}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#606060', marginLeft: 'auto' }}>
                      Mínimo para aprovação: 50 pontos
                    </p>
                  </div>

                  <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Critérios */}
                    <div>
                      <p style={{ ...monoLabel, marginBottom: 12 }}>Critérios de avaliação</p>
                      <CriterioBar label="CAC — Conteúdo e Atendimento ao Comando" peso={7} nota={resultado.notaCAC} color="#f59e0b" />
                      <CriterioBar label="OT — Organização Textual" peso={1.5} nota={resultado.notaOT} color="#3b82f6" />
                      <CriterioBar label="DLP — Domínio da Língua Portuguesa" peso={1.5} nota={resultado.notaDLP} color="#8b5cf6" />

                      {/* Feedbacks dos critérios */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                        {[
                          { label: 'Feedback CAC', text: resultado.feedbackCAC, color: '#92400e', bg: 'rgba(245,158,11,0.06)' },
                          { label: 'Feedback OT', text: resultado.feedbackOT, color: '#1e40af', bg: 'rgba(59,130,246,0.06)' },
                          { label: 'Feedback DLP', text: resultado.feedbackDLP, color: '#5b21b6', bg: 'rgba(139,92,246,0.06)' },
                        ].map((fb) => (
                          <div key={fb.label} style={{ padding: '10px 14px', background: fb.bg, borderLeft: `3px solid ${fb.color}30` }}>
                            <p style={{ ...monoLabel, color: fb.color, marginBottom: 4 }}>{fb.label}</p>
                            <p style={{ fontSize: '0.82rem', color: '#0a0a0a', lineHeight: 1.6 }}>{fb.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pontos obrigatórios */}
                    <div>
                      <p style={{ ...monoLabel, marginBottom: 10 }}>Pontos obrigatórios</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {resultado.pontosCobertosFaltando.cobertos.map((p, i) => (
                          <div key={i} style={{ display: 'flex', gap: 8, fontSize: '0.82rem', color: '#065f46', alignItems: 'flex-start' }}>
                            <span style={{ flexShrink: 0, fontWeight: 700 }}>✅</span>
                            <span>{p}</span>
                          </div>
                        ))}
                        {resultado.pontosCobertosFaltando.faltando.map((p, i) => (
                          <div key={i} style={{ display: 'flex', gap: 8, fontSize: '0.82rem', color: '#991b1b', alignItems: 'flex-start' }}>
                            <span style={{ flexShrink: 0, fontWeight: 700 }}>❌</span>
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pontos fortes + A melhorar */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '14px' }}>
                        <p style={{ ...monoLabel, color: '#166534', marginBottom: 8 }}>Pontos fortes</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {resultado.pontosFortes.map((p, i) => (
                            <li key={i} style={{ display: 'flex', gap: 6, fontSize: '0.8rem', color: '#166534', marginBottom: 5, lineHeight: 1.5 }}>
                              <span style={{ flexShrink: 0 }}>→</span>{p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', padding: '14px' }}>
                        <p style={{ ...monoLabel, color: '#9a3412', marginBottom: 8 }}>A melhorar</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {resultado.aMelhorar.map((p, i) => (
                            <li key={i} style={{ display: 'flex', gap: 6, fontSize: '0.8rem', color: '#9a3412', marginBottom: 5, lineHeight: 1.5 }}>
                              <span style={{ flexShrink: 0 }}>→</span>{p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Recomendação */}
                    <div style={{ padding: '14px 18px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', borderLeft: '3px solid #f59e0b' }}>
                      <p style={{ ...monoLabel, color: '#92400e', marginBottom: 6 }}>Recomendação para a próxima tentativa</p>
                      <p style={{ fontSize: '0.875rem', color: '#0a0a0a', lineHeight: 1.6, fontWeight: 500 }}>{resultado.recomendacao}</p>
                    </div>

                    {/* Botões */}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <button
                        onClick={handleTentarNovamente}
                        style={{ padding: '10px 20px', background: '#0a0a0a', color: '#ffffff', border: 'none', borderRadius: 0, fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                      >
                        ↺ Tentar novamente
                      </button>
                      <button
                        onClick={() => { setRespostaAberta(true); setTimeout(() => document.getElementById('resposta-modelo')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100) }}
                        style={{ padding: '10px 20px', background: 'none', color: '#606060', border: '1px solid #e2e2dc', borderRadius: 0, fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}
                      >
                        Ver esquema de resposta ↓
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Pontos obrigatórios */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: '14px 18px' }}>
                <p style={{ ...monoLabel, marginBottom: 10 }}>Pontos obrigatórios</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {tema.pontosObrigatorios.map((p, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, fontSize: '0.83rem', color: '#0a0a0a', marginBottom: 8, lineHeight: 1.55 }}>
                      <span style={{ width: 18, height: 18, border: '2px solid #f59e0b', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, color: '#f59e0b', marginTop: 1 }}>
                        {i + 1}
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Estrutura sugerida */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: '14px 18px' }}>
                <p style={{ ...monoLabel, marginBottom: 10 }}>Estrutura sugerida de resposta</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {tema.estruturaSugerida.map((e, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 12px', background: '#f0f0ea', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: '"DM Mono", monospace', fontWeight: 700, fontSize: '0.7rem', color: '#f59e0b', flexShrink: 0, marginTop: 1 }}>{i + 1}.</span>
                      <p style={{ fontSize: '0.82rem', color: '#0a0a0a', lineHeight: 1.5 }}>{e}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legislação relevante */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: '14px 18px' }}>
                <p style={{ ...monoLabel, marginBottom: 10 }}>Legislação relevante</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {tema.legislacaoRelevante.map((l, i) => (
                    <span key={i} style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', color: '#606060', background: '#f0f0ea', padding: '3px 9px', border: '1px solid #e2e2dc' }}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              {/* Indicadores de monitoramento */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: '14px 18px' }}>
                <p style={{ ...monoLabel, marginBottom: 10 }}>Indicadores de monitoramento</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {tema.indicadoresMonitoramento.map((ind, i) => (
                    <li key={i} style={{ display: 'flex', gap: 8, fontSize: '0.82rem', color: '#0a0a0a', marginBottom: 5, lineHeight: 1.5 }}>
                      <span style={{ color: '#f59e0b', fontWeight: 700, flexShrink: 0 }}>→</span>
                      {ind}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dica discursiva */}
              <div style={{ padding: '14px 18px', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.3)', borderLeft: '3px solid #f59e0b' }}>
                <p style={{ ...monoLabel, color: '#92400e', marginBottom: 8 }}>Dica discursiva</p>
                <p style={{ fontSize: '0.85rem', color: '#0a0a0a', lineHeight: 1.7 }}>{tema.dicaDiscursiva}</p>
              </div>

              {/* Resposta modelo — accordion */}
              <div id="resposta-modelo" style={{ background: '#ffffff', border: '2px solid #f59e0b', overflow: 'hidden' }}>
                <button
                  onClick={() => setRespostaAberta((p) => !p)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '14px 18px',
                    background: respostaAberta ? '#f59e0b' : 'rgba(245,158,11,0.08)',
                    border: 'none',
                    borderRadius: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <p style={{ ...monoLabel, color: '#92400e', fontWeight: 700 }}>
                    {respostaAberta ? '◆ Resposta modelo (esquema)' : '→ Ver resposta modelo (esquema)'}
                  </p>
                  <span style={{ color: '#92400e', fontSize: '0.75rem' }}>{respostaAberta ? '▲' : '▼'}</span>
                </button>
                {respostaAberta && (
                  <div style={{ borderTop: '1px solid #e2e2dc', padding: '14px 18px', background: '#fafaf7' }}>
                    <ol style={{ padding: '0 0 0 20px', margin: 0 }}>
                      {tema.respostaModeloEsquema.map((r, i) => (
                        <li key={i} style={{ fontSize: '0.83rem', color: '#0a0a0a', lineHeight: 1.65, marginBottom: 8 }}>{r}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS for spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
