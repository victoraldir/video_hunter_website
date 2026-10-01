import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import {
  defaultLocale,
  dictionaries,
  localeFromPath,
  localizedPath,
  type Dictionary,
  type Locale,
} from '@/data/locales'

/**
 * The locale of the page being rendered. It follows the URL, never the browser:
 * a crawler and a visitor must see the same language for the same address.
 * App.vue keeps it in step; `useLocale` reads the route directly.
 */
const active = ref<Locale>(defaultLocale)

export function setLocale(locale: Locale): void {
  active.value = locale
}

/**
 * The copy for callers that are not components (the API client and the download
 * composable write user-facing messages too). Components should use `useLocale`,
 * which reads the locale from the current route.
 */
export function copy(): Dictionary {
  return dictionaries[active.value]
}

export function useLocale() {
  const route = useRoute()
  const locale = computed(() => localeFromPath(route.path))

  /** Turns a logical page path into the one for the current locale. */
  function localize(logicalPath: string): string {
    return localizedPath(locale.value, logicalPath)
  }

  return {
    locale,
    copy: computed(() => dictionaries[locale.value]),
    localize,
  }
}
