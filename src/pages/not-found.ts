import { layout } from '../components/layout'
import { icon } from '../components/icons'

export function notFoundPage(): string {
  const content = `
    <section class="max-w-2xl mx-auto text-center py-16">
      <div class="inline-grid place-items-center w-20 h-20 rounded-2xl bg-brand-50 text-brand-700 icon-xl elevation-1 mb-6">
        ${icon('compass')}
      </div>
      <p class="text-xs uppercase tracking-widest text-brand-700 font-semibold">Error 404</p>
      <h1 class="mt-2 text-4xl font-bold tracking-tight text-slate-900">Página no encontrada</h1>
      <p class="mt-4 text-slate-600 leading-relaxed">
        La URL existe en tu navegador, pero no hay ninguna ruta registrada para esta dirección.
        Prueba a volver al inicio o utiliza la navegación superior.
      </p>
      <div class="mt-8 flex items-center justify-center gap-3">
        <a href="/" data-link class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700 elevation-1">
          ${icon('home')} Volver al inicio
        </a>
        <a href="/servicios" data-link class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50">
          ${icon('layout-grid')} Ver servicios
        </a>
      </div>
    </section>
  `
  return layout(content)
}
