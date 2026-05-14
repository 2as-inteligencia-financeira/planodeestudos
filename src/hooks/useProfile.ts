import { useState, useEffect } from 'react'
import type { StudentProfile } from '../types/profile'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthContext'

const LOCAL_KEY = 'pec_perfil'

function getLocal(): StudentProfile | null {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || 'null') } catch { return null }
}

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfileState] = useState<StudentProfile | null>(getLocal)

  useEffect(() => {
    if (!user || !isSupabaseConfigured) { setProfileState(getLocal()); return }
    supabase.from('profiles').select('nome, email, objetivo, horas_dia, created_at')
      .eq('id', user.id).single()
      .then(({ data }) => {
        if (data) {
          const p: StudentProfile = {
            nome: data.nome,
            email: data.email ?? undefined,
            objetivo: data.objetivo ?? undefined,
            horasEstudoDia: data.horas_dia ?? undefined,
            criadoEm: data.created_at,
          }
          setProfileState(p)
          localStorage.setItem(LOCAL_KEY, JSON.stringify(p))
        }
      })
  }, [user])

  async function saveProfile(p: StudentProfile) {
    setProfileState(p)
    localStorage.setItem(LOCAL_KEY, JSON.stringify(p))
    if (user && isSupabaseConfigured) {
      await supabase.from('profiles').upsert({
        id: user.id,
        nome: p.nome,
        email: p.email ?? null,
        objetivo: p.objetivo ?? null,
        horas_dia: p.horasEstudoDia ?? null,
      })
    }
  }

  function clearProfile() {
    localStorage.removeItem(LOCAL_KEY)
    setProfileState(null)
  }

  return { profile, saveProfile, clearProfile }
}
