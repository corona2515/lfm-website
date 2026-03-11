import { randomUUID } from 'crypto'
import { mkdir, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

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

    if (process.env.NODE_ENV !== 'production') {
      try {
        const tempDir = join(tmpdir(), 'leanfm-sample-intake')
        await mkdir(tempDir, { recursive: true })

        const safeFileName = sanitizeFileName(datasetFile.name)
        localFilePath = join(tempDir, `${submissionId}-${safeFileName}`)
        await writeFile(localFilePath, Buffer.from(await datasetFile.arrayBuffer()))

        localMetadataPath = join(tempDir, `${submissionId}.json`)
      } catch (error) {
        console.error('Local fallback write error:', error)
      }
    }

    const intakeRecord = {
      ...payload,
      intent: 'sample_upload',
      source: 'website_start_flow',
      submissionId,
      timestamp,
      datasetFileName: datasetFile.name,
      datasetFileSizeBytes: datasetFile.size,
      datasetMimeType: datasetFile.type || 'application/octet-stream',
      localFilePath,
    }

    if (localMetadataPath) {
      try {
        await writeFile(localMetadataPath, JSON.stringify(intakeRecord, null, 2))
      } catch (error) {
        console.error('Local metadata write error:', error)
      }
    }

    let webhookDelivered = false
    if (webhookUrl) {
      try {
        const webhookFormData = new FormData()
        for (const [key, value] of Object.entries(intakeRecord)) {
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

    console.log('New sample intake:', JSON.stringify({ ...intakeRecord, webhookDelivered }, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Sample intake captured successfully',
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
