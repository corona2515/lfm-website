import { NextRequest, NextResponse } from 'next/server'
import { createLeadSyncEvent } from '@/lib/lead-store'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

function normalizeString(value: unknown) {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  return ''
}

function isAuthorized(request: NextRequest) {
  const token = process.env.ONPOINT_STATUS_WEBHOOK_TOKEN?.trim()
  if (!token) {
    return false
  }

  const headerName = process.env.ONPOINT_STATUS_WEBHOOK_HEADER?.trim() || 'x-leanfm-onpoint-webhook-key'
  const headerValue = request.headers.get(headerName) || request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')

  return headerValue === token
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const submissionId = normalizeString((body as Record<string, unknown> | null)?.submissionId)

  if (!submissionId) {
    return NextResponse.json({ error: 'submissionId is required.' }, { status: 400 })
  }

  const sampleAsset = await prisma.sampleIntakeAsset.findFirst({
    where: { submissionId },
    include: { lead: true },
  })

  if (!sampleAsset) {
    return NextResponse.json({ error: 'Lead not found for submission.' }, { status: 404 })
  }

  await createLeadSyncEvent(sampleAsset.leadId, {
    provider: 'onpoint',
    status: 'SUCCESS',
    payload: {
      eventType: normalizeString((body as Record<string, unknown> | null)?.eventType) || 'status_callback',
      submissionId,
      customerId: normalizeString((body as Record<string, unknown> | null)?.customerId),
      userId: normalizeString((body as Record<string, unknown> | null)?.userId),
      buildingId: normalizeString((body as Record<string, unknown> | null)?.buildingId),
      uploadId: normalizeString((body as Record<string, unknown> | null)?.uploadId),
      accountStatus: normalizeString((body as Record<string, unknown> | null)?.accountStatus),
      reviewStatus: normalizeString((body as Record<string, unknown> | null)?.reviewStatus),
      activationStatus: normalizeString((body as Record<string, unknown> | null)?.activationStatus),
      accessEmailStatus: normalizeString((body as Record<string, unknown> | null)?.accessEmailStatus),
      rejectionReason: normalizeString((body as Record<string, unknown> | null)?.rejectionReason),
      updatedAt: normalizeString((body as Record<string, unknown> | null)?.updatedAt) || new Date().toISOString(),
      callbackPayload: body,
    },
  })

  return NextResponse.json({ success: true, leadId: sampleAsset.leadId })
}
