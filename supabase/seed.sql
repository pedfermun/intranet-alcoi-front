-- =============================================================
-- Intranet Alcoi — SCHEMA (estructura + RLS)
-- =============================================================
-- Este archivo SOLO crea la estructura. Para poblar datos,
-- ejecutar después `populate.sql`.
--
-- Decisiones:
--   * No existe tabla `public.users`: los usuarios son los de
--     `auth.users` y sus metadatos viven en `raw_user_meta_data`.
--     Se expone una VIEW `public.users` con los campos que usa
--     el frontend (id, name, role, avatar, tone).
--   * Tablas de lectura pública para `authenticated`:
--     contactos, sedes, servidores, servicios, users (view).
--   * `tasks` es la única tabla escribible desde el frontend.
-- =============================================================

-- --------------------------------------------------------------
-- 0. Limpieza (idempotente en dev)
-- --------------------------------------------------------------
DROP VIEW  IF EXISTS public.users       CASCADE;
DROP TABLE IF EXISTS public.tasks       CASCADE;
DROP TABLE IF EXISTS public.servidores  CASCADE;
DROP TABLE IF EXISTS public.sedes       CASCADE;
DROP TABLE IF EXISTS public.contactos   CASCADE;
DROP TABLE IF EXISTS public.servicios   CASCADE;

DROP TYPE IF EXISTS public.servidor_estado CASCADE;
DROP TYPE IF EXISTS public.task_column     CASCADE;
DROP TYPE IF EXISTS public.ui_tone         CASCADE;

-- --------------------------------------------------------------
-- 1. Extensiones
-- --------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- --------------------------------------------------------------
-- 2. Tipos ENUM
-- --------------------------------------------------------------
CREATE TYPE public.servidor_estado AS ENUM ('correcto', 'aviso', 'critico', 'mantenimiento');
CREATE TYPE public.task_column     AS ENUM ('backlog', 'todo', 'doing', 'done');
CREATE TYPE public.ui_tone         AS ENUM ('brand', 'success', 'warning', 'info', 'error');

-- --------------------------------------------------------------
-- 3. VIEW public.users  (sobre auth.users)
-- --------------------------------------------------------------
-- security_invoker = false (definer): la vista se evalúa con los
-- privilegios del owner para poder leer auth.users. Solo expone
-- columnas no sensibles; el acceso se controla con GRANT SELECT.
CREATE VIEW public.users
WITH (security_invoker = false) AS
SELECT
    u.id,
    COALESCE(u.raw_user_meta_data->>'name', split_part(u.email, '@', 1))         AS name,
    COALESCE(u.raw_user_meta_data->>'role',   '')                                AS role,
    COALESCE(u.raw_user_meta_data->>'avatar', '')                                AS avatar,
    COALESCE(u.raw_user_meta_data->>'tone',   'brand')                           AS tone
FROM auth.users u;

GRANT SELECT ON public.users TO authenticated;

-- --------------------------------------------------------------
-- 4. Tabla: contactos
-- --------------------------------------------------------------
CREATE TABLE public.contactos (
    id            BIGSERIAL PRIMARY KEY,
    nombre        TEXT NOT NULL,
    cargo         TEXT NOT NULL,
    departamento  TEXT NOT NULL,
    email         TEXT NOT NULL UNIQUE,
    telefono      TEXT,
    extension     TEXT,
    ubicacion     TEXT,
    avatar        TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------
-- 5. Tabla: sedes
-- --------------------------------------------------------------
CREATE TABLE public.sedes (
    id             BIGSERIAL PRIMARY KEY,
    nombre         TEXT NOT NULL,
    ciudad         TEXT NOT NULL,
    direccion      TEXT NOT NULL,
    telefono       TEXT,
    email          TEXT,
    descripcion    TEXT,
    estudiantes    INTEGER NOT NULL DEFAULT 0,
    especialidades TEXT[] NOT NULL DEFAULT '{}',
    image          TEXT,
    coordenadas    TEXT,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------
-- 6. Tabla: servidores
-- --------------------------------------------------------------
CREATE TABLE public.servidores (
    id                BIGSERIAL PRIMARY KEY,
    hostname          TEXT NOT NULL UNIQUE,
    ip                TEXT NOT NULL,
    sistema_operativo TEXT NOT NULL,
    rol               TEXT NOT NULL,
    sede              TEXT NOT NULL,
    estado            public.servidor_estado NOT NULL DEFAULT 'correcto',
    servicios         TEXT[] NOT NULL DEFAULT '{}',
    uptime            TEXT,
    ultima_revision   TIMESTAMPTZ,
    cpu               INTEGER NOT NULL DEFAULT 0 CHECK (cpu BETWEEN 0 AND 100),
    memoria           INTEGER NOT NULL DEFAULT 0 CHECK (memoria BETWEEN 0 AND 100),
    disco             INTEGER NOT NULL DEFAULT 0 CHECK (disco BETWEEN 0 AND 100),
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------
-- 7. Tabla: servicios
-- --------------------------------------------------------------
CREATE TABLE public.servicios (
    id          BIGSERIAL PRIMARY KEY,
    nombre      TEXT NOT NULL,
    descripcion TEXT,
    icono       TEXT,
    url         TEXT,
    categoria   TEXT,
    tone        public.ui_tone NOT NULL DEFAULT 'brand',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------
-- 8. Tabla: tasks
-- --------------------------------------------------------------
CREATE TABLE public.tasks (
    id           TEXT PRIMARY KEY,
    title        TEXT NOT NULL,
    "column"     public.task_column NOT NULL DEFAULT 'backlog',
    assigned_to  UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    creator_id   UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------
-- 9. Row Level Security
-- --------------------------------------------------------------
ALTER TABLE public.contactos  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sedes      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servidores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servicios  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks      ENABLE ROW LEVEL SECURITY;

-- Lectura para usuarios autenticados (sin escritura en el frontend)
CREATE POLICY "read_contactos"  ON public.contactos  FOR SELECT TO authenticated USING (true);
CREATE POLICY "read_sedes"      ON public.sedes      FOR SELECT TO authenticated USING (true);
CREATE POLICY "read_servidores" ON public.servidores FOR SELECT TO authenticated USING (true);
CREATE POLICY "read_servicios"  ON public.servicios  FOR SELECT TO authenticated USING (true);

-- Tasks: única entidad escribible desde el frontend
CREATE POLICY "read_tasks"   ON public.tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_tasks" ON public.tasks FOR INSERT TO authenticated WITH CHECK (creator_id = auth.uid());
CREATE POLICY "update_tasks" ON public.tasks FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_tasks" ON public.tasks FOR DELETE TO authenticated USING (creator_id = auth.uid());
