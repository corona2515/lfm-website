import { Metadata } from 'next'
import {
  Banknote,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileSearch,
  Gauge,
  GraduationCap,
  Landmark,
  Leaf,
  Settings2,
  School,
  Search,
  ThermometerSun,
  Upload,
  UsersRound,
  Wrench,
} from 'lucide-react'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import { FinalCTASection, PhotoPlaceholder } from '@/components/visual/LeanFmVisuals'
import { CTA_LABELS } from '@/lib/constants'

const SAMPLE_ANALYSIS_HREF = '/contact?intent=sample-analysis&source=k12'
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
  { label: 'Energy costs continue to rise', Icon: Banknote },
  { label: 'Staffing is limited across facilities teams', Icon: UsersRound },
  { label: 'Comfort complaints impact classrooms', Icon: ThermometerSun },
]

const problemExamples = [
  { label: 'Systems running after hours', Icon: Clock },
  { label: 'Heating and cooling happening at the same time', Icon: ThermometerSun },
  { label: 'Schedules drifting over time', Icon: CalendarClock },
  { label: 'Sensors becoming inaccurate', Icon: Gauge },
  { label: 'Control issues affecting classrooms', Icon: Settings2 },
]

const districtImpacts = [
  { label: 'Wasted energy', Icon: Leaf },
  { label: 'Avoidable costs', Icon: Banknote },
  { label: 'Unnecessary strain on equipment', Icon: Wrench },
  { label: 'Reactive maintenance', Icon: ClipboardCheck },
  { label: 'Issues that go unnoticed for months', Icon: Search },
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
  { label: 'Request a Sample Analysis', Icon: ClipboardCheck },
  { label: 'Share available building system data', Icon: Upload },
  { label: 'LeanFM analyzes the data', Icon: FileSearch },
  { label: 'Review findings with our team', Icon: UsersRound },
]

const buyerPriorities = [
  {
    title: 'Facilities Director',
    description: 'Clearer maintenance priorities across classrooms, gyms, offices, and district facilities.',
  },
  {
    title: 'Business Manager',
    description: 'Better visibility into avoidable operating costs before they keep compounding.',
  },
  {
    title: 'Superintendent',
    description: 'Fewer distractions and better stewardship of public resources.',
  },
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
  'Developed from research at Carnegie Mellon University',
  'Money-back ROI guarantee on every engagement',
  'Experience with institutions like museums and universities',
  'Designed for facilities teams managing multiple buildings',
]

