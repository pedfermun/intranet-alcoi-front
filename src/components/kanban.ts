import { icon } from './icons'
import { hydrateIcons } from './icons'
import {
  type Task,
  type TaskColumn,
  type User,
  createTask,
  updateTask,
  deleteTask,
} from '../lib/data'

export type KanbanView = 'personal' | 'team'

type ColumnDef = {
  id: TaskColumn
  title: string
  icon: string
  colBg: string
  colBorder: string
  topBar: string
  dot: string
  heading: string
  chip: string
  cardStripe: string
  cardHoverBorder: string
  addHoverBg: string
  addHoverText: string
}

const COLUMNS: ColumnDef[] = [
  {
    id: 'backlog', title: 'Backlog', icon: 'inbox',
    colBg: 'bg-slate-50/70 dark:bg-slate-800/70', colBorder: 'border-slate-200/80 dark:border-slate-700/80', topBar: 'bg-slate-400 dark:bg-slate-500',
    dot: 'bg-slate-400', heading: 'text-slate-700 dark:text-slate-300', chip: 'bg-white text-slate-600 border border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600',
    cardStripe: 'bg-slate-300 dark:bg-slate-500', cardHoverBorder: 'hover:border-slate-300 dark:hover:border-slate-500',
    addHoverBg: 'hover:bg-slate-100 dark:hover:bg-slate-700', addHoverText: 'hover:text-slate-800 dark:hover:text-slate-200',
  },
  {
    id: 'todo', title: 'Pendiente', icon: 'circle-dashed',
    colBg: 'bg-amber-50/70 dark:bg-amber-900/20', colBorder: 'border-amber-200/70 dark:border-amber-800/70', topBar: 'bg-amber-400 dark:bg-amber-600',
    dot: 'bg-amber-500', heading: 'text-amber-700 dark:text-amber-400', chip: 'bg-white text-amber-700 border border-amber-200 dark:bg-slate-700 dark:text-amber-400 dark:border-slate-600',
    cardStripe: 'bg-amber-400 dark:bg-amber-500', cardHoverBorder: 'hover:border-amber-300 dark:hover:border-amber-600',
    addHoverBg: 'hover:bg-amber-100/80 dark:hover:bg-amber-900/30', addHoverText: 'hover:text-amber-700 dark:hover:text-amber-400',
  },
  {
    id: 'doing', title: 'En progreso', icon: 'loader-circle',
    colBg: 'bg-sky-50/70 dark:bg-sky-900/20', colBorder: 'border-sky-200/70 dark:border-sky-800/70', topBar: 'bg-sky-400 dark:bg-sky-600',
    dot: 'bg-sky-500', heading: 'text-sky-700 dark:text-sky-400', chip: 'bg-white text-sky-700 border border-sky-200 dark:bg-slate-700 dark:text-sky-400 dark:border-slate-600',
    cardStripe: 'bg-sky-400 dark:bg-sky-500', cardHoverBorder: 'hover:border-sky-300 dark:hover:border-sky-600',
    addHoverBg: 'hover:bg-sky-100/80 dark:hover:bg-sky-900/30', addHoverText: 'hover:text-sky-700 dark:hover:text-sky-400',
  },
  {
    id: 'done', title: 'Completado', icon: 'check-circle-2',
    colBg: 'bg-emerald-50/70 dark:bg-emerald-900/20', colBorder: 'border-emerald-200/70 dark:border-emerald-800/70', topBar: 'bg-emerald-400 dark:bg-emerald-600',
    dot: 'bg-emerald-500', heading: 'text-emerald-700 dark:text-emerald-400', chip: 'bg-white text-emerald-700 border border-emerald-200 dark:bg-slate-700 dark:text-emerald-400 dark:border-slate-600',
    cardStripe: 'bg-emerald-400 dark:bg-emerald-500', cardHoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-600',
    addHoverBg: 'hover:bg-emerald-100/80 dark:hover:bg-emerald-900/30', addHoverText: 'hover:text-emerald-700 dark:hover:text-emerald-400',
  },
]

