import { BookOpen, FileText, Users } from 'lucide-react'
import { K12Card, K12CardContent } from '@/components/ui/k12-card'
import { SectionReveal, K12Container } from './SectionReveal'

const tiles = [
  {
    icon: Users,
    headline: 'Engineer-reviewed findings',
    body: 'OnPoint surfaces fault candidates from BAS data, then a LeanFM engineer reviews the findings so your team receives practical, defensible next steps.',
    link: 'Meet the team →',
    href: '/company/about',
  },
  {
    icon: FileText,
    headline: 'Scoped BAS data request',
    body: 'The diagnostic starts with exported BAS trend files and basic building context. We do not need student records, live BAS credentials, or a new hardware connection to begin.',
    link: 'Ask what we need →',
    href: '/contact?topic=data-requirements',
  },
  {
    icon: BookOpen,
    headline: 'K-12 references on request',
    body: "Speak directly with a peer facilities director who's run the pilot. We'll connect you after the qualification call.",
    link: 'Request a reference call →',
    href: '/contact?topic=reference',
  },
] as const

export function TrustBlock() {
  return (
    <SectionReveal className="bg-brand-surfaceAlt">
      <K12Container>
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight tracking-[-0.01em] text-brand-ink md:text-5xl">
          Why districts choose LeanFM for BAS diagnostics.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {tiles.map((tile) => {
            const Icon = tile.icon

            return (
              <K12Card key={tile.headline}>
                <K12CardContent className="p-6">
                  <Icon className="size-8 text-brand-primary" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-brand-ink">{tile.headline}</h3>
                  <p className="mt-3 leading-7 text-brand-muted">{tile.body}</p>
                  <a href={tile.href} className="mt-5 inline-flex text-sm font-semibold text-brand-primary hover:text-brand-primaryDark">
                    {tile.link}
                  </a>
                </K12CardContent>
              </K12Card>
            )
          })}
        </div>
      </K12Container>
    </SectionReveal>
  )
}
