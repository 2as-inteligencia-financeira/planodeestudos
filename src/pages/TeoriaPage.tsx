import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useConcurso } from '../contexts/ConcursoContext'
import type { QuadrixPeso } from '../data/sedes2026_data'
import PesoBadge from '../components/PesoBadge'

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

const monoLabel: React.CSSProperties = {
  fontFamily: '"DM Mono", monospace',
  fontSize: '0.65rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  color: '#999999',
}

export default function TeoriaPage() {
  const { teoria } = useConcurso()
  const [searchParams] = useSearchParams()

  const disciplinas = Array.from(new Set(teoria.map((t) => t.disciplinaId))).sort()

  const [discAtiva, setDiscAtiva] = useState<string>(() => {
    const p = searchParams.get('disc')
    return p && disciplinas.includes(p) ? p : 'all'
  })
  const [busca, setBusca] = useState('')
  const [openCards, setOpenCards] = useState<Set<string>>(new Set())

  function toggleCard(id: string) {
    setOpenCards((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const temasFiltrados = teoria.filter((t) => {
    const matchDisc = discAtiva === 'all' || t.disciplinaId === discAtiva
    const matchBusca =
      !busca ||
      t.topico.toLowerCase().includes(busca.toLowerCase()) ||
      t.resumo.toLowerCase().includes(busca.toLowerCase())
    return matchDisc && matchBusca
  })

  const pesoOrder: Record<QuadrixPeso, number> = { MUITO_ALTO: 0, ALTO: 1, MEDIO: 2, BAIXO: 3 }
  const temasSorted = [...temasFiltrados].sort(
    (a, b) => pesoOrder[a.quadrixPeso] - pesoOrder[b.quadrixPeso]
  )

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0a0a0a', marginBottom: 4 }}>
          Teoria
        </h1>
        <p style={{ ...monoLabel, fontSize: '0.7rem' }}>
          {teoria.length} tópicos · base Quadrix
        </p>
      </div>

      {/* Busca */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar tópico…"
          style={{
            width: '100%',
            maxWidth: 480,
            padding: '9px 14px',
            border: '1px solid #e2e2dc',
            background: '#ffffff',
            color: '#0a0a0a',
            fontSize: '0.875rem',
            borderRadius: 0,
            outline: 'none',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
        {/* Sidebar filtros */}
        <aside style={{ width: 200, flexShrink: 0 }}>
          <p style={{ ...monoLabel, marginBottom: 10 }}>Disciplina</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <button
              onClick={() => setDiscAtiva('all')}
              style={{
                textAlign: 'left',
                padding: '7px 10px',
                fontSize: '0.8rem',
                background: discAtiva === 'all' ? '#f59e0b' : 'transparent',
                color: discAtiva === 'all' ? '#0a0a0a' : '#606060',
                fontWeight: discAtiva === 'all' ? 700 : 400,
                border: 'none',
                borderRadius: 0,
                cursor: 'pointer',
              }}
            >
              Todas ({teoria.length})
            </button>
            {disciplinas.map((d) => {
              const count = teoria.filter((t) => t.disciplinaId === d).length
              const isAtiva = discAtiva === d
              return (
                <button
                  key={d}
                  onClick={() => setDiscAtiva(d)}
                  style={{
                    textAlign: 'left',
                    padding: '7px 10px',
                    fontSize: '0.8rem',
                    background: isAtiva ? '#f59e0b' : 'transparent',
                    color: isAtiva ? '#0a0a0a' : '#606060',
                    fontWeight: isAtiva ? 700 : 400,
                    border: 'none',
                    borderRadius: 0,
                    cursor: 'pointer',
                  }}
                >
                  {getDisciplinaLabel(d)} ({count})
                </button>
              )
            })}
          </div>
        </aside>

        {/* Lista de cards */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ ...monoLabel, marginBottom: 12 }}>
            {temasSorted.length} tópico{temasSorted.length !== 1 ? 's' : ''} encontrado{temasSorted.length !== 1 ? 's' : ''}
          </p>

          {temasSorted.length === 0 && (
            <p style={{ color: '#606060', fontWeight: 300 }}>Nenhum tópico encontrado com esses filtros.</p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {temasSorted.map((tema) => {
              const isOpen = openCards.has(tema.id)
              return (
                <div
                  key={tema.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e2dc',
                    overflow: 'hidden',
                  }}
                >
                  {/* Header do card — sempre visível */}
                  <button
                    onClick={() => toggleCard(tema.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '14px 18px',
                      background: 'none',
                      border: 'none',
                      borderRadius: 0,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                        <PesoBadge peso={tema.quadrixPeso} />
                        <span
                          style={{
                            ...monoLabel,
                            background: '#f0f0ea',
                            padding: '2px 7px',
                            color: '#606060',
                            fontSize: '0.6rem',
                          }}
                        >
                          {getDisciplinaLabel(tema.disciplinaId)}
                        </span>
                      </div>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0a0a0a', lineHeight: 1.4 }}>
                        {tema.topico}
                      </p>
                    </div>
                    <span style={{ color: '#999999', fontSize: '0.75rem', flexShrink: 0, marginTop: 2 }}>
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  {/* Conteúdo expandível */}
                  {isOpen && (
                    <div style={{ borderTop: '1px solid #e2e2dc' }}>
                      {/* Resumo */}
                      <div style={{ padding: '16px 18px', borderBottom: '1px solid #f0f0ea' }}>
                        <p style={{ ...monoLabel, marginBottom: 8 }}>Resumo</p>
                        <p style={{ fontSize: '0.85rem', color: '#0a0a0a', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                          {tema.resumo}
                        </p>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                        {/* Pontos-chave */}
                        <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0ea', borderRight: '1px solid #f0f0ea' }}>
                          <p style={{ ...monoLabel, marginBottom: 8 }}>Pontos-chave</p>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {tema.pontosChave.map((p, i) => (
                              <li key={i} style={{ display: 'flex', gap: 8, fontSize: '0.8rem', color: '#0a0a0a', marginBottom: 6, lineHeight: 1.5 }}>
                                <span style={{ color: '#f59e0b', fontWeight: 700, flexShrink: 0 }}>→</span>
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Esquema mental */}
                        <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0ea' }}>
                          <p style={{ ...monoLabel, marginBottom: 8 }}>Esquema mental</p>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {tema.esquema.map((e, i) => (
                              <li key={i} style={{ display: 'flex', gap: 8, fontSize: '0.8rem', color: '#0a0a0a', marginBottom: 6, lineHeight: 1.5 }}>
                                <span style={{ color: '#d97706', fontWeight: 700, flexShrink: 0 }}>◆</span>
                                {e}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Pegadinhas */}
                      <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0ea', background: '#fffbf0' }}>
                        <p style={{ ...monoLabel, marginBottom: 8, color: '#92400e' }}>Pegadinhas</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {tema.pegadinhas.map((p, i) => (
                            <li key={i} style={{ display: 'flex', gap: 8, fontSize: '0.8rem', color: '#92400e', marginBottom: 6, lineHeight: 1.5 }}>
                              <span style={{ flexShrink: 0 }}>⚠</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Dica Quadrix */}
                      <div
                        style={{
                          padding: '14px 18px',
                          borderBottom: '1px solid #f0f0ea',
                          background: 'rgba(245,158,11,0.07)',
                          borderLeft: '3px solid #f59e0b',
                        }}
                      >
                        <p style={{ ...monoLabel, color: '#92400e', marginBottom: 6 }}>Dica Quadrix</p>
                        <p style={{ fontSize: '0.82rem', color: '#0a0a0a', lineHeight: 1.6 }}>{tema.dicaQuadrix}</p>
                      </div>

                      {/* Referências */}
                      {tema.referencias && tema.referencias.length > 0 && (
                        <div style={{ padding: '12px 18px' }}>
                          <p style={{ ...monoLabel, marginBottom: 6 }}>Referências</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {tema.referencias.map((r, i) => (
                              <span
                                key={i}
                                style={{
                                  fontFamily: '"DM Mono", monospace',
                                  fontSize: '0.65rem',
                                  color: '#606060',
                                  background: '#f0f0ea',
                                  padding: '2px 8px',
                                  border: '1px solid #e2e2dc',
                                }}
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