const TONES: Record<User['tone'], string> = {
  brand:   'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-900/30 dark:text-brand-400 dark:border-brand-800',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
  warning: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
  info:    'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:border-sky-800',
  error:   'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
}

function columnDef(id: TaskColumn): ColumnDef {
  return COLUMNS.find((c) => c.id === id) ?? COLUMNS[0]
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (ch) =>
    ch === '&' ? '&amp;' :
    ch === '<' ? '&lt;' :
    ch === '>' ? '&gt;' :
    ch === '"' ? '&quot;' : '&#39;'
  )
}

function newId(): string {
  return 't-' + Math.random().toString(36).slice(2, 9)
}

export class Kanban {
  private root: HTMLElement
  private tasks: Task[]
  private users: User[]
  private currentUserId: string
  private view: KanbanView = 'personal'

  constructor(root: HTMLElement, opts: { tasks: Task[]; users: User[]; currentUserId: string }) {
    this.root = root
    this.tasks = [...opts.tasks]
    this.users = opts.users
    this.currentUserId = opts.currentUserId
  }

  private findUser(id: string): User | undefined {
    return this.users.find((u) => u.id === id)
  }

  setView(view: KanbanView) {
    this.view = view
    this.render()
  }

  getView(): KanbanView {
    return this.view
  }

  render() {
    this.root.innerHTML = this.view === 'personal' ? this.personalHtml() : this.teamHtml()
    hydrateIcons(this.root)
    this.wire()
  }

  // ------------------------------------------------------------------
  // Templates
  // ------------------------------------------------------------------

  private personalHtml(): string {
    const mine = this.tasks.filter((t) => t.assignedTo === this.currentUserId)
    const cols = COLUMNS.map((def) => this.columnHtml(def, mine)).join('')
    return `
      <div class="kanban-wrap">
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          ${cols}
        </div>
        ${this.floatingBurnBarrelHtml()}
      </div>
    `
  }

  private floatingBurnBarrelHtml(): string {
    return `
      <div id="kanbanBurn"
        class="kanban-burn fixed bottom-6 left-6 z-40 pointer-events-none opacity-0 translate-y-2 transition-all duration-200">
        <div class="pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl border-2 border-dashed border-red-300 dark:border-red-800 bg-white/95 dark:bg-slate-800/95 backdrop-blur text-red-600 dark:text-red-400 shadow-lg transition-all duration-150">
          ${icon('trash-2', 'w-5 h-5')}
          <span class="text-sm font-semibold">Suelta aquí para eliminar</span>
        </div>
      </div>
    `
  }

  private teamHtml(): string {
    const userCols = this.users
      .map((u) => {
        const ut = this.tasks.filter((t) => t.assignedTo === u.id)
        const counters = COLUMNS.map((c) => ({
          ...c,
          count: ut.filter((t) => t.column === c.id).length,
        }))
          .map(
            (c) => `
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${c.chip}">
              ${c.title} · ${c.count}
            </span>`
          )
          .join('')

        const cards = ut.length
          ? ut.map((t) => this.teamCardHtml(t)).join('')
          : `<p class="text-xs text-slate-400 dark:text-slate-500 italic px-2 py-6 text-center">Sin tareas</p>`

        return `
          <div class="col s12 m6 l4 min-w-[18rem]">
            <article class="card no-padding border bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden h-full flex flex-col">
              <header class="flex items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-700">
                <img src="${u.avatar}" alt="${escapeHtml(u.name)}" class="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700" />
                <div class="min-w-0 flex-1">
                  <p class="font-semibold text-slate-900 dark:text-slate-100 truncate">${escapeHtml(u.name)}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 truncate">${escapeHtml(u.role)}</p>
                </div>
                <span class="chip-soft px-2 py-1 rounded-full text-[11px] font-semibold border ${TONES[u.tone]}">
                  ${ut.length} tareas
                </span>
              </header>
              <div class="flex flex-wrap gap-1.5 px-4 py-3 bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-700">
                ${counters}
              </div>
              <div
                class="team-dropzone flex-1 flex flex-col gap-2 p-3"
                data-user-drop="${u.id}">
                ${cards}
              </div>
            </article>
          </div>
        `
      })
      .join('')

    return `
      <div class="kanban-wrap">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${userCols}</div>
        ${this.floatingBurnBarrelHtml()}
      </div>
    `
  }

