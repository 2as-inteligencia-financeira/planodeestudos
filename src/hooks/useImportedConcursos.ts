import { useState, useCallback } from 'react'
import type { ConcursoMeta } from '../data/concursos'
import type { ParsedEditalData } from '../lib/editalParser'

const KEY = 'pec_imported_editais'

export interface ImportedConcurso {
  id: string
  meta: ConcursoMeta
  rawData: ParsedEditalData
  importadoEm: string
}

function readStorage(): ImportedConcurso[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

export function useImportedConcursos() {
  const [imported, setImported] = useState<ImportedConcurso[]>(readStorage)

  const addConcurso = useCallback((meta: ConcursoMeta, rawData: ParsedEditalData) => {
    const novo: ImportedConcurso = {
      id: meta.id,
      meta,
      rawData,
      importadoEm: new Date().toISOString(),
    }
    setImported(prev => {
      const next = [...prev.filter(c => c.id !== meta.id), novo]
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
    return novo
  }, [])

  const removeConcurso = useCallback((id: string) => {
    setImported(prev => {
      const next = prev.filter(c => c.id !== id)
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return { imported, addConcurso, removeConcurso }
}
