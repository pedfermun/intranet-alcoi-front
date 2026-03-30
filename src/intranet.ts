import './style.css'
import { loadDashboard } from './sesion.ts'

// Inicializar la aplicación de intranet
export function initIntranet() {
  const appElement = document.querySelector<HTMLDivElement>('#app')
  if (!appElement) return

  // Crear el HTML del login
  appElement.innerHTML = `
    <div id="login-container" style="max-width: 600px; margin: 30px auto; padding: 40px; border: 1px solid var(--border); border-radius: 8px; box-shadow: var(--shadow);">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; color: var(--text-h);">Intranet Alcoi</h1>
        <p style="color: var(--text); margin: 10px 0 0 0;">Bienvenido</p>
      </div>

      <div style="background-color: var(--accent-bg); border-left: 4px solid var(--accent); padding: 15px; margin-bottom: 30px; border-radius: 4px;">
        <h3 style="margin: 0 0 10px 0; color: var(--text-h);">Información Importante</h3>
        <p style="margin: 10px 0; color: var(--text); font-size: 14px; line-height: 1.6;">
          Para acceder al portal Intranet Alcoi, debe autenticarse mediante el Gestor de Identidades (GDI). 
          Este sistema verifica su identidad y le permite acceder a un entorno personalizado con contenidos y funcionalidades adaptadas.
        </p>
        <p style="margin: 10px 0; color: var(--text); font-size: 14px; line-height: 1.6;">
          GDI le proporciona una identidad única corporativa sin necesidad de recordar diferentes usuarios y contraseñas. 
          Una vez autenticado, podrá acceder a otras aplicaciones y servicios sin necesidad de volver a introducir sus credenciales 
          (Single Sign On - SSO). Esto mejora significativamente la seguridad y facilita el acceso a la información corporativa.
        </p>
        <p style="margin: 10px 0; color: var(--text); font-size: 14px; line-height: 1.6;">
          <strong>Si es la primera vez que accede:</strong> Defina su identidad en el siguiente paso. 
          Se le pedirá que establezca un identificador de usuario, contraseña y un procedimiento de verificación para casos de olvido.
        </p>
      </div>

      <form id="loginForm" style="display: flex; flex-direction: column; gap: 15px;">
        <div>
          <label for="username" style="display: block; margin-bottom: 5px; color: var(--text-h); font-weight: 600;">
            Usuario
          </label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            required
            placeholder="Ingresa tu usuario"
            style="width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 4px; font-family: var(--sans); font-size: 16px; box-sizing: border-box;"
          />
        </div>

        <div>
          <label for="password" style="display: block; margin-bottom: 5px; color: var(--text-h); font-weight: 600;">
            Contraseña
          </label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required
            placeholder="Ingresa tu contraseña"
            style="width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 4px; font-family: var(--sans); font-size: 16px; box-sizing: border-box;"
          />
        </div>

        <button 
          type="submit"
          style="padding: 12px; background-color: var(--accent); color: white; border: none; border-radius: 4px; font-size: 16px; font-weight: 600; cursor: pointer; transition: opacity 0.2s;"
          onmouseover="this.style.opacity='0.9'"
          onmouseout="this.style.opacity='1'"
        >
          Iniciar Sesión
        </button>
      </form>

      <div id="message" style="margin-top: 15px; text-align: center;"></div>
    </div>
  `

  // Manejar el formulario
  const loginForm = document.querySelector<HTMLFormElement>('#loginForm')
  const messageDiv = document.querySelector<HTMLDivElement>('#message')

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault()

    const username = (document.querySelector<HTMLInputElement>('#username'))?.value
    const password = (document.querySelector<HTMLInputElement>('#password'))?.value

    // Validación básica
    if (!username || !username.trim()) {
      showMessage('Por favor ingresa tu usuario', 'error')
      return
    }

    if (!password || password.length < 4) {
      showMessage('La contraseña debe tener al menos 4 caracteres', 'error')
      return
    }

    // Simulación de login (reemplazar con API real después)
    console.log('Login attempt:', { username, password })
    showMessage('✓ Iniciando sesión...', 'success')

    // Aquí iría la lógica de autenticación con un backend
    setTimeout(() => {
      // Cargar el dashboard
      loadDashboard(username!)
    }, 1000)
  })

  function showMessage(text: string, type: 'success' | 'error') {
    if (!messageDiv) return

    messageDiv.textContent = text
    messageDiv.style.color = type === 'success' ? 'var(--accent)' : '#d32f2f'
    messageDiv.style.padding = '10px'
    messageDiv.style.borderRadius = '4px'
    messageDiv.style.backgroundColor = type === 'success' ? 'var(--accent-bg)' : 'rgba(211, 47, 47, 0.1)'
  }
}