  private columnHtml(def: ColumnDef, visibleTasks: Task[]): string {
    const colTasks = visibleTasks.filter((t) => t.column === def.id)
    const cards = colTasks.length
      ? colTasks.map((t) => this.cardHtml(t, def)).join('')
      : this.emptyColumnHtml(def)

    return `
      <div class="kanban-column flex flex-col rounded-2xl ${def.colBg} border ${def.colBorder} overflow-hidden"
           data-column-wrap="${def.id}">
        <div class="h-1 ${def.topBar}"></div>
        <header class="flex items-center justify-between px-4 pt-3 pb-2">
          <div class="flex items-center gap-2 min-w-0">
            <span class="inline-block w-2 h-2 rounded-full ${def.dot}"></span>
            <h3 class="font-semibold text-sm ${def.heading} tracking-tight truncate">${def.title}</h3>
          </div>
          <span class="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full text-[11px] font-semibold ${def.chip}">
            ${colTasks.length}
          </span>
        </header>
        <div
          class="kanban-dropzone flex-1 flex flex-col gap-2 px-3 pb-3 min-h-[6rem] rounded-b-2xl transition-colors"
          data-dropzone="${def.id}">
          ${cards}
          ${this.dropIndicatorHtml(null, def.id)}
          ${this.addCardInlineHtml(def)}
        </div>
      </div>
    `
  }

  private emptyColumnHtml(def: ColumnDef): string {
    return `
      <div class="kanban-empty flex flex-col items-center justify-center gap-1.5 py-6 px-3 text-center text-slate-400 dark:text-slate-500">
        <span class="${def.heading} opacity-60">${icon(def.icon, 'w-5 h-5')}</span>
        <p class="text-[11px] font-medium">Sin tareas en ${def.title.toLowerCase()}</p>
      </div>
    `
  }

  private cardHtml(t: Task, def: ColumnDef): string {
    const u = this.findUser(t.assignedTo)
    return `
      ${this.dropIndicatorHtml(t.id, t.column)}
      <div
        class="kanban-card group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 pl-4 pr-3 py-3 cursor-grab active:cursor-grabbing hover:-translate-y-0.5 hover:shadow-md ${def.cardHoverBorder} transition-all overflow-hidden"
        draggable="true"
        data-card-id="${t.id}"
        data-column="${t.column}">
        <span class="absolute left-0 top-0 bottom-0 w-1 ${def.cardStripe}"></span>
        <p class="text-sm text-slate-800 dark:text-slate-100 leading-snug">${escapeHtml(t.title)}</p>
        <div class="mt-3 flex items-center justify-between gap-2">
          <div class="flex items-center gap-1.5 min-w-0">
            ${u
              ? `<img src="${u.avatar}" alt="${escapeHtml(u.name)}" class="w-5 h-5 rounded-full object-cover ring-2 ring-white dark:ring-slate-700 shadow-sm shrink-0" />`
              : `<span class="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 grid place-items-center text-slate-400 dark:text-slate-500">${icon('user', 'w-3 h-3')}</span>`}
            <span class="text-[11px] text-slate-600 dark:text-slate-400 truncate">${escapeHtml(u?.name ?? 'Sin asignar')}</span>
          </div>
          <button
            class="delete-card opacity-0 group-hover:opacity-100 focus:opacity-100 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-all"
            data-delete-id="${t.id}"
            aria-label="Eliminar tarea">
            ${icon('trash-2', 'w-4 h-4')}
          </button>
        </div>
      </div>
    `
  }

