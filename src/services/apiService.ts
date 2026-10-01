import { copy } from '@/composables/useLocale'
import type { PlatformId } from '@/data/routes'

export type DownloadErrorKind = 'invalidLink' | 'videoUnavailable' | 'serviceBusy' | 'network'

export interface DownloadError {
  kind: DownloadErrorKind
  message: string
}

export interface CreateVideoResponse {
  id: string
  original_id: string
  thumbnail_url: string
  description: string
  uri: string
}

const API_BASE_URL = 'https://www.myvideohunter.com/prod/url'

const SUPPORTED_HOSTS = [
  'twitter.com',
  'www.twitter.com',
  'x.com',
  'www.x.com',
  'reddit.com',
  'www.reddit.com',
  'old.reddit.com',
  'new.reddit.com',
  'bsky.app',
]

/** Detects the platform from a pasted link, or null when it is not supported. */
export function detectPlatform(rawUrl: string): PlatformId | null {
  const host = hostOf(rawUrl)
  if (!host) return null

  if (host.endsWith('twitter.com') || host.endsWith('x.com')) return 'x'
  if (host.endsWith('reddit.com')) return 'reddit'
  if (host.endsWith('bsky.app')) return 'bluesky'

  return null
}

export function isSupportedUrl(rawUrl: string): boolean {
  return detectPlatform(rawUrl) !== null
}

export function getDownloadLink(id: string): string {
  return `${API_BASE_URL}/${id}`
}

export async function postVideoUrl(videoUrl: string): Promise<CreateVideoResponse> {
  let response: Response

  try {
    response = await fetch(API_BASE_URL, {
      method: 'POST',
      body: JSON.stringify({ video_url: videoUrl }),
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    throw downloadError('network', copy().errors.network)
  }

  if (!response.ok) {
    throw await errorFromResponse(response)
  }

  return (await response.json()) as CreateVideoResponse
}

function hostOf(rawUrl: string): string | null {
  const trimmed = rawUrl.trim()
  if (!trimmed) return null

  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`

  try {
    const host = new URL(withScheme).hostname.toLowerCase()
    return SUPPORTED_HOSTS.includes(host) ? host : null
  } catch {
    return null
  }
}

// The API answers with {"message": "..."} for every failure and with a status
// code that says whether the link itself is the problem. The API writes in
// English, so its message is used when it has one; the fallbacks are localized.
async function errorFromResponse(response: Response): Promise<DownloadError> {
  const message = await messageOf(response)

  switch (response.status) {
    case 400:
      return downloadError('invalidLink', message ?? copy().errors.notSupported)
    case 404:
      return downloadError('videoUnavailable', message ?? copy().errors.noVideo)
    case 502:
    case 503:
      return downloadError('serviceBusy', message ?? copy().errors.serviceBusy)
    default:
      return downloadError('network', message ?? copy().errors.fetchFailed)
  }
}

async function messageOf(response: Response): Promise<string | null> {
  try {
    const body: unknown = await response.json()
    if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') {
      return body.message
    }
  } catch {
    // Not JSON: fall back to the status-based message.
  }

  return null
}

function downloadError(kind: DownloadErrorKind, message: string): DownloadError {
  return { kind, message }
}
