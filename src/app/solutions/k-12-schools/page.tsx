import { Metadata } from 'next'
import {
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  School,
  Search,
  ThermometerSun,
} from 'lucide-react'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import { CTA_LABELS } from '@/lib/constants'

const SAMPLE_ANALYSIS_HREF = '/start'
const TALK_TO_LEANFM_HREF = '/contact?intent=demo&source=k12_demo'

export const metadata: Metadata = {
  title: 'K-12 Schools',
  description:
    'LeanFM helps school districts uncover hidden building system problems that waste energy, increase costs, and create comfort issues.',
}

const heroBullets = [
  'Identify hidden system issues your current setup isn’t flagging',
  'Reduce energy waste without major capital projects',
  'Help your team focus on what actually needs attention',
]

const urgencyItems = [
  'Energy costs continue to rise',
  'Staffing is limited across facilities teams',
  'Aging systems are harder to manage',
  'Comfort complaints impact classrooms daily',
]

const problemExamples = [
  'Systems running after hours',
  'Heating and cooling happening at the same time',
  'Schedules drifting over time',
  'Sensors becoming inaccurate',
  'Control issues affecting classrooms',
]

const districtImpacts = [
  'Wasted energy',
  'Avoidable costs',
  'Unnecessary strain on equipment',
  'Reactive maintenance',
  'Issues that go unnoticed for months',
]

const approachBullets = [
  'No new hardware required',
  'Works with your existing building automation system',
  'Focused on real issues, not data overload',
]

const schoolIssues = [
  'Equipment running during unoccupied hours',
  'Simultaneous heating and cooling',
  'Scheduling mismatches',
  'Control sequence problems',
  'Sensor drift affecting classroom comfort',
  'Systems working harder than necessary',
]

const practiceExamples = [
  'A system running nights and weekends across multiple schools',
  'Heating and cooling operating at the same time in occupied spaces',
  'Schedules not aligning with actual building use',
  'Sensors drifting just enough to impact comfort',
]

const processSteps = [
  'Upload Sample Dataset',
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
  'Lower energy waste across buildings',
  'Fewer classroom comfort complaints',
  'Better use of maintenance resources',
  'Fewer unexpected system issues',
]

const credibilityItems = [
  'Carnegie Mellon-originated technology',
  'Developed with expertise from Carnegie Mellon',
  'Experience with institutions like museums and universities',
  'Designed for facilities teams managing multiple buildings',
]

