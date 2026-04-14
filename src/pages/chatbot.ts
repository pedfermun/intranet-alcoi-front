import { layout } from '../components/layout'
import { icon } from '../components/icons'
import { marked, Renderer } from 'marked'
import hljs from 'highlight.js'

// ── Configure marked with highlight.js ──────────────────────────────────────
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

// ── Env ──────────────────────────────────────────────────────────────────────
const CHATBOT_ENDPOINT = import.meta.env.VITE_API_CHATBOT_ENDPOINT as string | undefined

// ── Template ─────────────────────────────────────────────────────────────────
export function chatbotPage(): string {
  const endpointOk = !!CHATBOT_ENDPOINT

  const content = `
    <div id="chatbot-wrapper" class="flex flex-col" style="min-height: calc(100vh - 13rem);">

      <!-- Chat header (visible only when conversation is active) -->
      <div id="chat-header" class="hidden items-center justify-between mb-5 pb-4 border-b border-slate-200">
        <div class="flex items-center gap-3">
          <div class="grid place-items-center w-10 h-10 rounded-xl bg-brand-600 text-white icon-lg elevation-1">
            ${icon('bot')}
          </div>
          <div class="leading-tight">
            <h2 class="font-semibold text-slate-900">Assistent IA</h2>
            <p class="text-xs text-slate-500">Institut d'Alcoi · Intranet</p>
          </div>
        </div>
        <button id="chat-clear-btn"
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-xs font-semibold transition-colors">
          ${icon('trash-2')} Esborrar conversa
        </button>
      </div>

      <!-- Empty / welcome state -->
      <div id="chatbot-empty" class="flex-1 flex flex-col items-center justify-center text-center py-10">
        <div class="grid place-items-center w-16 h-16 rounded-2xl bg-brand-600 text-white elevation-2 mb-6 icon-xl">
          ${icon('bot')}
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Hola! Com puc ajudar-te?
        </h1>
        <p class="text-slate-500 max-w-md leading-relaxed text-base">
          Sóc l'assistent IA de la Intranet d'Alcoi. Pregunta'm sobre servidors,
          serveis de xarxa o qualsevol cosa relacionada amb la infraestructura.
        </p>
      </div>

      <!-- Messages scrollable area (hidden until first message) -->
      <div id="chat-messages" class="hidden flex-1 overflow-y-auto flex-col gap-4 mb-4 pr-1"></div>

      <!-- Input section (always visible) -->
      <div class="shrink-0 mt-4">

        <!-- Status / error line -->
        <p id="chat-status" class="mb-2 text-sm text-center min-h-[1.25rem]"></p>

        <!-- Quick-prompt chips (hidden after first message) -->
        <div id="quick-prompts" class="flex flex-wrap justify-center gap-2 mb-4">
          <button data-prompt="Quin és l'estat dels servidors?" class="quick-prompt inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-brand-400 hover:text-brand-700 transition-colors elevation-1">
            ${icon('server')} Estat servidors
          </button>
          <button data-prompt="Quins serveis de xarxa estan disponibles?" class="quick-prompt inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-brand-400 hover:text-brand-700 transition-colors elevation-1">
            ${icon('network')} Serveis de xarxa
          </button>
          <button data-prompt="Dona'm informació sobre la seguretat de la xarxa." class="quick-prompt inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-brand-400 hover:text-brand-700 transition-colors elevation-1">
            ${icon('shield-check')} Seguretat
          </button>
          <button data-prompt="Necessito ajuda general amb la intranet." class="quick-prompt inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-brand-400 hover:text-brand-700 transition-colors elevation-1">
            ${icon('help-circle')} Ajuda general
          </button>
        </div>

        <!-- Input box -->
        <div class="bg-white border border-slate-200 rounded-2xl elevation-1 overflow-hidden focus-within:border-brand-400 transition-colors">
          <textarea
            id="chat-input"
            rows="3"
            placeholder="Escriu un missatge… (Enter per enviar, Shift+Enter per línia nova)"
            class="w-full px-5 pt-4 pb-2 text-sm text-slate-800 placeholder-slate-400 resize-none outline-none bg-transparent leading-relaxed"
          ></textarea>
          <div class="flex items-center justify-between px-4 pb-3 pt-1">
            <span class="text-xs inline-flex items-center gap-1.5 ${endpointOk ? 'text-emerald-600' : 'text-amber-500'}">
              ${endpointOk ? icon('zap') : icon('triangle-alert')}
              ${endpointOk ? 'IA connectada' : 'Configura VITE_API_CHATBOT_ENDPOINT al .env'}
            </span>
            <button
              id="chat-send-btn"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed elevation-1">
              ${icon('send')} Enviar
            </button>
          </div>
        </div>
      </div>

    </div>
  `

  return layout(content)
}

