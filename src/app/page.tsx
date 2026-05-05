import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import { CTA_LABELS, SITE_CONFIG } from '@/lib/constants'

const SAMPLE_ANALYSIS_HREF = '/start'
const BOOK_DEMO_HREF = '/contact?intent=demo&source=home_book_demo'

export const metadata: Metadata = {
  title: 'LeanFM Technologies | Find Hidden Building System Problems',
  description:
    'LeanFM analyzes existing building system data to uncover hidden problems that waste energy, drive up costs, and create comfort issues.',
}

const heroBullets = [
  'No new sensors',
  'No site visit required to start',
  'Sample findings typically reviewed within 24 hours after clean upload',
  'Built for facilities, energy, and operations teams',
]

const credibilityItems = [
  'Carnegie Mellon-originated technology',
  'Deployed with organizations including The Warhol Museum, Penn State, and Carnegie Mellon',
  'Built for facilities teams managing complex buildings',
]

const problemIssues = [
  'Simultaneous heating and cooling',
  'Drifting sensors',
  'Overridden sequences',
  'Excessive runtime',
  'Short cycling',
  'Control logic problems',
]

const solutionBullets = [
  'Finds hidden operating patterns',
  'Connects faults to energy, comfort, and maintenance impact',
  'Ranks what matters first',
  'Produces clear corrective guidance',
]

const basComparison = [
  {
    title: 'BAS alarms',
    items: ['Catch obvious failures', 'Alert on thresholds', 'Often generate noise', 'Do not always rank impact'],
  },
  {
    title: 'LeanFM',
    items: [
      'Finds hidden operating patterns',
      'Connects faults to energy, comfort, and maintenance impact',
      'Ranks what matters first',
      'Produces clear corrective guidance',
    ],
  },
]

const beforeAfter = [
  {
    title: 'Before LeanFM',
    items: [
      'Teams react to complaints and alarms',
      'Issues are scattered across BAS data',
      'Maintenance priorities are unclear',
      'Energy waste is hard to prove',
      'Leadership sees costs, not causes',
    ],
  },
  {
    title: 'After LeanFM',
    items: [
      'Hidden faults are surfaced',
      'Issues are ranked by impact',
      'Teams know what to fix first',
      'Findings can be shared with vendors and leadership',
      'Waste becomes visible and actionable',
    ],
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Share Data',
    description: 'Upload trend data from your building system.',
  },
  {
    number: '02',
    title: 'We Analyze It',
    description: 'LeanFM identifies hidden issues and inefficiencies.',
  },
  {
    number: '03',
    title: 'Review Findings',
    description: 'We walk you through what matters and what to do next.',
  },
]

const findings = [
  'Simultaneous heating and cooling',
  'Equipment running when it shouldn’t',
  'Scheduling and control issues',
  'Sensor inaccuracies',
  'Comfort-impacting faults',
]

const outcomes = [
  'Lower energy waste',
  'Fewer comfort complaints',
  'Better use of maintenance resources',
  'Fewer unexpected equipment issues',
]

const verticals = [
  {
    title: 'K-12 Schools',
    description: 'Find hidden waste across classrooms, gyms, offices, and district facilities.',
    href: '/solutions/k-12-schools',
  },
  {
    title: 'Universities',
    description: 'Help facilities teams prioritize issues across diverse campus buildings.',
    href: '/solutions/universities',
  },
  {
    title: 'Commercial Real Estate',
    description: 'Find hidden issues that affect tenant comfort, operating costs, and portfolio performance.',
    href: '/solutions/commercial-real-estate',
  },
  {
    title: 'Museums',
    description: 'Support comfort, reliability, and careful operation in sensitive public spaces.',
    href: '/solutions/museums',
  },
]

