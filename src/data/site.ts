export const siteUrl = 'https://www.myvideohunter.com'

export const telegramBotUrl = 'https://t.me/MyVideoHunterBot'

export interface NavLink {
  label: string
  to: string
}

/** The nav is shared by every page so no page becomes a dead end. */
export const navLinks: NavLink[] = [
  { label: 'X (Twitter)', to: '/x-video-downloader.html' },
  { label: 'Reddit', to: '/reddit-video-downloader.html' },
  { label: 'Bluesky', to: '/bluesky-video-downloader.html' },
  { label: 'Telegram bot', to: '/telegram-bot.html' },
  { label: 'FAQ', to: '/faq.html' },
]

export const platforms = {
  twitter: 'X (Twitter)',
  reddit: 'Reddit',
  bluesky: 'Bluesky',
} as const

export type PlatformName = (typeof platforms)[keyof typeof platforms]
