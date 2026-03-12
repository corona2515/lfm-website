import type { AdminRole, LeadStatus } from '@prisma/client'
import { NextResponse } from 'next/server'
import { getCurrentAdminUser } from '@/lib/auth'

export async function requireApiAdminUser() {
  const session = await getCurrentAdminUser()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return session
}

export async function requireApiAdminRole(role: AdminRole) {
  const session = await getCurrentAdminUser()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (session.user.role !== role) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return session
}

export function parseOptionalDate(value: unknown) {
  if (typeof value !== 'string' || !value) {
    return null
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function parseLeadStatus(value: unknown): LeadStatus | null {
  if (
    value === 'NEW' ||
    value === 'ASSIGNED' ||
    value === 'CONTACTED' ||
    value === 'QUALIFIED' ||
    value === 'DISQUALIFIED' ||
    value === 'SAMPLE_REVIEW_IN_PROGRESS' ||
    value === 'CLOSED_WON' ||
    value === 'CLOSED_LOST'
  ) {
    return value
  }

  return null
}
