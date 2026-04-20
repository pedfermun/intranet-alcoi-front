import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Faltan variables de entorno: VITE_PUBLIC_SUPABASE_URL y/o VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  )
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'intranet-alcoi-auth',
  },
})
