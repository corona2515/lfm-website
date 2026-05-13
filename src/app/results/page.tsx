import { Metadata } from 'next'
import {
  BarChart3,
  Building2,
  CheckCircle2,
  Landmark,
  LineChart,
  MapPin,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import { AnimatedStatValue } from '@/components/visual/AnimatedStatValue'
import { FinalCTASection, PhotoPlaceholder, VisualTimeline } from '@/components/visual/LeanFmVisuals'
import { CTA_LABELS } from '@/lib/constants'

const SAMPLE_ANALYSIS_HREF = '/contact?intent=sample-analysis&source=results'
const TALK_TO_LEANFM_HREF = '/contact?intent=demo&source=results_demo'

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
    end: 56386,
    prefix: '$',
    label: 'Reported first-year savings',
  },
  {
    end: 101383,
    prefix: '$',
    label: 'Reported second-year savings',
  },
  {
    end: 100,
    prefix: '$',
    suffix: 'K+',
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
    name: 'Healthcare facility example',
    context: 'Hospital buildings with Trane BAS',
    findings: [
      '39 biased temperature and pressure sensors',
      'Overcooling followed by reheat',
      'CO2 sensors not fully utilized',
      'Short-term energy reduction reported in the historical case material',
    ],
  },
  {
    name: 'Large hospital campus example',
    context: '1.4M sq ft across 4 buildings with JCI BAS',
    findings: [
      'Software and hardware faults in AHUs and VAVs',
      '9.7-14.4% energy waste identified',
      'Weekly coordination with facilities and HVAC teams',
      'Issues reviewed with facility manager, HVAC managers, and technicians',
    ],
  },
  {
    name: 'Resort and casino example',
    context: '270K sq ft hospitality facility with Siemens BAS',
    findings: [
      '11 days of BAS data analyzed',
      '$12,000/month in energy waste diagnosed',
      'Leaking cooling valves and biased temperature sensors identified',
      'Manual control logic, economizer settings, and overcooling issues found',
    ],
  },
  {
    name: 'Large office building example',
    context: '550K sq ft office facility with Honeywell BAS',
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

const credibilityItems = [
  'Findings tied to actual system behavior',
  'Prioritized issues facilities teams can review',
  'Evidence-based recommendations, not generic advice',
]

const warholTimeline = [
  {
    year: '2021',
    title: 'New BAS installed',
    description: 'The museum had already invested in a newer building automation system.',
  },
  {
    year: '2022',
    title: 'Logic faults found',
    description: 'LeanFM analysis found BAS logic faults hiding in existing data.',
  },
  {
    year: '2023',
    title: '$56,386 reported',
    description: 'The case study documented reported first-year savings after correction.',
  },
  {
    year: '2024',
    title: '$101,383 reported',
    description: 'The case study documented reported second-year savings.',
  },
]

function ResultsHeroVisual() {
  return (
    <div className="relative mx-auto w-[calc(100vw-2rem)] max-w-xl min-w-0 overflow-hidden rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-[0_24px_80px_rgba(30,64,175,0.14)] sm:w-full">
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.12),transparent_36%)]" />
      <div className="relative">
        <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
          Building data to findings
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {['Existing data', 'Hidden faults', 'Clear action'].map((label, index) => (
            <div key={label} className="rounded-xl border border-sky-100 bg-sky-50/70 p-4">
              <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 font-display text-body-sm font-semibold text-emerald-700">
                {index + 1}
              </span>
              <p className="font-display text-body-lg font-semibold text-slate-950">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
            Case study signal
          </p>
          <div className="mt-4 grid gap-2">
            {[
              ['Logic fault corrected', 'Visible in data'],
              ['Reported savings', 'Warhol case study'],
              ['Operational impact', 'Reduced utility use'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm">
                <span className="text-body-sm text-slate-900">{label}</span>
                <span className="text-body-xs text-slate-500">{value}</span>
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
    <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-[0_14px_45px_rgba(30,64,175,0.08)]">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Trend-style view
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-slate-950">
            Reduced utility usage over time
          </h3>
        </div>
        <LineChart className="h-7 w-7 text-sky-700" aria-hidden="true" />
      </div>
      <div className="space-y-4">
        {rows.map(([period, system, width]) => (
          <div key={`${period}-${system}`}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-body-sm font-medium text-slate-800">{system}</span>
              <span className="text-body-xs text-slate-500">{period}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-sky-100">
              <span className={`block h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 ${width}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <>
      <section id="results-hero" className="relative overflow-hidden border-b border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_48%,#f4fbef_100%)]">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-35" />
        <div aria-hidden="true" className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-200/45 blur-3xl" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-sky-200/55 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="w-[calc(100vw-2rem)] min-w-0 max-w-3xl sm:w-auto">
              <h1 className="mb-6 max-w-[11ch] font-body text-[2.35rem] font-semibold leading-[1.02] tracking-normal text-slate-950 sm:text-[3.1rem] sm:leading-[0.98] md:max-w-[12ch] md:text-[4.1rem] lg:text-[4.7rem]">
                The Andy Warhol Museum: hidden BAS logic faults, documented savings.
              </h1>
              <p className="body-large mb-7 max-w-[29ch] text-slate-700 sm:max-w-full md:max-w-2xl">
                A newer BAS does not guarantee every costly operating issue is visible. LeanFM helped surface logic faults hiding in the data.
              </p>
              <ul className="mb-8 grid gap-3">
                {heroBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-body-md text-slate-800">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex max-w-[22rem] flex-col gap-3 sm:max-w-none sm:flex-row">
                <TrackedButton
                  href={SAMPLE_ANALYSIS_HREF}
                  size="large"
                  eventName="cta_sample_analysis_click"
                  eventParams={{ location: 'results_hero_primary' }}
                  className="w-full min-w-0 sm:w-auto"
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={TALK_TO_LEANFM_HREF}
                  size="large"
                  eventName="cta_demo_click"
                  eventParams={{ location: 'results_hero_secondary' }}
                  className="w-full min-w-0 border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <div className="space-y-4">
              <PhotoPlaceholder
                label="The Andy Warhol Museum exterior or museum/gallery environment photo"
                alt="Museum building or gallery environment representing The Andy Warhol Museum case study"
                src="/media/leanfm-images/museum-building-ivy.jpg"
                aspect="video"
                className="border-white shadow-[0_24px_90px_rgba(30,64,175,0.18)]"
                imageClassName="object-[50%_42%]"
                overlay={false}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  '88,000 sq ft',
                  'New BAS in 2021',
                  'LeanFM analysis in 2022',
                  '$56,386 reported first-year savings',
                  '$101,383 reported second-year savings',
                  '$100K+ ongoing annual savings shown in case study',
                ].map((stat) => (
                  <div key={stat} className="rounded-xl border border-sky-100 bg-white/85 p-4 shadow-sm">
                    <p className="font-display text-body-lg font-semibold text-slate-950">{stat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <h2 className="heading-2 text-slate-950">Proof That Hidden Issues Are Already in the Data</h2>
            <div className="space-y-5 text-body-lg leading-relaxed text-slate-700">
              <p>
                Many building system problems do not appear as obvious alarms. LeanFM looks for patterns across system data to help teams identify what is wasting energy, affecting comfort, or creating unnecessary system strain.
              </p>
              <p className="font-display text-2xl font-semibold leading-snug text-emerald-700">
                The goal is not more data. The goal is clearer action.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_50%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <h2 className="heading-2 mb-4 text-slate-950">The case study timeline</h2>
            <p className="body-large text-slate-700">
              The sequence matters: a new BAS was already in place, but correctable logic faults were still visible in the data.
            </p>
          </div>
          <VisualTimeline items={warholTimeline} variant="light" />
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-wide">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Featured case study
              </p>
              <h2 className="heading-2 mb-4 text-slate-950">Featured Case Study: The Andy Warhol Museum</h2>
              <p className="body-large text-slate-700">
                The seven-floor mixed-use museum required stable temperature and humidity control for sensitive artwork, visitor comfort, and staff comfort.
              </p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-[0_14px_45px_rgba(30,64,175,0.08)]">
                <div className="mb-6 flex items-center gap-3">
                  <Landmark className="h-6 w-6 text-sky-700" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-semibold text-slate-950">Project Details</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {projectDetails.map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-sky-100 bg-sky-50/70 p-4">
                      <p className="text-body-xs font-semibold uppercase tracking-[0.16em] text-sky-700">{label}</p>
                      <p className="mt-2 text-body-md font-medium text-slate-950">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-[0_14px_45px_rgba(30,64,175,0.08)]">
                <h3 className="mb-4 font-display text-2xl font-semibold text-slate-950">Challenge</h3>
                <p className="body-large text-slate-700">
                  After a new BAS was installed in 2021, the museum still needed to reduce HVAC energy waste, improve comfort, protect artwork, support sustainability, and extend equipment life. LeanFM analysis in 2022 found BAS logic faults that were corrected.
                </p>
              </div>

              <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-[0_14px_45px_rgba(30,64,175,0.08)]">
                <h3 className="mb-4 font-display text-2xl font-semibold text-slate-950">What LeanFM Found</h3>
                <p className="body-large text-slate-700">
                  The museum had already invested in a BAS. The opportunity was not more hardware. It was finding the hidden logic faults and operating patterns the system was not surfacing clearly enough.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-[0_14px_45px_rgba(16,185,129,0.08)]">
                <div className="mb-6 flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-emerald-700" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-semibold text-slate-950">Case Study Results</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {warholResults.map((result) => (
                    <div key={result.label} className="rounded-xl border border-emerald-200 bg-white p-5 shadow-sm">
                      <AnimatedStatValue
                        end={result.end}
                        prefix={result.prefix}
                        suffix={result.suffix}
                        className="font-display text-3xl font-semibold text-slate-950"
                      />
                      <p className="mt-2 text-body-sm leading-relaxed text-slate-600">{result.label}</p>
                    </div>
                  ))}
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    'Reduced chilled water and steam usage over time',
                    'Reported savings based on the provided case study',
                    'Corrected logic faults that were already visible in the data',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-body-md text-slate-800">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-display text-xl font-semibold leading-snug text-emerald-800">
                  The important point is not just the savings—it is that correctable logic faults were already visible in the data.
                </p>
                <p className="mt-5 text-body-sm leading-relaxed text-slate-600">
                  Results are from this specific case study. Actual outcomes depend on building conditions, available data, and corrective actions taken.
                </p>
              </div>

              <WarholTrendVisual />

            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_50%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="mb-10">
            <h2 className="heading-2 mb-4 text-slate-950">What This Proves</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {proofCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-sky-100 bg-white/90 p-6 shadow-[0_14px_45px_rgba(30,64,175,0.08)]">
                <ShieldCheck className="mb-5 h-6 w-6 text-sky-700" aria-hidden="true" />
                <h3 className="mb-3 font-display text-2xl font-semibold leading-tight text-slate-950">{card.title}</h3>
                <p className="text-body-md leading-relaxed text-slate-700">{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <h2 className="heading-2 mb-4 text-slate-950">Examples of Issues LeanFM Has Identified</h2>
            <div className="space-y-4">
              <p className="body-large text-slate-700">
                LeanFM&apos;s methodology has been applied across complex building portfolios. Our current focus is K-12 school districts, museums, universities, and commercial real estate — but the same analytical approach has surfaced issues in adjacent verticals:
              </p>
              <p className="font-display text-2xl font-semibold leading-snug text-emerald-700">
                Historical examples include:
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {supportingExamples.map((example) => (
              <article key={example.name} className="rounded-2xl border border-sky-100 bg-white p-6 shadow-[0_14px_45px_rgba(30,64,175,0.08)]">
                <div className="mb-5 flex items-start gap-3">
                  <Building2 className="mt-1 h-6 w-6 shrink-0 text-sky-700" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-2xl font-semibold leading-tight text-slate-950">{example.name}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-slate-600">{example.context}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {example.findings.map((finding) => (
                    <li key={finding} className="flex gap-3 text-body-sm leading-relaxed text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_50%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-4 text-slate-950">The Same Hidden Problems Show Up Across Building Types</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {repeatedPatterns.map((pattern) => (
                <div key={pattern} className="flex min-h-20 items-center gap-3 rounded-xl border border-sky-100 bg-white/90 p-4 shadow-sm">
                  <Search className="h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-950">{pattern}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <h2 className="heading-2 text-slate-950">Every Building Is Different</h2>
            <div className="space-y-5 text-body-lg leading-relaxed text-slate-700">
              <p>
                Every building is different — system configuration, available data, operating conditions, and the corrective actions taken all matter. That is why LeanFM backs every engagement with a money-back ROI guarantee: if we do not identify HVAC issues worth at least 3x your engagement fee, you get your money back.
              </p>
              <p className="font-display text-2xl font-semibold leading-snug text-emerald-700">
                But the pattern is consistent: hidden issues often exist in the data before they are obvious in the building.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-sky-100 bg-sky-50/70">
        <div className="container-wide py-7">
          <div className="grid gap-5 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
            <h2 className="font-display text-body-lg font-semibold text-slate-950">
              Built From Real Building Data
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
        headline="Use the Warhol case study as a starting point."
        body="Request a Sample Analysis to find out whether your existing building data contains hidden issues worth reviewing."
        primaryHref={SAMPLE_ANALYSIS_HREF}
        primaryLocation="results_final_primary"
        secondaryLocation="results_final_secondary"
      />

      <StickyCtaBar
        heroId="results-hero"
        href={SAMPLE_ANALYSIS_HREF}
        location="results_sticky_primary"
        message="Case study results show hidden issues can already be visible in existing building data."
      />
    </>
  )
}
