import { useState } from 'react'
import { useConcurso } from '../contexts/ConcursoContext'
import type { QuadrixPeso, Disciplina } from '../data/sedes2026_data'
import PesoBadge from '../components/PesoBadge'

type PesoFiltro = 'ALL' | QuadrixPeso

export default function EditalPage() {
  const { edital } = useConcurso()
  const [secaoAtiva, setSecaoAtiva] = useState('gerais')
  const [filtro, setFiltro] = useState<PesoFiltro>('ALL')
  const [openDisc, setOpenDisc] = useState<Set<string>>(new Set())

  const secao = edital.sections.find((s) => s.id === secaoAtiva)

  function toggleDisc(id: string) {
    setOpenDisc((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function disciplinaTemPeso(disc: Disciplina, peso: PesoFiltro) {
    if (peso === 'ALL') return true
    return disc.topics.some((t) => t.quadrixPeso === peso)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edital Verticalizado</h1>
        <p className="text-gray-500 mt-1">
          {edital.cargo} — {edital.banca} — {edital.totalQuestoes} questões
        </p>
      </div>

      {/* Info do edital */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400">Data da prova</p>
          <p className="font-semibold text-gray-800 mt-1">06/09/2026</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400">Total questões</p>
          <p className="font-semibold text-gray-800 mt-1">{edital.totalQuestoes}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400">Duração</p>
          <p className="font-semibold text-gray-800 mt-1">{edital.duracao}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400">Turno</p>
          <p className="font-semibold text-gray-800 mt-1">{edital.turno}</p>
        </div>
      </div>

      {/* Tabs de seção */}
      <div className="flex gap-2 flex-wrap">
        {edital.sections.map((s) => (
          <button
            key={s.id}
            onClick={() => { setSecaoAtiva(s.id); setFiltro('ALL') }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              secaoAtiva === s.id
                ? 'bg-sky-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {s.nome} ({s.questoes}q)
          </button>
        ))}
      </div>

      {secao && (
        <>
          {/* Info da seção */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap gap-4 text-sm">
            <div><span className="text-gray-400">Questões: </span><span className="font-semibold">{secao.questoes}</span></div>
            <div><span className="text-gray-400">Peso: </span><span className="font-semibold">{secao.peso}</span></div>
            <div><span className="text-gray-400">Mínimo aprovação: </span><span className="font-semibold text-amber-600">{secao.minimoAprovacao} questões</span></div>
          </div>

          {/* Filtro de peso */}
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-sm text-gray-500 font-medium">Filtrar por peso:</span>
            {(['ALL', 'MUITO_ALTO', 'ALTO', 'MEDIO', 'BAIXO'] as PesoFiltro[]).map((p) => (
              <button
                key={p}
                onClick={() => setFiltro(p)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                  filtro === p
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {p === 'ALL' ? 'Todos' : p === 'MUITO_ALTO' ? 'Muito Alto' : p === 'ALTO' ? 'Alto' : p === 'MEDIO' ? 'Médio' : 'Baixo'}
              </button>
            ))}
          </div>

          {/* Disciplinas */}
          <div className="space-y-3">
            {secao.disciplines
              .filter((d) => disciplinaTemPeso(d, filtro))
              .map((disc) => {
                const isOpen = openDisc.has(disc.id)
                const topicsFiltrados = filtro === 'ALL'
                  ? disc.topics
                  : disc.topics.filter((t) => t.quadrixPeso === filtro)

                return (
                  <div key={disc.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                      onClick={() => toggleDisc(disc.id)}
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900">{disc.nome}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{topicsFiltrados.length} tópicos</p>
                      </div>
                      <span className="text-gray-400 ml-3">{isOpen ? '▲' : '▼'}</span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-gray-100">
                        {/* Perfil da banca */}
                        <div className="px-5 py-3 bg-sky-50 border-b border-sky-100">
                          <p className="text-xs font-semibold text-sky-700 uppercase mb-1">Perfil Quadrix</p>
                          <p className="text-sm text-sky-800">{disc.quadrixPerfil}</p>
                        </div>

                        {/* Tópicos */}
                        <div className="divide-y divide-gray-50">
                          {topicsFiltrados.map((topico) => (
                            <div key={topico.id} className="px-5 py-4">
                              <div className="flex items-start gap-3 flex-wrap">
                                <PesoBadge peso={topico.quadrixPeso} />
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                                  ~{topico.estimativaQuestoes}q
                                </span>
                              </div>
                              <p className="font-medium text-gray-900 mt-2 text-sm">{topico.nome}</p>
                              <div className="mt-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                                <p className="text-xs font-semibold text-amber-700 mb-1">Dica Quadrix</p>
                                <p className="text-sm text-amber-800 leading-relaxed">{topico.quadrixDica}</p>
                              </div>
                              {topico.subtopicos && topico.subtopicos.length > 0 && (
                                <ul className="mt-3 space-y-1">
                                  {topico.subtopicos.map((sub, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                      <span className="text-gray-400 mt-0.5 shrink-0">•</span>
                                      {sub}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
        </>
      )}
    </div>
  )
}
