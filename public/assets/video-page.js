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
  /** The user id this browser writes under, as stated by the room. */
  var ownUserId = ''
  /** Whether the panel is open, so re-rendering does not close it under the reader. */
  var chatOpen = false
  /** Set by renderChat, so the Escape key can close the current panel. */
  var setChatOpen = null

  start()

  // The panel behaves like a dialog, so Escape closes it. Registered once, at
  // load; it reaches whatever panel is on screen through setChatOpen.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && chatOpen && setChatOpen) setChatOpen(false)
  })

  async function start() {
    if (!videoId) return

    try {
      config = await loadConfig()
    } catch (error) {
      // The page is still a perfectly good downloader without any of this.
      return
    }

    session = readSession()

    renderAccount()
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

  /**
   * Clears the local session and ends it at Cognito too, the same way the site
   * header does, so signing out here does not leave a usable session behind.
   */
  function signOut() {
    forgetSession()

    if (!config || !config.cognito || !config.cognito.enabled) {
      window.location.reload()
      return
    }

    var url = new URL(config.cognito.logout_url)
    url.searchParams.set('client_id', config.cognito.client_id)
    url.searchParams.set('logout_uri', window.location.origin + '/')

    window.location.assign(url.toString())
  }

  function loginUrl() {
    return '/login.html?return=' + encodeURIComponent(window.location.pathname)
  }

  // ---------------------------------------------------------------------------
  // Account links
  // ---------------------------------------------------------------------------

  /**
   * Fills in the account end of the navbar. The page is cached and identical
   * for everyone, so the signed out link is in the HTML and this only replaces
   * it once a session is known to exist. The link gets the way back to this
   * video, which the cached HTML cannot know.
   */
  function renderAccount() {
    var host = document.getElementById('vh-account')
    if (!host) return

    var login = document.getElementById('vh-login')
    if (login) login.setAttribute('href', loginUrl())

    if (!session || !config || !config.cognito || !config.cognito.enabled) return

    host.textContent = ''

    var library = element('li', { class: 'nav-item' })
    library.appendChild(element('a', { class: 'nav-link', href: '/library.html', text: 'Your library' }))

    var exit = element('li', { class: 'nav-item' })
    var button = element('button', { class: 'btn btn-link nav-link', type: 'button', text: 'Sign out' })
    button.addEventListener('click', signOut)
    exit.appendChild(button)

    host.appendChild(library)
    host.appendChild(exit)
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

  /**
   * Draws the room as a panel hanging off a button in the corner, rather than
   * as a section in the flow of the page. The flow on a video page belongs to
   * the download buttons and the ad units, and a chat sitting below both of
   * them is one nobody scrolls far enough to find. Nothing here moves the ads,
   * which is what the page is paid on.
   *
   * Everyone gets to read the room; the composer only appears for a signed in
   * visitor, and a guest gets the login prompt in its place.
   */
  function renderChat() {
    var host = document.getElementById('vh-chat')
    if (!host) return

    if (!config || !config.chat_ws_url) return

    // Re-reading the session matters when this is called again after a token
    // was refused: the same visitor comes back as a guest.
    session = readSession()

    host.textContent = ''

    var status = element('p', { class: 'small text-muted mb-2' })
    status.textContent = session ? 'Connecting…' : 'Everyone can read this room. Log in to join in.'

    var list = element('div', {
      class: 'border rounded p-2 mb-2',
      style: 'flex: 1 1 auto; min-height: 9rem; overflow-y: auto; background: #fff',
    })

    var notice = element('p', { class: 'small mb-0 mt-1' })

    var header = element('div', { class: 'd-flex align-items-center justify-content-between mb-2' })
    header.appendChild(element('h2', { class: 'h6 mb-0', text: 'Chat about this video' }))

    var close = element('button', {
      class: 'btn btn-sm btn-link text-muted p-0 text-decoration-none',
      type: 'button',
      'aria-label': 'Close the chat',
      text: '\u2715',
    })
    header.appendChild(close)

    var panel = element('div', {
      id: 'vh-chat-panel',
      role: 'dialog',
      'aria-label': 'Chat about this video',
      // Fixed, so the panel cannot push the download buttons or the ads around,
      // and so it stays within reach wherever the reader has scrolled to. The
      // z-index is below the 1050 of the download overlay, so that overlay still
      // covers the chat while a download is being prepared.
      style:
        'position: fixed; right: 16px; bottom: 88px; z-index: 1040;' +
        ' width: min(360px, calc(100vw - 32px)); max-height: min(70vh, 520px);' +
        ' display: flex; flex-direction: column; background: #fff;' +
        ' border: 1px solid #dee2e6; border-radius: 0.5rem; padding: 0.75rem;' +
        ' box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2)',
    })
    // Display is set directly rather than through the `hidden` attribute: the
    // panel carries an inline `display: flex`, which outranks the `[hidden]`
    // rule unless Bootstrap's reboot marks it important.
    panel.style.display = chatOpen ? 'flex' : 'none'

    panel.appendChild(header)
    panel.appendChild(status)
    panel.appendChild(list)

    if (session && config.cognito && config.cognito.enabled) {
      panel.appendChild(composer(notice))
      loadBlocks()
    } else {
      panel.appendChild(loginPrompt())
    }

    panel.appendChild(notice)

    var launcher = element('button', {
      class: 'btn btn-primary rounded-circle shadow',
      type: 'button',
      'aria-controls': 'vh-chat-panel',
      'aria-expanded': String(chatOpen),
      'aria-label': 'Open the chat about this video',
      style:
        'position: fixed; right: 16px; bottom: 16px; z-index: 1040;' +
        ' width: 3.5rem; height: 3.5rem;' +
        ' display: flex; align-items: center; justify-content: center',
    })
    launcher.appendChild(chatIcon())

    host.appendChild(panel)
    host.appendChild(launcher)

    /** Opens or closes the panel, keeping the button and the keyboard in step. */
    function setOpen(open) {
      chatOpen = open
      panel.style.display = open ? 'flex' : 'none'
      launcher.setAttribute('aria-expanded', String(open))

      if (!open) return

      list.scrollTop = list.scrollHeight

      var input = panel.querySelector('input')
      if (input) input.focus()
    }

    // This render is now the one the Escape key and the buttons drive.
    setChatOpen = setOpen

    close.addEventListener('click', function () {
      setOpen(false)
      launcher.focus()
    })

    launcher.addEventListener('click', function () {
      setOpen(!chatOpen)
    })

    openSocket(list, status, notice)
  }

  function composer(notice) {
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

    return form
  }

  function loginPrompt() {
    var row = element('div', { class: 'd-flex align-items-center gap-2' })

    row.appendChild(element('p', { class: 'text-muted mb-0', text: 'Log in to post a message.' }))
    row.appendChild(element('a', { class: 'btn btn-primary btn-sm', href: loginUrl(), text: 'Log in' }))

    return row
  }

  /**
   * The speech bubble on the launcher. Drawn rather than loaded: the video page
   * carries no icon font, and a second request for one button is not worth it.
   * The two paths are Bootstrap Icons' chat-dots, which matches the icons the
   * rest of the site gets from that set.
   */
  function chatIcon() {
    var ns = 'http://www.w3.org/2000/svg'
    var svg = document.createElementNS(ns, 'svg')

    svg.setAttribute('viewBox', '0 0 16 16')
    svg.setAttribute('width', '22')
    svg.setAttribute('height', '22')
    svg.setAttribute('fill', 'currentColor')
    svg.setAttribute('aria-hidden', 'true')

    var paths = [
      'M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2',
      'm2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2',
    ]

    paths.forEach(function (d) {
      var path = document.createElementNS(ns, 'path')
      path.setAttribute('d', d)
      svg.appendChild(path)
    })

    return svg
  }

  async function loadBlocks() {
    try {
      var body = await api('/me/blocks')
      blocked = body.blocks || []
    } catch (error) {
      blocked = []
    }
  }

  /**
   * Opens the room. The token is optional: without one the API attaches the
   * socket as a guest, which may read but not write.
   */
  async function openSocket(list, status, notice) {
    var token = session ? await idToken() : null
    var attemptedWithToken = Boolean(token)

    var url = config.chat_ws_url + '?videoId=' + encodeURIComponent(videoId)
    if (token) url += '&Authorization=' + encodeURIComponent(token)

    var opened = false

    socket = new WebSocket(url)

    socket.addEventListener('open', function () {
      opened = true
      reconnectAttempts = 0

      if (!session) status.textContent = 'You are watching as a guest. Log in to post.'

      post({ action: 'recent' })
    })

    socket.addEventListener('message', function (event) {
      handleFrame(event.data, list, status, notice)
    })

    socket.addEventListener('close', function () {
      socket = null

      if (attemptedWithToken && !opened) {
        // The API refused the token, so the session is no longer usable.
        // Retrying with it would loop forever: come back as a guest instead.
        forgetSession()
        renderAccount()
        renderChat()
        return
      }

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

  function handleFrame(raw, list, status, notice) {
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

        // The room states the user id this connection is known by, so the
        // browser never has to trust its own copy of the session. It is empty
        // for a guest, which is what makes nothing look like their own.
        ownUserId = frame.user_id || ''

        ;(frame.messages || []).forEach(function (message) {
          appendMessage(list, message, notice)
        })
        if (!list.hasChildNodes()) {
          list.appendChild(
            element('p', { class: 'vh-empty text-muted small mb-0', text: 'No messages yet. Say hello.' }),
          )
        }
        // The name this connection writes under is the generated nickname,
        // never anything taken from the account.
        if (session && frame.nickname) {
          status.textContent = 'You are in the room as ' + frame.nickname + '.'
        }
        break
      case 'message':
        appendMessage(list, frame.message, notice)
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

  function appendMessage(list, message, notice) {
    // Messages from a blocked account are simply not drawn. Blocking is about
    // what the reader sees, and it is stored server side so it travels.
    if (blocked.indexOf(message.user_id) !== -1) return

    // The "no messages yet" placeholder goes as soon as there is one.
    var empty = list.querySelector('.vh-empty')
    if (empty) empty.remove()

    var mine = ownUserId !== '' && message.user_id === ownUserId
    var row = element('div', { class: 'mb-2' })
    row.dataset.messageId = message.id
    row.dataset.userId = message.user_id

    var header = element('div', { class: 'small' })
    header.appendChild(element('strong', { text: mine ? 'You' : message.author }))
    header.appendChild(element('span', { class: 'text-muted ms-2', text: timeOf(message.created_at) }))

    var body = element('div', { text: message.text })

    row.appendChild(header)

    // A guest reads everything and acts on nothing: deleting, reporting and
    // blocking all belong to an account.
    if (session) {
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
    } else {
      row.appendChild(body)
    }

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
