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
  'Request a Sample Analysis',
  'Share available building system data',
  'LeanFM analyzes the data',
  'Review findings with our team',
  'Decide what to fix first',
]

const faqItems = [
  {
    question: 'Do we need new hardware?',
    answer: 'No. A Sample Analysis starts with existing building system data.',
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
    question: 'Do you guarantee savings?',
    answer:
      'No. The Sample Analysis identifies hidden issues and estimated impact where available. Actual savings depend on the issue, building, and corrective action.',
  },
]

function SampleReportVisual() {
  return (
    <div className="relative mx-auto max-w-xl rounded-2xl border border-slate-700/70 bg-slate-950/75 p-5 shadow-[0_28px_90px_rgba(2,6,23,0.42)]">
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.12),transparent_36%)]" />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Sample analysis preview
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-white">
              Prioritized findings
            </p>
          </div>
          <FileText className="h-7 w-7 text-cyan-300" aria-hidden="true" />
        </div>

        <div className="grid gap-3">
          {[
            ['Existing data', 'Runtime, setpoints, schedules'],
            ['Hidden issues', 'Control drift, wasted runtime'],
            ['Prioritized findings', 'What to investigate first'],
          ].map(([label, value], index) => (
            <div key={label} className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/35 bg-cyan-500/10 font-display text-body-sm font-semibold text-cyan-200">
                {index + 1}
              </span>
              <div>
                <p className="text-body-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {label}
                </p>
                <p className="mt-1 text-body-md text-slate-100">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SampleAnalysisPage() {
  return (
    <>
      <section id="sample-analysis-hero" className="relative overflow-hidden border-b border-slate-800/70 bg-slate-950">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <h1 className="mb-6 max-w-[12ch] font-body text-[3.2rem] font-semibold leading-[0.98] tracking-normal text-white md:text-[4.2rem] lg:text-[4.8rem]">
                See what your BAS data is already telling you.
              </h1>
              <p className="body-large mb-7 max-w-2xl">
                Send existing trend data from your building automation system. LeanFM reviews it for hidden faults, energy waste, comfort risks, and control issues—then walks your team through what deserves attention first.
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
                  className="w-full sm:w-auto"
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <SampleReportVisual />
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <h2 className="heading-2 text-white">
              In one analysis, see what your system is missing
            </h2>
            <div>
              <p className="body-large">
                A Sample Analysis is a focused diagnostic review of your existing BAS trend data. LeanFM looks for patterns that traditional alarms often miss, then turns the findings into a clear set of issues, priorities, and next steps.
              </p>
              <div className="mt-7 rounded-2xl border border-cyan-400/25 bg-cyan-500/10 p-5">
                <p className="font-display text-xl font-semibold leading-snug text-white">
                  This is not a generic energy audit.
                </p>
                <p className="mt-3 text-body-md leading-relaxed text-slate-300">
                  It is a data-driven look at how your building systems are actually operating.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-white">Start With the Data You Already Have</h2>
              <p className="body-large">
                A Sample Analysis starts with available data from your building automation system or related building system exports.
              </p>
              <p className="mt-5 text-body-md leading-relaxed text-cyan-200">
                If you are not sure what data you have, LeanFM can help identify what is useful.
              </p>
              <p className="mt-5 text-body-md leading-relaxed text-slate-300">
                The point of the sample analysis is to show whether the data already contains actionable issues.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {dataTypes.map((dataType) => (
                <div key={dataType} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <Upload className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-100">{dataType}</p>
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
              <h2 className="heading-2 mb-4 text-white">We Look for the Issues That Quietly Add Up</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {issueExamples.map((issue) => (
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
              <h2 className="heading-2 mb-4 text-white">Clear Findings Your Team Can Act On</h2>
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

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4 text-white">What Happens After You Request</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-xl border border-slate-800 bg-slate-900/55 p-5">
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
        <div className="container-narrow">
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/35 p-6 md:p-8">
            <div className="mb-8 text-center">
              <h2 className="heading-2 mb-4 text-white">Sample Analysis FAQ</h2>
            </div>
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/70 bg-slate-900/50">
        <div className="container-default py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-2 mb-5 text-white">Find Out What Your Building Data Is Already Telling You</h2>
            <p className="body-large mb-8">
              Request a Sample Analysis and LeanFM will help determine whether your existing BAS data contains issues worth acting on.
            </p>
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              size="large"
              eventName="cta_sample_analysis_click"
              eventParams={{ location: 'sample_analysis_final_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <StickyCtaBar
        heroId="sample-analysis-hero"
        href={SAMPLE_ANALYSIS_HREF}
        message="Request a Sample Analysis to see which hidden BAS issues may be worth attention first."
      />
    </>
  )
}
