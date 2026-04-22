import { layout } from '../components/layout'
import { icon } from '../components/icons'
import { getServidores, getTasks, getCurrentUserId, getUser, type Estado } from '../lib/data'

function donutChart(segments: { label: string; value: number; color: string }[], total: number): string {
  const size = 160
  const stroke = 24
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  let offset = 0

  const arcs = segments
    .filter((s) => s.value > 0)
    .map((s) => {
      const pct = s.value / total
      const dash = pct * circumference
      const arc = `
        <circle cx="${size / 2}" cy="${size / 2}" r="${radius}"
          fill="none" stroke="${s.color}" stroke-width="${stroke}"
          stroke-dasharray="${dash} ${circumference - dash}"
          stroke-dashoffset="${-offset}"
          stroke-linecap="round" class="transition-all duration-500" />`
      offset += dash
      return arc
    })
    .join('')

  return `
    <svg viewBox="0 0 ${size} ${size}" class="w-40 h-40 -rotate-90">
      <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" class="donut-track" stroke="#e2e8f0" stroke-width="${stroke}" />
      ${arcs}
    </svg>`
}

const estadoMeta: Record<Estado, { label: string; color: string; dot: string }> = {
  correcto:      { label: 'Operativos',     color: '#10b981', dot: 'bg-emerald-500' },
  aviso:         { label: 'Aviso',          color: '#f59e0b', dot: 'bg-amber-500' },
  critico:       { label: 'Crítico',        color: '#ef4444', dot: 'bg-red-500' },
  mantenimiento: { label: 'Mantenimiento',  color: '#0ea5e9', dot: 'bg-sky-500' },
}