function DistrictVisual() {
  const buildings = ['Elementary', 'Middle', 'High', 'District']
  const signals = ['Schedules', 'Runtime', 'Setpoints']

  return (
    <div className="relative mx-auto max-w-xl rounded-2xl border border-slate-700/70 bg-slate-950/75 p-5 shadow-[0_28px_90px_rgba(2,6,23,0.42)]">
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.12),transparent_36%)]" />
      <div className="relative">
        <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          District building signals
        </p>
        <div className="grid grid-cols-2 gap-3">
          {buildings.map((building) => (
            <div key={building} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <School className="mb-4 h-6 w-6 text-cyan-300" aria-hidden="true" />
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
            Prioritized findings
          </p>
          <div className="mt-4 space-y-2">
            {['After-hours runtime', 'Comfort risk', 'Equipment strain'].map((finding, index) => (
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

export default function K12SchoolsPage() {
  return (
    <>
      <section id="k12-schools-hero" className="relative overflow-hidden border-b border-slate-800/70 bg-slate-950">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <h1 className="mb-6 max-w-[12ch] font-body text-[3.15rem] font-semibold leading-[0.98] tracking-normal text-white md:text-[4.05rem] lg:text-[4.6rem]">
                Find the hidden HVAC issues driving complaints, waste, and maintenance strain across your district.
              </h1>
              <p className="body-large mb-7 max-w-2xl">
                LeanFM analyzes existing building system data to uncover hidden problems that waste energy, increase costs, and create comfort issues across classrooms, gyms, and district facilities—often without triggering alarms.
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
                  eventParams={{ location: 'k12_schools_hero_primary' }}
                  className="w-full sm:w-auto"
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={TALK_TO_LEANFM_HREF}
                  size="large"
                  eventName="cta_demo_click"
                  eventParams={{ location: 'k12_schools_hero_secondary' }}
                  className="w-full sm:w-auto"
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <DistrictVisual />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800/70 bg-slate-900/40">
        <div className="container-wide py-7">
          <div className="grid gap-5 lg:grid-cols-[0.58fr_1.42fr] lg:items-center">
            <h2 className="font-display text-body-lg font-semibold text-white">
              Why Districts Look at This Now
            </h2>
            <div className="grid gap-3 md:grid-cols-4">
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
              <h2 className="heading-2 mb-5 text-white">Most School Systems Catch Failures—But Miss the Costly Problems</h2>
              <div className="space-y-5 text-body-lg leading-relaxed text-slate-300">
                <p>
                  School buildings often rely on systems that alert when something breaks. But many of the issues that drive energy costs and comfort complaints are not obvious failures.
                </p>
                <p className="font-display text-2xl font-semibold leading-snug text-cyan-200">
                  The costliest problems are often the ones nobody is being alerted about.
                </p>
                <p>
                  These problems often go unnoticed, but they show up in budgets, complaints, and maintenance workload.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {problemExamples.map((example) => (
                <div key={example} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                  <Clock className="mb-5 h-6 w-6 text-cyan-300" aria-hidden="true" />
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
              <h2 className="heading-2 mb-5 text-white">Small Issues Add Up Quickly Across a District</h2>
              <p className="body-large">
                Across a district, small inefficiencies don’t stay small. Limited staff, aging systems, tight budgets, and daily comfort needs make it hard to catch everything manually.
              </p>
              <div className="mt-7 rounded-2xl border border-cyan-400/25 bg-cyan-500/10 p-5">
                <p className="mb-4 font-display text-xl font-semibold text-white">
                  Want to see this in your district?
                </p>
                <TrackedButton
                  href={SAMPLE_ANALYSIS_HREF}
                  eventName="cta_upload_sample_click"
                  eventParams={{ location: 'k12_schools_impact_inline' }}
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {districtImpacts.map((impact) => (
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
              <h2 className="heading-2 mb-5 text-white">Find What Your Systems Aren’t Showing You</h2>
              <p className="body-large max-w-2xl">
                LeanFM analyzes existing building system data across your schools to identify hidden issues and turn them into clear, prioritized findings.
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
              <h2 className="heading-2 mb-4 text-white">Common Issues We See in Schools</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {schoolIssues.map((issue) => (
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
              <h2 className="heading-2 mb-4 text-white">What This Looks Like in Practice</h2>
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
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4 text-white">Simple Process for Districts</h2>
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
              eventName="cta_upload_sample_click"
              eventParams={{ location: 'k12_schools_process_primary' }}
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
              <h2 className="heading-2 mb-4 text-white">Clear, Actionable Findings</h2>
              <p className="body-large">
                Instead of reviewing thousands of data points, your team gets a short list of issues that actually matter.
              </p>
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
            <h2 className="heading-2 mb-4 text-white">What This Means for Your District</h2>
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
              Built for Complex, Real-World Buildings
            </h2>
            <div className="grid gap-3 md:grid-cols-4">
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
            <h2 className="heading-2 mb-5 text-white">See What Your Schools Are Missing</h2>
            <p className="body-large mb-8">
              Send the data you already have. We’ll help show which hidden issues are driving energy waste, comfort complaints, or unnecessary system strain.
            </p>
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              size="large"
              eventName="cta_upload_sample_click"
              eventParams={{ location: 'k12_schools_final_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <StickyCtaBar
        heroId="k12-schools-hero"
        href={SAMPLE_ANALYSIS_HREF}
        message="Send existing school building data and see which hidden issues are worth attention first."
      />
    </>
  )
}
