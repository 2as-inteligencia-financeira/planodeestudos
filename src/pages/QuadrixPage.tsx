import { useConcurso } from '../contexts/ConcursoContext'

// ===========================
// Perfil Quadrix (SEDES 2026)
// ===========================
function PerfilQuadrix({ perfil }: { perfil: Record<string, unknown> }) {
  const atencoes = perfil.atencoes as string[] ?? []
  const discursiva = perfil.discursiva as Record<string, unknown> ?? {}
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Estilo</p>
          <p className="text-gray-800 leading-relaxed">{perfil.estilo as string}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Nível de Dificuldade</p>
          <p className="text-gray-800 leading-relaxed">{perfil.nivelDificuldade as string}</p>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Alertas da Quadrix</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {atencoes.map((alerta, i) => (
            <div key={i} className="bg-white border border-orange-200 rounded-xl p-4 flex gap-3 shadow-sm">
              <div className="shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</div>
              <p className="text-sm text-gray-700 leading-relaxed">{alerta}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Prova Discursiva</h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Formato</p>
              <p className="text-gray-800">{discursiva.formato as string}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Extensão</p>
              <p className="text-gray-800">{discursiva.extensao as string}</p>
            </div>
          </div>
          {!!discursiva.criterios && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Critérios de Avaliação</p>
              <div className="space-y-3">
                {(Object.entries(discursiva.criterios as Record<string, string>)).map(([sigla, descricao]) => {
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
          )}
          {!!discursiva.dica && (
            <div className="bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 rounded-xl p-6 shadow-sm">
              <p className="font-semibold text-sky-900 mb-2">Dica de estrutura</p>
              <p className="text-sky-800 leading-relaxed font-medium">{discursiva.dica as string}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// ===========================
// Perfil Cebraspe / TCU
// ===========================
function PerfilCebraspe({ perfil }: { perfil: Record<string, unknown> }) {
  const estilo = perfil.estilo as Record<string, unknown> ?? {}
  const atencoes = perfil.atencoes as string[] ?? []
  const discursiva = perfil.discursiva as Record<string, unknown> ?? {}
  const diferencasBancas = perfil.diferencasBancas as Record<string, string> | undefined
  const conteudo = perfil.conteudo as Record<string, unknown> | undefined

  return (
    <div className="space-y-6">
      {/* Estilo de prova */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Tipo de questão</p>
          <p className="text-2xl font-bold text-gray-900">{estilo.tipoQuestao as string ?? '—'}</p>
        </div>
        <div className={`rounded-xl p-5 shadow-sm border ${estilo.penalizaErro ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <p className="text-xs font-semibold uppercase mb-2 text-gray-500">Penalização</p>
          <p className={`text-2xl font-bold ${estilo.penalizaErro ? 'text-red-700' : 'text-green-700'}`}>
            {estilo.penalizaErro ? `Sim (${estilo.fatorPenalizacao})` : 'Não'}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Banca provável</p>
          <p className="text-xl font-bold text-gray-900">{estilo.bancaProvavel as string ?? '—'}</p>
        </div>
      </div>

      {/* Estratégia fundamental */}
      {!!estilo.estrategiaFundamental && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-xs font-semibold text-amber-700 uppercase mb-2">⚡ Estratégia fundamental</p>
          <p className="text-amber-900 font-semibold leading-relaxed">{estilo.estrategiaFundamental as string}</p>
        </div>
      )}

      {/* Atenções / armadilhas */}
      {atencoes.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Armadilhas da Banca</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {atencoes.map((alerta, i) => (
              <div key={i} className="bg-white border border-orange-200 rounded-xl p-4 flex gap-3 shadow-sm">
                <div className="shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</div>
                <p className="text-sm text-gray-700 leading-relaxed">{alerta}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Diferenças FGV vs Cebraspe */}
      {diferencasBancas && (
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">FGV vs Cebraspe — Diferenças</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {Object.entries(diferencasBancas).map(([key, val]) => {
              const labelMap: Record<string, string> = { fgv: 'FGV', cebraspe: 'Cebraspe', estrategiaMix: 'Estratégia Mix' }
              const colorMap: Record<string, string> = {
                fgv: 'bg-blue-50 border-blue-200',
                cebraspe: 'bg-red-50 border-red-200',
                estrategiaMix: 'bg-emerald-50 border-emerald-200',
              }
              return (
                <div key={key} className={`rounded-xl p-5 border ${colorMap[key] || 'bg-white border-gray-200'}`}>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">{labelMap[key] || key}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{val}</p>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Conteúdo (referência de edital) */}
      {!!conteudo && (
        <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Referência de Conteúdo</h2>
          <p className="text-sm text-gray-600 mb-3">{conteudo.observacao as string}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {!!conteudo.disciplinasEstaveis && (
              <div>
                <p className="text-xs font-semibold text-green-700 uppercase mb-2">Estáveis entre editais</p>
                <ul className="space-y-1">
                  {(conteudo.disciplinasEstaveis as string[]).map((d, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="text-green-500">✓</span>{d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!!conteudo.disciplinasVolateis && (
              <div>
                <p className="text-xs font-semibold text-amber-700 uppercase mb-2">Podem mudar</p>
                <ul className="space-y-1">
                  {(conteudo.disciplinasVolateis as string[]).map((d, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="text-amber-500">⚠</span>{d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Discursiva */}
      {!!(discursiva.formatoFGV || discursiva.formatoCebraspe) && (
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Prova Discursiva</h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {!!discursiva.formatoFGV && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <p className="text-xs font-semibold text-blue-700 uppercase mb-2">Formato FGV (referência)</p>
                  <p className="text-sm text-blue-900 leading-relaxed">{discursiva.formatoFGV as string}</p>
                </div>
              )}
              {!!discursiva.formatoCebraspe && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <p className="text-xs font-semibold text-red-700 uppercase mb-2">Formato Cebraspe (provável)</p>
                  <p className="text-sm text-red-900 leading-relaxed">{discursiva.formatoCebraspe as string}</p>
                </div>
              )}
            </div>
            {!!discursiva.pecaTecnicaFGV && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Peça Técnica (FGV P4)</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {Object.entries(discursiva.pecaTecnicaFGV as Record<string, unknown>).map(([k, v]) => (
                    <div key={k}>
                      <p className="text-xs text-gray-400 mb-1">{k}</p>
                      <p className="text-sm font-semibold text-gray-800">{String(v)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!!discursiva.dica && (
              <div className="bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 rounded-xl p-6 shadow-sm">
                <p className="font-semibold text-sky-900 mb-2">Dica para a discursiva</p>
                <p className="text-sky-800 leading-relaxed">{discursiva.dica as string}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

// ===========================
// Exportação principal
// ===========================
export default function QuadrixPage() {
  const { quadrixPerfil, bancaPerfil, meta } = useConcurso()

  const usaBancaPerfil = bancaPerfil && Object.keys(bancaPerfil as Record<string, unknown>).length > 0
  const perfil = usaBancaPerfil
    ? bancaPerfil as Record<string, unknown>
    : quadrixPerfil as unknown as Record<string, unknown>

  const titulo = usaBancaPerfil
    ? `Perfil da Banca — ${((bancaPerfil as Record<string, unknown>).estilo as Record<string, unknown> | undefined)?.bancaProvavel as string ?? meta.banca}`
    : `Perfil da Banca — ${meta.banca}`

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{titulo}</h1>
        <p className="text-gray-500 mt-1">Entenda o estilo, padrões e armadilhas da banca</p>
      </div>

      {usaBancaPerfil
        ? <PerfilCebraspe perfil={perfil} />
        : <PerfilQuadrix perfil={perfil} />
      }
    </div>
  )
}
