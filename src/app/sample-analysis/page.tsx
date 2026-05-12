import { Metadata } from 'next'
import {
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Search,
  Upload,
} from 'lucide-react'
import { Accordion } from '@/components/ui'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import {
  DataToActionFlow,
  DiagnosticInsightCard,
  FinalCTASection,
  PhotoPlaceholder,
} from '@/components/visual/LeanFmVisuals'
import { CTA_LABELS } from '@/lib/constants'

const SAMPLE_ANALYSIS_HREF = '/contact?intent=sample-analysis&source=sample_analysis'
const TALK_TO_LEANFM_HREF = '/contact?intent=demo&source=sample_analysis_demo'

export const metadata: Metadata = {
  title: 'Sample Analysis',
  description:
    'Request a LeanFM Sample Analysis to uncover hidden building system issues using existing trend data.',
}

const heroBullets = [
  'No new hardware required',
  'No on-site installation required to start',
  'You do not need to know exactly what is wrong',
  'Clear findings and next steps',
]

const dataTypes = [
  'Trend data',
  'Runtime data',
  'Setpoints',
  'Temperatures',
  'Schedules',
  'Sensor readings',
  'Equipment data exports',
]

const issueExamples = [
  'Equipment running when it should be off',
  'Simultaneous heating and cooling',
  'Schedule drift',
  'Control sequence issues',
  'Sensor inaccuracies',
  'Comfort-impacting faults',
  'Avoidable equipment strain',
]

const deliverables = [
  'Prioritized issue summary',
  'Plain-English explanation of each finding',
  'Estimated operational impact where available',
  'Supporting evidence from the data',
  'Recommended next steps',
  'Walkthrough call with LeanFM',
]

const processSteps = [
  'Share available building system data',
  'LeanFM analyzes the data',
  'Review findings with our team',
]

const faqItems = [
  {
    question: 'Do we need new hardware?',
    answer: 'No. We only need existing building system data.',
  },
  {
    question: 'What if we are not sure what data we have?',
    answer: 'LeanFM can help identify useful data exports from your building automation system.',
  },
  {
    question: 'Is this an energy audit?',
    answer:
      'Not exactly. Traditional audits often focus on equipment, building envelope, or broad recommendations. LeanFM looks at operational patterns in your existing system data.',
  },
  {
    question: 'Will this replace our BAS or controls vendor?',
    answer:
      'No. LeanFM works alongside your existing systems and vendors by helping identify issues worth investigating.',
  },
  {
    question: 'Do you guarantee results?',
    answer:
      'Yes — LeanFM backs every engagement with a money-back ROI guarantee. If we do not identify HVAC issues worth at least 3x the engagement fee in estimated annual operational impact, you get your money back. The guarantee is conditional on implementing the corrective actions in your findings report. See our Terms page for full details.',
  },
]

