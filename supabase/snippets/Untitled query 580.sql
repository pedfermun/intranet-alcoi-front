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