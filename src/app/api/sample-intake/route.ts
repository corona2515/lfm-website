import { writeFile } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'
import type { Lead, SampleIntakeDraft } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { syncLeadToClose } from '@/lib/close'
import { createLeadSyncEvent, createSampleUploadLead, updateLeadSyncState } from '@/lib/lead-store'
import {
  linkLeadToSampleIntakeDraft,
  markSampleIntakeDraftCompleted,
  requireSampleIntakeDraftByToken,
  updateSampleIntakeDraftCloseState,
} from '@/lib/sample-intake-drafts'
import { provisionSampleIntakeInOnPoint, serializeOnPointError, stringifyOnPointResponseBody } from '@/lib/onpoint'
import type { OnPointProvisioningError, OnPointProvisioningResult, ProvisionableSampleLead } from '@/lib/onpoint'
import { prisma } from '@/lib/prisma'
import { assertSampleIntakeObjectExists, resolveStoredSampleIntakeObject } from '@/lib/sample-intake-storage'

export const runtime = 'nodejs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ACCEPTED_CSV_MIME_TYPES = new Set([
  '',
  'text/csv',
  'application/csv',
  'text/plain',
  'application/vnd.ms-excel',
  'application/octet-stream',
])

interface SampleIntakeDatasetPayload {
  submissionId: string
  fileName: string
  fileSizeBytes: number
  mimeType: string
  storageProvider?: string
  storageKey: string
  storageBucket?: string
  storageRegion?: string
  storageEndpoint?: string
  localFilePath?: string
}

interface SampleIntakePayload {
  name: string
  email: string
  company: string
  role: string
  phone: string
  buildingName: string
  addressLine1: string
  city: string
  state: string
  postalCode: string
  buildingType: string
  portfolioSize: string
  basPlatform: string
  primaryConcern: string
  notes: string
  dataset: SampleIntakeDatasetPayload | null
}

interface FinalizeRequestBody {
  draftToken?: unknown
  name?: unknown
  email?: unknown
  company?: unknown
  role?: unknown
  phone?: unknown
  buildingName?: unknown
  addressLine1?: unknown
  city?: unknown
  state?: unknown
  postalCode?: unknown
  buildingType?: unknown
  portfolioSize?: unknown
  basPlatform?: unknown
  primaryConcern?: unknown
  notes?: unknown
  dataset?: Record<string, unknown> | null
}

function normalizeString(value: unknown) {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  return ''
}

function normalizeNumber(value: unknown) {
  const parsedValue = Number(value)
  return Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : 0
}

function toSampleIntakePayload(body: FinalizeRequestBody | null): SampleIntakePayload {
  const payload = typeof body === 'object' && body !== null ? body : {}
  const datasetPayload = typeof payload.dataset === 'object' && payload.dataset !== null
    ? payload.dataset
    : null

  return {
    name: normalizeString(payload.name),
    email: normalizeString(payload.email),
    company: normalizeString(payload.company),
    role: normalizeString(payload.role),
    phone: normalizeString(payload.phone),
    buildingName: normalizeString(payload.buildingName),
    addressLine1: normalizeString(payload.addressLine1),
    city: normalizeString(payload.city),
    state: normalizeString(payload.state),
    postalCode: normalizeString(payload.postalCode),
    buildingType: normalizeString(payload.buildingType),
    portfolioSize: normalizeString(payload.portfolioSize),
    basPlatform: normalizeString(payload.basPlatform),
    primaryConcern: normalizeString(payload.primaryConcern),
    notes: normalizeString(payload.notes),
    dataset: datasetPayload ? {
      submissionId: normalizeString(datasetPayload.submissionId),
      fileName: normalizeString(datasetPayload.fileName),
      fileSizeBytes: normalizeNumber(datasetPayload.fileSizeBytes),
      mimeType: normalizeString(datasetPayload.mimeType),
      storageProvider: normalizeString(datasetPayload.storageProvider),
      storageKey: normalizeString(datasetPayload.storageKey),
      storageBucket: normalizeString(datasetPayload.storageBucket),
      storageRegion: normalizeString(datasetPayload.storageRegion),
      storageEndpoint: normalizeString(datasetPayload.storageEndpoint),
      localFilePath: normalizeString(datasetPayload.localFilePath),
    } : null,
  }
}

