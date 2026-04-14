import { icon } from './icons'

type NavItem = { href: string; label: string; icon: string }

const navItems: NavItem[] = [
  { href: '/',           label: 'Inicio',     icon: 'home' },
  { href: '/servicios',  label: 'Servicios',  icon: 'layout-grid' },
  { href: '/sedes',      label: 'Sedes',      icon: 'map-pin' },
  { href: '/contacto',   label: 'Directorio', icon: 'users' },
  { href: '/servidores', label: 'Servidores', icon: 'server' },
  { href: '/chatbot',    label: 'Chatbot',    icon: 'bot' },
]

export function topbar(currentPath: string): string {
  const links = navItems
    .map((item) => {
      const isActive = item.href === currentPath
      const base = 'inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors'
      const style = isActive
        ? 'bg-brand-50 text-brand-700'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      return `
        <a href="${item.href}" data-link class="${base} ${style}" aria-current="${isActive ? 'page' : 'false'}">
          ${icon(item.icon)}
          <span>${item.label}</span>
        </a>
      `
    })
    .join('')

  return `
    <header class="top-app-bar sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between gap-4">
          <a href="/" data-link class="flex items-center gap-2.5 group">
            <span class="grid place-items-center w-9 h-9 rounded-xl bg-brand-600 text-white shadow-sm group-hover:bg-brand-700 transition-colors">
              ${icon('building-2')}
            </span>
            <span class="font-semibold tracking-tight text-slate-900">
              Intranet <span class="text-brand-600">Alcoi</span>
            </span>
          </a>

          <nav class="hidden md:flex items-center gap-1" aria-label="Navegación principal">
            ${links}
          </nav>

          <div class="flex items-center gap-2">
            <div class="hidden sm:flex items-center gap-2 ml-1 pl-3">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=96&h=96&q=80" alt="Avatar" class="w-8 h-8 rounded-full object-cover" />
              <div class="leading-tight">
                <p class="text-xs font-semibold text-slate-900">P. Fernández</p>
                <p class="text-[11px] text-slate-500">ASIX 1º</p>
              </div>
            </div>
            <button id="mobileMenuBtn" class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-slate-700 hover:bg-slate-100" aria-label="Abrir menú">
              ${icon('menu')}
            </button>
          </div>
        </div>

        <nav id="mobileMenu" class="md:hidden hidden pb-3 flex-col gap-1" aria-label="Navegación móvil">
          ${links}
        </nav>
      </div>
    </header>
  `
}

export function wireTopbar() {
  const btn = document.getElementById('mobileMenuBtn')
  const menu = document.getElementById('mobileMenu')
  if (!btn || !menu) return
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden')
    menu.classList.toggle('flex')
  })
}
