import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Request a free OnPoint preview, book a demo, or contact LeanFM about building fault detection and diagnosis.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
