import { Metadata } from 'next'
import { BadgeCheck, CheckCircle2, GraduationCap, TrendingDown, TrendingUp } from 'lucide-react'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { StickyCtaBar } from '@/components/home/StickyCtaBar'
import { HeroParallaxGlow } from '@/components/visual/HeroParallaxGlow'
import {
  BasVsLeanFMComparison,
  CaseStudyProofBand,
  DataToActionFlow,
  DiagnosticInsightCard,
  FinalCTASection,
  IssuePatternCard,
  VerticalPhotoCard,
} from '@/components/visual/LeanFmVisuals'
import { CTA_LABELS, SITE_CONFIG } from '@/lib/constants'

const SAMPLE_ANALYSIS_HREF = '/contact?intent=sample-analysis&source=home_sample_analysis'

export const metadata: Metadata = {
  title: 'LeanFM Technologies | Find Hidden Building System Problems',
  description:
    'LeanFM analyzes existing building system data to uncover hidden problems that waste energy, drive up costs, and create comfort issues.',
}

const heroBullets = [
  'No new hardware required',
  'Uses existing HVAC trend data',
  'Finds problems that may not trigger alarms',
  'Produces clear, prioritized findings',
]

const proofItems = [
  {
    title: 'Up to 30% of energy spend wasted',
    body: 'Hidden HVAC faults that BAS alarms miss can quietly drain up to 30% of building energy spend.',
    Icon: TrendingDown,
  },
  {
    title: '3–5x ROI in energy savings',
    body: 'Backed by our money-back guarantee.',
    Icon: BadgeCheck,
  },
  {
    title: 'Developed at Carnegie Mellon',
    body: 'LeanFM’s methodology was developed from research at Carnegie Mellon University.',
    Icon: GraduationCap,
  },
  {
    title: '$101,383 saved in year two',
    body: 'Documented at a local museum where LeanFM identified BAS logic faults hiding in existing data.',
    Icon: TrendingUp,
  },
]

const issuePreview = [
  {
    title: 'Heating and cooling at the same time',
    looksLike: 'Blue cooling and orange heating behavior overlap during occupied periods.',
    missed: 'Each loop may appear normal while the combined behavior wastes energy.',
    cost: 'Energy waste, comfort instability, and unnecessary equipment wear.',
    surfaces: 'LeanFM highlights the zones and times where the conflict appears in trend data.',
    impacts: ['Energy waste', 'Comfort instability', 'Equipment wear'],
    visual: 'conflict' as const,
  },
  {
    title: 'Equipment running longer than needed',
    looksLike: 'Actual runtime extends beyond the occupied schedule or expected building use.',
    missed: 'Overrides and schedules can drift without creating an alarm condition.',
    cost: 'Higher utility costs, avoidable runtime, and premature wear.',
    surfaces: 'LeanFM compares runtime patterns against schedules and building context.',
    impacts: ['Utility cost', 'Unnecessary runtime', 'Wear'],
    visual: 'runtime' as const,
  },
  {
    title: 'Sensors causing bad decisions',
    looksLike: 'Reported sensor values drift away from actual operating conditions.',
    missed: 'A sensor can be wrong enough to affect control without crossing a threshold.',
    cost: 'Bad control decisions, comfort complaints, and misdiagnosed problems.',
    surfaces: 'LeanFM flags sensor behavior that may be driving the wrong response.',
    impacts: ['Bad control decisions', 'Comfort complaints', 'Misdiagnosis'],
    visual: 'sensor' as const,
  },
  {
    title: 'Control logic faults',
    looksLike: 'The BAS follows a sequence that no longer matches building operation.',
    missed: 'The system may be doing exactly what it was configured to do, even when the logic is wrong.',
    cost: 'Recurring issues, hidden waste, and unstable operation.',
    surfaces: 'LeanFM identifies control patterns worth review by facilities or controls teams.',
    impacts: ['Recurring issues', 'Hidden waste', 'Unstable operation'],
    visual: 'logic' as const,
  },
]

