export interface FaqEntry {
  question: string
  answer: string
  /** Platform this question belongs to, or undefined for the general list. */
  platform?: 'X (Twitter)' | 'Reddit' | 'Bluesky'
}

/**
 * One source for the FAQ: the accordion on the FAQ page and the FAQPage
 * structured data are both generated from this list, so they cannot drift
 * apart.
 */
export const faqEntries: FaqEntry[] = [
  {
    question: 'How do I download a video from X (Twitter), Reddit or Bluesky?',
    answer:
      'Copy the link to the post that contains the video, paste it into the box on the Video Hunter home page and click Download. Video Hunter finds the video and shows a download button for each quality the platform offers.',
  },
  {
    question: 'Is Video Hunter free?',
    answer:
      'Yes. Video Hunter is free and you need no account to download a video. Videos are streamed directly from the platforms\' content delivery networks and are not stored on our servers.',
  },
  {
    question: 'Do I need an account to use Video Hunter?',
    answer:
      'No. Downloading works with no account and no signup, and always will. An optional free account only adds two things: keeping the videos you find in folders, and posting in the chat on a video page. You can sign in with an email address or a Google account, and you can delete the account, and everything in it, whenever you want.',
  },
  {
    question: 'How does the chat on a video page work?',
    answer:
      'Every video page has a chat room about that video, and anyone can read it. Posting needs a free account, which is what keeps the room from filling with spam. You write under a nickname that is generated for you, never your email address, and you can change it from your library. You can delete your own messages, report a message, or block an account so you stop seeing what they write.',
  },
  {
    question: 'Can I download videos with a Telegram bot instead?',
    answer:
      'Yes. Send the video link to @MyVideoHunterBot on Telegram and the bot replies with a download link.',
  },
  {
    question: 'I am not able to save files to my iPhone or iPad. What should I do?',
    answer:
      'iOS Safari often opens the video in a player instead of saving it. Tap and hold the download button and choose Download Linked File, or use a file manager such as Documents by Readdle to save the video to your device.',
  },
  {
    question: 'What should I do if the video plays instead of downloading?',
    answer:
      'On mobile, tap and hold the video until the download options appear. On desktop, right-click the video and select Save link as.',
  },
  {
    question: 'Where are the files I downloaded stored?',
    answer: "Downloaded videos are stored in your device's default download folder.",
  },
  {
    question: 'Why can\'t I download a specific video?',
    answer:
      'The post may have been deleted, the account may be private, or the video may be restricted in your region. Only videos are supported: images and GIFs cannot be downloaded.',
  },
  {
    question: 'Is there a daily download limit?',
    answer:
      'There is no download limit on the website. The Telegram bot and the X reply bots may throttle responses during busy periods.',
  },
  {
    question: 'Does Video Hunter store the videos I download?',
    answer:
      'No. Video Hunter does not store videos on its servers. It is a proxy that streams the video straight from the platform\'s content delivery network.',
  },
  {
    question: 'Which video qualities can I download?',
    answer:
      'Whatever the platform provides, usually from 480p up to 1080p or the original resolution. Video Hunter lists one download button per available quality.',
  },
]

export function faqFor(platform?: FaqEntry['platform']): FaqEntry[] {
  if (!platform) return faqEntries
  return faqEntries.filter((entry) => !entry.platform || entry.platform === platform)
}

/** Builds the FAQPage structured data from the same source as the accordion. */
export function faqJsonLd(entries: FaqEntry[] = faqEntries): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  }
}
