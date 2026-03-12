'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Card } from '@/components/ui'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = searchParams.get('next') || '/admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    const response = await fetch('/api/admin/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const body = await response.json().catch(() => null)
      setError(body?.error || 'Unable to sign in.')
      return
    }

    startTransition(() => {
      router.push(nextPath)
      router.refresh()
    })
  }

  return (
    <Card className="mx-auto max-w-md border-cyan-500/20 bg-slate-900/85">
      <h1 className="heading-3 text-white">Admin sign in</h1>
      <p className="mt-2 text-body-sm text-slate-400">
        Use your internal LeanFM admin account to access submissions and operations data.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="admin-email" className="label">Email</label>
          <input
            id="admin-email"
            type="email"
            className="input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label htmlFor="admin-password" className="label">Password</label>
          <input
            id="admin-password"
            type="password"
            className="input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        {error ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-body-sm text-red-300">
            {error}
          </div>
        ) : null}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </Card>
  )
}
