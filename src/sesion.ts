import './style.css'

export function loadDashboard(username: string) {
  const appElement = document.querySelector<HTMLDivElement>('#app')
  if (!appElement) return

  appElement.innerHTML = `
    <div style="min-height: 100vh; background: var(--bg);">
      <!-- Header -->
      <header style="background: linear-gradient(135deg, var(--accent), var(--accent-border)); padding: 20px 40px; color: white; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="margin: 0; font-size: 28px;">Intranet Alcoi</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Bienvenido, ${username}</p>
        </div>
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.1); padding: 10px 15px; border-radius: 4px;">
            <span style="font-size: 20px;">👤</span>
            <span style="font-weight: 600;">${username}</span>
          </div>
          <button id="logoutBtn" style="padding: 10px 20px; background: rgba(255,255,255,0.2); border: 1px solid white; color: white; border-radius: 4px; cursor: pointer; font-weight: 600;">Cerrar Sesión</button>
        </div>
      </header>

      <!-- Navigation -->
      <nav class="nav">
        <a href="/" data-link>Inicio</a>
        <a href="/sedes" data-link>Sedes</a>
        <a href="/servidores" data-link>Servidores</a>
      </nav>

      <!-- Main Content -->
      <main style="max-width: 1200px; margin: 40px auto; padding: 0 20px;">
        
        <!-- Bienvenida -->
        <section style="background: var(--code-bg); padding: 30px; border-radius: 8px; margin-bottom: 40px; border-left: 4px solid var(--accent);">
          <h2 style="margin: 0 0 15px 0; color: var(--text-h);">¡Bienvenido a tu Intranet!</h2>
          <p style="margin: 0; color: var(--text); line-height: 1.6;">
            Accede a los recursos, información y herramientas de tu empresa desde aquí. 
            Tu panel personalizado te permite mantenerte conectado con los últimos eventos, noticias y anuncios importantes.
          </p>
        </section>

        <!-- Accesos Rápidos -->
        <section style="margin-bottom: 40px;">
          <h2 style="color: var(--text-h); margin-bottom: 20px;">Accesos Rápidos</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
            <div style="background: var(--code-bg); padding: 20px; border-radius: 8px; cursor: pointer; transition: transform 0.2s; border: 1px solid var(--border);" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="font-size: 28px; margin-bottom: 10px;">📧</div>
              <h3 style="margin: 0 0 5px 0; color: var(--text-h); font-size: 16px;">Correo</h3>
              <p style="margin: 0; color: var(--text); font-size: 14px;">Accede a tu correo empresarial</p>
            </div>

            <div style="background: var(--code-bg); padding: 20px; border-radius: 8px; cursor: pointer; transition: transform 0.2s; border: 1px solid var(--border);" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="font-size: 28px; margin-bottom: 10px;">📋</div>
              <h3 style="margin: 0 0 5px 0; color: var(--text-h); font-size: 16px;">Documentos</h3>
              <p style="margin: 0; color: var(--text); font-size: 14px;">Repositorio de archivos compartidos</p>
            </div>

            <div style="background: var(--code-bg); padding: 20px; border-radius: 8px; cursor: pointer; transition: transform 0.2s; border: 1px solid var(--border);" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="font-size: 28px; margin-bottom: 10px;">📅</div>
              <h3 style="margin: 0 0 5px 0; color: var(--text-h); font-size: 16px;">Calendario</h3>
              <p style="margin: 0; color: var(--text); font-size: 14px;">Eventos y reuniones programadas</p>
            </div>
          </div>
        </section>

        <!-- Últimas Noticias -->
        <section style="margin-bottom: 40px;">
          <h2 style="color: var(--text-h); margin-bottom: 20px;">Últimas Noticias</h2>
          <div style="display: flex; flex-direction: column; gap: 15px;">
            <article style="background: var(--code-bg); padding: 20px; border-radius: 8px; border-left: 4px solid var(--accent);">
              <h3 style="margin: 0 0 8px 0; color: var(--text-h); font-size: 16px;">Nuevas funcionalidades en Intranet</h3>
              <p style="margin: 0 0 10px 0; color: var(--text); font-size: 14px;">Se han añadido nuevas herramientas de colaboración y comunicación.</p>
              <span style="color: var(--accent); font-size: 12px; font-weight: 600;">Hace 2 días</span>
            </article>

            <article style="background: var(--code-bg); padding: 20px; border-radius: 8px; border-left: 4px solid var(--accent);">
              <h3 style="margin: 0 0 8px 0; color: var(--text-h); font-size: 16px;">Mantenimiento previsto</h3>
              <p style="margin: 0 0 10px 0; color: var(--text); font-size: 14px;">El próximo viernes habrá mantenimiento de sistemas de 22:00 a 23:30.</p>
              <span style="color: var(--accent); font-size: 12px; font-weight: 600;">Hace 1 semana</span>
            </article>

            <article style="background: var(--code-bg); padding: 20px; border-radius: 8px; border-left: 4px solid var(--accent);">
              <h3 style="margin: 0 0 8px 0; color: var(--text-h); font-size: 16px;">Actualización de políticas</h3>
              <p style="margin: 0 0 10px 0; color: var(--text); font-size: 14px;">Lee las nuevas políticas de seguridad y privacidad de datos.</p>
              <span style="color: var(--accent); font-size: 12px; font-weight: 600;">Hace 2 semanas</span>
            </article>
          </div>
        </section>

        <!-- Estadísticas -->
        <section style="background: var(--code-bg); padding: 30px; border-radius: 8px; margin-bottom: 40px;">
          <h2 style="color: var(--text-h); margin-bottom: 20px;">Tu Actividad</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
            <div style="text-align: center;">
              <div style="font-size: 32px; color: var(--accent); font-weight: 700; margin-bottom: 5px;">24</div>
              <p style="margin: 0; color: var(--text); font-size: 14px;">Mensajes nuevos</p>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 32px; color: var(--accent); font-weight: 700; margin-bottom: 5px;">8</div>
              <p style="margin: 0; color: var(--text); font-size: 14px;">Tareas pendientes</p>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 32px; color: var(--accent); font-weight: 700; margin-bottom: 5px;">156</div>
              <p style="margin: 0; color: var(--text); font-size: 14px;">Documentos recientes</p>
            </div>
          </div>
        </section>

      </main>

      <!-- Footer -->
      <footer style="background: var(--code-bg); padding: 20px; text-align: center; color: var(--text); border-top: 1px solid var(--border); margin-top: 40px;">
        <p style="margin: 0; font-size: 14px;">© 2026 Intranet Alcoi. Todos los derechos reservados.</p>
      </footer>
    </div>
  `

  // Evento para cerrar sesión
  document.querySelector<HTMLButtonElement>('#logoutBtn')?.addEventListener('click', () => {
    window.location.reload()
  })
}
