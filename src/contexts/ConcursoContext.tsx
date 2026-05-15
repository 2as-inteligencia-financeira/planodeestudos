import { createContext, useContext, useMemo, ReactNode } from 'react'
import type { ConcursoMeta } from '../data/concursos'
import { CONCURSOS } from '../data/concursos'
import { EDITAL_SEDES_2026, CRONOGRAMA, FASES, BENCHMARKS, QUADRIX_PERFIL } from '../data/sedes2026_data'
import { TEORIA } from '../data/sedes2026_teoria'
import { QUESTOES } from '../data/sedes2026_questoes'
import { TEMAS_ESTUDO_CASO } from '../data/sedes2026_estudodecaso'
import type { ImportedConcurso } from '../hooks/useImportedConcursos'

export interface ConcursoData {
  meta: ConcursoMeta
  edital: typeof EDITAL_SEDES_2026
  cronograma: typeof CRONOGRAMA
  fases: typeof FASES
  benchmarks: typeof BENCHMARKS
  quadrixPerfil: typeof QUADRIX_PERFIL
  teoria: typeof TEORIA
  questoes: typeof QUESTOES
  temasEstudoCaso: typeof TEMAS_ESTUDO_CASO
}

const STATIC: Record<string, ConcursoData> = {
  sedes2026: {
    meta: CONCURSOS.find(c => c.id === 'sedes2026')!,
    edital: EDITAL_SEDES_2026,
    cronograma: CRONOGRAMA,
    fases: FASES,
    benchmarks: BENCHMARKS,
    quadrixPerfil: QUADRIX_PERFIL,
    teoria: TEORIA,
    questoes: QUESTOES,
    temasEstudoCaso: TEMAS_ESTUDO_CASO,
  },
}

function loadImported(concursoId: string): ConcursoData | null {
  try {
    const all: ImportedConcurso[] = JSON.parse(localStorage.getItem('pec_imported_editais') || '[]')
    const found = all.find(c => c.id === concursoId)
    if (!found) return null
    // Se os dados do edital coincidirem com sedes2026 (mesmo orgao/banca), reutiliza teoria/questoes
    const isSedes =
      (found.rawData.edital as Record<string,unknown>)?.orgao === (EDITAL_SEDES_2026 as Record<string,unknown>).orgao
    return {
      meta: found.meta,
      edital:        found.rawData.edital        as typeof EDITAL_SEDES_2026,
      cronograma:    found.rawData.cronograma    as typeof CRONOGRAMA,
      fases:         found.rawData.fases         as typeof FASES,
      benchmarks:    found.rawData.benchmarks    as typeof BENCHMARKS,
      quadrixPerfil: found.rawData.quadrixPerfil as typeof QUADRIX_PERFIL,
      teoria:        isSedes ? TEORIA : [],
      questoes:      isSedes ? QUESTOES : [],
      temasEstudoCaso: isSedes ? TEMAS_ESTUDO_CASO : [],
    }
  } catch {
    return null
  }
}

const ConcursoContext = createContext<ConcursoData | null>(null)

export function ConcursoProvider({ concursoId, children }: { concursoId: string; children: ReactNode }) {
  const data = useMemo(
    () => STATIC[concursoId] ?? loadImported(concursoId),
    [concursoId],
  )

  if (!data) {
    return (
      <div style={{ padding: 40, fontFamily: 'monospace', color: '#606060' }}>
        Concurso não encontrado: <strong>{concursoId}</strong>
      </div>
    )
  }

  return <ConcursoContext.Provider value={data}>{children}</ConcursoContext.Provider>
}

export function useConcurso(): ConcursoData {
  const ctx = useContext(ConcursoContext)
  if (!ctx) throw new Error('useConcurso must be used inside ConcursoProvider')
  return ctx
}
