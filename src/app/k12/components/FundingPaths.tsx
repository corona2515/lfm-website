'use client'

import { useEffect, useRef } from 'react'
import { Handshake, PiggyBank, Wind, Zap } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { K12Card, K12CardContent } from '@/components/ui/k12-card'
import { SectionReveal, K12Container } from './SectionReveal'

const cards = [
  {
    icon: Zap,
    title: 'Utility Rebates',
    body: 'Many regulated utilities offer prescriptive or custom rebates for HVAC sequence corrections, sensor replacements, and controls upgrades. We help map qualified findings to programs in your service territory.',
    tag: 'Territory-specific',
  },
  {
    icon: PiggyBank,
    title: 'Operating Budget Reallocation',
    body: 'The pilot can be scoped as a limited first engagement. Identified savings can help justify the next phase.',
    tag: 'Qualification required',
  },
  {
    icon: Handshake,
    title: 'Performance-Based Contracting',
    body: 'For qualified districts, we can discuss performance-based structures tied to verified year-one savings. Terms, caps, and eligibility are confirmed during qualification.',
    tag: 'Qualified districts',
  },
  {
    icon: Wind,
    title: 'Healthy Schools / IAQ Funds',
    body: 'Some districts can use deferred maintenance, energy, or IAQ funding for HVAC fault correction. We provide documentation that supports the use case when programs apply.',
    tag: 'State-specific',
  },
] as const

export function FundingPaths() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          trackEvent('k12_funding_card_view', { section: 'funding' })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <SectionReveal className="bg-brand-surfaceAlt">
      <K12Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.01em] text-brand-ink md:text-5xl">
            Four ways to fund this without a capital request.
          </h2>
          <p className="mt-5 text-lg leading-8 text-brand-muted">
            Many K-12 districts have access to one or more of these paths. We help identify which may apply and document the eligibility.
          </p>
        </div>
        <div ref={ref} className="mt-12 grid gap-5 md:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon

            return (
              <K12Card key={card.title}>
                <K12CardContent className="p-6">
                  <Icon className="size-8 text-brand-primary" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-brand-ink">{card.title}</h3>
                  <p className="mt-3 leading-7 text-brand-muted">{card.body}</p>
                  <span className="mt-5 inline-flex rounded-full bg-brand-accent/15 px-3 py-1 text-sm font-semibold text-brand-primary">
                    {card.tag}
                  </span>
                </K12CardContent>
              </K12Card>
            )
          })}
        </div>
        <p className="mt-6 text-center text-sm text-brand-muted">
          Funding eligibility is district-specific. We&apos;ll help you scope it on the qualification call.
        </p>
      </K12Container>
    </SectionReveal>
  )
}
