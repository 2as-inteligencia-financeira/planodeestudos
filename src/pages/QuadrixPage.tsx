import { useConcurso } from '../contexts/ConcursoContext'

export default function QuadrixPage() {
  const { quadrixPerfil } = useConcurso()
  const { atencoes, discursiva } = quadrixPerfil

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Perfil da Banca — Quadrix</h1>
        <p className="text-gray-500 mt-1">Entenda o estilo, padrões e armadilhas da banca</p>
      </div>

      {/* Card de intro */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Estilo</p>
          <p className="text-gray-800 leading-relaxed">{quadrixPerfil.estilo}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Nível de Dificuldade</p>
          <p className="text-gray-800 leading-relaxed">{quadrixPerfil.nivelDificuldade}</p>
        </div>
      </div>

      {/* 10 alertas */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">10 Alertas da Quadrix</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {atencoes.map((alerta, i) => (
            <div
              key={i}
              className="bg-white border border-orange-200 rounded-xl p-4 flex gap-3 shadow-sm"
            >
              <div className="shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold text-sm">
                {i + 1}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{alerta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Discursiva */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Prova Discursiva</h2>
        <div className="space-y-4">

          {/* Info geral */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Formato</p>
              <p className="text-gray-800">{discursiva.formato}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Extensão</p>
              <p className="text-gray-800">{discursiva.extensao}</p>
            </div>
          </div>

          {/* Critérios de avaliação */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Critérios de Avaliação</p>
            <div className="space-y-3">
              {(Object.entries(discursiva.criterios) as [string, string][]).map(([sigla, descricao]) => {
                const colors: Record<string, string> = {
                  CAC: 'bg-sky-50 border-sky-200 text-sky-800',
                  OT: 'bg-indigo-50 border-indigo-200 text-indigo-800',
                  DLP: 'bg-emerald-50 border-emerald-200 text-emerald-800',
                }
                return (
                  <div key={sigla} className={`border rounded-lg px-4 py-3 flex items-start gap-3 ${colors[sigla] || 'bg-gray-50 border-gray-200 text-gray-800'}`}>
                    <span className="font-bold text-lg shrink-0">{sigla}</span>
                    <p className="text-sm leading-relaxed">{descricao}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Temática */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Temática Esperada</p>
            <p className="text-gray-800">{discursiva.tematica}</p>
          </div>

          {/* Dica de estrutura */}
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <p className="font-semibold text-sky-900">Estrutura recomendada de resposta</p>
            </div>
            <p className="text-sky-800 leading-relaxed font-medium">{discursiva.dica}</p>

            {/* Visual breakdown */}
            <div className="mt-4 space-y-2">
              {[
                { label: 'Contextualização', desc: '2-3 linhas situando o tema', color: 'bg-sky-100 border-sky-300 text-sky-800' },
                { label: 'Problema identificado', desc: 'Qual é o desafio/questão central', color: 'bg-indigo-100 border-indigo-300 text-indigo-800' },
                { label: 'Causas', desc: 'Fatores que explicam o problema', color: 'bg-purple-100 border-purple-300 text-purple-800' },
                { label: 'Soluções', desc: 'Propostas fundamentadas na legislação/teoria', color: 'bg-emerald-100 border-emerald-300 text-emerald-800' },
                { label: 'Indicadores de monitoramento', desc: 'Como medir os resultados', color: 'bg-amber-100 border-amber-300 text-amber-800' },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-3 border rounded-lg px-3 py-2 ${item.color}`}>
                  <span className="font-bold text-sm shrink-0">{i + 1}.</span>
                  <div>
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-xs opacity-80 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
