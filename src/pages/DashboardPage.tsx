import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useConcurso } from '../contexts/ConcursoContext'
import { useProgresso } from '../hooks/useProgresso'
import type { DiaEstudo, SemanaEstudo } from '../data/sedes2026_data'

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

export default function DashboardPage() {
  const { cronograma, fases, benchmarks, meta } = useConcurso()
  const navigate = useNavigate()
  const { progresso, toggleDia } = useProgresso(meta.id)

  const PROVA_DATE = new Date(meta.dataProva)
  const todayStr = new Date().toISOString().split('T')[0]

  const cronogramaStart = cronograma.length > 0 ? cronograma[0].dias[0]?.data ?? '' : ''
  const preStart = cronogramaStart !== '' && todayStr < cronogramaStart

  function getDiasAteProva() {
    return Math.ceil((PROVA_DATE.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  }

  function getDiasAteInicio(): number {
    if (!cronogramaStart) return 0
    const start = new Date(cronogramaStart + 'T00:00:00')
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  }

  function getSemanaAtual(): SemanaEstudo | null {
    if (preStart) return cronograma[0] ?? null
    return (
      cronograma.find((s) => s.dias.some((d) => d.data === todayStr)) ||
      cronograma.find((s) => {
        const datas = s.dias.map((d) => d.data).sort()
        return todayStr >= datas[0] && todayStr <= datas[datas.length - 1]
      }) ||
      null
    )
  }

  function getDiaAtual(): DiaEstudo | null {
    for (const semana of cronograma) {
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
    const semana = getSemanaAtual()
    if (!semana) return []
    const proxIdx = cronograma.findIndex((s) => s.semana === semana.semana)
    const semanas = cronograma.slice(proxIdx, proxIdx + 2)
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


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Sua central de estudos para o {meta.nome}</p>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
          <p className="text-4xl font-bold text-sky-500">{diasAteProva}</p>
          <p className="text-sm text-gray-500 mt-1">Dias até a prova</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
          <p className="text-4xl font-bold text-indigo-500">{semanaAtual ? semanaAtual.semana : '—'}</p>
          <p className="text-sm text-gray-500 mt-1">Semana atual</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
          <p className="text-4xl font-bold text-emerald-500">{faseAtual ? faseAtual.id : '—'}</p>
          <p className="text-sm text-gray-500 mt-1">Fase atual</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
          <p className="text-4xl font-bold text-amber-500">
            {semanaAtual ? `${semanaAtual.metaAcerto}%` : '—'}
          </p>
          <p className="text-sm text-gray-500 mt-1">Meta de acerto</p>
        </div>
      </div>

      {/* Hoje */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Hoje — {formatDate(todayStr)}</h2>
        {isWeekend && !diaAtual ? (
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

      {/* Esta semana */}
      {diasSemana.length > 0 && (
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

      {/* Simulados próximos */}
      {simuladosProximos.length > 0 && (
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
              <span className="font-medium text-gray-700">{faseAtual.periodo}</span>
            </div>
            <div>
              <span className="text-gray-400">Meta de acerto: </span>
              <span className="font-medium text-emerald-600">{faseAtual.metaAcerto}%</span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Objetivos da fase</p>
            <ul className="space-y-1">
              {faseAtual.objetivos.map((obj, i) => (
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
            <p className="text-2xl font-bold text-gray-800">{benchmarks.minimoAprovacaoGerais}</p>
            <p className="text-xs text-gray-500 mt-1">de 20 em Gerais</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{benchmarks.minimoAprovacaoEspecificos}</p>
            <p className="text-xs text-gray-500 mt-1">% nos Específicos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{benchmarks.minimoAprovacaoDiscursiva}%</p>
            <p className="text-xs text-gray-500 mt-1">na Discursiva</p>
          </div>
        </div>
      </section>
    </div>
  )
}
