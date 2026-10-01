/**
 * The account and chat widgets for the server rendered video pages.
 *
 * Those pages are HTML built by the Go API and cached at the edge for an hour,
 * so they are identical for everyone: everything that depends on who is
 * looking has to happen here, in the browser. The markup in the page is two
 * empty containers (see handlers/templates/getvideo.html) and this file fills
 * them in. If it fails to load, the page is exactly what it was before.
 *
 * There is no build step for this file: the video pages are served by the API,
 * not by the Vue app, so it is plain JavaScript that the static site ships as
 * an asset. The login logic is a small mirror of src/services/authService.ts;
 * keep the session key, the session shape and the PKCE flow in sync with it.
 */
(function () {
  'use strict'

  var CONFIG_URL = '/prod/config'
  var API_BASE = '/prod'
  /** Must match SESSION_KEY in src/services/authService.ts. */
  var SESSION_KEY = 'vh.auth.session'
  var REFRESH_MARGIN_SECONDS = 60
  var MAX_MESSAGE_LENGTH = 500
  var MAX_RECONNECT_ATTEMPTS = 5
  var RECONNECT_DELAY_MS = 3000

  var videoId = videoIdFromPath()
  var config = null
  var session = null
  var blocked = []
  var socket = null
  var reconnectAttempts = 0
  var messageNodes = {}

  start()

  async function start() {
    if (!videoId) return

    try {
      config = await loadConfig()
    } catch (error) {
      // The page is still a perfectly good downloader without any of this.
      return
    }

    session = readSession()

    renderSave()
    renderChat()
  }

  /** The video id is the last path segment of /prod/url/<id>. */
  function videoIdFromPath() {
    var segments = window.location.pathname.split('/').filter(Boolean)

    return segments.length > 0 ? segments[segments.length - 1] : ''
  }

  // ---------------------------------------------------------------------------
  // Session
  // ---------------------------------------------------------------------------

  async function loadConfig() {
    var response = await fetch(CONFIG_URL, { headers: { Accept: 'application/json' } })

    if (!response.ok) throw new Error('config unavailable')

    return response.json()
  }

  function readSession() {
    var raw = window.localStorage.getItem(SESSION_KEY)
    if (!raw) return null

    try {
      return JSON.parse(raw)
    } catch (error) {
      return null
    }
  }

  /**
   * The ID token to send, renewed with the refresh token if it is about to
   * expire. Returns null when there is no usable session.
   */
  async function idToken() {
    if (!session) return null

    var now = Math.floor(Date.now() / 1000)
    if (session.expiresAt - now > REFRESH_MARGIN_SECONDS) return session.idToken

    if (!session.refreshToken || !config || !config.cognito || !config.cognito.enabled) {
      forgetSession()
      return null
    }

    try {
      var body = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: config.cognito.client_id,
        refresh_token: session.refreshToken,
      })

      var response = await fetch(config.cognito.token_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })

      if (!response.ok) throw new Error('refresh rejected')

      var tokens = await response.json()
      session = {
        idToken: tokens.id_token,
        refreshToken: tokens.refresh_token || session.refreshToken,
        expiresAt: Math.floor(Date.now() / 1000) + (tokens.expires_in || 3600),
        user: session.user,
      }
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))

      return session.idToken
    } catch (error) {
      forgetSession()
      return null
    }
  }

  function forgetSession() {
    session = null
    window.localStorage.removeItem(SESSION_KEY)
  }

  function userName() {
    return session && session.user && session.user.name ? session.user.name : 'you'
  }

  function loginUrl() {
    return '/login.html?return=' + encodeURIComponent(window.location.pathname)
  }

  /** A small helper for the token protected endpoints. */
  async function api(path, options) {
    var token = await idToken()
    if (!token) throw new Error('signed out')

    var request = options || {}
    var headers = request.headers || {}
    headers.Authorization = 'Bearer ' + token

    if (request.body) headers['Content-Type'] = 'application/json'

    var response = await fetch(API_BASE + path, {
      method: request.method || 'GET',
      headers: headers,
      body: request.body,
    })

    if (response.status === 401) {
      forgetSession()
      throw new Error('signed out')
    }

    if (!response.ok) {
      throw new Error(await messageOf(response, 'Something went wrong. Please try again.'))
    }

    return response.status === 204 ? null : response.json()
  }

  async function messageOf(response, fallback) {
    try {
      var body = await response.json()
      return body && body.message ? body.message : fallback
    } catch (error) {
      return fallback
    }
  }

  // ---------------------------------------------------------------------------
  // Save to folder
  // ---------------------------------------------------------------------------

  function renderSave() {
    var host = document.getElementById('vh-save')
    if (!host) return

    if (!session) {
      if (!config || !config.cognito || !config.cognito.enabled) return

      host.appendChild(
        element('a', {
          class: 'btn btn-outline-secondary btn-sm',
          href: loginUrl(),
          text: 'Log in to save this video to a folder',
        }),
      )
      return
    }

    var button = element('button', {
      class: 'btn btn-outline-primary btn-sm',
      type: 'button',
      text: 'Save to folder',
    })

    var panel = element('div', { class: 'mt-2' })
    panel.hidden = true

    button.addEventListener('click', function () {
      panel.hidden = !panel.hidden
      if (!panel.hidden) showFolders(panel, button)
    })

    host.appendChild(button)
    host.appendChild(panel)
  }

  async function showFolders(panel, button) {
    panel.textContent = 'Loading your folders…'

    var folders
    try {
      var body = await api('/me/folders')
      folders = body.folders || []
    } catch (error) {
      panel.textContent = error.message === 'signed out' ? 'Please log in again.' : error.message
      return
    }

    panel.textContent = ''

    var select = element('select', { class: 'form-select form-select-sm d-inline-block w-auto' })
    select.appendChild(element('option', { value: '', text: 'Choose a folder…' }))

    folders.forEach(function (folder) {
      select.appendChild(element('option', { value: folder.id, text: folder.name }))
    })
    select.appendChild(element('option', { value: '__new', text: 'New folder…' }))

    var nameInput = element('input', {
      class: 'form-control form-control-sm d-inline-block w-auto',
      type: 'text',
      maxlength: '60',
      placeholder: 'Folder name',
    })
    nameInput.hidden = true

    var confirm = element('button', { class: 'btn btn-primary btn-sm', type: 'button', text: 'Save' })
    var status = element('p', { class: 'small text-muted mb-0 mt-1' })

    select.addEventListener('change', function () {
      nameInput.hidden = select.value !== '__new'
    })

    confirm.addEventListener('click', async function () {
      status.textContent = ''

      try {
        var folderId = select.value

        if (folderId === '__new') {
          var name = nameInput.value.trim()
          if (!name) {
            status.textContent = 'Give the folder a name first.'
            return
          }

          folderId = (await api('/me/folders', { method: 'POST', body: JSON.stringify({ name: name }) })).folder.id
        }

        if (!folderId) {
          status.textContent = 'Choose a folder first.'
          return
        }

        await api('/me/folders/' + encodeURIComponent(folderId) + '/videos', {
          method: 'POST',
          body: JSON.stringify({ video_id: videoId }),
        })

        button.textContent = 'Saved'
        panel.hidden = true
      } catch (error) {
        status.textContent = error.message === 'signed out' ? 'Please log in again.' : error.message
      }
    })

    panel.appendChild(select)
    panel.appendChild(nameInput)
    panel.appendChild(confirm)
    panel.appendChild(status)
  }

  // ---------------------------------------------------------------------------
  // Chat
  // ---------------------------------------------------------------------------

  function renderChat() {
    var host = document.getElementById('vh-chat')
    if (!host) return

    if (!session) {
      // Members only: nothing of the conversation is shown, not even read only.
      if (!config || !config.cognito || !config.cognito.enabled) return

      host.appendChild(element('h2', { class: 'h5', text: 'Chat about this video' }))
      host.appendChild(
        element('p', { class: 'text-muted', text: 'Log in to join the conversation on this video.' }),
      )
      host.appendChild(element('a', { class: 'btn btn-primary', href: loginUrl(), text: 'Log in to chat' }))
      return
    }

    if (!config.chat_ws_url) return

    host.appendChild(element('h2', { class: 'h5', text: 'Chat about this video' }))

    var status = element('p', { class: 'small text-muted' })
    status.textContent = 'Connecting…'

    var list = element('div', {
      class: 'border rounded p-2 mb-2',
      style: 'max-height: 320px; overflow-y: auto; background: #fff',
    })

    var form = element('form', { class: 'd-flex gap-2' })
    var input = element('input', {
      class: 'form-control',
      type: 'text',
      maxlength: String(MAX_MESSAGE_LENGTH),
      placeholder: 'Write a message',
      'aria-label': 'Write a message',
    })
    var send = element('button', { class: 'btn btn-primary', type: 'submit', text: 'Send' })

    form.appendChild(input)
    form.appendChild(send)

    var notice = element('p', { class: 'small mb-0 mt-1' })

    host.appendChild(status)
    host.appendChild(list)
    host.appendChild(form)
    host.appendChild(notice)

    form.addEventListener('submit', function (event) {
      event.preventDefault()

      var text = input.value.trim()
      if (!text) return

      notice.textContent = ''

      if (!post({ action: 'send', text: text })) {
        // The socket is not open yet, or it just dropped: keep what was typed.
        notice.textContent = 'Still connecting. Try sending again in a moment.'
        return
      }

      input.value = ''
    })

    loadBlocks()
    openSocket(list, status, notice)
  }

  async function loadBlocks() {
    try {
      var body = await api('/me/blocks')
      blocked = body.blocks || []
    } catch (error) {
      blocked = []
    }
  }

  async function openSocket(list, status, notice) {
    var token = await idToken()

    if (!token) {
      status.textContent = 'Your session has ended. Please log in again.'
      return
    }

    var url =
      config.chat_ws_url +
      '?videoId=' +
      encodeURIComponent(videoId) +
      '&Authorization=' +
      encodeURIComponent(token)

    socket = new WebSocket(url)

    socket.addEventListener('open', function () {
      reconnectAttempts = 0
      status.textContent = 'You are in the room as ' + userName() + '.'
      post({ action: 'recent' })
    })

    socket.addEventListener('message', function (event) {
      handleFrame(event.data, list, notice)
    })

    socket.addEventListener('close', function () {
      socket = null

      if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        status.textContent = 'The chat connection was lost. Reload the page to rejoin.'
        return
      }

      reconnectAttempts += 1
      status.textContent = 'Reconnecting…'

      window.setTimeout(function () {
        openSocket(list, status, notice)
      }, RECONNECT_DELAY_MS)
    })
  }

  /** Sends a room action. Returns false when the socket is not open. */
  function post(payload) {
    if (!socket || socket.readyState !== WebSocket.OPEN) return false

    socket.send(JSON.stringify(Object.assign({ video_id: videoId }, payload)))

    return true
  }

  function handleFrame(raw, list, notice) {
    var frame

    try {
      frame = JSON.parse(raw)
    } catch (error) {
      return
    }

    switch (frame.action) {
      case 'recent':
        list.textContent = ''
        messageNodes = {}
        ;(frame.messages || []).forEach(function (message) {
          appendMessage(list, message, frame.user_id)
        })
        if (!list.hasChildNodes()) {
          list.appendChild(
            element('p', { class: 'vh-empty text-muted small mb-0', text: 'No messages yet. Say hello.' }),
          )
        }
        break
      case 'message':
        appendMessage(list, frame.message, session.user.id)
        list.scrollTop = list.scrollHeight
        break
      case 'deleted':
        removeNode(frame.message_id)
        break
      case 'reported':
        notice.textContent = 'Thanks, that message was reported for review.'
        break
      case 'error':
        notice.textContent = frame.message
        break
    }
  }

  function appendMessage(list, message, ownUserId) {
    // Messages from a blocked account are simply not drawn. Blocking is about
    // what the reader sees, and it is stored server side so it travels.
    if (blocked.indexOf(message.user_id) !== -1) return

    // The "no messages yet" placeholder goes as soon as there is one.
    var empty = list.querySelector('.vh-empty')
    if (empty) empty.remove()

    var mine = message.user_id === ownUserId
    var row = element('div', { class: 'mb-2' })
    row.dataset.messageId = message.id
    row.dataset.userId = message.user_id

    var header = element('div', { class: 'small' })
    header.appendChild(element('strong', { text: mine ? 'You' : message.author }))
    header.appendChild(element('span', { class: 'text-muted ms-2', text: timeOf(message.created_at) }))

    var body = element('div', { text: message.text })

    row.appendChild(header)

    var actions = element('div', { class: 'd-flex justify-content-end gap-1' })

    if (mine) {
      var remove = element('button', { class: 'btn btn-sm btn-link text-danger p-0', type: 'button', text: 'Delete' })
      remove.addEventListener('click', function () {
        post({ action: 'delete', message_id: message.id })
      })
      actions.appendChild(remove)
    } else {
      var report = element('button', { class: 'btn btn-sm btn-link p-0', type: 'button', text: 'Report' })
      report.addEventListener('click', function () {
        post({ action: 'report', message_id: message.id })
        report.textContent = 'Reported'
        report.disabled = true
      })

      var block = element('button', { class: 'btn btn-sm btn-link text-danger p-0', type: 'button', text: 'Block' })
      block.addEventListener('click', async function () {
        try {
          await api('/me/blocks', { method: 'POST', body: JSON.stringify({ user_id: message.user_id }) })
          blocked.push(message.user_id)
          hideAuthor(message.user_id)
        } catch (error) {
          notice.textContent = 'We could not block that account. Please try again.'
        }
      })

      actions.appendChild(report)
      actions.appendChild(block)
    }

    row.appendChild(body)
    row.appendChild(actions)

    list.appendChild(row)
    messageNodes[message.id] = row
  }

  /** Removes every drawn message from an account that was just blocked. */
  function hideAuthor(userId) {
    Object.keys(messageNodes).forEach(function (id) {
      var node = messageNodes[id]

      if (node && node.dataset.userId === userId) {
        node.remove()
        delete messageNodes[id]
      }
    })
  }

  function removeNode(messageId) {
    var node = messageNodes[messageId]
    if (!node) return

    node.remove()
    delete messageNodes[messageId]
  }

  function timeOf(iso) {
    var date = new Date(iso)
    return isNaN(date.getTime()) ? '' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // ---------------------------------------------------------------------------
  // Small DOM helpers
  // ---------------------------------------------------------------------------

  function element(tag, attributes) {
    var node = document.createElement(tag)

    Object.keys(attributes || {}).forEach(function (key) {
      if (key === 'text') {
        // Always textContent: message bodies are written by strangers.
        node.textContent = attributes[key]
      } else {
        node.setAttribute(key, attributes[key])
      }
    })

    return node
  }
})()
