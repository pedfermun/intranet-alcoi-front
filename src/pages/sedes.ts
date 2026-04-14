import { layout, pageHeader, statCard } from '../components/layout'
import { icon } from '../components/icons'
import { sedes } from '../lib/data'

export function sedesPage(): string {
  const totalEstudiantes = sedes.reduce((sum, s) => sum + s.estudiantes, 0)
  const totalEspecialidades = new Set(sedes.flatMap((s) => s.especialidades)).size

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
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <span class="grid place-items-center w-10 h-10 rounded-xl bg-sky-50 text-sky-700 icon-lg">${icon('map')}</span>
          <h2 class="text-base font-semibold text-slate-900">Ubicación de sedes</h2>
        </div>
        <span class="text-xs text-slate-500">Visualización esquemática</span>
      </div>
      <div class="relative h-72 rounded-xl overflow-hidden border border-slate-200 bg-gradient-to-br from-sky-50 via-brand-50 to-emerald-50">
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Mapa" class="absolute inset-0 w-full h-full object-cover opacity-40" />
        ${[
          { top: '62%', left: '55%', label: 'Alcoy' },
          { top: '32%', left: '62%', label: 'Barcelona' },
          { top: '22%', left: '18%', label: 'Vigo' },
          { top: '48%', left: '42%', label: 'Madrid' },
        ]
          .map(
            (p) => `
          <div class="absolute" style="top:${p.top}; left:${p.left}">
            <div class="relative">
              <span class="absolute inset-0 rounded-full bg-brand-500 animate-ping opacity-75 w-3 h-3"></span>
              <span class="relative block w-3 h-3 rounded-full bg-brand-600 ring-2 ring-white"></span>
            </div>
            <span class="absolute top-4 -translate-x-1/2 left-1.5 px-2 py-0.5 rounded-full bg-white text-xs font-semibold text-slate-800 shadow whitespace-nowrap">
              ${p.label}
            </span>
          </div>`
          )
          .join('')}
      </div>
    </section>
  `

  return layout(content)
}
