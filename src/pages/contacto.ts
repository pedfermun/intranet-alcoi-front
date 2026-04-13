export function contactoPage() {
  // Datos de ejemplo que simularían venir de una API
  const contacts = [
    {
      id: 1,
      nombre: "Aitor Brotons",
      cargo: "Desarrollador Frontend",
      departamento: "ASIX 1º - Desarrollo Web",
      email: "aitor.brotons@institut-alcoi.com",
      telefono: "+34 965 123 456",
      extension: "101",
      ubicacion: "Aula de Informática - Planta 2",
      avatar: "👨‍💻"
    },
    {
      id: 2,
      nombre: "Pablo Vañó",
      cargo: "Desarrollador Backend",
      departamento: "ASIX 1º - Desarrollo Web",
      email: "pablo.vano@institut-alcoi.com",
      telefono: "+34 965 123 457",
      extension: "102",
      ubicacion: "Aula de Informática - Planta 2",
      avatar: "👨‍💻"
    },
    {
      id: 3,
      nombre: "Victor Tamajón",
      cargo: "Diseñador UX/UI",
      departamento: "ASIX 1º - Desarrollo Web",
      email: "victor.tamajon@institut-alcoi.com",
      telefono: "+34 965 123 458",
      extension: "103",
      ubicacion: "Aula de Informática - Planta 2",
      avatar: "👨‍🎨"
    },
    {
      id: 4,
      nombre: "Diego Pérez",
      cargo: "Administrador de Sistemas",
      departamento: "ASIX 1º - Desarrollo Web",
      email: "diego.perez@institut-alcoi.com",
      telefono: "+34 965 123 459",
      extension: "104",
      ubicacion: "Aula de Informática - Planta 2",
      avatar: "👨‍🔧"
    },
    {
      id: 5,
      nombre: "Pablo Fernández",
      cargo: "Analista de Datos",
      departamento: "ASIX 1º - Desarrollo Web",
      email: "pablo.fernandez@institut-alcoi.com",
      telefono: "+34 965 123 460",
      extension: "105",
      ubicacion: "Aula de Informática - Planta 2",
      avatar: "👨‍💼"
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
          <p class="eyebrow">Directorio del Instituto</p>
          <h1>Directorio de Estudiantes ASIX 1º</h1>
          <p class="lead">
            Contacta con tus compañeros del grupo de Desarrollo Web. 
            Mantén actualizada tu información para facilitar la comunicación del proyecto.
          </p>

          <!-- Buscador -->
          <div style="margin-top: 30px; margin-bottom: 20px;">
            <input
              type="text"
              id="searchContacts"
              placeholder="Buscar por nombre, cargo o departamento..."
              style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 16px; box-sizing: border-box;"
            />
          </div>
        </section>

        <!-- Lista de contactos -->
        <section class="grid" id="contactsGrid">
          ${contacts.map(contact => `
            <article class="contact-card" data-contact-id="${contact.id}">
              <div class="contact-header">
                <div class="contact-avatar">${contact.avatar}</div>
                <div class="contact-info">
                  <h3 class="contact-name">${contact.nombre}</h3>
                  <p class="contact-position">${contact.cargo}</p>
                  <span class="contact-department">${contact.departamento}</span>
                </div>
              </div>

              <div class="contact-details">
                <div class="contact-detail">
                  <strong>📧 Email:</strong>
                  <a href="mailto:${contact.email}" class="contact-link">${contact.email}</a>
                </div>
                <div class="contact-detail">
                  <strong>📞 Teléfono:</strong>
                  <span>${contact.telefono}</span>
                  <small>(Ext. ${contact.extension})</small>
                </div>
                <div class="contact-detail">
                  <strong>🏢 Ubicación:</strong>
                  <span>${contact.ubicacion}</span>
                </div>
              </div>

              <div class="contact-actions">
                <button class="contact-btn" onclick="alert('Funcionalidad próximamente: Llamar a ${contact.nombre}')">
                  📞 Llamar
                </button>
                <button class="contact-btn" onclick="alert('Funcionalidad próximamente: Enviar mensaje a ${contact.nombre}')">
                  💬 Mensaje
                </button>
              </div>
            </article>
          `).join('')}
        </section>

        <!-- Información adicional -->
        <section class="info-section">
          <div class="info-card">
            <h3>📋 Información del Directorio</h3>
            <ul>
              <li><strong>Proyecto:</strong> Intranet del Institut d'Alcoi - Práctica ASIX 1º</li>
              <li><strong>Grupo:</strong> Desarrollo Web - Equipo de 5 estudiantes</li>
              <li><strong>Actualización:</strong> Los datos se mantienen actualizados durante el proyecto</li>
              <li><strong>Soporte:</strong> Contacta con el profesor para actualizar información</li>
            </ul>
          </div>

          <div class="info-card">
            <h3>📞 Contactos de Emergencia</h3>
            <div class="emergency-contacts">
              <p><strong>🚨 Emergencias:</strong> 112</p>
              <p><strong>🏥 Médico escolar:</strong> +34 965 123 000</p>
              <p><strong>👨‍🏫 Dirección:</strong> +34 965 123 001</p>
              <p><strong>📚 Consellería:</strong> +34 965 123 002</p>
            </div>
          </div>
        </section>
      </main>
    </div>

    <style>
      .contact-card {
        background: var(--code-bg);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 20px;
        transition: transform 0.2s, box-shadow 0.2s;
        margin-bottom: 20px;
      }

      .contact-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow);
      }

      .contact-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
      }

      .contact-avatar {
        font-size: 40px;
        margin-right: 15px;
      }

      .contact-info h3 {
        margin: 0 0 5px 0;
        color: var(--text-h);
        font-size: 18px;
      }

      .contact-position {
        margin: 0 0 5px 0;
        color: var(--accent);
        font-weight: 600;
      }

      .contact-department {
        background: var(--accent-bg);
        color: var(--accent);
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }

      .contact-details {
        margin-bottom: 15px;
      }

      .contact-detail {
        margin-bottom: 8px;
        font-size: 14px;
      }

      .contact-detail strong {
        color: var(--text-h);
        margin-right: 8px;
      }

      .contact-link {
        color: var(--accent);
        text-decoration: none;
      }

      .contact-link:hover {
        text-decoration: underline;
      }

      .contact-actions {
        display: flex;
        gap: 10px;
      }

      .contact-btn {
        padding: 8px 16px;
        border: 1px solid var(--accent);
        background: var(--accent);
        color: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.2s;
      }

      .contact-btn:hover {
        background: var(--accent-border);
      }

      .info-section {
        margin-top: 40px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
      }

      .info-card {
        background: var(--code-bg);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 20px;
      }

      .info-card h3 {
        margin: 0 0 15px 0;
        color: var(--text-h);
      }

      .info-card ul {
        margin: 0;
        padding-left: 20px;
      }

      .info-card li {
        margin-bottom: 8px;
        color: var(--text);
      }

      .emergency-contacts p {
        margin: 8px 0;
        color: var(--text);
      }

      @media (max-width: 768px) {
        .contact-header {
          flex-direction: column;
          text-align: center;
        }

        .contact-avatar {
          margin-right: 0;
          margin-bottom: 10px;
        }

        .contact-actions {
          flex-direction: column;
        }

        .contact-btn {
          width: 100%;
        }
      }
    </style>

    <script>
      // Funcionalidad de búsqueda (se ejecutará cuando se cargue la página)
      setTimeout(() => {
        const searchInput = document.getElementById('searchContacts');
        const contactCards = document.querySelectorAll('.contact-card');

        if (searchInput) {
          searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            contactCards.forEach(card => {
              const name = card.querySelector('.contact-name').textContent.toLowerCase();
              const position = card.querySelector('.contact-position').textContent.toLowerCase();
              const department = card.querySelector('.contact-department').textContent.toLowerCase();

              const matches = name.includes(searchTerm) ||
                            position.includes(searchTerm) ||
                            department.includes(searchTerm);

              card.style.display = matches ? 'block' : 'none';
            });
          });
        }
      }, 100);
    </script>
  `
}
