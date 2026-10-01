<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import { useAuth } from '@/composables/useAuth'
import { useLocale } from '@/composables/useLocale'
import { locales, localizedPath, navItems, pagePaths, type Locale } from '@/data/locales'

const route = useRoute()
const router = useRouter()
const { user, loginAvailable, refresh, syncSession, signOut } = useAuth()
const { locale, copy, localize } = useLocale()

/** The links are shown in their own language: that is what a visitor looks for. */
const languageNames: Record<Locale, string> = { en: 'English', pt: 'Português', es: 'Español' }

const links = computed(() => navItems(copy.value))

// The header is on every page, so this is where the stored session is picked
// up on the first render in the browser.
onMounted(() => {
  void refresh()
})

// The header stays mounted while the app navigates, and signing in finishes
// with a navigation rather than a reload, so without this it would keep
// showing the state it had when the page loaded. The collapsed menu is closed
// here for the same reason: its links navigate on the client, so on a phone
// nothing else would ever close it and the panel would stay open over the page
// the visitor just asked for.
watch(
  () => route.fullPath,
  () => {
    syncSession()
    closeMobileMenu()
  },
)

/** Aliases are used for the indexed .html URLs, so match on either form. */
function isActive(logicalPath: string): boolean {
  const target = localize(logicalPath)

  return route.path === target || route.path === target.replace(/\.html$/, '')
}

/** The same page, in another language. */
function nextLocalePath(next: Locale): string {
  return localizedPath(next, route.meta.logicalPath ?? pagePaths.home)
}

/**
 * The navbar collapse is Bootstrap's, and Bootstrap is loaded from a CDN rather
 * than imported, so the only handle on it is the global it installs.
 */
interface BootstrapGlobal {
  Collapse?: {
    getInstance(element: Element): { hide(): void } | null
  }
}

/**
 * Closes the collapsed menu after a navigation. Bootstrap opens and closes the
 * panel only when the toggler is clicked, and the menu links navigate on the
 * client without a reload, so on a phone the panel otherwise stays open over
 * the page the visitor asked for.
 */
function closeMobileMenu(): void {
  if (typeof window === 'undefined') return

  // On a wide screen the panel is laid out by `navbar-expand-lg` and never
  // carries `show`, so this is a no-op there.
  const nav = document.getElementById('siteNav')
  if (!nav?.classList.contains('show')) return

  const bootstrap = (window as unknown as { bootstrap?: BootstrapGlobal }).bootstrap
  bootstrap?.Collapse?.getInstance(nav)?.hide()
}

async function doSignOut(): Promise<void> {
  await signOut()

  // signOut navigates away when Cognito is configured; this covers the case
  // where it is not, so the header still reflects the signing out.
  await router.push(localize(pagePaths.home))
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light sticky-top shadow-sm">
    <div class="container-fluid">
      <RouterLink class="navbar-brand fw-bold" :to="localize(pagePaths.home)">
        <img
          src="/assets/favicon-32x32.png"
          alt=""
          width="30"
          height="30"
          class="d-inline-block align-text-top me-2"
        />
        Video Hunter
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#siteNav"
        aria-controls="siteNav"
        aria-expanded="false"
        :aria-label="copy.nav.toggleNavigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="siteNav" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: route.path === localize(pagePaths.home) }"
              :to="localize(pagePaths.home)"
            >
              {{ copy.nav.home }}
            </RouterLink>
          </li>
          <li v-for="link in links" :key="link.path" class="nav-item">
            <RouterLink class="nav-link" :class="{ active: isActive(link.path) }" :to="localize(link.path)">
              {{ link.label }}
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive(pagePaths.policy) }"
              :to="localize(pagePaths.policy)"
            >
              {{ copy.nav.policy }}
            </RouterLink>
          </li>
        </ul>

        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <button
              class="btn btn-link nav-link dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              :aria-label="copy.nav.language"
            >
              {{ locale.toUpperCase() }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li v-for="option in locales" :key="option">
                <RouterLink
                  class="dropdown-item"
                  :class="{ active: option === locale }"
                  :hreflang="option"
                  :to="nextLocalePath(option)"
                >
                  {{ languageNames[option] }}
                </RouterLink>
              </li>
            </ul>
          </li>

          <!-- The account is optional, so nothing about it is shown until the
               API confirms that a login is configured. -->
          <template v-if="user">
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                :class="{ active: isActive(pagePaths.library) }"
                :to="localize(pagePaths.library)"
              >
                {{ copy.nav.library }}
              </RouterLink>
            </li>
            <li class="nav-item">
              <button class="btn btn-link nav-link" type="button" @click="doSignOut">{{ copy.nav.signOut }}</button>
            </li>
          </template>
          <!-- No return path: the login page falls back to the library, which
               is where a fresh session is actually useful. The video pages are
               not part of this app and pass their own path, so signing in from
               one of those still comes back to the video. -->
          <li v-else-if="loginAvailable" class="nav-item">
            <RouterLink class="nav-link" :to="localize(pagePaths.login)">
              {{ copy.nav.signIn }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
