import { homePage } from './pages/home'
import { notFoundPage } from './pages/not-found'
import { sedesPage } from './pages/sedes'
import { servidoresPage, wireServidoresPage } from './pages/servidores'
import { chatbotPage, wireChatbotPage } from './pages/chatbot'
import { tasksPage, wireTasksPage } from './pages/tasks'
import { loginPage, wireLoginPage } from './pages/login'
import { hydrateIcons } from './components/icons'
import { wireTopbar } from './components/topbar'
import { getSession } from './lib/auth'

type Route = {
  render: () => string | Promise<string>
  wire?: () => void | Promise<void>
  public?: boolean
}

const routes: Record<string, Route> = {
  '/':           { render: homePage },
  '/sedes':      { render: sedesPage },
  '/servidores': { render: servidoresPage, wire: wireServidoresPage },
  '/chatbot':    { render: chatbotPage,    wire: wireChatbotPage },
  '/tareas':     { render: tasksPage,      wire: wireTasksPage },
  '/login':      { render: loginPage,      wire: wireLoginPage, public: true },
}

async function renderRoute() {
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return

  const path = window.location.pathname
  const route = routes[path] ?? { render: notFoundPage }

  const session = await getSession()

  if (!session && !route.public) {
    window.history.replaceState({}, '', '/login')
    void renderRoute()
    return
  }

  if (session && path === '/login') {
    window.history.replaceState({}, '', '/')
    void renderRoute()
    return
  }

  app.innerHTML = `<div class="p-10 text-center text-slate-500 text-sm">Cargando…</div>`
  try {
    app.innerHTML = await route.render()
  } catch (err) {
    console.error('render route error', err)
    app.innerHTML = `<div class="p-10 text-center text-red-600 text-sm">Error al cargar la vista.</div>`
    return
  }

  hydrateIcons(app)
  if (!route.public) wireTopbar()
  await route.wire?.()
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
}

function onLinkClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null
  const link = target?.closest('a[data-link]') as HTMLAnchorElement | null
  if (!link) return

  const href = link.getAttribute('href')
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return

  event.preventDefault()
  if (window.location.pathname === href) return
  window.history.pushState({}, '', href)
  void renderRoute()
}

export function navigateTo(path: string) {
  window.history.pushState({}, '', path)
  void renderRoute()
}

export function initRouter() {
  document.addEventListener('click', onLinkClick)
  window.addEventListener('popstate', () => void renderRoute())
  void renderRoute()
}
