import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { layout, pageHeader, statCard } from '../components/layout'
import { icon } from '../components/icons'
import { getSedes } from '../lib/data'

function parseCoords(s: string): [number, number] | null {
  const m = s.match(/^([\d.]+)°([NS]),\s*([\d.]+)°([EW])$/)
  if (!m) return null
  const lat = parseFloat(m[1]) * (m[2] === 'S' ? -1 : 1)
  const lng = parseFloat(m[3]) * (m[4] === 'W' ? -1 : 1)
  return [lat, lng]
}

export async function sedesPage(): Promise<string> {
  const sedes = await getSedes()
  const totalEstudiantes = sedes.reduce((sum, s) => sum + s.estudiantes, 0)
  const totalEspecialidades = new Set(sedes.flatMap((s) => s.especialidades)).size

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
    })}

    <section class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      ${statCard({ label: 'Estudiantes totales',    value: totalEstudiantes,      icon: 'users',     tone: 'brand' })}
      ${statCard({ label: 'Sedes activas',          value: sedes.length,          icon: 'building-2', tone: 'success' })}
      ${statCard({ label: 'Especialidades',         value: totalEspecialidades,   icon: 'book-open', tone: 'info' })}
      ${statCard({ label: 'Comunidades autónomas',  value: 4,                     icon: 'globe-2',   tone: 'warning' })}
    </section>

    <!-- Sedes grid -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
      ${sedes
        .map(
          (s) => `
        <article class="bg-white rounded-2xl border border-slate-200 elevation-1 hover:elevation-2 transition-all overflow-hidden">
          <div class="relative h-44">
            <img src="${s.image}" alt="${s.nombre}" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 text-white">
              <p class="text-xs uppercase tracking-widest text-white/80 font-semibold">${s.ciudad}</p>
              <h3 class="mt-1 text-xl font-bold tracking-tight">${s.nombre}</h3>
            </div>
            <span class="absolute top-3 right-3 chip-soft bg-white/90 text-slate-800 backdrop-blur">
              ${icon('users')} ${s.estudiantes}
            </span>
          </div>

          <div class="p-5 space-y-4">
            <p class="text-sm text-slate-600 leading-relaxed">${s.descripcion}</p>

            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div class="flex items-start gap-2 text-slate-600">
                <span class="text-slate-400 mt-0.5">${icon('map-pin')}</span>
                <span class="flex-1">${s.direccion}</span>
              </div>
              <div class="flex items-start gap-2 text-slate-600">
                <span class="text-slate-400 mt-0.5">${icon('phone')}</span>
                <a href="tel:${s.telefono}" class="hover:text-brand-700">${s.telefono}</a>
              </div>
              <div class="flex items-start gap-2 text-slate-600">
                <span class="text-slate-400 mt-0.5">${icon('mail')}</span>
                <a href="mailto:${s.email}" class="hover:text-brand-700 truncate">${s.email}</a>
              </div>
              <div class="flex items-start gap-2 text-slate-600">
                <span class="text-slate-400 mt-0.5">${icon('compass')}</span>
                <span>${s.coordenadas}</span>
              </div>
            </dl>

            <div>
              <p class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Especialidades</p>
              <div class="flex flex-wrap gap-1.5">
                ${s.especialidades.map((e) => `<span class="chip-soft">${e}</span>`).join('')}
              </div>
            </div>

            <div class="flex flex-wrap gap-2 pt-1">
              <button class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-700 text-sm font-semibold">
                ${icon('map')} Ver mapa
              </button>
              <button class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold">
                ${icon('phone')} Contactar
              </button>
              <button class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold">
                ${icon('image')} Galería
              </button>
            </div>
          </div>
        </article>`
        )
        .join('')}
    </section>

    <!-- Info + tech tags -->
    <section class="grid lg:grid-cols-2 gap-5 mb-10">
      <article class="bg-white rounded-2xl border border-slate-200 elevation-1 p-6">
        <div class="flex items-center gap-3 mb-3">
          <span class="grid place-items-center w-10 h-10 rounded-xl bg-brand-50 text-brand-700 icon-lg">${icon('globe-2')}</span>
          <h3 class="text-base font-semibold text-slate-900">Equipo distribuido</h3>
        </div>
        <p class="text-sm text-slate-600 mb-3">Estudiantes ASIX 1º repartidos por la geografía española:</p>
        <ul class="space-y-2 text-sm text-slate-700">
          ${sedes
            .map(
              (s) => `
            <li class="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
              <span class="flex items-center gap-2"><span class="text-brand-600">${icon('map-pin')}</span> <b>${s.ciudad}</b></span>
              <span class="text-slate-500">${s.estudiantes} estudiantes</span>
            </li>`
            )
            .join('')}
        </ul>
      </article>

      <article class="bg-white rounded-2xl border border-slate-200 elevation-1 p-6">
        <div class="flex items-center gap-3 mb-3">
          <span class="grid place-items-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 icon-lg">${icon('graduation-cap')}</span>
          <h3 class="text-base font-semibold text-slate-900">Stack del proyecto</h3>
        </div>
        <p class="text-sm text-slate-600 mb-4">
          Intranet corporativa desarrollada como proyecto final del ciclo formativo:
        </p>
        <div class="flex flex-wrap gap-2">
          ${['TypeScript', 'Vite', 'Tailwind CSS', 'Beer CSS', 'Lucide Icons', 'SPA Router', 'Responsive Design']
            .map((t) => `<span class="chip-soft">${t}</span>`)
            .join('')}
        </div>
      </article>
    </section>

    <!-- Map -->
    <section class="bg-white rounded-2xl border border-slate-200 elevation-1 p-6 mb-4">
      <div class="flex items-center gap-3 mb-4">
        <span class="grid place-items-center w-10 h-10 rounded-xl bg-sky-50 text-sky-700 icon-lg">${icon('map')}</span>
        <h2 class="text-base font-semibold text-slate-900">Ubicación de sedes</h2>
      </div>
      <div
        id="sedes-map"
        class="h-72 rounded-xl overflow-hidden border border-slate-200"
        data-sedes="${mapData}"
      ></div>
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
