import { contactoPage, wireContactoPage } from './pages/contacto'
import { homePage } from './pages/home'
import { notFoundPage } from './pages/not-found'
import { sedesPage } from './pages/sedes'
import { serviciosPage } from './pages/servicios'
import { servidoresPage, wireServidoresPage } from './pages/servidores'
import { hydrateIcons } from './components/icons'
import { wireTopbar } from './components/topbar'

type Route = {
  render: () => string
  wire?: () => void
}

const routes: Record<string, Route> = {
  '/':           { render: homePage },
  '/servicios':  { render: serviciosPage },
  '/sedes':      { render: sedesPage },
  '/contacto':   { render: contactoPage,   wire: wireContactoPage },
  '/servidores': { render: servidoresPage, wire: wireServidoresPage },
}

function renderRoute() {
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return

  const route = routes[window.location.pathname] ?? { render: notFoundPage }
  app.innerHTML = route.render()

  hydrateIcons(app)
  wireTopbar()
  route.wire?.()
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
  renderRoute()
}

export function navigateTo(path: string) {
  window.history.pushState({}, '', path)
  renderRoute()
}

export function initRouter() {
  document.addEventListener('click', onLinkClick)
  window.addEventListener('popstate', renderRoute)
  renderRoute()
}
