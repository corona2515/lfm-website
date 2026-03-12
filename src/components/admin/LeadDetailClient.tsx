'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import type { AdminUser, Lead } from '@prisma/client'
import { Button, Card } from '@/components/ui'
import { LEAD_STATUSES } from '@/lib/lead-types'

export function LeadDetailClient({
  lead,
  users,
}: {
  lead: Lead
  users: AdminUser[]
}) {
  const router = useRouter()
  const [status, setStatus] = useState(lead.status)
  const [assigneeId, setAssigneeId] = useState(lead.currentAssigneeId || '')
  const [nextFollowUpAt, setNextFollowUpAt] = useState(
    lead.nextFollowUpAt ? new Date(lead.nextFollowUpAt).toISOString().slice(0, 16) : ''
  )
  const [qualificationNotes, setQualificationNotes] = useState(lead.qualificationNotes || '')
  const [newNote, setNewNote] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const refresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }

  const handleUpdate = async () => {
    setError('')
    const response = await fetch(`/api/admin/leads/${lead.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        currentAssigneeId: assigneeId || null,
        nextFollowUpAt: nextFollowUpAt || null,
        qualificationNotes,
      }),
    })

    if (!response.ok) {
      const body = await response.json().catch(() => null)
      setError(body?.error || 'Unable to update lead')
      return
    }

    refresh()
  }

  const handleNoteSubmit = async () => {
    if (!newNote.trim()) {
      return
    }

    setError('')
    const response = await fetch(`/api/admin/leads/${lead.id}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: newNote }),
    })

    if (!response.ok) {
      const body = await response.json().catch(() => null)
      setError(body?.error || 'Unable to add note')
      return
    }

    setNewNote('')
    refresh()
  }

  const handleRetrySync = async (provider: 'close' | 'onpoint') => {
    setError('')
    const response = await fetch(`/api/admin/leads/${lead.id}/retry-sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider }),
    })

    if (!response.ok) {
      const body = await response.json().catch(() => null)
      setError(body?.error || 'Unable to retry sync')
      return
    }

    refresh()
  }

  return (
    <Card className="space-y-4 border-slate-800/70 bg-slate-900/80">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="heading-4 text-white">Lead actions</h2>
          <p className="mt-1 text-body-sm text-slate-400">Update ownership, workflow status, and follow-up timing.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {lead.leadType === 'SAMPLE_UPLOAD' ? (
            <Button type="button" variant="secondary" onClick={() => handleRetrySync('onpoint')} disabled={isPending}>
              Retry OnPoint Intake
            </Button>
          ) : null}
          <Button type="button" variant="secondary" onClick={() => handleRetrySync('close')} disabled={isPending}>
            Retry Close Sync
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label">Status</label>
          <select className="select" value={status} onChange={(event) => setStatus(event.target.value as typeof status)}>
            {LEAD_STATUSES.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Assignee</label>
          <select className="select" value={assigneeId} onChange={(event) => setAssigneeId(event.target.value)}>
            <option value="">Unassigned</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.displayName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Next follow-up</label>
          <input
            type="datetime-local"
            className="input"
            value={nextFollowUpAt}
            onChange={(event) => setNextFollowUpAt(event.target.value)}
          />
        </div>
        <div>
          <label className="label">Qualification notes</label>
          <textarea
            className="input min-h-[120px] resize-none"
            value={qualificationNotes}
            onChange={(event) => setQualificationNotes(event.target.value)}
          />
        </div>
      </div>

      <Button type="button" onClick={handleUpdate} disabled={isPending}>
        Save Lead Updates
      </Button>

      <div>
        <label className="label">Add note</label>
        <textarea
          className="input min-h-[120px] resize-none"
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder="Capture call notes, triage details, or next steps."
        />
        <div className="mt-3">
          <Button type="button" variant="secondary" onClick={handleNoteSubmit} disabled={isPending || !newNote.trim()}>
            Add Note
          </Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-body-sm text-red-300">
          {error}
        </div>
      ) : null}
    </Card>
  )
}