const verticals = [
  {
    title: 'K-12 Schools',
    pain: 'Find hidden HVAC issues driving complaints, budget pressure, and maintenance strain across district buildings.',
    href: '/solutions/k-12-schools',
    photoLabel: 'K-12 school building exterior or classroom hallway',
    photoSrc: '/media/leanfm-images/k12-hvac-inspection.jpg',
    photoAlt: 'Facilities technician inspecting HVAC equipment at a building',
    imageClassName: 'object-[58%_50%]',
  },
  {
    title: 'Museums',
    pain: 'Protect sensitive environments by finding subtle system drift and hidden control issues.',
    href: '/solutions/museums',
    photoLabel: 'Museum gallery or environmental control area',
    photoSrc: '/media/leanfm-images/museum-building-ivy.jpg',
    photoAlt: 'Institutional museum building exterior with ivy',
    imageClassName: 'object-[48%_45%]',
  },
  {
    title: 'Universities',
    pain: 'Bring clarity to complex campus systems, schedules, and building portfolios.',
    href: '/solutions/universities',
    photoLabel: 'University campus building or central plant',
    photoSrc: '/media/leanfm-images/university-students-library.jpg',
    photoAlt: 'Students walking in front of a university building',
    imageClassName: 'object-[45%_50%]',
  },
  {
    title: 'Commercial Real Estate',
    pain: 'Identify hidden HVAC waste affecting operating costs, tenant comfort, and asset performance.',
    href: '/solutions/commercial-real-estate',
    photoLabel: 'Commercial office building exterior, lobby, or mechanical space',
    photoSrc: '/media/leanfm-images/commercial-office-exterior.jpg',
    photoAlt: 'People walking outside a commercial office building',
    imageClassName: 'object-[52%_50%]',
  },
]

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LeanFM Technologies',
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.contactEmail,
    areaServed: 'US',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section id="home-hero" className="relative overflow-hidden border-b border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_48%,#f4fbef_100%)]">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-35" />
        <HeroParallaxGlow />
        <div className="container-wide relative z-10 pt-24 pb-14 md:pt-36 md:pb-20">
          <div className="grid min-w-0 max-w-full items-center gap-10 overflow-hidden lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:overflow-visible">
            <div className="w-full min-w-0 max-w-[22rem] sm:max-w-2xl md:max-w-3xl">
              <h1 className="mb-6 max-w-[20rem] break-words font-body text-[1.95rem] font-semibold leading-[1.04] tracking-normal text-slate-950 sm:max-w-[12ch] sm:text-[3.2rem] sm:leading-[0.98] md:text-[4.2rem] lg:text-[4.85rem]">
                {`Buildings don't fail loudly. They leak quietly.`}
              </h1>
              <p className="body-large mb-7 max-w-[22rem] text-slate-700 sm:max-w-2xl">
                LeanFM analyzes existing HVAC trend data to find the hidden faults your BAS alarms aren’t catching — and ranks them so your team knows exactly what to fix first.
              </p>
              <ul className="mb-8 grid gap-3 sm:grid-cols-2">
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
                  eventParams={{ location: 'home_hero_primary' }}
                  className="w-full min-w-0 sm:w-auto"
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href="#how-it-works"
                  size="large"
                  eventName="cta_how_it_works_click"
                  eventParams={{ location: 'home_hero_secondary' }}
                  className="w-full min-w-0 border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
                >
                  See How It Works
                </TrackedButton>
              </div>
              <p className="mt-4 text-body-sm text-slate-600">
                Trusted by a Pittsburgh-area cultural institution. <a href="/results" className="font-semibold text-sky-700 underline-offset-4 hover:text-emerald-700 hover:underline">See the case study →</a>
              </p>
            </div>

            <div className="relative w-full min-w-0 max-w-[22rem] sm:max-w-none">
              <div className="absolute -inset-6 rounded-[2rem] bg-sky-300/20 blur-3xl" aria-hidden="true" />
              <DiagnosticInsightCard variant="light" className="relative max-w-[22rem] sm:max-w-none" />
              <div className="pointer-events-none mt-4 flex flex-wrap gap-2">
                {['Runtime', 'Setpoints', 'Schedules', 'Sensors', 'Alarms', 'Temperatures'].map((chip) => (
                  <span key={chip} className="rounded-full border border-sky-100 bg-white px-3 py-1 text-body-xs text-slate-600 shadow-sm">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef3f8_100%)]">
        <div className="container-wide py-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofItems.map((item) => {
              const Icon = item.Icon

              return (
                <div
                  key={item.title}
                  className={
                    'group relative w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.07)]'
                  }
                >
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(144,204,124,0.75),rgba(34,211,238,0.55))]" />
                  <div className="relative grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 max-w-[calc(100vw-7rem)] sm:max-w-full">
                      <p className="break-words text-body-md font-semibold text-slate-950">
                        {item.title}
                      </p>
                      <p className="mt-2 break-words text-body-sm leading-relaxed text-slate-600">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-large relative overflow-hidden border-b border-sky-100 bg-white">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-15" />
        <div className="container-default relative z-10">
          <div className="mb-10 max-w-3xl">
            <h2 className="heading-2 mb-4 text-slate-950">Why your building automation system may miss hidden HVAC waste.</h2>
            <p className="body-large text-slate-700">
              BAS alarms flag obvious failures or out-of-range conditions. Many costly HVAC issues do not look like alarms. They show up as patterns over time.
            </p>
          </div>
          <BasVsLeanFMComparison variant="light" />
        </div>
      </section>

      <section id="how-it-works" className="section-large scroll-mt-24 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_58%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <h2 className="heading-2 mb-4 text-slate-950">From building data to clear action.</h2>
            <p className="text-body-lg leading-relaxed text-slate-600">
              LeanFM does not start with new hardware. It starts with the system data your building already produces.
            </p>
          </div>
          <DataToActionFlow variant="light" />
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-default">
          <div className="mb-10 max-w-3xl">
            <h2 className="heading-2 mb-4 text-slate-950">The platform behind the findings</h2>
            <p className="text-body-lg leading-relaxed text-slate-600">
              LeanFM delivers findings through <strong>OnPoint</strong>, our software platform, powered by the <em>Prescriptiv</em> analytics engine developed from research at Carnegie Mellon University. Your team reviews prioritized issues in plain English — no new hardware, no dashboards to decipher.
            </p>
          </div>
        </div>
      </section>

      <section className="section-large border-y border-sky-100 bg-slate-50">
        <div className="container-default">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-5 text-body-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                What we are
              </p>
              <h2 className="heading-2 mb-5 text-slate-950">Software-delivered analysis of the data you already have.</h2>
              <p className="body-large text-slate-700">
                Developed at Carnegie Mellon. Tested in real institutional buildings. Backed by a money-back ROI guarantee.
              </p>
            </div>
            <div>
              <p className="mb-5 text-body-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                What we are not
              </p>
              <ul className="grid gap-3">
                {[
                  'Not a BAS replacement',
                  'Not an energy audit',
                  'Not enterprise AFDD with the install cost stripped out',
                  'Not generic AI for buildings',
                ].map((item) => (
                  <li key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                    <span className="text-body-md font-medium text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-large bg-white">
        <div className="container-wide">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="heading-2 mb-4 text-slate-950">What LeanFM finds</h2>
              <p className="text-body-lg leading-relaxed text-slate-600">
                The issues are technical underneath, but the operating impact is easy to recognize: waste, comfort risk, wear, and unclear priorities.
              </p>
            </div>
            <TrackedButton
              href="/what-we-find"
              variant="secondary"
              eventName="cta_what_we_find_click"
              eventParams={{ location: 'home_issue_preview' }}
            >
              See What We Find
            </TrackedButton>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {issuePreview.map((issue) => (
              <IssuePatternCard key={issue.title} issue={issue} variant="light" />
            ))}
          </div>
        </div>
      </section>

      <CaseStudyProofBand variant="light" />

      <section className="section-large bg-slate-50">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <h2 className="heading-2 mb-4 text-slate-950">Built for complex buildings</h2>
            <p className="text-body-lg leading-relaxed text-slate-600">
              LeanFM is built for teams managing real facilities, complex schedules, comfort expectations, and operating budgets.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {verticals.map((vertical) => (
              <VerticalPhotoCard key={vertical.href} {...vertical} variant="light" />
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection
        headline="Find out what your HVAC trend data is already showing."
        body="Request a Sample Analysis and LeanFM will help determine whether your existing building data contains hidden issues worth attention."
        primaryHref={SAMPLE_ANALYSIS_HREF}
        primaryLocation="home_final_primary"
        secondaryLocation="home_final_secondary"
        variant="light"
      />

      <StickyCtaBar
        heroId="home-hero"
        href={SAMPLE_ANALYSIS_HREF}
        message="Hidden HVAC faults can waste energy, money, comfort, and maintenance time before alarms catch them."
      />
    </>
  )
}
