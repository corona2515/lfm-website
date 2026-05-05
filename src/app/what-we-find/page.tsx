import { Metadata } from 'next'
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Gauge,
  Search,
  Settings2,
  Snowflake,
  Thermometer,
  Wrench,
} from 'lucide-react'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import { CTA_LABELS } from '@/lib/constants'

const SAMPLE_ANALYSIS_HREF = '/contact?intent=sample-analysis&source=what_we_find'
const TALK_TO_LEANFM_HREF = '/contact?intent=demo&source=what_we_find_demo'

export const metadata: Metadata = {
  title: 'What We Find',
  description:
    'See the hidden building system issues LeanFM identifies using existing data, including unnecessary runtime, control issues, sensor drift, comfort faults, and system strain.',
}

const heroBullets = [
  'Issues that quietly increase operating costs',
  'Problems that impact comfort but go unnoticed',
  'Inefficiencies that add up over time',
]

const missedReasons = [
  'The system may be operating “within range” but still wasting energy',
  'Alarms may not fire because nothing has technically failed',
  'Patterns are hard to see without looking across time and equipment',
  'Facilities teams rarely have time to manually review thousands of data points',
]

const issueCategories = [
  {
    title: 'Heating and cooling at the same time',
    description: 'Your system may be paying to heat and cool the same space simultaneously.',
    examples: [
      'Zones heating while cooling is active',
      'Systems compensating for conflicting signals',
    ],
    missed: 'Each control loop may look acceptable on its own, while the combined behavior wastes energy.',
    impact: 'Energy waste, comfort instability, unnecessary equipment wear',
    surfaces: 'LeanFM surfaces the zones and operating periods where heating and cooling appear to overlap.',
    Icon: Snowflake,
  },
  {
    title: 'Equipment running longer than needed',
    description: 'Fans, pumps, or units may be operating when the building does not need them.',
    examples: [
      'Systems running nights or weekends',
      'Equipment operating in unoccupied spaces',
      'Extended runtime beyond schedules',
    ],
    missed: 'Schedules and overrides can drift slowly, especially across buildings with changing occupancy.',
    impact: 'Higher utility costs and avoidable wear',
    surfaces: 'LeanFM identifies runtime patterns that do not match likely building need.',
    Icon: Clock3,
  },
  {
    title: 'Sensors causing bad decisions',
    description: 'A drifting or faulty sensor can make the system respond to the wrong conditions.',
    examples: [
      'Temperature readings slightly off',
      'Sensors drifting enough to impact control decisions',
    ],
    missed: 'A sensor can be wrong enough to affect control decisions without crossing an alarm threshold.',
    impact: 'Comfort complaints, wasted energy, and misdiagnosed problems',
    surfaces: 'LeanFM flags sensor behavior that may be causing the BAS to respond to the wrong conditions.',
    Icon: Gauge,
  },
  {
    title: 'Control logic faults',
    description: 'The BAS may be following rules that no longer match how the building actually operates.',
    examples: [
      'Control sequences not behaving as intended',
      'Schedules or overrides changing system behavior',
      'Inconsistent operation across similar spaces',
    ],
    missed: 'The BAS may be following configured logic, even when that logic no longer matches building use.',
    impact: 'Hidden waste, unstable operation, and recurring complaints',
    surfaces: 'LeanFM highlights logic patterns that deserve review by facilities teams or controls vendors.',
    Icon: Settings2,
  },
  {
    title: 'Comfort drift',
    description: 'Spaces can slowly move outside preferred conditions without triggering obvious alarms.',
    examples: [
      'Uneven temperatures across spaces',
      'Fluctuating conditions',
      'Inconsistent system response',
    ],
    missed: 'Conditions can move gradually enough that they become complaints before they become alarms.',
    impact: 'Tenant, staff, student, visitor, or artifact risk depending on vertical',
    surfaces: 'LeanFM shows where comfort-related conditions are drifting or behaving inconsistently.',
    Icon: Thermometer,
  },
  {
    title: 'Maintenance priorities buried in noise',
    description: 'Teams often have too many alerts and not enough clarity.',
    examples: [
      'Recurring alerts without impact ranking',
      'Issues scattered across BAS data',
      'Energy waste that is hard to prove',
    ],
    missed: 'Teams see too much noise and not enough context about which issue matters first.',
    impact: 'The wrong problems get fixed first',
    surfaces: 'LeanFM turns scattered signals into a prioritized list your team can review.',
    Icon: Wrench,
  },
]

