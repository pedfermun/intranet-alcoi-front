import { icon } from '../components/icons'
import { login } from '../lib/auth'
import { navigateTo } from '../router'

export function loginPage(): string {
  return `
    <div class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 py-12 overflow-hidden">
      <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-brand-200/30 dark:from-brand-800/20 to-transparent rounded-full -translate-x-1/3 -translate-y-1/3"></div>
      <div class="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-violet-200/30 dark:from-violet-800/20 to-transparent rounded-full translate-x-1/4 translate-y-1/4"></div>
      <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-amber-100/20 dark:from-amber-900/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2"></div>

      <div class="relative w-full max-w-md">
        <div class="flex flex-col items-center mb-8">
          <span class="grid place-items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-lg ring-4 ring-brand-100 dark:ring-brand-900/50 mb-4 icon-xl">
            ${icon('building-2')}
          </span>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Intranet <span class="bg-gradient-to-r from-brand-600 to-violet-600 dark:from-brand-400 dark:to-violet-400 bg-clip-text text-transparent">Alcoi</span>
          </h1>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Inicia sesión para continuar</p>
        </div>

        <form id="loginForm" class="bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-6 sm:p-8 space-y-5" novalidate>
          <div>
            <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Correo electrónico</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">${icon('mail')}</span>
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="tu@correo.com"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Contraseña</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">${icon('lock')}</span>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          <p id="loginError" class="hidden text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2"></p>

          <button
            id="loginSubmit"
            type="submit"
            class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 text-white text-sm font-semibold hover:from-brand-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <span id="loginSubmitLabel" class="inline-flex items-center gap-2">
              ${icon('log-in')} Iniciar sesión
            </span>
          </button>
        </form>

        <p class="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          © ${new Date().getFullYear()} Institut d'Alcoi · Intranet corporativa
        </p>
      </div>
    </div>
  `
}

export function wireLoginPage() {
  const form = document.getElementById('loginForm') as HTMLFormElement | null
  const errorEl = document.getElementById('loginError') as HTMLParagraphElement | null
  const submit = document.getElementById('loginSubmit') as HTMLButtonElement | null
  const label = document.getElementById('loginSubmitLabel') as HTMLSpanElement | null
  if (!form || !errorEl || !submit || !label) return

  const originalLabel = label.innerHTML

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    errorEl.classList.add('hidden')
    errorEl.textContent = ''

    const data = new FormData(form)
    const email = String(data.get('email') ?? '').trim()
    const password = String(data.get('password') ?? '')

    if (!email || !password) {
      errorEl.textContent = 'Introduce correo y contraseña.'
      errorEl.classList.remove('hidden')
      return
    }

    submit.disabled = true
    label.textContent = 'Entrando…'

    const result = await login(email, password)

    if (result.error || !result.session) {
      errorEl.textContent = result.error ?? 'No se ha podido iniciar sesión.'
      errorEl.classList.remove('hidden')
      submit.disabled = false
      label.innerHTML = originalLabel
      return
    }

    navigateTo('/')
  })
}
