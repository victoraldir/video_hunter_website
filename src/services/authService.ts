import { loadConfig } from '@/services/configService'

/**
 * Where the Cognito hosted UI returns the browser. The same path is the
 * callback registered on the app client in template.yaml.
 */
export const CALLBACK_PATH = '/auth/callback.html'

/**
 * The signed in session. public/assets/video-page.js reads the same key on the
 * server rendered video pages: keep this key and the shape in sync with it.
 */
const SESSION_KEY = 'vh.auth.session'

/** Transient state for the redirect round trip: the PKCE verifier and the state. */
const PKCE_KEY = 'vh.auth.pkce'

/** Renew a minute early, so that a request never races the expiry. */
const REFRESH_MARGIN_SECONDS = 60

export interface AuthUser {
  id: string
  name: string
}

export interface AuthSession {
  idToken: string
  refreshToken: string
  expiresAt: number
  user: AuthUser
}

interface PkceState {
  verifier: string
  state: string
  returnPath: string
}

interface TokenResponse {
  id_token?: string
  refresh_token?: string
  expires_in?: number
}

/** Raised when a login cannot be started, completed or renewed. */
export class AuthError extends Error {}

/**
 * Sends the browser to the Cognito hosted UI. The password form, the email
 * verification and the password reset all live there, on AWS, so this site
 * never handles a password.
 */
export async function beginSignIn(returnPath: string): Promise<void> {
  const config = await loadConfig()

  if (!config.cognito.enabled) {
    throw new AuthError('Sign in is not available right now.')
  }

  const verifier = randomUrlSafeString(32)
  const state = randomUrlSafeString(16)

  // The return path travels inside the state, so it comes back verified along
  // with the code instead of being read from the query string.
  const pkce: PkceState = { verifier, state, returnPath }
  window.sessionStorage.setItem(PKCE_KEY, JSON.stringify(pkce))

  const url = new URL(config.cognito.authorize_url)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', config.cognito.client_id)
  url.searchParams.set('redirect_uri', redirectUri())
  url.searchParams.set('scope', 'openid email profile')
  url.searchParams.set('state', state)
  // Authorization code with PKCE: the public client has no secret, so the
  // verifier is what proves this browser started the flow.
  url.searchParams.set('code_challenge', await sha256Base64Url(verifier))
  url.searchParams.set('code_challenge_method', 'S256')

  window.location.assign(url.toString())
}

/**
 * Exchanges the code the hosted UI returned for tokens, stores the session and
 * returns the path the user was heading for before the login.
 */
export async function completeSignIn(): Promise<string> {
  const config = await loadConfig()
  const params = new URLSearchParams(window.location.search)

  const reported = params.get('error_description') ?? params.get('error')
  if (reported) throw new AuthError(reported)

  const code = params.get('code')
  const state = params.get('state')
  const pkce = readPkceState()

  // Single use, whatever happens next.
  window.sessionStorage.removeItem(PKCE_KEY)

  if (!code || !state || !pkce || pkce.state !== state) {
    throw new AuthError('That sign in response could not be verified. Please try again.')
  }

  const tokens = await requestTokens(config.cognito.token_url, {
    grant_type: 'authorization_code',
    client_id: config.cognito.client_id,
    code,
    redirect_uri: redirectUri(),
    code_verifier: pkce.verifier,
  })

  storeSession(tokens)

  return safeReturnPath(pkce.returnPath)
}

/** The stored session, without checking whether its token is still valid. */
export function authSession(): AuthSession | null {
  if (typeof window === 'undefined') return null

  const raw = window.localStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as AuthSession
  } catch {
    return null
  }
}

/**
 * The ID token to send to the API, renewed if it is about to expire. Returns
 * null when there is no usable session, and clears one that can no longer be
 * renewed.
 */
export async function validIdToken(): Promise<string | null> {
  const session = authSession()
  if (!session) return null

  const now = Math.floor(Date.now() / 1000)
  if (session.expiresAt - now > REFRESH_MARGIN_SECONDS) return session.idToken

  if (!session.refreshToken) {
    forgetSession()
    return null
  }

  const config = await loadConfig()
  if (!config.cognito.enabled) return null

  try {
    const tokens = await requestTokens(config.cognito.token_url, {
      grant_type: 'refresh_token',
      client_id: config.cognito.client_id,
      refresh_token: session.refreshToken,
    })

    return storeSession(tokens, session.refreshToken).idToken
  } catch {
    forgetSession()
    return null
  }
}

/** Clears the local session and ends it at Cognito too. */
export async function signOut(): Promise<void> {
  forgetSession()

  const config = await loadConfig()
  if (!config.cognito.enabled) return

  const url = new URL(config.cognito.logout_url)
  url.searchParams.set('client_id', config.cognito.client_id)
  url.searchParams.set('logout_uri', `${window.location.origin}/`)

  window.location.assign(url.toString())
}

function storeSession(tokens: TokenResponse, previousRefreshToken = ''): AuthSession {
  if (!tokens.id_token) {
    throw new AuthError('The sign in service did not return a token.')
  }

  const session: AuthSession = {
    idToken: tokens.id_token,
    // A refresh response does not repeat the refresh token, so the existing
    // one is carried over.
    refreshToken: tokens.refresh_token ?? previousRefreshToken,
    expiresAt: Math.floor(Date.now() / 1000) + (tokens.expires_in ?? 3600),
    user: decodeIdToken(tokens.id_token),
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))

  return session
}

/** Clears the local session without ending it at Cognito. */
export function forgetSession(): void {
  if (typeof window !== 'undefined') window.localStorage.removeItem(SESSION_KEY)
}

/**
 * Reads the display name out of the ID token. The token is not verified here:
 * it was issued to this browser by Cognito, and the API verifies it properly
 * on every request.
 */
function decodeIdToken(token: string): AuthUser {
  const payload = token.split('.')[1]
  if (!payload) throw new AuthError('The sign in service returned a malformed token.')

  const claims = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as {
    sub?: string
    name?: string
    email?: string
  }

  return {
    id: claims.sub ?? '',
    name: claims.name ?? claims.email?.split('@')[0] ?? 'You',
  }
}

function safeReturnPath(path: string): string {
  // Only same-site paths: a value that starts with // is another origin and a
  // redirect to it would be an open redirect.
  return path.startsWith('/') && !path.startsWith('//') ? path : '/library'
}

function redirectUri(): string {
  return `${window.location.origin}${CALLBACK_PATH}`
}

function readPkceState(): PkceState | null {
  const raw = window.sessionStorage.getItem(PKCE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as PkceState
  } catch {
    return null
  }
}

async function requestTokens(tokenUrl: string, body: Record<string, string>): Promise<TokenResponse> {
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(body).toString(),
  })

  if (!response.ok) {
    throw new AuthError('The sign in service rejected the request.')
  }

  return (await response.json()) as TokenResponse
}

function randomUrlSafeString(bytes: number): string {
  const buffer = new Uint8Array(bytes)
  window.crypto.getRandomValues(buffer)

  return base64Url(buffer)
}

async function sha256Base64Url(value: string): Promise<string> {
  const digest = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))

  return base64Url(new Uint8Array(digest))
}

function base64Url(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)

  return window.btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '')
}

function base64UrlToBytes(value: string): Uint8Array {
  const base64 = value.replaceAll('-', '+').replaceAll('_', '/')
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')

  return Uint8Array.from(window.atob(padded), (character) => character.charCodeAt(0))
}