function SampleReportVisual() {
  return (
    <div className="space-y-4">
      <PhotoPlaceholder
        label="Facilities manager exporting BAS trend data or reviewing BAS workstation"
        alt="Facilities manager exporting BAS trend data or reviewing a building automation workstation"
        src="/media/leanfm-images/bas-control-room.jpg"
        aspect="video"
        imageClassName="object-[48%_50%]"
        sizes="(min-width: 1024px) 44vw, 100vw"
        className="border-white shadow-[0_24px_90px_rgba(30,64,175,0.18)]"
        overlay={false}
      />
      <div className="relative mx-auto max-w-xl rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-[0_24px_80px_rgba(30,64,175,0.14)]">
        <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(14,165,233,0.12),transparent_36%)]" />
        <div className="relative">
          <div className="mb-5 flex items-center justify-between border-b border-sky-100 pb-4">
            <div>
              <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Sample Analysis
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-slate-950">
                Low-friction diagnostic review
              </p>
            </div>
            <FileText className="h-7 w-7 text-sky-700" aria-hidden="true" />
          </div>

          <div className="grid gap-3">
            {[
              ['BAS trends uploaded', 'Runtime, setpoints, schedules'],
              ['Hidden patterns reviewed', 'Waste, drift, conflicts'],
              ['Findings walkthrough scheduled', 'Priorities and next steps'],
            ].map(([label, value], index) => (
              <div key={label} className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-xl border border-sky-100 bg-sky-50/70 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 font-display text-body-sm font-semibold text-emerald-700">
                  {index + 1}
                </span>
                <div>
                  <p className="text-body-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                    {label}
                  </p>
                  <p className="mt-1 text-body-md text-slate-800">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SampleAnalysisPage() {
  return (
    <>
      <section id="sample-analysis-hero" className="relative overflow-hidden border-b border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_48%,#f4fbef_100%)]">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-35" />
        <div aria-hidden="true" className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-200/45 blur-3xl" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-sky-200/55 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <h1 className="mb-6 max-w-[12ch] font-body text-[3.2rem] font-semibold leading-[0.98] tracking-normal text-slate-950 md:text-[4.2rem] lg:text-[4.8rem]">
                See what your BAS data is already telling you.
              </h1>
              <p className="body-large mb-7 max-w-2xl text-slate-700">
                Send existing trend data from your building automation system. LeanFM reviews it for hidden faults, energy waste, comfort risks, and control issues—then walks your team through what deserves attention first.
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
                  eventParams={{ location: 'sample_analysis_hero_primary' }}
                  className="w-full sm:w-auto"
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={TALK_TO_LEANFM_HREF}
                  size="large"
                  eventName="cta_demo_click"
                  eventParams={{ location: 'sample_analysis_hero_secondary' }}
                  className="w-full border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <SampleReportVisual />
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <h2 className="heading-2 text-slate-950">
              In one analysis, see what your system is missing
            </h2>
            <div>
              <p className="body-large text-slate-700">
                A Sample Analysis is a focused diagnostic review of your existing BAS trend data. LeanFM looks for patterns that traditional alarms often miss, then turns the findings into a clear set of issues, priorities, and next steps.
              </p>
              <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="font-display text-xl font-semibold leading-snug text-slate-950">
                  This is not a generic energy audit.
                </p>
                <p className="mt-3 text-body-md leading-relaxed text-slate-700">
                  It is a data-driven look at how your building systems are actually operating.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_58%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <h2 className="heading-2 mb-4 text-slate-950">Existing data to prioritized findings</h2>
            <p className="body-large text-slate-700">
              The analysis turns available BAS exports into a focused view of hidden patterns and clear actions.
            </p>
          </div>
          <DataToActionFlow variant="light" />
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-slate-950">Start With the Data You Already Have</h2>
              <p className="body-large text-slate-700">
                A Sample Analysis starts with available data from your building automation system or related building system exports.
              </p>
              <p className="mt-5 text-body-md leading-relaxed text-emerald-700">
                If you are not sure what data you have, LeanFM can help identify what is useful.
              </p>
              <p className="mt-5 text-body-md leading-relaxed text-slate-600">
                The point of the sample analysis is to show whether the data already contains actionable issues.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {dataTypes.map((dataType) => (
                <div key={dataType} className="flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50/70 p-4">
                  <Upload className="h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-800">{dataType}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_58%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-slate-950">We Look for the Issues That Quietly Add Up</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {issueExamples.map((issue) => (
                <div key={issue} className="flex min-h-20 items-center gap-3 rounded-xl border border-sky-100 bg-white/85 p-4 shadow-sm">
                  <Search className="h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-800">{issue}</p>
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
              <h2 className="heading-2 mb-4 text-slate-950">Clear Findings Your Team Can Act On</h2>
              <p className="body-large text-slate-700">
                The output is not a dense dashboard. It is a concise set of findings with evidence, priority, impact, and a next step.
              </p>
            </div>
            <div className="grid gap-5">
              <DiagnosticInsightCard
                variant="light"
                issueTitle="RTU-2 excessive occupied runtime"
                summary="Runtime behavior appears to extend beyond expected occupied hours, creating a likely energy and equipment wear issue."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {deliverables.map((deliverable) => (
                  <div key={deliverable} className="rounded-xl border border-sky-100 bg-sky-50/70 p-5 shadow-sm">
                    <ClipboardCheck className="mb-5 h-6 w-6 text-sky-700" aria-hidden="true" />
                    <p className="font-display text-body-lg font-semibold leading-snug text-slate-950">{deliverable}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_58%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4 text-slate-950">Easily Get Results</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-xl border border-sky-100 bg-white/85 p-5 shadow-sm">
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 font-display font-semibold text-emerald-700">
                  {index + 1}
                </span>
                <p className="font-display text-body-lg font-semibold leading-snug text-slate-950">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-narrow">
          <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-[0_18px_60px_rgba(30,64,175,0.08)] md:p-8">
            <div className="mb-8 text-center">
              <h2 className="heading-2 mb-4 text-slate-950">FAQ</h2>
            </div>
            <Accordion items={faqItems} variant="light" />
          </div>
        </div>
      </section>

      <FinalCTASection
        headline="Find out what your BAS data is already telling you."
        body="Request a Sample Analysis and LeanFM will help determine whether your existing BAS data contains issues worth acting on."
        primaryHref={SAMPLE_ANALYSIS_HREF}
        primaryLocation="sample_analysis_final_primary"
        secondaryLocation="sample_analysis_final_secondary"
        variant="light"
      />

      <StickyCtaBar
        heroId="sample-analysis-hero"
        href={SAMPLE_ANALYSIS_HREF}
        message="Request a Sample Analysis to see which hidden BAS issues may be worth attention first."
      />
    </>
  )
}
