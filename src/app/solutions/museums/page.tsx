import { Metadata } from 'next'
import {
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  Landmark,
  Search,
  ThermometerSun,
} from 'lucide-react'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import { FinalCTASection, PhotoPlaceholder } from '@/components/visual/LeanFmVisuals'
import { CTA_LABELS } from '@/lib/constants'

const SAMPLE_ANALYSIS_HREF = '/contact?intent=sample-analysis&source=museums'
const TALK_TO_LEANFM_HREF = '/contact?intent=demo&source=museums_demo'

export const metadata: Metadata = {
  title: 'Museums',
  description:
    'LeanFM helps museums uncover hidden building system issues that may affect environmental stability, energy use, and system performance.',
}

const heroBullets = [
  'Identify subtle system issues affecting environmental conditions',
  'Reduce unnecessary system strain and energy waste',
  'Help your team act before problems become visible',
  'Maintain more consistent environmental conditions across sensitive spaces',
]

const urgencyItems = [
  'Environmental stability is critical',
  'Systems must operate consistently over time',
  'Small deviations can have larger consequences',
  'Many issues are not obvious until they become visible',
  'Increasing expectations for environmental control and consistency',
]

const problemExamples = [
  'Gradual sensor drift',
  'Systems working harder than necessary',
  'Control inconsistencies',
  'Conditions fluctuating more than expected',
  'Schedules not aligned with actual needs',
]

const museumImpacts = [
  'Inconsistent environmental conditions',
  'Unnecessary system strain',
  'Increased maintenance pressure',
  'Risk to sensitive spaces',
]

const approachBullets = [
  'No new hardware required',
  'Works with existing building systems',
  'Focused on early detection and clarity',
]

const museumIssues = [
  'Sensor inaccuracies and drift',
  'Systems operating outside intended ranges',
  'Control inconsistencies',
  'Scheduling mismatches',
  'Gradual performance changes',
]

const practiceExamples = [
  'Environmental conditions drifting outside intended ranges over time',
  'Sensors reporting slightly incorrect values affecting control behavior',
  'Systems compensating in ways that increase strain',
  'Inconsistencies between similar spaces',
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
  'Improved stability',
  'Reduced system strain',
  'Better operational clarity',
  'Fewer unexpected issues',
]

const credibilityItems = [
  'Developed from research at Carnegie Mellon University',
  'Documented six-figure annual savings at The Andy Warhol Museum',
  'Money-back ROI guarantee on every engagement',
]

