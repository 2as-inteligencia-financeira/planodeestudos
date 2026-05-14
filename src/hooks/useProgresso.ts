import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthContext'

const LOCAL_KEY = 'pec_progresso'

function getLocal(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}') } catch { return {} }
}

export function useProgresso(concursoId: string) {
  const { user } = useAuth()
  const [progresso, setProgressoState] = useState<Record<string, boolean>>(getLocal)

  useEffect(() => {
    if (!user || !isSupabaseConfigured) {
      setProgressoState(getLocal())
      return
    }
    supabase
      .from('progresso')
      .select('data, feito')
      .eq('user_id', user.id)
      .eq('concurso_id', concursoId)
      .then(({ data }) => {
        if (data) {
          const map: Record<string, boolean> = {}
          data.forEach((r: { data: string; feito: boolean }) => { map[r.data] = r.feito })
          setProgressoState(map)
          localStorage.setItem(LOCAL_KEY, JSON.stringify(map))
        }
      })
  }, [user, concursoId])

  const toggleDia = useCallback((data: string) => {
    setProgressoState((prev) => {
      const next = { ...prev, [data]: !prev[data] }
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next))
      if (user && isSupabaseConfigured) {
        supabase.from('progresso').upsert({
          user_id: user.id,
          concurso_id: concursoId,
          data,
          feito: next[data],
          updated_at: new Date().toISOString(),
        })
      }
      return next
    })
  }, [user, concursoId])

  const resetProgresso = useCallback(() => {
    setProgressoState({})
    localStorage.removeItem(LOCAL_KEY)
    if (user && isSupabaseConfigured) {
      supabase.from('progresso').delete()
        .eq('user_id', user.id)
        .eq('concurso_id', concursoId)
    }
  }, [user, concursoId])

  return { progresso, toggleDia, resetProgresso }
}
