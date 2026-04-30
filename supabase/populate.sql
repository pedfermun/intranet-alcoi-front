-- =============================================================
-- Intranet Alcoi — POPULATE (datos de ejemplo)
-- =============================================================
-- Ejecutar DESPUÉS de `seed.sql`.
-- Incluye:
--   * 5 usuarios en auth.users con metadatos (name/role/avatar/tone)
--     que la VIEW public.users exponará al frontend.
--     Contraseña de todos: "1234batoi"
--   * Contactos, sedes, servidores, servicios y tasks de ejemplo.
-- =============================================================

-- Limpieza previa (idempotente)
TRUNCATE public.tasks, public.servidores, public.sedes, public.contactos, public.servicios RESTART IDENTITY CASCADE;
DELETE FROM auth.users WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555'
);

-- =============================================================
-- 1. USUARIOS (auth.users con metadatos)
-- =============================================================
INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data, is_super_admin,
    confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES
(
    '00000000-0000-0000-0000-000000000000',
    '11111111-1111-1111-1111-111111111111',
    'authenticated', 'authenticated',
    'pedro@institut-alcoi.com',
    crypt('1234batoi', gen_salt('bf')),
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
        'name',   'Pedro Fernández',
        'role',   'Técnico',
        'avatar', '/pedro.jpeg',
        'tone',   'brand'
    ),
    false, '', '', '', ''
),
(
    '00000000-0000-0000-0000-000000000000',
    '22222222-2222-2222-2222-222222222222',
    'authenticated', 'authenticated',
    'diego@institut-alcoi.com',
    crypt('1234batoi', gen_salt('bf')),
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
        'name',   'Diego Perez',
        'role',   'Administrador de Sistemas',
        'avatar', '/diego.jpeg',
        'tone',   'warning'
    ),
    false, '', '', '', ''
),
(
    '00000000-0000-0000-0000-000000000000',
    '33333333-3333-3333-3333-333333333333',
    'authenticated', 'authenticated',
    'aitor@institut-alcoi.com',
    crypt('1234batoi', gen_salt('bf')),
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
        'name',   'Aitor Brotons',
        'role',   'Desarrollador Frontend',
        'avatar', '/aitor.jpeg',
        'tone',   'success'
    ),
    false, '', '', '', ''
),
(
    '00000000-0000-0000-0000-000000000000',
    '44444444-4444-4444-4444-444444444444',
    'authenticated', 'authenticated',
    'victor@institut-alcoi.com',
    crypt('1234batoi', gen_salt('bf')),
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
        'name',   'Victor Tamajon',
        'role',   'Comercial',
        'avatar', '/victor.jpeg',
        'tone',   'success'
    ),
    false, '', '', '', ''
),
(
    '00000000-0000-0000-0000-000000000000',
    '55555555-5555-5555-5555-555555555555',
    'authenticated', 'authenticated',
    'pablo@institut-alcoi.com',
    crypt('1234batoi', gen_salt('bf')),
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
        'name',   'Pablo Vaño',
        'role',   'Director de Marketing',
        'avatar', '/pablo.jpeg',
        'tone',   'success'
    ),
    false, '', '', '', ''
);

-- =============================================================
-- 2. CONTACTOS
-- =============================================================
INSERT INTO public.contactos (nombre, cargo, departamento, email, telefono, extension, ubicacion, avatar) VALUES
('Pedro Fernández', 'Técnico en higiene de urinarios', 'ASIX 1º - Desarrollo Web', 'pedro.fernandez@institut-alcoi.com', '+34 965 123 456', '101', 'Aula de Informática - Planta 2', '/pedro.png'),
('Diego Pérez',     'Administrador de Sistemas',      'ASIX 1º - Desarrollo Web', 'diego.perez@institut-alcoi.com',     '+34 965 123 457', '102', 'Aula de Informática - Planta 2', '/diego.png'),
('Aitor Brotons',   'Desarrollador Frontend',         'ASIX 1º - Desarrollo Web', 'aitor.brotons@institut-alcoi.com',   '+34 965 123 458', '103', 'Aula de Informática - Planta 2', '/aitor.png'),
('Victor Tamajón',  'Comercial',                      'ASIX 1º - Desarrollo Web', 'victor.tamajon@institut-alcoi.com',  '+34 965 123 459', '104', 'Aula de Informática - Planta 2', '/victor.png'),
('Pablo Vaño',      'Director de Marketing',          'ASIX 1º - Desarrollo Web', 'pablo.vano@institut-alcoi.com',      '+34 965 123 460', '105', 'Aula de Informática - Planta 2', '/pablo.png');