  private teamCardHtml(t: Task): string {
    const def = columnDef(t.column)
    return `
      <div
        class="kanban-card group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 pl-4 pr-3 py-3 cursor-grab active:cursor-grabbing hover:-translate-y-0.5 hover:shadow-md ${def.cardHoverBorder} transition-all overflow-hidden"
        draggable="true"
        data-card-id="${t.id}"
        data-column="${t.column}">
        <span class="absolute left-0 top-0 bottom-0 w-1 ${def.cardStripe}"></span>
        <div class="flex items-start justify-between gap-2">
          <p class="text-sm text-slate-800 dark:text-slate-100 leading-snug">${escapeHtml(t.title)}</p>
          <button
            class="delete-card opacity-0 group-hover:opacity-100 focus:opacity-100 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-all shrink-0"
            data-delete-id="${t.id}"
            aria-label="Eliminar tarea">
            ${icon('trash-2', 'w-4 h-4')}
          </button>
        </div>
        <div class="mt-2 flex items-center gap-1.5">
          <span class="inline-block w-1.5 h-1.5 rounded-full ${def.dot}"></span>
          <span class="text-[11px] font-semibold ${def.heading}">${def.title}</span>
        </div>
      </div>
    `
  }

  private dropIndicatorHtml(beforeId: string | null, column: string): string {
    return `<div class="drop-indicator h-1.5 w-full rounded-full bg-brand-500/80 opacity-0 transition-opacity"
              data-before="${beforeId ?? '-1'}"
              data-column="${column}"></div>`
  }

  private addCardInlineHtml(def: ColumnDef): string {
    return `
      <div data-add-card-wrap="${def.id}">
        <button
          class="add-card-btn w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 ${def.addHoverText} ${def.addHoverBg} transition-colors"
          data-add-card="${def.id}"
          type="button">
          ${icon('plus', 'w-4 h-4')}
          <span>Añadir tarea</span>
        </button>
        <form class="add-card-form hidden" data-add-card-form="${def.id}">
          <textarea rows="3" required
            class="add-card-input w-full p-2.5 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:border-brand-400 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 resize-none outline-none shadow-sm"
            placeholder="Describe la tarea…"></textarea>
          <div class="mt-2 flex items-center justify-end gap-1.5">
            <button type="button"
              class="add-card-cancel px-3 py-1.5 rounded-lg text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              data-cancel-add="${def.id}">
              Cancelar
            </button>
            <button type="submit"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-sm">
              ${icon('plus', 'w-3.5 h-3.5')}
              <span>Añadir</span>
            </button>
          </div>
        </form>
      </div>
    `
  }

  // ------------------------------------------------------------------
  // Wiring
  // ------------------------------------------------------------------

  private wire() {
    this.wireDragCards()
    this.wireDropzones()
    this.wireBurnBarrel()
    this.wireDelete()
    this.wireAddCardInline()
  }

  private wireDragCards() {
    const barrel = this.root.querySelector<HTMLElement>('#kanbanBurn')
    this.root.querySelectorAll<HTMLElement>('.kanban-card').forEach((el) => {
      el.addEventListener('dragstart', (e) => {
        const id = el.dataset.cardId
        if (!id || !e.dataTransfer) return
        e.dataTransfer.setData('cardId', id)
        e.dataTransfer.effectAllowed = 'move'
        el.classList.add('opacity-60')
        if (barrel) {
          barrel.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none')
          barrel.classList.add('opacity-100', 'translate-y-0')
        }
      })
      el.addEventListener('dragend', () => {
        el.classList.remove('opacity-60')
        if (barrel) {
          barrel.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none')
          barrel.classList.remove('opacity-100', 'translate-y-0')
        }
      })
    })
  }

