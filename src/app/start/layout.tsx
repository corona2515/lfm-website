import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start Your Sample Analysis',
  description: 'Share building context and upload available BAS trend data to start a LeanFM Sample Analysis.',
}

export default function StartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
