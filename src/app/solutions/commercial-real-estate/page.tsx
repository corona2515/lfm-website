import { Metadata } from 'next'
import {
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Search,
  ThermometerSun,
} from 'lucide-react'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import { FinalCTASection, PhotoPlaceholder } from '@/components/visual/LeanFmVisuals'
import { CTA_LABELS } from '@/lib/constants'

const SAMPLE_ANALYSIS_HREF = '/contact?intent=sample-analysis&source=cre'
const TALK_TO_LEANFM_HREF = '/contact?intent=demo&source=cre_demo'

export const metadata: Metadata = {
  title: 'Commercial Real Estate',
  description:
    'LeanFM helps commercial real estate teams uncover hidden building system problems that affect operating costs, tenant comfort, and system performance.',
}

const heroBullets = [
  'Identify hidden system issues affecting cost and comfort',
  'Reduce unnecessary runtime and energy waste',
  'Improve operational visibility across properties',
  'Surface issues that quietly impact operating costs across your portfolio',
]

const urgencyItems = [
  'Energy and operating costs continue to rise',
  'Tenant expectations for comfort remain high',
  'Building systems are becoming more complex',
  'Portfolio visibility is often limited',
  'Pressure to improve NOI without major capital investment',
]

const problemExamples = [
  'Systems running when spaces are unoccupied',
  'Simultaneous heating and cooling',
  'Schedules not aligned with tenant use',
  'Control issues impacting comfort',
  'Sensor drift affecting performance',
]

const portfolioImpacts = [
  'Increased operating expenses',
  'Tenant complaints and dissatisfaction',
  'Unnecessary strain on equipment',
  'Reactive maintenance',
  'Issues that quietly impact NOI over time',
]

const approachBullets = [
  'No new hardware required',
  'Works with existing building systems',
  'Focused on actionable results, not dashboards',
]

const creIssues = [
  'Equipment running outside tenant hours',
  'Simultaneous heating and cooling',
  'Schedule mismatches',
  'Control sequence issues',
  'Sensor inaccuracies',
  'Comfort-impacting faults',
]

const practiceExamples = [
  'HVAC systems running nights and weekends in partially occupied buildings',
  'Heating and cooling systems working against each other in tenant spaces',
  'Schedules not matching actual tenant occupancy',
  'Sensors drifting enough to affect comfort and system behavior',
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
  'Lower operating costs',
  'Improved tenant comfort',
  'Better use of engineering resources',
  'Fewer unexpected system issues',
]

const credibilityItems = [
  'Developed from research at Carnegie Mellon University',
  'Money-back ROI guarantee on every engagement',
  'Designed for teams managing multiple properties',
]