function payloadFromDraft(draft: SampleIntakeDraft): SampleIntakePayload {
  return {
    name: draft.name || '',
    email: draft.email || '',
    company: draft.company || '',
    role: draft.role || '',
    phone: draft.phone || '',
    buildingName: draft.buildingName || '',
    addressLine1: draft.addressLine1 || '',
    city: draft.city || '',
    state: draft.state || '',
    postalCode: draft.postalCode || '',
    buildingType: draft.buildingType || '',
    portfolioSize: draft.portfolioSize || '',
    basPlatform: draft.basPlatform || '',
    primaryConcern: draft.primaryConcern || '',
    notes: draft.notes || '',
    dataset: draft.datasetFileName && draft.storageKey ? {
      submissionId: draft.submissionId,
      fileName: draft.datasetFileName,
      fileSizeBytes: draft.datasetFileSizeBytes || 0,
      mimeType: draft.datasetMimeType || 'text/csv',
      storageProvider: draft.storageProvider || 'local',
      storageKey: draft.storageKey,
      storageBucket: draft.storageBucket || '',
      storageRegion: draft.storageRegion || '',
      storageEndpoint: draft.storageEndpoint || '',
      localFilePath: draft.localFilePath || '',
    } : null,
  }
}

function validatePayload(payload: SampleIntakePayload): string | null {
  if (!payload.name || !payload.email || !payload.company) {
    return 'Missing required fields: name, email, and company are required.'
  }

  if (!payload.phone) {
    return 'Phone is required.'
  }

  if (!payload.buildingName || !payload.addressLine1 || !payload.city || !payload.state || !payload.postalCode) {
    return 'Building name and full address are required.'
  }

  if (!payload.buildingType || !payload.portfolioSize) {
    return 'Missing required fields: building type and portfolio size are required.'
  }

  if (!EMAIL_REGEX.test(payload.email)) {
    return 'Invalid email format.'
  }

  if (!payload.dataset) {
    return 'Dataset file is required.'
  }

  if (!payload.dataset.submissionId || !payload.dataset.storageKey || !payload.dataset.fileName) {
    return 'Dataset upload session is incomplete. Please upload the CSV again.'
  }

  if (!payload.dataset.fileName.toLowerCase().endsWith('.csv')) {
    return 'Dataset must be a .csv file.'
  }

  const mimeType = payload.dataset.mimeType.toLowerCase()
  if (!ACCEPTED_CSV_MIME_TYPES.has(mimeType)) {
    return 'Dataset file type must be CSV.'
  }

  return null
}

async function writeLocalMetadata(payload: Record<string, unknown>) {
  try {
    const metadataPath = join(tmpdir(), 'leanfm-sample-intake', `${payload.submissionId}.json`)
    await writeFile(metadataPath, JSON.stringify(payload, null, 2))
  } catch (error) {
    console.error('Sample intake metadata write error:', error)
  }
}

