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

    <footer class="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
          ${icon('building-2', 'text-brand-600 dark:text-brand-400')}
          © ${new Date().getFullYear()} Institut d'Alcoi · Intranet corporativa
        </p>
        <div class="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <a href="#" class="hover:text-brand-600 dark:hover:text-brand-400 inline-flex items-center gap-1.5 text-sm">${icon('shield-check')} Privacidad</a>
          <a href="#" class="hover:text-brand-600 dark:hover:text-brand-400 inline-flex items-center gap-1.5 text-sm">${icon('life-buoy')} Soporte</a>
          <a href="#" class="hover:text-brand-600 dark:hover:text-brand-400 inline-flex items-center gap-1.5 text-sm">${icon('github')} GitHub</a>
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
  tone?: 'brand' | 'emerald' | 'amber' | 'sky' | 'violet'
}): string {
  const toneMap: Record<string, { gradient: string; badge: string; iconBg: string }> = {
    brand:   { gradient: 'from-brand-50 via-white to-violet-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800',   badge: 'bg-brand-100/70 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300',     iconBg: 'bg-brand-600 text-white' },
    emerald: { gradient: 'from-emerald-50 via-white to-sky-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800',    badge: 'bg-emerald-100/70 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', iconBg: 'bg-emerald-600 text-white' },
    amber:   { gradient: 'from-amber-50 via-white to-orange-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800',   badge: 'bg-amber-100/70 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',       iconBg: 'bg-amber-500 text-white' },
    sky:     { gradient: 'from-sky-50 via-white to-brand-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800',      badge: 'bg-sky-100/70 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',             iconBg: 'bg-sky-500 text-white' },
    violet:  { gradient: 'from-violet-50 via-white to-brand-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800',   badge: 'bg-violet-100/70 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',   iconBg: 'bg-violet-600 text-white' },
  }
  const t = toneMap[opts.tone ?? 'brand']
  return `
    <section class="relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700 bg-gradient-to-br ${t.gradient} elevation-1 p-6 sm:p-8 mb-8">
      <div class="absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl from-slate-100/40 dark:from-slate-700/20 to-transparent rounded-full -translate-y-1/3 translate-x-1/4"></div>
      <div class="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full ${t.badge} text-xs font-semibold uppercase tracking-widest mb-3">
            ${opts.icon ? `<span class="grid place-items-center w-5 h-5 rounded-md ${t.iconBg}">${icon(opts.icon, 'w-3 h-3')}</span>` : ''}
            <span>${opts.eyebrow}</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            ${opts.title}
          </h1>
          ${opts.description ? `<p class="mt-2 max-w-2xl text-slate-500 dark:text-slate-400 text-sm leading-relaxed">${opts.description}</p>` : ''}
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
  const tones: Record<string, { gradient: string; border: string; iconBg: string; text: string; circle: string }> = {
    brand:   { gradient: 'from-brand-50 to-white dark:from-slate-800 dark:to-slate-900',   border: 'border-brand-100 dark:border-slate-700',   iconBg: 'bg-brand-600 text-white',   text: 'text-brand-700 dark:text-brand-400',   circle: 'bg-brand-100/50 dark:bg-brand-900/20' },
    success: { gradient: 'from-emerald-50 to-white dark:from-slate-800 dark:to-slate-900', border: 'border-emerald-100 dark:border-slate-700', iconBg: 'bg-emerald-500 text-white', text: 'text-emerald-700 dark:text-emerald-400', circle: 'bg-emerald-100/50 dark:bg-emerald-900/20' },
    warning: { gradient: 'from-amber-50 to-white dark:from-slate-800 dark:to-slate-900',   border: 'border-amber-100 dark:border-slate-700',   iconBg: 'bg-amber-500 text-white',   text: 'text-amber-700 dark:text-amber-400',   circle: 'bg-amber-100/50 dark:bg-amber-900/20' },
    error:   { gradient: 'from-red-50 to-white dark:from-slate-800 dark:to-slate-900',     border: 'border-red-100 dark:border-slate-700',     iconBg: 'bg-red-500 text-white',     text: 'text-red-700 dark:text-red-400',       circle: 'bg-red-100/50 dark:bg-red-900/20' },
    info:    { gradient: 'from-sky-50 to-white dark:from-slate-800 dark:to-slate-900',     border: 'border-sky-100 dark:border-slate-700',     iconBg: 'bg-sky-500 text-white',     text: 'text-sky-700 dark:text-sky-400',       circle: 'bg-sky-100/50 dark:bg-sky-900/20' },
  }
  const t = tones[opts.tone ?? 'brand']
  return `
    <article class="relative overflow-hidden rounded-2xl border ${t.border} bg-gradient-to-br ${t.gradient} elevation-1 p-5">
      <div class="absolute -top-3 -right-3 w-14 h-14 ${t.circle} rounded-full"></div>
      <div class="relative flex items-start gap-4">
        <div class="grid place-items-center w-10 h-10 rounded-xl ${t.iconBg} icon-lg">
          ${icon(opts.icon)}
        </div>
        <div class="min-w-0">
          <p class="text-xs font-semibold ${t.text} uppercase tracking-wide">${opts.label}</p>
          <p class="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">${opts.value}</p>
          ${opts.hint ? `<p class="mt-1 text-xs text-slate-500 dark:text-slate-400">${opts.hint}</p>` : ''}
        </div>
      </div>
    </article>
  `
}
