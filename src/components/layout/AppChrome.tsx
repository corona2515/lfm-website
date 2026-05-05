'use client'

import { usePathname } from 'next/navigation'
import { Footer, Header } from '@/components/layout'

interface AppChromeProps {
  children: React.ReactNode
  contactEmail: string
}

export function AppChrome({ children, contactEmail }: AppChromeProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-18">{children}</main>
      <Footer contactEmail={contactEmail} />
    </>
  )
}
