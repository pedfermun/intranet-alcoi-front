import { layout, pageHeader, statCard } from '../components/layout'
import { icon } from '../components/icons'
import { getServidores, type Estado } from '../lib/data'

const estadoStyle: Record<Estado, { label: string; dot: string; badge: string; icon: string }> = {
  correcto:      { label: 'Operativo',     dot: 'status-ok',    badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', icon: 'check-circle-2' },
  aviso:         { label: 'Aviso',         dot: 'status-warn',  badge: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',           icon: 'triangle-alert' },
  critico:       { label: 'Crítico',       dot: 'status-crit',  badge: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',                   icon: 'circle-alert' },
  mantenimiento: { label: 'Mantenimiento', dot: 'status-maint', badge: 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',                   icon: 'wrench' },
}

function metricColor(v: number) {
  if (v >= 85) return '#dc2626'
  if (v >= 70) return '#d97706'
  return '#16a34a'
}

function formatFecha(f: string) {
  return new Date(f).toLocaleString('es-ES', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

export async function servidoresPage(): Promise<string> {
  const servidores = await getServidores()
  const operativos    = servidores.filter((s) => s.estado === 'correcto').length
  const avisos        = servidores.filter((s) => s.estado === 'aviso').length
  const criticos      = servidores.filter((s) => s.estado === 'critico').length
  const mantenimiento = servidores.filter((s) => s.estado === 'mantenimiento').length

  const content = `
    ${pageHeader({
      eyebrow: 'Monitorización',
      icon: 'activity',
      title: 'Estado de servidores',
      description:
        'Dashboard en tiempo real de la infraestructura del instituto. Rendimiento, servicios y disponibilidad en un solo lugar.',
      tone: 'emerald',
      actions: `
        <button class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 text-sm font-semibold cursor-pointer transition-colors">
          ${icon('download')} Exportar
        </button>
        <button class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 text-sm font-semibold elevation-1 cursor-pointer transition-colors">
          ${icon('refresh-cw')} Actualizar
        </button>
      `,
    })}

    <section class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      ${statCard({ label: 'Servidores totales', value: servidores.length, icon: 'server',        tone: 'brand' })}
      ${statCard({ label: 'Operativos',         value: operativos,        icon: 'shield-check',  tone: 'success' })}
      ${statCard({ label: 'Con avisos',         value: avisos + criticos, icon: 'triangle-alert', tone: 'warning' })}
      ${statCard({ label: 'En mantenimiento',   value: mantenimiento,     icon: 'wrench',        tone: 'info' })}
    </section>

    <!-- Filters -->
    <section class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 elevation-1 overflow-hidden mb-6">
      <div class="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-slate-50 dark:from-slate-700/40 to-transparent border-b border-slate-100 dark:border-slate-700">
        <span class="grid place-items-center w-8 h-8 rounded-lg bg-slate-600 text-white icon-sm">${icon('filter')}</span>
        <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Filtros</span>
      </div>
      <div class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 icon-sm">${icon('search')}</span>
          <input id="searchServer" type="text" placeholder="Hostname, IP o rol…"
            class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 focus:border-brand-400 text-sm text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-400" />
        </div>
        <select id="filterSede"
          class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 focus:border-brand-400 text-sm text-slate-900 dark:text-slate-100 outline-none">
          <option value="">Todas las sedes</option>
          <option value="Alcoy">Alcoy</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Vigo">Vigo</option>
          <option value="Madrid">Madrid</option>
        </select>
        <select id="filterEstado"
          class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 focus:border-brand-400 text-sm text-slate-900 dark:text-slate-100 outline-none">
          <option value="">Todos los estados</option>
          <option value="correcto">Operativo</option>
          <option value="aviso">Aviso</option>
          <option value="critico">Crítico</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>
        <select id="sortBy"
          class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 focus:border-brand-400 text-sm text-slate-900 dark:text-slate-100 outline-none">
          <option value="hostname">Ordenar: Hostname</option>
          <option value="sede">Ordenar: Sede</option>
          <option value="estado">Ordenar: Estado</option>
          <option value="uptime">Ordenar: Uptime</option>
        </select>
      </div>
      </div>
    </section>

    <!-- Servers grid -->
    <section id="serversGrid" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
      ${servidores
        .map((s) => {
          const st = estadoStyle[s.estado]
          const headerGradient =
            s.estado === 'correcto'      ? 'from-emerald-50/60 dark:from-emerald-900/20' :
            s.estado === 'aviso'         ? 'from-amber-50/60 dark:from-amber-900/20' :
            s.estado === 'critico'       ? 'from-red-50/60 dark:from-red-900/20' :
                                           'from-sky-50/60 dark:from-sky-900/20'
          const iconBg =
            s.estado === 'correcto'      ? 'bg-emerald-500 text-white' :
            s.estado === 'aviso'         ? 'bg-amber-500 text-white' :
            s.estado === 'critico'       ? 'bg-red-500 text-white' :
                                           'bg-sky-500 text-white'
          return `
          <article class="server-card bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 elevation-1 hover:elevation-2 transition-all overflow-hidden"
                   data-server-id="${s.id}" data-estado="${s.estado}" data-sede="${s.sede}">
            <header class="flex items-center gap-3 p-5 pb-3 bg-gradient-to-r ${headerGradient} to-transparent">
              <div class="grid place-items-center w-11 h-11 rounded-xl ${iconBg} icon-lg">
                ${icon('server')}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="server-hostname font-semibold text-slate-900 dark:text-slate-100 truncate">${s.hostname}</h3>
                <p class="server-role text-xs text-slate-500 dark:text-slate-400">${s.rol}</p>
              </div>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${st.badge} text-xs font-semibold">
                <span class="status-dot ${st.dot}"></span> ${st.label}
              </span>
            </header>

            <div class="px-5 mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div class="flex items-center gap-1.5"><span class="text-slate-400">${icon('network')}</span> ${s.ip}</div>
              <div class="flex items-center gap-1.5"><span class="text-slate-400">${icon('cpu')}</span> ${s.sistemaOperativo}</div>
              <div class="flex items-center gap-1.5"><span class="text-slate-400">${icon('map-pin')}</span> ${s.sede}</div>
              <div class="flex items-center gap-1.5"><span class="text-slate-400">${icon('timer')}</span> ${s.uptime}</div>
            </div>

            <div class="px-5 mt-4 grid grid-cols-3 gap-3">
              ${[
                { label: 'CPU',  val: s.cpu,     ic: 'cpu' },
                { label: 'RAM',  val: s.memoria, ic: 'memory-stick' },
                { label: 'Disco', val: s.disco,  ic: 'hard-drive' },
              ]
                .map(
                  (m) => `
                <div>
                  <div class="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                    <span class="inline-flex items-center gap-1">${icon(m.ic)} ${m.label}</span>
                    <span class="font-semibold text-slate-700 dark:text-slate-300">${m.val}%</span>
                  </div>
                  <div class="metric-track">
                    <div class="metric-fill" style="width:${m.val}%; background:${metricColor(m.val)}"></div>
                  </div>
                </div>`
                )
                .join('')}
            </div>

            <footer class="px-5 py-4 mt-5 border-t border-slate-100 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/30 flex items-center justify-between gap-2">
              <span class="text-[11px] text-slate-500 dark:text-slate-400 inline-flex items-center gap-1">
                ${icon('clock')} ${formatFecha(s.ultimaRevision)}
              </span>
              <div class="flex items-center gap-1">
                <a href="ssh://batoi@${s.ip}" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-brand-600 text-white hover:bg-brand-700 text-xs font-semibold" aria-label="SSH a ${s.ip}">
                  ${icon('terminal')} SSH
                </a>
              </div>
            </footer>
          </article>`
        })
        .join('')}
    </section>

    <!-- Legend -->
    <section class="grid lg:grid-cols-2 gap-5 mt-10">
      <article class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 elevation-1 overflow-hidden">
        <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-brand-50 dark:from-brand-900/20 to-transparent border-b border-slate-100 dark:border-slate-700">
          <span class="grid place-items-center w-10 h-10 rounded-xl bg-brand-600 text-white icon-lg">${icon('info')}</span>
          <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">Sistema de monitorización</h3>
        </div>
        <div class="p-6">
        <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li class="flex gap-2"><span class="text-brand-600 dark:text-brand-400 mt-0.5">${icon('refresh-cw')}</span> Los datos se refrescan cada 5 minutos desde la base central.</li>
        </ul>
        </div>
      </article>

      <article class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 elevation-1 overflow-hidden">
        <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-50 dark:from-amber-900/20 to-transparent border-b border-slate-100 dark:border-slate-700">
          <span class="grid place-items-center w-10 h-10 rounded-xl bg-amber-500 text-white icon-lg">${icon('target')}</span>
          <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">Leyenda de estados</h3>
        </div>
        <div class="p-6">
        <ul class="space-y-2.5 text-sm">
          ${(Object.entries(estadoStyle) as [Estado, (typeof estadoStyle)[Estado]][])
            .map(
              ([key, v]) => `
            <li class="flex items-center gap-3">
              <span class="status-dot ${v.dot}"></span>
              <b class="text-slate-800 dark:text-slate-200">${v.label}:</b>
              <span class="text-slate-600 dark:text-slate-400">
                ${
                  key === 'correcto'      ? 'Todo operativo, métricas normales.' :
                  key === 'aviso'         ? 'Requiere atención, métricas elevadas.' :
                  key === 'critico'       ? 'Problema grave, acción inmediata.' :
                                            'Fuera de servicio por mantenimiento.'
                }
              </span>
            </li>`
            )
            .join('')}
        </ul>
        </div>
      </article>
    </section>
  `

  return layout(content)
}

export function wireServidoresPage() {
  const search = document.getElementById('searchServer') as HTMLInputElement | null
  const fSede = document.getElementById('filterSede') as HTMLSelectElement | null
  const fEstado = document.getElementById('filterEstado') as HTMLSelectElement | null
  const sortBy = document.getElementById('sortBy') as HTMLSelectElement | null
  const grid = document.getElementById('serversGrid')
  if (!grid) return

  const cards = Array.from(grid.querySelectorAll<HTMLElement>('.server-card'))

  function filter() {
    const q = search?.value.toLowerCase().trim() ?? ''
    const sede = fSede?.value ?? ''
    const estado = fEstado?.value ?? ''
    cards.forEach((card) => {
      const host = card.querySelector('.server-hostname')?.textContent?.toLowerCase() ?? ''
      const role = card.querySelector('.server-role')?.textContent?.toLowerCase() ?? ''
      const text = card.textContent?.toLowerCase() ?? ''
      const matches =
        (!q || host.includes(q) || role.includes(q) || text.includes(q)) &&
        (!sede || card.dataset.sede === sede) &&
        (!estado || card.dataset.estado === estado)
      card.style.display = matches ? '' : 'none'
    })
  }

  function sort() {
    const mode = sortBy?.value ?? 'hostname'
    const order: Record<string, number> = { critico: 0, aviso: 1, mantenimiento: 2, correcto: 3 }
    const sorted = [...cards].sort((a, b) => {
      switch (mode) {
        case 'sede':   return (a.dataset.sede ?? '').localeCompare(b.dataset.sede ?? '')
        case 'estado': return (order[a.dataset.estado ?? ''] ?? 99) - (order[b.dataset.estado ?? ''] ?? 99)
        case 'uptime': {
          const av = parseInt(a.textContent?.match(/(\d+)\s+días/)?.[1] ?? '0', 10)
          const bv = parseInt(b.textContent?.match(/(\d+)\s+días/)?.[1] ?? '0', 10)
          return bv - av
        }
        default: {
          const ah = a.querySelector('.server-hostname')?.textContent ?? ''
          const bh = b.querySelector('.server-hostname')?.textContent ?? ''
          return ah.localeCompare(bh)
        }
      }
    })
    sorted.forEach((c) => grid!.appendChild(c))
  }

  search?.addEventListener('input', filter)
  fSede?.addEventListener('change', filter)
  fEstado?.addEventListener('change', filter)
  sortBy?.addEventListener('change', sort)
}
