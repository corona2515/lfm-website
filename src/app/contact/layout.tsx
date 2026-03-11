import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a LeanFM OnPoint demo to review hidden HVAC faults, prioritized actions, and potential energy savings.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
