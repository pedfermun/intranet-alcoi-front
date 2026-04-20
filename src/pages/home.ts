import { layout, statCard } from '../components/layout'
import { icon } from '../components/icons'
import { servicios, servidores, sedes, contactos } from '../lib/data'

export function homePage(): string {
  const operativos = servidores.filter((s) => s.estado === 'correcto').length
  const avisos = servidores.filter((s) => s.estado === 'aviso' || s.estado === 'critico').length

  const quickLinks = servicios.slice(0, 4)

  const content = `
    <!-- Hero -->
    <section class="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white elevation-3 mb-10">
      <div class="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"></div>
      <div class="relative grid lg:grid-cols-2 gap-8 p-8 sm:p-12">
        <div>
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white/90 text-xs font-semibold uppercase tracking-widest">
            ${icon('sparkles')} Portal corporativo
          </span>
          <h1 class="mt-5 text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Bienvenido a la Intranet del <span class="text-brand-100">Institut d'Alcoi</span>
          </h1>
          <p class="mt-5 max-w-xl text-brand-50/90 text-lg leading-relaxed">
            Accede a los servicios internos, consulta el estado de la infraestructura y encuentra a tus compañeros del equipo ASIX 1º.
          </p>
          <div class="mt-7 flex flex-wrap items-center gap-3">
            <a href="/servicios" data-link class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-brand-700 font-semibold hover:bg-brand-50 transition-colors elevation-1">
              ${icon('layout-grid')} Ver servicios
            </a>
            <a href="/servidores" data-link class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 backdrop-blur text-white font-semibold hover:bg-white/20 transition-colors border border-white/25">
              ${icon('activity')} Estado de sistemas
            </a>
          </div>
        </div>
        <div class="hidden lg:flex items-center justify-center">
          <div class="relative w-full max-w-md">
            <div class="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl"></div>
            <div class="relative rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6">
              <p class="text-xs uppercase tracking-widest text-brand-100/80 font-semibold">Infraestructura hoy</p>
              <div class="mt-4 grid grid-cols-2 gap-4">
                <div class="rounded-xl bg-white/10 p-4">
                  <p class="text-3xl font-bold">${operativos}</p>
                  <p class="text-sm text-brand-100/90">Servidores operativos</p>
                </div>
                <div class="rounded-xl bg-white/10 p-4">
                  <p class="text-3xl font-bold">${avisos}</p>
                  <p class="text-sm text-brand-100/90">Requieren atención</p>
                </div>
                <div class="rounded-xl bg-white/10 p-4">
                  <p class="text-3xl font-bold">${sedes.length}</p>
                  <p class="text-sm text-brand-100/90">Sedes activas</p>
                </div>
                <div class="rounded-xl bg-white/10 p-4">
                  <p class="text-3xl font-bold">${contactos.length}</p>
                  <p class="text-sm text-brand-100/90">Miembros equipo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      ${statCard({ label: 'Servicios activos',  value: servicios.length,  icon: 'layout-grid', tone: 'brand' })}
      ${statCard({ label: 'Operativos',         value: operativos,        icon: 'shield-check', tone: 'success', hint: 'En los últimos 15 min' })}
      ${statCard({ label: 'Con incidencia',     value: avisos,            icon: 'triangle-alert', tone: 'warning' })}
      ${statCard({ label: 'Sedes conectadas',   value: sedes.length,      icon: 'map-pin', tone: 'info' })}
    </section>

    <!-- Quick access -->
    <section class="mb-10">
      <div class="flex items-end justify-between mb-4">
        <div>
          <h2 class="text-xl font-semibold text-slate-900">Accesos rápidos</h2>
          <p class="text-sm text-slate-500">Los servicios que más usa tu equipo.</p>
        </div>
        <a href="/servicios" data-link class="text-sm font-semibold text-brand-700 hover:text-brand-800 inline-flex items-center gap-1">
          Ver todos ${icon('arrow-right')}
        </a>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${quickLinks
          .map(
            (s) => `
          <a href="${s.url}" ${s.url.startsWith('/') ? 'data-link' : ''} class="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-brand-400 hover:-translate-y-0.5 transition-all elevation-1 hover:elevation-2">
            <div class="grid place-items-center w-11 h-11 rounded-xl bg-brand-50 text-brand-700 icon-lg">
              ${icon(s.icono)}
            </div>
            <h3 class="mt-4 font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">${s.nombre}</h3>
            <p class="mt-1 text-sm text-slate-500 line-clamp-2">${s.descripcion}</p>
          </a>`
          )
          .join('')}
      </div>
    </section>

    <!-- Two-column: Activity + Team -->
    <section class="grid lg:grid-cols-3 gap-6">
      <article class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 elevation-1 p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-lg font-semibold text-slate-900">Actividad reciente</h2>
            <p class="text-sm text-slate-500">Últimas acciones en la plataforma.</p>
          </div>
          <button class="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-brand-700">${icon('refresh-cw')} Actualizar</button>
        </div>
        <ul class="divide-y divide-slate-100">
          ${[
            { ic: 'server', tone: 'bg-emerald-50 text-emerald-700', text: '<b>SRV-WEB-ALC01</b> completó su backup diario correctamente.', time: 'Hace 5 min' },
            { ic: 'triangle-alert', tone: 'bg-red-50 text-red-700', text: '<b>SRV-MAIL-ALC02</b> alcanzó el 95% de uso de disco.', time: 'Hace 27 min' },
            { ic: 'user-plus', tone: 'bg-brand-50 text-brand-700', text: '<b>Pedro Fernández</b> actualizó su perfil en el directorio.', time: 'Hace 2 h' },
            { ic: 'calendar-check', tone: 'bg-sky-50 text-sky-700', text: 'Reunión de seguimiento ASIX 1º agendada para el viernes.', time: 'Ayer' },
          ]
            .map(
              (a) => `
            <li class="flex items-start gap-3 py-3">
              <span class="grid place-items-center w-9 h-9 rounded-lg ${a.tone}">${icon(a.ic)}</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-slate-700">${a.text}</p>
                <p class="text-xs text-slate-400 mt-0.5">${a.time}</p>
              </div>
            </li>`
            )
            .join('')}
        </ul>
      </article>

      <article class="bg-white rounded-2xl border border-slate-200 elevation-1 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-slate-900">Tu equipo</h2>
          <a href="/contacto" data-link class="text-sm font-semibold text-brand-700 hover:text-brand-800">Directorio</a>
        </div>
        <ul class="space-y-3">
          ${contactos
            .slice(0, 4)
            .map(
              (c) => `
            <li class="flex items-center gap-3">
              <img src="${c.avatar}" alt="${c.nombre}" class="w-10 h-10 rounded-full object-cover ring-2 ring-white elevation-1" />
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-slate-900 truncate">${c.nombre}</p>
                <p class="text-xs text-slate-500 truncate">${c.cargo}</p>
              </div>
              <a href="mailto:${c.email}" class="text-slate-400 hover:text-brand-700 icon-sm" aria-label="Enviar email">${icon('mail')}</a>
            </li>`
            )
            .join('')}
        </ul>
      </article>
    </section>
  `

  return layout(content)
}
