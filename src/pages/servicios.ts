export function serviciosPage() {
  return `
    <div class="layout-shell">
      <header class="topbar">
        <a class="brand" href="/" data-link>Intranet Alcoi</a>
        <nav class="nav">
          <a href="/" data-link>Inicio</a>
          <a href="/servicios" data-link>Servicios</a>
          <a href="/sedes" data-link>Sedes</a>
          <a href="/contacto" data-link>Directorio</a>
        </nav>
      </header>

      <main class="page">
        <section class="page-card">
          <p class="eyebrow">Pagina interna</p>
          <h1>Servicios</h1>
          <p class="lead">
            Esta ruta demuestra cómo separar cada pantalla en su propio archivo.
          </p>
        </section>

        <section class="grid">
          <article class="info-card">
            <h2>Ejemplo</h2>
            <p>Podrias usar esta pagina para listar herramientas internas, accesos o modulos.</p>
          </article>

          <article class="info-card">
            <h2>Siguiente paso</h2>
            <p>Crea otra vista en <code>src/pages</code> y anadela al objeto <code>routes</code>.</p>
          </article>
        </section>
      </main>
    </div>
  `
}
