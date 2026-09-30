import type { RouteRecordRaw, RouterOptions } from 'vue-router'

import { faqEntries, faqJsonLd } from '@/data/faq'
import { platformList } from '@/data/platforms'
import { breadcrumbJsonLd, graph, howToJsonLd } from '@/data/schema'
import { siteUrl } from '@/data/site'

// Route metadata drives every SEO tag on the page (see src/App.vue), so each
// route declares its own title, description, canonical and structured data.
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
    canonical: string
    robots?: string
    jsonld?: Record<string, unknown>
  }
}

const telegramHowTo = [
  { name: 'Open the bot', text: 'Open @MyVideoHunterBot in Telegram and press Start.' },
  { name: 'Send a video link', text: 'Send the link to a post with a video from X (Twitter), Reddit or Bluesky.' },
  { name: 'Get your download link', text: 'The bot replies with a download link you can open on any device.' },
]

const telegramFaq = [
  {
    question: 'What is @MyVideoHunterBot?',
    answer:
      'It is the Telegram bot for Video Hunter. Send it a link to a post with a video from X (Twitter), Reddit or Bluesky and it replies with a download link.',
  },
  { question: 'Is the Video Hunter Telegram bot free?', answer: 'Yes, the bot is free and needs no registration.' },
  {
    question: 'Why did the bot not reply?',
    answer:
      'The bot can be busy or rate limited by the platform. Wait a moment and send the link again. Make sure the post is public and actually contains a video.',
  },
  {
    question: 'Does the bot store my videos?',
    answer:
      'No. Video Hunter streams videos directly from the platform\'s content delivery network and does not store them.',
  },
]

/**
 * Routes are declared without the .html extension so vite-ssg emits flat
 * files (dist/faq.html for /faq). The .html form is kept as an alias so the
 * URLs that are already indexed, linked and sitemapped keep resolving.
 */
const platformRoutes: RouteRecordRaw[] = platformList.map((page) => ({
  path: page.path.replace(/\.html$/, ''),
  alias: page.path,
  name: `platform-${page.key}`,
  component: () => import('@/views/PlatformDownloaderView.vue'),
  props: { platform: page.key },
  meta: {
    title: page.title,
    description: page.description,
    canonical: `${siteUrl}${page.path}`,
    jsonld: graph(
      breadcrumbJsonLd(page.heading, page.path),
      howToJsonLd(page.howToHeading, page.howTo),
      faqJsonLd(page.faq),
    ),
  },
}))

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Video Hunter — Free Video Downloader for X (Twitter), Reddit & Bluesky',
      description:
        'Download videos from X (Twitter), Reddit and Bluesky for free. Paste a video link and save it in HD in seconds — no signup, no watermark. Also available as a Telegram bot.',
      canonical: `${siteUrl}/`,
      jsonld: graph(
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: `${siteUrl}/`,
          name: 'Video Hunter',
          description: 'Free online video downloader for X (Twitter), Reddit and Bluesky.',
          inLanguage: 'en',
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${siteUrl}/#app`,
          name: 'Video Hunter',
          url: `${siteUrl}/`,
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'Any (web browser)',
          description:
            'Download videos from X (Twitter), Reddit and Bluesky. Paste a video link and save it in HD in seconds.',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          featureList: [
            'Download videos from X (Twitter)',
            'Download videos from Reddit',
            'Download videos from Bluesky',
            'Download videos through a Telegram bot',
          ],
          publisher: { '@type': 'Organization', name: 'Video Hunter', url: `${siteUrl}/` },
        },
      ),
    },
  },
  ...platformRoutes,
  {
    path: '/telegram-bot',
    alias: '/telegram-bot.html',
    name: 'telegram-bot',
    component: () => import('@/views/TelegramBotView.vue'),
    meta: {
      title: 'Video Hunter Telegram Bot — Download Videos in Chat | Video Hunter',
      description:
        'Send a video link to @MyVideoHunterBot on Telegram and get a download link back. Works with X (Twitter), Reddit and Bluesky. Free, no signup, right inside your chat app.',
      canonical: `${siteUrl}/telegram-bot.html`,
      jsonld: graph(
        breadcrumbJsonLd('Telegram bot', '/telegram-bot.html'),
        howToJsonLd('How to download a video with the Video Hunter Telegram bot', telegramHowTo),
        faqJsonLd(telegramFaq),
      ),
    },
  },
  {
    path: '/faq',
    alias: '/faq.html',
    name: 'faq',
    component: () => import('@/views/FaqView.vue'),
    meta: {
      title: 'Video Downloader FAQ — Video Hunter',
      description:
        'Frequently asked questions about downloading videos from X (Twitter), Reddit and Bluesky with Video Hunter: supported platforms, video quality, iOS saving, limits and privacy.',
      canonical: `${siteUrl}/faq.html`,
      jsonld: faqJsonLd(faqEntries),
    },
  },
  {
    path: '/policy',
    alias: '/policy.html',
    name: 'policy',
    component: () => import('@/views/PolicyView.vue'),
    meta: {
      title: 'Privacy Policy — Video Hunter',
      description:
        'How Video Hunter handles information when you download videos from X (Twitter), Reddit and Bluesky: log files, cookies, Google Analytics and Google AdSense advertising.',
      canonical: `${siteUrl}/policy.html`,
    },
  },
  {
    // Prerendered to dist/404.html, which CloudFront serves for missing keys
    // (see the 403 -> /404.html error mapping in the SAM template).
    path: '/404',
    name: 'not-found-page',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'Page not found — Video Hunter',
      description:
        'This page does not exist. Download videos from X (Twitter), Reddit and Bluesky from the Video Hunter home page.',
      canonical: `${siteUrl}/`,
      robots: 'noindex, follow',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'Page not found — Video Hunter',
      description:
        'This page does not exist. Download videos from X (Twitter), Reddit and Bluesky from the Video Hunter home page.',
      canonical: `${siteUrl}/`,
      robots: 'noindex, follow',
    },
  },
]

/**
 * Router options rather than a router instance: vite-ssg builds the router
 * itself, with a memory history while prerendering and the browser history in
 * the client. Creating the router here would break prerendering.
 */
export const routerOptions: Omit<RouterOptions, 'history'> = {
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
}

export default routerOptions