-- =============================================================
-- 3. SEDES
-- =============================================================
INSERT INTO public.sedes (nombre, ciudad, direccion, telefono, email, descripcion, estudiantes, especialidades, image, coordenadas) VALUES
('Institut d''Alcoi',     'Alcoy',     'C/ Sant Nicolau, 1, 03801 Alcoy, Alicante',    '+34 965 123 456', 'info@institut-alcoi.com',      'Sede principal del proyecto. Centro educativo de referencia en la comarca de l''Alcoià.',   5, ARRAY['ASIX','DAM','DAW','SMX'],                                            '/alcoi.jpg', '38.6983°N, 0.4739°W'),
('Institut de Barcelona', 'Barcelona', 'Carrer de la Diputació, 100, 08015 Barcelona', '+34 934 567 890', 'barcelona@institut-alcoi.com', 'Sede en el corazón de Barcelona. Conexión directa con el tejido empresarial catalán.',      6, ARRAY['ASIX','DAM','DAW','SMX','Telecomunicaciones'],                      '/barcelona.avif', '41.3851°N, 2.1734°E'),
('Institut de Vigo',      'Vigo',      'Rúa do Príncipe, 22, 36202 Vigo, Pontevedra',  '+34 986 123 789', 'vigo@institut-alcoi.com',      'Sede gallega especializada en tecnologías del mar y energías renovables.',                  5, ARRAY['ASIX','DAM','DAW','SMX','Electrónica'],                              '/vigo.webp', '42.2406°N, 8.7207°W'),
('Institut de Madrid',    'Madrid',    'Calle de la Princesa, 5, 28008 Madrid',        '+34 915 678 123', 'madrid@institut-alcoi.com',    'Sede central en Madrid. Centro de innovación tecnológica con conexiones internacionales.',  4, ARRAY['ASIX','DAM','DAW','SMX','Inteligencia Artificial','Ciberseguridad'], '/madrid.avif', '40.4168°N, 3.7038°W');

-- =============================================================
-- 4. SERVIDORES
-- =============================================================
INSERT INTO public.servidores (hostname, ip, sistema_operativo, rol, sede, estado, servicios, uptime, ultima_revision, cpu, memoria, disco) VALUES
('SRV-DC-01',    '192.168.88.211', 'Windows Server 2022',     'Domain Controller',  'Alcoy', 'correcto', ARRAY['Active Directory','DNS','DHCP'],       '42 días, 6 horas',  '2026-04-28 09:00:00+00', 18, 45, 32),
('SRV-DAD-01',   '192.168.88.212', 'Windows Server 2022',     'Database Server',    'Alcoy', 'correcto', ARRAY['SQL Server','SSRS','SSAS'],             '38 días, 11 horas', '2026-04-27 14:30:00+00', 30, 62, 55),
('SRV-DC-02',    '192.168.88.221', 'Windows Server 2022',     'Domain Controller',  'Alcoy', 'correcto', ARRAY['Active Directory','DNS','DFSR'],        '40 días, 3 horas',  '2026-04-28 08:45:00+00', 12, 38, 28),
('SRV-MONIT-01', '192.168.88.222', 'Debian 13', 'Monitoring Server',  'Alcoy', 'correcto', ARRAY['Zabbix','Grafana','Prometheus'],        '35 días, 19 horas', '2026-04-28 10:15:00+00', 22, 50, 20),
('SRV-APP-01',   '192.168.88.223', 'Debian 13', 'Application Server', 'Alcoy', 'correcto', ARRAY['Nginx','Node.js','PM2'],                '29 días, 7 horas',  '2026-04-27 16:00:00+00', 40, 68, 47),
('SRV-NAS01',    '192.168.88.231', 'TrueNAS SCALE',           'File Server',        'Alcoy', 'correcto', ARRAY['SMB','NFS','iSCSI'],                    '55 días, 2 horas',  '2026-04-26 11:00:00+00',  8, 25, 72),
('SRV-WEB-DMZ',  '192.168.88.232', 'Debian 13', 'Web Server (DMZ)',   'Alcoy', 'correcto', ARRAY['Apache2','Certbot','ModSecurity'],      '21 días, 14 horas', '2026-04-28 07:30:00+00', 15, 35, 30);

