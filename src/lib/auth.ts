import type { Session, User as AuthUser } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'

export type AuthResult = { session: Session | null; user: AuthUser | null; error: string | null }

export async function login(email: string, password: string): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { session: null, user: null, error: error.message }
  return { session: data.session, user: data.user, error: null }
}

export async function logout(): Promise<{ error: string | null }> {
  const { error } = await supabase.auth.signOut()
  return { error: error?.message ?? null }
}

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data } = await supabase.auth.getUser()
  return data.user
}

/**
 * Detecta si hay una sesión activa al cargar el DOM.
 * Invoca `onLogged` si hay sesión, o `onAnonymous` si no la hay.
 * Además registra el listener de cambios de auth (login / logout / refresh).
 */
export function initAuth(
  onLogged: (session: Session) => void,
  onAnonymous: () => void,
): () => void {
  const run = async () => {
    const session = await getSession()
    if (session) onLogged(session)
    else onAnonymous()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true })
  } else {
    void run()
  }

  const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session) onLogged(session)
    else onAnonymous()
  })

  return () => sub.subscription.unsubscribe()
}
