<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import { useAuth } from '@/composables/useAuth'
import { navLinks } from '@/data/site'

const route = useRoute()
const router = useRouter()
const { user, loginAvailable, refresh, syncSession, signOut } = useAuth()

// The header is on every page, so this is where the stored session is picked
// up on the first render in the browser.
onMounted(() => {
  void refresh()
})

// The header stays mounted while the app navigates, and signing in finishes
// with a navigation rather than a reload, so without this it would keep
// showing the state it had when the page loaded.
watch(() => route.fullPath, syncSession)

async function doSignOut(): Promise<void> {
  await signOut()

  // signOut navigates away when Cognito is configured; this covers the case
  // where it is not, so the header still reflects the signing out.
  await router.push('/')
}

/** Aliases are used for the indexed .html URLs, so match on either form. */
function isActive(to: string): boolean {
  return route.path === to || route.path === to.replace(/\.html$/, '')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light sticky-top shadow-sm">
    <div class="container-fluid">
      <RouterLink class="navbar-brand fw-bold" to="/">
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
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="siteNav" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" :class="{ active: route.path === '/' }" to="/">Home</RouterLink>
          </li>
          <li v-for="link in navLinks" :key="link.to" class="nav-item">
            <RouterLink class="nav-link" :class="{ active: isActive(link.to) }" :to="link.to">
              {{ link.label }}
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :class="{ active: isActive('/policy.html') }" to="/policy.html">
              Privacy Policy
            </RouterLink>
          </li>
        </ul>

        <!-- The account is optional, so nothing about it is shown until the
             API confirms that a login is configured. -->
        <ul class="navbar-nav mb-2 mb-lg-0">
          <template v-if="user">
            <li class="nav-item">
              <RouterLink class="nav-link" :class="{ active: isActive('/library.html') }" to="/library.html">
                Your library
              </RouterLink>
            </li>
            <li class="nav-item">
              <button class="btn btn-link nav-link" type="button" @click="doSignOut">Sign out</button>
            </li>
          </template>
          <li v-else-if="loginAvailable" class="nav-item">
            <RouterLink
              class="nav-link"
              :to="{ path: '/login.html', query: { return: route.fullPath } }"
            >
              Sign in
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
