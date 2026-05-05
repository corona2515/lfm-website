import Image from 'next/image'
import { BadgeDollarSign, FileBarChart, Leaf, Presentation, RefreshCw, Wrench } from 'lucide-react'
import { SectionReveal, K12Container } from './SectionReveal'

const deliverables = [
  { icon: FileBarChart, text: 'Impact-ranked fault report', detail: 'each validated fault, ranked by estimated annual dollar impact' },
  { icon: Wrench, text: 'Technician action playbook', detail: 'plain-English work orders your maintenance team can execute' },
  { icon: Presentation, text: 'Board-ready executive summary', detail: 'a superintendent-friendly slide deck with savings, comfort, and sustainability context' },
  { icon: Leaf, text: 'Carbon impact report', detail: 'lbs CO₂ avoided per year, ready for sustainability reporting' },
  { icon: BadgeDollarSign, text: 'Utility rebate eligibility map', detail: 'which findings may qualify for rebates, and which program may apply' },
  { icon: RefreshCw, text: 'Free 90-day re-scan', detail: "verify whether your team's fixes held" },
] as const

const artifacts = [
  { src: '/k12/artifact-report.png', alt: 'Sample impact-ranked fault report cover', className: 'md:left-0 md:top-0 md:-rotate-3' },
  { src: '/k12/artifact-workorder.png', alt: 'Sample technician work order artifact', className: 'md:left-[18%] md:top-24 md:rotate-1' },
  { src: '/k12/artifact-execdeck.png', alt: 'Sample board-ready executive summary slide', className: 'md:left-[7%] md:top-48 md:-rotate-1' },
] as const

export function WhatYouGet() {
  return (
    <SectionReveal className="bg-white">
      <K12Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1fr)]">
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.01em] text-brand-ink md:text-5xl">
              What your team receives
            </h2>
            <p className="mt-5 text-lg leading-8 text-brand-muted">
              Six deliverables your team can use the day they arrive. Built for facilities leaders, technicians, and board or superintendent conversations.
            </p>
            <ul className="mt-8 grid gap-5">
              {deliverables.map((item) => {
                const Icon = item.icon

                return (
                  <li key={item.text} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="leading-7 text-brand-muted">
                      <strong className="font-semibold text-brand-ink">{item.text}</strong> — {item.detail}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="relative grid gap-4 md:block">
            {artifacts.map((artifact) => (
              <div
                key={artifact.src}
                className={`relative mx-auto w-full max-w-sm rounded-xl border border-brand-border bg-white p-2 shadow-md md:absolute ${artifact.className}`}
              >
                <Image
                  src={artifact.src}
                  alt={artifact.alt}
                  width={720}
                  height={520}
                  className="h-auto w-full rounded-lg"
                />
                {/* TODO: swap with final asset */}
              </div>
            ))}
            <div className="hidden min-h-[31rem] md:block" aria-hidden="true" />
          </div>
        </div>
      </K12Container>
    </SectionReveal>
  )
}
