import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useConcurso } from '../contexts/ConcursoContext'
import { useProgresso } from '../hooks/useProgresso'
import type { DiaEstudo, SemanaEstudo } from '../data/sedes2026_data'

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

/** Verifica se o cronograma usa datas relativas (sem campo `data` nos dias) */
function isRelativeCronograma(cronograma: unknown[]): boolean {
  const primeiro = (cronograma[0] as SemanaEstudo | undefined)?.dias?.[0] as Record<string, unknown> | undefined
  return !!primeiro && !('data' in primeiro) && ('semanaRelativa' in primeiro)
}

/** Gera uma chave de progresso para dia relativo: rel_s1d0 */
function relKey(semana: number, diaIdx: number): string {
  return `rel_s${semana}d${diaIdx}`
}

/** Define data inicio estudos key no localStorage */
const START_DATE_KEY_PREFIX = 'pec_startdate_'

function getStartDate(concursoId: string): string | null {
  return localStorage.getItem(START_DATE_KEY_PREFIX + concursoId)
}

function setStartDate(concursoId: string, date: string) {
  localStorage.setItem(START_DATE_KEY_PREFIX + concursoId, date)
}

/** Modal para definir data de início */
function ModalDefinirData({ onSalvar, onFechar }: { onSalvar: (d: string) => void; onFechar: () => void }) {
  const [val, setVal] = useState(new Date().toISOString().split('T')[0])
  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
      }}
      onClick={onFechar}
    >
      <div
        style={{ background: '#fff', padding: 32, width: 360, border: '1px solid #e2e2dc' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>Definir data de início</h3>
        <p style={{ fontSize: '0.82rem', color: '#606060', marginBottom: 16, lineHeight: 1.5 }}>
          Escolha a data em que os estudos começam (Semana 1 — Dia 1). O cronograma será calculado a partir daí.
        </p>
        <input
          type="date"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e2dc', marginBottom: 16, fontSize: '0.9rem' }}
        />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button
            onClick={onFechar}
            style={{ padding: '8px 16px', background: 'none', border: '1px solid #e2e2dc', cursor: 'pointer', fontSize: '0.82rem' }}
          >
            Cancelar
          </button>
          <button
            onClick={() => val && onSalvar(val)}
            style={{ padding: '8px 16px', background: '#f59e0b', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem' }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { cronograma, fases, benchmarks, meta, config } = useConcurso()
  const navigate = useNavigate()
  const { progresso, toggleDia } = useProgresso(meta.id)

  const isRelativo = isRelativeCronograma(cronograma)
  const isPreEdital = (config as Record<string, unknown> | undefined)?.status === 'PRE_EDITAL'

  const [startDate, setStartDateState] = useState<string | null>(() => getStartDate(meta.id))
  const [showModal, setShowModal] = useState(false)

  const todayStr = new Date().toISOString().split('T')[0]

  // ---- Helpers para cronograma ABSOLUTO ----
  const cronogramaStart = !isRelativo && cronograma.length > 0 ? (cronograma[0] as SemanaEstudo).dias[0]?.data ?? '' : ''
  const preStart = !isRelativo && cronogramaStart !== '' && todayStr < cronogramaStart

  function getDiasAteProva() {
    if (!meta.dataProva) return null
    return Math.ceil((new Date(meta.dataProva).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  }

  function getDiasAteInicio(): number {
    if (!cronogramaStart) return 0
    const start = new Date(cronogramaStart + 'T00:00:00')
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  }

  function getSemanaAtual(): SemanaEstudo | null {
    if (isRelativo) {
      // sem datas absolutas → primeira semana como referência
      return cronograma[0] as SemanaEstudo ?? null
    }
    if (preStart) return cronograma[0] as SemanaEstudo ?? null
    return (
      (cronograma as SemanaEstudo[]).find((s) => s.dias.some((d) => d.data === todayStr)) ||
      (cronograma as SemanaEstudo[]).find((s) => {
        const datas = s.dias.map((d) => d.data).sort()
        return todayStr >= datas[0] && todayStr <= datas[datas.length - 1]
      }) ||
      null
    )
  }

  function getDiaAtual(): DiaEstudo | null {
    if (isRelativo) return null
    for (const semana of cronograma as SemanaEstudo[]) {
      for (const dia of semana.dias) {
        if (dia.data === todayStr) return dia
      }
    }
    return null
  }

  function getFaseAtual() {
    const semana = getSemanaAtual()
    if (!semana) return null
    return fases.find((f) => f.id === semana.fase) || null
  }

  function getDiasEstaSemanaCronograma(): DiaEstudo[] {
    const semana = getSemanaAtual()
    if (!semana) return []
    return semana.dias
  }

  function getSimuladosProximos(): Array<{ dia: DiaEstudo; semana: number }> {
    if (isRelativo) return []
    const semana = getSemanaAtual()
    if (!semana) return []
    const proxIdx = (cronograma as SemanaEstudo[]).findIndex((s) => s.semana === semana.semana)
    const semanas = (cronograma as SemanaEstudo[]).slice(proxIdx, proxIdx + 2)
    const result: Array<{ dia: DiaEstudo; semana: number }> = []
    for (const s of semanas) {
      for (const d of s.dias) {
        if (d.isSimulado) result.push({ dia: d, semana: s.semana })
      }
    }
    return result
  }

  const diasAteProva = getDiasAteProva()
  const semanaAtual = getSemanaAtual()
  const diaAtual = getDiaAtual()
  const faseAtual = getFaseAtual()
  const diasSemana = getDiasEstaSemanaCronograma()
  const simuladosProximos = getSimuladosProximos()
  const isWeekend = [0, 6].includes(new Date().getDay()) && !diaAtual

  function handleSalvarData(d: string) {
    setStartDate(meta.id, d)
    setStartDateState(d)
    setShowModal(false)
  }

  // ---- PRÉ-EDITAL + relativo sem data de início ----
  if (isRelativo && !startDate) {
    return (
      <div className="space-y-8">
        {showModal && <ModalDefinirData onSalvar={handleSalvarData} onFechar={() => setShowModal(false)} />}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Sua central de estudos para o {meta.nome}</p>
        </div>

        {/* Cards resumo PRÉ-EDITAL */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-amber-200 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-amber-500">—</p>
            <p className="text-sm text-gray-500 mt-1">Dias até a prova</p>
            <p className="text-xs text-amber-600 mt-1">a definir</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
            <p className="text-4xl font-bold text-indigo-500">{(cronograma as SemanaEstudo[]).length}</p>
            <p className="text-sm text-gray-500 mt-1">Semanas no plano</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
            <p className="text-4xl font-bold text-emerald-500">{fases.length}</p>
            <p className="text-sm text-gray-500 mt-1">Fases de estudo</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
            <p className="text-4xl font-bold text-amber-500">
              {(cronograma[0] as SemanaEstudo | undefined)?.metaAcerto ?? '—'}%
            </p>
            <p className="text-sm text-gray-500 mt-1">Meta Semana 1</p>
          </div>
        </div>

        {/* CTA definir data */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">📅</div>
          <h2 className="text-lg font-bold text-amber-900 mb-2">Defina sua data de início</h2>
          <p className="text-amber-700 text-sm mb-6 max-w-md mx-auto">
            Este plano usa um cronograma relativo (sem datas fixas). Escolha quando começar a Semana 1 para ativar o controle de progresso diário.
            {isPreEdital && ' Quando o edital for publicado, as datas serão confirmadas.'}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors"
          >
            Definir data de início →
          </button>
          <p className="text-xs text-amber-600 mt-4">
            Você pode alterar essa data a qualquer momento no Dashboard.
          </p>
        </div>

        {/* Benchmarks */}
        <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Mínimos de aprovação</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-800">{(benchmarks as Record<string, unknown>).minimoAprovacaoGerais as number ?? '—'}</p>
              <p className="text-xs text-gray-500 mt-1">de gerais</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{(benchmarks as Record<string, unknown>).minimoAprovacaoEspecificos as number ?? '—'}</p>
              <p className="text-xs text-gray-500 mt-1">% específicos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{(benchmarks as Record<string, unknown>).minimoAprovacaoDiscursiva as number ?? '—'}%</p>
              <p className="text-xs text-gray-500 mt-1">discursiva</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {showModal && <ModalDefinirData onSalvar={handleSalvarData} onFechar={() => setShowModal(false)} />}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Sua central de estudos para o {meta.nome}</p>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
          {diasAteProva !== null ? (
            <>
              <p className="text-4xl font-bold text-sky-500">{diasAteProva}</p>
              <p className="text-sm text-gray-500 mt-1">Dias até a prova</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-amber-500">—</p>
              <p className="text-sm text-gray-500 mt-1">Dias até a prova</p>
              <p className="text-xs text-amber-600 mt-1">a definir</p>
            </>
          )}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
          <p className="text-4xl font-bold text-indigo-500">{semanaAtual ? semanaAtual.semana : '—'}</p>
          <p className="text-sm text-gray-500 mt-1">Semana {isRelativo ? 'de início' : 'atual'}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
          <p className="text-4xl font-bold text-emerald-500">{faseAtual ? faseAtual.id : '—'}</p>
          <p className="text-sm text-gray-500 mt-1">Fase {isRelativo ? 'inicial' : 'atual'}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
          <p className="text-4xl font-bold text-amber-500">
            {semanaAtual ? `${semanaAtual.metaAcerto}%` : '—'}
          </p>
          <p className="text-sm text-gray-500 mt-1">Meta de acerto</p>
        </div>
      </div>

      {/* Botão alterar data de início (modo relativo com data já definida) */}
      {isRelativo && startDate && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3">
          <span className="text-sm text-amber-800">📅 Início dos estudos: <strong>{formatDate(startDate)}</strong></span>
          <button
            onClick={() => setShowModal(true)}
            className="text-xs text-amber-600 underline hover:text-amber-800"
          >
            Alterar
          </button>
        </div>
      )}

      {/* Hoje */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Hoje — {formatDate(todayStr)}</h2>
        {isRelativo ? (
          // Modo relativo: mostrar Semana 1 como referência
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-amber-900 font-semibold text-base mb-1">Plano relativo ativo</p>
            <p className="text-amber-700 text-sm mb-4">
              O cronograma está calculado a partir de {formatDate(startDate!)}. Veja sua agenda completa no Cronograma.
            </p>
            <button
              onClick={() => navigate(`/${meta.id}/cronograma`)}
              className="px-5 py-2 bg-amber-500 text-white font-semibold text-sm rounded-lg hover:bg-amber-600 transition-colors"
            >
              Ver Cronograma →
            </button>
          </div>
        ) : isWeekend && !diaAtual ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <p className="text-green-800 font-semibold">Dia de descanso!</p>
            <p className="text-green-600 text-sm mt-1">Descanse e recarregue as energias para a semana.</p>
          </div>
        ) : diaAtual ? (
          <div className={`bg-white border rounded-xl shadow-sm overflow-hidden ${diaAtual.isSimulado ? 'border-amber-300' : 'border-gray-200'}`}>
            {diaAtual.isSimulado && (
              <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2">
                <span className="text-amber-800 font-medium text-sm">Dia de Simulado</span>
              </div>
            )}
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <span className="bg-sky-100 text-sky-700 text-xs font-bold px-2 py-1 rounded mt-0.5 shrink-0">A</span>
                <div>
                  <p className="font-medium text-gray-900">{diaAtual.blocoA.disciplina}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{diaAtual.blocoA.topico}</p>
                  <p className="text-xs text-gray-400 mt-1">{diaAtual.blocoA.duracao} min</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded mt-0.5 shrink-0">B</span>
                <div>
                  <p className="font-medium text-gray-900">{diaAtual.blocoB.disciplina}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{diaAtual.blocoB.topico}</p>
                  <p className="text-xs text-gray-400 mt-1">{diaAtual.blocoB.duracao} min</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mt-0.5 shrink-0">C</span>
                <div>
                  <p className="font-medium text-gray-900">Atividade</p>
                  <p className="text-sm text-gray-500 mt-0.5">{diaAtual.blocoC.atividade}</p>
                  <p className="text-xs text-gray-400 mt-1">{diaAtual.blocoC.duracao} min</p>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => toggleDia(todayStr)}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                    progresso[todayStr]
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-sky-600 text-white hover:bg-sky-700'
                  }`}
                >
                  {progresso[todayStr] ? '✓ Concluído!' : 'Marcar como concluído'}
                </button>
              </div>
            </div>
          </div>
        ) : preStart ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-900 font-semibold text-base">
              As aulas começam em {formatDate(cronogramaStart)} — em {getDiasAteInicio()} dia{getDiasAteInicio() !== 1 ? 's' : ''}
            </p>
            <p className="text-amber-700 text-sm mt-1 mb-4">Use esse tempo para revisar o edital e organizar seus materiais.</p>
            <button
              onClick={() => navigate(`/${meta.id}/cronograma`)}
              className="px-5 py-2 bg-amber-500 text-white font-semibold text-sm rounded-lg hover:bg-amber-600 transition-colors"
            >
              Ver cronograma da Semana 1 →
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <p className="text-gray-500">Nenhuma aula programada para hoje.</p>
          </div>
        )}
      </section>

      {/* Esta semana — só no modo absoluto */}
      {!isRelativo && diasSemana.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Esta Semana — Semana {semanaAtual?.semana}
            {semanaAtual && <span className="text-sm font-normal text-gray-500 ml-2">({semanaAtual.periodo})</span>}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {diasSemana.map((dia) => {
              const isHoje = dia.data === todayStr
              const feito = progresso[dia.data]
              return (
                <div
                  key={dia.data}
                  className={`bg-white border rounded-lg p-3 text-center transition-all ${
                    isHoje ? 'border-sky-400 ring-2 ring-sky-200' : feito ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200'
                  }`}
                >
                  <p className="text-xs text-gray-400 mb-1">{dia.diaSemana.slice(0, 3)}</p>
                  <p className="text-sm font-semibold text-gray-700">{dia.data.slice(8)}/{dia.data.slice(5, 7)}</p>
                  {dia.isSimulado && <p className="text-xs text-amber-600 mt-1">Simulado</p>}
                  <button
                    onClick={() => toggleDia(dia.data)}
                    className={`mt-2 w-full text-xs py-1 rounded transition-colors ${
                      feito
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-500 hover:bg-sky-100 hover:text-sky-700'
                    }`}
                  >
                    {feito ? '✓ Feito' : 'Marcar'}
                  </button>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Simulados próximos — só no modo absoluto */}
      {!isRelativo && simuladosProximos.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Simulados — Esta e próxima semana</h2>
          <div className="space-y-3">
            {simuladosProximos.map(({ dia, semana }) => (
              <div key={dia.data} className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-amber-900">{dia.blocoA.disciplina}</p>
                    <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">Semana {semana}</span>
                    {dia.data === todayStr && (
                      <span className="text-xs bg-sky-200 text-sky-800 px-2 py-0.5 rounded-full">Hoje!</span>
                    )}
                  </div>
                  <p className="text-sm text-amber-700 mt-1">{dia.blocoA.topico}</p>
                  <p className="text-xs text-amber-600 mt-1">{dia.diaSemana}, {formatDate(dia.data)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Info da fase */}
      {faseAtual && (
        <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{faseAtual.nome}</h2>
          <p className="text-sm text-gray-500 mb-3">{faseAtual.descricao}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-gray-400">Período: </span>
              <span className="font-medium text-gray-700">{faseAtual.periodo ?? faseAtual.semanas ?? '—'}</span>
            </div>
            <div>
              <span className="text-gray-400">Meta de acerto: </span>
              <span className="font-medium text-emerald-600">{faseAtual.metaAcerto}%</span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Objetivos da fase</p>
            <ul className="space-y-1">
              {(faseAtual.objetivos ?? []).map((obj: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-sky-500 mt-0.5 shrink-0">→</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Benchmarks rápidos */}
      <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Mínimos de aprovação</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-800">{(benchmarks as Record<string, unknown>).minimoAprovacaoGerais as number ?? '—'}</p>
            <p className="text-xs text-gray-500 mt-1">de 20 em Gerais</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{(benchmarks as Record<string, unknown>).minimoAprovacaoEspecificos as number ?? '—'}</p>
            <p className="text-xs text-gray-500 mt-1">% nos Específicos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{(benchmarks as Record<string, unknown>).minimoAprovacaoDiscursiva as number ?? '—'}%</p>
            <p className="text-xs text-gray-500 mt-1">na Discursiva</p>
          </div>
        </div>
      </section>
    </div>
  )
}
