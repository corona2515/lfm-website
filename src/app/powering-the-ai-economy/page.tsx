import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Screenshot } from '@/components/MediaPlaceholder'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { Badge, Card, CardDescription, CardTitle } from '@/components/ui'
import { SITE_CONFIG } from '@/lib/constants'

const PAGE_PATH = '/powering-the-ai-economy'
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`

const SOURCE_URLS = {
  genesisArticle:
    'https://www.energy.gov/articles/energy-department-announces-26-genesis-mission-science-and-technology-challenges',
  genesisPdf:
    'https://www.energy.gov/documents/genesis-mission-science-and-technology-challenges',
  dataCenterDemand:
    'https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers',
  dataCenterScale:
    'https://www.energy.gov/ne/articles/advantages-and-challenges-nuclear-powered-data-centers',
  commercialBuildings:
    'https://www.energy.gov/eere/buildings/about-commercial-buildings-integration-program',
  commercialWaste:
    'https://www.energy.gov/cmei/buildings/take-action-save-energy-commercial-buildings',
  buildingControls: 'https://www.energy.gov/cmei/buildings/building-controls',
  interconnection: 'https://www.energy.gov/lpo/electric-grid-projects',
  permitting:
    'https://www.energy.gov/gdo/coordinated-interagency-transmission-authorizations-and-permits-program',
  homes: 'https://www.eia.gov/tools/faqs/faq.php?id=97&t=3',
} as const

const HERO_PROOF_POINTS = [
  'Prescriptiv™',
  '4M+ sq ft deployed',
  'Works with existing BAS/BMS',
  'Up to 30% savings',
] as const

const PROBLEM_METRICS = [
  {
    label: 'U.S. data center electricity use',
    value: '4.4%',
    detail: 'of total U.S. electricity in 2023, with projected growth to 6.7-12% by 2028.',
    accent: 'border-cyan-500/30 text-cyan-300',
  },
  {
    label: 'Large AI campus benchmark',
    value: '100 MW',
    detail: 'Continuous load that is roughly equivalent to powering about 81,000 homes.',
    accent: 'border-blue-500/30 text-blue-300',
  },
  {
    label: 'Interconnection queue delay',
    value: '5 years',
    detail: 'Average queue duration in some parts of the country for generation and storage projects.',
    accent: 'border-amber-500/30 text-amber-300',
  },
  {
    label: 'Transmission development drag',
    value: '10+ years',
    detail:
      'Historically, new transmission projects can take upwards of a decade to move through development.',
    accent: 'border-emerald-500/30 text-emerald-300',
  },
] as const

const HIDDEN_WASTE_FAULTS = [
  'Stuck dampers that never trigger a high-priority response',
  'Simultaneous heating and cooling hidden inside trend history',
  'Failed economizers that silently waste free cooling',
  'Control drift that compounds into permanent avoidable load',
] as const

const MATH_STEPS = [
  {
    step: '1',
    title: 'Commercial buildings are one of the biggest connected loads on the grid',
    value: '35%',
    detail:
      'DOE estimates commercial buildings consume 13.6 quads of electricity, about 35% of U.S. electricity use.',
    accent: 'border-cyan-500/25 bg-cyan-500/10',
  },
  {
    step: '2',
    title: 'A large share of that load is waste, not productive demand',
    value: 'Up to 30%',
    detail:
      'DOE notes commercial buildings can waste up to 30% of the energy they consume.',
    accent: 'border-blue-500/25 bg-blue-500/10',
  },
  {
    step: '3',
    title: 'Controls-driven HVAC improvement is a real demand-side lever',
    value: '30%',
    detail:
      'High-performance building controls have shown 30% HVAC energy reduction in commercial buildings.',
    accent: 'border-amber-500/25 bg-amber-500/10',
  },
  {
    step: '4',
    title: 'Even a modest reclaim unlocks datacenter-scale capacity',
    value: '~45 GW',
    detail: 'Derived from reclaiming 10% of commercial-building electricity load.',
    accent: 'border-emerald-500/25 bg-emerald-500/10',
  },
] as const

const ROLE_CARDS = [
  {
    title: 'Component-level HVAC fault detection',
    description:
      'Prescriptiv™ surfaces faults like stuck dampers, failed economizers, valve issues, and simultaneous heating and cooling at the equipment and subsystem level.',
  },
  {
    title: 'Up to 30% energy savings',
    description:
      'LeanFM focuses teams on the faults most likely to reduce building energy waste and release avoidable load back to the grid.',
  },
  {
    title: '4M+ sq ft deployed',
    description:
      'LeanFM Technologies is already operating across live commercial portfolios where repeatable operational savings matter.',
  },
  {
    title: 'No rip-and-replace required',
    description:
      'Prescriptiv works with existing BAS and BMS environments so the path to grid capacity optimization starts with systems already in place.',
  },
  {
    title: 'Built for portfolio scale',
    description:
      'Applicable across hospitals, universities, offices, hotels, and multi-building portfolios where demand-side grid management can compound.',
  },
] as const

const DOE_CARDS = [
  {
    title: 'Scaling the Grid to Power the American Economy',
    body:
      'DOE frames the grid challenge around rising electricity demand from data centers, manufacturing, and electrification. The Genesis Mission target is 20-100x faster decision-making and at least a 10% improvement in electricity cost and reliability.',
    accent: 'border-cyan-500/25',
  },
  {
    title: 'Reimagining Construction and Operation of Buildings',
    body:
      'DOE explicitly calls out faulty building controls as a driver of higher energy bills and positions AI as a way to improve design, permitting, modeling, and optimized building operations.',
    accent: 'border-blue-500/25',
  },
] as const

const AUDIENCE_CARDS = [
  {
    title: 'DOE and national labs',
    description:
      'Explore LeanFM as a private-sector demand-side partner aligned with federal grid-efficiency and buildings priorities.',
    href: '/contact?intent=general',
    cta: 'Talk Partnership',
    eventName: 'campaign_cta_click',
    location: 'powering_ai_audience_doe',
  },
  {
    title: 'Utility companies',
    description:
      'Use commercial-building operations as a practical grid capacity optimization lever instead of waiting on new supply alone.',
    href: '/contact?intent=general',
    cta: 'Discuss Demand Side',
    eventName: 'campaign_cta_click',
    location: 'powering_ai_audience_utility',
  },
  {
    title: 'Datacenter operators and developers',
    description:
      'See how reducing nearby building energy waste can support AI datacenter power demand without waiting years for new capacity.',
    href: '/contact?intent=general',
    cta: 'Explore Capacity Strategy',
    eventName: 'campaign_cta_click',
    location: 'powering_ai_audience_datacenter',
  },
  {
    title: 'Building portfolio owners',
    description:
      'Turn HVAC fault detection into measurable savings while contributing to local grid resilience and AI-era infrastructure readiness.',
    href: '/contact?intent=demo',
    cta: 'Book a Building Demo',
    eventName: 'cta_demo_click',
    location: 'powering_ai_audience_owner',
  },
] as const

export const metadata: Metadata = {
  title: 'Powering the AI Economy',
  description:
    'LeanFM Technologies shows how Prescriptiv turns building energy waste and HVAC fault detection into grid capacity optimization for AI datacenter power demand.',
  keywords: [
    'AI datacenter power demand',
    'grid capacity optimization',
    'building energy waste',
    'HVAC fault detection',
    'demand-side grid management',
    'DOE Genesis Mission',
    'Prescriptiv',
    'LeanFM Technologies',
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: 'Powering the AI Economy | LeanFM Technologies',
    description:
      "LeanFM makes the case that reducing hidden HVAC waste in commercial buildings is critical infrastructure for America's AI future.",
    url: PAGE_URL,
    images: [
      {
        url: '/og-image.png',
        width: 1000,
        height: 667,
        alt: 'Powering the AI Economy by LeanFM Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Powering the AI Economy | LeanFM Technologies',
    description:
      'Grid capacity for AI datacenters starts with eliminating hidden waste in commercial buildings.',
    images: ['/og-image.png'],
  },
}

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
    >
      {children}
    </a>
  )
}

function SourceNote({
  sources,
  className = '',
  prefix = 'Sources:',
}: {
  sources: Array<{ href: string; label: string }>
  className?: string
  prefix?: string
}) {
  return (
    <p className={`text-body-xs text-slate-500 ${className}`.trim()}>
      {prefix}{' '}
      {sources.map((source, index) => (
        <span key={source.href}>
          {index > 0 ? ', ' : null}
          <SourceLink href={source.href}>{source.label}</SourceLink>
        </span>
      ))}
    </p>
  )
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Powering the AI Economy',
  description:
    'LeanFM Technologies explains how Prescriptiv can free grid capacity for AI infrastructure by reducing hidden HVAC waste in commercial buildings.',
  url: PAGE_URL,
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LeanFM Technologies',
  url: SITE_CONFIG.url,
  email: SITE_CONFIG.contactEmail,
  areaServed: 'US',
}

export default function PoweringAiEconomyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="relative overflow-hidden border-b border-slate-800/60">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950/95 to-slate-950"
        />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="container-wide relative z-10 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <Badge className="mb-6 animate-fade-in">Powering the AI Economy</Badge>
              <h1 className="heading-1 mb-6 animate-fade-in-up text-white">
                America does not need to waste power on its way to the AI economy.
              </h1>
              <p className="body-large mb-4 animate-fade-in-up delay-100 max-w-2xl">
                AI datacenter power demand is rising fast. LeanFM Technologies makes the case that
                the fastest path to new grid capacity is not just new supply. It is stopping the
                building energy waste already sitting inside commercial HVAC systems.
              </p>
              <p className="body-default mb-8 animate-fade-in-up delay-200 max-w-2xl">
                Prescriptiv™ finds hidden faults, reduces avoidable load, and turns demand-side
                grid management into practical infrastructure for the next wave of AI datacenters.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-up delay-300">
                <TrackedButton
                  href="#grid-capacity-explainer"
                  size="large"
                  eventName="campaign_cta_click"
                  eventParams={{ location: 'powering_ai_hero_primary' }}
                >
                  See How We Free Grid Capacity
                </TrackedButton>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-up delay-400">
                {HERO_PROOF_POINTS.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/75 px-4 py-2 text-body-xs font-semibold text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="animate-fade-in-up delay-200">
              <Card className="overflow-hidden border border-slate-700/70 bg-slate-900/85 shadow-card">
                <div className="border-b border-slate-800/70 p-6">
                  <p className="text-body-xs uppercase tracking-[0.24em] text-cyan-300">
                    The infrastructure thesis
                  </p>
                  <h2 className="heading-3 mt-3 text-white">
                    Every megawatt saved in a commercial building is a megawatt available for AI.
                  </h2>
                </div>

                <div className="space-y-4 p-6">
                  <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-5">
                    <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">Why now</p>
                    <p className="mt-3 text-body-lg font-semibold text-white">
                      AI infrastructure is colliding with a constrained grid.
                    </p>
                    <p className="mt-2 text-body-sm text-slate-300">
                      Interconnection queues, transmission timelines, and new-load growth are all
                      moving slower than AI demand.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-5">
                    <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">
                      What is wasted
                    </p>
                    <p className="mt-3 text-body-lg font-semibold text-white">
                      Hidden HVAC faults quietly lock up grid capacity.
                    </p>
                    <p className="mt-2 text-body-sm text-slate-300">
                      Stuck dampers, failed economizers, and simultaneous heating and cooling
                      convert useful capacity into avoidable demand.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-cyan-500/25 bg-cyan-500/10 p-5">
                    <p className="text-body-xs uppercase tracking-[0.18em] text-cyan-300">
                      What LeanFM changes
                    </p>
                    <p className="mt-3 text-body-lg font-semibold text-white">
                      You do not just build more supply. You stop wasting what you already have.
                    </p>
                    <p className="mt-2 text-body-sm text-slate-300">
                      That is the core case for grid capacity optimization through existing
                      commercial buildings.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-slate-900/25">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="max-w-3xl">
              <Badge className="mb-6">The Problem</Badge>
              <h2 className="heading-2 mb-4 text-white">
                AI datacenters are asking for unprecedented load. The grid is being asked to move
                faster than the physical system around it.
              </h2>
              <p className="body-large mb-5">
                DOE and LBNL project a sharp increase in U.S. electricity demand from data centers,
                driven in part by AI workloads. Large data-center designs already span from 10 MW
                to 1 GW, and a single 100-MW campus represents roughly the same annual electricity
                demand as about 81,000 homes.
              </p>
              <p className="body-default mb-6">
                At the same time, interconnection queues average about five years in some regions,
                and transmission projects can take upward of a decade to move through development.
                That is why demand-side grid management matters: wasted commercial-building load is
                one of the fastest forms of capacity to reclaim.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {PROBLEM_METRICS.map((metric) => (
                  <Card key={metric.label} className={`border ${metric.accent} bg-slate-900/80`}>
                    <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">
                      {metric.label}
                    </p>
                    <p className="mt-3 font-display text-4xl font-semibold text-white">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-body-sm text-slate-300">{metric.detail}</p>
                  </Card>
                ))}
              </div>

              <SourceNote
                className="mt-5"
                sources={[
                  { href: SOURCE_URLS.dataCenterDemand, label: 'DOE/LBNL data center report' },
                  { href: SOURCE_URLS.dataCenterScale, label: 'DOE data center scale article' },
                  { href: SOURCE_URLS.interconnection, label: 'DOE LPO interconnection page' },
                  { href: SOURCE_URLS.permitting, label: 'DOE transmission permitting page' },
                  { href: SOURCE_URLS.homes, label: 'EIA residential electricity FAQ' },
                ]}
              />
            </div>

            <Card className="border border-slate-700/70 bg-slate-900/80">
              <p className="text-body-xs uppercase tracking-[0.2em] text-cyan-300">
                Hidden building energy waste
              </p>
              <h3 className="heading-3 mt-4 text-white">
                Commercial buildings keep consuming avoidable load long after the original fault is
                forgotten.
              </h3>
              <div className="mt-6 grid gap-3">
                {HIDDEN_WASTE_FAULTS.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-body-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-body-sm text-slate-300">
                This is why HVAC fault detection is not just a facilities issue. It is a capacity
                issue.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="grid-capacity-explainer"
        className="section scroll-mt-28 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950"
      >
        <div className="container-default">
          <div className="mb-12 max-w-3xl">
            <Badge className="mb-6">The Math</Badge>
            <h2 className="heading-2 mb-4 text-white">
              The revelation is simple: reclaim even a slice of existing building load, and the
              grid starts to look very different for AI infrastructure.
            </h2>
            <p className="body-large">
              LeanFM&apos;s grid capacity optimization argument is not abstract. It flows directly
              from the size of the commercial-building load already connected to the grid.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {MATH_STEPS.map((item) => (
              <Card key={item.step} className={`h-full border ${item.accent}`}>
                <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">
                  Step {item.step}
                </p>
                <p className="mt-3 font-display text-4xl font-semibold text-white">{item.value}</p>
                <CardTitle className="mt-4 mb-3 text-white">{item.title}</CardTitle>
                <CardDescription className="text-body-sm text-slate-300">
                  {item.detail}
                </CardDescription>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Card className="border border-cyan-500/25 bg-[linear-gradient(135deg,rgba(144,204,124,0.12),rgba(14,24,36,0.95))]">
              <p className="text-body-xs uppercase tracking-[0.18em] text-cyan-300">
                Derived capacity conversion
              </p>
              <h3 className="heading-3 mt-4 text-white">
                35% commercial-building electricity x 10% reclaimed load = roughly 45 GW returned
                to the system.
              </h3>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 p-5">
                  <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">
                    Equation
                  </p>
                  <p className="mt-3 text-body-lg font-semibold text-white">
                    Waste -&gt; reclaimed load -&gt; AI capacity
                  </p>
                  <p className="mt-2 text-body-sm text-slate-300">
                    Reclaiming demand is faster than waiting for new generation and transmission to
                    come online.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 p-5">
                  <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">
                    100 MW benchmark
                  </p>
                  <p className="mt-3 text-body-lg font-semibold text-white">~81,000 homes</p>
                  <p className="mt-2 text-body-sm text-slate-300">
                    Based on EIA average annual residential electricity purchases.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 p-5">
                  <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">
                    AI mapping
                  </p>
                  <p className="mt-3 text-body-lg font-semibold text-white">~450 campuses</p>
                  <p className="mt-2 text-body-sm text-slate-300">
                    Roughly 450 datacenter equivalents at 100 MW each from that reclaimed average
                    load.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border border-slate-700/70 bg-slate-900/80">
              <p className="text-body-xs uppercase tracking-[0.18em] text-cyan-300">
                Why this matters
              </p>
              <h3 className="heading-3 mt-4 text-white">
                This is demand-side grid management, not a thought experiment.
              </h3>
              <p className="mt-4 text-body-md text-slate-300">
                Commercial-building electricity is already connected, already metered, and already
                being consumed. When LeanFM reduces building energy waste, the result is not only
                lower cost. It is releasable capacity for the broader system.
              </p>
              <p className="mt-4 text-body-md text-slate-300">
                That is the missing bridge between building operations and the infrastructure needed
                to support the AI economy.
              </p>
            </Card>
          </div>

          <SourceNote
            className="mt-5"
            prefix="Public sources:"
            sources={[
              { href: SOURCE_URLS.commercialBuildings, label: 'DOE commercial buildings basics' },
              { href: SOURCE_URLS.commercialWaste, label: 'DOE commercial waste guidance' },
              { href: SOURCE_URLS.buildingControls, label: 'DOE building controls' },
              { href: SOURCE_URLS.homes, label: 'EIA residential electricity FAQ' },
            ]}
          />
          <p className="mt-2 text-body-xs text-slate-500">
            Derived calculation uses DOE&apos;s estimate that commercial buildings consume 13.6
            quads of electricity, approximately 35% of U.S. electricity use, and applies a 10%
            reclaimed-load scenario for illustration.
          </p>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-slate-900/25">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <Badge className="mb-6">LeanFM&apos;s Role</Badge>
              <h2 className="heading-2 mb-4 text-white">
                Prescriptiv™ turns hidden building energy waste into releasable grid capacity.
              </h2>
              <p className="body-large mb-5">
                LeanFM Technologies applies Prescriptiv AI to component-level HVAC fault detection
                and prioritization. The goal is practical: find the load that does not need to be
                there, tell operators what matters first, and reduce waste inside the systems that
                already shape the commercial-building load curve.
              </p>
              <p className="body-default mb-6">
                This is demand-side grid management through building operations. No new power plant.
                No rip-and-replace controls project. No waiting for a new transmission line to
                clear permitting.
              </p>

              <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-4">
                <Screenshot
                  id="IMG-004"
                  description="Results dashboard showing prioritized fault list with severity indicators"
                  aspect="4:3"
                  className="border border-slate-700/70"
                />
              </div>
            </div>

            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="badge-slate">LeanFM proof points</span>
                <span className="text-body-xs text-slate-500">
                  Company-reported product and deployment claims
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {ROLE_CARDS.map((card, index) => (
                  <Card
                    key={card.title}
                    className={index === ROLE_CARDS.length - 1 ? 'md:col-span-2' : ''}
                  >
                    <CardTitle className="mb-3">{card.title}</CardTitle>
                    <CardDescription className="text-body-md text-slate-300">
                      {card.description}
                    </CardDescription>
                  </Card>
                ))}
              </div>

              <p className="mt-5 text-body-xs text-slate-400">
                Savings vary based on building type, existing conditions, data quality, and
                implementation of recommended actions. The 30% figure represents potential savings
                in buildings with significant undetected faults. Actual results depend on your
                specific situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/70 to-slate-950">
        <div className="container-default">
          <div className="mb-12 max-w-3xl">
            <Badge className="mb-6">Aligned with the DOE Genesis Mission</Badge>
            <h2 className="heading-2 mb-4 text-white">
              DOE has already named the grid and building-controls problem. LeanFM sits directly
              in that operating gap.
            </h2>
            <p className="body-large">
              The DOE Genesis Mission frames AI-era infrastructure as both an energy challenge and
              a buildings challenge. LeanFM&apos;s role is to deliver measurable demand-side relief
              where those two priorities overlap.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {DOE_CARDS.map((card) => (
              <Card key={card.title} className={`h-full border ${card.accent} bg-slate-900/85`}>
                <CardTitle className="mb-4">{card.title}</CardTitle>
                <CardDescription className="text-body-md text-slate-300">
                  {card.body}
                </CardDescription>
              </Card>
            ))}
          </div>

          <SourceNote
            className="mt-5"
            sources={[
              { href: SOURCE_URLS.genesisArticle, label: 'DOE Genesis Mission article' },
              { href: SOURCE_URLS.genesisPdf, label: 'DOE Genesis Mission challenge document' },
            ]}
          />

          <Card className="mt-8 border border-cyan-500/25 bg-cyan-500/10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge-slate">LeanFM proof point</span>
              <span className="text-body-xs text-slate-400">
                Company context, not a DOE endorsement
              </span>
            </div>
            <h3 className="heading-3 mt-4 text-white">
              LeanFM already brings an existing DOE Phase II SBIR relationship to this category of
              work.
            </h3>
            <p className="mt-4 text-body-md text-slate-200">
              That relationship, combined with Prescriptiv deployments across commercial
              portfolios, positions LeanFM as a private-sector partner for federal priorities around
              buildings, operational efficiency, and the infrastructure needed to support
              America&apos;s AI future.
            </p>
          </Card>
        </div>
      </section>

      <section className="section-large bg-slate-950">
        <div className="container-default">
          <div className="rounded-3xl border border-slate-700/70 bg-gradient-to-br from-slate-900/95 to-slate-900/75 p-8 shadow-card md:p-12">
            <div className="max-w-3xl">
              <Badge className="mb-6">Partner on Grid Capacity</Badge>
              <h2 className="heading-2 mb-4 text-white">
                If AI growth needs power, the fastest capacity is often the power we stop wasting.
              </h2>
              <p className="body-large mb-8">
                LeanFM Technologies helps public-sector, utility, datacenter, and building
                stakeholders connect HVAC fault detection to grid capacity optimization and
                resilience.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <TrackedButton
                  href="/contact?intent=general"
                  size="large"
                  eventName="campaign_cta_click"
                  eventParams={{ location: 'powering_ai_final_primary' }}
                >
                  Talk to Our Team
                </TrackedButton>
                <TrackedButton
                  href="/contact?intent=demo"
                  size="large"
                  variant="secondary"
                  eventName="cta_demo_click"
                  eventParams={{ location: 'powering_ai_final_secondary' }}
                >
                  Book a Building Demo
                </TrackedButton>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {AUDIENCE_CARDS.map((card) => (
                <Card
                  key={card.title}
                  className="flex h-full flex-col justify-between border border-slate-700/70 bg-slate-950/55"
                >
                  <div>
                    <CardTitle className="mb-3">{card.title}</CardTitle>
                    <CardDescription className="text-body-md text-slate-300">
                      {card.description}
                    </CardDescription>
                  </div>
                  <TrackedButton
                    href={card.href}
                    className="mt-6 self-start"
                    eventName={card.eventName}
                    eventParams={{ location: card.location }}
                  >
                    {card.cta}
                  </TrackedButton>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
