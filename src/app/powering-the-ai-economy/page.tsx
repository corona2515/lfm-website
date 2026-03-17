import { Metadata } from 'next'
import { Accordion, Badge, Card, CardDescription, CardTitle } from '@/components/ui'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { SITE_CONFIG } from '@/lib/constants'

const PAGE_PATH = '/powering-the-ai-economy'
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`

const SOURCE_URLS = {
  genesisMission: 'https://www.energy.gov/documents/genesis-mission-science-and-technology-challenges',
  genesisHome: 'https://genesis.energy.gov',
  commercialBuildings:
    'https://www.energy.gov/cmei/buildings/about-commercial-buildings-integration-program',
  buildingControls: 'https://www.energy.gov/cmei/buildings/building-controls',
  commercialWaste:
    'https://www.energy.gov/cmei/buildings/take-action-save-energy-commercial-buildings',
  queues2025:
    'https://emp.lbl.gov/publications/queued-2025-edition-characteristics',
  epri: 'https://restservice.epri.com/publicattachment/96784',
  geothermalDataCenters: 'https://www.energy.gov/hgeo/geothermal/geothermal-and-data-centers',
} as const

interface ProblemCard {
  eyebrow: string
  stat: string
  title: string
  body: string
  source: string
  sourceLabel: string
  secondarySource?: string
  secondaryLabel?: string
  accent: string
}

const PROBLEM_CARDS: readonly ProblemCard[] = [
  {
    eyebrow: 'AI Datacenter Power Demand',
    stat: '100-1,000 MW',
    title: 'Large AI campuses behave like city-scale loads',
    body:
      'EPRI says a single large data center can require 100 to 1,000 megawatts of electricity, roughly equivalent to the power demand of 80,000 to 800,000 average homes.',
    source: SOURCE_URLS.epri,
    sourceLabel: 'EPRI Powering Intelligence 2026 FAQs',
    accent: 'border-red-500/30 text-red-300',
  },
  {
    eyebrow: 'Grid Bottlenecks',
    stat: '~2,300 GW',
    title: 'The interconnection backlog is already massive',
    body:
      'Berkeley Lab reports nearly 2,300 gigawatts of generation and storage were actively seeking grid connection at the end of 2024, and queue timelines for built projects have stretched to more than four years on median.',
    source: SOURCE_URLS.queues2025,
    sourceLabel: 'Berkeley Lab Queued Up 2025',
    accent: 'border-amber-500/30 text-amber-400',
  },
  {
    eyebrow: 'Building Energy Waste',
    stat: 'Up to 30%',
    title: 'Commercial buildings keep wasting connected load',
    body:
      'DOE says commercial buildings waste up to 30% of the energy they consume, while high-performance controls can reduce HVAC energy use by 30% in commercial buildings.',
    source: SOURCE_URLS.commercialWaste,
    sourceLabel: 'DOE commercial building waste',
    secondarySource: SOURCE_URLS.buildingControls,
    secondaryLabel: 'DOE building controls',
    accent: 'border-cyan-500/30 text-cyan-300',
  },
] as const

const ROLE_CARDS = [
  {
    title: 'Component-Level AFDD',
    description:
      'Prescriptiv™ surfaces issues such as stuck dampers, failed economizers, valve problems, and simultaneous heating and cooling at the equipment and subsystem level.',
  },
  {
    title: 'Works With Existing BAS/BMS',
    description:
      'LeanFM fits into the systems teams already run. The value is in better diagnosis and prioritization, not rip-and-replace capital projects.',
  },
  {
    title: 'Scaled Across 4M+ Sq Ft',
    description:
      'LeanFM is already deployed across more than 4 million square feet and is built for portfolio rollouts across hospitals, universities, offices, and hotels.',
  },
  {
    title: 'Up to 30% Energy Savings',
    description:
      'Buildings with significant undetected faults can unlock major operating savings when teams fix the highest-impact issues first.',
  },
] as const

const AUDIENCE_CARDS = [
  {
    title: 'DOE and National Labs',
    description:
      'Explore pilots and commercialization pathways that turn building operations into measurable demand-side grid management.',
    href: '/contact?intent=general&audience=doe',
    cta: 'Talk to Our Team',
    location: 'powering_ai_cta_doe',
  },
  {
    title: 'Utilities',
    description:
      'Add building-level fault correction to grid capacity optimization and non-wires demand-side strategy conversations.',
    href: '/contact?intent=general&audience=utility',
    cta: 'Explore Utility Pilots',
    location: 'powering_ai_cta_utility',
  },
  {
    title: 'Datacenter Developers',
    description:
      'If AI datacenter power demand is your bottleneck, demand-side capacity recovery belongs in the siting and utility engagement strategy.',
    href: '/contact?intent=demo&audience=datacenter',
    cta: 'Discuss Capacity Strategy',
    location: 'powering_ai_cta_datacenter',
  },
  {
    title: 'Building Portfolio Owners',
    description:
      'Reduce waste, improve operations, and contribute usable capacity back to an increasingly constrained grid without waiting on new generation.',
    href: '/contact?intent=demo&audience=portfolio',
    cta: 'See How Your Portfolio Helps',
    location: 'powering_ai_cta_portfolio',
  },
] as const

const SOURCE_ACCORDION_ITEMS = [
  {
    question: 'Primary sources used on this page',
    answer: (
      <ul className="space-y-3 text-body-md text-slate-300 list-disc pl-5">
        <li>
          <SourceLink href={SOURCE_URLS.genesisMission}>
            DOE Genesis Mission science and technology challenges
          </SourceLink>
        </li>
        <li>
          <SourceLink href={SOURCE_URLS.genesisHome}>Genesis Mission homepage</SourceLink>
        </li>
        <li>
          <SourceLink href={SOURCE_URLS.commercialBuildings}>
            DOE commercial buildings integration program
          </SourceLink>
        </li>
        <li>
          <SourceLink href={SOURCE_URLS.commercialWaste}>
            DOE commercial building waste guidance
          </SourceLink>
        </li>
        <li>
          <SourceLink href={SOURCE_URLS.buildingControls}>DOE building controls</SourceLink>
        </li>
        <li>
          <SourceLink href={SOURCE_URLS.queues2025}>Berkeley Lab Queued Up 2025</SourceLink>
        </li>
        <li>
          <SourceLink href={SOURCE_URLS.epri}>EPRI Powering Intelligence 2026 FAQs</SourceLink>
        </li>
        <li>
          <SourceLink href={SOURCE_URLS.geothermalDataCenters}>
            DOE geothermal and data centers
          </SourceLink>
        </li>
      </ul>
    ),
  },
  {
    question: 'How to read the datacenter equivalence math',
    answer: (
      <div className="space-y-3 text-body-md text-slate-300">
        <p>
          The explainer uses DOE&apos;s commercial-building electricity figure of 13.6 quads per year.
          A 10% demand-side improvement equals 1.36 quads, or roughly 399 terawatt-hours annually.
        </p>
        <p>
          Spread across a full year, that is about 45.5 gigawatts of continuous average load. Using
          EPRI&apos;s 100-megawatt benchmark for a large data center, that equates to roughly 450 large
          AI data centers.
        </p>
        <p>
          This is an illustrative national-scale equivalence, not a claim about one site, one market,
          or one portfolio.
        </p>
      </div>
    ),
  },
] as const

export const metadata: Metadata = {
  title: 'Powering the AI Economy',
  description:
    'LeanFM Technologies shows how Prescriptiv™ can reclaim wasted commercial-building load and turn building energy waste into grid capacity for AI datacenters.',
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
      'Every watt wasted in a building is a watt denied to AI. See how LeanFM turns HVAC optimization into grid capacity.',
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
      'LeanFM makes the case for demand-side grid management through building optimization.',
    images: ['/og-image.png'],
  },
}

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
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
  href,
  label,
  secondaryHref,
  secondaryLabel,
  className = '',
}: {
  href: string
  label: string
  secondaryHref?: string
  secondaryLabel?: string
  className?: string
}) {
  return (
    <p className={`text-body-xs text-slate-500 ${className}`.trim()}>
      Source:{' '}
      <SourceLink href={href}>{label}</SourceLink>
      {secondaryHref && secondaryLabel ? (
        <>
          {' '}and <SourceLink href={secondaryHref}>{secondaryLabel}</SourceLink>
        </>
      ) : null}
    </p>
  )
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Powering the AI Economy',
  description:
    'LeanFM Technologies explains how Prescriptiv™ can free grid capacity for AI datacenters by reducing waste in commercial buildings.',
  url: PAGE_URL,
  isPartOf: SITE_CONFIG.url,
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
          <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        <div className="container-wide relative z-10 pt-24 pb-20 md:pt-32 md:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <Badge className="mb-6 animate-fade-in">Powering the AI Economy</Badge>
              <h1 className="heading-1 mb-6 animate-fade-in-up text-white">
                Every Watt Wasted in a Building Is a Watt Denied to AI
              </h1>
              <p className="body-large mb-4 animate-fade-in-up delay-100 max-w-2xl">
                AI datacenters are colliding with a grid that is already strained. LeanFM
                Technologies makes the demand-side case: Prescriptiv™ turns HVAC fault detection,
                building energy waste reduction, and grid capacity optimization into usable headroom
                for the next wave of AI infrastructure.
              </p>
              <p className="body-default mb-8 animate-fade-in-up delay-200 max-w-2xl">
                You do not solve the entire problem by building more supply. You also stop wasting
                what is already connected.
              </p>

              <div className="mb-8 flex flex-wrap gap-2 animate-fade-in-up delay-300">
                <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-body-xs font-semibold text-cyan-200">
                  Demand-Side Grid Management
                </span>
                <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-body-xs font-semibold text-amber-100">
                  HVAC Fault Detection
                </span>
                <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-body-xs font-semibold text-blue-200">
                  Grid Capacity Optimization
                </span>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-up delay-300">
                <TrackedButton
                  href="#explainer"
                  size="large"
                  eventName="campaign_cta_click"
                  eventParams={{ location: 'powering_ai_hero_scroll' }}
                >
                  See How We Free Grid Capacity
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href="/contact?intent=general&audience=campaign"
                  size="large"
                  eventName="campaign_cta_click"
                  eventParams={{ location: 'powering_ai_hero_contact' }}
                >
                  Talk to Our Team
                </TrackedButton>
              </div>
            </div>

            <div className="animate-fade-in-up delay-200">
              <Card className="overflow-hidden border border-slate-700/70 bg-slate-900/80 shadow-card">
                <div className="border-b border-slate-800/70 p-6">
                  <p className="text-body-xs uppercase tracking-[0.24em] text-cyan-300">
                    The overlooked capacity resource
                  </p>
                  <h2 className="heading-3 mt-3 text-white">
                    Waste already connected to the grid
                  </h2>
                </div>

                <div className="grid gap-4 p-6 md:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-5">
                    <p className="text-body-xs uppercase tracking-[0.2em] text-red-300">
                      AI load benchmark
                    </p>
                    <p className="mt-3 font-display text-4xl font-semibold text-white">100+ MW</p>
                    <p className="mt-2 text-body-sm text-slate-300">
                      A single large AI datacenter can consume as much electricity as roughly 80,000
                      homes.
                    </p>
                    <SourceNote
                      href={SOURCE_URLS.epri}
                      label="EPRI 2026 FAQs"
                      className="mt-3"
                    />
                  </div>

                  <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
                    <p className="text-body-xs uppercase tracking-[0.2em] text-amber-300">
                      Commercial buildings
                    </p>
                    <p className="mt-3 font-display text-4xl font-semibold text-white">35%</p>
                    <p className="mt-2 text-body-sm text-slate-300">
                      DOE says commercial buildings consume 13.6 quads of electricity, about a third
                      of U.S. electricity consumption.
                    </p>
                    <SourceNote
                      href={SOURCE_URLS.commercialBuildings}
                      label="DOE commercial buildings"
                      className="mt-3"
                    />
                  </div>

                  <div className="rounded-2xl border border-cyan-500/25 bg-cyan-500/10 p-5">
                    <p className="text-body-xs uppercase tracking-[0.2em] text-cyan-300">
                      Recoverable inefficiency
                    </p>
                    <p className="mt-3 font-display text-4xl font-semibold text-white">Up to 30%</p>
                    <p className="mt-2 text-body-sm text-slate-300">
                      DOE says commercial buildings waste up to 30% of the energy they consume.
                    </p>
                    <SourceNote
                      href={SOURCE_URLS.commercialWaste}
                      label="DOE waste guidance"
                      className="mt-3"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-slate-900/30">
        <div className="container-default">
          <div className="mb-12 max-w-3xl">
            <Badge className="mb-6">The Problem</Badge>
            <h2 className="heading-2 mb-4 text-white">
              The grid challenge is not only supply. It is avoidable demand.
            </h2>
            <p className="body-large">
              America is racing to add AI compute, but AI datacenter power demand is arriving faster
              than grid infrastructure can expand. At the same time, commercial buildings are already
              shedding usable capacity through hidden HVAC faults, poor control sequences, and missed
              operational fixes.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {PROBLEM_CARDS.map((card) => (
              <Card key={card.title} className={`h-full border ${card.accent}`}>
                <p className="text-body-xs uppercase tracking-[0.18em] text-slate-400">
                  {card.eyebrow}
                </p>
                <p className="mt-4 font-display text-5xl font-semibold text-white">{card.stat}</p>
                <CardTitle className="mt-5 mb-3">{card.title}</CardTitle>
                <CardDescription className="text-body-md leading-relaxed text-slate-300">
                  {card.body}
                </CardDescription>
                <SourceNote
                  href={card.source}
                  label={card.sourceLabel}
                  secondaryHref={card.secondarySource}
                  secondaryLabel={card.secondaryLabel}
                  className="mt-5"
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="explainer"
        className="section-large scroll-mt-24 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/70 to-slate-950"
      >
        <div className="container-default">
          <div className="mb-12 max-w-3xl">
            <Badge className="mb-6">The Math</Badge>
            <h2 className="heading-2 mb-4 text-white">The demand-side capacity math is national-scale</h2>
            <p className="body-large">
              DOE&apos;s Genesis Mission calls for at least a 10% improvement in electricity cost and
              reliability. Commercial buildings already represent one of the country&apos;s largest
              connected loads. Reclaiming even a fraction of that waste is not a rounding error. It
              is capacity.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="overflow-hidden border border-slate-700/70 bg-slate-900/80">
              <div className="border-b border-slate-800/70 p-6">
                <p className="text-body-xs uppercase tracking-[0.24em] text-cyan-300">
                  Illustrative national equivalence
                </p>
                <p className="mt-3 text-body-sm text-slate-400">
                  The point is not that one building powers one datacenter. The point is that the
                  waste pool is large enough to matter to the grid.
                </p>
              </div>

              <div className="space-y-4 p-6">
                <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-5">
                  <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">
                    Step 1
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-display text-4xl font-semibold text-white">13.6 quads</p>
                      <p className="mt-2 text-body-sm text-slate-300">
                        Commercial-building electricity use, equal to about 35% of U.S. electricity.
                      </p>
                    </div>
                    <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 md:flex">
                      1
                    </div>
                  </div>
                  <SourceNote
                    href={SOURCE_URLS.commercialBuildings}
                    label="DOE commercial buildings"
                    className="mt-4"
                  />
                </div>

                <div className="flex justify-center">
                  <div className="h-10 w-px bg-gradient-to-b from-cyan-400 to-cyan-400/0" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-5">
                    <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">
                      Step 2
                    </p>
                    <p className="mt-3 font-display text-4xl font-semibold text-white">10%</p>
                    <p className="mt-2 text-body-sm text-slate-300">
                      The Genesis Mission target for better electricity cost and reliability in
                      Scaling the Grid.
                    </p>
                    <SourceNote
                      href={SOURCE_URLS.genesisMission}
                      label="DOE Genesis Mission"
                      className="mt-4"
                    />
                  </div>

                  <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-5">
                    <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">
                      Step 3
                    </p>
                    <p className="mt-3 font-display text-4xl font-semibold text-white">~399 TWh</p>
                    <p className="mt-2 text-body-sm text-slate-300">
                      Annual electricity recovered if the demand side improves by 10% at national
                      commercial-building scale.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="h-10 w-px bg-gradient-to-b from-cyan-400 to-cyan-400/0" />
                </div>

                <div className="rounded-3xl border border-cyan-500/35 bg-gradient-to-r from-cyan-500/10 via-slate-900/70 to-slate-900/90 p-6">
                  <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                    <div>
                      <p className="text-body-xs uppercase tracking-[0.24em] text-cyan-300">
                        Step 4
                      </p>
                      <p className="mt-3 font-display text-5xl font-semibold text-white">~46 GW</p>
                      <p className="mt-2 text-body-md text-slate-200">
                        Continuous average load headroom created by that 10% improvement.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/65 p-5">
                      <p className="text-body-xs uppercase tracking-[0.2em] text-cyan-300">
                        AI datacenter equivalence
                      </p>
                      <p className="mt-3 font-display text-4xl font-semibold text-white">
                        ~450 x 100 MW
                      </p>
                      <p className="mt-2 text-body-sm text-slate-300">
                        Equivalent to roughly 450 large AI datacenters at the 100-megawatt benchmark.
                        This is an illustrative equivalence, not a forecast or siting claim.
                      </p>
                      <SourceNote
                        href={SOURCE_URLS.epri}
                        label="EPRI 2026 FAQs"
                        className="mt-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="border border-slate-700/70 bg-slate-900/75">
                <h3 className="heading-4 mb-4 text-white">Why this feels like a revelation</h3>
                <ul className="space-y-4 text-body-md text-slate-300">
                  <li>
                    New generation and transmission take years to plan and build. Waste reduction can
                    start on infrastructure that is already online.
                  </li>
                  <li>
                    HVAC and controls problems are distributed across existing portfolios, which makes
                    them a scalable demand-side grid management opportunity rather than a single megaproject.
                  </li>
                  <li>
                    Every megawatt you stop wasting in a commercial building is a megawatt that does
                    not have to be manufactured from scratch before AI growth can use it.
                  </li>
                </ul>
              </Card>

              <Card className="border border-slate-700/70 bg-slate-900/75">
                <h3 className="heading-4 mb-4 text-white">DOE already points to the same leverage</h3>
                <p className="text-body-md text-slate-300">
                  DOE says high-performance controls can cut HVAC energy use in commercial buildings by
                  30%, with nationwide deployment corresponding to an absolute reduction of more than
                  3% of total U.S. energy consumption.
                </p>
                <SourceNote
                  href={SOURCE_URLS.buildingControls}
                  label="DOE building controls"
                  className="mt-4"
                />
              </Card>

              <TrackedButton
                href="/contact?intent=general&audience=capacity-strategy"
                size="large"
                eventName="campaign_cta_click"
                eventParams={{ location: 'powering_ai_math_cta' }}
              >
                Talk Through the Capacity Math
              </TrackedButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-slate-900/25">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-2xl">
              <Badge className="mb-6">LeanFM&apos;s Role</Badge>
              <h2 className="heading-2 mb-4 text-white">
                Prescriptiv™ turns hidden HVAC faults into grid capacity optimization
              </h2>
              <p className="body-large mb-5">
                LeanFM Technologies is not arguing for abstract efficiency. It is delivering a
                practical operating model: automated fault detection and diagnosis for commercial
                building systems that helps teams stop wasting electricity they are already paying for.
              </p>
              <p className="body-default mb-6">
                Prescriptiv™ works with existing BAS and BMS environments, prioritizes fixes by likely
                operational impact, and scales across portfolios where demand-side savings can be
                repeated building after building.
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {['Hospitals', 'Universities', 'Offices', 'Hotels', 'Portfolio scale'].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-body-xs font-semibold text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-body-sm text-slate-400">
                Savings vary based on building type, existing conditions, data quality, and
                implementation of recommended actions. The 30% figure represents potential savings in
                buildings with significant undetected faults. Actual results depend on your specific
                situation.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {ROLE_CARDS.map((card) => (
                <Card key={card.title} hover className="h-full border border-slate-700/70 bg-slate-900/80">
                  <CardTitle className="mb-3">{card.title}</CardTitle>
                  <CardDescription className="text-body-md text-slate-300">
                    {card.description}
                  </CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-gradient-to-b from-slate-900/45 to-slate-950">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <Badge className="mb-6">DOE Genesis Mission</Badge>
              <h2 className="heading-2 mb-4 text-white">
                Aligned with the federal agenda for both buildings and the grid
              </h2>
              <p className="body-large mb-5">
                Genesis puts two relevant challenges side by side: scaling the grid to support
                dramatic increases in demand from data centers and reimagining the construction and
                operation of buildings, where faulty controls still drive energy waste.
              </p>
              <p className="body-default mb-6">
                LeanFM fits squarely into that intersection. Prescriptiv™ is a private-sector pathway
                for delivering demand-side efficiency, better operations, and more usable capacity from
                assets that already exist. LeanFM also brings an existing DOE relationship, including a
                Phase II SBIR award, to that mission alignment.
              </p>
              <SourceNote
                href={SOURCE_URLS.genesisMission}
                label="DOE Genesis Mission challenge document"
                secondaryHref={SOURCE_URLS.genesisHome}
                secondaryLabel="genesis.energy.gov"
              />
            </div>

            <div className="space-y-5">
              <Card className="border border-cyan-500/25 bg-slate-900/80">
                <p className="text-body-xs uppercase tracking-[0.2em] text-cyan-300">
                  Scaling the Grid
                </p>
                <p className="mt-3 text-body-md text-slate-300">
                  DOE frames the grid challenge around reliability limits and infrastructure
                  constraints from data centers, manufacturing, and electrification, and targets
                  20-100x faster decision-making plus at least a 10% improvement in electricity cost
                  and reliability.
                </p>
              </Card>

              <Card className="border border-amber-500/25 bg-slate-900/80">
                <p className="text-body-xs uppercase tracking-[0.2em] text-amber-300">
                  Reimagining Buildings
                </p>
                <p className="mt-3 text-body-md text-slate-300">
                  DOE explicitly calls out faulty building controls and positions AI-assisted optimized
                  maintenance and operations as part of the solution. That is precisely where LeanFM
                  operates.
                </p>
              </Card>

              <TrackedButton
                href={SOURCE_URLS.genesisHome}
                external
                size="large"
                eventName="campaign_cta_click"
                eventParams={{ location: 'powering_ai_doe_cta' }}
              >
                Explore the Genesis Mission
              </TrackedButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-b border-slate-800/60 bg-slate-950">
        <div className="container-default">
          <div className="mb-12 max-w-3xl">
            <Badge className="mb-6">Partner With Us</Badge>
            <h2 className="heading-2 mb-4 text-white">
              The fastest megawatt to deliver is the one you stop wasting
            </h2>
            <p className="body-large">
              LeanFM Technologies works across the stakeholders who care about AI datacenter power
              demand, building energy waste, and resilient demand-side grid management.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {AUDIENCE_CARDS.map((card) => (
              <Card key={card.title} hover className="flex h-full flex-col justify-between border border-slate-700/70 bg-slate-900/80">
                <div>
                  <CardTitle className="mb-3">{card.title}</CardTitle>
                  <CardDescription className="text-body-md text-slate-300">
                    {card.description}
                  </CardDescription>
                </div>
                <TrackedButton
                  href={card.href}
                  className="mt-6 self-start"
                  eventName="campaign_cta_click"
                  eventParams={{ location: card.location }}
                >
                  {card.cta}
                </TrackedButton>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-900/25">
        <div className="container-narrow">
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 md:p-8">
            <div className="mb-8 text-center">
              <h2 className="heading-3 mb-4 text-white">Sources &amp; methodology</h2>
              <p className="body-default">
                Third-party statistics on this page are sourced inline and summarized here for review.
              </p>
            </div>

            <Accordion items={SOURCE_ACCORDION_ITEMS} />
          </div>
        </div>
      </section>
    </>
  )
}
