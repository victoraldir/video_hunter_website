import type { PlatformId } from '@/data/routes'
import type { Locale } from '@/data/locales/locale'

/** A question and answer, shared by the FAQ page and its structured data. */
export interface FaqText {
  question: string
  answer: string
  platform?: PlatformId
}

/** One step of a "how to" list, rendered and used for the HowTo markup. */
export interface StepText {
  name: string
  text: string
}

/** The title and meta description of a single page. */
export interface SeoText {
  title: string
  description: string
}

/**
 * A sentence with a link in it. Splitting the text around the anchor keeps the
 * markup in the template (so a link is never injected from a translation) while
 * letting each language put the link where its grammar needs it.
 */
export interface SentenceLink {
  before: string
  link: string
  after: string
}

/** A sentence with two links in it. */
export interface SentenceTwoLinks {
  before: string
  link1: string
  between: string
  link2: string
  after: string
}

/** A paragraph that leads with a bold term. */
export interface TermText {
  term: string
  text: string
}

/** A term with a link in the paragraph that follows it. */
export interface TermLink extends TermText {
  link: string
  after: string
}

/** A term with two links in the paragraph that follows it. */
export interface TermTwoLinks extends TermText {
  link: string
  between: string
  link2: string
  after: string
}

export interface PlatformCopy {
  /** The platform name as it appears in copy and headings. */
  name: string
  seo: SeoText
  heading: string
  lead: string
  /** One-line summary for the cards on the home page. */
  blurb: string
  howToHeading: string
  howTo: StepText[]
  faq: FaqText[]
  /** Notes rendered under the steps. */
  note: string
}

export interface Dictionary {
  locale: Locale
  siteName: string
  /** `@MyVideoHunterBot`, kept here so the chat and contact copy can use it. */
  telegramHandle: string

  nav: {
    home: string
    telegram: string
    faq: string
    policy: string
    library: string
    signIn: string
    signOut: string
    /** Accessible name of the language switcher. */
    language: string
    /** Accessible name of the collapsed navigation button. */
    toggleNavigation: string
  }

  footer: {
    /** `{year}` is replaced with the current year. */
    copyright: string
    telegram: string
  }

  form: {
    placeholder: string
    videoUrlLabel: string
    download: string
    processing: string
    /** `{platform}` is replaced with the detected platform name. */
    linkDetected: string
    checkLink: string
    sorry: string
    close: string
  }

  howTo: {
    fallbackHeading: string
  }

  platformLinks: {
    heading: string
    lead: string
    note: string
  }

  /** Strings shared by the three platform landing pages. */
  platformPage: {
    /** `{platform}` is replaced with the platform name. */
    faqHeading: string
  }

  /** Errors and messages written by the download composable and the API client. */
  errors: {
    invalidLink: string
    notSupported: string
    noVideo: string
    serviceBusy: string
    fetchFailed: string
    unexpectedResponse: string
    downloadReady: string
    network: string
  }

  auth: {
    unavailable: string
    unverified: string
    noToken: string
    malformedToken: string
    rejected: string
    displayNameFallback: string
  }

  common: {
    backToDownloader: string
    signInUnavailable: SentenceLink
  }

  home: {
    seo: SeoText
    /** Descriptions used by the WebSite and SoftwareApplication markup. */
    websiteDescription: string
    appDescription: string
    featureList: string[]
    heroTitle: string
    heroLead: string
    aboutTitle: string
    aboutBodyBefore: string
    aboutBodyAfter: string
    legalNote: string
    stepsTitle: string
    steps: StepText[]
    platformsTitle: string
    preferChatting: SentenceLink
    telegramTitle: string
    telegramLead: { before: string; link: string; after: string }
    imageAltAbout: string
    imageAltTelegram: string
  }

  platforms: Record<PlatformId, PlatformCopy>

  telegram: {
    seo: SeoText
    heading: string
    lead: string
    openBot: string
    howToHeading: string
    howTo: StepText[]
    worksOn: string
    faqHeading: string
    faq: FaqText[]
    preferTitle: string
    preferLead: SentenceLink
  }

  faq: {
    seo: SeoText
    heading: string
    lead: { before: string; homeLink: string; between: string; after: string }
    entries: FaqText[]
    legalNote: string
  }

  policy: {
    seo: SeoText
    heading: string
    updated: string
    intro: string
    notCollectedHeading: string
    notCollected: string[]
    processedHeading: string
    processedServer: TermText
    processedLinks: TermText
    processedAnalytics: TermLink
    processedAdsense: TermTwoLinks
    signInHeading: string
    signInIntro: string
    signInLead: string
    signInItems: TermText[]
    chatHeading: string
    chatBody1: string
    chatBody2: string
    cookiesHeading: string
    cookiesBody1: string
    cookiesBody2: string
    rightsHeading: string
    rights: SentenceLink
    childrenHeading: string
    childrenBody: string
    contactHeading: string
    contact: { before: string; after: string }
    copyrightHeading: string
    copyrightBody: string
    backToDownloader: string
  }

  login: {
    seo: SeoText
    heading: string
    lead: string
    startError: string
    opening: string
    continueLabel: string
    cognitoNote: string
  }

  library: {
    seo: SeoText
    heading: string
    sessionEnded: string
    genericError: string
    deletedTitle: string
    deletedBody: string
    signInLead: string
    loading: string
    newFolderName: string
    createFolder: string
    emptyFoldersBefore: string
    emptyFoldersStrong: string
    emptyFoldersAfter: string
    /** `{count}` is replaced with the number of saved videos. */
    savedCount: string
    rename: string
    delete: string
    save: string
    cancel: string
    nothingSaved: string
    open: string
    remove: string
    /** `{name}` is replaced with the folder name. */
    confirmDeleteFolder: string
    nicknameHeading: string
    nicknameHelp: string
    nicknameLabel: string
    nicknamePlaceholder: string
    saveNickname: string
    nicknameSaved: string
    blocksHeading: string
    blocksHelp: string
    unblock: string
    deleteAccountHeading: string
    deleteAccountBody: string
    deleteAccountButton: string
    deleteAccountConfirm: string
    deleting: string
    deleteAccountYes: string
    videoFallback: string
  }

  authCallback: {
    seo: SeoText
    signingIn: string
    failedHeading: string
    tryAgain: string
    errorFallback: string
  }

  notFound: {
    seo: SeoText
    heading: string
    lead: string
    goHome: string
    orRead: string
    faqLink: string
  }
}
