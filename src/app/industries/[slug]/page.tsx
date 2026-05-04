import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge, Card } from '@/components/ui'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { IndustryPageViewTracker } from '@/components/analytics/IndustryPageViewTracker'
import { Screenshot } from '@/components/MediaPlaceholder'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import { CTA_LABELS, ENERGY_DISCLAIMER, SITE_CONFIG } from '@/lib/constants'
import {
  getIndustryDemoHref,
  getIndustryPage,
  INDUSTRY_PAGES,
  INDUSTRY_PRIMARY_CTA,
  INDUSTRY_SLUGS,
  type IndustrySlug,
} from '@/lib/industry-pages'

interface IndustryPageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: IndustryPageProps): Metadata {
  const page = getIndustryPage(params.slug)

  if (!page) {
    return {}
  }

  const path = `/industries/${page.slug}`

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${page.title} | LeanFM Technologies`,
      description: page.description,
      url: `${SITE_CONFIG.url}${path}`,
      images: [
        {
          url: '/og-image.png',
          width: 1000,
          height: 667,
          alt: `${page.label} HVAC fault detection with OnPoint`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | LeanFM Technologies`,
      description: page.description,
      images: ['/og-image.png'],
    },
  }
}

export default function IndustryPage({ params }: IndustryPageProps) {
  const page = getIndustryPage(params.slug)

  if (!page) {
    notFound()
  }

  const demoHref = getIndustryDemoHref(page)
  const relatedIndustries = INDUSTRY_SLUGS
    .filter((slug) => slug !== page.slug)
    .map((slug) => INDUSTRY_PAGES[slug as IndustrySlug])

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: `${SITE_CONFIG.url}/industries/${page.slug}`,
    isPartOf: SITE_CONFIG.url,
  }

  return (
    <>
      <IndustryPageViewTracker industry={page.analyticsKey} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <section id="industry-hero" className="relative overflow-hidden border-b border-slate-800/60">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(144,204,124,0.18),transparent_32%),radial-gradient(circle_at_18%_78%,rgba(56,189,248,0.12),transparent_28%),linear-gradient(180deg,rgba(14,24,36,0.99)_0%,rgba(7,13,20,0.98)_100%)]"
        />

        <div className="container-wide relative z-10 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
            <div className="max-w-2xl">
              <Badge className="mb-6">{page.label}</Badge>
              <h1 className="mb-6 max-w-3xl font-body text-[3rem] font-semibold leading-[1.03] tracking-[-0.005em] text-white md:text-[4.1rem]">
                {page.hero.headline}
              </h1>
              <p className="body-large mb-4 max-w-2xl">
                {page.hero.body}
              </p>
              <p className="body-default mb-8 max-w-2xl">
                {page.hero.proof}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <TrackedButton
                  href={demoHref}
                  size="large"
                  eventName="cta_demo_click"
                  eventParams={{ location: `${page.analyticsKey}_hero_primary` }}
                >
                  {INDUSTRY_PRIMARY_CTA}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href="/start"
                  size="large"
                  eventName="cta_upload_sample_click"
                  eventParams={{ location: `${page.analyticsKey}_hero_secondary` }}
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/70 bg-slate-950/55 p-3 shadow-[0_28px_90px_rgba(2,6,23,0.45)]">
              <Screenshot
                id="IMG-004"
                description={`OnPoint dashboard ranking HVAC faults for ${page.label} buildings`}
                aspect="16:9"
                objectPosition="left"
                className="rounded-xl border border-slate-700/70"
              />
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {['BAS export', 'Hidden signals', 'Ranked fixes'].map((step, index) => (
                  <div key={step} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-body-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                      0{index + 1}
                    </p>
                    <p className="mt-2 text-body-sm text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-slate-950">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Badge className="mb-6">Why it matters</Badge>
              <h2 className="heading-2 mb-4 text-white">
                BAS alarms are not the same as a fix list.
              </h2>
              <p className="body-large">
                OnPoint helps {page.label} teams move from scattered trend data to evidence-backed
                HVAC priorities without starting with new sensors or a major integration project.
              </p>
            </div>

            <div className="grid gap-3">
              {page.painPoints.map((point) => (
                <div key={point} className="rounded-xl border border-slate-800 bg-slate-900/75 px-5 py-4">
                  <span className="mr-3 inline-block h-2.5 w-2.5 rounded-full bg-cyan-400 align-middle" />
                  <span className="align-middle text-body-md text-slate-200">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section relative overflow-hidden border-b border-slate-800/60 bg-[linear-gradient(180deg,rgba(20,34,50,0.34)_0%,rgba(7,13,20,0.78)_100%)]">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
        <div className="container-default relative z-10">
          <div className="mb-10 max-w-3xl">
            <Badge className="mb-6">What OnPoint finds</Badge>
            <h2 className="heading-2 mb-4 text-white">
              Hidden HVAC behavior, translated into action.
            </h2>
            <p className="body-large">
              The workflow stays simple: export BAS trends, let OnPoint surface fault signals, then
              review the highest-impact fixes first.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <Card className="border border-slate-700/70 bg-slate-950/65">
              <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Workflow
              </p>
              <div className="mt-6 space-y-4">
                {['Existing BAS export', 'Fault detection pass', 'Impact-ranked action list'].map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-xl border border-slate-800 bg-slate-900/75 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/35 bg-cyan-400/10 text-body-sm font-semibold text-cyan-200">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-display text-body-lg font-semibold text-white">{item}</p>
                      <p className="mt-1 text-body-sm text-slate-400">
                        {index === 0
                          ? 'No rip-and-replace or site install required.'
                          : index === 1
                            ? 'Look for behavior that basic alarm screens miss.'
                            : 'Focus the team on what is most worth investigating.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              {page.findings.map((finding) => (
                <div key={finding} className="rounded-xl border border-slate-800 bg-slate-900/75 p-5">
                  <div className="mb-5 h-1.5 w-14 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400" />
                  <p className="font-display text-xl font-semibold text-white">{finding}</p>
                  <p className="mt-3 text-body-sm leading-relaxed text-slate-400">
                    Flag patterns that can affect energy use, comfort, reliability, or operating
                    attention.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-slate-950">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <Badge className="mb-6">Outcomes</Badge>
            <h2 className="heading-2 mb-4 text-white">
              A clearer priority list for {page.label} buildings.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {page.outcomes.map((outcome) => (
              <Card key={outcome.title} className="border-t-2 border-t-cyan-400/70 bg-slate-900/75">
                <h3 className="font-display text-2xl font-semibold leading-tight text-white">
                  {outcome.title}
                </h3>
                <p className="mt-4 text-body-sm leading-relaxed text-slate-400">
                  {outcome.description}
                </p>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-body-xs text-slate-500">{ENERGY_DISCLAIMER}</p>
        </div>
      </section>

      <section className="section border-b border-slate-800/60 bg-slate-900/25">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div>
              <Badge className="mb-6">Industries</Badge>
              <h2 className="heading-2 mb-4 text-white">
                Built for buildings where HVAC performance matters.
              </h2>
              <p className="body-large">
                Explore other ways OnPoint turns BAS evidence into ranked HVAC action.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {relatedIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="badge-slate px-4 py-2 transition-colors hover:border-cyan-400/45 hover:bg-slate-700/80 hover:text-white"
                >
                  {industry.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-large border-b border-slate-800/60 bg-slate-950">
        <div className="container-narrow">
          <div className="rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900/95 to-slate-900/75 p-8 text-center shadow-card md:p-12">
            <h2 className="heading-2 mb-4 text-white">
              See what your {page.label} BAS data is hiding.
            </h2>
            <p className="body-large mb-8">
              Start with existing exports. OnPoint will rank the hidden HVAC faults most worth your
              team&apos;s attention.
            </p>
            <TrackedButton
              href={demoHref}
              size="large"
              eventName="cta_demo_click"
              eventParams={{ location: `${page.analyticsKey}_final_primary` }}
            >
              {INDUSTRY_PRIMARY_CTA}
            </TrackedButton>
          </div>
        </div>
      </section>

      <StickyCtaBar
        heroId="industry-hero"
        href={demoHref}
        location={`${page.analyticsKey}_sticky_primary`}
        message={`See what your ${page.label} BAS data is hiding.`}
      />
    </>
  )
}
