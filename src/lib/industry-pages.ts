import { CTA_LABELS } from '@/lib/constants'

export type IndustrySlug =
  | 'k-12'
  | 'museums'
  | 'universities'
  | 'offices'

export interface IndustryPageContent {
  slug: IndustrySlug
  analyticsKey: string
  label: string
  title: string
  description: string
  hero: {
    headline: string
    body: string
    proof: string
  }
  painPoints: string[]
  findings: string[]
  findingDescriptions?: Record<string, string>
  outcomes: Array<{
    title: string
    description: string
  }>
  ctaSource: string
}

export const INDUSTRY_PAGES: Record<IndustrySlug, IndustryPageContent> = {
  'k-12': {
    slug: 'k-12',
    analyticsKey: 'k12',
    label: 'K-12',
    title: 'K-12 BAS Fault Detection',
    description:
      'OnPoint helps K-12 facilities teams find hidden BAS faults, prioritize HVAC fixes, and protect energy budgets without new hardware.',
    hero: {
      headline: 'Find the HVAC faults quietly draining school energy budgets.',
      body: 'OnPoint turns existing BAS exports into a ranked list of hidden HVAC faults, comfort risks, and practical next steps for K-12 facilities teams.',
      proof: 'Built for lean facilities teams managing aging equipment, tight budgets, and occupied buildings.',
    },
    painPoints: [
      'Comfort complaints arrive before clear fault evidence.',
      'Aging equipment and limited staff make manual trend review hard to sustain.',
      'Energy savings projects need defensible, building-level priorities.',
    ],
    findings: [
      'Simultaneous heating and cooling',
      'Stuck dampers and valves',
      'After-hours HVAC operation',
      'Sensor drift that masks comfort problems',
    ],
    outcomes: [
      {
        title: 'Protect operating budgets',
        description: 'Prioritize faults that are likely inflating utility spend across classrooms, gyms, and administrative spaces.',
      },
      {
        title: 'Reduce comfort noise',
        description: 'Give facilities teams a stronger first move when rooms are too hot, too cold, or inconsistent.',
      },
      {
        title: 'Support capital planning',
        description: 'Turn BAS evidence into a cleaner list of controls and equipment issues worth addressing first.',
      },
    ],
    ctaSource: 'industry-k-12',
  },
  museums: {
    slug: 'museums',
    analyticsKey: 'museums',
    label: 'Museums',
    title: 'Museum BAS Fault Detection',
    description:
      'OnPoint helps museums use existing BAS data to find hidden HVAC faults that affect energy use, comfort, and collection-sensitive environments.',
    hero: {
      headline: 'Protect collections and energy budgets with better BAS evidence.',
      body: 'OnPoint analyzes existing BAS exports to reveal HVAC faults that can affect humidity, comfort, reliability, and utility spend in museum environments.',
      proof: 'Designed for teams balancing occupant experience, preservation requirements, and operating cost pressure.',
    },
    painPoints: [
      'Tight environmental expectations leave little room for hidden controls issues.',
      'Faults can waste energy while still appearing normal on basic alarm screens.',
      'Facilities teams need priorities that respect both preservation and budget goals.',
    ],
    findings: [
      'Humidity and temperature control drift',
      'Economizer faults',
      'Unstable zone behavior',
      'Conflicting heating and cooling calls',
    ],
    outcomes: [
      {
        title: 'Preserve sensitive spaces',
        description: 'Surface HVAC behavior that can affect galleries, archives, storage, and public areas.',
      },
      {
        title: 'Focus expert attention',
        description: 'Give internal teams and vendors a ranked shortlist instead of another dashboard to interpret.',
      },
      {
        title: 'Reduce avoidable waste',
        description: 'Find the faults that keep equipment working harder than it should.',
      },
    ],
    ctaSource: 'industry-museums',
  },
  universities: {
    slug: 'universities',
    analyticsKey: 'universities',
    label: 'Universities',
    title: 'University BAS Fault Detection',
    description:
      'OnPoint helps higher education facilities teams convert campus BAS exports into ranked HVAC actions.',
    hero: {
      headline: 'Rank the BAS faults hiding across campus buildings.',
      body: 'OnPoint helps campus teams turn existing BAS trend data into a practical shortlist of HVAC issues by likely energy, comfort, and reliability impact.',
      proof: 'Built for portfolios with mixed building ages, complex schedules, and competing maintenance priorities.',
    },
    painPoints: [
      'Campus portfolios create more trend data than teams can manually review.',
      'Faults vary by building type, schedule, and equipment age.',
      'Energy and facilities teams need one prioritized view of what matters.',
    ],
    findings: [
      'Schedule overrides',
      'Airside economizer failures',
      'Stuck coils, dampers, and valves',
      'Zone-level comfort risk patterns',
    ],
    outcomes: [
      {
        title: 'Prioritize across portfolios',
        description: 'Compare findings across academic, residential, lab-adjacent, and administrative spaces.',
      },
      {
        title: 'Support energy goals',
        description: 'Tie hidden HVAC waste to practical operational fixes before larger capital work.',
      },
      {
        title: 'Give teams a first move',
        description: 'Create a shortlist that facilities, energy, and controls teams can act on together.',
      },
    ],
    ctaSource: 'industry-universities',
  },
  offices: {
    slug: 'offices',
    analyticsKey: 'offices',
    label: 'Offices',
    title: 'Office BAS Fault Detection',
    description:
      'OnPoint helps office building teams use BAS exports to identify hidden HVAC faults and rank operational fixes.',
    hero: {
      headline: 'Turn office BAS data into a clearer fix list.',
      body: 'OnPoint surfaces hidden HVAC waste and comfort risk in existing office building trend exports, then ranks what to investigate first.',
      proof: 'Built for owners and operators balancing tenant comfort, energy targets, and lean operations.',
    },
    painPoints: [
      'Hybrid occupancy makes schedules and comfort patterns harder to interpret.',
      'BAS alarms miss faults that still affect tenant experience and energy use.',
      'Teams need an evidence-backed list before calling vendors or changing controls.',
    ],
    findings: [
      'Schedule mismatch',
      'Outdoor air and economizer faults',
      'Sensor drift',
      'Competing zone and airside behavior',
    ],
    outcomes: [
      {
        title: 'Protect tenant comfort',
        description: 'Connect trend behavior to comfort risks that deserve attention.',
      },
      {
        title: 'Advance energy goals',
        description: 'Find operational fixes that reduce avoidable HVAC waste in existing buildings.',
      },
      {
        title: 'Clarify vendor scopes',
        description: 'Use ranked findings to focus controls contractors on the most important issues.',
      },
    ],
    ctaSource: 'industry-offices',
  },
}

export const INDUSTRY_SLUGS = Object.keys(INDUSTRY_PAGES).filter((slug) => slug !== 'k-12') as IndustrySlug[]

export function getIndustryPage(slug: string) {
  return INDUSTRY_PAGES[slug as IndustrySlug]
}

export function getIndustryDemoHref(page: IndustryPageContent) {
  return `/contact?intent=sample-analysis&source=${page.ctaSource}`
}

export const INDUSTRY_PRIMARY_CTA = CTA_LABELS.primary
