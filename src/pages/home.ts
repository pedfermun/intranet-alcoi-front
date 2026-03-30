export function homePage() {
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
        <section class="hero-card">
          <p class="eyebrow">Router listo</p>
          <h1>Ya puedes crear pantallas dentro de <code>src/pages</code></h1>
          <p class="lead">
            Esta portada ya sale desde un router propio en TypeScript. Cada enlace
            cambia la URL y renderiza una vista distinta.
          </p>

          <div class="actions">
            <a class="button" href="/servicios" data-link>Ver servicios</a>
            <a class="button button-secondary" href="/contacto" data-link>Ir a contacto</a>
          </div>
        </section>

        <section class="grid">
          <article class="info-card">
            <h2>Dónde crear páginas</h2>
            <p>
              Añade nuevos archivos dentro de <code>src/pages</code> y luego registra
              la ruta en <code>src/router.ts</code>.
            </p>
          </article>

          <article class="info-card">
            <h2>Rutas de ejemplo</h2>
            <p>
              Ahora mismo tienes <code>/</code>, <code>/servicios</code> y
              <code>/contacto</code>, además de una vista 404.
            </p>
          </article>
        </section>
      </main>
    </div>
  `
}
