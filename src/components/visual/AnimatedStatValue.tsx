'use client'

import CountUp from 'react-countup'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type AnimatedStatValueProps = {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

export function AnimatedStatValue({
  end,
  prefix = '',
  suffix = '',
  duration = 1.5,
  className,
}: AnimatedStatValueProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return (
      <span className={className}>
        {prefix}
        {end.toLocaleString()}
        {suffix}
      </span>
    )
  }

  return (
    <span className={cn('tabular-nums', className)}>
      <CountUp
        end={end}
        duration={duration}
        enableScrollSpy
        scrollSpyOnce
        prefix={prefix}
        suffix={suffix}
        separator=","
      />
    </span>
  )
}
