const STORAGE_KEY = 'theme'
export type Theme = 'light' | 'dark'

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function stored(): Theme | null {
  return localStorage.getItem(STORAGE_KEY) as Theme | null
}

export function getTheme(): Theme {
  return stored() ?? systemTheme()
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function setTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme)
  applyTheme(theme)
}

export function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark')
}

export function initTheme() {
  applyTheme(getTheme())
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!stored()) applyTheme(e.matches ? 'dark' : 'light')
  })
}