export async function homePage(): Promise<string> {
  const [servidores, tasks, userId] = await Promise.all([
    getServidores(),
    getTasks(),
    getCurrentUserId(),
  ])

  const user = userId ? await getUser(userId) : null
  const firstName = user?.name?.split(' ')[0] ?? 'usuario'

  const hour = new Date().getHours()
  const greeting = hour < 13 ? 'Buenos días' : hour < 20 ? 'Buenas tardes' : 'Buenas noches'

  const counts: Record<Estado, number> = { correcto: 0, aviso: 0, critico: 0, mantenimiento: 0 }
  for (const s of servidores) counts[s.estado]++

  const segments = (['correcto', 'aviso', 'critico', 'mantenimiento'] as Estado[]).map((e) => ({
    label: estadoMeta[e].label,
    value: counts[e],
    color: estadoMeta[e].color,
  }))

  const myDoingTasks = tasks.filter((t) => t.assignedTo === userId && t.column === 'doing')

  const quickLinks = [
    { href: '/servidores', icon: 'server',        label: 'Servidores', bg: 'bg-emerald-500', ring: 'ring-emerald-200 dark:ring-emerald-900' },
    { href: '/sedes',      icon: 'map-pin',        label: 'Sedes',      bg: 'bg-amber-500',   ring: 'ring-amber-200 dark:ring-amber-900' },
    { href: '/tareas',     icon: 'kanban-square',  label: 'Tareas',     bg: 'bg-violet-500',  ring: 'ring-violet-200 dark:ring-violet-900' },
  ]

  const operativos = counts.correcto
  const alertas = counts.aviso + counts.critico
  const myTotalTasks = tasks.filter((t) => t.assignedTo === userId).length

  const content = `
    <!-- Hero -->
    <section class="relative overflow-hidden rounded-2xl border border-brand-100 dark:border-brand-900/40 bg-gradient-to-br from-brand-50 via-white to-violet-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 elevation-2 p-6 sm:p-8 mb-6">
      <div class="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-brand-100/60 dark:from-brand-900/20 to-transparent rounded-full -translate-y-1/3 translate-x-1/4"></div>
      <div class="absolute bottom-0 left-1/2 w-48 h-48 bg-gradient-to-t from-violet-100/40 dark:from-violet-900/10 to-transparent rounded-full translate-y-1/2"></div>

      <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100/70 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-widest mb-3">
            ${icon('building-2')} Sede Alcoi
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            ${greeting}, <span class="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">${firstName}</span>
          </h1>
          <p class="mt-2 text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-lg">
            Accede a los servicios internos y consulta el estado de la infraestructura.
          </p>
        </div>
        <div class="flex items-center gap-3">
          ${quickLinks.map((l) => `
            <a href="${l.href}" data-link class="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-white dark:border-slate-700 hover:elevation-2 hover:border-slate-200 dark:hover:border-slate-600 transition-all group cursor-pointer">
              <span class="grid place-items-center w-10 h-10 rounded-xl ${l.bg} text-white ring-4 ${l.ring} icon-lg group-hover:scale-110 transition-transform">${icon(l.icon)}</span>
              <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">${l.label}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Stats summary -->
    <section class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div class="relative overflow-hidden rounded-2xl border border-emerald-100 dark:border-slate-700 bg-gradient-to-br from-emerald-50 to-white dark:from-slate-800 dark:to-slate-900 elevation-1 p-5">
        <div class="absolute -top-3 -right-3 w-16 h-16 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full"></div>
        <div class="relative">
          <div class="flex items-center gap-2 mb-2">
            <span class="grid place-items-center w-8 h-8 rounded-lg bg-emerald-500 text-white icon-sm">${icon('shield-check')}</span>
            <span class="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">Operativos</span>
          </div>
          <p class="text-3xl font-bold text-emerald-700 dark:text-emerald-400">${operativos}<span class="text-sm font-medium text-emerald-500 dark:text-emerald-500 ml-1">/ ${servidores.length}</span></p>
        </div>
      </div>
      <div class="relative overflow-hidden rounded-2xl border border-amber-100 dark:border-slate-700 bg-gradient-to-br from-amber-50 to-white dark:from-slate-800 dark:to-slate-900 elevation-1 p-5">
        <div class="absolute -top-3 -right-3 w-16 h-16 bg-amber-100/50 dark:bg-amber-900/20 rounded-full"></div>
        <div class="relative">
          <div class="flex items-center gap-2 mb-2">
            <span class="grid place-items-center w-8 h-8 rounded-lg bg-amber-500 text-white icon-sm">${icon('triangle-alert')}</span>
            <span class="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">Alertas</span>
          </div>
          <p class="text-3xl font-bold text-amber-700 dark:text-amber-400">${alertas}<span class="text-sm font-medium text-amber-400 ml-1">activas</span></p>
        </div>
      </div>
      <div class="relative overflow-hidden rounded-2xl border border-violet-100 dark:border-slate-700 bg-gradient-to-br from-violet-50 to-white dark:from-slate-800 dark:to-slate-900 elevation-1 p-5">
        <div class="absolute -top-3 -right-3 w-16 h-16 bg-violet-100/50 dark:bg-violet-900/20 rounded-full"></div>
        <div class="relative">
          <div class="flex items-center gap-2 mb-2">
            <span class="grid place-items-center w-8 h-8 rounded-lg bg-violet-500 text-white icon-sm">${icon('list-checks')}</span>
            <span class="text-xs font-semibold text-violet-700 dark:text-violet-400 uppercase tracking-wide">Mis tareas</span>
          </div>
          <p class="text-3xl font-bold text-violet-700 dark:text-violet-400">${myTotalTasks}<span class="text-sm font-medium text-violet-400 ml-1">total</span></p>
        </div>
      </div>
    </section>

    <!-- Dashboard widgets -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

      <!-- Server status donut -->
      <article class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 elevation-1 overflow-hidden">
        <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-brand-50 dark:from-brand-900/20 to-transparent border-b border-slate-100 dark:border-slate-700">
          <span class="grid place-items-center w-10 h-10 rounded-xl bg-brand-600 text-white icon-lg">${icon('activity')}</span>
          <div>
            <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">Estado de servidores</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400">Distribución por estado</p>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-6">
          <div class="relative flex-shrink-0">
            ${donutChart(segments, servidores.length)}
            <div class="absolute inset-0 flex flex-col items-center justify-center rotate-0">
              <span class="text-2xl font-bold text-slate-900 dark:text-slate-100">${servidores.length}</span>
              <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">total</span>
            </div>
          </div>
          <ul class="flex-1 w-full space-y-2.5">
            ${(['correcto', 'aviso', 'critico', 'mantenimiento'] as Estado[])
              .map((e) => {
                const pct = servidores.length ? Math.round((counts[e] / servidores.length) * 100) : 0
                return `
              <li class="flex items-center justify-between text-sm px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <span class="flex items-center gap-2.5">
                  <span class="w-3 h-3 rounded-full ${estadoMeta[e].dot} ring-2 ring-offset-1 dark:ring-offset-slate-800 ${estadoMeta[e].dot.replace('bg-', 'ring-').replace('-500', '-200')}"></span>
                  <span class="text-slate-700 dark:text-slate-300 font-medium">${estadoMeta[e].label}</span>
                </span>
                <span class="flex items-center gap-2">
                  <span class="text-xs text-slate-400">${pct}%</span>
                  <span class="font-bold text-slate-900 dark:text-slate-100 tabular-nums w-5 text-right">${counts[e]}</span>
                </span>
              </li>`
              })
              .join('')}
          </ul>
        </div>
      </article>

      <!-- My doing tasks -->
      <article class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 elevation-1 overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-sky-50 dark:from-sky-900/20 to-transparent border-b border-slate-100 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <span class="grid place-items-center w-10 h-10 rounded-xl bg-sky-500 text-white icon-lg">${icon('loader-circle')}</span>
            <div>
              <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">Mis tareas en progreso</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">${myDoingTasks.length} ${myDoingTasks.length === 1 ? 'tarea activa' : 'tareas activas'}</p>
            </div>
          </div>
          <a href="/tareas" data-link class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-900/60 text-xs font-semibold transition-colors cursor-pointer">
            Ver todas ${icon('arrow-right', 'w-3.5 h-3.5')}
          </a>
        </div>
        <div class="p-6">
        ${myDoingTasks.length === 0
          ? `<div class="flex flex-col items-center justify-center py-8 text-slate-400">
               ${icon('circle-check-big', 'w-10 h-10 mb-2 text-emerald-300')}
               <p class="text-sm font-medium text-slate-500 dark:text-slate-400">No tienes tareas en progreso</p>
               <p class="text-xs text-slate-400 mt-1">Todas las tareas completadas</p>
             </div>`
          : `<ul class="space-y-2.5">
              ${myDoingTasks.map((t) => `
                <li class="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-sky-50/80 dark:from-sky-900/20 to-slate-50/50 dark:to-slate-800/50 border border-sky-100/80 dark:border-sky-900/40 hover:border-sky-200 dark:hover:border-sky-800 transition-colors">
                  <span class="w-2.5 h-2.5 rounded-full bg-sky-500 ring-4 ring-sky-100 dark:ring-sky-900/50 flex-shrink-0"></span>
                  <span class="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">${t.title}</span>
                </li>`).join('')}
             </ul>`
        }
        </div>
      </article>

    </section>
    `

  return layout(content)
}
