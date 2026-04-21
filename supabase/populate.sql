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
('Institut d''Alcoi',     'Alcoy',     'C/ Sant Nicolau, 1, 03801 Alcoy, Alicante',    '+34 965 123 456', 'info@institut-alcoi.com',      'Sede principal del proyecto. Centro educativo de referencia en la comarca de l''Alcoià.',   5, ARRAY['ASIX','DAM','DAW','SMX'],                                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-c%2F1280x250%2F0d%2Fd9%2F90%2Ff1%2Falcoy.jpg&f=1&nofb=1&ipt=e16ee3ca01fdbd56cea79ec33d272d579abea70955b4ae2598a260697f642a7b', '38.6983°N, 0.4739°W'),
('Institut de Barcelona', 'Barcelona', 'Carrer de la Diputació, 100, 08015 Barcelona', '+34 934 567 890', 'barcelona@institut-alcoi.com', 'Sede en el corazón de Barcelona. Conexión directa con el tejido empresarial catalán.',      6, ARRAY['ASIX','DAM','DAW','SMX','Telecomunicaciones'],                      'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80', '41.3851°N, 2.1734°E'),
('Institut de Vigo',      'Vigo',      'Rúa do Príncipe, 22, 36202 Vigo, Pontevedra',  '+34 986 123 789', 'vigo@institut-alcoi.com',      'Sede gallega especializada en tecnologías del mar y energías renovables.',                  5, ARRAY['ASIX','DAM','DAW','SMX','Electrónica'],                              'https://imgs.search.brave.com/3tS3QMrsB8d5SPlxfUzrGerRqfwV7SmX6fTpJjFk1VY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aWdvLWhvcml6/b250ZS1wdWVydG8t/YXRhcmRlY2VyLWdh/bGljaWEtZXNwYW5h/Xzc5Mjk1LTEwMDk3/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDAmcT04MA', '42.2406°N, 8.7207°W'),
('Institut de Madrid',    'Madrid',    'Calle de la Princesa, 5, 28008 Madrid',        '+34 915 678 123', 'madrid@institut-alcoi.com',    'Sede central en Madrid. Centro de innovación tecnológica con conexiones internacionales.',  4, ARRAY['ASIX','DAM','DAW','SMX','Inteligencia Artificial','Ciberseguridad'], 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80', '40.4168°N, 3.7038°W');

-- =============================================================
-- 4. SERVIDORES
-- =============================================================
INSERT INTO public.servidores (hostname, ip, sistema_operativo, rol, sede, estado, servicios, uptime, ultima_revision, cpu, memoria, disco) VALUES
('SRV-WEB-ALC01',        '192.168.1.10', 'Ubuntu Server 22.04 LTS', 'Web Server',         'Alcoy',     'correcto',      ARRAY['Apache2','MySQL','PHP 8.1'],       '15 días, 8 horas',  '2026-04-10 09:30:00+00', 25, 60, 45),
('SRV-DB-BCN01',         '192.168.2.20', 'CentOS 8',                'Database Server',    'Barcelona', 'correcto',      ARRAY['PostgreSQL','Redis','MongoDB'],    '22 días, 14 horas', '2026-04-12 14:15:00+00', 35, 75, 30),
('SRV-APP-VIG01',        '192.168.3.15', 'Windows Server 2022',     'Application Server', 'Vigo',      'aviso',         ARRAY['IIS','SQL Server','.NET Runtime'], '8 días, 6 horas',   '2026-04-11 16:45:00+00', 80, 85, 70),
('SRV-BACKUP-MAD01',     '192.168.4.25', 'Debian 11',               'Backup Server',      'Madrid',    'correcto',      ARRAY['Bacula','NFS','SSH'],              '30 días, 12 horas', '2026-04-09 08:00:00+00', 15, 40, 85),
('SRV-MAIL-ALC02',       '192.168.1.50', 'Ubuntu Server 20.04 LTS', 'Mail Server',        'Alcoy',     'critico',       ARRAY['Postfix','Dovecot'],               '2 días, 4 horas',   '2026-04-13 07:20:00+00', 95, 90, 95),
('SRV-MONITORING-BCN02', '192.168.2.30', 'CentOS 9',                'Monitoring Server',  'Barcelona', 'mantenimiento', ARRAY['Nagios','Grafana','Prometheus'],   '45 días, 18 horas', '2026-04-08 10:30:00+00', 20, 55, 25),
('SRV-FILE-VIG02',       '192.168.3.40', 'FreeBSD 13',              'File Server',        'Vigo',      'correcto',      ARRAY['Samba','NFS','FTP'],               '18 días, 22 horas', '2026-04-10 12:00:00+00', 10, 30, 60),
('SRV-PROXY-MAD02',      '192.168.4.35', 'Ubuntu Server 22.04 LTS', 'Proxy Server',       'Madrid',    'aviso',         ARRAY['Squid','HAProxy','Fail2Ban'],      '12 días, 3 horas',  '2026-04-12 11:45:00+00', 70, 80, 40);

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
