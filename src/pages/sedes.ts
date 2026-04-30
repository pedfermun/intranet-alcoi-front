import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { layout, pageHeader } from '../components/layout'
import { icon } from '../components/icons'
import { getSedes, getUsers } from '../lib/data'

function parseCoords(s: string): [number, number] | null {
  const m = s.match(/^([\d.]+)°([NS]),\s*([\d.]+)°([EW])$/)
  if (!m) return null
  const lat = parseFloat(m[1]) * (m[2] === 'S' ? -1 : 1)
  const lng = parseFloat(m[3]) * (m[4] === 'W' ? -1 : 1)
  return [lat, lng]
}

export async function sedesPage(): Promise<string> {
  const [sedes, users] = await Promise.all([getSedes(), getUsers()])

  const mapData = JSON.stringify(
    sedes.map((s) => ({ nombre: s.nombre, ciudad: s.ciudad, coordenadas: s.coordenadas }))
  ).replace(/"/g, '&quot;')

  const content = `
    ${pageHeader({
      eyebrow: 'Red de sedes',
      icon: 'map-pin',
      title: 'Sedes del proyecto ASIX 1º',
      description:
        'Equipo distribuido entre cuatro comunidades autónomas. Explora cada sede, sus especialidades y su localización.',
      tone: 'amber',
    })}

    <!-- Sedes grid -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
      ${sedes
        .map(
          (s) => `
        <article class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 elevation-1 transition-all overflow-hidden group">
          <div class="relative h-48">
            <img src="${s.image}" alt="${s.nombre}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-300" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 text-white">
              <p class="text-xs uppercase tracking-widest text-white/70 font-semibold">${s.ciudad}</p>
              <h3 class="mt-1 text-xl font-bold tracking-tight">${s.nombre}</h3>
            </div>
            <span class="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-800/95 backdrop-blur text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-sm">
              ${icon('users')} ${s.estudiantes}
            </span>
          </div>

          <div class="p-5 space-y-4">
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">${s.descripcion}</p>

            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div class="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <span class="text-slate-400 mt-0.5">${icon('map-pin')}</span>
                <span class="flex-1">${s.direccion}</span>
              </div>
              <div class="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <span class="text-slate-400 mt-0.5">${icon('phone')}</span>
                <a href="tel:${s.telefono}" class="hover:text-brand-700 dark:hover:text-brand-400">${s.telefono}</a>
              </div>
              <div class="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <span class="text-slate-400 mt-0.5">${icon('mail')}</span>
                <a href="mailto:${s.email}" class="hover:text-brand-700 dark:hover:text-brand-400 truncate">${s.email}</a>
              </div>
              <div class="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <span class="text-slate-400 mt-0.5">${icon('compass')}</span>
                <span>${s.coordenadas}</span>
              </div>
            </dl>
           </div>
        </article>`
        )
        .join('')}
    </section>

    <!-- Info + tech tags -->
    <section class="grid lg:grid-cols-2 gap-5 mb-10">
      <article class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 elevation-1 overflow-hidden">
        <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-brand-50 dark:from-brand-900/20 to-transparent border-b border-slate-100 dark:border-slate-700">
          <span class="grid place-items-center w-10 h-10 rounded-xl bg-brand-600 text-white icon-lg">${icon('users')}</span>
          <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">Equipo Alcoi</h3>
        </div>
        <div class="p-6">
          <ul class="space-y-3">
            ${users
              .map(
                (u) => `
              <li class="flex items-center gap-3 py-1.5 border-b border-slate-100 dark:border-slate-700 last:border-0">
                <img src="${u.avatar}" alt="${u.name}" class="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-slate-100 dark:ring-slate-700" />
                <div class="min-w-0">
                  <p class="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">${u.name}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 truncate">${u.role}</p>
                </div>
              </li>`
              )
              .join('')}
          </ul>
        </div>
      </article>

      <article class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 elevation-1 overflow-hidden">
        <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-50 dark:from-emerald-900/20 to-transparent border-b border-slate-100 dark:border-slate-700">
          <span class="grid place-items-center w-10 h-10 rounded-xl bg-emerald-500 text-white icon-lg">${icon('graduation-cap')}</span>
          <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">Stack del proyecto</h3>
        </div>
        <div class="p-6">
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Intranet corporativa desarrollada con mucho amor y café:
        </p>
        <div class="flex flex-wrap gap-2">
          ${['TypeScript', 'Vite', 'Tailwind CSS', 'Lucide Icons', 'SPA Router', 'Responsive Design']
            .map((t) => `<span class="chip-soft">${t}</span>`)
            .join('')}
        </div>
        </div>
      </article>
    </section>

    <!-- Map -->
    <section class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 elevation-1 overflow-hidden mb-4">
      <div class="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-sky-50 dark:from-sky-900/20 to-transparent border-b border-slate-100 dark:border-slate-700">
        <span class="grid place-items-center w-10 h-10 rounded-xl bg-sky-500 text-white icon-lg">${icon('map')}</span>
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">Ubicación de sedes</h2>
      </div>
      <div class="p-6">
      <div
        id="sedes-map"
        class="h-72 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700"
        data-sedes="${mapData}"
      ></div>
      </div>
    </section>
  `

  return layout(content)
}

export function wireSedesPage(): void {
  const mapEl = document.getElementById('sedes-map')
  if (!mapEl) return

  type SedePin = { nombre: string; ciudad: string; coordenadas: string }
  const sedes = JSON.parse(mapEl.getAttribute('data-sedes') ?? '[]') as SedePin[]

  const map = L.map(mapEl).setView([40.2, -3.5], 6)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
  }).addTo(map)

  const pinIcon = L.divIcon({
    className: '',
    html: `<div style="width:14px;height:14px;background:#2563eb;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 6px rgba(37,99,235,0.5)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10],
  })

  for (const s of sedes) {
    const coords = parseCoords(s.coordenadas)
    if (!coords) continue
    L.marker(coords, { icon: pinIcon })
      .addTo(map)
      .bindPopup(`<b style="color:#1e3a5f">${s.nombre}</b><br><span style="color:#64748b;font-size:12px">${s.ciudad}</span>`)
  }
}
