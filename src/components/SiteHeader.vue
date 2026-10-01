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
// showing the state it had when the page loaded.
watch(() => route.fullPath, syncSession)

/** Aliases are used for the indexed .html URLs, so match on either form. */
function isActive(logicalPath: string): boolean {
  const target = localize(logicalPath)

  return route.path === target || route.path === target.replace(/\.html$/, '')
}

/** The same page, in another language. */
function nextLocalePath(next: Locale): string {
  return localizedPath(next, route.meta.logicalPath ?? pagePaths.home)
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
          <li v-else-if="loginAvailable" class="nav-item">
            <RouterLink
              class="nav-link"
              :to="{ path: localize(pagePaths.login), query: { return: route.fullPath } }"
            >
              {{ copy.nav.signIn }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
