import { siteUrl } from '@/data/site'
import type { FaqText } from '@/data/locales/types'

export interface HowToStep {
  name: string
  text: string
}

/**
 * BreadcrumbList for a single-level page below the home page. The paths are the
 * localized ones, so a translated page points its breadcrumb at itself.
 */
export function breadcrumbJsonLd(
  name: string,
  path: string,
  homeName = 'Video Hunter',
  homePath = '/',
): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeName, item: `${siteUrl}${homePath}` },
      { '@type': 'ListItem', position: 2, name, item: `${siteUrl}${path}` },
    ],
  }
}

/** HowTo built from the same steps the page renders. */
export function howToJsonLd(name: string, steps: HowToStep[]): Record<string, unknown> {
  return {
    '@type': 'HowTo',
    name,
    totalTime: 'PT1M',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

/** Builds the FAQPage structured data from the same source as the accordion. */
export function faqJsonLd(entries: FaqText[]): Record<string, unknown> {
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

/** Wraps several schema nodes in a single @graph block. */
export function graph(...nodes: Record<string, unknown>[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}
