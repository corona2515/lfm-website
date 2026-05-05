import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Request a LeanFM Sample Analysis, book a demo, or contact the team about hidden HVAC faults and prioritized building system findings.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
