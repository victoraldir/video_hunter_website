<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { useAuth } from '@/composables/useAuth'
import { getDownloadLink } from '@/services/apiService'
import {
  AccountError,
  NotSignedInError,
  createFolder,
  deleteFolder,
  listBlocks,
  listFolders,
  removeVideo,
  renameFolder,
  unblockUser,
  type Folder,
  type SavedVideo,
} from '@/services/accountService'

const route = useRoute()
const { user, loginAvailable, ready, refresh } = useAuth()

const folders = ref<Folder[]>([])
const blocks = ref<string[]>([])
const loading = ref(false)
const busy = ref(false)
const error = ref('')

const newFolderName = ref('')
const renamingId = ref('')
const renameValue = ref('')

onMounted(async () => {
  await refresh()

  if (user.value) await load()
})

async function load(): Promise<void> {
  loading.value = true
  error.value = ''

  try {
    folders.value = await listFolders()
    blocks.value = await listBlocks()
  } catch (failure) {
    handle(failure)
  } finally {
    loading.value = false
  }
}

/** Turns a service failure into something the page can show. */
function handle(failure: unknown): void {
  if (failure instanceof NotSignedInError) {
    user.value = null
    error.value = 'Your session has ended. Please sign in again.'
    return
  }

  if (failure instanceof AccountError && failure.message) {
    error.value = failure.message
    return
  }

  error.value = 'Something went wrong. Please try again.'
}

async function addFolder(): Promise<void> {
  const name = newFolderName.value.trim()
  if (!name || busy.value) return

  busy.value = true
  error.value = ''

  try {
    folders.value = [...folders.value, await createFolder(name)]
    newFolderName.value = ''
  } catch (failure) {
    handle(failure)
  } finally {
    busy.value = false
  }
}

function startRename(folder: Folder): void {
  renamingId.value = folder.id
  renameValue.value = folder.name
}

async function confirmRename(folder: Folder): Promise<void> {
  const name = renameValue.value.trim()
  if (!name) return

  try {
    await renameFolder(folder.id, name)
    folder.name = name
    renamingId.value = ''
  } catch (failure) {
    handle(failure)
  }
}

async function removeFolder(folder: Folder): Promise<void> {
  if (!window.confirm(`Delete "${folder.name}" and the videos saved in it?`)) return

  try {
    await deleteFolder(folder.id)
    folders.value = folders.value.filter((entry) => entry.id !== folder.id)
  } catch (failure) {
    handle(failure)
  }
}

async function removeSaved(folder: Folder, video: SavedVideo): Promise<void> {
  try {
    await removeVideo(folder.id, video.video_id)
    folder.videos = folder.videos.filter((entry) => entry.video_id !== video.video_id)
  } catch (failure) {
    handle(failure)
  }
}

async function unblock(userId: string): Promise<void> {
  try {
    await unblockUser(userId)
    blocks.value = blocks.value.filter((entry) => entry !== userId)
  } catch (failure) {
    handle(failure)
  }
}

function videoTitle(video: SavedVideo): string {
  const description = video.description?.trim()

  return description ? description : 'Video'
}

function videoPage(video: SavedVideo): string {
  return getDownloadLink(video.video_id)
}
</script>

<template>
  <div class="container py-5">
    <h1 class="mb-4">Your library</h1>

    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

    <div v-if="!user" class="row">
      <div class="col-lg-7">
        <p class="lead">Sign in to keep the videos you find, organised in folders you choose.</p>
        <p v-if="ready && !loginAvailable" class="text-muted">
          Signing in is not available right now. You can still download videos from the
          <RouterLink to="/">home page</RouterLink>.
        </p>
        <RouterLink
          v-else
          class="btn btn-primary"
          :to="{ path: '/login.html', query: { return: route.path } }"
        >
          Sign in
        </RouterLink>
      </div>
    </div>

    <div v-else>
      <p v-if="loading" class="text-muted">Loading your folders…</p>

      <form class="row g-2 mb-4" @submit.prevent="addFolder">
        <div class="col-sm-6">
          <label class="visually-hidden" for="new-folder">New folder name</label>
          <input
            id="new-folder"
            v-model="newFolderName"
            class="form-control"
            type="text"
            maxlength="60"
            placeholder="New folder name"
          />
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-primary" type="submit" :disabled="busy || !newFolderName.trim()">
            Create folder
          </button>
        </div>
      </form>

      <p v-if="!loading && folders.length === 0" class="text-muted">
        You have no folders yet. Create one, then use the <strong>Save to folder</strong> button on any video page.
      </p>

      <section v-for="folder in folders" :key="folder.id" class="card mb-4">
        <div class="card-body">
          <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
            <template v-if="renamingId === folder.id">
              <input
                v-model="renameValue"
                class="form-control form-control-sm w-auto"
                type="text"
                maxlength="60"
                @keyup.enter="confirmRename(folder)"
              />
              <button class="btn btn-sm btn-primary" type="button" @click="confirmRename(folder)">Save</button>
              <button class="btn btn-sm btn-link" type="button" @click="renamingId = ''">Cancel</button>
            </template>
            <template v-else>
              <h2 class="h5 mb-0">{{ folder.name }}</h2>
              <span class="text-muted small">{{ folder.videos.length }} saved</span>
              <button class="btn btn-sm btn-link ms-auto" type="button" @click="startRename(folder)">Rename</button>
              <button class="btn btn-sm btn-link text-danger" type="button" @click="removeFolder(folder)">Delete</button>
            </template>
          </div>

          <p v-if="folder.videos.length === 0" class="text-muted mb-0">Nothing saved here yet.</p>

          <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
            <div v-for="video in folder.videos" :key="video.video_id" class="col">
              <div class="card h-100">
                <img
                  v-if="video.thumbnail_url"
                  :src="video.thumbnail_url"
                  class="card-img-top"
                  style="height: 120px; object-fit: cover"
                  loading="lazy"
                  alt=""
                />
                <div class="card-body d-flex flex-column">
                  <p class="card-text small flex-grow-1">{{ videoTitle(video) }}</p>
                  <div class="d-flex gap-2">
                    <a class="btn btn-sm btn-primary" :href="videoPage(video)">Open</a>
                    <button class="btn btn-sm btn-outline-danger" type="button" @click="removeSaved(folder, video)">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="blocks.length > 0">
        <h2 class="h5">Blocked in chat</h2>
        <p class="text-muted small">
          You no longer see messages from these accounts in any chat room. Blocking only affects what you see.
        </p>
        <ul class="list-inline">
          <li v-for="blocked in blocks" :key="blocked" class="list-inline-item">
            <span class="badge text-bg-secondary">{{ blocked }}</span>
            <button class="btn btn-sm btn-link" type="button" @click="unblock(blocked)">Unblock</button>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