  private wireDropzones() {
    if (this.view === 'personal') {
      this.root.querySelectorAll<HTMLElement>('[data-dropzone]').forEach((zone) => {
        const column = zone.dataset.dropzone as TaskColumn
        zone.addEventListener('dragover', (e) => {
          e.preventDefault()
          this.highlightIndicator(e as DragEvent, column)
          zone.classList.add('ring-2', 'ring-brand-200', 'dark:ring-brand-900', 'ring-inset')
          })
          zone.addEventListener('dragleave', () => {
            this.clearHighlights(column)
            zone.classList.remove('ring-2', 'ring-brand-200', 'dark:ring-brand-900', 'ring-inset')
          })
          zone.addEventListener('drop', (e) => {
            e.preventDefault()
            this.handleDropPersonal(e as DragEvent, column)
            zone.classList.remove('ring-2', 'ring-brand-200', 'dark:ring-brand-900', 'ring-inset')
          })
      })
    } else {
      this.root.querySelectorAll<HTMLElement>('[data-user-drop]').forEach((zone) => {
        const userId = zone.dataset.userDrop!
        zone.addEventListener('dragover', (e) => {
          e.preventDefault()
          zone.classList.add('ring-2', 'ring-brand-200', 'dark:ring-brand-900', 'ring-inset', 'bg-brand-50/40', 'dark:bg-brand-900/20')
          })
          zone.addEventListener('dragleave', () => {
            zone.classList.remove('ring-2', 'ring-brand-200', 'dark:ring-brand-900', 'ring-inset', 'bg-brand-50/40', 'dark:bg-brand-900/20')
          })
          zone.addEventListener('drop', (e) => {
            e.preventDefault()
            zone.classList.remove('ring-2', 'ring-brand-200', 'dark:ring-brand-900', 'ring-inset', 'bg-brand-50/40', 'dark:bg-brand-900/20')
          const cardId = (e as DragEvent).dataTransfer?.getData('cardId')
          if (!cardId) return
          const task = this.tasks.find((t) => t.id === cardId)
          if (!task || task.assignedTo === userId) return
          task.assignedTo = userId
          this.render()
          void updateTask(cardId, { assignedTo: userId }).catch((err) =>
            console.error('updateTask failed', err),
          )
        })
      })
    }
  }

  private wireBurnBarrel() {
    const barrel = this.root.querySelector<HTMLElement>('#kanbanBurn')
    if (!barrel) return
    const inner = barrel.firstElementChild as HTMLElement | null
    barrel.addEventListener('dragover', (e) => {
      e.preventDefault()
      inner?.classList.add('bg-red-50', 'dark:bg-red-900/30', 'border-red-500', 'dark:border-red-400', 'scale-105')
    })
    barrel.addEventListener('dragleave', () => {
      inner?.classList.remove('bg-red-50', 'dark:bg-red-900/30', 'border-red-500', 'dark:border-red-400', 'scale-105')
    })
    barrel.addEventListener('drop', (e) => {
      e.preventDefault()
      const id = (e as DragEvent).dataTransfer?.getData('cardId')
      inner?.classList.remove('bg-red-50', 'dark:bg-red-900/30', 'border-red-500', 'dark:border-red-400', 'scale-105')
      if (!id) return
      this.tasks = this.tasks.filter((t) => t.id !== id)
      this.render()
      void deleteTask(id).catch((err) => console.error('deleteTask failed', err))
    })
  }

