import { createIcons, icons } from 'lucide'

export function hydrateIcons(root: ParentNode = document) {
  createIcons({ icons, attrs: { 'stroke-width': 2 }, nameAttr: 'data-lucide' })
  // Ensure re-scan works after each render
  root.querySelectorAll('i[data-lucide]').forEach(() => {})
}

export function icon(name: string, extraClass = ''): string {
  return `<i data-lucide="${name}" class="${extraClass}"></i>`
}
