export function notFoundPage() {
  return `
    <div class="layout-shell">
      <header class="topbar">
        <a class="brand" href="/" data-link>Intranet Alcoi</a>
        <nav class="nav">
          <a href="/" data-link>Inicio</a>
          <a href="/servicios" data-link>Servicios</a>
          <a href="/contacto" data-link>Contacto</a>
        </nav>
      </header>

      <main class="page">
        <section class="page-card page-card-center">
          <p class="eyebrow">Error 404</p>
          <h1>Ruta no encontrada</h1>
          <p class="lead">La URL existe en el navegador, pero no esta registrada en el router.</p>
          <div class="actions">
            <a class="button" href="/" data-link>Volver al inicio</a>
          </div>
        </section>
      </main>
    </div>
  `
}
