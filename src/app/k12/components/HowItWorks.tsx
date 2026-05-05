import { ClipboardList, Download, Microscope } from 'lucide-react'
import { K12Card, K12CardContent } from '@/components/ui/k12-card'
import { SectionReveal, K12Container } from './SectionReveal'

const steps = [
  {
    number: '01',
    icon: Download,
    title: 'Export your BAS trend data',
    body: 'Your team exports a CSV of existing BAS points. No sensors, no new hardware, no site visits.',
    badge: 'Takes <30 minutes',
  },
  {
    number: '02',
    icon: Microscope,
    title: 'We analyze and rank every fault',
    body: 'The LeanFM team reviews the data, validates findings, and ranks each issue by estimated dollar impact.',
    badge: '<24 hours to first findings',
  },
  {
    number: '03',
    icon: ClipboardList,
    title: 'Walk through the ranked action list',
    body: 'Your team gets a quick walkthrough with plain-language explanations, dollar impact, technician-ready work orders, and a board-ready executive summary.',
    badge: 'Pilot complete in 30 days',
  },
] as const

export function HowItWorks() {
  return (
    <SectionReveal className="bg-brand-surfaceAlt">
      <K12Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.01em] text-brand-ink md:text-5xl">
            From BAS export to action plan in 30 days. Zero classroom disruption.
          </h2>
          <p className="mt-5 text-lg leading-8 text-brand-muted">
            Your team exports BAS trend data. We do the analysis. Your facilities team gets a ranked action list. Nobody touches a building during instructional hours.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <K12Card key={step.number} className="h-full">
                <K12CardContent className="flex h-full flex-col gap-5 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-sm font-bold text-brand-accent">{step.number}</span>
                    <Icon className="size-7 text-brand-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.01em] text-brand-ink">{step.title}</h3>
                    <p className="mt-3 leading-7 text-brand-muted">{step.body}</p>
                  </div>
                  <span className="mt-auto inline-flex w-fit rounded-full bg-brand-primary/10 px-3 py-1 text-sm font-semibold text-brand-primary">
                    {step.badge}
                  </span>
                </K12CardContent>
              </K12Card>
            )
          })}
        </div>
      </K12Container>
    </SectionReveal>
  )
}
