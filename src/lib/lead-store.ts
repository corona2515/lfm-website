import type { LeadStatus, LeadType, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { ContactLeadInput, SampleLeadInput } from '@/lib/lead-types'
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

export async function createSampleUploadLead(data: SampleLeadInput) {
  const lead = await prisma.lead.create({
    data: {
      leadType: 'SAMPLE_UPLOAD',
      status: defaultStatusForLeadType('SAMPLE_UPLOAD'),
      intent: 'sample_upload',
      source: 'website_start_flow',
      name: data.name,
      email: data.email,
      company: data.company,
      role: data.role || null,
      phone: data.phone || null,
      buildingType: data.buildingType,
      portfolioSize: data.portfolioSize,
      message: data.notes || null,
      sampleIntakeAsset: {
        create: {
          submissionId: data.submissionId,
          basPlatform: data.basPlatform || null,
          primaryConcern: data.primaryConcern || null,
          datasetFileName: data.datasetFileName,
          datasetFileSizeBytes: data.datasetFileSizeBytes,
          datasetMimeType: data.datasetMimeType,
          localFilePath: data.localFilePath || null,
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
    description: 'Lead captured from sample dataset intake',
    metadata: { source: lead.source, intent: lead.intent },
  })

  return lead
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