function SignalToActionVisual() {
  const rawSignals = ['Runtime', 'Setpoints', 'Schedules', 'Sensors']
  const surfacedIssues = ['Control issue', 'Wasted runtime', 'Comfort risk']
  const actions = ['Prioritize', 'Assign', 'Resolve']

  return (
    <div className="relative mx-auto max-w-xl rounded-2xl border border-slate-700/70 bg-slate-950/70 p-5 shadow-[0_28px_90px_rgba(2,6,23,0.42)]">
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.12),transparent_36%)]" />
      <div className="relative grid gap-4">
        <div>
          <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Existing data
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {rawSignals.map((signal) => (
              <div key={signal} className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-3 text-body-sm text-slate-300">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-slate-500" />
                {signal}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
          <div className="h-px flex-1 bg-slate-800" />
          <ArrowRight className="h-4 w-4 text-cyan-300" aria-hidden="true" />
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        <div className="rounded-xl border border-cyan-400/25 bg-cyan-500/10 p-4">
          <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Hidden problems surfaced
          </p>
          <div className="mt-4 space-y-2">
            {surfacedIssues.map((issue, index) => (
              <div key={issue} className="flex items-center justify-between rounded-lg bg-slate-950/55 px-3 py-2">
                <span className="text-body-sm text-white">{issue}</span>
                <span className="text-body-xs text-slate-400">Priority {index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
          <div className="h-px flex-1 bg-slate-800" />
          <ArrowRight className="h-4 w-4 text-cyan-300" aria-hidden="true" />
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        <div>
          <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Clear actions
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {actions.map((action) => (
              <div key={action} className="rounded-lg border border-slate-800 bg-slate-900/85 px-3 py-3 text-center text-body-sm font-semibold text-slate-100">
                {action}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LeanFM Technologies',
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.contactEmail,
    areaServed: 'US',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section id="home-hero" className="relative overflow-hidden border-b border-slate-800/70 bg-slate-950">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <h1 className="mb-6 max-w-[12ch] font-body text-[3.2rem] font-semibold leading-[0.98] tracking-normal text-white md:text-[4.2rem] lg:text-[4.85rem]">
                Your building is wasting money in ways your BAS is not catching.
              </h1>
              <p className="body-large mb-7 max-w-2xl">
                LeanFM analyzes your existing building automation data to find hidden HVAC faults, rank them by impact, and show your team what to fix first.
              </p>
              <ul className="mb-8 grid gap-3">
                {heroBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-body-md text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 sm:flex-row">
                <TrackedButton
                  href={SAMPLE_ANALYSIS_HREF}
                  size="large"
                  eventName="cta_upload_sample_click"
                  eventParams={{ location: 'home_hero_primary' }}
                  className="w-full sm:w-auto"
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={BOOK_DEMO_HREF}
                  size="large"
                  eventName="cta_demo_click"
                  eventParams={{ location: 'home_hero_secondary' }}
                  className="w-full sm:w-auto"
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <SignalToActionVisual />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800/70 bg-slate-900/40">
        <div className="container-wide py-7">
          <div className="grid gap-5 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
            <h2 className="font-display text-body-lg font-semibold text-white">
              Trusted in complex buildings
            </h2>
            <div className="grid gap-3 md:grid-cols-3">
              {credibilityItems.map((item) => (
                <p key={item} className="border-l border-slate-700 pl-4 text-body-sm leading-relaxed text-slate-300">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-white">Why your BAS may not be telling you the whole story.</h2>
              <div className="space-y-5 text-body-lg leading-relaxed text-slate-300">
                <p>
                  Most BAS alarms are designed to flag obvious failures or out-of-range conditions. Many expensive problems do not look like alarms.
                </p>
                <p className="font-display text-2xl font-semibold leading-snug text-cyan-200">
                  They show up as patterns over time.
                </p>
                <p>
                  Simultaneous heating and cooling, drifting sensors, overridden sequences, excessive runtime, short cycling, and control logic problems can compound quietly before anyone sees a clear alarm.
                </p>
                <p>LeanFM looks across trend behavior to find those patterns and prioritize the issues most likely to affect energy, comfort, and equipment wear.</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {problemIssues.map((issue) => (
                <div key={issue} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                  <span className="mb-5 block h-1.5 w-10 rounded-full bg-cyan-300" />
                  <p className="font-display text-body-lg font-semibold text-white">{issue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <h2 className="heading-2 mb-4 text-white">BAS alarms show failures. LeanFM shows what is costing you.</h2>
            <p className="body-large">
              These issues exist whether or not they trigger alarms. The first step is not a major project. It is a sample analysis.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {basComparison.map((column) => (
              <div key={column.title} className="rounded-2xl border border-slate-800 bg-slate-950/55 p-6">
                <h3 className="mb-5 font-display text-2xl font-semibold text-white">{column.title}</h3>
                <div className="space-y-3">
                  {column.items.map((item) => (
                    <div key={item} className="flex gap-3 text-body-md text-slate-200">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className="heading-2 mb-5 text-white">Find the costly issues hiding in your BAS data</h2>
              <p className="body-large max-w-2xl">
                Hidden faults compound quietly. Every month of delay can mean more waste, more complaints, and more wear. LeanFM separates signal from noise and turns existing BAS data into clear corrective priorities.
              </p>
            </div>
            <div className="space-y-3">
              {solutionBullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/55 p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-100">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-large bg-slate-950 scroll-mt-24">
        <div className="container-default">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4 text-white">Simple Process. Clear Results.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {processSteps.map((step) => (
              <div key={step.number} className="rounded-xl border border-slate-800 bg-slate-900/55 p-6">
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10 font-display font-semibold text-cyan-200">
                  {step.number}
                </span>
                <h3 className="mb-3 font-display text-2xl font-semibold text-white">{step.title}</h3>
                <p className="text-body-md leading-relaxed text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 text-center">
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              eventName="cta_upload_sample_click"
              eventParams={{ location: 'home_how_it_works_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-white">The Issues That Add Up</h2>
              <p className="body-large">
                Small hidden problems can become expensive when they repeat across systems, zones, and buildings.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {findings.map((finding) => (
                <div key={finding} className="flex min-h-20 items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/55 p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-100">{finding}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <h2 className="heading-2 mb-4 text-white">Before and After LeanFM</h2>
            <p className="body-large">
              LeanFM turns scattered BAS behavior into a short list of issues facilities teams, vendors, and leadership can act on.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {beforeAfter.map((group) => (
              <div key={group.title} className="rounded-2xl border border-slate-800 bg-slate-900/55 p-6">
                <h3 className="mb-5 font-display text-2xl font-semibold text-white">{group.title}</h3>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item} className="flex gap-3 text-body-md text-slate-200">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800/70 bg-slate-950">
        <div className="container-default py-12 md:py-16">
          <div className="rounded-2xl border border-cyan-400/25 bg-cyan-500/10 p-7 text-center md:p-10">
            <h2 className="mb-6 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
              Want to see what this looks like in your building?
            </h2>
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              size="large"
              eventName="cta_upload_sample_click"
              eventParams={{ location: 'home_midpage_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="mb-10 max-w-2xl">
            <h2 className="heading-2 mb-4 text-white">What This Means for Your Building</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome) => (
              <div key={outcome} className="rounded-xl border border-slate-800 bg-slate-900/55 p-5">
                <CheckCircle2 className="mb-5 h-6 w-6 text-cyan-300" aria-hidden="true" />
                <p className="font-display text-body-lg font-semibold leading-snug text-white">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="mb-10 max-w-2xl">
            <h2 className="heading-2 mb-4 text-white">Built for Complex Buildings</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {verticals.map((vertical) => (
              <Link
                key={vertical.href}
                href={vertical.href}
                className="group rounded-xl border border-slate-800 bg-slate-950/55 p-6 transition-colors hover:border-cyan-400/45 hover:bg-slate-950"
              >
                <div className="mb-6 h-28 rounded-lg border border-slate-800 bg-[linear-gradient(135deg,rgba(44,66,88,0.75)_0%,rgba(14,24,36,0.9)_54%,rgba(144,204,124,0.16)_100%)]" />
                <h3 className="mb-3 flex items-center justify-between gap-4 font-display text-2xl font-semibold text-white">
                  {vertical.title}
                  <ArrowRight className="h-5 w-5 shrink-0 text-cyan-300 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </h3>
                <p className="text-body-md leading-relaxed text-slate-300">{vertical.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-narrow text-center">
          <h2 className="heading-2 mb-5 text-white">Reducing Energy Waste at Scale</h2>
          <p className="body-large">
            Buildings waste energy because many problems stay hidden until someone knows where to look. LeanFM makes those problems visible so buildings can operate more efficiently, reduce unnecessary strain on equipment, and use energy more responsibly.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-800/70 bg-slate-900/50">
        <div className="container-default py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-2 mb-5 text-white">Upload a sample dataset and see what your BAS is missing</h2>
            <p className="body-large mb-8">
              Send existing BAS trend data. We’ll analyze it for hidden HVAC faults, energy waste, comfort risks, and control issues, then walk you through what matters first.
            </p>
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              size="large"
              eventName="cta_upload_sample_click"
              eventParams={{ location: 'home_final_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <StickyCtaBar
        heroId="home-hero"
        href={SAMPLE_ANALYSIS_HREF}
        message="Hidden BAS faults can waste energy, money, comfort, and maintenance time before alarms catch them."
      />
    </>
  )
}
