import { layout, pageHeader } from '../components/layout'
import { icon } from '../components/icons'
import { servicios } from '../lib/data'

const toneMap: Record<string, string> = {
  brand:   'bg-brand-50 text-brand-700',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  info:    'bg-sky-50 text-sky-700',
  error:   'bg-red-50 text-red-700',
}

export function serviciosPage(): string {
  const categorias = Array.from(new Set(servicios.map((s) => s.categoria)))

  const content = `
    ${pageHeader({
      eyebrow: 'Catálogo',
      icon: 'layout-grid',
      title: 'Servicios internos',
      description:
        'Herramientas, plataformas y accesos disponibles para los miembros del instituto. Filtra por categoría para localizar lo que necesitas.',
      actions: `
        <button class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold">
          ${icon('filter')} Filtros
        </button>
        <button class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-700 text-sm font-semibold elevation-1">
          ${icon('plus')} Solicitar acceso
        </button>
      `,
    })}

    <div class="flex flex-wrap items-center gap-2 mb-6" role="tablist" aria-label="Categorías">
      <button class="px-3 py-1.5 rounded-full bg-brand-600 text-white text-sm font-semibold">Todos</button>
      ${categorias
        .map(
          (c) => `
        <button class="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium">
          ${c}
        </button>`
        )
        .join('')}
    </div>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      ${servicios
        .map(
          (s) => `
        <article class="group bg-white rounded-2xl border border-slate-200 elevation-1 hover:elevation-2 hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col">
          <div class="p-5 flex-1">
            <div class="flex items-start justify-between gap-3">
              <div class="grid place-items-center w-12 h-12 rounded-xl ${toneMap[s.tone]} icon-lg">
                ${icon(s.icono)}
              </div>
              <span class="chip-soft">${s.categoria}</span>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
              ${s.nombre}
            </h3>
            <p class="mt-1.5 text-sm text-slate-500 leading-relaxed">${s.descripcion}</p>
          </div>
          <div class="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <span class="inline-flex items-center gap-1.5 text-xs text-slate-500">
              ${icon('shield-check')} Autenticación SSO
            </span>
            <a href="${s.url}" ${s.url.startsWith('/') ? 'data-link' : ''} class="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800">
              Abrir ${icon('arrow-up-right')}
            </a>
          </div>
        </article>`
        )
        .join('')}
    </section>

    <section class="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
      <div class="flex items-start gap-3">
        <span class="grid place-items-center w-11 h-11 rounded-xl bg-white text-brand-700 icon-lg elevation-1">${icon('lightbulb')}</span>
        <div>
          <h3 class="text-base font-semibold text-slate-900">¿Echas de menos algún servicio?</h3>
          <p class="text-sm text-slate-600 mt-0.5">Propón una nueva herramienta y el equipo de IT la evaluará.</p>
        </div>
      </div>
      <a href="mailto:it@institut-alcoi.com" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700">
        ${icon('send')} Enviar propuesta
      </a>
    </section>
  `

  return layout(content)
}
