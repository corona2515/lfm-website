import { writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import type { Lead, SampleIntakeDraft } from '@prisma/client'
import { syncLeadToClose } from '@/lib/close'
import type { DatasetUploadLeadInput } from '@/lib/lead-types'
import { updateLeadSyncState } from '@/lib/lead-store'
import { updateSampleIntakeDraftCloseState } from '@/lib/sample-intake-drafts'
import { assertSampleIntakeObjectExists, resolveStoredSampleIntakeObject } from '@/lib/sample-intake-storage'

const ACCEPTED_CSV_MIME_TYPES = new Set([
  '',
  'text/csv',
  'application/csv',
  'text/plain',
  'application/vnd.ms-excel',
  'application/octet-stream',
])

export interface DatasetIntakeDatasetPayload {
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

export interface DatasetIntakePayload {
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
  dataset: DatasetIntakeDatasetPayload | null
}

export interface DatasetIntakeFinalizeRequestBody {
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

export function normalizeString(value: unknown) {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  return ''
}

export function normalizeNumber(value: unknown) {
  const parsedValue = Number(value)
  return Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : 0
}

export function toDatasetIntakePayload(body: DatasetIntakeFinalizeRequestBody | null): DatasetIntakePayload {
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

export function payloadFromSampleIntakeDraft(draft: SampleIntakeDraft): DatasetIntakePayload {
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

export function validateDatasetIntakePayload(payload: DatasetIntakePayload): string | null {
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

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
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

export async function resolveVerifiedDatasetStoredObject(dataset: DatasetIntakeDatasetPayload) {
  const storedObject = resolveStoredSampleIntakeObject({
    storageProvider: dataset.storageProvider || null,
    storageBucket: dataset.storageBucket || null,
    storageKey: dataset.storageKey,
    storageRegion: dataset.storageRegion || null,
    storageEndpoint: dataset.storageEndpoint || null,
    localFilePath: dataset.localFilePath || null,
  })

  await assertSampleIntakeObjectExists(storedObject)
  return storedObject
}

export async function writeDatasetIntakeMetadata(payload: Record<string, unknown>) {
  try {
    const submissionId = normalizeString(payload.submissionId) || 'dataset-intake'
    const metadataPath = join(tmpdir(), 'leanfm-sample-intake', `${submissionId}.json`)
    await writeFile(metadataPath, JSON.stringify(payload, null, 2))
  } catch (error) {
    console.error('Dataset intake metadata write error:', error)
  }
}

export function buildDatasetIntakeRecord(input: {
  payload: DatasetIntakePayload
  storedObject: ReturnType<typeof resolveStoredSampleIntakeObject>
  source: string
  intent: string
  approvalRequired?: boolean
  activationRequired?: boolean
}) {
  const dataset = input.payload.dataset as DatasetIntakeDatasetPayload

  return {
    ...input.payload,
    dataset,
    storageProvider: input.storedObject.storageProvider,
    storageBucket: input.storedObject.storageBucket,
    storageKey: input.storedObject.storageKey,
    storageRegion: input.storedObject.storageRegion,
    storageEndpoint: input.storedObject.storageEndpoint,
    localFilePath: input.storedObject.localFilePath,
    source: input.source,
    intent: input.intent,
    intentLevel: 'high',
    timestamp: new Date().toISOString(),
    approvalRequired: Boolean(input.approvalRequired),
    activationRequired: Boolean(input.activationRequired),
  }
}

export function buildDatasetUploadLeadInput(input: {
  payload: DatasetIntakePayload
  storedObject: ReturnType<typeof resolveStoredSampleIntakeObject>
  intent: string
  source: string
  auditDescription: string
}): DatasetUploadLeadInput {
  const dataset = input.payload.dataset as DatasetIntakeDatasetPayload

  return {
    intent: input.intent,
    source: input.source,
    auditDescription: input.auditDescription,
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
    storageProvider: input.storedObject.storageProvider || undefined,
    storageBucket: input.storedObject.storageBucket || undefined,
    storageKey: input.storedObject.storageKey,
    storageRegion: input.storedObject.storageRegion || undefined,
    storageEndpoint: input.storedObject.storageEndpoint || undefined,
    localFilePath: input.storedObject.localFilePath || undefined,
    submissionId: dataset.submissionId,
  }
}

export async function syncDatasetUploadLeadToCloseAndDraft(
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
    console.error('Dataset intake Close sync error:', error)
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
