import { layout, pageHeader, statCard } from '../components/layout'
import { icon, hydrateIcons } from '../components/icons'
import { Kanban, type KanbanView } from '../components/kanban'
import {
  getUsers, getTasks, getCurrentUserId,
  type TaskColumn, type User, type Task,
} from '../lib/data'

let kanban: Kanban | null = null
let usersCache: User[] = []
let tasksCache: Task[] = []
let currentUserIdCache = ''

export async function tasksPage(): Promise<string> {
  const [users, tasksList, currentUserId] = await Promise.all([
    getUsers(), getTasks(), getCurrentUserId(),
  ])
  usersCache = users
  tasksCache = tasksList
  currentUserIdCache = currentUserId ?? ''

  const total = tasksList.length
  const mine = tasksList.filter((t) => t.assignedTo === currentUserIdCache).length
  const done = tasksList.filter((t) => t.column === 'done').length
  const doing = tasksList.filter((t) => t.column === 'doing').length

  const userOptions = users
    .map((u) => `<option value="${u.id}" ${u.id === currentUserIdCache ? 'selected' : ''}>${u.name}</option>`)
    .join('')

  const columnOptions: { id: TaskColumn; label: string }[] = [
    { id: 'backlog', label: 'Backlog' },
    { id: 'todo',    label: 'Pendiente' },
    { id: 'doing',   label: 'En progreso' },
    { id: 'done',    label: 'Completado' },
  ]
  const columnOptionsHtml = columnOptions
    .map((c) => `<option value="${c.id}">${c.label}</option>`)
    .join('')

  const content = `
    ${pageHeader({
      eyebrow: 'Colaboración',
      icon: 'kanban-square',
      title: 'Gestión de tareas',
      description:
        'Organiza tu trabajo personal y coordina con el equipo. Arrastra tarjetas para cambiar estado, reasignar o eliminar.',
      tone: 'violet',
      actions: `
        <button id="openCreateTask"
          class="button rounded-xl round fill inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white hover:bg-violet-700 text-sm font-semibold elevation-1 cursor-pointer transition-colors">
          ${icon('plus')} Nueva tarea
        </button>
      `,
    })}

    <section class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      ${statCard({ label: 'Tareas totales',     value: total, icon: 'list-todo',      tone: 'brand' })}
      ${statCard({ label: 'Asignadas a mí',     value: mine,  icon: 'user-check',     tone: 'info' })}
      ${statCard({ label: 'En progreso',        value: doing, icon: 'timer',          tone: 'warning' })}
      ${statCard({ label: 'Completadas',        value: done,  icon: 'check-circle-2', tone: 'success' })}
    </section>

    <!-- View tabs -->
    <section class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 elevation-1 overflow-hidden mb-6">
      <div class="flex items-center justify-between gap-3 flex-wrap px-5 py-3.5 bg-gradient-to-r from-violet-50/60 dark:from-violet-900/20 to-transparent border-b border-slate-100 dark:border-slate-700">
        <div class="inline-flex items-center gap-1 p-1 rounded-full bg-slate-100 dark:bg-slate-700" role="tablist">
          <button type="button" data-view="personal"
            class="tasks-tab px-4 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 transition-colors bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 elevation-1 cursor-pointer"
            aria-selected="true">
            ${icon('user', 'w-4 h-4')} Personal
          </button>
          <button type="button" data-view="team"
            class="tasks-tab px-4 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer"
            aria-selected="false">
            ${icon('users', 'w-4 h-4')} Equipo
          </button>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 inline-flex items-center gap-1.5">
          ${icon('info', 'w-4 h-4')}
          <span id="viewHelp">Mostrando tareas asignadas a ${users.find((u) => u.id === currentUserIdCache)?.name ?? 'mí'}.</span>
        </p>
      </div>
    </section>

    <!-- Board container (re-rendered by Kanban) -->
    <section id="kanbanRoot" class="mb-10"></section>

    <!-- Create task modal -->
    <div id="createTaskBackdrop"
      class="fixed inset-0 z-50 hidden items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div class="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg mx-4 overflow-hidden elevation-2">
        <header class="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-violet-50 dark:from-violet-900/20 to-transparent border-b border-slate-100 dark:border-slate-700">
          <div class="flex items-center gap-2">
            <span class="grid place-items-center w-9 h-9 rounded-xl bg-violet-600 text-white icon-lg">
              ${icon('plus')}
            </span>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Nueva tarea</h3>
          </div>
          <button id="closeCreateTask" class="w-8 h-8 inline-flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" aria-label="Cerrar">
            ${icon('x')}
          </button>
        </header>

        <form id="createTaskForm" class="p-5 space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Título de la tarea</label>
            <input type="text" id="taskTitle" required minlength="2"
              placeholder="Describe la tarea…"
              class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 focus:border-brand-400 text-sm text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-400" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Asignado a</label>
              <select id="taskAssignee"
                class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 focus:border-brand-400 text-sm text-slate-900 dark:text-slate-100 outline-none">
                ${userOptions}
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Estado inicial</label>
              <select id="taskColumn"
                class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 focus:border-brand-400 text-sm text-slate-900 dark:text-slate-100 outline-none">
                ${columnOptionsHtml}
              </select>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" id="cancelCreateTask"
              class="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 transition-colors">
              Cancelar
            </button>
            <button type="submit"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-sm">
              ${icon('plus', 'w-4 h-4')} Crear tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  `

  return layout(content)
}

