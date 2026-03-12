import type { Lead } from '@prisma/client'

interface CloseLeadResponse {
  id: string
}

interface CloseContactResponse {
  id: string
}

interface SyncLeadToCloseOptions {
  statusId?: string
}

const CLOSE_API_BASE_URL = process.env.CLOSE_API_BASE_URL || 'https://api.close.com/api/v1'

function getCloseHeaders(apiKey: string) {
  const credentials = Buffer.from(`${apiKey}:`).toString('base64')

  return {
    Authorization: `Basic ${credentials}`,
    'Content-Type': 'application/json',
  }
}

async function closeRequest<T>(apiKey: string, path: string, body: Record<string, unknown>) {
  const response = await fetch(`${CLOSE_API_BASE_URL}${path}`, {
    method: 'POST',
    headers: getCloseHeaders(apiKey),
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Close API ${path} failed with ${response.status}: ${errorText}`)
  }

  return response.json() as Promise<T>
}

function buildCloseNote(lead: Lead) {
  const isSampleUpload = lead.leadType === 'SAMPLE_UPLOAD'
  const lines = [
    isSampleUpload ? 'High-intent website submission' : 'Website submission',
    `Lead type: ${lead.leadType}`,
    `Intent: ${lead.intent}`,
    `Submitted at: ${lead.submittedAt.toISOString()}`,
    `Contact: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company}`,
  ]

  if (isSampleUpload) {
    lines.splice(1, 0, 'Signal: Sample dataset uploaded and preview account requested')
    lines.splice(2, 0, 'OnPoint onboarding: Pending approval and activation; building created; dataset queued for admin review')
  }

  if (lead.role) lines.push(`Role: ${lead.role}`)
  if (lead.phone) lines.push(`Phone: ${lead.phone}`)
  if (lead.buildingType) lines.push(`Building type: ${lead.buildingType}`)
  if (lead.portfolioSize) lines.push(`Portfolio size: ${lead.portfolioSize}`)
  if (lead.message) lines.push(`Message: ${lead.message}`)

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

export async function syncLeadToClose(lead: Lead, options?: SyncLeadToCloseOptions) {
  const closeApiKey = process.env.CLOSE_API_KEY

  if (!closeApiKey) {
    return {
      skipped: true as const,
      reason: 'missing_api_key',
    }
  }

  const closeLeadPayload: Record<string, unknown> = {
    name: lead.company,
  }

  const closeStatusId = getCloseStatusId(lead, options)
  if (closeStatusId) {
    closeLeadPayload.status_id = closeStatusId
  }

  const closeLead = await closeRequest<CloseLeadResponse>(closeApiKey, '/lead/', closeLeadPayload)
  const closeContact = await closeRequest<CloseContactResponse>(closeApiKey, '/contact/', {
    lead_id: closeLead.id,
    name: lead.name,
    emails: [{ email: lead.email, type: 'office' }],
    ...(lead.phone ? { phones: [{ phone: lead.phone, type: 'office' }] } : {}),
  })

  await closeRequest(closeApiKey, '/activity/note/', {
    lead_id: closeLead.id,
    note: buildCloseNote(lead),
  })

  return {
    skipped: false as const,
    closeLeadId: closeLead.id,
    closeContactId: closeContact.id,
  }
}
