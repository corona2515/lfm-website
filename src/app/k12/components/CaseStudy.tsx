import { Quote } from 'lucide-react'
import { SectionReveal, K12Container } from './SectionReveal'

const stats = [
  { value: '$340K', label: 'Estimated annual avoidable waste identified' },
  { value: '9 buildings', label: 'Added to the program after the pilot' },
  { value: '0 sensors', label: 'Installed during the pilot' },
] as const

export function CaseStudy() {
  return (
    <SectionReveal className="bg-brand-primary text-white">
      {/* TODO: replace with named customer when available */}
      <K12Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-2xl bg-white/10 p-8 ring-1 ring-white/15">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              Pilot result · Suburban district · 14 schools · ~1.1M sqft
            </p>
            <Quote className="mt-8 size-9 text-brand-accent" aria-hidden="true" />
            <blockquote className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.01em] md:text-4xl">
              &quot;OnPoint identified $340,000 of estimated annual avoidable waste in our first three audited buildings. We&apos;d been told for years that our BAS was &apos;fine.&apos; The data showed otherwise.&quot;
            </blockquote>
            <p className="mt-6 text-white/75">
              Director of Facilities &amp; Operations, Suburban K-12 District
            </p>
          </div>
          <div className="grid gap-4">
            {stats.map((stat) => (
              <div key={stat.value} className="rounded-xl bg-white p-6 text-brand-ink shadow-sm">
                <p className="font-mono text-4xl font-bold tabular-nums text-brand-accent">{stat.value}</p>
                <p className="mt-2 leading-6 text-brand-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-sm text-white/70">
          Anonymized pilot outcome shared with customer permission. Individual results vary by building condition, data quality, and implementation.
        </p>
      </K12Container>
    </SectionReveal>
  )
}