async function upsertLeadFromPayload(input: {
  payload: SampleIntakePayload
  draft?: SampleIntakeDraft | null
  storedObject: ReturnType<typeof resolveStoredSampleIntakeObject>
}) {
  const dataset = input.payload.dataset as SampleIntakeDatasetPayload

  if (!input.draft?.leadId) {
    const lead = await createSampleUploadLead({
      name: input.payload.name,
      email: input.payload.email,
      company: input.payload.company,
      role: input.payload.role || undefined,
      phone: input.payload.phone,
      buildingName: input.payload.buildingName,
      addressLine1: input.payload.addressLine1,
      city: input.payload.city,
      state: input.payload.state,
      postalCode: input.payload.postalCode,
      buildingType: input.payload.buildingType,
      portfolioSize: input.payload.portfolioSize,
      basPlatform: input.payload.basPlatform || undefined,
      primaryConcern: input.payload.primaryConcern || undefined,
      notes: input.payload.notes || undefined,
      datasetFileName: dataset.fileName,
      datasetFileSizeBytes: dataset.fileSizeBytes,
      datasetMimeType: dataset.mimeType || 'application/octet-stream',
      storageProvider: input.storedObject.storageProvider,
      storageBucket: input.storedObject.storageBucket || undefined,
      storageKey: input.storedObject.storageKey,
      storageRegion: input.storedObject.storageRegion || undefined,
      storageEndpoint: input.storedObject.storageEndpoint || undefined,
      localFilePath: input.storedObject.localFilePath || undefined,
      submissionId: dataset.submissionId,
    })

    if (input.draft) {
      await linkLeadToSampleIntakeDraft(input.draft.id, lead.id)
    }

    return lead
  }

  const lead = await prisma.lead.update({
    where: { id: input.draft.leadId },
    data: {
      name: input.payload.name,
      email: input.payload.email,
      company: input.payload.company,
      role: input.payload.role || null,
      phone: input.payload.phone,
      buildingName: input.payload.buildingName,
      addressLine1: input.payload.addressLine1,
      city: input.payload.city,
      state: input.payload.state,
      postalCode: input.payload.postalCode,
      buildingType: input.payload.buildingType,
      portfolioSize: input.payload.portfolioSize,
      message: input.payload.notes || null,
      sampleIntakeAsset: {
        upsert: {
          create: {
            submissionId: dataset.submissionId,
            basPlatform: input.payload.basPlatform || null,
            primaryConcern: input.payload.primaryConcern || null,
            datasetFileName: dataset.fileName,
            datasetFileSizeBytes: dataset.fileSizeBytes,
            datasetMimeType: dataset.mimeType || 'application/octet-stream',
            storageProvider: input.storedObject.storageProvider,
            storageBucket: input.storedObject.storageBucket,
            storageKey: input.storedObject.storageKey,
            storageRegion: input.storedObject.storageRegion,
            storageEndpoint: input.storedObject.storageEndpoint,
            localFilePath: input.storedObject.localFilePath,
          },
          update: {
            submissionId: dataset.submissionId,
            basPlatform: input.payload.basPlatform || null,
            primaryConcern: input.payload.primaryConcern || null,
            datasetFileName: dataset.fileName,
            datasetFileSizeBytes: dataset.fileSizeBytes,
            datasetMimeType: dataset.mimeType || 'application/octet-stream',
            storageProvider: input.storedObject.storageProvider,
            storageBucket: input.storedObject.storageBucket,
            storageKey: input.storedObject.storageKey,
            storageRegion: input.storedObject.storageRegion,
            storageEndpoint: input.storedObject.storageEndpoint,
            localFilePath: input.storedObject.localFilePath,
          },
        },
      },
    },
    include: {
      sampleIntakeAsset: true,
    },
  })

  return lead
}

