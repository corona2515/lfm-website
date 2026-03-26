import { createHmac, randomBytes, randomUUID } from 'crypto'
import type { LeadSyncStatus, SampleIntakeDraft, SampleIntakeDraftStatus } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { createAuditLog } from '@/lib/audit'
import { syncSampleIntakeDraftToClose } from '@/lib/close'
import { deleteSampleIntakeStoredObject, resolveStoredSampleIntakeObject } from '@/lib/sample-intake-storage'

export const SAMPLE_INTAKE_DRAFT_HEADER = 'x-leanfm-sample-intake-draft-token'
export const SAMPLE_INTAKE_CRON_HEADER = 'x-leanfm-sample-intake-cron'

export interface SampleIntakeDraftDatasetInput {
  fileName?: string | null
  fileSizeBytes?: number | null
  mimeType?: string | null
  storageProvider?: string | null
  storageBucket?: string | null
  storageKey?: string | null
  storageRegion?: string | null
  storageEndpoint?: string | null
  localFilePath?: string | null
}

export interface SampleIntakeDraftInput {
  progressStep: number
  name?: string | null
  email?: string | null
  company?: string | null
  role?: string | null
  phone?: string | null
  buildingName?: string | null
  addressLine1?: string | null
  city?: string | null
  state?: string | null
  postalCode?: string | null
  buildingType?: string | null
  portfolioSize?: string | null
  basPlatform?: string | null
  primaryConcern?: string | null
  notes?: string | null
  dataset?: SampleIntakeDraftDatasetInput | null
  clearDataset?: boolean
}

export interface SerializedSampleIntakeDraft {
  id: string
  status: SampleIntakeDraftStatus
  progressStep: number
  submissionId: string
  leadId: string | null
  lastSavedAt: string
  completedAt: string | null
  closeSyncStatus: LeadSyncStatus | null
  closeSyncError: string | null
  fields: {
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
  }
  dataset: null | {
    submissionId: string
    fileName: string
    fileSizeBytes: number
    mimeType: string
    storageProvider: string
    storageBucket: string | null
    storageKey: string
    storageRegion: string | null
    storageEndpoint: string | null
  }
}

function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeEmail(value: unknown) {
  return normalizeString(value).toLowerCase()
}

function normalizeNumber(value: unknown) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}

function normalizeStep(value: unknown) {
  const parsed = Number(value)
  if (parsed <= 1 || Number.isNaN(parsed)) {
    return 1
  }

  if (parsed >= 4) {
    return 4
  }

  return Math.trunc(parsed) as 1 | 2 | 3 | 4
}

function getDraftSecret() {
  const secret = process.env.SAMPLE_INTAKE_DRAFT_SECRET?.trim()
  if (secret) {
    return secret
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'leanfm-sample-intake-draft-dev-secret'
  }

  throw new Error('SAMPLE_INTAKE_DRAFT_SECRET is required in production')
}

export function getCronToken() {
  return process.env.SAMPLE_INTAKE_CRON_TOKEN?.trim() || getDraftSecret()
}

export function getSampleIntakeAbandonmentHours() {
  const value = Number(process.env.SAMPLE_INTAKE_ABANDONMENT_HOURS || 24)
  return Number.isFinite(value) && value > 0 ? value : 24
}

export function getSampleIntakeDraftRetentionDays() {
  const value = Number(process.env.SAMPLE_INTAKE_DRAFT_RETENTION_DAYS || 90)
  return Number.isFinite(value) && value > 0 ? value : 90
}

export function createSampleIntakeDraftToken() {
  return randomBytes(32).toString('hex')
}

export function hashSampleIntakeDraftToken(token: string) {
  return createHmac('sha256', getDraftSecret()).update(token).digest('hex')
}

export function isEligibleForServerDraft(input: SampleIntakeDraftInput) {
  return Boolean(
    normalizeString(input.name) &&
    normalizeEmail(input.email) &&
    normalizeString(input.company) &&
    normalizeString(input.phone)
  )
}

