import { Metadata } from 'next'
import {
  CheckCircle2,
  ClipboardCheck,
  FileText,
  LockKeyhole,
  Search,
  Send,
  Settings2,
  Upload,
} from 'lucide-react'
import { Accordion } from '@/components/ui'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import { CTA_LABELS } from '@/lib/constants'

const SAMPLE_ANALYSIS_HREF = '/contact?intent=demo&source=how_it_works_sample_analysis'
const TALK_TO_LEANFM_HREF = '/contact?intent=general&source=how_it_works_talk'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Learn how LeanFM uses existing building system data to identify hidden issues and turn them into prioritized findings.',
}

const heroBullets = [
  'No new hardware required',
  'Uses existing building system data',
  'Clear findings and next steps',
]

const processSteps = [
  'Request a Sample Analysis',
  'Identify useful data',
  'Share available exports',
  'LeanFM analyzes hidden issues',
  'Review prioritized findings',
  'Decide what to address first',
]

const detailedSteps = [
  {
    title: '1. Request a Sample Analysis',
    body: 'Start by telling us about your building, facility type, and available system data. You do not need to know every technical detail before reaching out.',
    label: 'Useful details',
    items: [
      'Building type',
      'Approximate square footage',
      'BAS / controls system if known',
      'Whether trend data is available',
    ],
    Icon: Send,
  },
  {
    title: '2. Identify the Useful Data',
    body: 'LeanFM helps determine which available exports are useful for analysis. This may include trend data, runtime data, temperatures, setpoints, schedules, sensor readings, and equipment-level data.',
    reassurance: 'If you are not sure what you have, we can help you figure it out.',
    Icon: Search,
  },
  {
    title: '3. Share Available Building System Data',
    body: 'A Sample Analysis starts with existing data from your building system. The goal is to use what is already available before adding complexity.',
    reassurance: 'No new hardware is required for the initial analysis.',
    Icon: Upload,
  },
  {
    title: '4. LeanFM Looks for Hidden Problems',
    body: 'LeanFM analyzes system behavior over time to identify patterns that traditional alarms often miss.',
    label: 'Examples',
    items: [
      'Unnecessary runtime',
      'Simultaneous heating and cooling',
      'Schedule and control issues',
      'Sensor drift',
      'Comfort-impacting faults',
      'Unnecessary system strain',
    ],
    Icon: Settings2,
  },
  {
    title: '5. Review Findings With Our Team',
    body: 'You receive a prioritized issue summary with plain-English explanations, supporting evidence, estimated operational impact where available, and recommended next steps.',
    reassurance: 'The goal is to help your team understand what matters first.',
    Icon: ClipboardCheck,
  },
  {
    title: '6. Decide What to Fix First',
    body: 'LeanFM does not replace your facilities team, BAS, or controls vendor. It helps clarify which issues deserve attention so your team and partners can act with better information.',
    Icon: CheckCircle2,
  },
]

const deliverables = [
  'Prioritized issue summary',
  'Plain-English explanations',
  'Supporting data evidence',
  'Estimated impact where available',
  'Recommended next steps',
  'Walkthrough call',
]

const lowFrictionItems = [
  'Starts with existing data',
  'No hardware installation required for the initial review',
  'Does not require replacing your BAS',
  'Helps separate signal from noise',
  'Gives leadership and facilities a shared view of priorities',
]

const dataHandlingItems = [
  'Data is used to perform the requested analysis',
  'Access is limited to the LeanFM team supporting the work',
  'Findings are reviewed with your team',
  'Data handling can be discussed before any transfer',
]

const faqItems = [
  {
    question: 'Do we need new hardware?',
    answer: 'No. A Sample Analysis starts with existing building system data.',
  },
  {
    question: 'What if we do not know how to export the data?',
    answer: 'LeanFM can help identify useful data exports and coordinate next steps.',
  },
  {
    question: 'Is this a replacement for our BAS or controls vendor?',
    answer:
      'No. LeanFM works alongside existing systems and vendors by identifying issues worth investigating.',
  },
  {
    question: 'How technical does our team need to be?',
    answer:
      'Your facilities team can be involved at the level that makes sense. LeanFM provides plain-English findings and supporting evidence.',
  },
  {
    question: 'Do you guarantee savings?',
    answer:
      'No. LeanFM identifies hidden issues and estimated impact where available. Actual outcomes depend on the building and corrective actions taken.',
  },
]

