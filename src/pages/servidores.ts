export function servidoresPage() {
  // Datos de ejemplo que simularían venir de una API
  const servidores = [
    {
      id: 1,
      hostname: "SRV-WEB-ALC01",
      ip: "192.168.1.10",
      sistemaOperativo: "Ubuntu Server 22.04 LTS",
      rol: "Web Server",
      sede: "Alcoy",
      estado: "correcto",
      servicios: ["Apache2", "MySQL", "PHP 8.1"],
      uptime: "15 días, 8 horas",
      ultimaRevision: "2026-04-10 09:30:00",
      cpu: 25,
      memoria: 60,
      disco: 45
    },
    {
      id: 2,
      hostname: "SRV-DB-BCN01",
      ip: "192.168.2.20",
      sistemaOperativo: "CentOS 8",
      rol: "Database Server",
      sede: "Alcoy",
      estado: "correcto",
      servicios: ["PostgreSQL", "Redis", "MongoDB"],
      uptime: "22 días, 14 horas",
      ultimaRevision: "2026-04-12 14:15:00",
      cpu: 35,
      memoria: 75,
      disco: 30
    },
    {
      id: 3,
      hostname: "SRV-APP-VIG01",
      ip: "192.168.3.15",
      sistemaOperativo: "Windows Server 2022",
      rol: "Application Server",
      sede: "Alcoy",
      estado: "aviso",
      servicios: ["IIS", "SQL Server", ".NET Runtime"],
      uptime: "8 días, 6 horas",
      ultimaRevision: "2026-04-11 16:45:00",
      cpu: 80,
      memoria: 85,
      disco: 70
    },
    {
      id: 4,
      hostname: "SRV-BACKUP-MAD01",
      ip: "192.168.4.25",
      sistemaOperativo: "Debian 11",
      rol: "Backup Server",
      sede: "Alcoy",
      estado: "correcto",
      servicios: ["Bacula", "NFS", "SSH"],
      uptime: "30 días, 12 horas",
      ultimaRevision: "2026-04-09 08:00:00",
      cpu: 15,
      memoria: 40,
      disco: 85
    },
    {
      id: 5,
      hostname: "SRV-MAIL-ALC02",
      ip: "192.168.1.50",
      sistemaOperativo: "Ubuntu Server 20.04 LTS",
      rol: "Mail Server",
      sede: "Alcoy",
      estado: "critico",
      servicios: ["Postfix", "Dovecot"],
      uptime: "2 días, 4 horas",
      ultimaRevision: "2026-04-13 07:20:00",
      cpu: 95,
      memoria: 90,
      disco: 95
    },
    {
      id: 6,
      hostname: "SRV-MONITORING-BCN02",
      ip: "192.168.2.30",
      sistemaOperativo: "CentOS 9",
      rol: "Monitoring Server",
      sede: "Alcoy",
      estado: "mantenimiento",
      servicios: ["Nagios", "Grafana", "Prometheus"],
      uptime: "45 días, 18 horas",
      ultimaRevision: "2026-04-08 10:30:00",
      cpu: 20,
      memoria: 55,
      disco: 25
    },
    {
      id: 7,
      hostname: "SRV-FILE-VIG02",
      ip: "192.168.3.40",
      sistemaOperativo: "FreeBSD 13",
      rol: "File Server",
      sede: "Alcoy",
      estado: "correcto",
      servicios: ["Samba", "NFS", "FTP"],
      uptime: "18 días, 22 horas",
      ultimaRevision: "2026-04-10 12:00:00",
      cpu: 10,
      memoria: 30,
      disco: 60
    },
    {
      id: 8,
      hostname: "SRV-PROXY-MAD02",
      ip: "192.168.4.35",
      sistemaOperativo: "Ubuntu Server 22.04 LTS",
      rol: "Proxy Server",
      sede: "Alcoy",
      estado: "aviso",
      servicios: ["Squid", "HAProxy", "Fail2Ban"],
      uptime: "12 días, 3 horas",
      ultimaRevision: "2026-04-12 11:45:00",
      cpu: 70,
      memoria: 80,
      disco: 40
    }
  ]

  // Función para obtener el color del estado
  function getEstadoColor(estado: string) {
    switch (estado) {
      case 'correcto': return '#4caf50'
      case 'aviso': return '#ff9800'
      case 'critico': return '#f44336'
      case 'mantenimiento': return '#2196f3'
      default: return '#9e9e9e'
    }
  }

  // Función para obtener el icono del estado
  function getEstadoIcon(estado: string) {
    switch (estado) {
      case 'correcto': return '✅'
      case 'aviso': return '⚠️'
      case 'critico': return '❌'
      case 'mantenimiento': return '🔧'
      default: return '❓'
    }
  }

  // Función para formatear la fecha
  function formatFecha(fecha: string) {
    const date = new Date(fecha)
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return `
    <div class="layout-shell">
      <header class="topbar">
        <a class="brand" href="/" data-link>Intranet Alcoi</a>
        <nav class="nav">
          <a href="/" data-link>Inicio</a>
          <a href="/servicios" data-link>Servicios</a>
          <a href="/sedes" data-link>Sedes</a>
          <a href="/contacto" data-link>Directorio</a>
          <a href="/servidores" data-link>Servidores</a>
        </nav>
      </header>

      <main class="page">
        <section class="page-card">
          <p class="eyebrow">Monitorización de Sistemas</p>
          <h1>Estado de Servidores</h1>
          <p class="lead">
            Dashboard en tiempo real del estado de todos los servidores y máquinas del instituto.
            Monitorea el rendimiento, servicios y disponibilidad de la infraestructura tecnológica.
          </p>

          <!-- Estadísticas generales -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">${servidores.length}</div>
              <div class="stat-label">Servidores Totales</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${servidores.filter(s => s.estado === 'correcto').length}</div>
              <div class="stat-label">Operativos</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${servidores.filter(s => s.estado === 'aviso').length}</div>
              <div class="stat-label">Con Avisos</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${servidores.filter(s => s.estado === 'critico').length}</div>
              <div class="stat-label">Críticos</div>
            </div>
          </div>

          <!-- Controles de filtrado -->
          <div class="filters-section">
            <div class="filter-group">
              <label for="searchServer">Buscar servidor:</label>
              <input type="text" id="searchServer" placeholder="Hostname, IP o rol..." />
            </div>
            <div class="filter-group">
              <label for="filterSede">Filtrar por sede:</label>
              <select id="filterSede">
                <option value="">Todas las sedes</option>
                <option value="Alcoy">Alcoy</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Vigo">Vigo</option>
                <option value="Madrid">Madrid</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="filterEstado">Filtrar por estado:</label>
              <select id="filterEstado">
                <option value="">Todos los estados</option>
                <option value="correcto">✅ Correcto</option>
                <option value="aviso">⚠️ Aviso</option>
                <option value="critico">❌ Crítico</option>
                <option value="mantenimiento">🔧 Mantenimiento</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="sortBy">Ordenar por:</label>
              <select id="sortBy">
                <option value="hostname">Hostname</option>
                <option value="sede">Sede</option>
                <option value="estado">Estado</option>
                <option value="uptime">Uptime</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Lista de servidores -->
        <section class="servers-grid" id="serversGrid">
          ${servidores.map(servidor => `
            <article class="server-card" data-server-id="${servidor.id}" data-estado="${servidor.estado}" data-sede="${servidor.sede}">
              <div class="server-header">
                <div class="server-status" style="background-color: ${getEstadoColor(servidor.estado)}">
                  ${getEstadoIcon(servidor.estado)}
                </div>
                <div class="server-info">
                  <h3 class="server-hostname">${servidor.hostname}</h3>
                  <p class="server-role">${servidor.rol}</p>
                </div>
              </div>

              <div class="server-details">
                <div class="server-detail">
                  <strong>🌐 IP:</strong> ${servidor.ip}
                </div>
                <div class="server-detail">
                  <strong>🖥️ SO:</strong> ${servidor.sistemaOperativo}
                </div>
                <div class="server-detail">
                  <strong>🏢 Sede:</strong> ${servidor.sede}
                </div>
                <div class="server-detail">
                  <strong>⏱️ Uptime:</strong> ${servidor.uptime}
                </div>
                <div class="server-detail">
                  <strong>🔄 Última revisión:</strong> ${formatFecha(servidor.ultimaRevision)}
                </div>
              </div>

              <div class="server-services">
                <strong>🔧 Servicios:</strong>
                <div class="services-list">
                  ${servidor.servicios.map(servicio => `<span class="service-tag">${servicio}</span>`).join('')}
                </div>
              </div>

              <div class="server-metrics">
                <div class="metric">
                  <div class="metric-label">CPU</div>
                  <div class="metric-bar">
                    <div class="metric-fill cpu-fill" style="width: ${servidor.cpu}%"></div>
                  </div>
                  <div class="metric-value">${servidor.cpu}%</div>
                </div>
                <div class="metric">
                  <div class="metric-label">RAM</div>
                  <div class="metric-bar">
                    <div class="metric-fill mem-fill" style="width: ${servidor.memoria}%"></div>
                  </div>
                  <div class="metric-value">${servidor.memoria}%</div>
                </div>
                <div class="metric">
                  <div class="metric-label">Disco</div>
                  <div class="metric-bar">
                    <div class="metric-fill disk-fill" style="width: ${servidor.disco}%"></div>
                  </div>
                  <div class="metric-value">${servidor.disco}%</div>
                </div>
              </div>

              <div class="server-actions">
                <button class="server-btn" onclick="alert('Funcionalidad próximamente: Ver detalles de ${servidor.hostname}')">
                  📊 Detalles
                </button>
                <button class="server-btn" onclick="alert('Funcionalidad próximamente: Reiniciar ${servidor.hostname}')">
                  🔄 Reiniciar
                </button>
                <button class="server-btn" onclick="alert('Funcionalidad próximamente: Acceder por SSH a ${servidor.hostname}')">
                  🔐 SSH
                </button>
              </div>
            </article>
          `).join('')}
        </section>

        <!-- Información del sistema -->
        <section class="info-section">
          <div class="info-card">
            <h3>📊 Información del Sistema de Monitorización</h3>
            <ul>
              <li><strong>Actualización:</strong> Los datos se refrescan cada 5 minutos desde la base de datos central</li>
              <li><strong>Alertas:</strong> Notificaciones automáticas por email y Telegram para estados críticos</li>
              <li><strong>Histórico:</strong> 30 días de datos almacenados para análisis de tendencias</li>
              <li><strong>API:</strong> Endpoint REST disponible en /api/servidores/status</li>
            </ul>
          </div>

          <div class="info-card">
            <h3>🎯 Estados del Sistema</h3>
            <div class="status-legend">
              <div class="status-item">
                <span class="status-icon" style="color: #4caf50">✅</span>
                <span><strong>Correcto:</strong> Todo operativo, métricas normales</span>
              </div>
              <div class="status-item">
                <span class="status-icon" style="color: #ff9800">⚠️</span>
                <span><strong>Aviso:</strong> Requiere atención, métricas elevadas</span>
              </div>
              <div class="status-item">
                <span class="status-icon" style="color: #f44336">❌</span>
                <span><strong>Crítico:</strong> Problema grave, requiere acción inmediata</span>
              </div>
              <div class="status-item">
                <span class="status-icon" style="color: #2196f3">🔧</span>
                <span><strong>Mantenimiento:</strong> Fuera de servicio por tareas de mantenimiento</span>
              </div>
            </div>
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

      .filters-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 30px;
        padding: 20px;
        background: var(--code-bg);
        border-radius: 8px;
        border: 1px solid var(--border);
      }

      .filter-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .filter-group label {
        font-weight: 600;
        color: var(--text-h);
        font-size: 14px;
      }

      .filter-group input,
      .filter-group select {
        padding: 8px 12px;
        border: 1px solid var(--border);
        border-radius: 4px;
        font-family: var(--sans);
        font-size: 14px;
      }

      .servers-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 25px;
        margin-bottom: 40px;
      }

      .server-card {
        background: var(--code-bg);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 20px;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .server-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow);
      }

      .server-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
      }

      .server-status {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        font-size: 18px;
      }

      .server-info h3 {
        margin: 0 0 5px 0;
        color: var(--text-h);
        font-size: 18px;
      }

      .server-role {
        margin: 0;
        color: var(--accent);
        font-weight: 600;
        font-size: 14px;
      }

      .server-details {
        margin-bottom: 15px;
      }

      .server-detail {
        margin-bottom: 8px;
        font-size: 14px;
        line-height: 1.4;
      }

      .server-detail strong {
        color: var(--text-h);
        margin-right: 8px;
        display: inline-block;
        min-width: 140px;
      }

      .server-services {
        margin-bottom: 15px;
      }

      .server-services strong {
        color: var(--text-h);
        display: block;
        margin-bottom: 8px;
      }

      .services-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .service-tag {
        background: var(--accent-bg);
        color: var(--accent);
        padding: 3px 8px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 600;
      }

      .server-metrics {
        display: flex;
        gap: 15px;
        margin-bottom: 15px;
      }

      .metric {
        flex: 1;
        text-align: center;
      }

      .metric-label {
        font-size: 12px;
        color: var(--text);
        margin-bottom: 5px;
        font-weight: 600;
      }

      .metric-bar {
        height: 8px;
        background: var(--border);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 3px;
      }

      .metric-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.3s;
      }

      .cpu-fill { background: #4caf50; }
      .mem-fill { background: #2196f3; }
      .disk-fill { background: #ff9800; }

      .metric-value {
        font-size: 11px;
        color: var(--text-h);
        font-weight: 600;
      }

      .server-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .server-btn {
        padding: 6px 12px;
        border: 1px solid var(--accent);
        background: var(--accent);
        color: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        transition: background-color 0.2s;
        flex: 1;
        min-width: 80px;
      }

      .server-btn:hover {
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

      .status-legend {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .status-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
      }

      .status-icon {
        font-size: 16px;
      }

      @media (max-width: 768px) {
        .servers-grid {
          grid-template-columns: 1fr;
        }

        .filters-section {
          grid-template-columns: 1fr;
        }

        .server-metrics {
          flex-direction: column;
          gap: 10px;
        }

        .server-actions {
          flex-direction: column;
        }

        .server-btn {
          width: 100%;
        }
      }
    </style>

    <script>
      // Funcionalidad de filtrado y búsqueda (se ejecutará cuando se cargue la página)
      setTimeout(() => {
        const searchInput = document.getElementById('searchServer');
        const filterSede = document.getElementById('filterSede');
        const filterEstado = document.getElementById('filterEstado');
        const sortBy = document.getElementById('sortBy');
        const serverCards = document.querySelectorAll('.server-card');

        function filterServers() {
          const searchTerm = searchInput?.value.toLowerCase() || '';
          const sedeFilter = filterSede?.value || '';
          const estadoFilter = filterEstado?.value || '';

          serverCards.forEach(card => {
            const hostname = card.querySelector('.server-hostname').textContent.toLowerCase();
            const role = card.querySelector('.server-role').textContent.toLowerCase();
            const ip = card.textContent.toLowerCase();
            const sede = card.dataset.sede;
            const estado = card.dataset.estado;

            const matchesSearch = hostname.includes(searchTerm) ||
                                role.includes(searchTerm) ||
                                ip.includes(searchTerm);
            const matchesSede = !sedeFilter || sede === sedeFilter;
            const matchesEstado = !estadoFilter || estado === estadoFilter;

            card.style.display = (matchesSearch && matchesSede && matchesEstado) ? 'block' : 'none';
          });
        }

        function sortServers() {
          const sortValue = sortBy?.value || 'hostname';
          const grid = document.getElementById('serversGrid');
          const cards = Array.from(serverCards);

          cards.sort((a, b) => {
            let aValue, bValue;

            switch (sortValue) {
              case 'sede':
                aValue = a.dataset.sede;
                bValue = b.dataset.sede;
                break;
              case 'estado':
                const estadoOrder = { 'critico': 0, 'aviso': 1, 'mantenimiento': 2, 'correcto': 3 };
                aValue = estadoOrder[a.dataset.estado];
                bValue = estadoOrder[b.dataset.estado];
                break;
              case 'uptime':
                // Para simplificar, ordenamos por el número de días
                aValue = parseInt(a.textContent.match(/(\d+)\s+días/)?.[1] || '0');
                bValue = parseInt(b.textContent.match(/(\d+)\s+días/)?.[1] || '0');
                break;
              default: // hostname
                aValue = a.querySelector('.server-hostname').textContent;
                bValue = b.querySelector('.server-hostname').textContent;
            }

            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
          });

          cards.forEach(card => grid.appendChild(card));
        }

        // Event listeners
        searchInput?.addEventListener('input', filterServers);
        filterSede?.addEventListener('change', filterServers);
        filterEstado?.addEventListener('change', () => {
          filterServers();
          sortServers();
        });
        sortBy?.addEventListener('change', sortServers);

        // Inicializar ordenación
        sortServers();
      }, 100);
    </script>
  `
}