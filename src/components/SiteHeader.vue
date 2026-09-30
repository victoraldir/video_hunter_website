<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

import { navLinks } from '@/data/site'

const route = useRoute()

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
      </div>
    </div>
  </nav>
</template>
