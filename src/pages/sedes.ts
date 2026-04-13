export function sedesPage() {
  // Información de las sedes
  const sedes = [
    {
      id: 1,
      nombre: "Institut d'Alcoi",
      ciudad: "Alcoy",
      direccion: "C/ Sant Nicolau, 1, 03801 Alcoy, Alicante",
      telefono: "+34 965 123 456",
      email: "info@institut-alcoi.com",
      descripcion: "Sede principal del proyecto. Centro educativo de referencia en la comarca de l'Alcoià.",
      estudiantes: 5,
      especialidades: ["ASIX", "DAM", "DAW", "SMX"],
      imagen: "🏫",
      coordenadas: "38.6983°N, 0.4739°W"
    },
    {
      id: 2,
      nombre: "Institut de Barcelona",
      ciudad: "Barcelona",
      direccion: "Carrer de la Diputació, 100, 08015 Barcelona",
      telefono: "+34 934 567 890",
      email: "barcelona@institut-alcoi.com",
      descripcion: "Sede en el corazón de Barcelona. Conexión directa con el tejido empresarial catalán.",
      estudiantes: 6,
      especialidades: ["ASIX", "DAM", "DAW", "SMX", "Telecomunicaciones"],
      imagen: "🏙️",
      coordenadas: "41.3851°N, 2.1734°E"
    },
    {
      id: 3,
      nombre: "Institut de Vigo",
      ciudad: "Vigo",
      direccion: "Rúa do Príncipe, 22, 36202 Vigo, Pontevedra",
      telefono: "+34 986 123 789",
      email: "vigo@institut-alcoi.com",
      descripcion: "Sede gallega especializada en tecnologías del mar y energías renovables.",
      estudiantes: 5,
      especialidades: ["ASIX", "DAM", "DAW", "SMX", "Electrónica"],
      imagen: "⚓",
      coordenadas: "42.2406°N, 8.7207°W"
    },
    {
      id: 4,
      nombre: "Institut de Madrid",
      ciudad: "Madrid",
      direccion: "Calle de la Princesa, 5, 28008 Madrid",
      telefono: "+34 915 678 123",
      email: "madrid@institut-alcoi.com",
      descripcion: "Sede central en Madrid. Centro de innovación tecnológica con conexiones internacionales.",
      estudiantes: 4,
      especialidades: ["ASIX", "DAM", "DAW", "SMX", "Inteligencia Artificial", "Ciberseguridad"],
      imagen: "🏛️",
      coordenadas: "40.4168°N, 3.7038°W"
    }
  ]

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
          <p class="eyebrow">Nuestras Instalaciones</p>
          <h1>Sedes del Proyecto ASIX 1º</h1>
          <p class="lead">
            Proyecto de práctica ASIX 1º - Desarrollo Web. Conoce las sedes virtuales de nuestro equipo distribuido por toda España.
          </p>

          <!-- Estadísticas generales -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">${sedes.reduce((total, sede) => total + sede.estudiantes, 0)}</div>
              <div class="stat-label">Estudiantes Totales</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${sedes.length}</div>
              <div class="stat-label">Sedes Activas</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${new Set(sedes.flatMap(sede => sede.especialidades)).size}</div>
              <div class="stat-label">Especialidades</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">4</div>
              <div class="stat-label">Comunidades Autónomas</div>
            </div>
          </div>
        </section>

        <!-- Lista de sedes -->
        <section class="sedes-grid">
          ${sedes.map(sede => `
            <article class="sede-card">
              <div class="sede-header">
                <div class="sede-icon">${sede.imagen}</div>
                <div class="sede-info">
                  <h3 class="sede-name">${sede.nombre}</h3>
                  <p class="sede-city">${sede.ciudad}</p>
                </div>
              </div>

              <div class="sede-details">
                <div class="sede-detail">
                  <strong>📍 Dirección:</strong>
                  <span>${sede.direccion}</span>
                </div>
                <div class="sede-detail">
                  <strong>📞 Teléfono:</strong>
                  <a href="tel:${sede.telefono}" class="sede-link">${sede.telefono}</a>
                </div>
                <div class="sede-detail">
                  <strong>📧 Email:</strong>
                  <a href="mailto:${sede.email}" class="sede-link">${sede.email}</a>
                </div>
                <div class="sede-detail">
                  <strong>👥 Estudiantes:</strong>
                  <span>${sede.estudiantes.toLocaleString()}</span>
                </div>
                <div class="sede-detail">
                  <strong>📚 Especialidades:</strong>
                  <span>${sede.especialidades.join(", ")}</span>
                </div>
                <div class="sede-detail">
                  <strong>🗺️ Coordenadas:</strong>
                  <span>${sede.coordenadas}</span>
                </div>
              </div>

              <div class="sede-description">
                <p>${sede.descripcion}</p>
              </div>

              <div class="sede-actions">
                <button class="sede-btn" onclick="alert('Funcionalidad próximamente: Ver mapa de ${sede.ciudad}')">
                  🗺️ Ver en Mapa
                </button>
                <button class="sede-btn" onclick="alert('Funcionalidad próximamente: Contactar con ${sede.nombre}')">
                  📞 Contactar
                </button>
                <button class="sede-btn" onclick="alert('Funcionalidad próximamente: Ver galería de ${sede.ciudad}')">
                  📸 Galería
                </button>
              </div>
            </article>
          `).join('')}
        </section>

        <!-- Información adicional -->
        <section class="info-section">
          <div class="info-card">
            <h3>🌍 Equipo Distribuido</h3>
            <p>Proyecto colaborativo de estudiantes ASIX 1º de Desarrollo Web distribuidos en diferentes comunidades autónomas:</p>
            <ul>
              <li><strong>Alcoy:</strong> Equipo base del proyecto (5 estudiantes)</li>
              <li><strong>Barcelona:</strong> Desarrollo frontend avanzado (6 estudiantes)</li>
              <li><strong>Vigo:</strong> Especialización en backend (5 estudiantes)</li>
              <li><strong>Madrid:</strong> Coordinación e innovación (4 estudiantes)</li>
            </ul>
          </div>

          <div class="info-card">
            <h3>🎓 Proyecto ASIX 1º</h3>
            <p>Desarrollo de una intranet corporativa como proyecto final del ciclo formativo ASIX 1º:</p>
            <div class="specialties-list">
              <span class="specialty-tag">TypeScript</span>
              <span class="specialty-tag">Vite</span>
              <span class="specialty-tag">SPA Router</span>
              <span class="specialty-tag">CSS Grid/Flexbox</span>
              <span class="specialty-tag">API Integration</span>
              <span class="specialty-tag">Responsive Design</span>
            </div>
          </div>
        </section>

        <!-- Mapa conceptual -->
        <section class="map-section">
          <h2>📍 Ubicación de Sedes</h2>
          <div class="map-placeholder">
            <div class="map-point" style="top: 70%; left: 20%;">🏫 Alcoy</div>
            <div class="map-point" style="top: 30%; left: 15%;">🏙️ Barcelona</div>
            <div class="map-point" style="top: 20%; left: 5%;">⚓ Vigo</div>
            <div class="map-point" style="top: 50%; left: 25%;">🏛️ Madrid</div>
          </div>
        </section>
      </main>
    </div>

    <style>
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;
        margin-top: 30px;
        margin-bottom: 20px;
      }

      .stat-card {
        background: var(--code-bg);
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        border: 1px solid var(--border);
      }

      .stat-number {
        font-size: 32px;
        font-weight: 700;
        color: var(--accent);
        margin-bottom: 5px;
      }

      .stat-label {
        color: var(--text);
        font-size: 14px;
        font-weight: 600;
      }

      .sedes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 30px;
        margin-bottom: 40px;
      }

      .sede-card {
        background: var(--code-bg);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 25px;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .sede-card:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow);
      }

      .sede-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }

      .sede-icon {
        font-size: 48px;
        margin-right: 20px;
      }

      .sede-info h3 {
        margin: 0 0 5px 0;
        color: var(--text-h);
        font-size: 20px;
      }

      .sede-city {
        margin: 0;
        color: var(--accent);
        font-weight: 600;
        font-size: 16px;
      }

      .sede-details {
        margin-bottom: 20px;
      }

      .sede-detail {
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 1.4;
      }

      .sede-detail strong {
        color: var(--text-h);
        margin-right: 8px;
        display: inline-block;
        min-width: 120px;
      }

      .sede-link {
        color: var(--accent);
        text-decoration: none;
      }

      .sede-link:hover {
        text-decoration: underline;
      }

      .sede-description {
        background: rgba(170, 59, 255, 0.05);
        padding: 15px;
        border-radius: 6px;
        margin-bottom: 20px;
        border-left: 3px solid var(--accent);
      }

      .sede-description p {
        margin: 0;
        color: var(--text);
        font-size: 14px;
        line-height: 1.5;
      }

      .sede-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }

      .sede-btn {
        padding: 10px 16px;
        border: 1px solid var(--accent);
        background: var(--accent);
        color: white;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: background-color 0.2s;
        flex: 1;
        min-width: 120px;
      }

      .sede-btn:hover {
        background: var(--accent-border);
      }

      .info-section {
        margin-top: 40px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }

      .info-card {
        background: var(--code-bg);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 25px;
      }

      .info-card h3 {
        margin: 0 0 15px 0;
        color: var(--text-h);
        font-size: 18px;
      }

      .info-card p {
        margin: 0 0 15px 0;
        color: var(--text);
        line-height: 1.6;
      }

      .info-card ul {
        margin: 0;
        padding-left: 20px;
      }

      .info-card li {
        margin-bottom: 8px;
        color: var(--text);
      }

      .specialties-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .specialty-tag {
        background: var(--accent-bg);
        color: var(--accent);
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }

      .map-section {
        background: var(--code-bg);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 30px;
        text-align: center;
        margin-bottom: 40px;
      }

      .map-section h2 {
        margin: 0 0 20px 0;
        color: var(--text-h);
      }

      .map-placeholder {
        background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
        border: 2px dashed var(--border);
        border-radius: 8px;
        height: 300px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text);
        font-size: 16px;
      }

      .map-point {
        position: absolute;
        background: var(--accent);
        color: white;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        box-shadow: var(--shadow);
      }

      @media (max-width: 768px) {
        .sedes-grid {
          grid-template-columns: 1fr;
        }

        .info-section {
          grid-template-columns: 1fr;
        }

        .sede-actions {
          flex-direction: column;
        }

        .sede-btn {
          width: 100%;
        }

        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    </style>
  `
}