  private wireDelete() {
    this.root.querySelectorAll<HTMLButtonElement>('.delete-card').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const id = btn.dataset.deleteId
        if (!id) return
        this.tasks = this.tasks.filter((t) => t.id !== id)
        this.render()
        void deleteTask(id).catch((err) => console.error('deleteTask failed', err))
      })
    })
  }

  private wireAddCardInline() {
    this.root.querySelectorAll<HTMLButtonElement>('[data-add-card]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const col = btn.dataset.addCard!
        const wrap = this.root.querySelector<HTMLElement>(`[data-add-card-wrap="${col}"]`)
        if (!wrap) return
        wrap.querySelector<HTMLElement>('[data-add-card]')?.classList.add('hidden')
        const form = wrap.querySelector<HTMLFormElement>('[data-add-card-form]')
        form?.classList.remove('hidden')
        form?.querySelector<HTMLTextAreaElement>('textarea')?.focus()
      })
    })

    this.root.querySelectorAll<HTMLButtonElement>('[data-cancel-add]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const col = btn.dataset.cancelAdd!
        const wrap = this.root.querySelector<HTMLElement>(`[data-add-card-wrap="${col}"]`)
        if (!wrap) return
        const form = wrap.querySelector<HTMLFormElement>('[data-add-card-form]')
        form?.classList.add('hidden')
        const textarea = form?.querySelector<HTMLTextAreaElement>('textarea')
        if (textarea) textarea.value = ''
        wrap.querySelector<HTMLElement>('[data-add-card]')?.classList.remove('hidden')
      })
    })

    this.root.querySelectorAll<HTMLFormElement>('[data-add-card-form]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault()
        const col = form.dataset.addCardForm as TaskColumn
        const input = form.querySelector<HTMLTextAreaElement>('textarea')
        const text = input?.value.trim()
        if (!text) return
        void this.addTask({
          title: text,
          column: col,
          assignedTo: this.currentUserId,
          creatorId: this.currentUserId,
        })
      })
    })
  }

  // ------------------------------------------------------------------
  // DnD helpers
  // ------------------------------------------------------------------

  private indicatorsFor(column: string): HTMLElement[] {
    return Array.from(
      this.root.querySelectorAll<HTMLElement>(
        `.drop-indicator[data-column="${column}"]`
      )
    )
  }

  private clearHighlights(column: string) {
    this.indicatorsFor(column).forEach((i) => (i.style.opacity = '0'))
  }

  private nearestIndicator(e: DragEvent, column: string): HTMLElement {
    const indicators = this.indicatorsFor(column)
    const OFFSET = 50
    let best = indicators[indicators.length - 1]
    let bestOffset = Number.NEGATIVE_INFINITY
    indicators.forEach((el) => {
      const box = el.getBoundingClientRect()
      const offset = e.clientY - (box.top + OFFSET)
      if (offset < 0 && offset > bestOffset) {
        best = el
        bestOffset = offset
      }
    })
    return best
  }

  private highlightIndicator(e: DragEvent, column: string) {
    this.clearHighlights(column)
    const el = this.nearestIndicator(e, column)
    if (el) el.style.opacity = '1'
  }

  private handleDropPersonal(e: DragEvent, column: TaskColumn) {
    const cardId = e.dataTransfer?.getData('cardId')
    this.clearHighlights(column)
    if (!cardId) return

    const indicator = this.nearestIndicator(e, column)
    const before = indicator?.dataset.before ?? '-1'
    if (before === cardId) return

    const idx = this.tasks.findIndex((t) => t.id === cardId)
    if (idx === -1) return
    const prevColumn = this.tasks[idx].column
    const moved: Task = { ...this.tasks[idx], column }
    const rest = this.tasks.filter((t) => t.id !== cardId)

    if (before === '-1') {
      rest.push(moved)
    } else {
      const at = rest.findIndex((t) => t.id === before)
      if (at === -1) rest.push(moved)
      else rest.splice(at, 0, moved)
    }
    this.tasks = rest
    this.render()
    if (prevColumn !== column) {
      void updateTask(cardId, { column }).catch((err) =>
        console.error('updateTask failed', err),
      )
    }
  }

  // ------------------------------------------------------------------
  // External API
  // ------------------------------------------------------------------

  async addTask(partial: Omit<Task, 'id' | 'createdAt'>): Promise<void> {
    const draft: Task = {
      ...partial,
      id: newId(),
      createdAt: new Date().toISOString(),
    }
    this.tasks.push(draft)
    this.render()
    try {
      const created = await createTask(draft)
      const idx = this.tasks.findIndex((t) => t.id === draft.id)
      if (idx !== -1) this.tasks[idx] = created
    } catch (err) {
      console.error('createTask failed', err)
      this.tasks = this.tasks.filter((t) => t.id !== draft.id)
      this.render()
    }
  }

  getTasks(): ReadonlyArray<Task> {
    return this.tasks
  }
}
