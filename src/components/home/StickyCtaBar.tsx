'use client'

import { useEffect, useState } from 'react'
import { CTA_LABELS } from '@/lib/constants'
import { TrackedButton } from '@/components/analytics/TrackedButton'

interface StickyCtaBarProps {
  heroId: string
  href?: string
  location?: string
  message?: string
}

export function StickyCtaBar({
  heroId,
  href = '/contact?intent=sample-analysis&source=sticky',
  location = 'sticky_sample_analysis_primary',
  message = 'Hidden BAS faults can waste energy, money, comfort, and maintenance time before alarms catch them.',
}: StickyCtaBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById(heroId)

    if (!hero || !('IntersectionObserver' in window)) {
      const handleScroll = () => {
        setIsVisible(window.scrollY > window.innerHeight * 0.7)
      }

      handleScroll()
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting)
      },
      {
        rootMargin: '-72px 0px 0px 0px',
        threshold: 0,
      }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [heroId])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-sky-200 bg-white/98 px-4 py-3 shadow-[0_-18px_50px_rgba(30,64,175,0.18)] backdrop-blur-xl transition-all duration-300 supports-[padding:max(0px)]:pb-[max(0.75rem,env(safe-area-inset-bottom))] ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
      aria-hidden={!isVisible}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center text-body-sm font-semibold text-slate-900 sm:text-left">
          {message}
        </p>
        <TrackedButton
          href={href}
          size="small"
          eventName="cta_sample_analysis_click"
          eventParams={{ location }}
          className="w-full shrink-0 sm:w-auto"
        >
          {CTA_LABELS.primary}
        </TrackedButton>
      </div>
    </div>
  )
}