function draftFieldData(input: SampleIntakeDraftInput) {
  return {
    progressStep: normalizeStep(input.progressStep),
    name: normalizeString(input.name) || null,
    email: normalizeEmail(input.email) || null,
    company: normalizeString(input.company) || null,
    role: normalizeString(input.role) || null,
    phone: normalizeString(input.phone) || null,
    buildingName: normalizeString(input.buildingName) || null,
    addressLine1: normalizeString(input.addressLine1) || null,
    city: normalizeString(input.city) || null,
    state: normalizeString(input.state) || null,
    postalCode: normalizeString(input.postalCode) || null,
    buildingType: normalizeString(input.buildingType) || null,
    portfolioSize: normalizeString(input.portfolioSize) || null,
    basPlatform: normalizeString(input.basPlatform) || null,
    primaryConcern: normalizeString(input.primaryConcern) || null,
    notes: normalizeString(input.notes) || null,
  }
}

function datasetFieldData(input: SampleIntakeDraftInput) {
  if (input.clearDataset) {
    return {
      datasetFileName: null,
      datasetFileSizeBytes: null,
      datasetMimeType: null,
      storageProvider: null,
      storageBucket: null,
      storageKey: null,
      storageRegion: null,
      storageEndpoint: null,
      localFilePath: null,
    }
  }

  if (!input.dataset) {
    return {}
  }

  return {
    datasetFileName: normalizeString(input.dataset.fileName) || null,
    datasetFileSizeBytes: normalizeNumber(input.dataset.fileSizeBytes) || null,
    datasetMimeType: normalizeString(input.dataset.mimeType) || null,
    storageProvider: normalizeString(input.dataset.storageProvider) || null,
    storageBucket: normalizeString(input.dataset.storageBucket) || null,
    storageKey: normalizeString(input.dataset.storageKey) || null,
    storageRegion: normalizeString(input.dataset.storageRegion) || null,
    storageEndpoint: normalizeString(input.dataset.storageEndpoint) || null,
    localFilePath: normalizeString(input.dataset.localFilePath) || null,
  }
}

function draftTokenWhere(token: string) {
  return { draftTokenHash: hashSampleIntakeDraftToken(token) }
}

export function serializeSampleIntakeDraft(draft: SampleIntakeDraft): SerializedSampleIntakeDraft {
  return {
    id: draft.id,
    status: draft.status,
    progressStep: draft.progressStep,
    submissionId: draft.submissionId,
    leadId: draft.leadId,
    lastSavedAt: draft.lastSavedAt.toISOString(),
    completedAt: draft.completedAt ? draft.completedAt.toISOString() : null,
    closeSyncStatus: draft.closeSyncStatus,
    closeSyncError: draft.closeSyncError,
    fields: {
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
    },
    dataset: draft.datasetFileName && draft.storageKey ? {
      submissionId: draft.submissionId,
      fileName: draft.datasetFileName,
      fileSizeBytes: draft.datasetFileSizeBytes || 0,
      mimeType: draft.datasetMimeType || 'text/csv',
      storageProvider: draft.storageProvider || 'local',
      storageBucket: draft.storageBucket,
      storageKey: draft.storageKey,
      storageRegion: draft.storageRegion,
      storageEndpoint: draft.storageEndpoint,
    } : null,
  }
}

export async function findSampleIntakeDraftByToken(token: string) {
  const normalizedToken = normalizeString(token)
  if (!normalizedToken) {
    return null
  }

  return prisma.sampleIntakeDraft.findUnique({
    where: draftTokenWhere(normalizedToken),
  })
}

export async function requireSampleIntakeDraftByToken(token: string) {
  const draft = await findSampleIntakeDraftByToken(token)
  if (!draft) {
    throw new Error('Sample intake draft not found.')
  }

  return draft
}

