import { randomUUID } from 'crypto'
import { mkdir, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { syncLeadToClose } from '@/lib/close'
import { createLeadSyncEvent, createSampleUploadLead, updateLeadSyncState } from '@/lib/lead-store'
import { provisionSampleIntakeInOnPoint, serializeOnPointError, stringifyOnPointResponseBody } from '@/lib/onpoint'
import type { OnPointProvisioningResult } from '@/lib/onpoint'

export const runtime = 'nodejs'

const MAX_DATASET_BYTES = 25 * 1024 * 1024
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ACCEPTED_CSV_MIME_TYPES = new Set([
  '',
  'text/csv',
  'application/csv',
  'text/plain',
  'application/vnd.ms-excel',
  'application/octet-stream',
])

interface SampleIntakePayload {
  name: string
  email: string
  company: string
  role: string
  phone: string
  buildingType: string
  portfolioSize: string
  basPlatform: string
  primaryConcern: string
  notes: string
}

function getTextField(formData: FormData, field: string) {
  const value = formData.get(field)
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

function toSampleIntakePayload(formData: FormData): SampleIntakePayload {
  return {
    name: getTextField(formData, 'name'),
    email: getTextField(formData, 'email'),
    company: getTextField(formData, 'company'),
    role: getTextField(formData, 'role'),
    phone: getTextField(formData, 'phone'),
    buildingType: getTextField(formData, 'buildingType'),
    portfolioSize: getTextField(formData, 'portfolioSize'),
    basPlatform: getTextField(formData, 'basPlatform'),
    primaryConcern: getTextField(formData, 'primaryConcern'),
    notes: getTextField(formData, 'notes'),
  }
}

function validatePayload(payload: SampleIntakePayload, dataset: File | null): string | null {
  if (!payload.name || !payload.email || !payload.company) {
    return 'Missing required fields: name, email, and company are required.'
  }

  if (!payload.buildingType || !payload.portfolioSize) {
    return 'Missing required fields: building type and portfolio size are required.'
  }

  if (!EMAIL_REGEX.test(payload.email)) {
    return 'Invalid email format.'
  }

  if (!dataset) {
    return 'Dataset file is required.'
  }

  if (!dataset.name.toLowerCase().endsWith('.csv')) {
    return 'Dataset must be a .csv file.'
  }

  if (dataset.size > MAX_DATASET_BYTES) {
    return 'Dataset exceeds the 25MB limit.'
  }

  const mimeType = dataset.type.toLowerCase()
  if (!ACCEPTED_CSV_MIME_TYPES.has(mimeType)) {
    return 'Dataset file type must be CSV.'
  }

  return null
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
}

async function persistLocalSampleIntakeArtifacts(submissionId: string, datasetFile: File) {
  const tempDir = join(tmpdir(), 'leanfm-sample-intake')
  await mkdir(tempDir, { recursive: true })

  const safeFileName = sanitizeFileName(datasetFile.name)
  const localFilePath = join(tempDir, `${submissionId}-${safeFileName}`)
  await writeFile(localFilePath, Buffer.from(await datasetFile.arrayBuffer()))

  return {
    localFilePath,
    localMetadataPath: join(tempDir, `${submissionId}.json`),
  }
}

async function writeLocalMetadata(localMetadataPath: string, payload: Record<string, unknown>) {
  try {
    await writeFile(localMetadataPath, JSON.stringify(payload, null, 2))
  } catch (error) {
    console.error('Local metadata write error:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const incomingFormData = await request.formData()
    const payload = toSampleIntakePayload(incomingFormData)
    const dataset = incomingFormData.get('dataset')
    const datasetFile = dataset instanceof File ? dataset : null

    const validationError = validatePayload(payload, datasetFile)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    if (!datasetFile) {
      return NextResponse.json({ error: 'Dataset file is required.' }, { status: 400 })
    }

    const submissionId = randomUUID()
    const timestamp = new Date().toISOString()
    const webhookUrl = process.env.SAMPLE_INTAKE_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL

    let localFilePath = ''
    let localMetadataPath = ''

    try {
      const localArtifacts = await persistLocalSampleIntakeArtifacts(submissionId, datasetFile)
      localFilePath = localArtifacts.localFilePath
      localMetadataPath = localArtifacts.localMetadataPath
    } catch (error) {
      console.error('Local sample intake persistence error:', error)
      return NextResponse.json(
        { error: 'We could not process your dataset file right now. Please try again.' },
        { status: 500 }
      )
    }

    const intakeRecord = {
      ...payload,
      source: 'website_start_flow',
      intent: 'sample_upload',
      intentLevel: 'high',
      submissionId,
      timestamp,
      approvalRequired: true,
      activationRequired: true,
      datasetFileName: datasetFile.name,
      datasetFileSizeBytes: datasetFile.size,
      datasetMimeType: datasetFile.type || 'application/octet-stream',
      localFilePath,
    }

    const lead = await createSampleUploadLead({
      ...payload,
      notes: payload.notes,
      datasetFileName: datasetFile.name,
      datasetFileSizeBytes: datasetFile.size,
      datasetMimeType: datasetFile.type || 'application/octet-stream',
      localFilePath,
      submissionId,
    })

    if (localMetadataPath) {
      await writeLocalMetadata(localMetadataPath, {
        ...intakeRecord,
        leadId: lead.id,
      })
    }

    let onPointResult: OnPointProvisioningResult

    try {
      onPointResult = await provisionSampleIntakeInOnPoint({
        lead,
        datasetFile,
      })

      await createLeadSyncEvent(lead.id, {
        provider: 'onpoint',
        status: 'SUCCESS',
        payload: {
          submissionId,
          userId: onPointResult.userId,
          buildingId: onPointResult.buildingId,
          uploadId: onPointResult.uploadId,
          accountStatus: onPointResult.accountStatus,
          activationStatus: onPointResult.activationStatus,
          reviewStatus: onPointResult.reviewStatus,
          responseBody: stringifyOnPointResponseBody(onPointResult.responseBody),
        },
      })
    } catch (error) {
      const onPointError = serializeOnPointError(error)
      const syncStatus = onPointError.retryable ? 'PENDING_RETRY' : 'FAILED'

      await createLeadSyncEvent(lead.id, {
        provider: 'onpoint',
        status: syncStatus,
        errorMessage: onPointError.detail,
        payload: {
          submissionId,
          code: onPointError.code,
          userMessage: onPointError.userMessage,
          retryable: onPointError.retryable,
          responseBody: stringifyOnPointResponseBody(onPointError.responseBody),
        },
      })

      if (localMetadataPath) {
        await writeLocalMetadata(localMetadataPath, {
          ...intakeRecord,
          leadId: lead.id,
          onPointStatus: syncStatus,
          onPointCode: onPointError.code || '',
          onPointError: onPointError.detail,
        })
      }

      return NextResponse.json(
        {
          error: onPointError.userMessage,
          code: onPointError.code,
        },
        { status: onPointError.statusCode }
      )
    }

    let closeLeadId: string | null = null
    let closeContactId: string | null = null
    let closeSyncStatus: 'SUCCESS' | 'FAILED' | 'PENDING_RETRY' = 'SUCCESS'
    let closeSyncError: string | null = null

    try {
      const result = await syncLeadToClose(lead)
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

    const onboarding = {
      status: 'pending_review',
      userId: onPointResult.userId,
      buildingId: onPointResult.buildingId,
      uploadId: onPointResult.uploadId,
      accountStatus: onPointResult.accountStatus,
      activationStatus: onPointResult.activationStatus,
      reviewStatus: onPointResult.reviewStatus,
      closeSyncStatus: closeSyncStatus.toLowerCase(),
    }

    const enrichedIntakeRecord = {
      ...intakeRecord,
      leadId: lead.id,
      onPointUserId: onPointResult.userId,
      onPointBuildingId: onPointResult.buildingId,
      onPointUploadId: onPointResult.uploadId,
      onPointAccountStatus: onPointResult.accountStatus,
      onPointActivationStatus: onPointResult.activationStatus,
      onPointReviewStatus: onPointResult.reviewStatus,
      closeLeadId: closeLeadId || '',
      closeContactId: closeContactId || '',
      closeSyncStatus,
      closeSyncError: closeSyncError || '',
    }

    if (localMetadataPath) {
      await writeLocalMetadata(localMetadataPath, enrichedIntakeRecord)
    }

    let webhookDelivered = false
    if (webhookUrl) {
      try {
        const webhookFormData = new FormData()
        for (const [key, value] of Object.entries(enrichedIntakeRecord)) {
          webhookFormData.append(key, String(value))
        }
        webhookFormData.append('dataset', datasetFile, datasetFile.name)

        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          body: webhookFormData,
        })

        if (!webhookResponse.ok) {
          console.error('Sample intake webhook failed:', webhookResponse.status)
        } else {
          webhookDelivered = true
        }
      } catch (error) {
        console.error('Sample intake webhook error:', error)
      }
    }

    console.log('New sample intake:', JSON.stringify({ ...enrichedIntakeRecord, webhookDelivered }, null, 2))

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
