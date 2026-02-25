import { Metadata } from 'next'
import { Badge, Card, CardTitle, CardDescription, Accordion } from '@/components/ui'
import { Screenshot } from '@/components/MediaPlaceholder'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import {
  SITE_CONFIG,
  PROCESS_STEPS,
  FAQ_ITEMS,
  CTA_LABELS,
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
      url: `${SITE_CONFIG.url}/contact?intent=trial`,
      price: '0',
      priceCurrency: 'USD',
      description: 'Start with lead-form onboarding or sample BAS data upload.',
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

      <section className="relative overflow-hidden border-b border-slate-800/60">
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
              <Badge className="mb-6 animate-fade-in">For Facilities and Energy Teams</Badge>
              <h1 className="heading-1 text-white mb-6 animate-fade-in-up">
                Stop Paying for Invisible HVAC Waste
              </h1>
              <p className="body-large mb-3 animate-fade-in-up delay-100">
                AI-powered fault detection for commercial buildings.
              </p>
              <p className="body-default mb-8 animate-fade-in-up delay-100">
                Our OnPoint software uses our patented Prescriptiv AI technology to analyse your BAS
                trend data, rank issues by likely impact, and give your team clear actions to reduce
                avoidable energy spend.
              </p>
              <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up delay-200">
                <span className="inline-flex items-center rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-body-xs font-semibold text-blue-200">
                  Comfort Risks
                </span>
                <span className="inline-flex items-center rounded-full border border-red-400/40 bg-red-500/10 px-3 py-1 text-body-xs font-semibold text-red-200">
                  Fault Alerts
                </span>
                <span className="inline-flex items-center rounded-full border border-green-400/40 bg-green-500/10 px-3 py-1 text-body-xs font-semibold text-green-200">
                  Savings Opportunities
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-4 animate-fade-in-up delay-300">
                <TrackedButton
                  href="/contact?intent=trial"
                  size="large"
                  eventName="hero_cta_click"
                  eventParams={{ location: 'home_hero_primary_lead_form' }}
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={SITE_CONFIG.appUrl}
                  size="large"
                  eventName="hero_cta_click"
                  eventParams={{ location: 'home_hero_secondary_create_account' }}
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
              <p className="text-body-sm text-slate-400">
                Start with a sample file. No hardware installation. No long-term contract required.
              </p>
              <p className="text-body-sm mt-2">
                <a
                  href="/templates/sample-bas-template.csv"
                  download
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                >
                  Download sample CSV template
                </a>
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

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {HOME_TRUST_SIGNALS.map((signal) => (
              <span key={signal} className="badge-slate px-4 py-2">
                {signal}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-900/20 border-y border-slate-800/60">
        <div className="container-default">
          <div className="text-center mb-12">
            <Badge className="mb-6">How It Works</Badge>
            <h2 className="heading-2 text-white mb-4">Your Building Already Has the Data. We Turn It Into Action.</h2>
            <p className="body-large max-w-2xl mx-auto">
              Using your existing building systems, we surface energy waste, comfort risks, and
              equipment issues — with clear next steps.
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
              className="border border-slate-700/70 rounded-2xl"
            />
            <Screenshot
              id="IMG-004"
              description="Results dashboard showing prioritized fault list ranked by energy impact"
              aspect="16:9"
              className="border border-slate-700/70 rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-slate-900/35 to-slate-900/20">
        <div className="container-default">
          <div className="text-center mb-12">
            <Badge className="mb-6">Capabilities</Badge>
            <h2 className="heading-2 text-white mb-4">Everything your team needs to move faster</h2>
            <p className="body-large max-w-2xl mx-auto">
              One platform for finding hidden faults, deciding what to fix first, and sharing progress with stakeholders.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div className="grid sm:grid-cols-2 gap-4">
              {HOME_CAPABILITIES.map((capability, index) => (
                <Card key={capability.title} hover className="h-full">
                  <div className={`w-2 h-2 rounded-full mb-4 ${CAPABILITY_DOT_ACCENTS[index % CAPABILITY_DOT_ACCENTS.length]}`} />
                  <CardTitle className="mb-3">{capability.title}</CardTitle>
                  <CardDescription>{capability.description}</CardDescription>
                </Card>
              ))}
            </div>

            <Card className="h-full">
              <h3 className="heading-4 text-white mb-4">What teams validate first</h3>
              <Screenshot
                id="IMG-005"
                description="Fault detail view showing energy impact, severity, and step-by-step recommended actions"
                aspect="16:9"
                className="mb-5 border border-slate-700/70 rounded-xl"
              />
              <ul className="space-y-3 text-body-sm text-slate-300 mb-6">
                <li>Faults are ranked by estimated impact, not noise.</li>
                <li>Each finding includes plain-language corrective guidance.</li>
                <li>Results can be exported and shared across teams quickly.</li>
              </ul>
              <TrackedButton
                href="/contact?intent=trial"
                eventName="section_cta_click"
                eventParams={{ location: 'home_capabilities_primary_lead_form' }}
              >
                {CTA_LABELS.primary}
              </TrackedButton>
            </Card>
          </div>
        </div>
      </section>

      <section className="section bg-slate-900/15">
        <div className="container-narrow">
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/35 p-6 md:p-8">
            <div className="text-center mb-10">
              <h2 className="heading-2 text-white mb-4">Common questions</h2>
              <p className="body-default">
                Clear answers on onboarding, security, and expected results.
              </p>
            </div>

            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

    </>
  )
}
