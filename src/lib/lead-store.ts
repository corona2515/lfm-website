import type { LeadStatus, LeadType, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { ContactLeadInput, DatasetUploadLeadInput, SampleLeadInput } from '@/lib/lead-types'
import { createAuditLog } from '@/lib/audit'

function defaultStatusForLeadType(leadType: LeadType): LeadStatus {
  return leadType === 'SAMPLE_UPLOAD' ? 'SAMPLE_REVIEW_IN_PROGRESS' : 'NEW'
}

export async function createContactLead(data: ContactLeadInput) {
  const lead = await prisma.lead.create({
    data: {
      leadType: 'CONTACT',
      status: defaultStatusForLeadType('CONTACT'),
      intent: data.intent,
      source: 'website_contact_form',
      name: data.name,
      email: data.email,
      company: data.company,
      role: data.role || null,
      phone: data.phone || null,
      buildingType: data.buildingType || null,
      portfolioSize: data.portfolioSize || null,
      message: data.message || null,
    },
  })

  await createAuditLog({
    action: 'LEAD_CREATED',
    entityType: 'lead',
    entityId: lead.id,
    leadId: lead.id,
    description: 'Lead captured from website contact form',
    metadata: { source: lead.source, intent: lead.intent },
  })

  return lead
}

function datasetUploadLeadFields(data: DatasetUploadLeadInput) {
  return {
    intent: data.intent,
    source: data.source,
    name: data.name,
    email: data.email,
    company: data.company,
    role: data.role || null,
    phone: data.phone,
    buildingName: data.buildingName,
    addressLine1: data.addressLine1,
    city: data.city,
    state: data.state,
    postalCode: data.postalCode,
    buildingType: data.buildingType,
    portfolioSize: data.portfolioSize,
    message: data.notes || null,
  }
}

function datasetUploadAssetFields(data: DatasetUploadLeadInput) {
  return {
    submissionId: data.submissionId,
    basPlatform: data.basPlatform || null,
    primaryConcern: data.primaryConcern || null,
    datasetFileName: data.datasetFileName,
    datasetFileSizeBytes: data.datasetFileSizeBytes,
    datasetMimeType: data.datasetMimeType,
    storageProvider: data.storageProvider || null,
    storageBucket: data.storageBucket || null,
    storageKey: data.storageKey || null,
    storageRegion: data.storageRegion || null,
    storageEndpoint: data.storageEndpoint || null,
    localFilePath: data.localFilePath || null,
  }
}

export async function createDatasetUploadLead(data: DatasetUploadLeadInput) {
  const lead = await prisma.lead.create({
    data: {
      leadType: 'SAMPLE_UPLOAD',
      status: defaultStatusForLeadType('SAMPLE_UPLOAD'),
      ...datasetUploadLeadFields(data),
      sampleIntakeAsset: {
        create: {
          ...datasetUploadAssetFields(data),
        },
      },
    },
    include: {
      sampleIntakeAsset: true,
    },
  })

  await createAuditLog({
    action: 'LEAD_CREATED',
    entityType: 'lead',
    entityId: lead.id,
    leadId: lead.id,
    description: data.auditDescription || 'Lead captured from dataset upload intake',
    metadata: { source: lead.source, intent: lead.intent },
  })

  return lead
}

export async function upsertDatasetUploadLead(input: {
  leadId?: string | null
  data: DatasetUploadLeadInput
}) {
  if (!input.leadId) {
    return createDatasetUploadLead(input.data)
  }

  return prisma.lead.update({
    where: { id: input.leadId },
    data: {
      ...datasetUploadLeadFields(input.data),
      sampleIntakeAsset: {
        upsert: {
          create: {
            ...datasetUploadAssetFields(input.data),
          },
          update: {
            ...datasetUploadAssetFields(input.data),
          },
        },
      },
    },
    include: {
      sampleIntakeAsset: true,
    },
  })
}

export async function createSampleUploadLead(data: SampleLeadInput) {
  return createDatasetUploadLead({
    ...data,
    intent: 'sample_upload',
    source: 'website_start_flow',
    auditDescription: 'Lead captured from sample dataset intake',
  })
}

export async function updateLeadSyncState(
  leadId: string,
  input: {
    status: 'SUCCESS' | 'FAILED' | 'PENDING_RETRY'
    externalLeadId?: string | null
    externalContactId?: string | null
    errorMessage?: string | null
    payload?: Prisma.InputJsonValue
  }
) {
  const now = new Date()

  await prisma.$transaction([
    prisma.lead.update({
      where: { id: leadId },
      data: {
        closeLeadId: input.externalLeadId || undefined,
        closeContactId: input.externalContactId || undefined,
        lastSyncAt: now,
        lastSyncError: input.errorMessage || null,
      },
    }),
    prisma.leadSyncEvent.create({
      data: {
        leadId,
        provider: 'close',
        status: input.status,
        externalLeadId: input.externalLeadId || null,
        externalContactId: input.externalContactId || null,
        errorMessage: input.errorMessage || null,
        payload: input.payload,
      },
    }),
  ])
}

export async function createLeadSyncEvent(
  leadId: string,
  input: {
    provider: string
    status: 'SUCCESS' | 'FAILED' | 'PENDING_RETRY'
    externalLeadId?: string | null
    externalContactId?: string | null
    errorMessage?: string | null
    payload?: Prisma.InputJsonValue
  }
) {
  return prisma.leadSyncEvent.create({
    data: {
      leadId,
      provider: input.provider,
      status: input.status,
      externalLeadId: input.externalLeadId || null,
      externalContactId: input.externalContactId || null,
      errorMessage: input.errorMessage || null,
      payload: input.payload,
    },
  })
}
