import type { FaqEntry } from '@/data/faq'
import type { HowToStep } from '@/data/schema'

export type PlatformKey = 'x' | 'reddit' | 'bluesky'

export interface PlatformPage {
  key: PlatformKey
  /** Platform name as it appears in copy and headings. */
  name: string
  /** Indexed URL of this page (kept as .html, see the router). */
  path: string
  title: string
  description: string
  heading: string
  lead: string
  /** One-line summary for the cards on the home page. */
  blurb: string
  howToHeading: string
  howTo: HowToStep[]
  faq: FaqEntry[]
  /** Notes rendered under the steps. */
  note: string
}

/**
 * Content for the platform landing pages. The router reads this to build each
 * page's SEO metadata and the view reads it to render, so a page's copy and its
 * structured data cannot drift apart.
 */
export const platformPages: Record<PlatformKey, PlatformPage> = {
  x: {
    key: 'x',
    name: 'X (Twitter)',
    path: '/x-video-downloader.html',
    title: 'X (Twitter) Video Downloader — Save Videos in HD | Video Hunter',
    description:
      'Download videos from X (Twitter) for free. Paste the post link and save the video in HD to your phone or computer — no signup, no watermark, no app needed.',
    heading: 'X (Twitter) Video Downloader',
    lead: 'Paste the link to an X post and save the video in HD. Free, no signup, no watermark.',
    blurb: 'Save videos from posts and threads on x.com and twitter.com.',
    howToHeading: 'How to download a video from X (Twitter)',
    howTo: [
      { name: 'Copy the post link', text: 'Open the post with the video on X and copy its link (tap Share, then Copy link).' },
      { name: 'Paste the link', text: 'Paste the link into the box above and click Download.' },
      { name: 'Pick a quality', text: 'Video Hunter finds the video and lists every available quality.' },
      { name: 'Save it', text: 'Click the quality you want and the video is saved to your device.' },
    ],
    faq: [
      {
        platform: 'X (Twitter)',
        question: 'Can I download videos from X (Twitter) for free?',
        answer: 'Yes. Video Hunter downloads videos from X for free, with no account and no watermark.',
      },
      {
        platform: 'X (Twitter)',
        question: 'Do I need the X app or an account to download a video?',
        answer: 'No. You only need the link to the post. Video Hunter fetches the video for you, so you do not need to log in to X.',
      },
      {
        platform: 'X (Twitter)',
        question: 'Which video quality can I get from X?',
        answer: 'Whatever X provides for that video, usually from 480p up to 1080p or the original resolution.',
      },
      {
        platform: 'X (Twitter)',
        question: 'Why can\'t I download a specific X video?',
        answer: 'The post may have been deleted, the account may be private, or the video may be restricted in your region. Images and GIFs cannot be downloaded, only videos.',
      },
      {
        platform: 'X (Twitter)',
        question: 'How do I save an X video on an iPhone?',
        answer: 'Tap and hold the download button and choose Download Linked File, or use a file manager such as Documents by Readdle to save the video.',
      },
    ],
    note: 'Both x.com and twitter.com links work, including links to posts inside a thread or a quote tweet.',
  },
  reddit: {
    key: 'reddit',
    name: 'Reddit',
    path: '/reddit-video-downloader.html',
    title: 'Reddit Video Downloader — Save Videos with Sound | Video Hunter',
    description:
      'Download Reddit videos for free, with sound. Paste the post link and save the MP4 to your phone or computer — no signup, no watermark.',
    heading: 'Reddit Video Downloader',
    lead: 'Paste the link to a Reddit post and save the video with sound. Free, no signup, no watermark.',
    blurb: 'Download Reddit videos with their audio, from reddit.com or old.reddit.com.',
    howToHeading: 'How to download a video from Reddit',
    howTo: [
      { name: 'Copy the post link', text: 'Open the Reddit post with the video and copy its link (tap Share, then Copy link).' },
      { name: 'Paste the link', text: 'Paste the link into the box above and click Download.' },
      { name: 'Wait for the file', text: 'Video Hunter returns the video file, with its audio.' },
      { name: 'Save it', text: 'Click download and the video is saved to your device.' },
    ],
    faq: [
      {
        platform: 'Reddit',
        question: 'Can I download Reddit videos with sound?',
        answer: 'Yes. Reddit keeps video and audio in separate streams, and Video Hunter serves them combined so the file you download plays with sound.',
      },
      {
        platform: 'Reddit',
        question: 'Which Reddit links are supported?',
        answer: 'Links from reddit.com and old.reddit.com work, including posts shared from the Reddit mobile app. Only public posts can be downloaded.',
      },
      {
        platform: 'Reddit',
        question: 'Why did a video download without audio?',
        answer: 'That usually means the HLS playlist was saved instead of the combined MP4. Use the download button on this page rather than saving the stream directly.',
      },
      {
        platform: 'Reddit',
        question: 'Can I download from private subreddits?',
        answer: 'No, only public posts can be downloaded.',
      },
    ],
    note: 'Reddit serves the same post from reddit.com, old.reddit.com and www.reddit.com; all three are accepted, and share links from the app are resolved automatically.',
  },
  bluesky: {
    key: 'bluesky',
    name: 'Bluesky',
    path: '/bluesky-video-downloader.html',
    title: 'Bluesky Video Downloader — Save bsky Videos Free | Video Hunter',
    description:
      'Download videos from Bluesky (bsky) for free. Paste the post link and save the video to your phone or computer — no signup, no watermark, no app needed.',
    heading: 'Bluesky Video Downloader',
    lead: 'Paste a bsky.app post link and save the video. Free, no signup, no watermark.',
    blurb: 'Grab videos from bsky.app posts, on desktop or mobile.',
    howToHeading: 'How to download a video from Bluesky',
    howTo: [
      { name: 'Copy the post link', text: 'Open the Bluesky post with the video and copy its link (tap Share, then Copy link).' },
      { name: 'Paste the link', text: 'Paste the bsky.app link into the box above and click Download.' },
      { name: 'Wait for the file', text: 'Video Hunter fetches the video from Bluesky.' },
      { name: 'Save it', text: 'Click download and the video is saved to your device.' },
    ],
    faq: [
      {
        platform: 'Bluesky',
        question: 'Can I download Bluesky videos for free?',
        answer: 'Yes. Video Hunter downloads videos from Bluesky for free, with no account and no watermark.',
      },
      {
        platform: 'Bluesky',
        question: 'Do I need a Bluesky account to download a video?',
        answer: 'No. You only need the link to a public post, so you can download videos without logging in to Bluesky.',
      },
      {
        platform: 'Bluesky',
        question: 'Which Bluesky links are supported?',
        answer: 'Links in the form bsky.app/profile/handle/post/id are supported, including posts from accounts on custom domains and posts shared from the Bluesky app.',
      },
      {
        platform: 'Bluesky',
        question: 'Why does a Bluesky video fail to download?',
        answer: 'The post may have been deleted, the account may have been taken down, or the post may not contain a video. Only posts with a video attachment can be downloaded.',
      },
    ],
    note: 'Bluesky links look like https://bsky.app/profile/handle/post/id.',
  },
}

export const platformList: PlatformPage[] = Object.values(platformPages)
