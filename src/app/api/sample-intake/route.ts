import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import {
  buildDatasetIntakeRecord,
  buildDatasetUploadLeadInput,
  normalizeString,
  payloadFromSampleIntakeDraft,
  resolveVerifiedDatasetStoredObject,
  syncDatasetUploadLeadToCloseAndDraft,
  toDatasetIntakePayload,
  type DatasetIntakeDatasetPayload,
  type DatasetIntakeFinalizeRequestBody,
  validateDatasetIntakePayload,
  writeDatasetIntakeMetadata,
} from '@/lib/dataset-intake-server'
import { createLeadSyncEvent, upsertDatasetUploadLead } from '@/lib/lead-store'
import {
  linkLeadToSampleIntakeDraft,
  markSampleIntakeDraftCompleted,
  requireSampleIntakeDraftByToken,
} from '@/lib/sample-intake-drafts'
import {
  provisionSampleIntakeInOnPoint,
  serializeOnPointError,
  stringifyOnPointResponseBody,
} from '@/lib/onpoint'
import type { OnPointProvisioningError, OnPointProvisioningResult, ProvisionableSampleLead } from '@/lib/onpoint'

export const runtime = 'nodejs'

async function loadDraftFinalizeContext(body: DatasetIntakeFinalizeRequestBody | null) {
  const draftToken = normalizeString(body?.draftToken)
  if (!draftToken) {
    return null
  }

  const draft = await requireSampleIntakeDraftByToken(draftToken)
  return {
    draftToken,
    draft,
    payload: payloadFromSampleIntakeDraft(draft),
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as DatasetIntakeFinalizeRequestBody | null
    const draftContext = await loadDraftFinalizeContext(body).catch(() => null)
    const payload = draftContext ? draftContext.payload : toDatasetIntakePayload(body)
    const validationError = validateDatasetIntakePayload(payload)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const dataset = payload.dataset as DatasetIntakeDatasetPayload

    let storedObject: Awaited<ReturnType<typeof resolveVerifiedDatasetStoredObject>>
    try {
      storedObject = await resolveVerifiedDatasetStoredObject(dataset)
    } catch (error) {
      console.error('Sample intake storage verification error:', error)
      return NextResponse.json(
        { error: 'We could not verify the uploaded CSV. Please upload the file again and retry.' },
        { status: 400 }
      )
    }

    const intakeRecord = buildDatasetIntakeRecord({
      payload,
      storedObject,
      source: 'website_start_flow',
      intent: 'sample_upload',
      approvalRequired: true,
      activationRequired: true,
    })

    const lead = await upsertDatasetUploadLead({
      leadId: draftContext?.draft.leadId || null,
      data: buildDatasetUploadLeadInput({
        payload,
        storedObject,
        intent: 'sample_upload',
        source: 'website_start_flow',
        auditDescription: 'Lead captured from sample dataset intake',
      }),
    })

    if (draftContext?.draft && !draftContext.draft.leadId) {
      await linkLeadToSampleIntakeDraft(draftContext.draft.id, lead.id)
    }

    await writeDatasetIntakeMetadata({
      ...intakeRecord,
      leadId: lead.id,
    })

    let onPointResult: OnPointProvisioningResult | null = null
    let duplicateOnPointError: ReturnType<typeof serializeOnPointError> | null = null

    try {
      onPointResult = await provisionSampleIntakeInOnPoint({ lead: lead as ProvisionableSampleLead })

      await createLeadSyncEvent(lead.id, {
        provider: 'onpoint',
        status: 'SUCCESS',
        payload: {
          eventType: 'submission_created',
          submissionId: onPointResult.submissionId,
          customerId: onPointResult.customerId,
          userId: onPointResult.userId,
          buildingId: onPointResult.buildingId,
          uploadId: onPointResult.uploadId,
          accountStatus: onPointResult.accountStatus,
          activationStatus: onPointResult.activationStatus,
          reviewStatus: onPointResult.reviewStatus,
          accessEmailStatus: onPointResult.accessEmailStatus,
          updatedAt: new Date().toISOString(),
          responseBody: stringifyOnPointResponseBody(onPointResult.responseBody),
        },
      })
    } catch (error) {
      const onPointError = serializeOnPointError(error as OnPointProvisioningError)
      const syncStatus = onPointError.retryable ? 'PENDING_RETRY' : 'FAILED'

      await createLeadSyncEvent(lead.id, {
        provider: 'onpoint',
        status: syncStatus,
        errorMessage: onPointError.detail,
        payload: {
          eventType: 'submission_create_failed',
          submissionId: dataset.submissionId,
          code: onPointError.code,
          userMessage: onPointError.userMessage,
          retryable: onPointError.retryable,
          updatedAt: new Date().toISOString(),
          responseBody: stringifyOnPointResponseBody(onPointError.responseBody),
        },
      })

      await writeDatasetIntakeMetadata({
        ...intakeRecord,
        leadId: lead.id,
        onPointStatus: syncStatus,
        onPointCode: onPointError.code || '',
        onPointError: onPointError.detail,
      })

      if (onPointError.statusCode === 409 && onPointError.code === 'PENDING_SUBMISSION_EXISTS') {
        duplicateOnPointError = onPointError
      } else {
        return NextResponse.json(
          {
            error: onPointError.userMessage,
            code: onPointError.code,
          },
          { status: onPointError.statusCode }
        )
      }
    }

    const closeState = await syncDatasetUploadLeadToCloseAndDraft(lead, draftContext?.draft || null)

    if (draftContext?.draft) {
      await markSampleIntakeDraftCompleted(draftContext.draft.id, lead.id)
    }

    const onboarding = {
      status: duplicateOnPointError ? 'pending_submission_exists' : 'pending_review',
      submissionId: dataset.submissionId,
      customerId: onPointResult?.customerId || '',
      userId: onPointResult?.userId || '',
      buildingId: onPointResult?.buildingId || '',
      uploadId: onPointResult?.uploadId || '',
      accountStatus: onPointResult?.accountStatus || 'pending',
      activationStatus: onPointResult?.activationStatus || 'inactive',
      reviewStatus: onPointResult?.reviewStatus || 'pending_review',
      accessEmailStatus: onPointResult?.accessEmailStatus || 'not_sent',
      closeSyncStatus: closeState.closeSyncStatus.toLowerCase(),
    }

    const enrichedIntakeRecord = {
      ...intakeRecord,
      leadId: lead.id,
      onPointSubmissionId: onPointResult?.submissionId || dataset.submissionId,
      onPointCustomerId: onPointResult?.customerId || '',
      onPointUserId: onPointResult?.userId || '',
      onPointBuildingId: onPointResult?.buildingId || '',
      onPointUploadId: onPointResult?.uploadId || '',
      onPointAccountStatus: onPointResult?.accountStatus || 'pending',
      onPointActivationStatus: onPointResult?.activationStatus || 'inactive',
      onPointReviewStatus: onPointResult?.reviewStatus || 'pending_review',
      onPointAccessEmailStatus: onPointResult?.accessEmailStatus || 'not_sent',
      closeLeadId: closeState.closeLeadId || '',
      closeContactId: closeState.closeContactId || '',
      closeSyncStatus: closeState.closeSyncStatus,
      closeSyncError: closeState.closeSyncError || '',
    }

    await writeDatasetIntakeMetadata(enrichedIntakeRecord)

    const webhookUrl = process.env.SAMPLE_INTAKE_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL
    let webhookDelivered = false
    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(enrichedIntakeRecord),
        })

        webhookDelivered = webhookResponse.ok
        if (!webhookResponse.ok) {
          console.error('Sample intake webhook failed:', webhookResponse.status)
        }
      } catch (error) {
        console.error('Sample intake webhook error:', error)
      }
    }

    console.log('New sample intake:', JSON.stringify({ ...enrichedIntakeRecord, webhookDelivered }, null, 2))

    if (duplicateOnPointError) {
      return NextResponse.json(
        {
          error: duplicateOnPointError.userMessage,
          code: duplicateOnPointError.code,
          leadId: lead.id,
          onboarding,
        },
        { status: 409 }
      )
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      onboarding,
    })
  } catch (error) {
    console.error('Sample intake route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
