export type Contact = {
  id: number
  nombre: string
  cargo: string
  departamento: string
  email: string
  telefono: string
  extension: string
  ubicacion: string
  avatar: string
}

export const contactos: Contact[] = [
  {
    id: 1, nombre: 'Aitor Brotons', cargo: 'Desarrollador Frontend',
    departamento: 'ASIX 1º - Desarrollo Web',
    email: 'aitor.brotons@institut-alcoi.com', telefono: '+34 965 123 456',
    extension: '101', ubicacion: 'Aula de Informática - Planta 2',
    avatar: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: 2, nombre: 'Pablo Vañó', cargo: 'Desarrollador Backend',
    departamento: 'ASIX 1º - Desarrollo Web',
    email: 'pablo.vano@institut-alcoi.com', telefono: '+34 965 123 457',
    extension: '102', ubicacion: 'Aula de Informática - Planta 2',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: 3, nombre: 'Victor Tamajón', cargo: 'Diseñador UX/UI',
    departamento: 'ASIX 1º - Desarrollo Web',
    email: 'victor.tamajon@institut-alcoi.com', telefono: '+34 965 123 458',
    extension: '103', ubicacion: 'Aula de Informática - Planta 2',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: 4, nombre: 'Diego Pérez', cargo: 'Administrador de Sistemas',
    departamento: 'ASIX 1º - Desarrollo Web',
    email: 'diego.perez@institut-alcoi.com', telefono: '+34 965 123 459',
    extension: '104', ubicacion: 'Aula de Informática - Planta 2',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: 5, nombre: 'Pedro Fernández', cargo: 'Analista de Datos',
    departamento: 'ASIX 1º - Desarrollo Web',
    email: 'pablo.fernandez@institut-alcoi.com', telefono: '+34 965 123 460',
    extension: '105', ubicacion: 'Aula de Informática - Planta 2',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&h=200&q=80',
  },
]

export type Sede = {
  id: number
  nombre: string
  ciudad: string
  direccion: string
  telefono: string
  email: string
  descripcion: string
  estudiantes: number
  especialidades: string[]
  image: string
  coordenadas: string
}