export function wireTasksPage() {
  const mount = document.getElementById('kanbanRoot')
  if (!mount) return

  kanban = new Kanban(mount, {
    tasks: tasksCache,
    users: usersCache,
    currentUserId: currentUserIdCache,
  })
  kanban.render()

  // Tabs
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('.tasks-tab'))
  const viewHelp = document.getElementById('viewHelp')
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const view = tab.dataset.view as KanbanView
      tabs.forEach((t) => {
        const active = t === tab
        t.setAttribute('aria-selected', active ? 'true' : 'false')
        t.classList.toggle('bg-white', active)
        t.classList.toggle('dark:bg-slate-600', active)
        t.classList.toggle('text-slate-900', active)
        t.classList.toggle('dark:text-slate-100', active)
        t.classList.toggle('elevation-1', active)
        t.classList.toggle('text-slate-600', !active)
        t.classList.toggle('dark:text-slate-400', !active)
      })
      if (viewHelp) {
        viewHelp.textContent = view === 'personal'
          ? `Mostrando tareas asignadas a ${usersCache.find((u) => u.id === currentUserIdCache)?.name ?? 'mí'}.`
          : 'Arrastra tarjetas entre usuarios para reasignarlas.'
      }
      kanban?.setView(view)
    })
  })

  // Modal
  const openBtn = document.getElementById('openCreateTask')
  const backdrop = document.getElementById('createTaskBackdrop')
  const closeBtn = document.getElementById('closeCreateTask')
  const cancelBtn = document.getElementById('cancelCreateTask')
  const form = document.getElementById('createTaskForm') as HTMLFormElement | null
  const titleInput = document.getElementById('taskTitle') as HTMLInputElement | null
  const assigneeSel = document.getElementById('taskAssignee') as HTMLSelectElement | null
  const columnSel = document.getElementById('taskColumn') as HTMLSelectElement | null

  function openModal() {
    backdrop?.classList.remove('hidden')
    backdrop?.classList.add('flex')
    setTimeout(() => titleInput?.focus(), 30)
  }
  function closeModal() {
    backdrop?.classList.add('hidden')
    backdrop?.classList.remove('flex')
    form?.reset()
  }

  openBtn?.addEventListener('click', openModal)
  closeBtn?.addEventListener('click', closeModal)
  cancelBtn?.addEventListener('click', closeModal)
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal()
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop?.classList.contains('hidden')) closeModal()
  })

  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = titleInput?.value.trim()
    const assignedTo = assigneeSel?.value
    const column = columnSel?.value as TaskColumn
    if (!title || !assignedTo || !column || !kanban || !currentUserIdCache) return
    void kanban.addTask({
      title,
      assignedTo,
      column,
      creatorId: currentUserIdCache,
    })
    closeModal()
  })

  // Icons in modal/tabs
  hydrateIcons(document)
}
