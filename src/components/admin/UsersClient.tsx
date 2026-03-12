'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import type { AdminRole } from '@prisma/client'
import { Button, Card } from '@/components/ui'

interface AdminUserRow {
  id: string
  email: string
  displayName: string
  role: AdminRole
  isActive: boolean
  _count: {
    currentAssigned: number
  }
}

export function UsersClient({ users }: { users: AdminUserRow[] }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<AdminRole>('OPERATOR')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const refresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    const response = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, displayName, password, role }),
    })

    if (!response.ok) {
      const body = await response.json().catch(() => null)
      setError(body?.error || 'Unable to create user')
      return
    }

    setEmail('')
    setDisplayName('')
    setPassword('')
    setRole('OPERATOR')
    refresh()
  }

  const updateUser = async (id: string, payload: Record<string, unknown>) => {
    setError('')
    const response = await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const body = await response.json().catch(() => null)
      setError(body?.error || 'Unable to update user')
      return
    }

    refresh()
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="heading-4 text-white">Create admin user</h2>
        <p className="mt-2 text-body-sm text-slate-400">Use this for internal team members only. There is no public signup.</p>
        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleCreate}>
          <div>
            <label className="label">Display name</label>
            <input className="input" value={displayName} onChange={(event) => setDisplayName(event.target.value)} required />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>
          <div>
            <label className="label">Temporary password</label>
            <input type="password" className="input" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>
          <div>
            <label className="label">Role</label>
            <select className="select" value={role} onChange={(event) => setRole(event.target.value as AdminRole)}>
              <option value="OPERATOR">Operator</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <Button type="submit" disabled={isPending}>Create User</Button>
          </div>
        </form>
        {error ? <p className="mt-4 text-body-sm text-red-300">{error}</p> : null}
      </Card>

      <Card>
        <h2 className="heading-4 text-white">Current users</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-body-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Assigned</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-slate-800">
                  <td className="px-3 py-3 text-white">{user.displayName}</td>
                  <td className="px-3 py-3 text-slate-300">{user.email}</td>
                  <td className="px-3 py-3 text-slate-300">{user.role}</td>
                  <td className="px-3 py-3 text-slate-300">{user._count.currentAssigned}</td>
                  <td className="px-3 py-3 text-slate-300">{user.isActive ? 'Active' : 'Inactive'}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" variant="secondary" size="small" onClick={() => updateUser(user.id, { isActive: !user.isActive })}>
                        {user.isActive ? 'Deactivate' : 'Reactivate'}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="small"
                        onClick={() => updateUser(user.id, { role: user.role === 'ADMIN' ? 'OPERATOR' : 'ADMIN' })}
                      >
                        Make {user.role === 'ADMIN' ? 'Operator' : 'Admin'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
