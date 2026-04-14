import { layout, pageHeader } from '../components/layout'
import { icon } from '../components/icons'
import { contactos } from '../lib/data'

export function contactoPage(): string {
  const content = `
    ${pageHeader({
      eyebrow: 'Directorio',
      icon: 'users',
      title: 'Equipo ASIX 1º · Desarrollo Web',
      description:
        'Contacta con tus compañeros de proyecto. La información se mantiene actualizada durante el ciclo formativo.',
      actions: `
        <button class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold">
          ${icon('download')} Exportar
        </button>
        <button class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-700 text-sm font-semibold elevation-1">
          ${icon('user-plus')} Añadir contacto
        </button>
      `,
    })}

    <!-- Search bar -->
    <div class="mb-6 bg-white rounded-2xl border border-slate-200 elevation-1 p-4">
      <label for="searchContacts" class="sr-only">Buscar contactos</label>
      <div class="relative">
        <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 icon-sm">${icon('search')}</span>
        <input
          type="text"
          id="searchContacts"
          placeholder="Buscar por nombre, cargo o departamento…"
          class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-400 text-sm outline-none transition-colors"
        />
      </div>
    </div>

    <!-- Contact grid -->
    <section id="contactsGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      ${contactos
        .map(
          (c) => `
        <article class="contact-card group bg-white rounded-2xl border border-slate-200 elevation-1 hover:elevation-2 hover:-translate-y-0.5 transition-all overflow-hidden"
                 data-contact-id="${c.id}">
          <div class="h-20 bg-gradient-to-r from-brand-600 to-brand-400"></div>
          <div class="px-5 pb-5 -mt-10">
            <img src="${c.avatar}" alt="${c.nombre}" class="w-20 h-20 rounded-2xl object-cover ring-4 ring-white elevation-2" />
            <div class="mt-3">
              <h3 class="contact-name text-base font-semibold text-slate-900">${c.nombre}</h3>
              <p class="contact-position text-sm font-medium text-brand-700">${c.cargo}</p>
              <span class="contact-department mt-2 inline-block chip-soft">${c.departamento}</span>
            </div>

            <dl class="mt-4 space-y-2 text-sm">
              <div class="flex items-start gap-2 text-slate-600">
                <span class="text-slate-400 mt-0.5">${icon('mail')}</span>
                <a href="mailto:${c.email}" class="hover:text-brand-700 truncate">${c.email}</a>
              </div>
              <div class="flex items-start gap-2 text-slate-600">
                <span class="text-slate-400 mt-0.5">${icon('phone')}</span>
                <span>${c.telefono} <span class="text-slate-400">· ext. ${c.extension}</span></span>
              </div>
              <div class="flex items-start gap-2 text-slate-600">
                <span class="text-slate-400 mt-0.5">${icon('map-pin')}</span>
                <span>${c.ubicacion}</span>
              </div>
            </dl>

            <div class="mt-5 flex gap-2">
              <a href="tel:${c.telefono}" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-700 text-sm font-semibold">
                ${icon('phone')} Llamar
              </a>
              <a href="mailto:${c.email}" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold">
                ${icon('message-square')} Mensaje
              </a>
            </div>
          </div>
        </article>`
        )
        .join('')}
    </section>

    <!-- Info section -->
    <section class="mt-10 grid lg:grid-cols-2 gap-5">
      <article class="bg-white rounded-2xl border border-slate-200 elevation-1 p-6">
        <div class="flex items-center gap-3 mb-3">
          <span class="grid place-items-center w-10 h-10 rounded-xl bg-brand-50 text-brand-700 icon-lg">${icon('info')}</span>
          <h3 class="text-base font-semibold text-slate-900">Información del directorio</h3>
        </div>
        <ul class="space-y-2 text-sm text-slate-600">
          <li class="flex gap-2"><span class="text-brand-600">${icon('check')}</span> <span><b class="text-slate-800">Proyecto:</b> Intranet Institut d'Alcoi · Práctica ASIX 1º</span></li>
          <li class="flex gap-2"><span class="text-brand-600">${icon('check')}</span> <span><b class="text-slate-800">Grupo:</b> Desarrollo Web · 5 estudiantes</span></li>
          <li class="flex gap-2"><span class="text-brand-600">${icon('check')}</span> <span><b class="text-slate-800">Actualización:</b> Datos mantenidos durante el proyecto</span></li>
          <li class="flex gap-2"><span class="text-brand-600">${icon('check')}</span> <span><b class="text-slate-800">Soporte:</b> Contacta con el profesor para modificaciones</span></li>
        </ul>
      </article>

      <article class="bg-white rounded-2xl border border-slate-200 elevation-1 p-6">
        <div class="flex items-center gap-3 mb-3">
          <span class="grid place-items-center w-10 h-10 rounded-xl bg-red-50 text-red-700 icon-lg">${icon('phone-call')}</span>
          <h3 class="text-base font-semibold text-slate-900">Contactos de emergencia</h3>
        </div>
        <ul class="divide-y divide-slate-100 text-sm">
          ${[
            { ic: 'siren',           tone: 'text-red-600',   label: 'Emergencias',     value: '112' },
            { ic: 'stethoscope',     tone: 'text-emerald-600', label: 'Médico escolar',  value: '+34 965 123 000' },
            { ic: 'shield',          tone: 'text-brand-600', label: 'Dirección',        value: '+34 965 123 001' },
            { ic: 'book-open',       tone: 'text-sky-600',   label: 'Consellería',      value: '+34 965 123 002' },
          ]
            .map(
              (e) => `
            <li class="flex items-center gap-3 py-2.5">
              <span class="${e.tone}">${icon(e.ic)}</span>
              <span class="text-slate-700 flex-1">${e.label}</span>
              <span class="font-semibold text-slate-900">${e.value}</span>
            </li>`
            )
            .join('')}
        </ul>
      </article>
    </section>
  `

  return layout(content)
}

export function wireContactoPage() {
  const input = document.getElementById('searchContacts') as HTMLInputElement | null
  if (!input) return
  const cards = document.querySelectorAll<HTMLElement>('.contact-card')

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim()
    cards.forEach((card) => {
      const name = card.querySelector('.contact-name')?.textContent?.toLowerCase() ?? ''
      const pos = card.querySelector('.contact-position')?.textContent?.toLowerCase() ?? ''
      const dept = card.querySelector('.contact-department')?.textContent?.toLowerCase() ?? ''
      const match = !q || name.includes(q) || pos.includes(q) || dept.includes(q)
      card.style.display = match ? '' : 'none'
    })
  })
}
