import { Metadata } from 'next'
import Link from 'next/link'
import { Badge, Card, CardTitle, CardDescription, Accordion } from '@/components/ui'
import { Screenshot } from '@/components/MediaPlaceholder'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import {
  SITE_CONFIG,
  PROCESS_STEPS,
  FAQ_ITEMS,
  CTA_LABELS,
  ENERGY_DISCLAIMER,
  HOME_BUILT_FOR_VERTICALS,
  HOME_CAPABILITIES,
  HOME_PROOF_METRICS,
  HOME_TRUST_SIGNALS,
} from '@/lib/constants'

export const metadata: Metadata = {
  title: 'HVAC Fault Detection Software for Facilities Teams',
  description: 'OnPoint helps facilities teams find hidden BAS faults, prioritize fixes by impact, and reduce avoidable HVAC energy waste.',
  keywords: [
    'HVAC fault detection software',
    'BAS analytics software',
    'facility management software',
    'building automation fault detection',
    'energy waste reduction',
  ],
}

export default function HomePage() {
  const METRIC_ACCENTS = [
    { card: 'border-t-2 border-t-green-400', value: 'text-green-300' },
    { card: 'border-t-2 border-t-blue-400', value: 'text-blue-300' },
    { card: 'border-t-2 border-t-red-400', value: 'text-red-300' },
  ]

  const STEP_CARD_ACCENTS = [
    'border-blue-500/30',
    'border-red-500/30',
    'border-green-500/30',
  ]

  const STEP_BADGE_ACCENTS = [
    'border border-blue-400/50 bg-blue-500/15 text-blue-300',
    'border border-red-400/50 bg-red-500/15 text-red-300',
    'border border-green-400/50 bg-green-500/15 text-green-300',
  ]

  const STEP_LABEL_ACCENTS = [
    'text-blue-300',
    'text-red-300',
    'text-green-300',
  ]

  const CAPABILITY_DOT_ACCENTS = [
    'bg-blue-400',
    'bg-red-400',
    'bg-green-400',
  ]

  const IMPACT_DASHBOARD_ITEMS = [
    {
      label: 'Budget',
      value: 'Energy spend',
      description: 'Expose the faults quietly inflating utility bills.',
      accent: 'from-cyan-300/30 to-cyan-500/5 border-cyan-400/35 text-cyan-200',
      marker: 'bg-cyan-300',
    },
    {
      label: 'Building',
      value: 'Comfort + reliability',
      description: 'Rank fixes that improve occupant comfort and equipment performance.',
      accent: 'from-blue-300/25 to-blue-500/5 border-blue-400/35 text-blue-200',
      marker: 'bg-blue-300',
    },
    {
      label: 'Planet',
      value: 'Avoidable CO2',
      description: 'Reduce HVAC waste that compounds into building emissions.',
      accent: 'from-red-300/20 to-red-500/5 border-red-400/35 text-red-200',
      marker: 'bg-red-300',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LeanFM Technologies',
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.contactEmail,
    areaServed: 'US',
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OnPoint',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'HVAC fault detection software for BAS trend data with prioritized findings and recommended actions.',
    provider: {
      '@type': 'Organization',
      name: 'LeanFM Technologies',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/LimitedAvailability',
      url: `${SITE_CONFIG.url}/contact?intent=demo`,
      price: '0',
      priceCurrency: 'USD',
      description: 'Book a demo or upload a sample dataset to start review.',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <section id="home-hero" className="relative overflow-hidden border-b border-slate-800/60">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          >
            <source
              src="https://res.cloudinary.com/dbfmekki0/video/upload/v1756907369/LFM_Hero_x-low_qual_hsubsm.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-950/85"
        />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -top-16 right-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
        </div>
        <div className="container-wide relative z-10 pt-24 pb-20 md:pt-32 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <Badge className="mb-6 animate-fade-in">For Facilities &amp; Energy Teams</Badge>
              <h1 className="mb-6 max-w-[12ch] animate-fade-in-up font-body text-[3.4rem] font-semibold leading-[0.98] tracking-[-0.005em] text-white md:text-[4.35rem] lg:text-[4.8rem]">
                Find the BAS faults draining your energy budget.
              </h1>
              <p className="body-large mb-3 animate-fade-in-up delay-100">
                AI fault detection for commercial buildings using your existing BAS data.
              </p>
              <p className="body-default mb-8 animate-fade-in-up delay-100">
                OnPoint analyzes your trend exports, prioritizes faults by likely energy and comfort
                impact, and gives your team clear next steps to fix what matters first.
              </p>
              <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up delay-200">
                <span className="inline-flex items-center rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-body-xs font-semibold text-blue-200">
                  Energy Waste
                </span>
                <span className="inline-flex items-center rounded-full border border-red-400/40 bg-red-500/10 px-3 py-1 text-body-xs font-semibold text-red-200">
                  Comfort Risk
                </span>
                <span className="inline-flex items-center rounded-full border border-green-400/40 bg-green-500/10 px-3 py-1 text-body-xs font-semibold text-green-200">
                  Maintenance Priority
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-4 animate-fade-in-up delay-300">
                <TrackedButton
                  href="/contact?intent=demo"
                  size="large"
                  eventName="cta_demo_click"
                  eventParams={{ location: 'home_hero_primary' }}
                  className="w-full sm:w-auto sm:min-w-[24rem] sm:whitespace-nowrap"
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={SITE_CONFIG.appUrl}
                  size="large"
                  eventName="cta_upload_sample_click"
                  eventParams={{ location: 'home_hero_secondary' }}
                  className="border-slate-600/60 bg-slate-950/20 text-slate-200/90 hover:bg-slate-900/55 hover:text-white"
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
              <p className="text-body-sm text-slate-400">
                No new sensors. No on-site installation. Start with existing BAS exports.
              </p>
              <p className="text-body-sm text-slate-300 mt-2">
                Up to 30% savings is possible in buildings with significant undetected HVAC faults.*
              </p>
              <p className="text-body-xs text-slate-500 mt-2">
                Template format: timestamp column first, then one BAS point per remaining column.
              </p>
            </div>

            <div className="animate-fade-in-up delay-200">
              <Screenshot
                id="IMG-001"
                description="OnPoint dashboard showing prioritized fault list with energy impact and recommended actions"
                aspect="16:9"
                className="border border-slate-700/70 rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-slate-900/45 via-slate-900/30 to-slate-950 border-b border-slate-800/60">
        <div className="container-default">
          <div className="mb-12 rounded-2xl border border-slate-800/70 bg-slate-900/60 px-5 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-body-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Built for
              </p>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {HOME_BUILT_FOR_VERTICALS.map((vertical) => (
                  <Link
                    key={vertical.href}
                    href={vertical.href}
                    className="badge-slate px-4 py-2 transition-colors hover:border-cyan-400/45 hover:bg-slate-700/80 hover:text-white"
                  >
                    {vertical.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {HOME_PROOF_METRICS.map((metric, index) => (
              <Card
                key={metric.label}
                className={`text-center bg-slate-900/75 ${METRIC_ACCENTS[index]?.card ?? ''}`}
              >
                <p className={`text-display-sm font-display font-semibold mb-2 ${METRIC_ACCENTS[index]?.value ?? 'text-cyan-400'}`}>
                  {metric.value}
                </p>
                <p className="text-body-sm text-slate-300">{metric.label}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-center text-body-xs text-slate-400">
            {ENERGY_DISCLAIMER}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {HOME_TRUST_SIGNALS.map((signal) => (
              <span key={signal} className="badge-slate px-4 py-2">
                {signal}
              </span>
            ))}
          </div>
          <p className="mt-4 text-center text-body-xs text-slate-500">
            Results are based on prior customer analyses; outcomes vary by building conditions and correction execution.
          </p>
        </div>
      </section>

      <section className="section bg-slate-900/20 border-y border-slate-800/60">
        <div className="container-default">
          <div className="text-center mb-12">
            <Badge className="mb-6">How It Works</Badge>
            <h2 className="heading-2 text-white mb-4">From BAS Export to Action Plan in 3 Steps</h2>
            <p className="body-large max-w-2xl mx-auto">
              Upload your existing BAS trends, let LeanFM review the data, and walk away with a ranked
              action plan your team can execute.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <Card key={step.number} hover className={`h-full ${STEP_CARD_ACCENTS[index] ?? ''}`}>
                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-display font-semibold mb-5 ${STEP_BADGE_ACCENTS[index] ?? STEP_BADGE_ACCENTS[0]}`}>
                  {step.number}
                </span>
                <CardTitle className="mb-3">{step.title}</CardTitle>
                <CardDescription className="mb-4">{step.description}</CardDescription>
                <span className={`text-body-xs ${STEP_LABEL_ACCENTS[index] ?? STEP_LABEL_ACCENTS[0]}`}>
                  {step.stepLabel}
                </span>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <Screenshot
              id="IMG-002"
              description="CSV upload interface with drag-and-drop zone showing simple upload process"
              aspect="16:9"
              objectPosition="top"
              className="border border-slate-700/70 rounded-2xl"
            />
            <Screenshot
              id="IMG-004"
              description="Results dashboard showing prioritized fault list ranked by energy impact"
              aspect="16:9"
              objectPosition="left"
              className="border border-slate-700/70 rounded-2xl"
            />
          </div>

          <div className="mt-8 text-center">
            <TrackedButton
              variant="secondary"
              href={SITE_CONFIG.appUrl}
              eventName="cta_upload_sample_click"
              eventParams={{ location: 'home_how_it_works_secondary' }}
            >
              {CTA_LABELS.secondary}
            </TrackedButton>
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-slate-900/35 to-slate-900/20">
        <div className="container-default">
          <div className="text-center mb-12">
            <Badge className="mb-6">Capabilities</Badge>
            <h2 className="heading-2 text-white mb-4">Built for Facility Teams That Need Fast Decisions</h2>
            <p className="body-large max-w-2xl mx-auto">
              One platform for finding hidden faults, deciding what to fix first, and sharing progress with stakeholders.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div className="grid md:grid-cols-2 gap-5">
              {HOME_CAPABILITIES.map((capability, index) => (
                <Card key={capability.title} hover className="h-full p-5 md:p-6">
                  <div className={`w-2 h-2 rounded-full mb-3 ${CAPABILITY_DOT_ACCENTS[index % CAPABILITY_DOT_ACCENTS.length]}`} />
                  <CardTitle className="mb-2 text-2xl md:text-3xl leading-tight">{capability.title}</CardTitle>
                  <CardDescription className="text-body-sm text-slate-400 leading-relaxed">{capability.description}</CardDescription>
                </Card>
              ))}
            </div>

            <Card className="h-full">
              <Screenshot
                id="IMG-005"
                description="Fault detail view showing energy impact, severity, and step-by-step recommended actions"
                aspect="16:9"
                className="mb-5 border border-slate-700/70 rounded-xl"
              />
              <h3 className="heading-4 text-white mb-4">Get Clear Fault Data</h3>
              <ul className="space-y-3 text-body-sm text-slate-300 mb-6">
                <li>Faults are ranked by estimated impact, not noise.</li>
                <li>Each finding includes plain-language corrective guidance.</li>
                <li>Results can be exported and shared across teams quickly.</li>
              </ul>
              <TrackedButton
                href="/contact?intent=demo"
                eventName="cta_demo_click"
                eventParams={{ location: 'home_capabilities_primary' }}
              >
                {CTA_LABELS.primary}
              </TrackedButton>
            </Card>
          </div>
        </div>
      </section>

      <section className="section relative overflow-hidden bg-[linear-gradient(180deg,rgba(20,34,50,0.32)_0%,rgba(7,13,20,0.7)_100%)] border-y border-slate-800/60">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
        <div aria-hidden="true" className="absolute left-1/2 top-14 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="container-default">
          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <Badge className="mb-6">Impact</Badge>
              <h2 className="heading-2 text-white mb-4">One fault list. Three business outcomes.</h2>
              <p className="body-large">
                OnPoint turns BAS trend data into an impact-ranked action plan your team can use
                to defend budgets, protect buildings, and support emissions goals.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-slate-950/55 p-5 shadow-[0_24px_80px_rgba(2,6,23,0.32)]">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">Input</p>
                  <p className="mt-2 font-display text-body-lg font-semibold text-white">BAS trends</p>
                </div>
                <div>
                  <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">Ranked by</p>
                  <p className="mt-2 font-display text-body-lg font-semibold text-white">Likely impact</p>
                </div>
                <div>
                  <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">Output</p>
                  <p className="mt-2 font-display text-body-lg font-semibold text-white">Fix what matters</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10 rounded-2xl border border-slate-700/70 bg-slate-950/60 p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {IMPACT_DASHBOARD_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className={`rounded-xl border bg-gradient-to-br p-5 ${item.accent}`}
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-body-xs font-semibold uppercase tracking-[0.18em] text-current">
                      {item.label}
                    </span>
                    <span className={`h-2.5 w-2.5 rounded-full ${item.marker}`} />
                  </div>
                  <p className="font-display text-2xl font-semibold leading-tight text-white">
                    {item.value}
                  </p>
                  <p className="mt-3 text-body-sm leading-relaxed text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.85fr]">
              <div className="rounded-xl border border-slate-800 bg-slate-900/55 p-5">
                <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  How the ranking changes the conversation
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {['Show the cost', 'Assign the fix', 'Track the outcome'].map((label, index) => (
                    <div key={label} className="flex items-center gap-3 text-body-sm text-slate-300">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-950 font-display text-body-xs text-white">
                        {index + 1}
                      </span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-5">
                <p className="font-display text-body-lg font-semibold text-white">
                  Building performance is climate work.
                </p>
                <p className="mt-3 text-body-sm leading-relaxed text-slate-400">
                  <a
                    href="https://www.architecture2030.org/why-the-built-environment/why-buildings/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
                  >
                    Architecture 2030
                  </a>{' '}
                  reports the built environment is responsible for over 35% of annual global CO2
                  emissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-slate-900/15">
        <div className="container-narrow">
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/35 p-6 md:p-8">
            <div className="text-center mb-10">
              <h2 className="heading-2 text-white mb-4">Common questions</h2>
              <p className="body-default">
                Answers on savings, process, data requirements, and security.
              </p>
            </div>

            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      <StickyCtaBar heroId="home-hero" />
    </>
  )
}
