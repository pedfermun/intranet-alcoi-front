import { supabase } from './supabaseClient'
import type { Contact, Servidor, Task, Sede, User } from './data'

// =====================================================
// CONTACTOS — GET only
// =====================================================
export async function getContactos(): Promise<Contact[]> {
  const { data, error } = await supabase.from('contactos').select('*').order('id')
  if (error) throw error
  return (data ?? []) as Contact[]
}

export async function getContacto(id: number): Promise<Contact | null> {
  const { data, error } = await supabase.from('contactos').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return (data as Contact) ?? null
}

// =====================================================
// SEDES — GET only
// =====================================================
export async function getSedes(): Promise<Sede[]> {
  const { data, error } = await supabase.from('sedes').select('*').order('id')
  if (error) throw error
  return (data ?? []) as Sede[]
}

export async function getSede(id: number): Promise<Sede | null> {
  const { data, error } = await supabase.from('sedes').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return (data as Sede) ?? null
}

// =====================================================
// SERVIDORES — GET only
// =====================================================
type ServidorRow = {
  id: number
  hostname: string
  ip: string
  sistema_operativo: string
  rol: string
  sede: string
  estado: Servidor['estado']
  servicios: string[]
  uptime: string
  ultima_revision: string
  cpu: number
  memoria: number
  disco: number
}

const rowToServidor = (r: ServidorRow): Servidor => ({
  id: r.id,
  hostname: r.hostname,
  ip: r.ip,
  sistemaOperativo: r.sistema_operativo,
  rol: r.rol,
  sede: r.sede,
  estado: r.estado,
  servicios: r.servicios,
  uptime: r.uptime,
  ultimaRevision: r.ultima_revision,
  cpu: r.cpu,
  memoria: r.memoria,
  disco: r.disco,
})

export async function getServidores(): Promise<Servidor[]> {
  const { data, error } = await supabase.from('servidores').select('*').order('id')
  if (error) throw error
  return (data as ServidorRow[] ?? []).map(rowToServidor)
}

export async function getServidor(id: number): Promise<Servidor | null> {
  const { data, error } = await supabase.from('servidores').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data ? rowToServidor(data as ServidorRow) : null
}

// =====================================================
// USERS — GET only (proviene de auth.users vía view)
// =====================================================
export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase.from('users').select('id, name, role, avatar, tone')
  if (error) throw error
  return (data ?? []) as User[]
}

export async function getUser(id: string): Promise<User | null> {
  const { data, error } = await supabase.from('users').select('id, name, role, avatar, tone').eq('id', id).maybeSingle()
  if (error) throw error
  return (data as User) ?? null
}

// =====================================================
// TASKS — CRUD completo (única entidad escribible)
// =====================================================
type TaskRow = {
  id: string
  title: string
  column: Task['column']
  assigned_to: string
  creator_id: string
  created_at: string
}

const rowToTask = (r: TaskRow): Task => ({
  id: r.id,
  title: r.title,
  column: r.column,
  assignedTo: r.assigned_to,
  creatorId: r.creator_id,
  createdAt: r.created_at,
})

const taskToRow = (t: Partial<Task>): Partial<TaskRow> => {
  const row: Partial<TaskRow> = {}
  if (t.id !== undefined) row.id = t.id
  if (t.title !== undefined) row.title = t.title
  if (t.column !== undefined) row.column = t.column
  if (t.assignedTo !== undefined) row.assigned_to = t.assignedTo
  if (t.creatorId !== undefined) row.creator_id = t.creatorId
  if (t.createdAt !== undefined) row.created_at = t.createdAt
  return row
}

export async function getTasks(): Promise<Task[]> {
  const { data, error } = await supabase.from('tasks').select('*').order('created_at')
  if (error) throw error
  return (data as TaskRow[] ?? []).map(rowToTask)
}

export async function getTask(id: string): Promise<Task | null> {
  const { data, error } = await supabase.from('tasks').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data ? rowToTask(data as TaskRow) : null
}

export async function createTask(payload: Task): Promise<Task> {
  const { data, error } = await supabase.from('tasks').insert(taskToRow(payload)).select().single()
  if (error) throw error
  return rowToTask(data as TaskRow)
}

export async function updateTask(id: string, patch: Partial<Omit<Task, 'id'>>): Promise<Task> {
  const { data, error } = await supabase.from('tasks').update(taskToRow(patch)).eq('id', id).select().single()
  if (error) throw error
  return rowToTask(data as TaskRow)
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) throw error
}