-- =============================================================
-- 5. SERVICIOS
-- =============================================================
INSERT INTO public.servicios (nombre, descripcion, icono, url, categoria, tone) VALUES
('Correo Corporativo', 'Acceso al buzón institucional y calendario compartido.',    'mail',           '#',           'Comunicación',  'brand'),
('Gestor Documental',  'Repositorio centralizado de actas, plantillas y normativa.','folder-open',    '#',           'Documentación', 'info'),
('Aula Virtual',       'Plataforma Moodle para cursos, tareas y evaluaciones.',     'graduation-cap', '#',           'Formación',     'success'),
('Mesa de Ayuda',      'Sistema de tickets para incidencias informáticas.',         'life-buoy',      '#',           'Soporte',       'warning'),
('Reserva de Salas',   'Calendario de aulas, laboratorios y espacios comunes.',     'calendar-check', '#',           'Recursos',      'brand'),
('Nóminas & RRHH',     'Consulta de recibos, vacaciones y expediente laboral.',     'briefcase',      '#',           'Personal',      'info'),
('Panel de Sistemas',  'Estado en tiempo real de servidores e infraestructura.',    'activity',       '/servidores', 'IT',            'error'),
('Biblioteca Digital', 'Catálogo de recursos, libros y revistas técnicas.',         'book-open',      '#',           'Formación',     'success');

-- =============================================================
-- 6. TASKS
-- =============================================================
INSERT INTO public.tasks (id, title, "column", assigned_to, creator_id, created_at) VALUES
('t-1',  'Revisar bug en dashboard de sedes',           'backlog', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '2026-04-14T09:00:00Z'),
('t-2',  'Checklist de cumplimiento LOPD',              'backlog', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', '2026-04-14T10:00:00Z'),
('t-3',  '[SPIKE] Migrar backups a Azure',              'backlog', '33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', '2026-04-15T08:30:00Z'),
('t-4',  'Documentar servicio de notificaciones',       'backlog', '33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', '2026-04-15T11:15:00Z'),
('t-5',  'Investigar BBDD para nuevo microservicio',    'todo',    '33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', '2026-04-16T09:20:00Z'),
('t-6',  'Postmortem de caída del servidor de correo',  'todo',    '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', '2026-04-16T14:00:00Z'),
('t-7',  'Sync con producto sobre roadmap Q3',          'todo',    '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', '2026-04-17T08:45:00Z'),
('t-8',  'Refactorizar contextos a Zustand',            'doing',   '33333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', '2026-04-17T12:00:00Z'),
('t-9',  'Añadir logging al CRON diario',               'doing',   '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '2026-04-18T07:30:00Z'),
('t-10', 'Dashboards DD para listener Lambda',          'done',    '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', '2026-04-13T10:00:00Z'),
('t-11', 'Diseño del panel de estado',                  'done',    '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', '2026-04-12T16:20:00Z');
