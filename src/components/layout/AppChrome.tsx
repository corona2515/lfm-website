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
    <div className="thermal flex min-h-screen flex-1 flex-col bg-[#0a0b0e] text-[#f5f3ee]">
      <Header />
      <main className="flex-1 pt-[76px]">{children}</main>
      <Footer contactEmail={contactEmail} />
    </div>
  )
}