export const sedes: Sede[] = [
  {
    id: 1, nombre: "Institut d'Alcoi", ciudad: 'Alcoy',
    direccion: 'C/ Sant Nicolau, 1, 03801 Alcoy, Alicante',
    telefono: '+34 965 123 456', email: 'info@institut-alcoi.com',
    descripcion: 'Sede principal del proyecto. Centro educativo de referencia en la comarca de l\'Alcoià.',
    estudiantes: 5, especialidades: ['ASIX', 'DAM', 'DAW', 'SMX'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    coordenadas: '38.6983°N, 0.4739°W',
  },
  {
    id: 2, nombre: 'Institut de Barcelona', ciudad: 'Barcelona',
    direccion: 'Carrer de la Diputació, 100, 08015 Barcelona',
    telefono: '+34 934 567 890', email: 'barcelona@institut-alcoi.com',
    descripcion: 'Sede en el corazón de Barcelona. Conexión directa con el tejido empresarial catalán.',
    estudiantes: 6, especialidades: ['ASIX', 'DAM', 'DAW', 'SMX', 'Telecomunicaciones'],
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80',
    coordenadas: '41.3851°N, 2.1734°E',
  },
  {
    id: 3, nombre: 'Institut de Vigo', ciudad: 'Vigo',
    direccion: 'Rúa do Príncipe, 22, 36202 Vigo, Pontevedra',
    telefono: '+34 986 123 789', email: 'vigo@institut-alcoi.com',
    descripcion: 'Sede gallega especializada en tecnologías del mar y energías renovables.',
    estudiantes: 5, especialidades: ['ASIX', 'DAM', 'DAW', 'SMX', 'Electrónica'],
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80',
    coordenadas: '42.2406°N, 8.7207°W',
  },
  {
    id: 4, nombre: 'Institut de Madrid', ciudad: 'Madrid',
    direccion: 'Calle de la Princesa, 5, 28008 Madrid',
    telefono: '+34 915 678 123', email: 'madrid@institut-alcoi.com',
    descripcion: 'Sede central en Madrid. Centro de innovación tecnológica con conexiones internacionales.',
    estudiantes: 4, especialidades: ['ASIX', 'DAM', 'DAW', 'SMX', 'Inteligencia Artificial', 'Ciberseguridad'],
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
    coordenadas: '40.4168°N, 3.7038°W',
  },
]

export type Estado = 'correcto' | 'aviso' | 'critico' | 'mantenimiento'

export type Servidor = {
  id: number
  hostname: string
  ip: string
  sistemaOperativo: string
  rol: string
  sede: string
  estado: Estado
  servicios: string[]
  uptime: string
  ultimaRevision: string
  cpu: number
  memoria: number
  disco: number
}

export const servidores: Servidor[] = [
  { id: 1, hostname: 'SRV-WEB-ALC01', ip: '192.168.1.10', sistemaOperativo: 'Ubuntu Server 22.04 LTS', rol: 'Web Server', sede: 'Alcoy', estado: 'correcto', servicios: ['Apache2', 'MySQL', 'PHP 8.1'], uptime: '15 días, 8 horas', ultimaRevision: '2026-04-10 09:30:00', cpu: 25, memoria: 60, disco: 45 },
  { id: 2, hostname: 'SRV-DB-BCN01', ip: '192.168.2.20', sistemaOperativo: 'CentOS 8', rol: 'Database Server', sede: 'Barcelona', estado: 'correcto', servicios: ['PostgreSQL', 'Redis', 'MongoDB'], uptime: '22 días, 14 horas', ultimaRevision: '2026-04-12 14:15:00', cpu: 35, memoria: 75, disco: 30 },
  { id: 3, hostname: 'SRV-APP-VIG01', ip: '192.168.3.15', sistemaOperativo: 'Windows Server 2022', rol: 'Application Server', sede: 'Vigo', estado: 'aviso', servicios: ['IIS', 'SQL Server', '.NET Runtime'], uptime: '8 días, 6 horas', ultimaRevision: '2026-04-11 16:45:00', cpu: 80, memoria: 85, disco: 70 },
  { id: 4, hostname: 'SRV-BACKUP-MAD01', ip: '192.168.4.25', sistemaOperativo: 'Debian 11', rol: 'Backup Server', sede: 'Madrid', estado: 'correcto', servicios: ['Bacula', 'NFS', 'SSH'], uptime: '30 días, 12 horas', ultimaRevision: '2026-04-09 08:00:00', cpu: 15, memoria: 40, disco: 85 },
  { id: 5, hostname: 'SRV-MAIL-ALC02', ip: '192.168.1.50', sistemaOperativo: 'Ubuntu Server 20.04 LTS', rol: 'Mail Server', sede: 'Alcoy', estado: 'critico', servicios: ['Postfix', 'Dovecot'], uptime: '2 días, 4 horas', ultimaRevision: '2026-04-13 07:20:00', cpu: 95, memoria: 90, disco: 95 },
  { id: 6, hostname: 'SRV-MONITORING-BCN02', ip: '192.168.2.30', sistemaOperativo: 'CentOS 9', rol: 'Monitoring Server', sede: 'Barcelona', estado: 'mantenimiento', servicios: ['Nagios', 'Grafana', 'Prometheus'], uptime: '45 días, 18 horas', ultimaRevision: '2026-04-08 10:30:00', cpu: 20, memoria: 55, disco: 25 },
  { id: 7, hostname: 'SRV-FILE-VIG02', ip: '192.168.3.40', sistemaOperativo: 'FreeBSD 13', rol: 'File Server', sede: 'Vigo', estado: 'correcto', servicios: ['Samba', 'NFS', 'FTP'], uptime: '18 días, 22 horas', ultimaRevision: '2026-04-10 12:00:00', cpu: 10, memoria: 30, disco: 60 },
  { id: 8, hostname: 'SRV-PROXY-MAD02', ip: '192.168.4.35', sistemaOperativo: 'Ubuntu Server 22.04 LTS', rol: 'Proxy Server', sede: 'Madrid', estado: 'aviso', servicios: ['Squid', 'HAProxy', 'Fail2Ban'], uptime: '12 días, 3 horas', ultimaRevision: '2026-04-12 11:45:00', cpu: 70, memoria: 80, disco: 40 },
]

export type Servicio = {
  id: number
  nombre: string
  descripcion: string
  icono: string
  url: string
  categoria: string
  tone: 'brand' | 'success' | 'warning' | 'info' | 'error'
}

export const servicios: Servicio[] = [
  { id: 1, nombre: 'Correo Corporativo', descripcion: 'Acceso al buzón institucional y calendario compartido.', icono: 'mail', url: '#', categoria: 'Comunicación', tone: 'brand' },
  { id: 2, nombre: 'Gestor Documental', descripcion: 'Repositorio centralizado de actas, plantillas y normativa.', icono: 'folder-open', url: '#', categoria: 'Documentación', tone: 'info' },
  { id: 3, nombre: 'Aula Virtual', descripcion: 'Plataforma Moodle para cursos, tareas y evaluaciones.', icono: 'graduation-cap', url: '#', categoria: 'Formación', tone: 'success' },
  { id: 4, nombre: 'Mesa de Ayuda', descripcion: 'Sistema de tickets para incidencias informáticas.', icono: 'life-buoy', url: '#', categoria: 'Soporte', tone: 'warning' },
  { id: 5, nombre: 'Reserva de Salas', descripcion: 'Calendario de aulas, laboratorios y espacios comunes.', icono: 'calendar-check', url: '#', categoria: 'Recursos', tone: 'brand' },
  { id: 6, nombre: 'Nóminas & RRHH', descripcion: 'Consulta de recibos, vacaciones y expediente laboral.', icono: 'briefcase', url: '#', categoria: 'Personal', tone: 'info' },
  { id: 7, nombre: 'Panel de Sistemas', descripcion: 'Estado en tiempo real de servidores e infraestructura.', icono: 'activity', url: '/servidores', categoria: 'IT', tone: 'error' },
  { id: 8, nombre: 'Biblioteca Digital', descripcion: 'Catálogo de recursos, libros y revistas técnicas.', icono: 'book-open', url: '#', categoria: 'Formación', tone: 'success' },
]
