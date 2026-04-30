import { layout } from '../components/layout'
import { icon } from '../components/icons'

export function notFoundPage(): string {
  const content = `
    <section class="relative max-w-2xl mx-auto text-center py-16">
      <div class="absolute top-8 left-1/2 w-64 h-64 bg-gradient-to-br from-brand-100/30 to-violet-100/20 rounded-full -translate-x-1/2"></div>
      <div class="relative">
        <div class="inline-grid place-items-center w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 text-white icon-xl elevation-2 ring-4 ring-brand-100 mb-6">
          ${icon('compass')}
        </div>
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/70 text-red-700 text-xs font-semibold uppercase tracking-widest">
          ${icon('alert-circle')} Error 404
        </span>
        <h1 class="mt-4 text-4xl font-bold tracking-tight text-slate-900">Página no encontrada</h1>
        <p class="mt-4 text-slate-500 leading-relaxed max-w-md mx-auto">
          La URL existe en tu navegador, pero no hay ninguna ruta registrada para esta dirección.
          Prueba a volver al inicio o utiliza la navegación superior.
        </p>
        <div class="mt-8 flex items-center justify-center gap-3">
          <a href="/" data-link class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-brand-600 to-violet-600 text-white font-semibold hover:from-brand-700 hover:to-violet-700 elevation-1 cursor-pointer transition-all">
            ${icon('home')} Volver al inicio
          </a>
          <a href="/sedes" data-link class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer transition-colors">
            ${icon('map-pin')} Ver sedes
          </a>
        </div>
      </div>
    </section>
  `
  return layout(content)
}
