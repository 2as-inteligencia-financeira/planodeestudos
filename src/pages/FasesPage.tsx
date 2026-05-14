import { useConcurso } from '../contexts/ConcursoContext'
import ProgressBar from '../components/ProgressBar'

function parsePeriodo(periodo: string): { inicio: Date; fim: Date } | null {
  const meses: Record<string, number> = {
    Jan: 0, Fev: 1, Mar: 2, Abr: 3, Mai: 4, Jun: 5,
    Jul: 6, Ago: 7, Set: 8, Out: 9, Nov: 10, Dez: 11,
  }
  try {
    const parts = periodo.split(' a ')
    if (parts.length !== 2) return null

    // fim always has "DD/MMM" — extract the month for start if missing
    const fimTrimmed = parts[1].trim()
    const [, mesFim] = fimTrimmed.split('/')

    const parse = (s: string, fallbackMes?: string): Date => {
      const t = s.trim()
      if (t.includes('/')) {
        const [dia, mes] = t.split('/')
        return new Date(2026, meses[mes] ?? 0, parseInt(dia))
      }
      // format "DD" without month — same month as end date
      return new Date(2026, meses[fallbackMes ?? ''] ?? 0, parseInt(t))
    }

    return {
      inicio: parse(parts[0], mesFim),
      fim: parse(fimTrimmed),
    }
  } catch {
    return null
  }
}

function getPeriodoProgress(periodo: string): number {
  const range = parsePeriodo(periodo)
  if (!range) return 0
  const now = new Date().getTime()
  const total = range.fim.getTime() - range.inicio.getTime()
  const passed = now - range.inicio.getTime()
  return Math.min(100, Math.max(0, (passed / total) * 100))
}

const faseColors: Record<number, { bg: string; border: string; badge: string; bar: string }> = {
  1: { bg: 'bg-sky-50', border: 'border-sky-300', badge: 'bg-sky-100 text-sky-800', bar: 'bg-sky-500' },
  2: { bg: 'bg-indigo-50', border: 'border-indigo-300', badge: 'bg-indigo-100 text-indigo-800', bar: 'bg-indigo-500' },
  3: { bg: 'bg-amber-50', border: 'border-amber-300', badge: 'bg-amber-100 text-amber-800', bar: 'bg-amber-500' },
  4: { bg: 'bg-red-50', border: 'border-red-300', badge: 'bg-red-100 text-red-800', bar: 'bg-red-500' },
}

export default function FasesPage() {
  const { fases } = useConcurso()

  function getFaseAtualId(): number | null {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    for (const fase of fases) {
      const range = parsePeriodo(fase.periodo)
      if (range && today >= range.inicio && today <= range.fim) return fase.id
    }
    return null
  }

  const faseAtualId = getFaseAtualId()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Fases do Estudo</h1>
        <p className="text-gray-500 mt-1">4 fases cobrindo 18/Mai a 05/Set/2026</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {fases.map((fase) => {
          const isCurrent = faseAtualId !== null && fase.id === faseAtualId
          const colors = faseColors[fase.id] || faseColors[1]
          const progress = getPeriodoProgress(fase.periodo)

          return (
            <div
              key={fase.id}
              className={`rounded-xl border-2 shadow-sm p-5 transition-all ${
                isCurrent ? `${colors.bg} ${colors.border}` : 'bg-white border-gray-200'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-bold text-gray-900 text-base">{fase.nome}</h2>
                    {isCurrent && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
                        Fase atual
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{fase.periodo} • Semanas {fase.semanas}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-bold text-gray-800">{fase.metaAcerto}%</p>
                  <p className="text-xs text-gray-400">meta</p>
                </div>
              </div>

              {/* Progress bar do período */}
              {isCurrent && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progresso do período</span>
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                  <ProgressBar value={progress} color={colors.bar} height="h-2" />
                </div>
              )}

              {/* Descrição */}
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{fase.descricao}</p>

              {/* Objetivos */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Objetivos</p>
                <ul className="space-y-1.5">
                  {fase.objetivos.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className={`mt-0.5 shrink-0 font-bold ${isCurrent ? 'text-sky-500' : 'text-gray-400'}`}>
                        →
                      </span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      {/* Visão geral timeline */}
      <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Timeline Geral</h2>
        <div className="relative">
          {/* Linha base */}
          <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-gray-200" />
          <div className="space-y-4 pl-10">
            {fases.map((fase) => {
              const isCurrent = faseAtualId !== null && fase.id === faseAtualId
              const colors = faseColors[fase.id] || faseColors[1]
              const range = parsePeriodo(fase.periodo)
              const passed = range ? new Date() > range.fim : false

              return (
                <div key={fase.id} className="relative">
                  {/* Dot */}
                  <div
                    className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 ${
                      isCurrent
                        ? `${colors.bar} border-white ring-2 ring-offset-1 ring-sky-400`
                        : passed
                        ? 'bg-gray-400 border-white'
                        : 'bg-white border-gray-300'
                    }`}
                  />
                  <div className={`rounded-lg p-3 ${isCurrent ? colors.bg : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-gray-800 text-sm">{fase.nome}</p>
                      {isCurrent && <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge}`}>Atual</span>}
                      {passed && !isCurrent && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Concluída</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{fase.periodo} · Meta: {fase.metaAcerto}%</p>
                  </div>
                </div>
              )
            })}

            {/* Prova */}
            <div className="relative">
              <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white" />
              <div className="rounded-lg p-3 bg-red-50 border border-red-200">
                <p className="font-semibold text-red-800 text-sm">PROVA — 06/09/2026</p>
                <p className="text-xs text-red-600 mt-0.5">Turno Matutino · 4 horas · 60 questões + discursiva</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