async function syncLeadToCloseAndDraft(
  lead: Lead,
  draft: SampleIntakeDraft | null
) {
  let closeLeadId: string | null = draft?.closeLeadId || lead.closeLeadId || null
  let closeContactId: string | null = draft?.closeContactId || lead.closeContactId || null
  let closeSyncStatus: 'SUCCESS' | 'FAILED' | 'PENDING_RETRY' = 'SUCCESS'
  let closeSyncError: string | null = null

  try {
    const result = await syncLeadToClose(lead, {
      existingLeadId: closeLeadId,
      existingContactId: closeContactId,
    })

    if (result.skipped) {
      closeSyncStatus = 'PENDING_RETRY'
      closeSyncError = 'Close API key is not configured'
      await updateLeadSyncState(lead.id, {
        status: 'PENDING_RETRY',
        errorMessage: closeSyncError,
      })
    } else {
      closeLeadId = result.closeLeadId
      closeContactId = result.closeContactId
      await updateLeadSyncState(lead.id, {
        status: 'SUCCESS',
        externalLeadId: result.closeLeadId,
        externalContactId: result.closeContactId,
      })
    }
  } catch (error) {
    closeSyncStatus = 'PENDING_RETRY'
    closeSyncError = error instanceof Error ? error.message : 'Close sync failed'
    console.error('Sample intake Close sync error:', error)
    await updateLeadSyncState(lead.id, {
      status: 'PENDING_RETRY',
      errorMessage: closeSyncError,
    })
  }

  if (draft) {
    await updateSampleIntakeDraftCloseState(draft.id, {
      closeLeadId,
      closeContactId,
      closeSyncStatus,
      closeSyncError,
      closeSyncedAt: closeSyncStatus === 'SUCCESS' ? new Date() : null,
    })
  }

  return {
    closeLeadId,
    closeContactId,
    closeSyncStatus,
    closeSyncError,
  }
}

function buildIntakeRecord(
  payload: SampleIntakePayload,
  storedObject: ReturnType<typeof resolveStoredSampleIntakeObject>
) {
  const dataset = payload.dataset as SampleIntakeDatasetPayload

  return {
    ...payload,
    dataset,
    storageProvider: storedObject.storageProvider,
    storageBucket: storedObject.storageBucket,
    storageKey: storedObject.storageKey,
    storageRegion: storedObject.storageRegion,
    storageEndpoint: storedObject.storageEndpoint,
    localFilePath: storedObject.localFilePath,
    source: 'website_start_flow',
    intent: 'sample_upload',
    intentLevel: 'high',
    timestamp: new Date().toISOString(),
    approvalRequired: true,
    activationRequired: true,
  }
}

async function loadDraftFinalizeContext(body: FinalizeRequestBody | null) {
  const draftToken = normalizeString(body?.draftToken)
  if (!draftToken) {
    return null
  }

  const draft = await requireSampleIntakeDraftByToken(draftToken)
  return {
    draftToken,
    draft,
    payload: payloadFromDraft(draft),
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as FinalizeRequestBody | null
    const draftContext = await loadDraftFinalizeContext(body).catch(() => null)
    const payload = draftContext ? draftContext.payload : toSampleIntakePayload(body)
    const validationError = validatePayload(payload)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const dataset = payload.dataset as SampleIntakeDatasetPayload
    const storedObject = resolveStoredSampleIntakeObject({
      storageProvider: dataset.storageProvider || null,
      storageBucket: dataset.storageBucket || null,
      storageKey: dataset.storageKey,
      storageRegion: dataset.storageRegion || null,
      storageEndpoint: dataset.storageEndpoint || null,
      localFilePath: dataset.localFilePath || null,
    })

    try {
      await assertSampleIntakeObjectExists(storedObject)
    } catch (error) {
      console.error('Sample intake storage verification error:', error)
      return NextResponse.json(
        { error: 'We could not verify the uploaded CSV. Please upload the file again and retry.' },
        { status: 400 }
      )
    }

    const intakeRecord = buildIntakeRecord(payload, storedObject)
    const lead = await upsertLeadFromPayload({
      payload,
      draft: draftContext?.draft || null,
      storedObject,
    })

    await writeLocalMetadata({
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

      await writeLocalMetadata({
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

    const closeState = await syncLeadToCloseAndDraft(lead, draftContext?.draft || null)

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

    await writeLocalMetadata(enrichedIntakeRecord)

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
      message: 'Sample intake captured successfully',
      onboarding,
    })
  } catch (error) {
    console.error('Sample intake error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
