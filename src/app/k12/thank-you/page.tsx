import type { Metadata } from 'next'
import { CalendarDays, CheckCircle2, FileText } from 'lucide-react'
import { K12Container } from '../components/SectionReveal'
import { K12CtaLink } from '../components/K12CtaLink'

export const metadata: Metadata = {
  title: 'K-12 Diagnostic Request Received',
  description: 'Your K-12 building diagnostic request has been received by LeanFM.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function K12ThankYouPage() {
  return (
    <section className="bg-white py-20 md:py-28">
      <K12Container>
        <div className="mx-auto max-w-3xl text-center">
          <CheckCircle2 className="mx-auto size-14 text-brand-success" aria-hidden="true" />
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.02em] text-brand-ink md:text-5xl">
            Your diagnostic request is in.
          </h1>
          <p className="mt-5 text-lg leading-8 text-brand-muted">
            A LeanFM engineer will review your district details and follow up with the fastest path to identify the top dollar leaks in one building.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-brand-border bg-brand-surfaceAlt p-6">
            <FileText className="size-8 text-brand-primary" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-semibold text-brand-ink">What happens next</h2>
            <p className="mt-3 leading-7 text-brand-muted">
              We confirm your BAS export path, choose the first building, and send a short checklist for the trend data your team already has.
            </p>
          </div>
          <div id="book-call" className="scroll-mt-24 rounded-xl border border-brand-border bg-brand-surfaceAlt p-6">
            <CalendarDays className="size-8 text-brand-primary" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-semibold text-brand-ink">Book the qualification call</h2>
            <p className="mt-3 leading-7 text-brand-muted">
              Use this placeholder for the Calendly inline embed once the production scheduling link is ready.
            </p>
            <div className="mt-5 rounded-lg border border-dashed border-brand-border bg-white p-5 text-sm text-brand-muted">
              Calendly embed placeholder
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <K12CtaLink href="/k12" variant="secondary" showArrow>
            Back to the K-12 pilot page
          </K12CtaLink>
        </div>
      </K12Container>
    </section>
  )
}
