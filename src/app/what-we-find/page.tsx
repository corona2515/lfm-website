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
import { FinalCTASection, IssuePatternCard, PhotoPlaceholder } from '@/components/visual/LeanFmVisuals'
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
    impacts: ['Energy waste', 'Comfort instability', 'Equipment wear'],
    visual: 'conflict' as const,
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
    impacts: ['Utility cost', 'Unnecessary runtime', 'Wear'],
    visual: 'runtime' as const,
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
    impacts: ['Bad control decisions', 'Comfort complaints', 'Misdiagnosis'],
    visual: 'sensor' as const,
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
    impacts: ['Recurring issues', 'Hidden waste', 'Unstable operation'],
    visual: 'logic' as const,
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
    impacts: ['Complaints', 'Environmental instability', 'Occupant discomfort'],
    visual: 'comfort' as const,
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
    impacts: ['Team focus', 'Maintenance planning', 'Faster investigation'],
    visual: 'noise' as const,
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
    <div className="relative mx-auto w-[calc(100vw-2rem)] max-w-xl min-w-0 overflow-hidden rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-[0_24px_80px_rgba(30,64,175,0.14)] sm:w-full">
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_18%_8%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_86%_82%,rgba(59,130,246,0.12),transparent_36%)]" />
      <div className="relative">
        <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
          Existing system signals
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {signals.map((signal) => (
            <div key={signal} className="min-w-0 rounded-xl border border-sky-100 bg-sky-50/70 p-4">
              <Activity className="mb-4 h-6 w-6 text-sky-700" aria-hidden="true" />
              <p className="font-display text-body-lg font-semibold text-slate-950">{signal}</p>
            </div>
          ))}
        </div>

        <div className="my-5 grid gap-2">
          {issues.map((issue) => (
            <div key={issue} className="flex items-center justify-between rounded-lg border border-sky-100 bg-white px-3 py-3">
              <span className="text-body-sm text-slate-700">{issue}</span>
              <Search className="h-4 w-4 text-sky-700" aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
            Prioritized findings
          </p>
          <div className="mt-4 space-y-2">
            {['Investigate schedule mismatch', 'Review sensor behavior', 'Reduce avoidable runtime'].map((finding, index) => (
              <div key={finding} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg bg-white px-3 py-2 shadow-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-body-xs font-semibold text-emerald-700">
                  {index + 1}
                </span>
                <span className="text-body-sm text-slate-900">{finding}</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
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
      <section id="what-we-find-hero" className="relative overflow-hidden border-b border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_48%,#f4fbef_100%)]">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-35" />
        <div aria-hidden="true" className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-200/45 blur-3xl" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-sky-200/55 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="w-[calc(100vw-2rem)] min-w-0 max-w-3xl sm:w-auto">
              <h1 className="mb-6 max-w-[calc(100vw-2rem)] font-body text-[2.95rem] font-semibold leading-[0.98] tracking-normal text-slate-950 md:max-w-[12ch] md:text-[4.05rem] lg:text-[4.6rem]">
                The Problems Your Building System Isn’t Showing You
              </h1>
              <p className="body-large mb-7 max-w-full text-slate-700 md:max-w-2xl">
                LeanFM analyzes existing building system data to uncover hidden issues that waste energy, impact comfort, and strain equipment—often without triggering alarms.
              </p>
              <ul className="mb-8 grid gap-3">
                {heroBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-body-md text-slate-800">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
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
                  className="w-full min-w-0 border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <FindingsVisual />
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <h2 className="heading-2 text-slate-950">Most Systems Show Data—But Not the Full Picture</h2>
            <div className="space-y-5 text-body-lg leading-relaxed text-slate-700">
              <p>
                Building systems generate large amounts of data, but many issues do not appear as clear alarms. Instead, they show up as patterns over time.
              </p>
              <p className="font-display text-2xl font-semibold leading-snug text-emerald-700">
                The costliest problems are often the ones that go unnoticed.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <PhotoPlaceholder
              label="Technician inspecting AHU or mechanical system"
              alt="Technician inspecting an air handling unit or mechanical system"
              src="/media/leanfm-images/k12-hvac-inspection.jpg"
              aspect="wide"
              className="border-white shadow-[0_24px_90px_rgba(30,64,175,0.16)]"
              imageClassName="object-[50%_52%]"
              overlay={false}
            />
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_58%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-slate-950">Why These Issues Get Missed</h2>
              <p className="body-large text-slate-700">
                Most building systems are designed to alert teams when something is clearly wrong. But waste, drift, and inefficient operation often develop gradually. They may not cross an alarm threshold, but they still affect energy use, comfort, and equipment performance.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {missedReasons.map((reason) => (
                <div key={reason} className="flex min-h-24 gap-3 rounded-xl border border-sky-100 bg-white/85 p-5 shadow-sm">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                  <p className="text-body-md font-medium leading-relaxed text-slate-800">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="mb-12 max-w-3xl">
            <h2 className="heading-2 mb-4 text-slate-950">Hidden Issues That Become Real Operating Problems</h2>
            <p className="body-large text-slate-700">
              LeanFM turns technical BAS behavior into issues a facilities, operations, or finance team can understand and prioritize.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {issueCategories.map((issue) => (
              <IssuePatternCard
                variant="light"
                key={issue.title}
                issue={{
                  title: issue.title,
                  looksLike: issue.description,
                  missed: issue.missed,
                  cost: issue.impact,
                  surfaces: issue.surfaces,
                  impacts: issue.impacts,
                  visual: issue.visual,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_58%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-slate-950">These Problems Rarely Appear as Clear Alerts</h2>
              <div className="space-y-5 text-body-lg leading-relaxed text-slate-700">
                <p>
                  Most of these issues do not show up as alarms. They appear as patterns across time, equipment, and conditions.
                </p>
                <p className="font-display text-2xl font-semibold leading-snug text-emerald-700">
                  Without a way to analyze those patterns, they often go unnoticed.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm">
              <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Pattern view
              </p>
              <div className="space-y-3">
                {['Across time', 'Across equipment', 'Across conditions'].map((label) => (
                  <div key={label} className="grid grid-cols-[8rem_1fr] items-center gap-4">
                    <span className="text-body-sm font-medium text-slate-700">{label}</span>
                    <span className="h-3 rounded-full bg-[linear-gradient(90deg,rgba(34,211,238,0.25),rgba(34,211,238,0.85),rgba(144,204,124,0.75))]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className="heading-2 mb-5 text-slate-950">Turn Patterns Into Clear Findings</h2>
              <div className="space-y-5">
                <p className="body-large text-slate-700">
                  LeanFM analyzes your building system data to identify these patterns and turn them into clear, prioritized issues your team can act on.
                </p>
                <p className="body-large text-slate-700">
                  LeanFM does not replace your BAS or controls vendor. It helps reveal which issues deserve attention.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {differentBullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50/70 p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-800">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTASection
        headline="Find which issues are hiding in your building."
        body="Request a Sample Analysis to learn which operating patterns may be creating waste, comfort problems, or unnecessary equipment strain."
        primaryHref={SAMPLE_ANALYSIS_HREF}
        primaryLocation="what_we_find_final_primary"
        secondaryHref="/how-it-works"
        secondaryLabel="See How It Works"
        secondaryLocation="what_we_find_final_secondary"
      />

      <StickyCtaBar
        heroId="what-we-find-hero"
        href={SAMPLE_ANALYSIS_HREF}
        location="what_we_find_sticky_primary"
        message="Hidden building system issues can waste energy, affect comfort, and strain equipment before alarms catch them."
      />
    </>
  )
}
