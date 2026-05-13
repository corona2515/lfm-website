import { Metadata } from 'next'
import { Badge, Card } from '@/components/ui'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import {
  DataToActionFlow,
  DiagnosticInsightCard,
  FinalCTASection,
  PhotoPlaceholder,
} from '@/components/visual/LeanFmVisuals'
import { CTA_LABELS, SITE_CONFIG } from '@/lib/constants'

const PAGE_PATH = '/building-data-to-action'
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`
const SAMPLE_ANALYSIS_HREF = '/contact?intent=sample-analysis&source=building-data-to-action'
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
    value: 'Ranked waste',
    description: 'Hidden HVAC faults prioritized by likely cost, comfort, and operational impact.',
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
  {
    title: 'Building owners',
    description: 'See which hidden HVAC issues may be affecting operating costs and asset performance.',
  },
  {
    title: 'Facilities teams',
    description: 'Get a practical fix list instead of another dashboard full of noise.',
  },
  {
    title: 'Energy leaders',
    description: 'Identify operational waste that can be addressed without starting with capital projects.',
  },
] as const

export const metadata: Metadata = {
  title: 'OnPoint by LeanFM',
  description:
    'OnPoint analyzes existing BAS exports to surface hidden HVAC faults, estimate likely impact, and help teams decide what to fix first.',
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
    title: 'OnPoint by LeanFM | LeanFM Technologies',
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
    title: 'OnPoint by LeanFM | LeanFM Technologies',
    description:
      'OnPoint helps building teams find hidden HVAC faults and prioritize what to fix first.',
    images: ['/og-image.png'],
  },
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'OnPoint by LeanFM',
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

      <section id="building-data-hero" className="relative overflow-hidden border-b border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_48%,#f4fbef_100%)]">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-35" />
        <div aria-hidden="true" className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-200/45 blur-3xl" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-sky-200/55 blur-3xl" />

        <div className="container-wide relative z-10 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="max-w-2xl">
              <Badge className="mb-6 animate-fade-in">OnPoint by LeanFM</Badge>
              <h1 className="mb-6 max-w-3xl animate-fade-in-up font-body text-[3rem] font-semibold leading-[1.03] tracking-[-0.005em] text-slate-950 md:text-[4.25rem]">
                Turn BAS data into ranked HVAC action.
              </h1>
              <p className="body-large mb-4 max-w-2xl animate-fade-in-up delay-100 text-slate-700">
                OnPoint analyzes existing BAS exports to surface hidden HVAC faults, estimate likely impact, and help teams decide what to fix first.
              </p>
              <p className="body-default mb-8 max-w-2xl animate-fade-in-up delay-200 text-slate-700">
                OnPoint is LeanFM’s building system intelligence product for turning trend data into clear operational priorities. It is powered by the <em>Prescriptiv</em> analytics engine, developed from research at Carnegie Mellon University.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-up delay-300">
                <TrackedButton
                  href={SAMPLE_ANALYSIS_HREF}
                  size="large"
                  eventName="cta_sample_analysis_click"
                  eventParams={{ location: 'building_data_hero_primary' }}
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={DEMO_HREF}
                  size="large"
                  eventName="cta_demo_click"
                  eventParams={{ location: 'building_data_hero_secondary' }}
                  className="border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50"
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <div className="animate-fade-in-up delay-200 space-y-4">
              <PhotoPlaceholder
                label="Person using BAS workstation or reviewing building system data"
                alt="Person using a BAS workstation or reviewing building system data"
                src="/media/leanfm-images/bas-control-room.jpg"
                aspect="video"
                overlay={false}
                className="border-white shadow-[0_24px_90px_rgba(30,64,175,0.18)]"
              />
              <DiagnosticInsightCard compact variant="light" />
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-sky-100 bg-white">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Badge className="mb-6">The problem</Badge>
              <h2 className="heading-2 mb-4 text-slate-950">BAS alarms miss faults that still hit the bill.</h2>
              <p className="body-large text-slate-700">
                Building teams already have trend data, but costly HVAC behavior often stays buried
                until someone has time to investigate manually. OnPoint turns those exports into a
                ranked list of what deserves attention first.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {MISSED_FAULTS.map((fault) => (
                <div
                  key={fault}
                  className="rounded-xl border border-sky-100 bg-sky-50/70 px-5 py-4 text-body-md text-slate-800 shadow-sm"
                >
                  <span className="mr-3 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500 align-middle" />
                  <span className="align-middle">{fault}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section relative overflow-hidden border-b border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_50%,#f4fbef_100%)]">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
        <div className="container-default relative z-10">
          <div className="mb-10 max-w-3xl">
            <Badge className="mb-6">The workflow</Badge>
            <h2 className="heading-2 mb-4 text-slate-950">From raw BAS export to ranked action.</h2>
            <p className="body-large text-slate-700">
              The point is not more charts. It is a defensible shortlist of faults, likely impact,
              and next actions your team can work through.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {WORKFLOW_STEPS.map((step, index) => (
              <Card key={step.label} className="relative overflow-hidden border border-sky-100 bg-white/90 shadow-[0_14px_45px_rgba(30,64,175,0.08)]">
                <div className="absolute right-5 top-5 font-display text-5xl font-semibold text-sky-100">
                  0{index + 1}
                </div>
                <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {step.label}
                </p>
                <h3 className="mt-5 max-w-xs font-display text-2xl font-semibold leading-tight text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-4 text-body-sm leading-relaxed text-slate-700">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <DataToActionFlow variant="light" />
          </div>
        </div>
      </section>

      <section className="section border-b border-sky-100 bg-white">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <Badge className="mb-6">Illustrative product output</Badge>
            <h2 className="heading-2 mb-4 text-slate-950">From noisy data to a prioritized fix list.</h2>
            <p className="body-large text-slate-700">
              OnPoint is designed to move teams from scattered BAS exports and alert noise toward a ranked list of actions.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-6 shadow-sm">
              <p className="mb-5 text-body-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Noisy BAS exports / alarm list
              </p>
              <div className="space-y-3">
                {['AHU trend export 04.csv', 'Alarm list: 183 active items', 'Schedule overrides', 'Sensor values by zone'].map((item) => (
                  <div key={item} className="rounded-xl border border-sky-100 bg-white px-4 py-3 text-body-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
              <p className="mb-5 text-body-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Ranked action list
              </p>
              <div className="space-y-3">
                {[
                  'AHU-3 simultaneous heating/cooling',
                  'RTU-2 excessive runtime',
                  'Zone sensor drift',
                  'Schedule override review',
                ].map((item, index) => (
                  <div key={item} className="grid grid-cols-[auto_1fr] gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-body-xs font-semibold text-emerald-700">
                      {index + 1}
                    </span>
                    <span className="text-body-sm font-medium text-slate-950">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-body-xs text-slate-600">Illustrative example, not a live software screenshot.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_50%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Badge className="mb-6">Why it matters</Badge>
              <h2 className="heading-2 mb-4 text-slate-950">Every fault competes for attention. Rank by impact.</h2>
              <p className="body-large text-slate-700">
                OnPoint helps teams connect hidden system behavior to operational outcomes: energy
                cost, occupant comfort, equipment reliability, and emissions.
              </p>
            </div>

            <div className="grid gap-4">
              {IMPACT_ITEMS.map((item) => (
                <div key={item.title} className="rounded-xl border border-sky-100 bg-white/90 p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                        {item.title}
                      </p>
                      <p className="mt-2 font-display text-3xl font-semibold text-slate-950">{item.value}</p>
                    </div>
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="mt-3 text-body-sm leading-relaxed text-slate-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-white/90 p-5 shadow-sm">
              <p className="font-display text-body-lg font-semibold text-slate-950">Operational waste is measurable</p>
              <p className="mt-3 text-body-sm leading-relaxed text-slate-700">
                DOE guidance highlights the importance of reducing commercial building energy waste through practical operational improvements.{' '}
                <a
                  href={SOURCE_URLS.commercialWaste}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  View source
                </a>
              </p>
            </div>

            <div className="rounded-xl border border-sky-100 bg-white/90 p-5 shadow-sm">
              <p className="font-display text-body-lg font-semibold text-slate-950">Building performance is climate work.</p>
              <p className="mt-3 text-body-sm leading-relaxed text-slate-700">
                Architecture 2030 reports the built environment is responsible for over 35% of
                annual global CO2 emissions.{' '}
                <a
                  href={SOURCE_URLS.architecture2030}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  View source
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-sky-100 bg-white">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Badge className="mb-6">Who it is for</Badge>
              <h2 className="heading-2 mb-4 text-slate-950">Built for teams accountable for real buildings.</h2>
              <p className="body-large text-slate-700">
                Owners need cost visibility. Facilities teams need a practical first move. Energy
                leaders need credible efficiency opportunities.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {AUDIENCE_ITEMS.map((audience) => (
                <div key={audience.title} className="rounded-xl border border-sky-100 bg-sky-50/70 p-5 shadow-sm">
                  <p className="font-display text-xl font-semibold text-slate-950">{audience.title}</p>
                  <p className="mt-3 text-body-sm leading-relaxed text-slate-700">
                    {audience.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTASection
        headline="Turn your BAS data into a ranked fix list."
        body="Use the exports you already have. OnPoint will show where hidden HVAC faults are most likely costing you."
        primaryHref={SAMPLE_ANALYSIS_HREF}
        primaryLocation="building_data_final_primary"
        secondaryLocation="building_data_final_secondary"
      />

      <StickyCtaBar
        heroId="building-data-hero"
        href={SAMPLE_ANALYSIS_HREF}
        location="building_data_sticky_primary"
        message="Your BAS already has the evidence. OnPoint ranks what to fix first."
      />
    </>
  )
}
