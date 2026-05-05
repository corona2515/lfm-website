import { Metadata } from 'next'
import {
  Building2,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Network,
  Search,
  ThermometerSun,
} from 'lucide-react'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import { CTA_LABELS } from '@/lib/constants'

const SAMPLE_ANALYSIS_HREF = '/contact?intent=demo&source=universities'
const TALK_TO_LEANFM_HREF = '/contact?intent=general&source=universities-talk'

export const metadata: Metadata = {
  title: 'Universities',
  description:
    'LeanFM helps campus facilities teams uncover hidden building system issues across complex university buildings and systems.',
}

const heroBullets = [
  'Identify hidden issues across multiple buildings',
  'Reduce energy waste without major capital upgrades',
  'Help your team focus on what actually matters',
  'Bring consistency across buildings with different systems and behaviors',
]

const urgencyItems = [
  'Large, complex building portfolios',
  'Decentralized systems and teams',
  'Growing energy and sustainability pressure',
  'Limited time to review system data in detail',
  'Pressure to meet energy and sustainability targets',
]

const problemExamples = [
  'Systems running outside intended schedules',
  'Simultaneous heating and cooling',
  'Control inconsistencies across buildings',
  'Sensor drift affecting comfort',
  'Operational issues that persist unnoticed',
]

const campusImpacts = [
  'Wasted energy across buildings',
  'Inconsistent comfort experiences',
  'Unnecessary strain on equipment',
  'Reactive maintenance patterns',
  'Inconsistent performance across similar buildings',
]

const approachBullets = [
  'No new hardware required',
  'Works with existing building systems',
  'Focused on prioritized findings, not raw data',
]

const campusIssues = [
  'Equipment running outside intended schedules',
  'Simultaneous heating and cooling',
  'Scheduling inconsistencies',
  'Control sequence issues',
  'Sensor inaccuracies',
  'Comfort-impacting faults',
]

const practiceExamples = [
  'Buildings operating outside intended schedules',
  'Heating and cooling systems working against each other',
  'Inconsistent control behavior across similar buildings',
  'Sensors drifting enough to impact comfort and system performance',
]

const processSteps = [
  'Request a Sample Analysis',
  'Share available building system data',
  'LeanFM analyzes the data',
  'Review findings with our team',
  'Decide what to address first',
]

const deliverables = [
  'Prioritized issue summary',
  'Plain-English explanations',
  'Estimated operational impact where available',
  'Supporting data evidence',
  'Recommended next steps',
  'Walkthrough call',
]

const outcomes = [
  'Reduced energy waste',
  'Improved comfort consistency',
  'Better use of facilities resources',
  'Fewer unexpected system issues',
]

const credibilityItems = [
  'Developed with expertise from Carnegie Mellon',
  'Experience across institutional and campus-scale environments',
  'Designed for teams managing complex systems',
]

