import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig, type Plugin } from 'vite'

import { alternates, defaultLocale, locales, localizedPath } from './src/data/locales/locale.ts'
import { publicPages } from './src/data/routes.ts'
import { siteUrl } from './src/data/site.ts'

/**
 * The sitemap is generated from the same page list the router uses, so a page
 * cannot be added to one and forgotten in the other. Every URL carries the
 * hreflang alternates of its translations, including x-default (English).
 */
function buildSitemap(): string {
  const urls = publicPages.flatMap((page) => {
    const alternatesXml = [
      ...alternates(page.path).map(
        (entry) =>
          `    <xhtml:link rel="alternate" hreflang="${entry.hreflang}" href="${siteUrl}${entry.href}" />`,
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${localizedPath(defaultLocale, page.path)}" />`,
    ].join('\n')

    return locales.map((locale) =>
      [
        '  <url>',
        `    <loc>${siteUrl}${localizedPath(locale, page.path)}</loc>`,
        alternatesXml,
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${page.priority}</priority>`,
        '  </url>',
      ].join('\n'),
    )
  })

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

/** Writes dist/sitemap.xml once the bundle and the public directory are in place. */
function sitemapPlugin(): Plugin {
  return {
    name: 'videohunter-sitemap',
    apply: 'build',
    closeBundle() {
      writeFileSync(resolve(process.cwd(), 'dist/sitemap.xml'), buildSitemap())
    },
  }
}

// The site is prerendered to static HTML by `vite-ssg build` (see package.json).
// Routes are declared without the .html extension and emitted as flat files, so
// the URLs that are already indexed keep working unchanged.
export default defineConfig({
  plugins: [vue(), sitemapPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Keep the output small and predictable for the CDN.
    cssCodeSplit: false,
    reportCompressedSize: false,
  },
})
