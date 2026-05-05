import { Metadata } from 'next'
import {
  BarChart3,
  Building2,
  CheckCircle2,
  Factory,
  GraduationCap,
  Landmark,
  LineChart,
  Network,
  School,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { TrackedButton } from '@/components/analytics/TrackedButton'

const INVESTOR_CONTACT_HREF = '/contact?intent=investor&source=investors'

export const metadata: Metadata = {
  title: 'Investors',
  description:
    'Learn how LeanFM addresses building energy waste by helping owners and operators uncover hidden operational issues in existing building system data.',
}

const problemBullets = [
  'Building systems are complex and difficult to monitor manually',
  'Many inefficiencies do not trigger alarms',
  'Facilities teams lack time to analyze large volumes of data',
  'Energy waste, comfort issues, and equipment strain persist unnoticed',
]

const approachBullets = [
  'Works with existing building system data',
  'Identifies hidden faults and inefficiencies',
  'Produces clear, prioritized findings',
  'Supports facilities teams with actionable insights',
]

const marketDrivers = [
  'Rising energy costs',
  'Increasing pressure on operating budgets',
  'Growing focus on sustainability and emissions',
  'Aging building infrastructure',
  'Increasing complexity of building systems',
]

const tractionHighlights = [
  'The Andy Warhol Museum, part of Carnegie Museums of Pittsburgh',
  'Historical healthcare facility analyses',
  'Large commercial and mixed-use buildings',
]

const outcomes = [
  'Identification of hidden system faults affecting energy use and comfort',
  'Identification of faults that were not previously visible to facilities teams',
  'Reduction in unnecessary runtime and system strain',
  'Improved prioritization of maintenance tasks',
  'Reported savings in specific deployments',
  'Increased visibility into building system performance',
]

const marketSegments = [
  { label: 'K-12 school districts', Icon: School },
  { label: 'Universities', Icon: GraduationCap },
  { label: 'Commercial real estate', Icon: Building2 },
  { label: 'Museums and cultural institutions', Icon: Landmark },
  { label: 'Healthcare systems', Icon: ShieldCheck },
]

const scaleBullets = [
  'Uses existing BAS trend data',
  'No new hardware required to start',
  'Repeatable diagnostic workflow',
  'Vertical-specific outbound motion',
  'Expandable from one building to portfolios',
]

const businessModelItems = [
  'Sample Analysis as the first commercial offer',
  'Findings walkthrough to validate operational value',
  'Paid rollout for buildings or portfolios where the value is clear',
]

const credibilityItems = [
  'Carnegie Mellon connection',
  'Technical leadership and research background',
  'Experience working with complex building environments',
  'Developed with leadership connected to Carnegie Mellon’s engineering and research ecosystem',
]

function InvestorHeroVisual() {
  return (
    <div className="relative mx-auto w-[calc(100vw-2rem)] max-w-xl min-w-0 overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-950/75 p-5 shadow-[0_28px_90px_rgba(2,6,23,0.42)] sm:w-full">
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_18%_8%,rgba(144,204,124,0.16),transparent_32%),radial-gradient(circle_at_86%_82%,rgba(59,130,246,0.12),transparent_36%)]" />
      <div className="relative">
        <p className="mb-4 text-body-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Building system intelligence layer
        </p>
        <div className="grid gap-3">
          {[
            ['Existing data', 'Buildings already generate operational signals'],
            ['System behavior', 'Patterns reveal hidden inefficiencies'],
            ['Portfolio action', 'Findings become operational priorities'],
          ].map(([label, value], index) => (
            <div key={label} className="grid grid-cols-[auto_1fr] gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/35 bg-cyan-500/10 font-display text-body-sm font-semibold text-cyan-200">
                {index + 1}
              </span>
              <div>
                <p className="font-display text-body-lg font-semibold text-white">{label}</p>
                <p className="mt-1 text-body-sm leading-relaxed text-slate-400">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-cyan-400/25 bg-cyan-500/10 p-4">
          <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Scalable starting point
          </p>
          <div className="mt-4 grid gap-2">
            {['No new hardware to begin', 'Applicable across building types', 'Focused on operational waste'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg bg-slate-950/55 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                <span className="text-body-sm text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InvestorsPage() {
  return (
    <>
      <section id="investors-hero" className="relative overflow-hidden border-b border-slate-800/70 bg-slate-950">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="w-[calc(100vw-2rem)] min-w-0 max-w-3xl sm:w-auto">
              <p className="mb-5 text-body-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Investors
              </p>
              <h1 className="mb-6 max-w-[calc(100vw-2rem)] font-body text-[3rem] font-semibold leading-[0.98] tracking-normal text-white md:max-w-[13ch] md:text-[3.9rem] lg:text-[4.45rem]">
                Reducing Energy Waste in Buildings Through Better System Intelligence
              </h1>
              <div className="mb-8 max-w-full space-y-5 md:max-w-2xl">
                <p className="body-large">
                  LeanFM helps building owners and operators uncover hidden inefficiencies in their building systems—turning existing data into actionable insight that reduces waste, improves performance, and supports long-term operational efficiency.
                </p>
                <p className="font-display text-xl font-semibold leading-snug text-cyan-200">
                  LeanFM operates as a building system intelligence layer—helping facilities teams understand what their systems are actually doing.
                </p>
              </div>
              <TrackedButton
                href={INVESTOR_CONTACT_HREF}
                size="large"
                eventName="cta_investor_click"
                eventParams={{ location: 'investors_hero_primary' }}
                className="w-full min-w-0 sm:w-auto"
              >
                Contact LeanFM
              </TrackedButton>
            </div>

            <InvestorHeroVisual />
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-white">The Wedge: Sample Analysis</h2>
              <p className="body-large">
                LeanFM does not need a long enterprise implementation to begin showing value. The first commercial step is a focused Sample Analysis using existing BAS trend data.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-6">
              <p className="font-display text-2xl font-semibold leading-snug text-white">
                Data review, findings walkthrough, then paid rollout where the value is clear.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-white">A Large, Persistent Problem in the Built Environment</h2>
              <div className="space-y-5 text-body-lg leading-relaxed text-slate-300">
                <p>
                  Buildings rely on complex systems to manage heating, cooling, and ventilation. While these systems generate large amounts of data, many inefficiencies remain hidden.
                </p>
                <p>
                  A significant portion of building energy waste is driven by operational inefficiencies rather than equipment failure.
                </p>
                <p className="font-display text-2xl font-semibold leading-snug text-cyan-200">
                  Most buildings already have the data needed to improve performance—the problem is that it is not being interpreted effectively.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {problemBullets.map((bullet) => (
                <div key={bullet} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                  <Search className="mb-5 h-6 w-6 text-cyan-300" aria-hidden="true" />
                  <p className="font-display text-body-lg font-semibold leading-snug text-white">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <BarChart3 className="mb-5 h-7 w-7 text-cyan-300" aria-hidden="true" />
              <h2 className="heading-2 mb-5 text-white">Business Model</h2>
            </div>
            <div className="grid gap-3">
              {businessModelItems.map((item) => (
                <div key={item} className="rounded-xl border border-slate-800 bg-slate-950/55 p-5">
                  <p className="font-display text-body-lg font-semibold leading-snug text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-white">Making Hidden Operational Issues Visible</h2>
              <div className="space-y-5">
                <p className="body-large">
                  LeanFM analyzes existing building system data to identify patterns that indicate inefficiencies, faults, and operational issues.
                </p>
                <p className="body-large">
                  Rather than relying on alarms or manual review, LeanFM focuses on how systems behave over time.
                </p>
                <p className="font-display text-2xl font-semibold leading-snug text-cyan-200">
                  LeanFM focuses on how systems behave over time, not just whether something has failed.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {approachBullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/55 p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="text-body-md font-medium text-slate-100">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <h2 className="heading-2 text-white">Timing and Market Drivers</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {marketDrivers.map((driver) => (
              <div key={driver} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <LineChart className="mb-5 h-6 w-6 text-cyan-300" aria-hidden="true" />
                <p className="font-display text-body-lg font-semibold leading-snug text-white">{driver}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <h2 className="heading-2 mb-5 text-white">Applied in Complex, Real-World Buildings</h2>
              <div className="space-y-5">
                <p className="body-large">
                  LeanFM has been applied in real-world environments where system performance directly impacts cost, comfort, and operational reliability.
                </p>
                <p className="body-large">
                  LeanFM has identified hidden system issues, including sensor drift, control logic faults, and operational inefficiencies that impact performance and cost.
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {tractionHighlights.map((highlight) => (
                <div key={highlight} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/55 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="font-display text-body-lg font-semibold leading-snug text-white">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <h2 className="heading-2 mb-4 text-white">Representative Outcomes From Case Studies</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {outcomes.map((outcome) => (
              <div key={outcome} className="flex min-h-20 items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <BarChart3 className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                <p className="text-body-md font-medium text-slate-100">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <h2 className="heading-2 mb-5 text-white">Large Addressable Market</h2>
            <div className="space-y-5">
              <p className="body-large">
                LeanFM targets buildings with complex systems and significant operational scale.
              </p>
              <p className="body-large">
                These buildings represent a large portion of global energy consumption and ongoing operational spend.
              </p>
              <p className="font-display text-2xl font-semibold leading-snug text-cyan-200">
                These segments represent a large and ongoing need for improved operational visibility and efficiency.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {marketSegments.map(({ label, Icon }) => (
              <div key={label} className="rounded-xl border border-slate-800 bg-slate-950/55 p-5">
                <Icon className="mb-5 h-6 w-6 text-cyan-300" aria-hidden="true" />
                <p className="font-display text-body-lg font-semibold leading-snug text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <Network className="mb-5 h-7 w-7 text-cyan-300" aria-hidden="true" />
              <h2 className="heading-2 mb-5 text-white">Built on Advanced Data Analysis</h2>
            </div>
            <p className="body-large">
              LeanFM applies advanced data analysis to building system behavior, focusing on identifying patterns and relationships that are difficult to detect through traditional monitoring.
            </p>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-slate-800/70 bg-slate-900/35">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <Landmark className="mb-5 h-7 w-7 text-cyan-300" aria-hidden="true" />
              <h2 className="heading-2 mb-5 text-white">Experienced Leadership and Research Foundation</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {credibilityItems.map((item) => (
                <div key={item} className="rounded-xl border border-slate-800 bg-slate-950/55 p-5">
                  <p className="font-display text-body-lg font-semibold leading-snug text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <Factory className="mb-5 h-7 w-7 text-cyan-300" aria-hidden="true" />
              <h2 className="heading-2 mb-5 text-white">Why This Scales</h2>
              <p className="body-large">
                LeanFM does not require new hardware to begin delivering value. It works with data that buildings are already generating, making it applicable across a wide range of facilities.
              </p>
              <p className="body-large mt-5">
                The repeatable wedge is simple: sample analysis, findings walkthrough, then paid rollout where the operational value is clear.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {scaleBullets.map((bullet) => (
                <div key={bullet} className="flex min-h-20 items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
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
          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <h2 className="heading-2 text-white">Reducing Energy Waste at Scale</h2>
            <div className="space-y-5 text-body-lg leading-relaxed text-slate-300">
              <p>
                Buildings consume a significant portion of global energy. Much of that energy is lost due to inefficiencies that are difficult to detect.
              </p>
              <p>
                LeanFM’s goal is to make those inefficiencies visible, helping buildings operate more efficiently and reducing unnecessary energy use over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/70 bg-slate-900/50">
        <div className="container-default py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-2 mb-5 text-white">Connect With LeanFM</h2>
            <p className="body-large mb-8">
              For investor conversations or to learn more about LeanFM’s approach and growth strategy, reach out directly.
            </p>
            <TrackedButton
              href="/contact?intent=investor&source=investors_final"
              size="large"
              eventName="cta_investor_click"
              eventParams={{ location: 'investors_final_primary' }}
            >
              Contact LeanFM
            </TrackedButton>
          </div>
        </div>
      </section>
    </>
  )
}
