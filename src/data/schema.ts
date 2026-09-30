import { siteUrl } from '@/data/site'

export interface HowToStep {
  name: string
  text: string
}

/** BreadcrumbList for a single-level page below the home page. */
export function breadcrumbJsonLd(name: string, path: string): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Video Hunter', item: `${siteUrl}/` },
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

/** Wraps several schema nodes in a single @graph block. */
export function graph(...nodes: Record<string, unknown>[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}
