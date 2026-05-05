import { BellOff, Building2, ClipboardCheck } from 'lucide-react'
import { SectionReveal, K12Container } from './SectionReveal'

const painCards = [
  {
    icon: Building2,
    title: 'Aging buildings, shrinking budgets',
    body: 'The average U.S. school building is 49 years old. Deferred maintenance keeps growing. Utility rates keep climbing.',
  },
  {
    icon: BellOff,
    title: 'BAS alarms miss what matters',
    body: 'Simultaneous heating and cooling, sensor drift, stuck dampers, and sequence faults can persist without a clear alarm.',
  },
  {
    icon: ClipboardCheck,
    title: 'Boards want answers, not jargon',
    body: 'Your superintendent and board need numbers they can defend. "We optimized HVAC sequences" is abstract. "$340K in identified waste" is concrete.',
  },
] as const

export function PainStrip() {
  return (
    <SectionReveal className="bg-brand-surfaceAlt">
      <K12Container>
        <p className="mx-auto max-w-4xl text-center text-xl leading-9 text-brand-ink">
          If you&apos;re running facilities for a K-12 district, you already know the pressure. Utilities are one of the largest operating costs after labor. Buildings are aging. BAS alarms catch urgent failures, but they often miss the hidden faults that quietly waste energy, comfort, and staff time.
        </p>
        <div className="mt-12 grid gap-0 overflow-hidden rounded-xl border border-brand-border bg-white md:grid-cols-3">
          {painCards.map((card) => {
            const Icon = card.icon

            return (
              <div
                key={card.title}
                className="border-b border-brand-border p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <Icon className="size-7 text-brand-primary" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-brand-ink">
                  {card.title}
                </h3>
                <p className="mt-3 leading-7 text-brand-muted">{card.body}</p>
              </div>
            )
          })}
        </div>
      </K12Container>
    </SectionReveal>
  )
}
