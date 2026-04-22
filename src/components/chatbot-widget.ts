import { icon } from './icons'
import { marked, Renderer } from 'marked'
import hljs from 'highlight.js'

const renderer = new Renderer()

renderer.code = function ({ text, lang }) {
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
  const highlighted = hljs.highlight(text, { language }).value
  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
}

marked.use({ renderer })

function parseMarkdown(text: string): string {
  return marked.parse(text) as string
}

const CHATBOT_ENDPOINT = import.meta.env.VITE_API_CHATBOT_ENDPOINT as string | undefined

export function chatbotWidget(): string {
  const endpointOk = !!CHATBOT_ENDPOINT

  return `
    <!-- Chatbot FAB -->
    <button id="chatbot-fab"
      class="fixed bottom-6 right-6 z-50 grid place-items-center w-14 h-14 rounded-full bg-brand-600 text-white elevation-3 hover:bg-brand-700 transition-all hover:scale-105 cursor-pointer icon-lg"
      aria-label="Abrir asistente IA">
      ${icon('bot')}
    </button>

    <!-- Chatbot Panel -->
    <div id="chatbot-panel" class="hidden fixed bottom-24 right-6 z-50 w-[22rem] sm:w-[26rem] max-h-[min(32rem,calc(100vh-8rem))] flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 elevation-3 overflow-hidden">

      <!-- Panel header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-brand-600 text-white rounded-t-2xl">
        <div class="flex items-center gap-2.5">
          <div class="grid place-items-center w-8 h-8 rounded-lg bg-white/20 icon-sm">
            ${icon('bot')}
          </div>
          <div class="leading-tight">
            <p class="font-semibold text-sm">Asistente IA</p>
            <p class="text-[10px] text-white/70">Institut d'Alcoi</p>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <button id="chatbot-clear-btn"
            class="grid place-items-center w-8 h-8 rounded-lg hover:bg-white/20 transition-colors icon-sm cursor-pointer"
            title="Borrar conversación">
            ${icon('trash-2')}
          </button>
          <button id="chatbot-close-btn"
            class="grid place-items-center w-8 h-8 rounded-lg hover:bg-white/20 transition-colors icon-sm cursor-pointer"
            title="Cerrar">
            ${icon('x')}
          </button>
        </div>
      </div>

      <!-- Welcome state -->
      <div id="chatbot-empty" class="flex-1 flex flex-col items-center justify-center text-center px-6 py-8">
        <div class="grid place-items-center w-12 h-12 rounded-xl bg-brand-600 text-white elevation-1 mb-4 icon-lg">
          ${icon('bot')}
        </div>
        <p class="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">¿En qué puedo ayudarte?</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Soy el asistente IA de la Intranet. Pregúntame sobre servidores,
          servicios de red o cualquier cosa de la infraestructura.
        </p>
      </div>

      <!-- Messages area -->
      <div id="chatbot-messages" class="hidden flex-1 overflow-y-auto flex-col gap-3 p-3"></div>

      <!-- Quick prompts -->
      <div id="chatbot-quick-prompts" class="flex flex-wrap gap-1.5 px-3 pb-2">
        <button data-prompt="¿Cuál es el estado de los servidores?" class="chatbot-qp text-[11px] px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-brand-400 dark:hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-400 transition-colors cursor-pointer">
          Estado servidores
        </button>
        <button data-prompt="¿Qué servicios de red están disponibles?" class="chatbot-qp text-[11px] px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-brand-400 dark:hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-400 transition-colors cursor-pointer">
          Servicios de red
        </button>
        <button data-prompt="Dame información sobre la seguridad de la red." class="chatbot-qp text-[11px] px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-brand-400 dark:hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-400 transition-colors cursor-pointer">
          Seguridad
        </button>
      </div>

      <!-- Input area -->
      <div class="border-t border-slate-200 dark:border-slate-700 px-3 pb-3 pt-2">
        <p id="chatbot-status" class="text-[11px] text-center min-h-[1rem] mb-1"></p>
        <div class="flex items-end gap-2">
          <textarea
            id="chatbot-input"
            rows="1"
            placeholder="Escribe un mensaje..."
            class="flex-1 resize-none rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-brand-400 dark:focus:border-brand-500 transition-colors leading-relaxed"
          ></textarea>
          <button id="chatbot-send-btn"
            class="grid place-items-center w-9 h-9 rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition-colors shrink-0 icon-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            ${icon('send')}
          </button>
        </div>
        <p class="text-[10px] text-center mt-1.5 ${endpointOk ? 'text-emerald-500' : 'text-amber-500'}">
          ${endpointOk ? 'IA conectada' : 'Configura VITE_API_CHATBOT_ENDPOINT en .env'}
        </p>
      </div>
    </div>
  `
}

