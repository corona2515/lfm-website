import { Metadata } from 'next'
import { Badge, Card, CardDescription, CardTitle } from '@/components/ui'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { CTA_LABELS, SITE_CONFIG } from '@/lib/constants'

const PAGE_PATH = '/building-data-to-action'
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`

const SOURCE_URLS = {
  commercialBuildings:
    'https://www.energy.gov/cmei/buildings/about-commercial-buildings-integration-program',
  buildingControls: 'https://www.energy.gov/cmei/buildings/building-controls',
  commercialWaste:
    'https://www.energy.gov/cmei/buildings/take-action-save-energy-commercial-buildings',
} as const

const WHAT_IT_DOES_CARDS = [
  {
    title: 'Connects to existing BAS/BMS',
    description:
      'Works with the systems your team already runs. The value comes from better analysis and prioritization, not a capital-heavy rip-and-replace project.',
  },
  {
    title: 'Finds hidden HVAC faults',
    description:
      'Surfaces issues like stuck dampers, failed economizers, valve problems, and simultaneous heating and cooling at the equipment and subsystem level.',
  },
  {
    title: 'Prioritizes what to fix first',
    description:
      'Helps teams focus on the issues most likely to drive wasted energy, operational risk, and unnecessary cost.',
  },
  {
    title: 'Scales across portfolios',
    description:
      'Built for hospitals, universities, offices, hotels, and multi-building portfolios where repeatable savings and operational visibility matter.',
  },
] as const

const BENEFITS = [
  'Reduce wasted energy',
  'Improve visibility into HVAC system issues',
  'Support maintenance with clearer priorities',
  'Extend the value of existing building systems',
  'Create a more scalable approach to operational improvement',
] as const

const AUDIENCE_CARDS = [
  {
    title: 'Building owners and operators',
    description: 'Reduce waste and improve portfolio performance.',
    href: '/contact?intent=demo&audience=owners',
    cta: 'Book a Demo',
    eventName: 'cta_demo_click',
    location: 'powering_data_audience_owners',
  },
  {
    title: 'Facilities and engineering teams',
    description: 'Get clearer visibility into hidden faults and operational priorities.',
    href: '/contact?intent=demo&audience=facilities',
    cta: 'See the Workflow',
    eventName: 'cta_demo_click',
    location: 'powering_data_audience_facilities',
  },
  {
    title: 'Energy and sustainability leaders',
    description: 'Turn existing system data into measurable efficiency opportunities.',
    href: '/contact?intent=demo&audience=energy',
    cta: 'Talk to Our Team',
    eventName: 'cta_demo_click',
    location: 'powering_data_audience_energy',
  },
  {
    title: 'Utilities and strategic partners',
    description: 'Support demand-side improvement with better operational intelligence.',
    href: '/contact?intent=general&audience=partners',
    cta: 'Explore Partnership Fit',
    eventName: 'campaign_cta_click',
    location: 'powering_data_audience_partners',
  },
] as const

export const metadata: Metadata = {
  title: 'From Hidden HVAC Waste to Clear Action',
  description:
    'LeanFM turns BAS and BMS data into prioritized HVAC actions for building owners, operators, and facilities teams.',
  keywords: [
    'building energy waste',
    'HVAC fault detection',
    'BAS data',
    'BMS data',
    'fault prioritization',
    'building performance',
    'Prescriptiv',
    'LeanFM Technologies',
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: 'From Hidden HVAC Waste to Clear Action | LeanFM Technologies',
    description:
      'Your building already has the data. LeanFM turns it into prioritized HVAC action.',
    url: PAGE_URL,
    images: [
      {
        url: '/og-image.png',
        width: 1000,
        height: 667,
        alt: 'From Hidden HVAC Waste to Clear Action by LeanFM Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Hidden HVAC Waste to Clear Action | LeanFM Technologies',
    description:
      'LeanFM helps building teams find hidden HVAC faults and prioritize what to fix first.',
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
      Source: <SourceLink href={href}>{label}</SourceLink>
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
  name: 'From Hidden HVAC Waste to Clear Action',
  description:
    'LeanFM shows how Prescriptiv turns BAS and BMS data into prioritized HVAC actions for commercial building teams.',
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

export default function BuildingDataActionPage() {
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

        <div className="container-wide relative z-10 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <Badge className="mb-6 animate-fade-in">From Hidden HVAC Waste to Clear Action</Badge>
              <h1 className="heading-1 mb-6 animate-fade-in-up text-white">
                Your Building Already Has the Data. We Turn It Into Action.
              </h1>
              <p className="body-large mb-4 animate-fade-in-up delay-100 max-w-2xl">
                LeanFM helps commercial building teams uncover hidden HVAC faults, reduce energy
                waste, and prioritize the fixes that matter most using the BAS and BMS data you
                already have.
              </p>
              <p className="body-default mb-8 animate-fade-in-up delay-200 max-w-2xl">
                No rip-and-replace. No new hardware requirement. Just clearer diagnosis, smarter
                prioritization, and better building performance.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-up delay-300">
                <TrackedButton
                  href="/contact?intent=demo"
                  size="large"
                  eventName="cta_demo_click"
                  eventParams={{ location: 'powering_data_hero_primary' }}
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={SITE_CONFIG.appUrl}
                  size="large"
                  eventName="cta_upload_sample_click"
                  eventParams={{ location: 'powering_data_hero_secondary' }}
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <div className="animate-fade-in-up delay-200">
              <Card className="overflow-hidden border border-slate-700/70 bg-slate-900/85 shadow-card">
                <div className="border-b border-slate-800/70 p-6">
                  <p className="text-body-xs uppercase tracking-[0.24em] text-cyan-300">
                    What teams get from Prescriptiv™
                  </p>
                  <h2 className="heading-3 mt-3 text-white">From raw BAS trends to ranked action</h2>
                </div>

                <div className="space-y-4 p-6">
                  <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-5">
                    <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">Input</p>
                    <p className="mt-3 text-body-lg font-semibold text-white">
                      Existing BAS/BMS data already in place
                    </p>
                    <p className="mt-2 text-body-sm text-slate-300">
                      Start with the systems and trend data your building already generates.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-5">
                    <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">Analysis</p>
                    <p className="mt-3 text-body-lg font-semibold text-white">
                      Likely faults surfaced and prioritized
                    </p>
                    <p className="mt-2 text-body-sm text-slate-300">
                      Prescriptiv helps teams identify hidden waste and focus on what matters first.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-cyan-500/25 bg-cyan-500/10 p-5">
                    <p className="text-body-xs uppercase tracking-[0.18em] text-cyan-300">Outcome</p>
                    <p className="mt-3 text-body-lg font-semibold text-white">
                      Clearer priorities for better building performance
                    </p>
                    <p className="mt-2 text-body-sm text-slate-300">
                      Less time hunting through raw trends. More clarity on what to fix next.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-slate-900/30">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="max-w-3xl">
              <Badge className="mb-6">The problem</Badge>
              <h2 className="heading-2 mb-4 text-white">
                Most buildings are already collecting the right data. They&apos;re just not turning it
                into decisions.
              </h2>
              <p className="body-large mb-5">
                HVAC systems generate a constant stream of operational data, but hidden faults, poor
                control sequences, and low-visibility inefficiencies still go undetected for months.
                Teams end up paying for wasted energy, avoidable wear, and reactive troubleshooting.
              </p>
              <p className="body-default">
                LeanFM changes that. Prescriptiv analyzes your existing building data, surfaces likely
                faults, and helps your team focus on the highest-impact actions first.
              </p>
            </div>

            <Card className="border border-slate-700/70 bg-slate-900/80">
              <p className="text-body-xs uppercase tracking-[0.2em] text-slate-500">
                What often gets missed
              </p>
              <div className="mt-5 grid gap-3">
                {[
                  'Stuck dampers that never get escalated',
                  'Failed economizers quietly wasting free cooling',
                  'Simultaneous heating and cooling hidden in trend data',
                  'Control drift that turns into steady avoidable spend',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-body-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/70 to-slate-950">
        <div className="container-default">
          <div className="mb-12 max-w-3xl">
            <Badge className="mb-6">Prescriptiv™</Badge>
            <h2 className="heading-2 mb-4 text-white">What Prescriptiv does</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {WHAT_IT_DOES_CARDS.map((card) => (
              <Card key={card.title} hover className="h-full border border-slate-700/70 bg-slate-900/80">
                <CardTitle className="mb-3">{card.title}</CardTitle>
                <CardDescription className="text-body-md text-slate-300">
                  {card.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-slate-900/25">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div className="max-w-3xl">
              <Badge className="mb-6">Why this matters</Badge>
              <h2 className="heading-2 mb-4 text-white">Why this matters</h2>
              <p className="body-large mb-5">
                Commercial buildings already represent one of the largest connected energy loads in
                the country. The fastest savings often do not come from adding new infrastructure.
                They come from fixing waste that is already happening inside existing systems.
              </p>
              <p className="body-default">
                That makes building-level efficiency operationally valuable on its own and relevant to
                broader grid strain and demand-side improvement as well.
              </p>
              <SourceNote
                href={SOURCE_URLS.commercialBuildings}
                label="DOE commercial buildings"
                secondaryHref={SOURCE_URLS.buildingControls}
                secondaryLabel="DOE building controls"
                className="mt-5"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
              <Card className="border border-cyan-500/25 bg-slate-900/80">
                <p className="text-body-xs uppercase tracking-[0.18em] text-cyan-300">
                  Potential waste
                </p>
                <p className="mt-3 font-display text-4xl font-semibold text-white">Up to 30%</p>
                <p className="mt-2 text-body-sm text-slate-300">
                  Potential avoidable energy waste in commercial buildings.
                </p>
                <SourceNote
                  href={SOURCE_URLS.commercialWaste}
                  label="DOE waste guidance"
                  className="mt-4"
                />
              </Card>

              <Card className="border border-amber-500/25 bg-slate-900/80">
                <p className="text-body-xs uppercase tracking-[0.18em] text-amber-300">
                  Deployment scale
                </p>
                <p className="mt-3 font-display text-4xl font-semibold text-white">4M+ sq ft</p>
                <p className="mt-2 text-body-sm text-slate-300">
                  Existing LeanFM deployment footprint across commercial building environments.
                </p>
              </Card>

              <Card className="border border-blue-500/25 bg-slate-900/80">
                <p className="text-body-xs uppercase tracking-[0.18em] text-blue-300">
                  Current infrastructure
                </p>
                <p className="mt-3 font-display text-4xl font-semibold text-white">BAS/BMS</p>
                <p className="mt-2 text-body-sm text-slate-300">
                  Works with existing controls environments instead of requiring a new hardware stack.
                </p>
              </Card>
            </div>
          </div>

          <p className="mt-6 text-body-xs text-slate-400">
            Savings vary based on building type, existing conditions, data quality, and
            implementation of recommended actions. The 30% figure represents potential savings in
            buildings with significant undetected faults. Actual results depend on your specific
            situation.
          </p>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-gradient-to-b from-slate-900/45 to-slate-950">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div className="max-w-3xl">
              <Badge className="mb-6">In practice</Badge>
              <h2 className="heading-2 mb-4 text-white">What this looks like in practice</h2>
              <p className="body-large mb-5">
                A building may be running simultaneous heating and cooling, operating with a failed
                economizer, or wasting energy through control drift that no one sees in day-to-day
                operations.
              </p>
              <p className="body-default">
                Prescriptiv helps surface those issues, quantify where attention is needed, and give
                teams a more practical path from raw building data to action.
              </p>
            </div>

            <Card className="border border-slate-700/70 bg-slate-900/80">
              <p className="text-body-xs uppercase tracking-[0.2em] text-cyan-300">
                From signal to action
              </p>
              <div className="mt-5 space-y-4">
                {[
                  'Raw BAS trend behavior points to a likely fault.',
                  'Prescriptiv highlights where waste or risk is most likely occurring.',
                  'Teams get a clearer shortlist of what deserves attention first.',
                ].map((item, index) => (
                  <div key={item} className="flex items-start gap-4">
                    <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-cyan-500/25 bg-cyan-500/10 text-body-sm font-semibold text-cyan-300">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-body-sm text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-slate-950">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <Badge className="mb-6">Benefits</Badge>
            <h2 className="heading-2 mb-4 text-white">A smarter way to improve building performance</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-4 text-body-md text-slate-200"
              >
                <span className="mr-3 inline-block h-2.5 w-2.5 rounded-full bg-cyan-400 align-middle" />
                <span className="align-middle">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-slate-900/25">
        <div className="container-default">
          <div className="mb-12 max-w-3xl">
            <Badge className="mb-6">Audience</Badge>
            <h2 className="heading-2 mb-4 text-white">Built for teams responsible for real buildings</h2>
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
                  eventName={card.eventName}
                  eventParams={{ location: card.location }}
                >
                  {card.cta}
                </TrackedButton>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large border-b border-slate-800/60 bg-slate-950">
        <div className="container-narrow">
          <div className="rounded-3xl border border-slate-700/70 bg-gradient-to-br from-slate-900/95 to-slate-900/75 p-8 text-center shadow-card md:p-12">
            <h2 className="heading-2 mb-4 text-white">
              The fastest savings usually come from fixing what your building is already wasting.
            </h2>
            <p className="body-large mb-8">
              LeanFM helps you identify hidden HVAC issues, prioritize action, and make better use of
              the systems and data you already have.
            </p>
            <TrackedButton
              href="/contact?intent=demo"
              size="large"
              eventName="cta_demo_click"
              eventParams={{ location: 'powering_data_final_primary' }}
            >
              See What Your Building Data Is Hiding
            </TrackedButton>
          </div>
        </div>
      </section>
    </>
  )
}
