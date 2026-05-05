import { Metadata } from 'next'
import {
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Landmark,
  LineChart,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import { CTA_LABELS } from '@/lib/constants'

const SAMPLE_ANALYSIS_HREF = '/contact?intent=demo&source=results_sample_analysis'
const TALK_TO_LEANFM_HREF = '/contact?intent=general&source=results_talk'

export const metadata: Metadata = {
  title: 'Results',
  description:
    'See case study results and examples of hidden building system issues LeanFM has identified in complex facilities.',
}

const heroBullets = [
  'Hidden faults surfaced from existing building data',
  'Clear findings tied to operational impact',
  'Actionable next steps for facilities teams',
]

const projectDetails = [
  ['Owner', 'Carnegie Museums of Pittsburgh'],
  ['Location', 'Pittsburgh, PA'],
  ['Size', '88,000 sq ft'],
  ['Duration', '2023-ongoing'],
]

const warholResults = [
  {
    value: '$56,386',
    label: 'Reported first-year savings',
  },
  {
    value: '$101,383',
    label: 'Reported second-year savings',
  },
  {
    value: '$100K+',
    label: 'Ongoing annual savings shown in the case study',
  },
]

const proofCards = [
  {
    title: 'New systems can still hide problems',
    copy: 'The Warhol had a newer BAS, but LeanFM still found logic faults affecting performance.',
  },
  {
    title: 'Existing data can reveal missed issues',
    copy: 'The value was already in the building data. LeanFM helped surface what mattered.',
  },
  {
    title: 'Small operational issues can create large impact',
    copy: 'Correcting hidden faults helped reduce waste and improve operational performance.',
  },
  {
    title: 'Sensitive environments benefit from early detection',
    copy: 'Museums need consistency, not just reactive alarms.',
  },
]

const supportingExamples = [
  {
    name: 'Cleveland Clinic Avon',
    context: '70K sq ft hospital buildings | Trane BAS',
    findings: [
      '39 biased temperature and pressure sensors',
      'Overcooling followed by reheat',
      'CO2 sensors not fully utilized',
      '31.4% energy savings reported in one month',
    ],
  },
  {
    name: 'Mayo Clinic Rochester Methodist Hospital',
    context: '1.4M sq ft across 4 buildings | JCI BAS',
    findings: [
      'Software and hardware faults in AHUs and VAVs',
      '9.7-14.4% energy waste identified',
      'Weekly coordination with facilities and HVAC teams',
      'Issues reviewed with facility manager, HVAC managers, and technicians',
    ],
  },
  {
    name: 'Limak Cyprus Deluxe Hotel',
    context: '270K sq ft resort/casino | Siemens BAS',
    findings: [
      '11 days of BAS data analyzed',
      '$12,000/month in energy waste diagnosed',
      'Leaking cooling valves and biased temperature sensors identified',
      'Manual control logic, economizer settings, and overcooling issues found',
    ],
  },
  {
    name: 'Shenzhen International Free-Trade Center',
    context: '550K sq ft office building | Honeywell BAS',
    findings: [
      '13 days of data analyzed',
      'Incorrectly installed relays identified',
      'Unused BAS sensors found in control programs',
      'Frequent VFD resets found',
    ],
  },
]

const repeatedPatterns = [
  'Sensor drift',
  'Simultaneous heating and cooling',
  'Overcooling and reheat',
  'BAS logic faults',
  'Equipment running unnecessarily',
  'Control sequence issues',
  'Underused sensors',
  'Unnecessary equipment strain',
]

const startSteps = [
  'Share existing building system data',
  'LeanFM analyzes for hidden issues',
  'Review prioritized findings',
  'Decide what to address first',
]

const credibilityItems = [
  'Findings tied to actual system behavior',
  'Prioritized issues facilities teams can review',
  'Evidence-based recommendations, not generic advice',
]

function ResultsHeroVisual() {
  return (
    <div className="relative mx-auto w-[calc(100vw-2rem)] max-w-xl min-w-0 overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-950/75 p-5 shadow-[0_28px_90px_rgba(2,6,23,0.42)] sm:w-full">
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.12),transparent_36%)]" />
      <div className="relative">
        <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Building data to findings
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {['Existing data', 'Hidden faults', 'Clear action'].map((label, index) => (
            <div key={label} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 font-display text-body-sm font-semibold text-cyan-200">
                {index + 1}
              </span>
              <p className="font-display text-body-lg font-semibold text-white">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-cyan-400/25 bg-cyan-500/10 p-4">
          <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Case study signal
          </p>
          <div className="mt-4 grid gap-2">
            {[
              ['Logic fault corrected', 'Visible in data'],
              ['Reported savings', 'Warhol case study'],
              ['Operational impact', 'Reduced utility use'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-lg bg-slate-950/55 px-3 py-2">
                <span className="text-body-sm text-white">{label}</span>
                <span className="text-body-xs text-slate-400">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function WarholTrendVisual() {
  const rows = [
    ['Before correction', 'Chilled water', 'w-[92%]'],
    ['First year', 'Chilled water', 'w-[66%]'],
    ['Second year', 'Chilled water', 'w-[48%]'],
    ['Before correction', 'Steam', 'w-[86%]'],
    ['First year', 'Steam', 'w-[63%]'],
    ['Second year', 'Steam', 'w-[43%]'],
  ]

  return (
    <div className="rounded-2xl border border-slate-700/70 bg-slate-950/75 p-5">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Trend-style view
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-white">
            Reduced utility usage over time
          </h3>
        </div>
        <LineChart className="h-7 w-7 text-cyan-300" aria-hidden="true" />
      </div>
      <div className="space-y-4">
        {rows.map(([period, system, width]) => (
          <div key={`${period}-${system}`}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-body-sm font-medium text-slate-200">{system}</span>
              <span className="text-body-xs text-slate-500">{period}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-900">
              <span className={`block h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-200 ${width}`} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-body-xs leading-relaxed text-slate-500">
        Recreated in LeanFM site style from the case study direction. This is not the original case study slide design.
      </p>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <>
      <section id="results-hero" className="relative overflow-hidden border-b border-slate-800/70 bg-slate-950">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="w-[calc(100vw-2rem)] min-w-0 max-w-3xl sm:w-auto">
              <p className="mb-5 text-body-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Results
              </p>
              <h1 className="mb-6 max-w-[calc(100vw-2rem)] font-body text-[3.1rem] font-semibold leading-[0.98] tracking-normal text-white md:max-w-[12ch] md:text-[4.1rem] lg:text-[4.7rem]">
                Real Findings From Complex Buildings
              </h1>
              <p className="body-large mb-7 max-w-full md:max-w-2xl">
                LeanFM helps facilities teams uncover hidden building system problems that waste energy, affect comfort, and strain equipment—using the data they already have.
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
                  eventParams={{ location: 'results_hero_primary' }}
                  className="w-full min-w-0 sm:w-auto"
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={TALK_TO_LEANFM_HREF}
                  size="large"
                  eventName="cta_talk_click"
                  eventParams={{ location: 'results_hero_secondary' }}
                  className="w-full min-w-0 sm:w-auto"
                >
                  Talk to LeanFM
                </TrackedButton>
              </div>
            </div>

            <ResultsHeroVisual />
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <h2 className="heading-2 text-white">Proof That Hidden Issues Are Already in the Data</h2>
            <div className="space-y-5 text-body-lg leading-relaxed text-slate-300">
              <p>
                Many building system problems do not appear as obvious alarms. LeanFM looks for patterns across system data to help teams identify what is wasting energy, affecting comfort, or creating unnecessary system strain.
              </p>
              <p className="font-display text-2xl font-semibold leading-snug text-cyan-200">
                The goal is not more data. The goal is clearer action.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-wide">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Primary proof point
              </p>
              <h2 className="heading-2 mb-4 text-white">Featured Case Study: The Andy Warhol Museum</h2>
              <p className="body-large">
                Helping a sensitive museum environment reduce waste while supporting comfort and environmental stability.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/25 bg-cyan-500/10 p-5">
              <p className="font-display text-xl font-semibold leading-snug text-white">
                This is the clearest public-facing proof point and should be visually dominant on the page.
              </p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
                <div className="mb-6 flex items-center gap-3">
                  <Landmark className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-semibold text-white">Project Details</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {projectDetails.map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <p className="text-body-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                      <p className="mt-2 text-body-md font-medium text-slate-100">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
                <h3 className="mb-4 font-display text-2xl font-semibold text-white">Challenge</h3>
                <p className="body-large">
                  The Warhol required stable environmental conditions to help protect sensitive artwork while maintaining comfort for visitors and staff. The museum also wanted to reduce HVAC-related energy costs, reduce emissions, extend equipment life, and improve system performance.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
                <h3 className="mb-4 font-display text-2xl font-semibold text-white">What LeanFM Found</h3>
                <p className="body-large">
                  LeanFM analysis identified hidden building automation system logic faults that were corrected.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-cyan-400/25 bg-cyan-500/10 p-6">
                <div className="mb-6 flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-semibold text-white">Case Study Results</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {warholResults.map((result) => (
                    <div key={result.label} className="rounded-xl border border-cyan-400/20 bg-slate-950/55 p-5">
                      <p className="font-display text-3xl font-semibold text-white">{result.value}</p>
                      <p className="mt-2 text-body-sm leading-relaxed text-slate-300">{result.label}</p>
                    </div>
                  ))}
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    'Reduced chilled water and steam usage over time',
                    'Reported savings based on the provided case study',
                    'Corrected logic faults that were already visible in the data',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-body-md text-slate-200">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-display text-xl font-semibold leading-snug text-cyan-200">
                  The important point is not just the savings—it is that correctable logic faults were already visible in the data.
                </p>
                <p className="mt-5 text-body-sm leading-relaxed text-slate-400">
                  Results are from this specific case study. Actual outcomes depend on building conditions, available data, and corrective actions taken.
                </p>
              </div>

              <WarholTrendVisual />

              <TrackedButton
                href="/contact?intent=demo&source=results_warhol_case_study"
                size="large"
                eventName="cta_demo_click"
                eventParams={{ location: 'results_warhol_primary' }}
                className="w-full"
              >
                {CTA_LABELS.primary}
              </TrackedButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="mb-10">
            <h2 className="heading-2 mb-4 text-white">What This Proves</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {proofCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <ShieldCheck className="mb-5 h-6 w-6 text-cyan-300" aria-hidden="true" />
                <h3 className="mb-3 font-display text-2xl font-semibold leading-tight text-white">{card.title}</h3>
                <p className="text-body-md leading-relaxed text-slate-300">{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <h2 className="heading-2 mb-4 text-white">Examples of Issues LeanFM Has Identified</h2>
            <div className="space-y-4">
              <p className="body-large">
                Across complex buildings, LeanFM has identified recurring patterns that traditional alarm workflows can miss.
              </p>
              <p className="font-display text-2xl font-semibold leading-snug text-cyan-200">
                Additional historical examples from complex facilities include:
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {supportingExamples.map((example) => (
              <article key={example.name} className="rounded-2xl border border-slate-800 bg-slate-950/55 p-6">
                <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Historical example
                </p>
                <div className="mb-5 flex items-start gap-3">
                  <Building2 className="mt-1 h-6 w-6 shrink-0 text-cyan-300" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-2xl font-semibold leading-tight text-white">{example.name}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-slate-400">{example.context}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {example.findings.map((finding) => (
                    <li key={finding} className="flex gap-3 text-body-sm leading-relaxed text-slate-200">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
                {/* Internal implementation note: confirm client approval before promoting older examples as standalone public case studies. */}
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-cyan-400/25 bg-cyan-500/10 p-7 text-center md:p-10">
            <h2 className="mb-6 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
              Want to know what your data would show?
            </h2>
            <TrackedButton
              href="/contact?intent=demo&source=results_supporting_findings"
              size="large"
              eventName="cta_demo_click"
              eventParams={{ location: 'results_supporting_findings_primary' }}
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
              <h2 className="heading-2 mb-4 text-white">The Same Hidden Problems Show Up Across Building Types</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {repeatedPatterns.map((pattern) => (
                <div key={pattern} className="flex min-h-20 items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <Search className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-100">{pattern}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <h2 className="heading-2 text-white">Every Building Is Different</h2>
            <div className="space-y-5 text-body-lg leading-relaxed text-slate-300">
              <p>
                LeanFM does not promise a fixed savings percentage because every building is different. Results depend on system configuration, available data, operating conditions, and which corrective actions are taken.
              </p>
              <p className="font-display text-2xl font-semibold leading-snug text-cyan-200">
                But the pattern is consistent: hidden issues often exist in the data before they are obvious in the building.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4 text-white">Start With a Sample Analysis</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {startSteps.map((step, index) => (
              <div key={step} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
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
              eventParams={{ location: 'results_process_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800/70 bg-slate-900/40">
        <div className="container-wide py-7">
          <div className="grid gap-5 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
            <h2 className="font-display text-body-lg font-semibold text-white">
              Built From Real Building Data
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
            <h2 className="heading-2 mb-5 text-white">See What Your Building Data Can Reveal</h2>
            <p className="body-large mb-8">
              Send the data you already have. LeanFM will help identify hidden issues affecting energy, comfort, and system performance.
            </p>
            <TrackedButton
              href="/contact?intent=demo&source=results_final"
              size="large"
              eventName="cta_demo_click"
              eventParams={{ location: 'results_final_primary' }}
            >
              {CTA_LABELS.primary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <StickyCtaBar
        heroId="results-hero"
        href={SAMPLE_ANALYSIS_HREF}
        location="results_sticky_primary"
        message="Case study results show hidden issues can already be visible in existing building data."
      />
    </>
  )
}
