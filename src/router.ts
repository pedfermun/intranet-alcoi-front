import { contactoPage } from './pages/contacto'
import { homePage } from './pages/home'
import { notFoundPage } from './pages/not-found'
import { sedesPage } from './pages/sedes'
import { serviciosPage } from './pages/servicios'

type RouteHandler = () => string

const routes: Record<string, RouteHandler> = {
  '/': homePage,
  '/contacto': contactoPage,
  '/sedes': sedesPage,
  '/servicios': serviciosPage,
}

function renderRoute() {
  const app = document.querySelector<HTMLDivElement>('#app')

  if (!app) {
    return
  }

  const currentRoute = routes[window.location.pathname] ?? notFoundPage
  app.innerHTML = currentRoute()
}

function onLinkClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null
  const link = target?.closest('a[data-link]') as HTMLAnchorElement | null

  if (!link) {
    return
  }

  const href = link.getAttribute('href')

  if (!href || href.startsWith('http')) {
    return
  }

  event.preventDefault()
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
