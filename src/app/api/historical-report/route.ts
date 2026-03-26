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
import { upsertDatasetUploadLead } from '@/lib/lead-store'
import {
  linkLeadToSampleIntakeDraft,
  markSampleIntakeDraftCompleted,
  requireSampleIntakeDraftByToken,
} from '@/lib/sample-intake-drafts'

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
      console.error('Historical report storage verification error:', error)
      return NextResponse.json(
        { error: 'We could not verify the uploaded CSV. Please upload the file again and retry.' },
        { status: 400 }
      )
    }

    const intakeRecord = buildDatasetIntakeRecord({
      payload,
      storedObject,
      source: 'website_historical_report_flow',
      intent: 'historical_report',
    })

    const lead = await upsertDatasetUploadLead({
      leadId: draftContext?.draft.leadId || null,
      data: buildDatasetUploadLeadInput({
        payload,
        storedObject,
        intent: 'historical_report',
        source: 'website_historical_report_flow',
        auditDescription: 'Lead captured from historical report intake',
      }),
    })

    if (draftContext?.draft && !draftContext.draft.leadId) {
      await linkLeadToSampleIntakeDraft(draftContext.draft.id, lead.id)
    }

    await writeDatasetIntakeMetadata({
      ...intakeRecord,
      leadId: lead.id,
    })

    const closeState = await syncDatasetUploadLeadToCloseAndDraft(lead, draftContext?.draft || null)

    if (draftContext?.draft) {
      await markSampleIntakeDraftCompleted(draftContext.draft.id, lead.id)
    }

    const responsePayload = {
      status: 'pending_review',
      submissionId: dataset.submissionId,
      closeSyncStatus: closeState.closeSyncStatus.toLowerCase(),
    }

    const enrichedIntakeRecord = {
      ...intakeRecord,
      leadId: lead.id,
      closeLeadId: closeState.closeLeadId || '',
      closeContactId: closeState.closeContactId || '',
      closeSyncStatus: closeState.closeSyncStatus,
      closeSyncError: closeState.closeSyncError || '',
      requestStatus: responsePayload.status,
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
          console.error('Historical report webhook failed:', webhookResponse.status)
        }
      } catch (error) {
        console.error('Historical report webhook error:', error)
      }
    }

    console.log('New historical report request:', JSON.stringify({ ...enrichedIntakeRecord, webhookDelivered }, null, 2))

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      request: responsePayload,
    })
  } catch (error) {
    console.error('Historical report route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
