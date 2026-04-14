import { topbar } from './topbar'
import { icon } from './icons'

export function layout(content: string): string {
  const path = window.location.pathname
  return `
    ${topbar(path)}

    <main class="flex-1 w-full">
      <div class="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-8 lg:pt-10 pb-16 lg:pb-20">
        ${content}
      </div>
    </main>

    <footer class="border-t border-slate-200 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-slate-500 flex items-center gap-2">
          ${icon('building-2', 'text-brand-600')}
          © ${new Date().getFullYear()} Institut d'Alcoi · Intranet corporativa
        </p>
        <div class="flex items-center gap-4 text-slate-500">
          <a href="#" class="hover:text-brand-600 inline-flex items-center gap-1.5 text-sm">${icon('shield-check')} Privacidad</a>
          <a href="#" class="hover:text-brand-600 inline-flex items-center gap-1.5 text-sm">${icon('life-buoy')} Soporte</a>
          <a href="#" class="hover:text-brand-600 inline-flex items-center gap-1.5 text-sm">${icon('github')} GitHub</a>
        </div>
      </div>
    </footer>
  `
}

export function pageHeader(opts: {
  eyebrow: string
  title: string
  description?: string
  icon?: string
  actions?: string
}): string {
  return `
    <section class="mb-8">
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest">
            ${opts.icon ? icon(opts.icon) : ''}
            <span>${opts.eyebrow}</span>
          </div>
          <h1 class="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            ${opts.title}
          </h1>
          ${opts.description ? `<p class="mt-3 max-w-2xl text-slate-600 leading-relaxed">${opts.description}</p>` : ''}
        </div>
        ${opts.actions ? `<div class="flex flex-wrap items-center gap-2">${opts.actions}</div>` : ''}
      </div>
    </section>
  `
}

export function statCard(opts: {
  label: string
  value: string | number
  icon: string
  tone?: 'brand' | 'success' | 'warning' | 'error' | 'info'
  hint?: string
}): string {
  const tones: Record<string, string> = {
    brand:   'bg-brand-50 text-brand-700',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    error:   'bg-red-50 text-red-700',
    info:    'bg-sky-50 text-sky-700',
  }
  const tone = tones[opts.tone ?? 'brand']
  return `
    <article class="bg-white rounded-2xl border border-slate-200 elevation-1 p-5 flex items-start gap-4">
      <div class="grid place-items-center w-11 h-11 rounded-xl ${tone} icon-lg">
        ${icon(opts.icon)}
      </div>
      <div class="min-w-0">
        <p class="text-sm text-slate-500 font-medium">${opts.label}</p>
        <p class="mt-1 text-2xl font-bold text-slate-900 tracking-tight">${opts.value}</p>
        ${opts.hint ? `<p class="mt-1 text-xs text-slate-500">${opts.hint}</p>` : ''}
      </div>
    </article>
  `
}
