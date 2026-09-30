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
  router/index.ts             routes and their title/description/canonical/structured data
  views/                      one component per page
  components/                 SiteHeader, SiteFooter, VideoForm, FaqList, HowToSteps, PlatformLinks
  composables/useVideoDownload.ts   form state machine (validation, retries, typed errors)
  services/apiService.ts      typed client for the download API
  data/                       content: FAQ entries, platform pages, schema builders, site constants
public/                       icons, manifest, robots.txt, sitemap.xml, llms.txt, service worker
```

Content lives in `src/data/`, not in the templates: the FAQ accordion and its
`FAQPage` structured data are generated from the same list, and the three
platform pages are rendered by one view from `data/platforms.ts`. That is
deliberate — the pages previously drifted apart and shipped contradictory copy.

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
  without metadata, and no two pages share a title or description.
- Keep copy in `src/data/` when it is reused, so the rendered text and the
  structured data cannot disagree.
- The service worker is network-first for HTML (deploys are visible
  immediately) and stale-while-revalidate for static assets.
