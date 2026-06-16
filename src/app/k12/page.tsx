import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'K-12 Schools',
  description:
    'LeanFM helps school districts find hidden HVAC issues driving complaints, waste, and maintenance strain.',
}

export default function K12RedirectPage() {
  redirect('/industries.html#k12')
}
