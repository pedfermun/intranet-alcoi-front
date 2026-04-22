import { icon, hydrateIcons } from './icons'
import type { User } from '../lib/data'
import { logout } from '../lib/auth'
import { toggleTheme, getTheme } from '../lib/theme'

type NavItem = { href: string; label: string; icon: string }

const navItems: NavItem[] = [
  { href: '/',           label: 'Inicio',     icon: 'home' },
  { href: '/sedes',      label: 'Sedes',      icon: 'map-pin' },
  { href: '/servidores', label: 'Servidores', icon: 'server' },
  { href: '/tareas',     label: 'Tareas',     icon: 'kanban-square' },
]

let _currentUser: User | null = null

export function setTopbarUser(user: User | null) {
  _currentUser = user
}

function initials(name: string): string {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
}

function themeIconName(): string {
  return getTheme() === 'dark' ? 'sun' : 'moon'
}

function themeLabel(): string {
  return getTheme() === 'dark' ? 'Tema claro' : 'Tema oscuro'
}

export function topbar(currentPath: string): string {
  const links = navItems
    .map((item) => {
      const isActive = item.href === currentPath
      const base = 'inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors'
      const style = isActive
        ? 'bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100'
      return `
        <a href="${item.href}" data-link class="${base} ${style}" aria-current="${isActive ? 'page' : 'false'}">
          ${icon(item.icon)}
          <span>${item.label}</span>
        </a>
      `
    })
    .join('')

  const avatar = _currentUser?.avatar
    ? `<img src="${_currentUser.avatar}" alt="${_currentUser.name}" class="w-8 h-8 rounded-full object-cover" />`
    : `<div class="w-8 h-8 rounded-full bg-brand-600 text-white text-xs font-semibold grid place-items-center">${_currentUser ? initials(_currentUser.name) : '?'}</div>`

  const userTrigger = _currentUser
    ? `
      <button id="userMenuBtn" class="hidden sm:flex items-center gap-2 rounded-full pl-2 pr-1 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer" aria-haspopup="true" aria-expanded="false">
        <div class="leading-tight text-right max-w-[9rem]">
          <p class="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">${_currentUser.name}</p>
          <p class="text-[10px] text-slate-400 truncate">${_currentUser.role}</p>
        </div>
        ${avatar}
      </button>

      <div id="userMenu" class="hidden absolute right-0 top-full mt-2 w-52 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl z-50 overflow-hidden" role="menu">
        <div class="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-700">
          ${avatar}
          <div class="min-w-0">
            <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">${_currentUser.name}</p>
            <p class="text-xs text-slate-400 truncate">${_currentUser.role}</p>
          </div>
        </div>
        <div class="py-1">
          <button id="themeToggleBtn" class="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" role="menuitem">
            <i data-lucide="${themeIconName()}" data-theme-icon></i>
            <span data-theme-label>${themeLabel()}</span>
          </button>
          <button id="desktopLogoutBtn" class="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" role="menuitem">
            ${icon('log-out')}
            Cerrar sesión
          </button>
        </div>
      </div>
    `
    : ''

  const mobileLogout = `
    <button id="mobileThemeToggleBtn" class="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors w-full text-left">
      <i data-lucide="${themeIconName()}" data-theme-icon></i>
      <span data-theme-label>${themeLabel()}</span>
    </button>
    <button id="mobileLogoutBtn" class="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left">
      ${icon('log-out')}
      <span>Cerrar sesión</span>
    </button>
  `

  return `
    <header class="top-app-bar sticky top-0 z-40 bg-white/95 dark:bg-slate-800/95 backdrop-blur border-b border-slate-200 dark:border-slate-700">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between gap-4">
          <a href="/" data-link class="flex items-center gap-2.5 group">
            <span class="grid place-items-center w-9 h-9 rounded-xl bg-brand-600 text-white shadow-sm group-hover:bg-brand-700 transition-colors">
              ${icon('building-2')}
            </span>
            <span class="font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Intranet <span class="text-brand-600 dark:text-brand-400">Alcoi</span>
            </span>
          </a>

          <nav class="hidden md:flex items-center gap-1" aria-label="Navegación principal">
            ${links}
          </nav>

          <div class="flex items-center gap-1">
            <div class="relative">
              ${userTrigger}
            </div>
            <button id="mobileMenuBtn" class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="Abrir menú">
              ${icon('menu')}
            </button>
          </div>
        </div>

        <nav id="mobileMenu" class="md:hidden hidden pb-3 flex-col gap-1" aria-label="Navegación móvil">
          ${links}
          ${mobileLogout}
        </nav>
      </div>
    </header>
  `
}

export function wireTopbar() {
  const mobileBtn = document.getElementById('mobileMenuBtn')
  const mobileMenu = document.getElementById('mobileMenu')
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden')
      mobileMenu.classList.toggle('flex')
    })
  }

  const handleLogout = () => {
    void logout().then(() => {
      _currentUser = null
      window.history.replaceState({}, '', '/login')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
  }

  const userMenuBtn = document.getElementById('userMenuBtn')
  const userMenu = document.getElementById('userMenu')

  if (userMenuBtn && userMenu) {
    userMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      const isOpen = !userMenu.classList.contains('hidden')
      userMenu.classList.toggle('hidden', isOpen)
      userMenuBtn.setAttribute('aria-expanded', String(!isOpen))
    })

    document.addEventListener('click', () => {
      if (!userMenu.classList.contains('hidden')) {
        userMenu.classList.add('hidden')
        userMenuBtn.setAttribute('aria-expanded', 'false')
      }
    }, { capture: false })
  }

  const handleThemeToggle = () => {
    toggleTheme()
    const iconName = themeIconName()
    const labelText = themeLabel()
    document.querySelectorAll<HTMLElement>('[data-theme-icon]').forEach((el) => {
      el.setAttribute('data-lucide', iconName)
    })
    document.querySelectorAll<HTMLElement>('[data-theme-label]').forEach((el) => {
      el.textContent = labelText
    })
    hydrateIcons(document)
  }

  document.getElementById('themeToggleBtn')?.addEventListener('click', handleThemeToggle)
  document.getElementById('mobileThemeToggleBtn')?.addEventListener('click', handleThemeToggle)
  document.getElementById('desktopLogoutBtn')?.addEventListener('click', handleLogout)
  document.getElementById('mobileLogoutBtn')?.addEventListener('click', handleLogout)
}
