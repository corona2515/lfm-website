import type { Lead, SampleIntakeDraft } from '@prisma/client'

interface CloseLeadResponse {
  id: string
}

interface CloseContactResponse {
  id: string
}

interface SyncLeadToCloseOptions {
  statusId?: string
  existingLeadId?: string | null
  existingContactId?: string | null
}

interface CloseSyncTarget {
  company: string
  contactName: string
  email: string
  phone?: string | null
  note: string
  statusId?: string
  closeLeadId?: string | null
  closeContactId?: string | null
}

const CLOSE_API_BASE_URL = process.env.CLOSE_API_BASE_URL || 'https://api.close.com/api/v1'

function getCloseHeaders(apiKey: string) {
  const credentials = Buffer.from(`${apiKey}:`).toString('base64')

  return {
    Authorization: `Basic ${credentials}`,
    'Content-Type': 'application/json',
  }
}

async function closeRequest<T>(
  apiKey: string,
  path: string,
  input: {
    method?: 'POST' | 'PUT'
    body: Record<string, unknown>
  }
) {
  const response = await fetch(`${CLOSE_API_BASE_URL}${path}`, {
    method: input.method || 'POST',
    headers: getCloseHeaders(apiKey),
    body: JSON.stringify(input.body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Close API ${path} failed with ${response.status}: ${errorText}`)
  }

  return response.json() as Promise<T>
}

function buildCloseNote(lead: Lead) {
  const isDatasetUpload = lead.leadType === 'SAMPLE_UPLOAD'
  const isSamplePreview = lead.intent === 'sample_upload'
  const isHistoricalReport = lead.intent === 'historical_report'
  const lines = [
    isDatasetUpload ? 'High-intent dataset upload submission' : 'Website submission',
    `Lead type: ${lead.leadType}`,
    `Intent: ${lead.intent}`,
    `Submitted at: ${lead.submittedAt.toISOString()}`,
    `Contact: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company}`,
  ]

  if (isSamplePreview) {
    lines.splice(1, 0, 'Signal: Sample dataset uploaded and preview account requested')
    lines.splice(2, 0, 'OnPoint onboarding: Pending approval and activation; building created; dataset queued for admin review')
  } else if (isHistoricalReport) {
    lines.splice(1, 0, 'Signal: Historical BAS dataset uploaded for a one-time paid report request')
    lines.splice(2, 0, 'Fulfillment: Manual LeanFM historical review requested; no preview-account provisioning')
  } else if (isDatasetUpload) {
    lines.splice(1, 0, 'Signal: BAS dataset uploaded for manual review')
  }

  if (lead.role) lines.push(`Role: ${lead.role}`)
  if (lead.phone) lines.push(`Phone: ${lead.phone}`)
  if (lead.buildingName) lines.push(`Building name: ${lead.buildingName}`)
  if (lead.addressLine1 || lead.city || lead.state || lead.postalCode) {
    const address = [lead.addressLine1, lead.city, lead.state, lead.postalCode].filter(Boolean).join(', ')
    lines.push(`Building address: ${address}`)
  }
  if (lead.buildingType) lines.push(`Building type: ${lead.buildingType}`)
  if (lead.portfolioSize) lines.push(`Portfolio size: ${lead.portfolioSize}`)
  if (lead.message) lines.push(`Message: ${lead.message}`)

  return lines.join('\n')
}

function buildCloseDraftNote(draft: SampleIntakeDraft) {
  const lines = [
    'Abandoned dataset intake draft',
    `Last saved at: ${draft.lastSavedAt.toISOString()}`,
    `Last completed step: ${draft.progressStep}`,
    `Contact: ${draft.name || 'Unknown'}`,
    `Email: ${draft.email || 'Unknown'}`,
    `Company: ${draft.company || 'Unknown'}`,
  ]

  if (draft.phone) lines.push(`Phone: ${draft.phone}`)
  if (draft.role) lines.push(`Role: ${draft.role}`)
  if (draft.buildingName) lines.push(`Building name: ${draft.buildingName}`)
  if (draft.addressLine1 || draft.city || draft.state || draft.postalCode) {
    const address = [draft.addressLine1, draft.city, draft.state, draft.postalCode].filter(Boolean).join(', ')
    lines.push(`Building address: ${address}`)
  }
  if (draft.buildingType) lines.push(`Building type: ${draft.buildingType}`)
  if (draft.portfolioSize) lines.push(`Portfolio size: ${draft.portfolioSize}`)
  if (draft.basPlatform) lines.push(`BAS platform: ${draft.basPlatform}`)
  if (draft.primaryConcern) lines.push(`Primary concern: ${draft.primaryConcern}`)
  if (draft.datasetFileName) {
    lines.push(`Dataset uploaded: Yes (${draft.datasetFileName}, ${draft.datasetFileSizeBytes || 0} bytes)`)
  } else {
    lines.push('Dataset uploaded: No')
  }
  if (draft.notes) lines.push(`Notes: ${draft.notes}`)

  return lines.join('\n')
}

function getCloseStatusId(lead: Lead, options?: SyncLeadToCloseOptions) {
  if (options?.statusId) {
    return options.statusId
  }

  if (lead.leadType === 'SAMPLE_UPLOAD') {
    return process.env.CLOSE_SAMPLE_UPLOAD_STATUS_ID || process.env.CLOSE_LEAD_STATUS_ID
  }

  return process.env.CLOSE_LEAD_STATUS_ID
}

function getCloseDraftStatusId() {
  return process.env.CLOSE_SAMPLE_INTAKE_DRAFT_STATUS_ID
    || process.env.CLOSE_SAMPLE_UPLOAD_STATUS_ID
    || process.env.CLOSE_LEAD_STATUS_ID
}

async function upsertCloseLead(apiKey: string, input: CloseSyncTarget) {
  const body: Record<string, unknown> = {
    name: input.company,
  }

  if (input.statusId) {
    body.status_id = input.statusId
  }

  if (input.closeLeadId) {
    const updated = await closeRequest<CloseLeadResponse>(apiKey, `/lead/${input.closeLeadId}/`, {
      method: 'PUT',
      body,
    })
    return updated.id
  }

  const created = await closeRequest<CloseLeadResponse>(apiKey, '/lead/', {
    method: 'POST',
    body,
  })
  return created.id
}

async function upsertCloseContact(apiKey: string, input: CloseSyncTarget, closeLeadId: string) {
  const body: Record<string, unknown> = {
    lead_id: closeLeadId,
    name: input.contactName,
    emails: [{ email: input.email, type: 'office' }],
    ...(input.phone ? { phones: [{ phone: input.phone, type: 'office' }] } : {}),
  }

  if (input.closeContactId) {
    const updated = await closeRequest<CloseContactResponse>(apiKey, `/contact/${input.closeContactId}/`, {
      method: 'PUT',
      body,
    })
    return updated.id
  }

  const created = await closeRequest<CloseContactResponse>(apiKey, '/contact/', {
    method: 'POST',
    body,
  })
  return created.id
}

async function syncTargetToClose(input: CloseSyncTarget) {
  const closeApiKey = process.env.CLOSE_API_KEY

  if (!closeApiKey) {
    return {
      skipped: true as const,
      reason: 'missing_api_key',
    }
  }

  const closeLeadId = await upsertCloseLead(closeApiKey, input)
  const closeContactId = await upsertCloseContact(closeApiKey, input, closeLeadId)

  await closeRequest(closeApiKey, '/activity/note/', {
    method: 'POST',
    body: {
      lead_id: closeLeadId,
      note: input.note,
    },
  })

  return {
    skipped: false as const,
    closeLeadId,
    closeContactId,
  }
}

export async function syncLeadToClose(lead: Lead, options?: SyncLeadToCloseOptions) {
  return syncTargetToClose({
    company: lead.company,
    contactName: lead.name,
    email: lead.email,
    phone: lead.phone,
    note: buildCloseNote(lead),
    statusId: getCloseStatusId(lead, options),
    closeLeadId: options?.existingLeadId || lead.closeLeadId,
    closeContactId: options?.existingContactId || lead.closeContactId,
  })
}

export async function syncSampleIntakeDraftToClose(draft: SampleIntakeDraft) {
  return syncTargetToClose({
    company: draft.company || 'Unknown organization',
    contactName: draft.name || 'Unknown contact',
    email: draft.email || '',
    phone: draft.phone,
    note: buildCloseDraftNote(draft),
    statusId: getCloseDraftStatusId(),
    closeLeadId: draft.closeLeadId,
    closeContactId: draft.closeContactId,
  })
}
