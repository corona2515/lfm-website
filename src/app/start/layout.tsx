import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upload Sample Dataset',
  description: 'Upload a sample BAS dataset and LeanFM will review it, validate findings, and schedule a walkthrough call.',
}

export default function StartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