function MuseumVisual() {
  const spaces = ['Gallery', 'Collections', 'Archive', 'Public']
  const signals = ['Temperature', 'Runtime', 'Control']

  return (
    <div className="relative mx-auto max-w-xl rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-[0_24px_80px_rgba(30,64,175,0.14)]">
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.12),transparent_36%)]" />
      <div className="relative">
        <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
          Environmental system signals
        </p>
        <div className="grid grid-cols-2 gap-3">
          {spaces.map((space) => (
            <div key={space} className="rounded-xl border border-sky-100 bg-sky-50/70 p-4">
              <Landmark className="mb-4 h-6 w-6 text-sky-700" aria-hidden="true" />
              <p className="font-display text-body-lg font-semibold text-slate-950">{space}</p>
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
            Stabilized priorities
          </p>
          <div className="mt-4 space-y-2">
            {['Sensor drift', 'Control inconsistency', 'System strain'].map((finding, index) => (
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

export default function MuseumsPage() {
  return (
    <>
      <section id="museums-hero" className="relative overflow-hidden border-b border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_48%,#f4fbef_100%)]">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-35" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-sky-200/55 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <p className="mb-5 text-body-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                For Museums
              </p>
              <h1 className="mb-6 max-w-[12ch] font-body text-[3.15rem] font-semibold leading-[0.98] tracking-normal text-slate-950 md:text-[4.05rem] lg:text-[4.6rem]">
                Protect sensitive environments by finding the subtle system issues your BAS may miss.
              </h1>
              <p className="body-large text-slate-700 mb-7 max-w-2xl">
                LeanFM analyzes existing building system data to uncover hidden problems that can impact environmental stability, energy use, and system performance—often before they trigger alarms or become visible.
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
                  eventParams={{ location: 'museums_hero_primary' }}
                  className="w-full sm:w-auto"
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={TALK_TO_LEANFM_HREF}
                  size="large"
                  eventName="cta_demo_click"
                  eventParams={{ location: 'museums_hero_secondary' }}
                  className="w-full border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <div className="space-y-4">
              <PhotoPlaceholder
                label="Museum gallery, archive, or environmental control area"
                alt="Museum gallery, archive, or environmental control area"
                src="/media/leanfm-images/museum-building-ivy.jpg"
                aspect="video"
                overlay={false}
                className="border-white shadow-[0_24px_90px_rgba(30,64,175,0.18)]"
              />
              <MuseumVisual />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-sky-100 bg-sky-50/70">
        <div className="container-wide py-7">
          <div className="grid gap-5 xl:grid-cols-[0.7fr_1.3fr] xl:items-center">
            <h2 className="font-display text-body-lg font-semibold text-slate-950">
              Why Museums Are Taking a Closer Look at System Performance
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
              <h2 className="heading-2 mb-5 text-slate-950">Most Systems Alert on Failures—Not Subtle Drift</h2>
              <div className="space-y-5 text-body-lg leading-relaxed text-slate-700">
                <p>
                  Museum environments rely on stable conditions. But many issues that affect those conditions are gradual and do not trigger obvious alarms.
                </p>
                <p>
                  In many cases, systems appear to be working—but small deviations are already developing.
                </p>
                <p className="font-display text-2xl font-semibold leading-snug text-emerald-700">
                  The most important issues are often the ones that develop slowly over time.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {problemExamples.map((example) => (
                <div key={example} className="rounded-xl border border-sky-100 bg-white/90 shadow-sm p-5">
                  <Gauge className="mb-5 h-6 w-6 text-sky-700" aria-hidden="true" />
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
              <h2 className="heading-2 mb-5 text-slate-950">Small Variations Can Create Larger Risks</h2>
              <div className="space-y-5">
                <p className="body-large text-slate-700">
                  In museum environments, stability is not just preferred—it is expected.
                </p>
                <p className="body-large text-slate-700">
                  Even small inconsistencies across spaces or over time can create challenges that are difficult to diagnose.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {museumImpacts.map((impact) => (
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
              <h2 className="heading-2 mb-5 text-slate-950">Make Subtle Problems Visible</h2>
              <p className="body-large text-slate-700 max-w-2xl">
                LeanFM analyzes existing building system data to identify patterns and issues that are difficult to detect through standard monitoring.
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

      <section className="border-y border-emerald-200 bg-emerald-50 shadow-sm">
        <div className="container-default py-8">
          <div className="grid gap-4 lg:grid-cols-[0.45fr_1fr] lg:items-center">
            <h2 className="font-display text-body-lg font-semibold text-slate-950">The Andy Warhol Museum: documented savings from hidden BAS logic faults</h2>
            <p className="text-body-md leading-relaxed text-slate-700">
              The Andy Warhol Museum case study showed $100K+ in ongoing annual savings after LeanFM helped identify BAS logic faults that were corrected.
            </p>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_50%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-slate-950">Common Issues We Identify</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {museumIssues.map((issue) => (
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
              Want to see this in your environment?
            </h2>
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              size="large"
              eventName="cta_sample_analysis_click"
              eventParams={{ location: 'museums_midpage_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_50%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4 text-slate-950">Simple Process Using Existing Data</h2>
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
              <h2 className="heading-2 mb-4 text-slate-950">Clear, Actionable Findings</h2>
              <div className="space-y-5">
                <p className="body-large text-slate-700">
                  Instead of reviewing large volumes of data, your team gets a focused set of issues that matter.
                </p>
                <p className="body-large text-slate-700">
                  This gives your team a clearer understanding of how systems are actually performing—not just how they appear to be performing.
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
            <h2 className="heading-2 mb-4 text-slate-950">What This Means for Your Environment</h2>
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
              Built for Complex, Sensitive Environments
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
        headline="Protect sensitive spaces with better system clarity."
        body="Request a Sample Analysis to identify hidden issues that may be affecting environmental stability and system performance."
        primaryHref={SAMPLE_ANALYSIS_HREF}
        primaryLocation="museums_final_primary"
        secondaryLocation="museums_final_secondary"
      />

      <StickyCtaBar
        heroId="museums-hero"
        href={SAMPLE_ANALYSIS_HREF}
        message="Send existing museum building data and see which hidden issues are worth attention first."
      />
    </>
  )
}
