'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

interface IndustryPageViewTrackerProps {
  industry: 'k12' | 'museums' | 'higher_education'
}

export function IndustryPageViewTracker({ industry }: IndustryPageViewTrackerProps) {
  useEffect(() => {
    trackEvent('industry_page_view', { industry })
  }, [industry])

  return null
}