function DistrictVisual() {
  const buildings = [
    { label: 'Elementary', Icon: School },
    { label: 'Middle School', Icon: UsersRound },
    { label: 'High School', Icon: GraduationCap },
    { label: 'Administration', Icon: Landmark },
  ]
  const signals = [
    { label: 'Schedules', Icon: CalendarClock },
    { label: 'Runtime', Icon: Clock },
    { label: 'Setpoints', Icon: ThermometerSun },
  ]

  return (
    <div className="relative mx-auto w-full max-w-xl min-w-0 rounded-3xl border border-sky-100 bg-white/90 p-4 shadow-[0_24px_80px_rgba(30,64,175,0.14)] backdrop-blur">
      <div aria-hidden="true" className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_18%_10%,rgba(144,204,124,0.18),transparent_30%),radial-gradient(circle_at_86%_86%,rgba(14,165,233,0.12),transparent_34%)]" />
      <div className="relative">
        <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
          District building signals
        </p>
        <div className="grid grid-cols-2 gap-3">
          {buildings.map(({ label, Icon }) => (
            <div key={label} className="rounded-2xl border border-sky-100 bg-white/80 p-3 shadow-sm">
              <Icon className="mb-3 h-5 w-5 text-sky-700" aria-hidden="true" />
              <p className="font-display text-body-lg font-semibold text-slate-950">{label}</p>
            </div>
          ))}
        </div>

        <div className="my-4 grid grid-cols-3 gap-2">
          {signals.map(({ label, Icon }) => (
            <div key={label} className="flex items-center justify-center gap-2 rounded-xl border border-sky-100 bg-sky-50 px-3 py-3 text-center text-body-sm font-medium text-sky-900">
              <Icon className="h-4 w-4 text-sky-700" aria-hidden="true" />
              {label}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
            Prioritized findings
          </p>
          <div className="mt-3 space-y-2">
            {['After-hours runtime', 'Comfort risk', 'Equipment strain'].map((finding, index) => (
              <div key={finding} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">
                <span className="text-body-sm font-medium text-slate-900">{finding}</span>
                <span className="text-body-xs font-semibold text-emerald-700">Priority {index + 1}</span>
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
      <section id="k12-schools-hero" className="relative overflow-hidden border-b border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_48%,#f4fbef_100%)]">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-35" />
        <div aria-hidden="true" className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-200/45 blur-3xl" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-sky-200/55 blur-3xl" />
        <div className="container-wide relative z-10 pt-24 pb-14 md:pt-32 md:pb-20">
          <div className="grid min-w-0 max-w-full items-center gap-10 overflow-hidden lg:grid-cols-[0.94fr_1.06fr] lg:overflow-visible">
            <div className="w-full min-w-0 max-w-[22rem] sm:max-w-2xl md:max-w-3xl">
              <h1 className="mb-6 max-w-[20rem] break-words font-body text-[1.82rem] font-semibold leading-[1.08] tracking-normal text-slate-950 sm:max-w-full sm:text-[2.4rem] md:text-[3.05rem] lg:text-[3.35rem] xl:text-[3.55rem]">
                Find the hidden HVAC issues driving complaints, waste, and maintenance strain across your district.
              </h1>
              <p className="body-large mb-7 max-w-[22rem] text-slate-700 sm:max-w-2xl">
                LeanFM analyzes existing building system data to uncover hidden problems that waste energy, increase costs, and create comfort issues across classrooms, gyms, and district facilities—often without triggering alarms.
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
                  className="w-full border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <div className="w-full min-w-0 max-w-[22rem] space-y-4 sm:max-w-full lg:pl-4">
              <PhotoPlaceholder
                label="K-12 school building exterior, classroom hallway, or district facility"
                alt="K-12 facilities team inspecting HVAC equipment at a school district building"
                src="/media/leanfm-images/k12-hvac-inspection.jpg"
                aspect="video"
                imageClassName="object-[58%_50%]"
                className="w-full max-w-full border-white shadow-[0_24px_90px_rgba(30,64,175,0.18)]"
                overlay={false}
              />
              <DistrictVisual />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-sky-100 bg-white">
        <div className="container-wide py-7">
          <div className="grid gap-5 lg:grid-cols-[0.58fr_1.42fr] lg:items-center">
            <h2 className="font-display text-body-lg font-semibold text-slate-950">
              Why Districts Look at This Now
            </h2>
            <div className="grid gap-3 md:grid-cols-3">
              {urgencyItems.map(({ label, Icon }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
                  <Icon className="h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                  <p className="text-body-sm font-medium leading-relaxed text-slate-800">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-slate-950">Most School Systems Catch Failures—But Miss the Costly Problems</h2>
              <div className="space-y-5 text-body-lg leading-relaxed text-slate-700">
                <p>
                  School buildings often rely on systems that alert when something breaks. But many of the issues that drive energy costs and comfort complaints are not obvious failures.
                </p>
                <p className="font-display text-2xl font-semibold leading-snug text-emerald-700">
                  The costliest problems are often the ones nobody is being alerted about.
                </p>
                <p>
                  These problems often go unnoticed, but they show up in budgets, complaints, and maintenance workload.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {problemExamples.map(({ label, Icon }) => (
                <div key={label} className="rounded-2xl border border-sky-100 bg-slate-50 p-5 shadow-sm">
                  <Icon className="mb-5 h-6 w-6 text-sky-700" aria-hidden="true" />
                  <p className="font-display text-body-lg font-semibold text-slate-950">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#eef8ff_0%,#f7fbf3_100%)]">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-slate-950">Small Issues Add Up Quickly Across a District</h2>
              <p className="body-large text-slate-700">
                Across a district, small inefficiencies don’t stay small. Limited staff, aging systems, tight budgets, and daily comfort needs make it hard to catch everything manually.
              </p>
              <div className="mt-7 rounded-3xl border border-emerald-200 bg-white p-5 shadow-sm">
                <p className="mb-4 font-display text-xl font-semibold text-slate-950">
                  Want to see this in your district?
                </p>
                <TrackedButton
                  href={SAMPLE_ANALYSIS_HREF}
                  eventName="cta_sample_analysis_click"
                  eventParams={{ location: 'k12_schools_impact_inline' }}
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {districtImpacts.map(({ label, Icon }) => (
                <div key={label} className="flex min-h-20 items-center gap-3 rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-body-md font-medium text-slate-900">{label}</p>
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
              <h2 className="heading-2 mb-5 text-slate-950">Find What Your Systems Aren’t Showing You</h2>
              <p className="body-large max-w-2xl text-slate-700">
                LeanFM analyzes existing building system data across your schools to identify hidden issues and turn them into clear, prioritized findings.
              </p>
            </div>
            <div className="space-y-3">
              {approachBullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-900">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-slate-50">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-slate-950">Common Issues We See in Schools</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {schoolIssues.map((issue) => (
                <div key={issue} className="flex min-h-20 items-center gap-3 rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
                  <Search className="h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-900">{issue}</p>
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
              <h2 className="heading-2 mb-4 text-slate-950">What This Looks Like in Practice</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {practiceExamples.map((example) => (
                <div key={example} className="rounded-2xl border border-sky-100 bg-sky-50/70 p-5">
                  <Building2 className="mb-5 h-6 w-6 text-sky-700" aria-hidden="true" />
                  <p className="font-display text-body-lg font-semibold leading-snug text-slate-950">{example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#f7fbf3_0%,#eef8ff_100%)]">
        <div className="container-default">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4 text-slate-950">Simple Process for Districts</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {processSteps.map(({ label, Icon }, index) => (
              <div key={label} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 font-display font-semibold text-emerald-700">
                    {index + 1}
                  </span>
                  <Icon className="h-5 w-5 text-sky-700" aria-hidden="true" />
                </div>
                <p className="font-display text-body-lg font-semibold leading-snug text-slate-950">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="mb-10 max-w-2xl">
            <h2 className="heading-2 mb-4 text-slate-950">Useful for the People Accountable for District Operations</h2>
            <p className="body-large text-slate-700">
              A Sample Analysis gives facilities, finance, and district leadership a shared view of hidden issues worth attention.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {buyerPriorities.map((priority) => (
              <div key={priority.title} className="rounded-2xl border border-sky-100 bg-slate-50 p-5 shadow-sm">
                <p className="font-display text-xl font-semibold text-slate-950">{priority.title}</p>
                <p className="mt-3 text-body-sm leading-relaxed text-slate-600">{priority.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-slate-50">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-slate-950">Clear, Actionable Findings</h2>
              <p className="body-large text-slate-700">
                Instead of reviewing thousands of data points, your team gets a short list of issues that actually matter.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {deliverables.map((deliverable) => (
                <div key={deliverable} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                  <ClipboardCheck className="mb-5 h-6 w-6 text-sky-700" aria-hidden="true" />
                  <p className="font-display text-body-lg font-semibold leading-snug text-slate-950">{deliverable}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="mb-10 max-w-2xl">
            <h2 className="heading-2 mb-4 text-slate-950">What This Means for Your District</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome) => (
              <div key={outcome} className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
                <CheckCircle2 className="mb-5 h-6 w-6 text-emerald-600" aria-hidden="true" />
                <p className="font-display text-body-lg font-semibold leading-snug text-slate-950">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-sky-100 bg-slate-50">
        <div className="container-wide py-7">
          <div className="grid gap-5 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
            <h2 className="font-display text-body-lg font-semibold text-slate-950">
              Built for Complex, Real-World Buildings
            </h2>
            <div className="grid gap-3 md:grid-cols-4">
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
        headline="Find the issues draining district resources."
        body="Request a Sample Analysis to identify hidden building system issues affecting energy, comfort, and maintenance priorities across your schools."
        primaryHref={SAMPLE_ANALYSIS_HREF}
        primaryLocation="k12_schools_final_primary"
        secondaryLocation="k12_schools_final_secondary"
      />

      <StickyCtaBar
        heroId="k12-schools-hero"
        href={SAMPLE_ANALYSIS_HREF}
        message="Send existing school building data and see which hidden issues are worth attention first."
      />
    </>
  )
}