export async function createOrUpdateSampleIntakeDraft(input: {
  draftToken?: string | null
  draft: SampleIntakeDraftInput
}) {
  if (!isEligibleForServerDraft(input.draft)) {
    throw new Error('Name, email, company, and phone are required before the draft can be saved server-side.')
  }

  const existingDraft = input.draftToken ? await findSampleIntakeDraftByToken(input.draftToken) : null
  const now = new Date()
  const fieldData = draftFieldData(input.draft)
  const datasetData = datasetFieldData(input.draft)

  if (input.draftToken && !existingDraft) {
    throw new Error('Sample intake draft not found.')
  }

  if (!existingDraft) {
    const draftToken = createSampleIntakeDraftToken()
    const createdDraft = await prisma.sampleIntakeDraft.create({
      data: {
        submissionId: randomUUID(),
        draftTokenHash: hashSampleIntakeDraftToken(draftToken),
        status: 'ACTIVE',
        lastSavedAt: now,
        ...fieldData,
        ...datasetData,
      },
    })

    await createAuditLog({
      action: 'SAMPLE_INTAKE_DRAFT_CREATED',
      entityType: 'sample_intake_draft',
      entityId: createdDraft.id,
      description: 'Sample intake draft created',
      metadata: {
        progressStep: createdDraft.progressStep,
        email: createdDraft.email,
      },
    })

    return {
      draft: createdDraft,
      draftToken,
      created: true,
    }
  }

  const updatedDraft = await prisma.sampleIntakeDraft.update({
    where: { id: existingDraft.id },
    data: {
      ...fieldData,
      ...datasetData,
      progressStep: fieldData.progressStep,
      lastSavedAt: now,
      status: existingDraft.status === 'COMPLETED' ? 'COMPLETED' : 'ACTIVE',
      abandonedAt: existingDraft.status === 'ABANDONED' ? null : existingDraft.abandonedAt,
      completedAt: existingDraft.status === 'COMPLETED' ? existingDraft.completedAt : null,
    },
  })

  return {
    draft: updatedDraft,
    draftToken: normalizeString(input.draftToken),
    created: false,
  }
}

export async function clearSampleIntakeDraftDataset(token: string) {
  const draft = await requireSampleIntakeDraftByToken(token)

  if (draft.storageKey) {
    try {
      await deleteSampleIntakeStoredObject(resolveStoredSampleIntakeObject(draft))
    } catch (error) {
      console.error('Sample intake draft dataset delete error:', error)
    }
  }

  return prisma.sampleIntakeDraft.update({
    where: { id: draft.id },
    data: {
      datasetFileName: null,
      datasetFileSizeBytes: null,
      datasetMimeType: null,
      storageProvider: null,
      storageBucket: null,
      storageKey: null,
      storageRegion: null,
      storageEndpoint: null,
      localFilePath: null,
      lastSavedAt: new Date(),
      status: draft.status === 'COMPLETED' ? 'COMPLETED' : 'ACTIVE',
      abandonedAt: draft.status === 'ABANDONED' ? null : draft.abandonedAt,
    },
  })
}

export async function linkLeadToSampleIntakeDraft(draftId: string, leadId: string) {
  return prisma.sampleIntakeDraft.update({
    where: { id: draftId },
    data: {
      leadId,
      lastSavedAt: new Date(),
    },
  })
}

export async function markSampleIntakeDraftCompleted(draftId: string, leadId: string) {
  const draft = await prisma.sampleIntakeDraft.update({
    where: { id: draftId },
    data: {
      status: 'COMPLETED',
      leadId,
      completedAt: new Date(),
      abandonedAt: null,
      lastSavedAt: new Date(),
    },
  })

  await createAuditLog({
    leadId,
    action: 'SAMPLE_INTAKE_DRAFT_COMPLETED',
    entityType: 'sample_intake_draft',
    entityId: draft.id,
    description: 'Sample intake draft completed',
    metadata: {
      leadId,
      submissionId: draft.submissionId,
    },
  })

  return draft
}

export async function updateSampleIntakeDraftCloseState(
  draftId: string,
  input: {
    closeLeadId?: string | null
    closeContactId?: string | null
    closeSyncStatus: LeadSyncStatus
    closeSyncError?: string | null
    closeSyncedAt?: Date | null
  }
) {
  return prisma.sampleIntakeDraft.update({
    where: { id: draftId },
    data: {
      closeLeadId: input.closeLeadId ?? undefined,
      closeContactId: input.closeContactId ?? undefined,
      closeSyncStatus: input.closeSyncStatus,
      closeSyncError: input.closeSyncError || null,
      closeSyncedAt: input.closeSyncedAt || null,
    },
  })
}

async function markDraftAbandoned(draft: SampleIntakeDraft) {
  const updatedDraft = await prisma.sampleIntakeDraft.update({
    where: { id: draft.id },
    data: {
      status: 'ABANDONED',
      abandonedAt: draft.abandonedAt || new Date(),
    },
  })

  if (!draft.abandonedAt) {
    await createAuditLog({
      action: 'SAMPLE_INTAKE_DRAFT_ABANDONED',
      entityType: 'sample_intake_draft',
      entityId: updatedDraft.id,
      description: 'Sample intake draft marked abandoned',
      metadata: {
        progressStep: updatedDraft.progressStep,
        email: updatedDraft.email,
      },
    })
  }

  return updatedDraft
}

