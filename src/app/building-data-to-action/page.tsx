import { Metadata } from 'next'
import { Badge, Card } from '@/components/ui'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { Screenshot } from '@/components/MediaPlaceholder'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import { CTA_LABELS, SITE_CONFIG } from '@/lib/constants'

const PAGE_PATH = '/building-data-to-action'
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`
const DEMO_HREF = '/contact?intent=demo&source=building-data-to-action'

const SOURCE_URLS = {
  commercialWaste:
    'https://www.energy.gov/cmei/buildings/take-action-save-energy-commercial-buildings',
  architecture2030:
    'https://www.architecture2030.org/why-the-built-environment/why-buildings/',
} as const

const MISSED_FAULTS = [
  'Stuck dampers',
  'Simultaneous heating and cooling',
  'Economizer failures',
  'Sensor drift',
] as const

const WORKFLOW_STEPS = [
  {
    label: 'BAS export',
    title: 'Start with the data you already have',
    description: 'Use CSV trend exports from your current BAS/BMS. No new hardware or site install required.',
  },
  {
    label: 'Fault signals',
    title: 'Surface what alarms miss',
    description: 'OnPoint looks for behavioral patterns that point to hidden HVAC waste and comfort risk.',
  },
  {
    label: 'Ranked action',
    title: 'Fix what matters first',
    description: 'Findings are prioritized by likely energy, comfort, and operational impact.',
  },
] as const

const IMPACT_ITEMS = [
  {
    title: 'Budget',
    value: 'Up to 30%',
    description: 'Potential savings in buildings with significant undetected HVAC faults.',
  },
  {
    title: 'Comfort + reliability',
    value: 'Priority list',
    description: 'A clearer shortlist for issues that affect occupants and equipment performance.',
  },
  {
    title: 'Emissions',
    value: 'Less waste',
    description: 'Operational fixes help reduce avoidable energy use in existing buildings.',
  },
] as const

const AUDIENCE_ITEMS = [
  'Building owners',
  'Facilities teams',
  'Energy leaders',
] as const

export const metadata: Metadata = {
  title: 'Turn BAS Data Into Ranked HVAC Action',
  description:
    'OnPoint turns existing BAS and BMS data into prioritized HVAC actions for building owners, operators, and facilities teams.',
  keywords: [
    'building energy waste',
    'HVAC fault detection',
    'BAS data',
    'BMS data',
    'fault prioritization',
    'building performance',
    'OnPoint',
    'LeanFM Technologies',
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: 'Turn BAS Data Into Ranked HVAC Action | LeanFM Technologies',
    description:
      'Your BAS already has the evidence. OnPoint ranks what to fix first.',
    url: PAGE_URL,
    images: [
      {
        url: '/og-image.png',
        width: 1000,
        height: 667,
        alt: 'OnPoint turns BAS data into ranked HVAC action',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turn BAS Data Into Ranked HVAC Action | LeanFM Technologies',
    description:
      'OnPoint helps building teams find hidden HVAC faults and prioritize what to fix first.',
    images: ['/og-image.png'],
  },
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Turn BAS Data Into Ranked HVAC Action',
  description:
    'LeanFM shows how OnPoint turns BAS and BMS data into prioritized HVAC actions for commercial building teams.',
  url: PAGE_URL,
  isPartOf: SITE_CONFIG.url,
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LeanFM Technologies',
  url: SITE_CONFIG.url,
  email: SITE_CONFIG.contactEmail,
  areaServed: 'US',
}

export default function BuildingDataActionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section id="building-data-hero" className="relative overflow-hidden border-b border-slate-800/60">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(144,204,124,0.16),transparent_34%),linear-gradient(180deg,rgba(14,24,36,0.98)_0%,rgba(7,13,20,0.96)_100%)]"
        />

        <div className="container-wide relative z-10 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="max-w-2xl">
              <Badge className="mb-6 animate-fade-in">BAS Data to Action</Badge>
              <h1 className="mb-6 max-w-3xl animate-fade-in-up font-body text-[3rem] font-semibold leading-[1.03] tracking-[-0.005em] text-white md:text-[4.25rem]">
                Your BAS already has the evidence. OnPoint ranks what to fix first.
              </h1>
              <p className="body-large mb-4 max-w-2xl animate-fade-in-up delay-100">
                Upload existing BAS exports and see the hidden HVAC faults most likely to waste
                energy, hurt comfort, or create maintenance risk.
              </p>
              <p className="body-default mb-8 max-w-2xl animate-fade-in-up delay-200">
                No new hardware. No rip-and-replace. Just a clearer path from trend data to
                impact-ranked action.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-up delay-300">
                <TrackedButton
                  href={DEMO_HREF}
                  size="large"
                  eventName="cta_demo_click"
                  eventParams={{ location: 'building_data_hero_primary' }}
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href="/start"
                  size="large"
                  eventName="cta_upload_sample_click"
                  eventParams={{ location: 'building_data_hero_secondary' }}
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <div className="animate-fade-in-up delay-200">
              <div className="rounded-2xl border border-slate-700/70 bg-slate-950/55 p-3 shadow-[0_28px_90px_rgba(2,6,23,0.45)]">
                <Screenshot
                  id="IMG-004"
                  description="OnPoint dashboard showing prioritized fault list ranked by energy impact"
                  aspect="16:9"
                  objectPosition="left"
                  className="border border-slate-700/70 rounded-xl"
                />
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {WORKFLOW_STEPS.map((step) => (
                    <div key={step.label} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                      <p className="text-body-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                        {step.label}
                      </p>
                      <p className="mt-2 text-body-sm text-slate-300">{step.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-slate-950">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Badge className="mb-6">The problem</Badge>
              <h2 className="heading-2 mb-4 text-white">BAS alarms miss faults that still hit the bill.</h2>
              <p className="body-large">
                Building teams already have trend data, but costly HVAC behavior often stays buried
                until someone has time to investigate manually. OnPoint turns those exports into a
                ranked list of what deserves attention first.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {MISSED_FAULTS.map((fault) => (
                <div
                  key={fault}
                  className="rounded-xl border border-slate-800 bg-slate-900/75 px-5 py-4 text-body-md text-slate-200"
                >
                  <span className="mr-3 inline-block h-2.5 w-2.5 rounded-full bg-cyan-400 align-middle" />
                  <span className="align-middle">{fault}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section relative overflow-hidden border-b border-slate-800/60 bg-[linear-gradient(180deg,rgba(20,34,50,0.34)_0%,rgba(7,13,20,0.78)_100%)]">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
        <div className="container-default relative z-10">
          <div className="mb-10 max-w-3xl">
            <Badge className="mb-6">The workflow</Badge>
            <h2 className="heading-2 mb-4 text-white">From raw BAS export to ranked action.</h2>
            <p className="body-large">
              The point is not more charts. It is a defensible shortlist of faults, likely impact,
              and next actions your team can work through.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {WORKFLOW_STEPS.map((step, index) => (
              <Card key={step.label} className="relative overflow-hidden border border-slate-700/70 bg-slate-950/65">
                <div className="absolute right-5 top-5 font-display text-5xl font-semibold text-slate-800">
                  0{index + 1}
                </div>
                <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  {step.label}
                </p>
                <h3 className="mt-5 max-w-xs font-display text-2xl font-semibold leading-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-body-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-slate-950">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Badge className="mb-6">Why it matters</Badge>
              <h2 className="heading-2 mb-4 text-white">Every fault competes for attention. Rank by impact.</h2>
              <p className="body-large">
                OnPoint helps teams connect hidden system behavior to operational outcomes: energy
                cost, occupant comfort, equipment reliability, and emissions.
              </p>
            </div>

            <div className="grid gap-4">
              {IMPACT_ITEMS.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-900/75 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {item.title}
                      </p>
                      <p className="mt-2 font-display text-3xl font-semibold text-white">{item.value}</p>
                    </div>
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  </div>
                  <p className="mt-3 text-body-sm leading-relaxed text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-5">
              <p className="font-display text-body-lg font-semibold text-white">Source-backed savings claim</p>
              <p className="mt-3 text-body-sm leading-relaxed text-slate-400">
                DOE guidance notes commercial buildings can waste up to 30% of the energy they
                consume.{' '}
                <a
                  href={SOURCE_URLS.commercialWaste}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
                >
                  View source
                </a>
              </p>
            </div>

            <div className="rounded-xl border border-cyan-400/20 bg-slate-900/75 p-5">
              <p className="font-display text-body-lg font-semibold text-white">Building performance is climate work.</p>
              <p className="mt-3 text-body-sm leading-relaxed text-slate-400">
                Architecture 2030 reports the built environment is responsible for over 35% of
                annual global CO2 emissions.{' '}
                <a
                  href={SOURCE_URLS.architecture2030}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
                >
                  View source
                </a>
              </p>
            </div>
          </div>

          <p className="mt-5 text-body-xs text-slate-500">
            Savings vary based on building type, existing conditions, data quality, and
            implementation of recommended actions. The 30% figure represents potential savings in
            buildings with significant undetected faults. Actual results depend on your specific
            situation.
          </p>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-slate-900/25">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Badge className="mb-6">Who it is for</Badge>
              <h2 className="heading-2 mb-4 text-white">Built for teams accountable for real buildings.</h2>
              <p className="body-large">
                Owners need cost visibility. Facilities teams need a practical first move. Energy
                leaders need credible efficiency opportunities.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {AUDIENCE_ITEMS.map((audience) => (
                <div key={audience} className="rounded-xl border border-slate-800 bg-slate-950/55 p-5">
                  <p className="font-display text-xl font-semibold text-white">{audience}</p>
                  <p className="mt-3 text-body-sm leading-relaxed text-slate-400">
                    Get a ranked view of the HVAC issues most worth acting on.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-b border-slate-800/60 bg-slate-950">
        <div className="container-narrow">
          <div className="rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900/95 to-slate-900/75 p-8 text-center shadow-card md:p-12">
            <h2 className="heading-2 mb-4 text-white">
              See what your BAS data is hiding.
            </h2>
            <p className="body-large mb-8">
              Start with the exports you already have. OnPoint will show where hidden HVAC faults
              are most likely costing you.
            </p>
            <TrackedButton
              href={DEMO_HREF}
              size="large"
              eventName="cta_demo_click"
              eventParams={{ location: 'building_data_final_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <StickyCtaBar
        heroId="building-data-hero"
        href={DEMO_HREF}
        location="building_data_sticky_primary"
        message="Your BAS already has the evidence. OnPoint ranks what to fix first."
      />
    </>
  )
}
