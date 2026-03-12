export const dynamic = 'force-dynamic'

import { UsersClient } from '@/components/admin/UsersClient'
import { requireAdminRole } from '@/lib/auth'
import { getAdminUsers } from '@/lib/admin-data'

export default async function AdminUsersPage() {
  await requireAdminRole('ADMIN')
  const users = await getAdminUsers()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-body-xs uppercase tracking-[0.2em] text-cyan-300">Users</p>
        <h1 className="heading-3 mt-2 text-white">Admin access management</h1>
      </div>
      <UsersClient users={users} />
    </div>
  )
}
