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
  'Developed with expertise from Carnegie Mellon',
  'Experience with institutions like The Warhol Museum',
  'Designed for environments where stability and consistency matter',
]

function MuseumVisual() {
  const spaces = ['Gallery', 'Collections', 'Archive', 'Public']
  const signals = ['Temperature', 'Runtime', 'Control']

  return (
    <div className="relative mx-auto max-w-xl rounded-2xl border border-slate-700/70 bg-slate-950/75 p-5 shadow-[0_28px_90px_rgba(2,6,23,0.42)]">
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.12),transparent_36%)]" />
      <div className="relative">
        <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Environmental system signals
        </p>
        <div className="grid grid-cols-2 gap-3">
          {spaces.map((space) => (
            <div key={space} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <Landmark className="mb-4 h-6 w-6 text-cyan-300" aria-hidden="true" />
              <p className="font-display text-body-lg font-semibold text-white">{space}</p>
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
            Stabilized priorities
          </p>
          <div className="mt-4 space-y-2">
            {['Sensor drift', 'Control inconsistency', 'System strain'].map((finding, index) => (
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

export default function MuseumsPage() {
  return (
    <>
      <section id="museums-hero" className="relative overflow-hidden border-b border-slate-800/70 bg-slate-950">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <p className="mb-5 text-body-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                For Museums
              </p>
              <h1 className="mb-6 max-w-[12ch] font-body text-[3.15rem] font-semibold leading-[0.98] tracking-normal text-white md:text-[4.05rem] lg:text-[4.6rem]">
                Protect sensitive environments by finding the subtle system issues your BAS may miss.
              </h1>
              <p className="body-large mb-7 max-w-2xl">
                LeanFM analyzes existing building system data to uncover hidden problems that can impact environmental stability, energy use, and system performance—often before they trigger alarms or become visible.
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
                  className="w-full sm:w-auto"
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <MuseumVisual />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800/70 bg-slate-900/40">
        <div className="container-wide py-7">
          <div className="grid gap-5 xl:grid-cols-[0.7fr_1.3fr] xl:items-center">
            <h2 className="font-display text-body-lg font-semibold text-white">
              Why Museums Are Taking a Closer Look at System Performance
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
              <h2 className="heading-2 mb-5 text-white">Most Systems Alert on Failures—Not Subtle Drift</h2>
              <div className="space-y-5 text-body-lg leading-relaxed text-slate-300">
                <p>
                  Museum environments rely on stable conditions. But many issues that affect those conditions are gradual and do not trigger obvious alarms.
                </p>
                <p>
                  In many cases, systems appear to be working—but small deviations are already developing.
                </p>
                <p className="font-display text-2xl font-semibold leading-snug text-cyan-200">
                  The most important issues are often the ones that develop slowly over time.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {problemExamples.map((example) => (
                <div key={example} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                  <Gauge className="mb-5 h-6 w-6 text-cyan-300" aria-hidden="true" />
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
              <h2 className="heading-2 mb-5 text-white">Small Variations Can Create Larger Risks</h2>
              <div className="space-y-5">
                <p className="body-large">
                  In museum environments, stability is not just preferred—it is expected.
                </p>
                <p className="body-large">
                  Even small inconsistencies across spaces or over time can create challenges that are difficult to diagnose.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {museumImpacts.map((impact) => (
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
              <h2 className="heading-2 mb-5 text-white">Make Subtle Problems Visible</h2>
              <p className="body-large max-w-2xl">
                LeanFM analyzes existing building system data to identify patterns and issues that are difficult to detect through standard monitoring.
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
              <h2 className="heading-2 mb-4 text-white">Common Issues We Identify</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {museumIssues.map((issue) => (
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
              <h2 className="heading-2 mb-4 text-white">Examples of Hidden Issues</h2>
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

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4 text-white">Simple Process Using Existing Data</h2>
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
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-white">Clear, Actionable Findings</h2>
              <div className="space-y-5">
                <p className="body-large">
                  Instead of reviewing large volumes of data, your team gets a focused set of issues that matter.
                </p>
                <p className="body-large">
                  This gives your team a clearer understanding of how systems are actually performing—not just how they appear to be performing.
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
            <h2 className="heading-2 mb-4 text-white">What This Means for Your Environment</h2>
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

      <section className="border-y border-cyan-400/20 bg-cyan-500/10">
        <div className="container-default py-8">
          <div className="grid gap-4 lg:grid-cols-[0.45fr_1fr] lg:items-center">
            <h2 className="font-display text-body-lg font-semibold text-white">The Andy Warhol Museum: documented savings from hidden BAS logic faults</h2>
            <p className="text-body-md leading-relaxed text-cyan-50">
              The Andy Warhol Museum case study showed $100K+ in ongoing annual savings after LeanFM helped identify BAS logic faults that were corrected.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800/70 bg-slate-950">
        <div className="container-wide py-7">
          <div className="grid gap-5 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
            <h2 className="font-display text-body-lg font-semibold text-white">
              Built for Complex, Sensitive Environments
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
            <h2 className="heading-2 mb-5 text-white">Protect Sensitive Spaces With Better System Clarity</h2>
            <p className="body-large mb-8">
              Request a Sample Analysis to identify hidden issues that may be affecting environmental stability and system performance.
            </p>
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              size="large"
              eventName="cta_sample_analysis_click"
              eventParams={{ location: 'museums_final_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <StickyCtaBar
        heroId="museums-hero"
        href={SAMPLE_ANALYSIS_HREF}
        message="Send existing museum building data and see which hidden issues are worth attention first."
      />
    </>
  )
}