const differentBullets = [
  'Focus on issues that matter',
  'Separate signal from noise',
  'Provide clear next steps',
]

function FindingsVisual() {
  const signals = ['Runtime', 'Setpoints', 'Schedules', 'Temperatures']
  const issues = ['Hidden waste', 'Comfort risk', 'System strain']

  return (
    <div className="relative mx-auto w-[calc(100vw-2rem)] max-w-xl min-w-0 overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-950/75 p-5 shadow-[0_28px_90px_rgba(2,6,23,0.42)] sm:w-full">
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_18%_8%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_86%_82%,rgba(59,130,246,0.12),transparent_36%)]" />
      <div className="relative">
        <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Existing system signals
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {signals.map((signal) => (
            <div key={signal} className="min-w-0 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <Activity className="mb-4 h-6 w-6 text-cyan-300" aria-hidden="true" />
              <p className="font-display text-body-lg font-semibold text-white">{signal}</p>
            </div>
          ))}
        </div>

        <div className="my-5 grid gap-2">
          {issues.map((issue) => (
            <div key={issue} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-3">
              <span className="text-body-sm text-slate-300">{issue}</span>
              <Search className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-cyan-400/25 bg-cyan-500/10 p-4">
          <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Prioritized findings
          </p>
          <div className="mt-4 space-y-2">
            {['Investigate schedule mismatch', 'Review sensor behavior', 'Reduce avoidable runtime'].map((finding, index) => (
              <div key={finding} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg bg-slate-950/55 px-3 py-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-body-xs font-semibold text-cyan-200">
                  {index + 1}
                </span>
                <span className="text-body-sm text-white">{finding}</span>
                <CheckCircle2 className="h-4 w-4 text-cyan-300" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WhatWeFindPage() {
  return (
    <>
      <section id="what-we-find-hero" className="relative overflow-hidden border-b border-slate-800/70 bg-slate-950">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="w-[calc(100vw-2rem)] min-w-0 max-w-3xl sm:w-auto">
              <h1 className="mb-6 max-w-[calc(100vw-2rem)] font-body text-[2.95rem] font-semibold leading-[0.98] tracking-normal text-white md:max-w-[12ch] md:text-[4.05rem] lg:text-[4.6rem]">
                The Problems Your Building System Isn’t Showing You
              </h1>
              <p className="body-large mb-7 max-w-full md:max-w-2xl">
                LeanFM analyzes existing building system data to uncover hidden issues that waste energy, impact comfort, and strain equipment—often without triggering alarms.
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
                  eventName="cta_sample_analysis_click"
                  eventParams={{ location: 'what_we_find_hero_primary' }}
                  className="w-full min-w-0 sm:w-auto"
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={TALK_TO_LEANFM_HREF}
                  size="large"
                  eventName="cta_demo_click"
                  eventParams={{ location: 'what_we_find_hero_secondary' }}
                  className="w-full min-w-0 sm:w-auto"
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <FindingsVisual />
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <h2 className="heading-2 text-white">Most Systems Show Data—But Not the Full Picture</h2>
            <div className="space-y-5 text-body-lg leading-relaxed text-slate-300">
              <p>
                Building systems generate large amounts of data, but many issues do not appear as clear alarms. Instead, they show up as patterns over time.
              </p>
              <p className="font-display text-2xl font-semibold leading-snug text-cyan-200">
                The costliest problems are often the ones that go unnoticed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-white">Why These Issues Get Missed</h2>
              <p className="body-large">
                Most building systems are designed to alert teams when something is clearly wrong. But waste, drift, and inefficient operation often develop gradually. They may not cross an alarm threshold, but they still affect energy use, comfort, and equipment performance.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {missedReasons.map((reason) => (
                <div key={reason} className="flex min-h-24 gap-3 rounded-xl border border-slate-800 bg-slate-950/55 p-5">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="text-body-md font-medium leading-relaxed text-slate-100">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="mb-12 max-w-3xl">
            <h2 className="heading-2 mb-4 text-white">Hidden Issues That Become Real Operating Problems</h2>
            <p className="body-large">
              LeanFM turns technical BAS behavior into issues a facilities, operations, or finance team can understand and prioritize.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {issueCategories.map(({ title, description, examples, missed, impact, surfaces, Icon }) => (
              <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10">
                    <Icon className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold leading-tight text-white">{title}</h3>
                    <p className="mt-2 text-body-md leading-relaxed text-slate-300">{description}</p>
                  </div>
                </div>
                <div className="grid gap-5 md:grid-cols-[1fr_0.92fr]">
                  <div>
                    <p className="mb-3 text-body-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      What it looks like
                    </p>
                    <ul className="space-y-2">
                      {examples.map((example) => (
                        <li key={example} className="flex gap-3 text-body-sm leading-relaxed text-slate-200">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/55 p-4">
                      <p className="mb-2 text-body-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Why it gets missed
                      </p>
                      <p className="text-body-sm leading-relaxed text-slate-200">{missed}</p>
                    </div>
                    <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4">
                      <p className="mb-2 text-body-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                        What it can cost
                      </p>
                      <p className="text-body-sm leading-relaxed text-slate-100">{impact}</p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-950/55 p-4">
                      <p className="mb-2 text-body-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        What LeanFM surfaces
                      </p>
                      <p className="text-body-sm leading-relaxed text-slate-200">{surfaces}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-white">These Problems Rarely Appear as Clear Alerts</h2>
              <div className="space-y-5 text-body-lg leading-relaxed text-slate-300">
                <p>
                  Most of these issues do not show up as alarms. They appear as patterns across time, equipment, and conditions.
                </p>
                <p className="font-display text-2xl font-semibold leading-snug text-cyan-200">
                  Without a way to analyze those patterns, they often go unnoticed.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/55 p-6">
              <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Pattern view
              </p>
              <div className="space-y-3">
                {['Across time', 'Across equipment', 'Across conditions'].map((label) => (
                  <div key={label} className="grid grid-cols-[8rem_1fr] items-center gap-4">
                    <span className="text-body-sm font-medium text-slate-200">{label}</span>
                    <span className="h-3 rounded-full bg-[linear-gradient(90deg,rgba(34,211,238,0.25),rgba(34,211,238,0.85),rgba(144,204,124,0.75))]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className="heading-2 mb-5 text-white">Turn Patterns Into Clear Findings</h2>
              <div className="space-y-5">
                <p className="body-large">
                  LeanFM analyzes your building system data to identify these patterns and turn them into clear, prioritized issues your team can act on.
                </p>
                <p className="body-large">
                  LeanFM does not replace your BAS or controls vendor. It helps reveal which issues deserve attention.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {differentBullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-100">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/70 bg-slate-900/50">
        <div className="container-default py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-2 mb-5 text-white">Find Which Issues Are Hiding in Your Building</h2>
            <p className="body-large mb-8">
              Send the data you already have. LeanFM will help identify hidden issues affecting energy, comfort, and system performance.
            </p>
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              size="large"
              eventName="cta_sample_analysis_click"
              eventParams={{ location: 'what_we_find_final_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <StickyCtaBar
        heroId="what-we-find-hero"
        href={SAMPLE_ANALYSIS_HREF}
        location="what_we_find_sticky_primary"
        message="Hidden building system issues can waste energy, affect comfort, and strain equipment before alarms catch them."
      />
    </>
  )
}
