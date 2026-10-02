import type { Dictionary } from '@/data/locales/types'

/** English is the source language: every other dictionary mirrors this one. */
export const en: Dictionary = {
  locale: 'en',
  siteName: 'Video Hunter',
  telegramHandle: '@MyVideoHunterBot',

  nav: {
    home: 'Home',
    telegram: 'Telegram bot',
    faq: 'FAQ',
    policy: 'Privacy Policy',
    library: 'Your library',
    signIn: 'Sign in',
    signOut: 'Sign out',
    language: 'Language',
    toggleNavigation: 'Toggle navigation',
  },

  footer: {
    copyright: '© {year} Video Hunter. All rights reserved.',
    telegram: 'Telegram',
  },

  form: {
    placeholder: 'Paste a video link (X, Reddit, Bluesky)',
    videoUrlLabel: 'Video URL',
    download: 'Download',
    processing: 'Processing your request, please wait…',
    linkDetected: '{platform} link detected',
    checkLink: 'Check the link:',
    sorry: 'Sorry:',
    close: 'Close',
  },

  howTo: {
    fallbackHeading: 'How it works',
  },

  platformLinks: {
    heading: 'Download videos from other platforms',
    lead: 'Video Hunter also downloads videos from:',
    note: "Please make sure you have the right to download the content you save. Video Hunter streams videos directly from the platform's content delivery network and does not store them.",
  },

  platformPage: {
    faqHeading: 'Frequently asked questions about {platform} videos',
  },

  errors: {
    invalidLink: 'Please enter a valid link to a post from X (Twitter), Reddit or Bluesky.',
    notSupported: 'That link is not supported. Paste a link from X, Reddit or Bluesky.',
    noVideo: 'That post has no downloadable video. It may have been deleted, or it may not be a video.',
    serviceBusy: 'The platform is not responding right now. Please try again in a moment.',
    fetchFailed: 'Something went wrong while fetching the video. Please try again.',
    unexpectedResponse: 'Unexpected response from the server. Please try again.',
    downloadReady: 'Your download is ready — opening it now.',
    network: 'Unable to connect to the server. Check your connection and try again.',
  },

  auth: {
    unavailable: 'Sign in is not available right now.',
    unverified: 'That sign in response could not be verified. Please try again.',
    noToken: 'The sign in service did not return a token.',
    malformedToken: 'The sign in service returned a malformed token.',
    rejected: 'The sign in service rejected the request.',
    displayNameFallback: 'You',
  },

  common: {
    backToDownloader: 'Back to the downloader',
    signInUnavailable: {
      before: 'Signing in is not available right now. You can still download videos from the ',
      link: 'home page',
      after: '.',
    },
  },

  home: {
    seo: {
      title: 'Video Hunter — Free Video Downloader for X (Twitter), Reddit & Bluesky',
      description:
        'Download videos from X (Twitter), Reddit and Bluesky for free. Paste a video link and save it in HD in seconds — no signup, no watermark. Also available as a Telegram bot.',
    },
    websiteDescription: 'Free online video downloader for X (Twitter), Reddit and Bluesky.',
    appDescription:
      'Download videos from X (Twitter), Reddit and Bluesky. Paste a video link and save it in HD in seconds.',
    featureList: [
      'Download videos from X (Twitter)',
      'Download videos from Reddit',
      'Download videos from Bluesky',
      'Download videos through a Telegram bot',
    ],
    heroTitle: 'Free Video Downloader for X (Twitter), Reddit & Bluesky',
    heroLead: 'Easily save videos from X (Twitter), Reddit and Bluesky. Paste the link, click download, done.',
    aboutTitle: 'Seamless Video Downloads from X, Reddit & Bluesky',
    aboutBodyBefore:
      'Tired of not being able to save videos from your favourite platforms? ',
    aboutBodyAfter:
      ' provides a simple and fast solution to download videos from X (formerly Twitter), Reddit, and Bluesky (bsky) directly to your computer or mobile device. Grab the video link, paste it into our downloader, and save your video in moments.',
    legalNote:
      'Note: Video Hunter respects content creators. All videos are streamed directly from the respective content delivery networks. Please ensure you have the right to download the content.',
    stepsTitle: 'Simple Steps to Download Your Videos',
    steps: [
      { name: 'Find your video', text: 'Navigate to the video on X, Reddit or Bluesky.' },
      { name: 'Copy the URL', text: "Copy the video's URL from your browser or the share menu." },
      { name: 'Paste and download', text: 'Paste the link into Video Hunter and click Download.' },
      { name: 'Save it', text: 'Your video is processed and ready to save in moments.' },
    ],
    platformsTitle: 'Supported platforms',
    preferChatting: {
      before: 'Prefer chatting? Send links to the ',
      link: 'Video Hunter Telegram bot',
      after: ' instead.',
    },
    telegramTitle: 'Prefer Telegram? Use Our Video Hunter Bot!',
    telegramLead: {
      before: 'For ultimate convenience, send video links directly to our ',
      link: 'MyVideoHunterBot',
      after: " on Telegram. It's a quick and easy way to download videos on the go, right from your chat app.",
    },
    imageAltAbout: 'Illustration of the Video Hunter video downloading process',
    imageAltTelegram: 'Telegram bot for downloading videos with Video Hunter',
  },

  platforms: {
    x: {
      name: 'X (Twitter)',
      seo: {
        title: 'X (Twitter) Video Downloader — Save Videos in HD | Video Hunter',
        description:
          'Download videos from X (Twitter) for free. Paste the post link and save the video in HD to your phone or computer — no signup, no watermark, no app needed.',
      },
      heading: 'X (Twitter) Video Downloader',
      lead: 'Paste the link to an X post and save the video in HD. Free, no signup, no watermark.',
      blurb: 'Save videos from posts and threads on x.com and twitter.com.',
      howToHeading: 'How to download a video from X (Twitter)',
      howTo: [
        {
          name: 'Copy the post link',
          text: 'Open the post with the video on X and copy its link (tap Share, then Copy link).',
        },
        { name: 'Paste the link', text: 'Paste the link into the box above and click Download.' },
        { name: 'Pick a quality', text: 'Video Hunter finds the video and lists every available quality.' },
        { name: 'Save it', text: 'Click the quality you want and the video is saved to your device.' },
      ],
      faq: [
        {
          platform: 'x',
          question: 'Can I download videos from X (Twitter) for free?',
          answer: 'Yes. Video Hunter downloads videos from X for free, with no account and no watermark.',
        },
        {
          platform: 'x',
          question: 'Do I need the X app or an account to download a video?',
          answer:
            'No. You only need the link to the post. Video Hunter fetches the video for you, so you do not need to log in to X.',
        },
        {
          platform: 'x',
          question: 'Which video quality can I get from X?',
          answer: 'Whatever X provides for that video, usually from 480p up to 1080p or the original resolution.',
        },
        {
          platform: 'x',
          question: "Why can't I download a specific X video?",
          answer:
            'The post may have been deleted, the account may be private, or the video may be restricted in your region. Images and GIFs cannot be downloaded, only videos.',
        },
        {
          platform: 'x',
          question: 'How do I save an X video on an iPhone?',
          answer:
            'Tap and hold the download button and choose Download Linked File, or use a file manager such as Documents by Readdle to save the video.',
        },
      ],
      note: 'Both x.com and twitter.com links work, including links to posts inside a thread or a quote tweet.',
    },
    reddit: {
      name: 'Reddit',
      seo: {
        title: 'Reddit Video Downloader — Save Videos with Sound | Video Hunter',
        description:
          'Download Reddit videos for free, with sound. Paste the post link and save the MP4 to your phone or computer — no signup, no watermark.',
      },
      heading: 'Reddit Video Downloader',
      lead: 'Paste the link to a Reddit post and save the video with sound. Free, no signup, no watermark.',
      blurb: 'Download Reddit videos with their audio, from reddit.com or old.reddit.com.',
      howToHeading: 'How to download a video from Reddit',
      howTo: [
        {
          name: 'Copy the post link',
          text: 'Open the Reddit post with the video and copy its link (tap Share, then Copy link).',
        },
        { name: 'Paste the link', text: 'Paste the link into the box above and click Download.' },
        { name: 'Wait for the file', text: 'Video Hunter returns the video file, with its audio.' },
        { name: 'Save it', text: 'Click download and the video is saved to your device.' },
      ],
      faq: [
        {
          platform: 'reddit',
          question: 'Can I download Reddit videos with sound?',
          answer:
            'Yes. Reddit keeps video and audio in separate streams, and Video Hunter serves them combined so the file you download plays with sound.',
        },
        {
          platform: 'reddit',
          question: 'Which Reddit links are supported?',
          answer:
            'Links from reddit.com and old.reddit.com work, including posts shared from the Reddit mobile app. Only public posts can be downloaded.',
        },
        {
          platform: 'reddit',
          question: 'Why did a video download without audio?',
          answer:
            'That usually means the HLS playlist was saved instead of the combined MP4. Use the download button on this page rather than saving the stream directly.',
        },
        {
          platform: 'reddit',
          question: 'Can I download from private subreddits?',
          answer: 'No, only public posts can be downloaded.',
        },
      ],
      note: 'Reddit serves the same post from reddit.com, old.reddit.com and www.reddit.com; all three are accepted, and share links from the app are resolved automatically.',
    },
    bluesky: {
      name: 'Bluesky',
      seo: {
        title: 'Bluesky Video Downloader — Save bsky Videos Free | Video Hunter',
        description:
          'Download videos from Bluesky (bsky) for free. Paste the post link and save the video to your phone or computer — no signup, no watermark, no app needed.',
      },
      heading: 'Bluesky Video Downloader',
      lead: 'Paste a bsky.app post link and save the video. Free, no signup, no watermark.',
      blurb: 'Grab videos from bsky.app posts, on desktop or mobile.',
      howToHeading: 'How to download a video from Bluesky',
      howTo: [
        {
          name: 'Copy the post link',
          text: 'Open the Bluesky post with the video and copy its link (tap Share, then Copy link).',
        },
        { name: 'Paste the link', text: 'Paste the bsky.app link into the box above and click Download.' },
        { name: 'Wait for the file', text: 'Video Hunter fetches the video from Bluesky.' },
        { name: 'Save it', text: 'Click download and the video is saved to your device.' },
      ],
      faq: [
        {
          platform: 'bluesky',
          question: 'Can I download Bluesky videos for free?',
          answer: 'Yes. Video Hunter downloads videos from Bluesky for free, with no account and no watermark.',
        },
        {
          platform: 'bluesky',
          question: 'Do I need a Bluesky account to download a video?',
          answer:
            'No. You only need the link to a public post, so you can download videos without logging in to Bluesky.',
        },
        {
          platform: 'bluesky',
          question: 'Which Bluesky links are supported?',
          answer:
            'Links in the form bsky.app/profile/handle/post/id are supported, including posts from accounts on custom domains and posts shared from the Bluesky app.',
        },
        {
          platform: 'bluesky',
          question: 'Why does a Bluesky video fail to download?',
          answer:
            'The post may have been deleted, the account may have been taken down, or the post may not contain a video. Only posts with a video attachment can be downloaded.',
        },
      ],
      note: 'Bluesky links look like https://bsky.app/profile/handle/post/id.',
    },
  },

  telegram: {
    seo: {
      title: 'Video Hunter Telegram Bot — Download Videos in Chat | Video Hunter',
      description:
        'Send a video link to @MyVideoHunterBot on Telegram and get a download link back. Works with X (Twitter), Reddit and Bluesky. Free, no signup, right inside your chat app.',
    },
    heading: 'Video Hunter Telegram Bot',
    lead: 'Send a video link in Telegram and get a download link back. No app to install, no signup.',
    openBot: 'Open @MyVideoHunterBot',
    howToHeading: 'How to download videos with the bot',
    howTo: [
      { name: 'Open the bot', text: 'Open @MyVideoHunterBot in Telegram and press Start.' },
      {
        name: 'Send a video link',
        text: 'Send the link to a post with a video from X (Twitter), Reddit or Bluesky.',
      },
      {
        name: 'Get your download link',
        text: 'The bot replies with a download link you can open on any device.',
      },
    ],
    worksOn: 'It works in the Telegram app on iOS, Android, desktop and in the web client.',
    faqHeading: 'Frequently asked questions about the bot',
    faq: [
      { question: 'Is the bot free?', answer: 'Yes, and it needs no registration.' },
      {
        question: 'Which platforms does it support?',
        answer: 'X (Twitter), Reddit and Bluesky — the same platforms as the website.',
      },
      {
        question: 'Why did the bot not reply?',
        answer:
          'It can be busy or rate limited by the platform. Wait a moment and send the link again, and make sure the post is public and contains a video.',
      },
      {
        question: 'Does the bot store my videos?',
        answer:
          "No. Videos are streamed directly from the platform's content delivery network and are not stored on our servers.",
      },
    ],
    preferTitle: 'Prefer the website?',
    preferLead: {
      before: 'You can also paste a link directly on the ',
      link: 'Video Hunter home page',
      after: ', or use a dedicated page for your platform:',
    },
  },

  faq: {
    seo: {
      title: 'Video Downloader FAQ — Video Hunter',
      description:
        'Frequently asked questions about downloading videos from X (Twitter), Reddit and Bluesky with Video Hunter: supported platforms, video quality, iOS saving, limits and privacy.',
    },
    heading: 'Frequently Asked Questions',
    lead: {
      before:
        'Everything you need to know about downloading videos with Video Hunter. Still stuck? ',
      homeLink: 'Paste a link on the home page',
      between: ' or message ',
      after: ' on Telegram.',
    },
    entries: [
      {
        question: 'How do I download a video from X (Twitter), Reddit or Bluesky?',
        answer:
          'Copy the link to the post that contains the video, paste it into the box on the Video Hunter home page and click Download. Video Hunter finds the video and shows a download button for each quality the platform offers.',
      },
      {
        question: 'Is Video Hunter free?',
        answer:
          "Yes. Video Hunter is free and you need no account to download a video. Videos are streamed directly from the platforms' content delivery networks and are not stored on our servers.",
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
        answer: 'Yes. Send the video link to @MyVideoHunterBot on Telegram and the bot replies with a download link.',
      },
      {
        question: 'How do I save or share a video on iPhone or iPad?',
        answer:
          'The download buttons on the video page open the video in the iOS player, and its Share button saves the video to Photos or shares it to any app in one tap. Prefer a file? Use the "Save to Files" link under the buttons and the video is saved to the Downloads folder of the Files app.',
      },
      {
        question: "Why does nothing happen when I tap download inside the X (Twitter) app?",
        answer:
          'X, Instagram, Facebook, TikTok and Telegram open links in their own in-app browsers, and those browsers block file downloads, so the tap is ignored. Open this site in Safari or Chrome and download there: when a video page is opened inside an app it shows a notice with a button to copy the page link.',
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
        question: "Why can't I download a specific video?",
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
          "No. Video Hunter does not store videos on its servers. It is a proxy that streams the video straight from the platform's content delivery network.",
      },
      {
        question: 'Which video qualities can I download?',
        answer:
          'Whatever the platform provides, usually from 480p up to 1080p or the original resolution. Video Hunter lists one download button per available quality.',
      },
    ],
    legalNote:
      'Please make sure you have the right to download the content you save. Video Hunter respects content creators.',
  },

  policy: {
    seo: {
      title: 'Privacy Policy — Video Hunter',
      description:
        'How Video Hunter handles information when you download videos from X (Twitter), Reddit and Bluesky: log files, cookies, Google Analytics, Google AdSense, and the optional account and chat data if you sign in.',
    },
    heading: 'Privacy Policy',
    updated: 'Last updated: October 2026',
    intro:
      'Video Hunter (myvideohunter.com) is a free tool that downloads videos from X (Twitter), Reddit and Bluesky. This page explains what information is processed when you use it.',
    notCollectedHeading: 'What we do not collect',
    notCollected: [
      'Downloading a video never requires an account: you can use the downloader without telling us anything.',
      'We do not store the videos you download. They are streamed from the platform\'s own content delivery network.',
      'We do not sell personal information, and we do not show your email address to anyone.',
    ],
    processedHeading: 'What is processed',
    processedServer: {
      term: 'Server and CDN logs.',
      text:
        'Our hosting and content delivery provider records standard request data: IP address, browser type, the page requested and timestamps. This is used to operate the service and to detect abuse.',
    },
    processedLinks: {
      term: 'The links you submit.',
      text:
        "When you paste a link, it is sent to our API so the video can be resolved. The resolved page is stored so the same link can be served again; it contains the post's text, thumbnail and download URLs, not any information about you.",
    },
    processedAnalytics: {
      term: 'Google Analytics.',
      text: 'We use Google Analytics to understand how the site is used (pages viewed, approximate location, device type). It sets cookies and receives your IP address. See ',
      link: "Google's privacy policy",
      after: '.',
    },
    processedAdsense: {
      term: 'Google AdSense.',
      text: 'Advertising on this site is served by Google. Google and its partners use cookies (including the DoubleClick cookie) to serve ads based on your visits to this and other sites. You can opt out of personalised advertising in ',
      link: 'Google Ad Settings',
      between: ' or at ',
      link2: 'aboutads.info',
      after: '.',
    },
    signInHeading: 'If you sign in (optional)',
    signInIntro:
      'Signing in is optional and only adds two things: keeping videos in folders, and posting in the chat on a video page. Accounts are held by Amazon Cognito. If you sign in with an email address you create a password there; if you sign in with Google we receive your email address and your name from Google. We never see or store your password.',
    signInLead: 'When you are signed in we store, against an internal account identifier:',
    signInItems: [
      {
        term: 'Your folders and saved videos.',
        text: 'A folder name, and the identifier of each video you saved. The video itself is not copied.',
      },
      {
        term: 'Your nickname.',
        text: 'A nickname is generated for you, and it is the only name shown in chat. It is not derived from your email address, and you can change it at any time.',
      },
      {
        term: 'Your chat messages',
        text: ', stored with that nickname and no other name.',
      },
      {
        term: 'Your block list',
        text: ', if you block an account in chat.',
      },
    ],
    chatHeading: 'Chat',
    chatBody1:
      'The chat room on a video page is public: anyone visiting that page can read it, whether or not they have an account. Posting requires signing in. Messages are stored for up to 30 days and are then deleted automatically, along with the nickname on them. Please do not post personal information: anything you write can be read by anyone, and by us when a message is reported.',
    chatBody2:
      'You can delete your own messages, report a message, or block an account. Reported messages are kept for review for up to 90 days so that we can act on abuse, which is required to keep advertising on these pages. Deleting your account deletes the reports you filed with it.',
    cookiesHeading: 'Cookies and local storage',
    cookiesBody1:
      'Cookies on this site come from Google Analytics and Google AdSense. You can block or delete them in your browser settings; the downloader itself works without cookies.',
    cookiesBody2:
      "If you sign in, your session is kept in your browser's local storage, not in a cookie. Signing out, or clearing site data, removes it.",
    rightsHeading: 'Your rights',
    rights: {
      before:
        'If you are in the EEA or the UK (GDPR) or in California (CCPA), you can ask for access to, correction of, or deletion of your personal data, and you can object to processing. You can delete your own account, and everything held against it, from the ',
      link: 'Your library',
      after:
        ' page: the folders, the saved videos, your chat messages and your block list go with it. If you would rather we did it, contact us using the details below. Requests about analytics and advertising data relate to data controlled by Google; we will help where we can.',
    },
    childrenHeading: 'Children',
    childrenBody:
      'This service is not directed at children under 13 and we do not knowingly collect their personal information.',
    contactHeading: 'Contact',
    contact: {
      before: 'For any privacy request, message us on Telegram at ',
      after: '.',
    },
    copyrightHeading: 'Copyright',
    copyrightBody:
      'Video Hunter does not host videos. Please make sure you have the right to download the content you save, and respect the rights of content creators.',
    backToDownloader: 'Back to the video downloader',
  },

  login: {
    seo: {
      title: 'Sign in — Video Hunter',
      description:
        'Sign in to Video Hunter to keep the videos you find in folders and join the chat on a video page. Downloading videos never needs an account.',
    },
    heading: 'Sign in',
    lead:
      'An account is optional. It lets you keep the videos you find in folders and join the chat on a video page. Downloading never needs one.',
    startError: 'We could not start the sign in. Please try again in a moment.',
    opening: 'Opening the sign in page…',
    continueLabel: 'Continue',
    cognitoNote:
      'You will be taken to Amazon Cognito, where you can sign in with an email address or a Google account. Video Hunter never sees your password.',
  },

  library: {
    seo: {
      title: 'Your library — Video Hunter',
      description: 'The videos you saved, organised in folders you choose.',
    },
    heading: 'Your library',
    sessionEnded: 'Your session has ended. Please sign in again.',
    genericError: 'Something went wrong. Please try again.',
    deletedTitle: 'Your account has been deleted',
    deletedBody:
      'Your folders, the videos saved in them and your chat messages are gone. Downloading still works without an account, and you can create a new one at any time.',
    signInLead: 'Sign in to keep the videos you find, organised in folders you choose.',
    loading: 'Loading your folders…',
    newFolderName: 'New folder name',
    createFolder: 'Create folder',
    emptyFoldersBefore: 'You have no folders yet. Create one, then use the ',
    emptyFoldersStrong: 'Save to folder',
    emptyFoldersAfter: ' button on any video page.',
    savedCount: '{count} saved',
    rename: 'Rename',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    nothingSaved: 'Nothing saved here yet.',
    open: 'Open',
    remove: 'Remove',
    confirmDeleteFolder: 'Delete "{name}" and the videos saved in it?',
    nicknameHeading: 'Your nickname in chat',
    nicknameHelp:
      'A nickname was generated for you, and it is the only name a chat room shows. It is not your email address, and nothing else about your account is public.',
    nicknameLabel: 'Nickname',
    nicknamePlaceholder: 'Your nickname',
    saveNickname: 'Save nickname',
    nicknameSaved: 'Saved. Your new nickname is now shown in chat.',
    blocksHeading: 'Blocked in chat',
    blocksHelp:
      'You no longer see messages from these accounts in any chat room. Blocking only affects what you see.',
    unblock: 'Unblock',
    deleteAccountHeading: 'Delete your account',
    deleteAccountBody:
      'This deletes your account and everything held against it: your folders, the videos saved in them, your chat messages and your block list. Videos you already downloaded stay on your device. It cannot be undone.',
    deleteAccountButton: 'Delete my account',
    deleteAccountConfirm: 'Delete your account and everything in it?',
    deleting: 'Deleting…',
    deleteAccountYes: 'Yes, delete my account',
    videoFallback: 'Video',
  },

  authCallback: {
    seo: {
      title: 'Signing in — Video Hunter',
      description: 'Completing the sign in.',
    },
    signingIn: 'Signing you in…',
    failedHeading: 'Sign in failed',
    tryAgain: 'Try again',
    errorFallback: 'The sign in did not complete. Please try again.',
  },

  notFound: {
    seo: {
      title: 'Page not found — Video Hunter',
      description:
        'This page does not exist. Download videos from X (Twitter), Reddit and Bluesky from the Video Hunter home page.',
    },
    heading: 'Page not found',
    lead:
      'The page you are looking for does not exist. Paste a video link below to download a video from X (Twitter), Reddit or Bluesky.',
    goHome: 'Go to the Video Hunter home page',
    orRead: ' or read the ',
    faqLink: 'FAQ',
  },
}
