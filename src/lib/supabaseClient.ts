import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

// Cria cliente real apenas quando configurado; caso contrário retorna stub vazio
// (nunca chamado quando isSupabaseConfigured = false, graças às guards nos hooks)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : (null as unknown as ReturnType<typeof createClient>)
