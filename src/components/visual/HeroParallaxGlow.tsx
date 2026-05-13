'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type HeroParallaxGlowProps = {
  className?: string
}

export function HeroParallaxGlow({ className }: HeroParallaxGlowProps) {
  const emeraldRef = useRef<HTMLDivElement>(null)
  const skyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return
    }

    let frame = 0

    const update = () => {
      frame = 0
      const scrollY = window.scrollY

      if (emeraldRef.current) {
        emeraldRef.current.style.transform = `translate3d(0, ${scrollY * 0.018}px, 0)`
      }

      if (skyRef.current) {
        skyRef.current.style.transform = `translate3d(0, ${scrollY * 0.032}px, 0)`
      }
    }

    const handleScroll = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', handleScroll)

      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div
        ref={emeraldRef}
        className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-200/45 blur-3xl will-change-transform"
      />
      <div
        ref={skyRef}
        className="absolute right-0 top-0 h-[36rem] w-[36rem] rounded-full bg-sky-200/55 blur-3xl will-change-transform"
      />
    </div>
  )
}
