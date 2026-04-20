// Tipos del dominio. Los datos provienen de Supabase; las funciones
// async de acceso están en `./api` (re-exportadas abajo).

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

export type User = {
  id: string
  name: string
  role: string
  avatar: string
  tone: 'brand' | 'success' | 'warning' | 'info' | 'error'
}

export type TaskColumn = 'backlog' | 'todo' | 'doing' | 'done'

export type Task = {
  id: string
  title: string
  column: TaskColumn
  assignedTo: string
  creatorId: string
  createdAt: string
}

// API re-export
export {
  getContactos, getContacto,
  getSedes, getSede,
  getServidores, getServidor,
  getUsers, getUser,
  getTasks, getTask, createTask, updateTask, deleteTask,
} from './api'

// Id del usuario autenticado (desde Supabase Auth)
import { supabase } from './supabaseClient'
export async function getCurrentUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getUser()
  return data.user?.id ?? null
}
