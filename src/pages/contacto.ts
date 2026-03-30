export function contactoPage() {
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
        <section class="page-card">
          <p class="eyebrow">Pagina interna</p>
          <h1>Contacto</h1>
          <p class="lead">
            Tambien puedes usar una ruta para formularios, soporte o datos del equipo.
          </p>
        </section>

        <section class="grid">
          <article class="info-card">
            <h2>Email</h2>
            <p><a href="mailto:soporte@intranet.local">soporte@intranet.local</a></p>
          </article>

          <article class="info-card">
            <h2>Telefono</h2>
            <p>+34 000 000 000</p>
          </article>
        </section>
      </main>
    </div>
  `
}
