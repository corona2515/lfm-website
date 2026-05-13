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
import { FinalCTASection, PhotoPlaceholder } from '@/components/visual/LeanFmVisuals'
import { CTA_LABELS } from '@/lib/constants'

const SAMPLE_ANALYSIS_HREF = '/contact?intent=sample-analysis&source=universities'
const TALK_TO_LEANFM_HREF = '/contact?intent=demo&source=universities_demo'

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

const campusSpecificExamples = [
  'Academic buildings running on outdated schedules',
  'Residence halls with comfort drift',
  'Labs or specialty spaces with tighter operating needs',
  'Older buildings behaving differently than newer ones',
  'Repeated issues across similar equipment',
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
  'Developed from Carnegie Mellon University facilities research',
  'Co-founded by a current CMU professor',
  'Money-back ROI guarantee on every engagement',
]

function CampusVisual() {
  const buildings = ['Academic', 'Lab', 'Residence', 'Operations']
  const signals = ['Schedules', 'Runtime', 'Comfort']

  return (
    <div className="relative mx-auto max-w-xl rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-[0_24px_80px_rgba(30,64,175,0.14)]">
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.12),transparent_36%)]" />
      <div className="relative">
        <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
          Campus building signals
        </p>
        <div className="grid grid-cols-2 gap-3">
          {buildings.map((building) => (
            <div key={building} className="rounded-xl border border-sky-100 bg-sky-50/70 p-4">
              <GraduationCap className="mb-4 h-6 w-6 text-sky-700" aria-hidden="true" />
              <p className="font-display text-body-lg font-semibold text-slate-950">{building}</p>
            </div>
          ))}
        </div>

        <div className="my-5 grid grid-cols-3 gap-2">
          {signals.map((signal) => (
            <div key={signal} className="rounded-lg border border-sky-100 bg-white/70 px-3 py-3 text-center text-body-sm text-slate-700">
              {signal}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 shadow-sm p-4">
          <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Prioritized campus findings
          </p>
          <div className="mt-4 space-y-2">
            {['Schedule mismatch', 'Comfort inconsistency', 'Equipment strain'].map((finding, index) => (
              <div key={finding} className="flex items-center justify-between rounded-lg bg-white/55 px-3 py-2">
                <span className="text-body-sm text-slate-950">{finding}</span>
                <span className="text-body-xs text-slate-600">Priority {index + 1}</span>
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
      <section id="universities-hero" className="relative overflow-hidden border-b border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_48%,#f4fbef_100%)]">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-35" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-sky-200/55 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <p className="mb-5 text-body-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                For Universities
              </p>
              <h1 className="mb-6 max-w-[12ch] font-body text-[3.15rem] font-semibold leading-[0.98] tracking-normal text-slate-950 md:text-[4.05rem] lg:text-[4.6rem]">
                Bring clarity to complex campus building systems.
              </h1>
              <p className="body-large text-slate-700 mb-7 max-w-2xl">
                You manage 80 buildings across three eras of construction. Your team prioritizes maintenance from memory. LeanFM analyzes existing building system data to uncover hidden problems that waste energy, increase costs, and impact comfort across campus buildings — often before they trigger alarms or surface clearly.
              </p>
              <ul className="mb-8 grid gap-3">
                {heroBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-body-md text-slate-800">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 sm:flex-row">
                <TrackedButton
                  href={SAMPLE_ANALYSIS_HREF}
                  size="large"
                  eventName="cta_sample_analysis_click"
                  eventParams={{ location: 'universities_hero_primary' }}
                  className="w-full sm:w-auto"
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={TALK_TO_LEANFM_HREF}
                  size="large"
                  eventName="cta_demo_click"
                  eventParams={{ location: 'universities_hero_secondary' }}
                  className="w-full border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
              <p className="mt-4 text-body-sm text-slate-600">
                Trusted by a Pittsburgh-area cultural institution. <a href="/results" className="font-semibold text-sky-700 underline-offset-4 hover:text-emerald-700 hover:underline">See the case study →</a>
              </p>
            </div>

            <div className="space-y-4">
              <PhotoPlaceholder
                label="University campus building, central plant, or facilities operations area"
                alt="University campus building, central plant, or facilities operations area"
                src="/media/leanfm-images/university-students-library.jpg"
                aspect="video"
                overlay={false}
                className="border-white shadow-[0_24px_90px_rgba(30,64,175,0.18)]"
              />
              <CampusVisual />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-sky-100 bg-sky-50/70">
        <div className="container-wide py-7">
          <div className="grid gap-5 xl:grid-cols-[0.7fr_1.3fr] xl:items-center">
            <div>
              <h2 className="font-display text-body-lg font-semibold text-slate-950">
                Why Campus Facilities Teams Are Taking a Closer Look
              </h2>
              <p className="mt-3 text-body-sm leading-relaxed text-slate-700">
                LeanFM was developed from facilities research at Carnegie Mellon University — peer-institution credibility your facilities team and your board will both recognize.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {urgencyItems.map((item) => (
                <p key={item} className="border-l border-sky-200 pl-4 text-body-sm leading-relaxed text-slate-700">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-slate-950">Most Systems Show Data—But Don’t Show What Matters</h2>
              <div className="space-y-5 text-body-lg leading-relaxed text-slate-700">
                <p>
                  Campus systems generate a large amount of data, but identifying which issues actually need attention is not straightforward.
                </p>
                <p>
                  On many campuses, the challenge isn’t lack of data—it’s knowing what actually matters.
                </p>
                <p className="font-display text-2xl font-semibold leading-snug text-emerald-700">
                  The costliest problems are often the ones buried in the data, not flagged by alarms.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {problemExamples.map((example) => (
                <div key={example} className="rounded-xl border border-sky-100 bg-white/90 shadow-sm p-5">
                  <Network className="mb-5 h-6 w-6 text-sky-700" aria-hidden="true" />
                  <p className="font-display text-body-lg font-semibold text-slate-950">{example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_50%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-slate-950">Small Issues Multiply Across Buildings</h2>
              <div className="space-y-5">
                <p className="body-large text-slate-700">Campuses rarely operate as a single system.</p>
                <p className="body-large text-slate-700">
                  On a campus, even minor inefficiencies can scale across multiple buildings and systems.
                </p>
                <p className="body-large text-slate-700">
                  Different buildings, systems, and teams often operate independently, making it difficult to identify patterns or shared issues.
                </p>
                <p className="body-large text-slate-700">
                  Without a clear way to prioritize, teams are left reacting instead of addressing root issues.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {campusImpacts.map((impact) => (
                <div key={impact} className="flex min-h-20 items-center gap-3 rounded-xl border border-sky-100 bg-white/90 shadow-sm p-4">
                  <ThermometerSun className="h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-950">{impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className="heading-2 mb-5 text-slate-950">Turn Complex Data Into Clear Priorities</h2>
              <p className="body-large text-slate-700 max-w-2xl">
                LeanFM analyzes existing building system data across campus buildings and surfaces the issues that matter most.
              </p>
            </div>
            <div className="space-y-3">
              {approachBullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3 rounded-xl border border-sky-100 bg-white/90 shadow-sm p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-950">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_50%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-slate-950">Common Issues Across Campus Buildings</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {campusIssues.map((issue) => (
                <div key={issue} className="flex min-h-20 items-center gap-3 rounded-xl border border-sky-100 bg-white/90 shadow-sm p-4">
                  <Search className="h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-950">{issue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-slate-950">Examples of Hidden Issues on Campus</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {practiceExamples.map((example) => (
                <div key={example} className="rounded-xl border border-emerald-200 bg-emerald-50 shadow-sm p-5">
                  <Building2 className="mb-5 h-6 w-6 text-sky-700" aria-hidden="true" />
                  <p className="font-display text-body-lg font-semibold leading-snug text-slate-950">{example}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-sky-100 bg-white/90 shadow-sm p-6">
            <h3 className="mb-5 font-display text-2xl font-semibold text-slate-950">
              Campus-specific patterns worth checking
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {campusSpecificExamples.map((example) => (
                <p key={example} className="border-l border-emerald-300 pl-4 text-body-sm leading-relaxed text-slate-700">
                  {example}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm p-7 text-center md:p-10">
            <h2 className="mb-6 font-display text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
              Want to see this across your campus?
            </h2>
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              size="large"
              eventName="cta_sample_analysis_click"
              eventParams={{ location: 'universities_midpage_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_50%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4 text-slate-950">Simple Process Across Campus Systems</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-xl border border-sky-100 bg-white/90 shadow-sm p-5">
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 font-display font-semibold text-emerald-700">
                  {index + 1}
                </span>
                <p className="font-display text-body-lg font-semibold leading-snug text-slate-950">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-slate-950">Clear Findings Your Team Can Act On</h2>
              <div className="space-y-5">
                <p className="body-large text-slate-700">
                  Instead of reviewing large volumes of system data, your team gets a focused list of issues that actually matter.
                </p>
                <p className="body-large text-slate-700">
                  This helps facilities, energy, and operations teams align on what needs attention first.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {deliverables.map((deliverable) => (
                <div key={deliverable} className="rounded-xl border border-sky-100 bg-white/90 shadow-sm p-5">
                  <ClipboardCheck className="mb-5 h-6 w-6 text-sky-700" aria-hidden="true" />
                  <p className="font-display text-body-lg font-semibold leading-snug text-slate-950">{deliverable}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_50%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="mb-10 max-w-2xl">
            <h2 className="heading-2 mb-4 text-slate-950">What This Means for Your Campus</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome) => (
              <div key={outcome} className="rounded-xl border border-sky-100 bg-white/90 shadow-sm p-5">
                <CheckCircle2 className="mb-5 h-6 w-6 text-sky-700" aria-hidden="true" />
                <p className="font-display text-body-lg font-semibold leading-snug text-slate-950">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-sky-100 bg-white">
        <div className="container-wide py-7">
          <div className="grid gap-5 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
            <h2 className="font-display text-body-lg font-semibold text-slate-950">
              Built for Complex, Real-World Systems
            </h2>
            <div className="grid gap-3 md:grid-cols-3">
              {credibilityItems.map((item) => (
                <p key={item} className="border-l border-sky-200 pl-4 text-body-sm leading-relaxed text-slate-700">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTASection
        headline="Bring hidden campus issues into focus."
        body="Request a Sample Analysis to identify hidden issues affecting energy use, comfort, and system performance across your campus."
        primaryHref={SAMPLE_ANALYSIS_HREF}
        primaryLocation="universities_final_primary"
        secondaryLocation="universities_final_secondary"
      />

      <StickyCtaBar
        heroId="universities-hero"
        href={SAMPLE_ANALYSIS_HREF}
        message="Send existing campus building data and see which hidden issues are worth attention first."
      />
    </>
  )
}
