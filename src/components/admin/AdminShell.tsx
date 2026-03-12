'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, Card } from '@/components/ui'
import type { AdminUser } from '@prisma/client'

const NAV_ITEMS = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/leads', label: 'Leads' },
  { href: '/admin/uploads', label: 'Uploads' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/settings', label: 'Settings' },
]

export function AdminShell({
  user,
  children,
}: {
  user: AdminUser
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="container-wide relative py-6 md:py-8">
        <Card className="mb-6 border-cyan-500/15 bg-slate-900/80">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-body-xs uppercase tracking-[0.2em] text-cyan-300">LeanFM Admin</p>
              <h1 className="heading-3 mt-2 text-white">Operations Console</h1>
              <p className="mt-2 text-body-sm text-slate-400">
                Signed in as {user.displayName} ({user.role.toLowerCase()})
              </p>
            </div>
            <form action="/api/admin/session" method="post">
              <input type="hidden" name="_method" value="DELETE" />
              <Button type="submit" variant="secondary">Sign Out</Button>
            </form>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <Card className="h-fit">
            <nav className="space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-4 py-3 text-body-sm transition-colors ${
                      isActive
                        ? 'bg-cyan-500/12 text-cyan-200'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </Card>

          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
