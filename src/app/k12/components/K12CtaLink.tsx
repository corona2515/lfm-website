'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { K12Button } from '@/components/ui/k12-button'

interface K12CtaLinkProps {
  href: string
  children: React.ReactNode
  eventName?: string
  eventParams?: Record<string, string | number | boolean>
  variant?: 'default' | 'secondary' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  showArrow?: boolean
}

export function K12CtaLink({
  href,
  children,
  eventName,
  eventParams,
  variant = 'default',
  size = 'lg',
  className,
  showArrow = false,
}: K12CtaLinkProps) {
  return (
    <K12Button asChild variant={variant} size={size} className={className}>
      <Link
        href={href}
        onClick={() => {
          if (eventName) {
            trackEvent(eventName, eventParams)
          }
        }}
      >
        {children}
        {showArrow ? <ArrowRight data-icon="inline-end" aria-hidden="true" /> : null}
      </Link>
    </K12Button>
  )
}
