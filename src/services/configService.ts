import { siteUrl } from '@/data/site'

const CONFIG_URL = `${siteUrl}/prod/config`

export interface CognitoConfig {
  enabled: boolean
  client_id: string
  authorize_url: string
  token_url: string
  logout_url: string
}

export interface PublicConfig {
  cognito: CognitoConfig
  chat_ws_url: string
}

/**
 * What the site falls back to when it cannot reach the API. The login and the
 * chat are then simply not offered, which is the same as they did not exist:
 * the downloader never depends on the configuration.
 */
const UNAVAILABLE: PublicConfig = {
  cognito: { enabled: false, client_id: '', authorize_url: '', token_url: '', logout_url: '' },
  chat_ws_url: '',
}

let pending: Promise<PublicConfig> | null = null

/**
 * The login and chat endpoints belong to the deployed stack, not to this
 * repository, so they are read from the API and cached for the session. That
 * keeps the site free of build time configuration that could drift from the
 * infrastructure it talks to.
 */
export function loadConfig(): Promise<PublicConfig> {
  if (!pending) {
    pending = fetch(CONFIG_URL)
      .then((response) => (response.ok ? (response.json() as Promise<PublicConfig>) : UNAVAILABLE))
      .catch(() => UNAVAILABLE)
  }

  return pending
}
