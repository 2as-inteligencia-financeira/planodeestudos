import { useState } from 'react'
import { useConcurso } from '../contexts/ConcursoContext'

const PROGRESSO_KEY = 'pec_progresso'

function getProgresso(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(PROGRESSO_KEY) || '{}') } catch { return {} }
}
function saveProgresso(p: Record<string, boolean>) {
  localStorage.setItem(PROGRESSO_KEY, JSON.stringify(p))
}

function formatDate(s: string) {
  const [y, m, d] = s.split('-')
  return `${d}/${m}/${y}`
}

export default function SimuladosPage() {
  const { cronograma, quadrixPerfil } = useConcurso()
  const [progresso, setProgresso] = useState<Record<string, boolean>>(getProgresso)
  const [openSimulados, setOpenSimulados] = useState<Set<string>>(new Set())

  const today = new Date().toISOString().split('T')[0]

  function toggleSimulado(data: string) {
    setOpenSimulados((prev) => {
      const next = new Set(prev)
      if (next.has(data)) next.delete(data)
      else next.add(data)
      return next
    })
  }

  function toggleFeito(data: string) {
    const novo = { ...progresso, [data]: !progresso[data] }
    setProgresso(novo)
    saveProgresso(novo)
  }

  // Extrair todos os dias com isSimulado === true, anotando semana, fase e metaAcerto
  const todosSimulados = cronograma.flatMap((semana) =>
    semana.dias
      .filter((d) => d.isSimulado)
      .map((d) => ({ dia: d, semana: semana.semana, fase: semana.fase, metaAcerto: semana.metaAcerto, periodo: semana.periodo }))
  )

  const proximos = todosSimulados
    .filter((s) => s.dia.data >= today)
    .sort((a, b) => a.dia.data.localeCompare(b.dia.data))

  const realizados = todosSimulados
    .filter((s) => s.dia.data < today)
    .sort((a, b) => b.dia.data.localeCompare(a.dia.data))

  const { discursiva } = quadrixPerfil

  const cardStyle: React.CSSProperties = {
    background: '#ffffff',
    border: '1px solid #e2e2dc',
    marginBottom: 12,
    overflow: 'hidden',
  }

  const monoLabel: React.CSSProperties = {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.65rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: '#999999',
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1
          className="text-4xl mb-1"
          style={{ fontWeight: 800, letterSpacing: '-0.03em', color: '#0a0a0a' }}
        >
          Simulados
        </h1>
        <p style={{ ...monoLabel, fontSize: '0.7rem' }}>Cronograma de Simulados</p>
      </div>

      {/* Próximos Simulados */}
      <section>
        <h2
          className="text-xl mb-4"
          style={{ fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em' }}
        >
          Próximos Simulados
        </h2>

        {proximos.length === 0 ? (
          <p style={{ color: '#606060', fontWeight: 300 }}>Nenhum simulado agendado a partir de hoje.</p>
        ) : (
          proximos.map(({ dia, semana, fase, metaAcerto }) => {
            const isHoje = dia.data === today
            const isOpen = openSimulados.has(dia.data)
            const feito = progresso[dia.data]

            return (
              <div key={dia.data} style={cardStyle}>
                {/* Linha amber topo */}
                <div style={{ height: 3, background: '#f59e0b' }} />
                <div style={{ padding: '16px 20px' }}>
                  {/* Linha 1: data + semana + fase */}
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0a0a0a' }}>
                      {dia.diaSemana}, {formatDate(dia.data)}
                    </span>
                    <span
                      style={{
                        ...monoLabel,
                        background: '#f0f0ea',
                        padding: '2px 7px',
                        fontSize: '0.6rem',
                      }}
                    >
                      Semana {semana} · Fase {fase}
                    </span>
                    {isHoje && (
                      <span
                        style={{
                          ...monoLabel,
                          background: '#f59e0b',
                          color: '#0a0a0a',
                          padding: '2px 7px',
                          fontSize: '0.6rem',
                          fontWeight: 700,
                        }}
                      >
                        Hoje
                      </span>
                    )}
                  </div>

                  {/* Linha 2: tópico */}
                  <p style={{ fontWeight: 400, fontSize: '0.875rem', color: '#0a0a0a', marginBottom: 6 }}>
                    {dia.blocoA.topico}
                  </p>

                  {/* Linha 3: meta de acerto */}
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      style={{
                        fontFamily: '"DM Mono", monospace',
                        fontSize: '0.7rem',
                        background: metaAcerto >= 75 ? '#fef3c7' : '#f0f0ea',
                        color: '#606060',
                        padding: '2px 8px',
                      }}
                    >
                      Meta: {metaAcerto}% de acerto
                    </span>
                  </div>

                  {/* Expandir blocos */}
                  <button
                    onClick={() => toggleSimulado(dia.data)}
                    style={{
                      background: 'none',
                      border: '1px solid #e2e2dc',
                      padding: '6px 14px',
                      fontSize: '0.75rem',
                      color: '#606060',
                      cursor: 'pointer',
                      marginRight: 10,
                      borderRadius: 0,
                    }}
                  >
                    {isOpen ? '▲ Ocultar detalhes' : '▼ Ver blocos'}
                  </button>

                  {/* Marcar realizado */}
                  <button
                    onClick={() => toggleFeito(dia.data)}
                    style={{
                      background: feito ? '#f0f0ea' : '#f59e0b',
                      border: feito ? '1px solid #e2e2dc' : 'none',
                      padding: '6px 14px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: feito ? '#606060' : '#0a0a0a',
                      cursor: 'pointer',
                      borderRadius: 0,
                    }}
                  >
                    {feito ? '✓ Realizado' : 'Marcar como realizado'}
                  </button>
                </div>

                {/* Blocos expandidos */}
                {isOpen && (
                  <div style={{ borderTop: '1px solid #e2e2dc', padding: '16px 20px', background: '#fafaf7' }}>
                    {[
                      { label: 'A', disc: dia.blocoA.disciplina, topico: dia.blocoA.topico, dur: dia.blocoA.duracao, color: '#f59e0b' },
                      { label: 'B', disc: dia.blocoB.disciplina, topico: dia.blocoB.topico, dur: dia.blocoB.duracao, color: '#606060' },
                      { label: 'C', disc: 'Atividade', topico: dia.blocoC.atividade, dur: dia.blocoC.duracao, color: '#999999' },
                    ].map((bloco) => (
                      <div key={bloco.label} className="flex items-start gap-3 mb-3 last:mb-0">
                        <span
                          style={{
                            background: bloco.color,
                            color: bloco.label === 'A' ? '#0a0a0a' : '#ffffff',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            width: 22,
                            height: 22,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: 2,
                          }}
                        >
                          {bloco.label}
                        </span>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.8rem', color: '#0a0a0a' }}>{bloco.disc}</p>
                          <p style={{ fontWeight: 300, fontSize: '0.8rem', color: '#606060', marginTop: 2 }}>{bloco.topico}</p>
                          <p style={{ ...monoLabel, marginTop: 3 }}>{bloco.dur} min</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
      </section>

      {/* Simulados Realizados */}
      {realizados.length > 0 && (
        <section>
          <h2
            className="text-xl mb-4"
            style={{ fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em' }}
          >
            Simulados Realizados
          </h2>
          <div>
            {realizados.map(({ dia, semana, fase, metaAcerto }) => {
              const feito = progresso[dia.data]
              return (
                <div
                  key={dia.data}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e2dc',
                    marginBottom: 8,
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    flexWrap: 'wrap' as const,
                  }}
                >
                  <div>
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span style={{ fontWeight: 600, fontSize: '0.82rem', color: '#0a0a0a' }}>
                        {dia.diaSemana}, {formatDate(dia.data)}
                      </span>
                      <span style={{ ...monoLabel, background: '#f0f0ea', padding: '1px 6px', fontSize: '0.6rem' }}>
                        Sem {semana} · F{fase}
                      </span>
                    </div>
                    <p style={{ fontWeight: 300, fontSize: '0.8rem', color: '#606060' }}>
                      {dia.blocoA.topico.slice(0, 80)}{dia.blocoA.topico.length > 80 ? '…' : ''}
                    </p>
                    <p style={{ ...monoLabel, marginTop: 4 }}>Meta: {metaAcerto}%</p>
                  </div>
                  <span
                    style={{
                      ...monoLabel,
                      background: feito ? '#d1fae5' : '#f0f0ea',
                      color: feito ? '#065f46' : '#999999',
                      padding: '3px 10px',
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      flexShrink: 0,
                    }}
                  >
                    {feito ? 'REALIZADO' : 'PENDENTE'}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Guia da Discursiva */}
      <section>
        <h2
          className="text-xl mb-4"
          style={{ fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em' }}
        >
          Guia da Discursiva
        </h2>

        <div style={{ ...cardStyle, marginBottom: 0 }}>
          <div style={{ height: 3, background: '#f59e0b' }} />
          <div style={{ padding: '20px 24px' }}>
            {/* Formato e extensão */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p style={monoLabel}>Formato</p>
                <p style={{ fontWeight: 400, fontSize: '0.875rem', color: '#0a0a0a', marginTop: 4 }}>
                  {discursiva.formato}
                </p>
              </div>
              <div>
                <p style={monoLabel}>Extensão</p>
                <p style={{ fontWeight: 400, fontSize: '0.875rem', color: '#0a0a0a', marginTop: 4 }}>
                  {discursiva.extensao}
                </p>
              </div>
            </div>

            {/* Critérios */}
            <div className="mb-6">
              <p style={{ ...monoLabel, marginBottom: 12 }}>Critérios de Avaliação</p>
              <div className="space-y-3">
                {(Object.entries(discursiva.criterios) as [string, string][]).map(([sigla, desc]) => {
                  const colors: Record<string, { bg: string; border: string; text: string }> = {
                    CAC: { bg: '#fefce8', border: '#fef08a', text: '#854d0e' },
                    OT:  { bg: '#f0f9ff', border: '#bae6fd', text: '#0c4a6e' },
                    DLP: { bg: '#f0fdf4', border: '#bbf7d0', text: '#14532d' },
                  }
                  const c = colors[sigla] || { bg: '#f0f0ea', border: '#e2e2dc', text: '#606060' }
                  return (
                    <div
                      key={sigla}
                      style={{
                        background: c.bg,
                        border: `1px solid ${c.border}`,
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 12,
                      }}
                    >
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: c.text, flexShrink: 0 }}>
                        {sigla}
                      </span>
                      <p style={{ fontSize: '0.82rem', color: c.text, lineHeight: 1.5 }}>{desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Temática */}
            <div className="mb-6">
              <p style={monoLabel}>Temática Esperada</p>
              <p style={{ fontWeight: 300, fontSize: '0.875rem', color: '#606060', marginTop: 4, lineHeight: 1.6 }}>
                {discursiva.tematica}
              </p>
            </div>

            {/* Estrutura recomendada */}
            <div
              style={{
                background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.25)',
                padding: '18px 20px',
              }}
            >
              <p style={{ ...monoLabel, color: '#92400e', marginBottom: 12 }}>Estrutura Recomendada de Resposta</p>
              <p style={{ fontWeight: 500, fontSize: '0.85rem', color: '#0a0a0a', marginBottom: 14, lineHeight: 1.6 }}>
                {discursiva.dica}
              </p>
              <div className="space-y-2">
                {[
                  { label: 'Contextualização', desc: '2-3 linhas situando o tema' },
                  { label: 'Problema identificado', desc: 'Qual é o desafio/questão central' },
                  { label: 'Causas', desc: 'Fatores que explicam o problema' },
                  { label: 'Soluções', desc: 'Propostas fundamentadas na legislação/teoria' },
                  { label: 'Indicadores de monitoramento', desc: 'Como medir os resultados' },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      background: '#ffffff',
                      border: '1px solid #e2e2dc',
                      padding: '8px 12px',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        color: '#f59e0b',
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {i + 1}.
                    </span>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.8rem', color: '#0a0a0a' }}>{item.label}</p>
                      <p style={{ fontSize: '0.75rem', color: '#606060', marginTop: 1 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
