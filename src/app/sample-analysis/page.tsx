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

const SAMPLE_ANALYSIS_HREF = '/contact?intent=demo&source=sample-analysis'
const TALK_TO_LEANFM_HREF = '/contact?intent=general&source=sample-analysis-talk'

export const metadata: Metadata = {
  title: 'Sample Analysis',
  description:
    'Request a LeanFM Sample Analysis to uncover hidden building system issues using existing trend data.',
}

const heroBullets = [
  'No new hardware required',
  'Uses existing building system trend data',
  'Clear findings, not another dashboard',
]

const audiences = [
  {
    title: 'K-12 schools',
    description:
      'Find hidden issues across classrooms, gyms, offices, and district facilities before they drive up costs or comfort complaints.',
  },
  {
    title: 'Universities',
    description:
      'Help facilities teams prioritize problems across different campus buildings, systems, schedules, and operating needs.',
  },
  {
    title: 'Commercial real estate',
    description:
      'Identify hidden issues that affect tenant comfort, operating costs, and portfolio performance.',
  },
  {
    title: 'Museums',
    description:
      'Support comfort, reliability, and careful system operation in sensitive public and collection spaces.',
  },
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

const usefulnessCards = [
  'Prioritized, not overwhelming',
  'Based on existing data',
  'Focused on operational action',
  'Useful for both facilities and leadership',
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
                See What Your Building System Is Missing
              </h1>
              <p className="body-large mb-7 max-w-2xl">
                Send existing building system data. LeanFM will analyze it for hidden issues that waste energy, increase costs, affect comfort, or strain equipment—and walk you through the findings.
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
                  eventParams={{ location: 'sample_analysis_hero_primary' }}
                  className="w-full sm:w-auto"
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={TALK_TO_LEANFM_HREF}
                  size="large"
                  eventName="cta_talk_click"
                  eventParams={{ location: 'sample_analysis_hero_secondary' }}
                  className="w-full sm:w-auto"
                >
                  Talk to LeanFM
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
              A Fast Way to Find Hidden Problems in Your Building Data
            </h2>
            <div>
              <p className="body-large">
                A Sample Analysis is a focused review of your existing building system trend data. LeanFM looks for patterns that traditional alarms often miss, then turns the findings into a clear set of issues, priorities, and next steps.
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

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="mb-10 max-w-2xl">
            <h2 className="heading-2 mb-4 text-white">Built for Facilities Teams Managing Complex Buildings</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {audiences.map((audience) => (
              <div key={audience.title} className="rounded-xl border border-slate-800 bg-slate-950/55 p-6">
                <h3 className="mb-3 font-display text-2xl font-semibold text-white">{audience.title}</h3>
                <p className="text-body-md leading-relaxed text-slate-300">{audience.description}</p>
              </div>
            ))}
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

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
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

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-white">What Makes a Sample Analysis Useful</h2>
              <p className="body-large">
                Most building teams already have more data than they can realistically review. LeanFM helps separate signal from noise so your team can see which issues are worth attention first.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {usefulnessCards.map((card) => (
                <div key={card} className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-5">
                  <CheckCircle2 className="mb-5 h-6 w-6 text-cyan-300" aria-hidden="true" />
                  <p className="font-display text-body-lg font-semibold leading-snug text-white">{card}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4 text-white">Simple Process. No New Hardware.</h2>
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
          <div className="mt-9 text-center">
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              eventName="cta_demo_click"
              eventParams={{ location: 'sample_analysis_process_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-narrow text-center">
          <h2 className="heading-2 mb-5 text-white">Small Hidden Issues Can Become Expensive Problems</h2>
          <p className="body-large">
            Hidden system issues waste energy, create comfort complaints, increase maintenance workload, and cause equipment to work harder than necessary. Finding them early gives facilities teams a clearer path to action.
          </p>
          <p className="body-large mt-5">
            At scale, making these issues visible helps reduce building energy waste and unnecessary strain on the grid.
          </p>
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
              Send the data you already have. We’ll help show which hidden issues are wasting energy, affecting comfort, or putting unnecessary strain on equipment.
            </p>
            <TrackedButton
              href={SAMPLE_ANALYSIS_HREF}
              size="large"
              eventName="cta_demo_click"
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
        message="Send existing building system data and see which hidden issues are worth attention first."
      />
    </>
  )
}
