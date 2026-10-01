import { ref } from 'vue'

import { authSession, beginSignIn, signOut as endSession, type AuthUser } from '@/services/authService'
import { loadConfig } from '@/services/configService'

// Shared by every component that cares: the header, the login page and the
// library. A module level ref is the whole state store.
const user = ref<AuthUser | null>(null)
const loginAvailable = ref(false)
const ready = ref(false)

/**
 * The account state of the browser. The login is optional, so `loginAvailable`
 * is what decides whether any of it is offered: when the API says Cognito is
 * not configured, the site renders exactly as it did before accounts existed.
 */
export function useAuth() {
  /** Reads the stored session, and asks the API whether a login is offered. */
  async function refresh(): Promise<void> {
    user.value = authSession()?.user ?? null

    const config = await loadConfig()
    loginAvailable.value = config.cognito.enabled
    ready.value = true
  }

  async function signIn(returnPath: string): Promise<void> {
    await beginSignIn(returnPath)
  }

  async function signOut(): Promise<void> {
    user.value = null
    await endSession()
  }

  return { user, loginAvailable, ready, refresh, signIn, signOut }
}
