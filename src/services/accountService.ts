import { siteUrl } from '@/data/site'
import { validIdToken } from '@/services/authService'

export interface SavedVideo {
  video_id: string
  saved_at: string
  thumbnail_url?: string
  description?: string
}

export interface Folder {
  id: string
  name: string
  created_at: string
  videos: SavedVideo[]
}

/** The request was rejected because there is no usable session. */
export class NotSignedInError extends Error {}

/** Anything else, carrying the message the API wrote for the user. */
export class AccountError extends Error {}

/**
 * The account API. Every call carries the ID token, and the API answers 401
 * when it is missing or expired, which the library page turns into a prompt to
 * log in again.
 */
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await validIdToken()
  if (!token) throw new NotSignedInError()

  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${token}`)
  if (init.body) headers.set('Content-Type', 'application/json')

  let response: Response

  try {
    response = await fetch(`${siteUrl}/prod${path}`, { ...init, headers })
  } catch {
    throw new AccountError('Unable to connect. Check your connection and try again.')
  }

  if (response.status === 401) throw new NotSignedInError()
  if (!response.ok) throw new AccountError(await messageOf(response))
  if (response.status === 204) return undefined as T

  return (await response.json()) as T
}

async function messageOf(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json()
    if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') {
      return body.message
    }
  } catch {
    // Not JSON: fall back to a generic message below.
  }

  return 'Something went wrong. Please try again.'
}

export async function listFolders(): Promise<Folder[]> {
  const body = await request<{ folders: Folder[] }>('/me/folders')

  return body.folders
}

export async function createFolder(name: string): Promise<Folder> {
  const body = await request<{ folder: Folder }>('/me/folders', {
    method: 'POST',
    body: JSON.stringify({ name }),
  })

  return body.folder
}

export function renameFolder(folderId: string, name: string): Promise<void> {
  return request(`/me/folders/${encodeURIComponent(folderId)}`, {
    method: 'PATCH',
    body: JSON.stringify({ name }),
  })
}

export function deleteFolder(folderId: string): Promise<void> {
  return request(`/me/folders/${encodeURIComponent(folderId)}`, { method: 'DELETE' })
}

export function saveVideo(folderId: string, videoId: string): Promise<void> {
  return request(`/me/folders/${encodeURIComponent(folderId)}/videos`, {
    method: 'POST',
    body: JSON.stringify({ video_id: videoId }),
  })
}

export function removeVideo(folderId: string, videoId: string): Promise<void> {
  return request(
    `/me/folders/${encodeURIComponent(folderId)}/videos/${encodeURIComponent(videoId)}`,
    { method: 'DELETE' },
  )
}

export async function listBlocks(): Promise<string[]> {
  const body = await request<{ blocks: string[] }>('/me/blocks')

  return body.blocks
}

export function blockUser(userId: string): Promise<void> {
  return request('/me/blocks', { method: 'POST', body: JSON.stringify({ user_id: userId }) })
}

export function unblockUser(userId: string): Promise<void> {
  return request(`/me/blocks/${encodeURIComponent(userId)}`, { method: 'DELETE' })
}