// ── Wire ──────────────────────────────────────────────────────────────────────
export function wireChatbotPage() {
  const serviceUrl = CHATBOT_ENDPOINT
  const conversationHistory: { role: string; content: string }[] = []

  const input      = document.getElementById('chat-input')     as HTMLTextAreaElement | null
  const sendBtn    = document.getElementById('chat-send-btn')  as HTMLButtonElement   | null
  const clearBtn   = document.getElementById('chat-clear-btn') as HTMLButtonElement   | null
  const messagesEl = document.getElementById('chat-messages')  as HTMLDivElement      | null
  const emptyEl    = document.getElementById('chatbot-empty')  as HTMLDivElement      | null
  const headerEl   = document.getElementById('chat-header')    as HTMLDivElement      | null
  const statusEl   = document.getElementById('chat-status')    as HTMLParagraphElement| null
  const promptsEl  = document.getElementById('quick-prompts')  as HTMLDivElement      | null

  // ── Helpers ────────────────────────────────────────────────────────────────

  function setStatus(text: string, type: 'info' | 'err' | 'success') {
    if (!statusEl) return
    statusEl.textContent = text
    statusEl.className = [
      'mb-2 text-sm text-center min-h-[1.25rem]',
      type === 'err'     ? 'text-red-600'     :
      type === 'success' ? 'text-emerald-600' : 'text-slate-500',
    ].join(' ')
  }

  function showChatMode() {
    emptyEl?.classList.add('hidden')
    promptsEl?.classList.add('hidden')
    messagesEl?.classList.remove('hidden')
    messagesEl?.classList.add('flex')
    headerEl?.classList.remove('hidden')
    headerEl?.classList.add('flex')
  }

  function scrollToBottom() {
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight
  }

  /**
   * Appends a chat bubble and returns it.
   * - user   → plain text, right-aligned
   * - assistant → markdown-rendered, left-aligned with avatar
   */
  function appendBubble(role: 'user' | 'assistant', text: string): HTMLElement {
    showChatMode()

    const wrapper = document.createElement('div')
    wrapper.className = role === 'user'
      ? 'flex justify-end'
      : 'flex justify-start items-end gap-2'

    if (role === 'assistant') {
      const avatar = document.createElement('div')
      avatar.className = 'grid place-items-center w-7 h-7 rounded-lg bg-brand-600 text-white shrink-0 icon-sm mb-0.5'
      avatar.innerHTML = '<i data-lucide="bot"></i>'
      wrapper.appendChild(avatar)
      import('../components/icons').then(({ hydrateIcons }) => hydrateIcons(avatar))
    }

    const bubble = document.createElement('div')
    bubble.className = role === 'user'
      ? 'max-w-[72%] bg-brand-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap'
      : 'chat-prose max-w-[72%] bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 text-sm elevation-1'

    if (role === 'user') {
      bubble.textContent = text
    } else if (text) {
      bubble.innerHTML = parseMarkdown(text)
    } else {
      // Loading dots — will be replaced once streaming starts
      bubble.innerHTML = `
        <span class="inline-flex items-center gap-1 text-slate-400 py-0.5">
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
      setStatus('Configura VITE_API_CHATBOT_ENDPOINT al fitxer .env i reinicia el servidor.', 'err')
      return
    }

    const message = input?.value.trim() ?? ''
    if (!message) return

    if (input)   input.value    = ''
    if (input)   input.disabled = true
    if (sendBtn) sendBtn.disabled = true
    setStatus('', 'info')

    appendBubble('user', message)
    const assistantBubble = appendBubble('assistant', '') // shows loading dots

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

      // SSE streaming
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
                // Clear the loading dots on first real content
                assistantBubble.innerHTML = ''
                started = true
              }
              fullReply += parsed.chunk
              assistantBubble.innerHTML = parseMarkdown(fullReply)
              scrollToBottom()
            }
          } catch { /* skip malformed lines */ }
        }
      }

      conversationHistory.push({ role: 'user',      content: message   })
      conversationHistory.push({ role: 'assistant',  content: fullReply })

    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      assistantBubble.innerHTML = ''
      assistantBubble.textContent = `Error: ${msg}`
      setStatus(`Error de connexió: ${msg}`, 'err')
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
    headerEl?.classList.add('hidden')
    headerEl?.classList.remove('flex')
    promptsEl?.classList.remove('hidden')
    setStatus('', 'info')
    input?.focus()
  }

  // ── Events ─────────────────────────────────────────────────────────────────

  sendBtn?.addEventListener('click', sendMessage)

  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  })

  document.querySelectorAll<HTMLButtonElement>('.quick-prompt').forEach((btn) => {
    btn.addEventListener('click', () => {
      const prompt = btn.dataset.prompt ?? btn.textContent?.trim() ?? ''
      if (input) input.value = prompt
      sendMessage()
    })
  })

  clearBtn?.addEventListener('click', clearConversation)
}