function ProcessVisual() {
  return (
    <div className="relative mx-auto w-[calc(100vw-2rem)] max-w-xl min-w-0 overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-950/75 p-5 shadow-[0_28px_90px_rgba(2,6,23,0.42)] sm:w-full">
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.12),transparent_36%)]" />
      <div className="relative">
        <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Existing data to action
        </p>
        <div className="grid gap-3">
          {[
            ['Existing exports', 'Trend data, schedules, sensor readings'],
            ['Hidden issue review', 'Patterns across time and equipment'],
            ['Prioritized findings', 'What your team should review first'],
          ].map(([label, value], index) => (
            <div key={label} className="grid grid-cols-[auto_1fr] gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/35 bg-cyan-500/10 font-display text-body-sm font-semibold text-cyan-200">
                {index + 1}
              </span>
              <div>
                <p className="font-display text-body-lg font-semibold text-white">{label}</p>
                <p className="mt-1 text-body-sm leading-relaxed text-slate-400">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-cyan-400/25 bg-cyan-500/10 p-4">
          <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Low-disruption start
          </p>
          <div className="mt-4 grid gap-2">
            {['No new hardware', 'No BAS replacement', 'Clear review call'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg bg-slate-950/55 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                <span className="text-body-sm text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HowItWorksPage() {
  return (
    <>
      <section id="how-it-works-hero" className="relative overflow-hidden border-b border-slate-800/70 bg-slate-950">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="w-[calc(100vw-2rem)] min-w-0 max-w-3xl sm:w-auto">
              <p className="mb-5 text-body-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                How It Works
              </p>
              <h1 className="mb-6 max-w-[calc(100vw-2rem)] font-body text-[3.05rem] font-semibold leading-[0.98] tracking-normal text-white md:max-w-[12ch] md:text-[4rem] lg:text-[4.55rem]">
                A Clear Process for Finding Hidden Building System Issues
              </h1>
              <p className="body-large mb-7 max-w-full md:max-w-2xl">
                LeanFM starts with the building system data you already have, analyzes it for hidden problems, and turns the results into prioritized findings your team can review and act on.
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
                  eventName="cta_demo_click"
                  eventParams={{ location: 'how_it_works_hero_primary' }}
                  className="w-full min-w-0 sm:w-auto"
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={TALK_TO_LEANFM_HREF}
                  size="large"
                  eventName="cta_talk_click"
                  eventParams={{ location: 'how_it_works_hero_secondary' }}
                  className="w-full min-w-0 sm:w-auto"
                >
                  Talk to LeanFM
                </TrackedButton>
              </div>
            </div>

            <ProcessVisual />
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="mb-12 max-w-3xl">
            <h2 className="heading-2 mb-4 text-white">From Existing Data to Clear Action</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10 font-display font-semibold text-cyan-200">
                  {index + 1}
                </span>
                <p className="font-display text-body-lg font-semibold leading-snug text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="grid gap-6">
            {detailedSteps.map(({ title, body, label, items, reassurance, Icon }) => (
              <article key={title} className="rounded-2xl border border-slate-800 bg-slate-950/55 p-6 md:p-7">
                <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                  <div>
                    <Icon className="mb-5 h-6 w-6 text-cyan-300" aria-hidden="true" />
                    <h2 className="mb-4 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
                      {title}
                    </h2>
                    <p className="body-large">{body}</p>
                    {reassurance ? (
                      <p className="mt-5 font-display text-xl font-semibold leading-snug text-cyan-200">
                        {reassurance}
                      </p>
                    ) : null}
                  </div>
                  {items ? (
                    <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-5">
                      <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                        {label}
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {items.map((item) => (
                          <div key={item} className="flex gap-3 rounded-lg bg-slate-950/55 px-3 py-3">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                            <p className="text-body-sm leading-relaxed text-slate-100">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-5">
                      <p className="font-display text-2xl font-semibold leading-snug text-white">
                        Practical next step
                      </p>
                      <p className="mt-3 text-body-md leading-relaxed text-slate-300">
                        Keep the process focused on the information that helps your team decide what deserves attention.
                      </p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <h2 className="heading-2 mb-4 text-white">What You Receive From a Sample Analysis</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((deliverable) => (
              <div key={deliverable} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <FileText className="mb-5 h-6 w-6 text-cyan-300" aria-hidden="true" />
                <p className="font-display text-body-lg font-semibold leading-snug text-white">{deliverable}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-white">Designed to Be Practical for Busy Facilities Teams</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {lowFrictionItems.map((item) => (
                <div key={item} className="flex min-h-20 items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/55 p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <LockKeyhole className="mb-5 h-7 w-7 text-cyan-300" aria-hidden="true" />
              <h2 className="heading-2 mb-5 text-white">Your Building Data Is Handled Carefully</h2>
              <p className="body-large">
                LeanFM works with building system data used for operational analysis.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {dataHandlingItems.map((item) => (
                <div key={item} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                  <CheckCircle2 className="mb-5 h-5 w-5 text-cyan-300" aria-hidden="true" />
                  <p className="font-display text-body-lg font-semibold leading-snug text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="mb-8 max-w-3xl">
            <h2 className="heading-2 text-white">Questions Teams Ask Before Starting</h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>

      <section className="border-t border-slate-800/70 bg-slate-900/50">
        <div className="container-default py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-2 mb-5 text-white">Start With the Data You Already Have</h2>
            <p className="body-large mb-8">
              Request a Sample Analysis and LeanFM will help identify hidden issues affecting energy, comfort, and system performance.
            </p>
            <TrackedButton
              href="/contact?intent=demo&source=how_it_works_final"
              size="large"
              eventName="cta_demo_click"
              eventParams={{ location: 'how_it_works_final_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <StickyCtaBar
        heroId="how-it-works-hero"
        href={SAMPLE_ANALYSIS_HREF}
        location="how_it_works_sticky_primary"
        message="Start with existing building system data and see which hidden issues deserve attention first."
      />
    </>
  )
}
