import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useConcurso } from '../contexts/ConcursoContext'

// Mapeia o texto livre do cronograma para o disciplinaId usado em Teoria/Questões
function discToId(nome: string): string | null {
  const n = nome.toLowerCase()
  if (n.includes('gestão de projetos') || n.includes('pmbok') || n.includes('scrum') || n.includes('ágil') || n.includes('agil')) return 'projetos'
  if (n.includes('língua portuguesa') || n === 'lp' || n.includes('morfossintax') || n.includes('coesão') || n.includes('interpretação') || n.includes('reescrita')) return 'lp'
  if (n.includes('tga') || n.includes('teoria ger') || n.includes('podc') || n.includes('taylor') || n.includes('fayol') || n.includes('cultura org') || n.includes('processo decis')) return 'tga'
  if (n.includes('gestão de pessoas') || n.includes('liderança') || n.includes('motivação') || n.includes('recrutamento') || n.includes('desempenho') || n.includes('competências') || n.includes('treinamento')) return 'gp'
  if (n.includes('afo') || n.includes('orçamento') || n.includes('lrf') || n.includes('despesa') || n.includes('receita') || n.includes('siafem') || n.includes('restos a pagar') || n.includes('empenho')) return 'afo'
  if (n.includes('os&m') || n.includes('osm') || n.includes('qualidade') || n.includes('pdca') || n.includes('5s') || n.includes('bsc') || n.includes('fluxograma') || n.includes('mapeamento') || n.includes('balanced')) return 'osm'
  if (n.includes('suas') || n.includes('loas') || n.includes('pnas') || n.includes('nob') || n.includes('tipificação') || n.includes('cras') || n.includes('creas') || n.includes('mrosc') || n.includes('socioassist') || n.includes('proteção básica') || n.includes('proteção especial') || n.includes('cadúnico') || n.includes('cadunico') || n.includes('bpc')) return 'suas'
  if (n.includes('direitos') || n.includes('eca') || n.includes('lbi') || n.includes('estatuto') || n.includes('idoso') || n.includes('diversidade') || n.includes('pop rua') || n.includes('sinase')) return 'direitos'
  if (n.includes('programas') || n.includes('benefícios eventuais') || n.includes('prato cheio') || n.includes('sisan')) return 'programas'
  if (n.includes('lc 840') || n.includes('lei maria') || n.includes('lei 7.484') || n.includes('lodf') || n.includes('pdpm') || n.includes('primeiros socorros') || n.includes('conhecimentos do df') || n.includes('realidade do df') || n.includes('violência')) return 'df'
  return null
}

const PROGRESSO_KEY = 'pec_progresso'

function getProgresso(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(PROGRESSO_KEY) || '{}')
  } catch {
    return {}
  }
}
function saveProgresso(p: Record<string, boolean>) {
  localStorage.setItem(PROGRESSO_KEY, JSON.stringify(p))
}

function formatDate(s: string) {
  const [y, m, d] = s.split('-')
  return `${d}/${m}/${y}`
}

// Botão de link para teoria ou questões
function DiscLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick() }}
      style={{
        fontFamily: '"DM Mono", monospace',
        fontSize: '0.58rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase' as const,
        color: '#f59e0b',
        background: 'rgba(245,158,11,0.08)',
        border: '1px solid rgba(245,158,11,0.25)',
        padding: '2px 7px',
        cursor: 'pointer',
        lineHeight: 1.6,
        whiteSpace: 'nowrap' as const,
      }}
    >
      {label}
    </button>
  )
}