function CampusVisual() {
  const buildings = ['Academic', 'Lab', 'Residence', 'Operations']
  const signals = ['Schedules', 'Runtime', 'Comfort']

  return (
    <div className="relative mx-auto max-w-xl rounded-2xl border border-slate-700/70 bg-slate-950/75 p-5 shadow-[0_28px_90px_rgba(2,6,23,0.42)]">
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.12),transparent_36%)]" />
      <div className="relative">
        <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Campus building signals
        </p>
        <div className="grid grid-cols-2 gap-3">
          {buildings.map((building) => (
            <div key={building} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <GraduationCap className="mb-4 h-6 w-6 text-cyan-300" aria-hidden="true" />
              <p className="font-display text-body-lg font-semibold text-white">{building}</p>
            </div>
          ))}
        </div>

        <div className="my-5 grid grid-cols-3 gap-2">
          {signals.map((signal) => (
            <div key={signal} className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-3 text-center text-body-sm text-slate-300">
              {signal}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-cyan-400/25 bg-cyan-500/10 p-4">
          <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Prioritized campus findings
          </p>
          <div className="mt-4 space-y-2">
            {['Schedule mismatch', 'Comfort inconsistency', 'Equipment strain'].map((finding, index) => (
              <div key={finding} className="flex items-center justify-between rounded-lg bg-slate-950/55 px-3 py-2">
                <span className="text-body-sm text-white">{finding}</span>
                <span className="text-body-xs text-slate-400">Priority {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UniversitiesPage() {
  return (
    <>
      <section id="universities-hero" className="relative overflow-hidden border-b border-slate-800/70 bg-slate-950">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <p className="mb-5 text-body-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                For Universities
              </p>
              <h1 className="mb-6 max-w-[12ch] font-body text-[3.15rem] font-semibold leading-[0.98] tracking-normal text-white md:text-[4.05rem] lg:text-[4.6rem]">
                Make Complex Campus Systems Easier to Understand and Act On
              </h1>
              <p className="body-large mb-7 max-w-2xl">
                LeanFM analyzes existing building system data to uncover hidden problems that waste energy, increase costs, and impact comfort across campus buildings—often before they trigger alarms or surface clearly.
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
                  eventParams={{ location: 'universities_hero_primary' }}
                  className="w-full sm:w-auto"
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={TALK_TO_LEANFM_HREF}
                  size="large"
                  eventName="cta_talk_click"
                  eventParams={{ location: 'universities_hero_secondary' }}
                  className="w-full sm:w-auto"
                >
                  Talk to LeanFM
                </TrackedButton>
              </div>
            </div>

            <CampusVisual />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800/70 bg-slate-900/40">
        <div className="container-wide py-7">
          <div className="grid gap-5 xl:grid-cols-[0.7fr_1.3fr] xl:items-center">
            <h2 className="font-display text-body-lg font-semibold text-white">
              Why Campus Facilities Teams Are Taking a Closer Look
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {urgencyItems.map((item) => (
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
              <h2 className="heading-2 mb-5 text-white">Most Systems Show Data—But Don’t Show What Matters</h2>
              <div className="space-y-5 text-body-lg leading-relaxed text-slate-300">
                <p>
                  Campus systems generate a large amount of data, but identifying which issues actually need attention is not straightforward.
                </p>
                <p>
                  On many campuses, the challenge isn’t lack of data—it’s knowing what actually matters.
                </p>
                <p className="font-display text-2xl font-semibold leading-snug text-cyan-200">
                  The costliest problems are often the ones buried in the data, not flagged by alarms.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {problemExamples.map((example) => (
                <div key={example} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                  <Network className="mb-5 h-6 w-6 text-cyan-300" aria-hidden="true" />
                  <p className="font-display text-body-lg font-semibold text-white">{example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-white">Small Issues Multiply Across Buildings</h2>
              <div className="space-y-5">
                <p className="body-large">Campuses rarely operate as a single system.</p>
                <p className="body-large">
                  On a campus, even minor inefficiencies can scale across multiple buildings and systems.
                </p>
                <p className="body-large">
                  Different buildings, systems, and teams often operate independently, making it difficult to identify patterns or shared issues.
                </p>
                <p className="body-large">
                  Without a clear way to prioritize, teams are left reacting instead of addressing root issues.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {campusImpacts.map((impact) => (
                <div key={impact} className="flex min-h-20 items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/55 p-4">
                  <ThermometerSun className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-100">{impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className="heading-2 mb-5 text-white">Turn Complex Data Into Clear Priorities</h2>
              <p className="body-large max-w-2xl">
                LeanFM analyzes existing building system data across campus buildings and surfaces the issues that matter most.
              </p>
            </div>
            <div className="space-y-3">
              {approachBullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-100">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-white">Common Issues Across Campus Buildings</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {campusIssues.map((issue) => (
                <div key={issue} className="flex min-h-20 items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/55 p-4">
                  <Search className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-100">{issue}</p>
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
              <h2 className="heading-2 mb-4 text-white">Examples of Hidden Issues on Campus</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {practiceExamples.map((example) => (
                <div key={example} className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-5">
                  <Building2 className="mb-5 h-6 w-6 text-cyan-300" aria-hidden="true" />
                  <p className="font-display text-body-lg font-semibold leading-snug text-white">{example}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-cyan-400/25 bg-cyan-500/10 p-7 text-center md:p-10">
            <h2 className="mb-6 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
              Want to see this across your campus?
            </h2>
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              size="large"
              eventName="cta_demo_click"
              eventParams={{ location: 'universities_midpage_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4 text-white">Simple Process Across Campus Systems</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-xl border border-slate-800 bg-slate-950/55 p-5">
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10 font-display font-semibold text-cyan-200">
                  {index + 1}
                </span>
                <p className="font-display text-body-lg font-semibold leading-snug text-white">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 text-center">
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              eventName="cta_demo_click"
              eventParams={{ location: 'universities_process_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-white">Clear Findings Your Team Can Act On</h2>
              <div className="space-y-5">
                <p className="body-large">
                  Instead of reviewing large volumes of system data, your team gets a focused list of issues that actually matter.
                </p>
                <p className="body-large">
                  This helps facilities, energy, and operations teams align on what needs attention first.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {deliverables.map((deliverable) => (
                <div key={deliverable} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                  <ClipboardCheck className="mb-5 h-6 w-6 text-cyan-300" aria-hidden="true" />
                  <p className="font-display text-body-lg font-semibold leading-snug text-white">{deliverable}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="mb-10 max-w-2xl">
            <h2 className="heading-2 mb-4 text-white">What This Means for Your Campus</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome) => (
              <div key={outcome} className="rounded-xl border border-slate-800 bg-slate-950/55 p-5">
                <CheckCircle2 className="mb-5 h-6 w-6 text-cyan-300" aria-hidden="true" />
                <p className="font-display text-body-lg font-semibold leading-snug text-white">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800/70 bg-slate-950">
        <div className="container-wide py-7">
          <div className="grid gap-5 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
            <h2 className="font-display text-body-lg font-semibold text-white">
              Built for Complex, Real-World Systems
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

      <section className="border-t border-slate-800/70 bg-slate-900/50">
        <div className="container-default py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-2 mb-5 text-white">See What Your Campus Systems Are Missing</h2>
            <p className="body-large mb-8">
              Send the data you already have. We’ll help show which hidden issues are affecting energy use, comfort, and system performance across your campus.
            </p>
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              size="large"
              eventName="cta_demo_click"
              eventParams={{ location: 'universities_final_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <StickyCtaBar
        heroId="universities-hero"
        href={SAMPLE_ANALYSIS_HREF}
        message="Send existing campus building data and see which hidden issues are worth attention first."
      />
    </>
  )
}
