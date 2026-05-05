import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Building Data to Action',
  description:
    'LeanFM helps facilities teams turn existing BAS data into ranked HVAC action with OnPoint.',
}

export default function PoweringTheAiEconomyRedirectPage() {
  redirect('/building-data-to-action')
}
