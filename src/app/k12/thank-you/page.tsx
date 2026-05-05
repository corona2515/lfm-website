import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'K-12 Sample Analysis',
  description: 'Continue to the current LeanFM K-12 Schools page.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function K12ThankYouRedirectPage() {
  redirect('/solutions/k-12-schools')
}
