export const dynamic = 'force-dynamic'

import { AdminShell } from '@/components/admin/AdminShell'
import { requireAdminUser } from '@/lib/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminUser()

  return (
    <AdminShell user={session.user}>
      {children}
    </AdminShell>
  )
}