async function markDraftCloseSynced(draft: SampleIntakeDraft, details: {
  closeLeadId: string
  closeContactId: string
}) {
  await createAuditLog({
    leadId: draft.leadId || null,
    action: 'SAMPLE_INTAKE_DRAFT_CLOSE_SYNCED',
    entityType: 'sample_intake_draft',
    entityId: draft.id,
    description: 'Sample intake draft synced to Close',
    metadata: {
      closeLeadId: details.closeLeadId,
      closeContactId: details.closeContactId,
      status: draft.status,
    },
  })
}

export async function processAbandonedSampleIntakeDrafts() {
  const now = new Date()
  const abandonmentCutoff = new Date(now.getTime() - getSampleIntakeAbandonmentHours() * 60 * 60 * 1000)
  const retentionCutoff = new Date(now.getTime() - getSampleIntakeDraftRetentionDays() * 24 * 60 * 60 * 1000)

  const processableDrafts = await prisma.sampleIntakeDraft.findMany({
    where: {
      leadId: null,
      OR: [
        {
          status: 'ACTIVE',
          lastSavedAt: { lte: abandonmentCutoff },
        },
        {
          status: 'ABANDONED',
          closeSyncedAt: null,
        },
        {
          status: 'ABANDONED',
          closeSyncStatus: { in: ['FAILED', 'PENDING_RETRY'] },
        },
      ],
    },
    orderBy: { lastSavedAt: 'asc' },
  })

  let abandonedCount = 0
  let closeSyncedCount = 0
  let retryCount = 0

  for (const draft of processableDrafts) {
    const abandonedDraft = await markDraftAbandoned(draft)
    abandonedCount += draft.abandonedAt ? 0 : 1

    try {
      const closeResult = await syncSampleIntakeDraftToClose(abandonedDraft)
      if (closeResult.skipped) {
        retryCount += 1
        await updateSampleIntakeDraftCloseState(abandonedDraft.id, {
          closeLeadId: abandonedDraft.closeLeadId,
          closeContactId: abandonedDraft.closeContactId,
          closeSyncStatus: 'PENDING_RETRY',
          closeSyncError: 'Close API key is not configured',
          closeSyncedAt: null,
        })
      } else {
        const syncedAt = new Date()

        await updateSampleIntakeDraftCloseState(abandonedDraft.id, {
          closeLeadId: closeResult.closeLeadId,
          closeContactId: closeResult.closeContactId,
          closeSyncStatus: 'SUCCESS',
          closeSyncError: null,
          closeSyncedAt: syncedAt,
        })
        await markDraftCloseSynced(abandonedDraft, closeResult)
        closeSyncedCount += 1
      }
    } catch (error) {
      retryCount += 1
      await updateSampleIntakeDraftCloseState(abandonedDraft.id, {
        closeLeadId: abandonedDraft.closeLeadId,
        closeContactId: abandonedDraft.closeContactId,
        closeSyncStatus: 'PENDING_RETRY',
        closeSyncError: error instanceof Error ? error.message : 'Close sync failed',
        closeSyncedAt: null,
      })
    }
  }

  const expiredDrafts = await prisma.sampleIntakeDraft.findMany({
    where: {
      status: 'ABANDONED',
      leadId: null,
      lastSavedAt: { lt: retentionCutoff },
    },
  })

  for (const draft of expiredDrafts) {
    if (draft.storageKey) {
      try {
        await deleteSampleIntakeStoredObject(resolveStoredSampleIntakeObject(draft))
      } catch (error) {
        console.error('Sample intake expired draft cleanup error:', error)
      }
    }
  }

  if (expiredDrafts.length > 0) {
    await prisma.sampleIntakeDraft.deleteMany({
      where: {
        id: {
          in: expiredDrafts.map((draft) => draft.id),
        },
      },
    })
  }

  return {
    processedCount: processableDrafts.length,
    abandonedCount,
    closeSyncedCount,
    retryCount,
    cleanedUpCount: expiredDrafts.length,
  }
}