function PortfolioVisual() {
  const properties = ['Office', 'Mixed-use', 'Campus', 'Portfolio']
  const signals = ['Runtime', 'Schedules', 'Comfort']

  return (
    <div className="relative mx-auto max-w-xl rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-[0_24px_80px_rgba(30,64,175,0.14)]">
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.12),transparent_36%)]" />
      <div className="relative">
        <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
          Portfolio building signals
        </p>
        <div className="grid grid-cols-2 gap-3">
          {properties.map((property) => (
            <div key={property} className="rounded-xl border border-sky-100 bg-sky-50/70 p-4">
              <Building2 className="mb-4 h-6 w-6 text-sky-700" aria-hidden="true" />
              <p className="font-display text-body-lg font-semibold text-slate-950">{property}</p>
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
            Prioritized actions
          </p>
          <div className="mt-4 space-y-2">
            {['Operating cost risk', 'Tenant comfort risk', 'Equipment strain'].map((finding, index) => (
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

export default function CommercialRealEstatePage() {
  return (
    <>
      <section id="cre-hero" className="relative overflow-hidden border-b border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_48%,#f4fbef_100%)]">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-35" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-sky-200/55 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <p className="mb-5 text-body-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                For Commercial Real Estate
              </p>
              <h1 className="mb-6 max-w-[12ch] font-body text-[3.15rem] font-semibold leading-[0.98] tracking-normal text-slate-950 md:text-[4.05rem] lg:text-[4.6rem]">
                Find the hidden HVAC waste affecting operating costs, tenant experience, and NOI.
              </h1>
              <p className="body-large text-slate-700 mb-7 max-w-2xl">
                LeanFM analyzes existing building system data to uncover hidden problems that waste energy, increase operating costs, and impact tenant comfort across your buildings—often before they trigger alarms.
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
                  eventParams={{ location: 'cre_hero_primary' }}
                  className="w-full sm:w-auto"
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={TALK_TO_LEANFM_HREF}
                  size="large"
                  eventName="cta_demo_click"
                  eventParams={{ location: 'cre_hero_secondary' }}
                  className="w-full border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <div className="space-y-4">
              <PhotoPlaceholder
                label="Commercial office building exterior, lobby, or mechanical room"
                alt="Commercial office building exterior, lobby, or mechanical room"
                src="/media/leanfm-images/commercial-office-exterior.jpg"
                aspect="video"
                overlay={false}
                className="border-white shadow-[0_24px_90px_rgba(30,64,175,0.18)]"
              />
              <PortfolioVisual />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-sky-100 bg-sky-50/70">
        <div className="container-wide py-7">
          <div className="grid gap-5 xl:grid-cols-[0.7fr_1.3fr] xl:items-center">
            <h2 className="font-display text-body-lg font-semibold text-slate-950">
              Why CRE Teams Are Paying Closer Attention to System Performance
            </h2>
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
              <h2 className="heading-2 mb-5 text-slate-950">Most Building Systems Catch Failures—But Miss What’s Costing You</h2>
              <div className="space-y-5 text-body-lg leading-relaxed text-slate-700">
                <p>
                  Building systems are designed to alert when something breaks. But many of the issues that impact operating costs and tenant experience are not obvious failures.
                </p>
                <p className="font-display text-2xl font-semibold leading-snug text-emerald-700">
                  The costliest problems are often the ones nobody is being alerted about.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {problemExamples.map((example) => (
                <div key={example} className="rounded-xl border border-sky-100 bg-white/90 shadow-sm p-5">
                  <Clock className="mb-5 h-6 w-6 text-sky-700" aria-hidden="true" />
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
              <h2 className="heading-2 mb-5 text-slate-950">Small Inefficiencies Impact Portfolio Performance</h2>
              <div className="space-y-5">
                <p className="body-large text-slate-700">
                  In commercial real estate, small inefficiencies show up directly in operating costs and tenant experience.
                </p>
                <p className="body-large text-slate-700">
                  Across a portfolio, small operational issues don’t stay small. They add up across buildings, tenants, and operating cycles.
                </p>
                <p className="body-large text-slate-700">
                  Across multiple buildings, these issues compound quickly and are rarely visible in one place.
                </p>
                <p className="body-large text-slate-700">
                  Hidden HVAC waste affects more than the utility bill. It can affect tenant comfort, engineer workload, operating expense, renewal risk, and asset performance.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {portfolioImpacts.map((impact) => (
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
              <h2 className="heading-2 mb-5 text-slate-950">Find What Your Systems Aren’t Showing You</h2>
              <p className="body-large text-slate-700 max-w-2xl">
                LeanFM analyzes existing building system data to surface hidden issues and turn them into clear, prioritized findings across your buildings.
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
              <h2 className="heading-2 mb-4 text-slate-950">Common Issues Across Commercial Properties</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {creIssues.map((issue) => (
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
              <h2 className="heading-2 mb-4 text-slate-950">Examples of Hidden Issues</h2>
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

          <div className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm p-7 text-center md:p-10">
            <h2 className="mb-6 font-display text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
              Want to see this across your portfolio?
            </h2>
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              size="large"
              eventName="cta_sample_analysis_click"
              eventParams={{ location: 'cre_midpage_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_50%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4 text-slate-950">Simple Process Across Properties</h2>
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
              <h2 className="heading-2 mb-4 text-slate-950">Clear Findings That Support Better Decisions</h2>
              <div className="space-y-5">
                <p className="body-large text-slate-700">
                  Instead of reviewing thousands of data points, your team gets a short list of issues that actually matter.
                </p>
                <p className="body-large text-slate-700">
                  This helps both engineering teams and asset managers align on what actually needs attention.
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
            <h2 className="heading-2 mb-4 text-slate-950">What This Means for Your Properties</h2>
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
              Built for Complex, Real-World Buildings
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
        headline="Find the hidden HVAC issues affecting your assets."
        body="Request a Sample Analysis to identify issues that may be driving operating costs, affecting tenants, or creating unnecessary system strain."
        primaryHref={SAMPLE_ANALYSIS_HREF}
        primaryLocation="cre_final_primary"
        secondaryLocation="cre_final_secondary"
      />

      <StickyCtaBar
        heroId="cre-hero"
        href={SAMPLE_ANALYSIS_HREF}
        message="Send existing building data and see which hidden issues are worth attention first."
      />
    </>
  )
}