export function wireChatbotWidget() {
  const fab       = document.getElementById('chatbot-fab')       as HTMLButtonElement   | null
  const panel     = document.getElementById('chatbot-panel')     as HTMLDivElement      | null
  const closeBtn  = document.getElementById('chatbot-close-btn') as HTMLButtonElement   | null
  const clearBtn  = document.getElementById('chatbot-clear-btn') as HTMLButtonElement   | null
  const input     = document.getElementById('chatbot-input')     as HTMLTextAreaElement | null
  const sendBtn   = document.getElementById('chatbot-send-btn')  as HTMLButtonElement   | null
  const messagesEl= document.getElementById('chatbot-messages')  as HTMLDivElement      | null
  const emptyEl   = document.getElementById('chatbot-empty')     as HTMLDivElement      | null
  const statusEl  = document.getElementById('chatbot-status')    as HTMLParagraphElement| null
  const promptsEl = document.getElementById('chatbot-quick-prompts') as HTMLDivElement  | null

  if (!fab || !panel) return

  const serviceUrl = CHATBOT_ENDPOINT
  const conversationHistory: { role: string; content: string }[] = []

  // ── Toggle panel ──────────────────────────────────────────────────────────

  function togglePanel() {
    const isHidden = panel!.classList.contains('hidden')
    panel!.classList.toggle('hidden', !isHidden)
    if (isHidden) {
      panel!.classList.add('flex')
      input?.focus()
    } else {
      panel!.classList.remove('flex')
    }
  }

  fab.addEventListener('click', togglePanel)
  closeBtn?.addEventListener('click', togglePanel)

  // ── Helpers ────────────────────────────────────────────────────────────────

  function setStatus(text: string, type: 'info' | 'err' | 'success') {
    if (!statusEl) return
    statusEl.textContent = text
    statusEl.className = [
      'text-[11px] text-center min-h-[1rem] mb-1',
      type === 'err'     ? 'text-red-600 dark:text-red-400'     :
      type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400',
    ].join(' ')
  }

  function showChatMode() {
    emptyEl?.classList.add('hidden')
    promptsEl?.classList.add('hidden')
    messagesEl?.classList.remove('hidden')
    messagesEl?.classList.add('flex')
  }

  function scrollToBottom() {
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight
  }

  function appendBubble(role: 'user' | 'assistant', text: string): HTMLElement {
    showChatMode()

    const wrapper = document.createElement('div')
    wrapper.className = role === 'user'
      ? 'flex justify-end'
      : 'flex justify-start items-end gap-1.5'

    if (role === 'assistant') {
      const avatar = document.createElement('div')
      avatar.className = 'grid place-items-center w-6 h-6 rounded-md bg-brand-600 text-white shrink-0 icon-sm mb-0.5'
      avatar.innerHTML = '<i data-lucide="bot"></i>'
      wrapper.appendChild(avatar)
      import('./icons').then(({ hydrateIcons }) => hydrateIcons(avatar))
    }

    const bubble = document.createElement('div')
    bubble.className = role === 'user'
      ? 'max-w-[80%] bg-brand-600 text-white rounded-2xl rounded-tr-sm px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap'
      : 'chat-prose max-w-[80%] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-2xl rounded-tl-sm px-3 py-2 text-sm'

    if (role === 'user') {
      bubble.textContent = text
    } else if (text) {
      bubble.innerHTML = parseMarkdown(text)
    } else {
      bubble.innerHTML = `
        <span class="inline-flex items-center gap-1 text-slate-400 dark:text-slate-500 py-0.5">
          <span class="chat-dot"></span>
          <span class="chat-dot"></span>
          <span class="chat-dot"></span>
        </span>`
    }

    wrapper.appendChild(bubble)
    messagesEl?.appendChild(wrapper)
    scrollToBottom()
    return bubble
  }

  // ── Send ───────────────────────────────────────────────────────────────────

  async function sendMessage() {
    if (!serviceUrl) {
      setStatus('Configura VITE_API_CHATBOT_ENDPOINT en el fichero .env y reinicia el servidor.', 'err')
      return
    }

    const message = input?.value.trim() ?? ''
    if (!message) return

    if (input)   input.value    = ''
    if (input)   input.disabled = true
    if (sendBtn) sendBtn.disabled = true
    setStatus('', 'info')

    appendBubble('user', message)
    const assistantBubble = appendBubble('assistant', '')

    let fullReply = ''

    try {
      const res = await fetch(`${serviceUrl}/send-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: conversationHistory }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        const errMsg = `Error ${res.status}: ${(data as { error?: string }).error ?? res.statusText}`
        assistantBubble.textContent = errMsg
        setStatus(`${res.status} ${res.statusText}`, 'err')
        return
      }

      const reader  = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer    = ''
      let started   = false

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') continue

          try {
            const parsed = JSON.parse(data) as { chunk?: string; error?: string }
            if (parsed.error) {
              assistantBubble.innerHTML = ''
              assistantBubble.textContent = `Error: ${parsed.error}`
              setStatus(parsed.error, 'err')
              return
            }
            if (parsed.chunk) {
              if (!started) {
                assistantBubble.innerHTML = ''
                started = true
              }
              fullReply += parsed.chunk
              assistantBubble.innerHTML = parseMarkdown(fullReply)
              scrollToBottom()
            }
          } catch { /* skip malformed SSE lines */ }
        }
      }

      conversationHistory.push({ role: 'user',      content: message   })
      conversationHistory.push({ role: 'assistant',  content: fullReply })

    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      assistantBubble.innerHTML = ''
      assistantBubble.textContent = `Error: ${msg}`
      setStatus(`Error de conexión: ${msg}`, 'err')
    } finally {
      if (input)   input.disabled   = false
      if (sendBtn) sendBtn.disabled = false
      input?.focus()
    }
  }

  // ── Clear ──────────────────────────────────────────────────────────────────

  function clearConversation() {
    conversationHistory.length = 0
    if (messagesEl) messagesEl.innerHTML = ''

    messagesEl?.classList.add('hidden')
    messagesEl?.classList.remove('flex')
    emptyEl?.classList.remove('hidden')
    promptsEl?.classList.remove('hidden')
    setStatus('', 'info')
    input?.focus()
  }

  // ── Auto-resize textarea ──────────────────────────────────────────────────

  function autoResize() {
    if (!input) return
    input.style.height = 'auto'
    input.style.height = Math.min(input.scrollHeight, 96) + 'px'
  }

  // ── Events ─────────────────────────────────────────────────────────────────

  sendBtn?.addEventListener('click', sendMessage)

  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  })

  input?.addEventListener('input', autoResize)

  document.querySelectorAll<HTMLButtonElement>('.chatbot-qp').forEach((btn) => {
    btn.addEventListener('click', () => {
      const prompt = btn.dataset.prompt ?? btn.textContent?.trim() ?? ''
      if (input) input.value = prompt
      sendMessage()
    })
  })

  clearBtn?.addEventListener('click', clearConversation)
}
