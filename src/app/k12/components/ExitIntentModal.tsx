'use client'

import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { trackEvent } from '@/lib/analytics'
import { K12Button } from '@/components/ui/k12-button'
import {
  ShadcnDialog,
  ShadcnDialogClose,
  ShadcnDialogContent,
  ShadcnDialogDescription,
  ShadcnDialogHeader,
  ShadcnDialogTitle,
} from '@/components/ui/dialog'
import { ShadcnInput } from '@/components/ui/input'
import { ShadcnLabel } from '@/components/ui/label'

const emailSchema = z.string().trim().email('Enter a valid work email.')

export function ExitIntentModal() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [pdfLink, setPdfLink] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const timeReadyRef = useRef(false)
  const hasScrolledPastHeroRef = useRef(false)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    if (sessionStorage.getItem('k12LeadMagnetShown') === 'true') {
      return
    }

    const timer = window.setTimeout(() => {
      timeReadyRef.current = true
      hasScrolledPastHeroRef.current = window.scrollY > 240
    }, 20000)

    const showModal = () => {
      if (!timeReadyRef.current || !hasScrolledPastHeroRef.current || sessionStorage.getItem('k12LeadMagnetShown') === 'true') {
        return
      }

      sessionStorage.setItem('k12LeadMagnetShown', 'true')
      setOpen(true)
      trackEvent('k12_lead_magnet_open', {})
    }

    const onMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        showModal()
      }
    }

    const onScroll = () => {
      const current = window.scrollY
      const delta = lastScrollYRef.current - current
      lastScrollYRef.current = current

      hasScrolledPastHeroRef.current = hasScrolledPastHeroRef.current || current > 240

      if (window.innerWidth < 768 && delta > 200) {
        showModal()
      }
    }

    lastScrollYRef.current = window.scrollY
    document.addEventListener('mouseout', onMouseOut)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setPdfLink('')

    const parsed = emailSchema.safeParse(email)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || 'Enter a valid work email.')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: parsed.data, source: 'k12_exit_intent' }),
      })
      const body = await response.json().catch(() => null) as { pdfUrl?: string; error?: string } | null

      if (!response.ok) {
        throw new Error(body?.error || 'Request failed')
      }

      trackEvent('k12_lead_magnet_submit', {})
      setPdfLink(body?.pdfUrl || '/k12/k12-facilities-directors-guide.pdf')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <ShadcnDialog open={open} onOpenChange={setOpen}>
      <ShadcnDialogContent>
        <ShadcnDialogHeader>
          <ShadcnDialogTitle>
            Before you go — the 7 hidden BAS faults costing K-12 districts the most.
          </ShadcnDialogTitle>
          <ShadcnDialogDescription>
            One PDF. Six pages. The common BAS faults we see in K-12 buildings, why they matter, and how to start estimating their cost. No spam, just the guide.
          </ShadcnDialogDescription>
        </ShadcnDialogHeader>

        {pdfLink ? (
          <div className="mt-6 rounded-xl bg-brand-surfaceAlt p-4">
            <p className="font-semibold text-brand-ink">Guide ready.</p>
            <a href={pdfLink} className="mt-2 inline-flex text-sm font-semibold text-brand-primary hover:text-brand-primaryDark">
              Download the guide →
            </a>
          </div>
        ) : (
          <form className="mt-6 grid gap-4" onSubmit={submit}>
            <div className="grid gap-2">
              <ShadcnLabel htmlFor="leadMagnetEmail">Work email</ShadcnLabel>
              <ShadcnInput
                id="leadMagnetEmail"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={!!error}
              />
              {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
            </div>
            <K12Button type="submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send me the guide'}
            </K12Button>
            <ShadcnDialogClose asChild>
              <button type="button" className="justify-self-center text-sm font-semibold text-brand-muted hover:text-brand-ink">
                No thanks, I&apos;m done
              </button>
            </ShadcnDialogClose>
          </form>
        )}
      </ShadcnDialogContent>
    </ShadcnDialog>
  )
}
