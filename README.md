# Video Hunter — website

Static marketing site and downloader front end for
[myvideohunter.com](https://www.myvideohunter.com), a free video downloader for
X (Twitter), Reddit and Bluesky.

The API, the server-rendered video pages and the bots live in
[videohunter_api](https://github.com/victoraldir/videohunter_api).

## Stack

| | |
|---|---|
| Framework | Vue 3.5 with `<script setup lang="ts">` |
| Routing | Vue Router 4 |
| Build | Vite 8 + [vite-ssg](https://github.com/antfu/vite-ssg) |
| Language | TypeScript (strict) |
| Styling | Bootstrap 5.3, loaded from the CDN |

### Why SSG and not a plain SPA

The site is a marketing site that depends on organic search, so every URL has to
serve complete HTML to a crawler. `vite-ssg` prerenders each route at build
time and the app hydrates on top, which gives client-side navigation *and*
crawlable pages.

Routes are declared **without** the `.html` extension and vite-ssg emits flat
files (`/faq` → `dist/faq.html`), so the URLs that are already indexed, linked
and in the sitemap keep working unchanged. The `.html` form is also registered
as a router alias, so client-side navigation resolves either way.

## Layout

```
src/
  main.ts                     ViteSSG entry: creates the app, registers the service worker
  App.vue                     layout + every SEO tag, driven by route meta
  router/index.ts             one set of routes per locale, with their title/description/canonical/structured data
  views/                      one component per page
  components/                 SiteHeader, SiteFooter, VideoForm, FaqList, HowToSteps, PlatformLinks
  composables/useVideoDownload.ts   form state machine (validation, retries, typed errors)
  composables/useLocale.ts    the current locale and its copy
  services/                   typed clients for the download, config, auth and account APIs
  data/locales/locale.ts      locale primitives: the list, the URL helpers, hreflang alternates
  data/locales/types.ts       the Dictionary interface every language implements
  data/locales/{en,pt,es}.ts  the copy, one file per language
  data/routes.ts              the logical pages, shared by the router and the sitemap
  data/schema.ts              structured data builders
  data/site.ts                site constants (URL, Telegram bot)
public/                       icons, manifest, robots.txt, llms.txt, service worker
```

Content lives in `src/data/`, not in the templates: the FAQ accordion and its
`FAQPage` structured data are generated from the same list, and the three
platform pages are rendered by one view from the dictionary. That is deliberate
— the pages previously drifted apart and shipped contradictory copy.

## Languages

The site is published in English, Brazilian Portuguese and Spanish. English is
the default and stays at the root, because those URLs are already indexed; the
others live under a prefix (`/pt/faq.html`, `/es/...`).

- A page's logical path is the English one (`/faq.html`) and is shared by every
  locale. `localizedPath` turns it into a real URL for a given locale.
- `src/data/locales/{en,pt,es}.ts` each implement the same `Dictionary`
  interface, so a missing field is a type error rather than a blank string.
  English is the source; the other two mirror it.
- The router builds every route once per locale from that dictionary, so
  nothing about a page (title, description, canonical, structured data) can be
  translated in one place and forgotten in another.
- Each page gets `hreflang` alternates (including `x-default` pointing at
  English) and its own `<html lang>`. A language switcher in the header links to
  the same page in the other locales.
- `sitemap.xml` is generated at build time by a Vite plugin from the same page
  list and locale helpers, so it always matches the routes and carries the
  alternates. It is not committed.
- Locale follows the URL, never `Accept-Language`: a crawler and a visitor must
  see the same language at the same address, and CloudFront caches the pages.

The server-rendered video pages (`/prod/url/{id}`), which live in the API repo,
are still English only.


## Development

```bash
npm install
npm run dev          # dev server
npm run type-check   # vue-tsc
npm run build        # type-check + prerender to dist/
npm run preview      # serve the built output
```

Node 22 is required (Vite 8).

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`:

1. `npm ci` and `npm run build`
2. `aws s3 sync dist/ s3://videohunter-api-website-bucket/ --delete`
3. CloudFront invalidation

Authentication is GitHub OIDC — no long-lived keys. The role
(`videohunter-api-website-deploy`) is defined in the `videohunter_api` SAM
template and can only be assumed by this repository. It needs the repository
variables `AWS_DEPLOY_ROLE_ARN` and `CLOUDFRONT_DISTRIBUTION_ID`; until they
exist the deploy job is skipped, so pull requests only build.

## Conventions

- Every route declares its own `title`, `description`, `canonical` and
  `jsonld` in `src/router/index.ts`; `App.vue` applies them. A page cannot ship
  without metadata, and no two pages share a title or description. Routes are
  generated per locale, so the same holds for every language.
- Copy lives in `src/data/locales/`. When you add a page, add its strings to
  all three dictionaries: the `Dictionary` interface makes a missing or
  mistyped field a compile error. Never hardcode a user-facing string in a
  component.
- Keep copy in `src/data/` when it is reused, so the rendered text and the
  structured data cannot disagree.
- The service worker is network-first for HTML (deploys are visible
  immediately) and stale-while-revalidate for static assets.
