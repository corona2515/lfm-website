'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { K12Button } from '@/components/ui/k12-button'

export function StickyCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    const form = document.getElementById('diagnostic-form')

    if (!hero || !form) {
      return
    }

    let heroPassed = false
    let formVisible = false

    const update = () => setShow(heroPassed && !formVisible)

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroPassed = !entry?.isIntersecting && window.scrollY > hero.offsetHeight * 0.6
        update()
      },
      { threshold: 0 }
    )

    const formObserver = new IntersectionObserver(
      ([entry]) => {
        formVisible = !!entry?.isIntersecting
        update()
      },
      { threshold: 0.08 }
    )

    heroObserver.observe(hero)
    formObserver.observe(form)

    return () => {
      heroObserver.disconnect()
      formObserver.disconnect()
    }
  }, [])

  if (!show) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-white/95 px-4 py-3 shadow-lg backdrop-blur md:bottom-auto md:top-18 md:border-b md:border-t-0">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-center text-sm font-medium text-brand-ink sm:text-left">
          See whether your district qualifies for the $50K identified-waste pilot.
        </p>
        <K12Button asChild>
          <a
            href="#diagnostic-form"
            onClick={() => trackEvent('k12_sticky_cta_click', {})}
          >
            Get the free diagnostic →
          </a>
        </K12Button>
      </div>
    </div>
  )
}