export default function CronogramaPage() {
  const { cronograma, meta } = useConcurso()
  const navigate = useNavigate()
  const [faseAtiva, setFaseAtiva] = useState(1)
  const [progresso, setProgresso] = useState<Record<string, boolean>>(getProgresso)
  const todayStr = new Date().toISOString().split('T')[0]

  function getSemanaAtualNum(): number {
    for (const s of cronograma) {
      if (s.dias.some((d) => d.data === todayStr)) return s.semana
      const datas = s.dias.map((d) => d.data).sort()
      if (todayStr >= datas[0] && todayStr <= datas[datas.length - 1]) return s.semana
    }
    return 1
  }

  const [openSemanas, setOpenSemanas] = useState<Set<number>>(new Set([getSemanaAtualNum()]))

  useEffect(() => {
    setProgresso(getProgresso())
  }, [])

  function toggleSemana(n: number) {
    setOpenSemanas((prev) => {
      const next = new Set(prev)
      if (next.has(n)) next.delete(n)
      else next.add(n)
      return next
    })
  }

  function toggleDia(data: string) {
    const novo = { ...progresso, [data]: !progresso[data] }
    setProgresso(novo)
    saveProgresso(novo)
  }

  const semanasFase = cronograma.filter((s) => s.fase === faseAtiva)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cronograma</h1>
        <p className="text-gray-500 mt-1">16 semanas de estudos — 18/Mai a 05/Set/2026</p>
      </div>

      {/* Tabs de fase */}
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3, 4].map((f) => (
          <button
            key={f}
            onClick={() => setFaseAtiva(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              faseAtiva === f
                ? 'bg-sky-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Fase {f}
          </button>
        ))}
      </div>

      {/* Semanas */}
      <div className="space-y-3">
        {semanasFase.map((semana) => {
          const isOpen = openSemanas.has(semana.semana)
          const temHoje = semana.dias.some((d) => d.data === todayStr)
          const total = semana.dias.length
          const feitos = semana.dias.filter((d) => progresso[d.data]).length

          return (
            <div
              key={semana.semana}
              className={`bg-white border rounded-xl shadow-sm overflow-hidden ${
                temHoje ? 'border-sky-300' : 'border-gray-200'
              }`}
            >
              {/* Header da semana */}
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                onClick={() => toggleSemana(semana.semana)}
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded">
                    Semana {semana.semana}
                  </span>
                  {temHoje && (
                    <span className="bg-sky-100 text-sky-700 text-xs font-medium px-2 py-1 rounded">
                      Semana atual
                    </span>
                  )}
                  <span className="text-sm text-gray-700 font-medium">{semana.periodo}</span>
                  <span className="text-xs text-gray-400">{semana.foco.slice(0, 60)}…</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-gray-500">{feitos}/{total} dias</span>
                  <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
                </div>
              </button>

              {/* Conteúdo */}
              {isOpen && (
                <div className="border-t border-gray-100">
                  <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Foco: </span>{semana.foco}
                    </p>
                    <p className="text-sm text-emerald-600 mt-1">
                      <span className="font-medium">Meta: </span>{semana.metaAcerto}% de acerto
                    </p>
                  </div>

                  {/* Tabela de dias */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Dia</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Data</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Bloco A</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Bloco B</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Bloco C</th>
                          <th className="px-4 py-2 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {semana.dias.map((dia) => {
                          const feito = progresso[dia.data]
                          const isHoje = dia.data === todayStr
                          return (
                            <tr
                              key={dia.data}
                              className={`transition-colors ${
                                isHoje ? 'bg-sky-50' : feito ? 'bg-emerald-50' : 'hover:bg-gray-50'
                              }`}
                            >
                              <td className="px-4 py-3 font-medium text-gray-700">
                                {dia.diaSemana}
                                {dia.isSimulado && (
                                  <span className="ml-1 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
                                    Sim
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(dia.data)}</td>
                              <td className="px-4 py-3 max-w-xs">
                                <p className="font-medium text-sky-700 text-xs">{dia.blocoA.disciplina}</p>
                                <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{dia.blocoA.topico}</p>
                                {(() => {
                                  const id = discToId(dia.blocoA.disciplina)
                                  if (!id) return null
                                  return (
                                    <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                                      <DiscLink label="→ teoria" onClick={() => navigate(`/${meta.id}/teoria?disc=${id}`)} />
                                      <DiscLink label="→ questões" onClick={() => navigate(`/${meta.id}/questoes?disc=${id}`)} />
                                    </div>
                                  )
                                })()}
                              </td>
                              <td className="px-4 py-3 max-w-xs">
                                <p className="font-medium text-indigo-700 text-xs">{dia.blocoB.disciplina}</p>
                                <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{dia.blocoB.topico}</p>
                                {(() => {
                                  const id = discToId(dia.blocoB.disciplina)
                                  if (!id) return null
                                  return (
                                    <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                                      <DiscLink label="→ teoria" onClick={() => navigate(`/${meta.id}/teoria?disc=${id}`)} />
                                      <DiscLink label="→ questões" onClick={() => navigate(`/${meta.id}/questoes?disc=${id}`)} />
                                    </div>
                                  )
                                })()}
                              </td>
                              <td className="px-4 py-3 max-w-xs">
                                <p className="text-gray-600 text-xs leading-relaxed">{dia.blocoC.atividade}</p>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  onClick={() => toggleDia(dia.data)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                                    feito
                                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                      : 'bg-gray-100 text-gray-600 hover:bg-sky-100 hover:text-sky-700'
                                  }`}
                                >
                                  {feito ? '✓ Feito' : 'Marcar'}
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
