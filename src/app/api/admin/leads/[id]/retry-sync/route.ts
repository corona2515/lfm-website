import { NextResponse } from 'next/server'
import { createAuditLog } from '@/lib/audit'
import { requireApiAdminUser } from '@/lib/admin-api'
import { syncLeadToClose } from '@/lib/close'
import {
  createDatasetFileFromSampleIntakeAsset,
  provisionSampleIntakeInOnPoint,
  serializeOnPointError,
  stringifyOnPointResponseBody,
} from '@/lib/onpoint'
import { createLeadSyncEvent, updateLeadSyncState } from '@/lib/lead-store'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireApiAdminUser()
  if (session instanceof NextResponse) {
    return session
  }

  let provider: 'close' | 'onpoint' = 'close'

  try {
    const body = await request.json()
    if (body?.provider === 'close' || body?.provider === 'onpoint') {
      provider = body.provider
    }
  } catch {
    // Default to Close retry when no JSON body is provided.
  }

  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: { sampleIntakeAsset: true },
  })
  if (!lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  }

  if (provider === 'onpoint') {
    if (lead.leadType !== 'SAMPLE_UPLOAD' || !lead.sampleIntakeAsset) {
      return NextResponse.json({ error: 'OnPoint retry is only available for sample-upload leads' }, { status: 400 })
    }

    try {
      const datasetFile = await createDatasetFileFromSampleIntakeAsset(lead.sampleIntakeAsset)
      const result = await provisionSampleIntakeInOnPoint({
        lead,
        datasetFile,
      })

      await createLeadSyncEvent(lead.id, {
        provider: 'onpoint',
        status: 'SUCCESS',
        payload: {
          submissionId: lead.sampleIntakeAsset.submissionId,
          userId: result.userId,
          buildingId: result.buildingId,
          uploadId: result.uploadId,
          accountStatus: result.accountStatus,
          activationStatus: result.activationStatus,
          reviewStatus: result.reviewStatus,
          responseBody: stringifyOnPointResponseBody(result.responseBody),
        },
      })

      await createAuditLog({
        actorId: session.user.id,
        leadId: lead.id,
        action: 'LEAD_SYNC_RETRIED',
        entityType: 'lead',
        entityId: lead.id,
        description: 'OnPoint intake retried from admin',
      })

      return NextResponse.json({ success: true, provider: 'onpoint' })
    } catch (error) {
      const onPointError = serializeOnPointError(error)
      await createLeadSyncEvent(lead.id, {
        provider: 'onpoint',
        status: onPointError.retryable ? 'PENDING_RETRY' : 'FAILED',
        errorMessage: onPointError.detail,
        payload: {
          submissionId: lead.sampleIntakeAsset.submissionId,
          code: onPointError.code,
          userMessage: onPointError.userMessage,
          retryable: onPointError.retryable,
          responseBody: stringifyOnPointResponseBody(onPointError.responseBody),
        },
      })

      return NextResponse.json(
        { error: onPointError.userMessage, code: onPointError.code },
        { status: onPointError.statusCode }
      )
    }
  }

  try {
    const result = await syncLeadToClose(lead)
    if (result.skipped) {
      await updateLeadSyncState(lead.id, {
        status: 'PENDING_RETRY',
        errorMessage: 'Close API key is not configured',
      })
    } else {
      await updateLeadSyncState(lead.id, {
        status: 'SUCCESS',
        externalLeadId: result.closeLeadId,
        externalContactId: result.closeContactId,
      })
    }
    await createAuditLog({
      actorId: session.user.id,
      leadId: lead.id,
      action: 'LEAD_SYNC_RETRIED',
      entityType: 'lead',
      entityId: lead.id,
      description: 'Close sync retried from admin',
    })

    return NextResponse.json({ success: true, provider: 'close' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Close sync failed'
    await updateLeadSyncState(lead.id, {
      status: 'PENDING_RETRY',
      errorMessage: message,
    })
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
