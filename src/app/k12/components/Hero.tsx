import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { K12Container } from './SectionReveal'
import { K12CtaLink } from './K12CtaLink'

const trustItems = [
  'Built for K-12 facilities teams',
  'Compatible with all major BAS',
  '30-day pilot with qualified fee waiver',
] as const

export function Hero() {
  return (
    <section id="hero" className="scroll-mt-24 bg-white py-16 md:py-24">
      <K12Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary">
              For K-12 Schools
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.02em] text-brand-ink md:text-6xl">
              Your district&apos;s BAS may be hiding the faults that drive hidden energy waste.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-brand-muted md:text-xl">
              OnPoint turns existing BAS trend exports into a ranked fix list for energy, comfort, and maintenance priorities, so your team can see which faults to investigate first. No new sensors. No instructional disruption. No capital project required to start.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <K12CtaLink
                href="#diagnostic-form"
                eventName="k12_hero_cta_click"
                eventParams={{ cta_label: 'See what your BAS data is hiding', cta_position: 'hero' }}
                className="w-full sm:w-auto"
              >
                See what your BAS data is hiding
              </K12CtaLink>
              <K12CtaLink
                href="#book-call"
                variant="secondary"
                eventName="k12_hero_secondary_click"
                eventParams={{ cta_position: 'hero' }}
                className="w-full sm:w-auto"
              >
                Request a walkthrough
              </K12CtaLink>
            </div>
            <ul className="mt-8 grid gap-3 text-sm text-brand-muted md:grid-cols-3">
              {trustItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-success" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-brand-muted">
              Results vary based on building type, existing conditions, data quality, and implementation of recommended actions.
            </p>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="rounded-2xl bg-brand-surfaceAlt p-3 shadow-xl shadow-brand-primary/15 ring-1 ring-brand-border">
              <Image
                src="/k12/hero-dashboard.png"
                alt="OnPoint fault report dashboard with highlighted annual waste findings of $28K, $19K, and $11K"
                width={960}
                height={720}
                priority
                className="h-auto max-h-[60vh] w-full rounded-xl object-contain"
              />
              {/* TODO: swap with final asset */}
            </div>
          </div>
        </div>
      </K12Container>
    </section>
  )
}
