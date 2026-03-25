import { NextRequest, NextResponse } from 'next/server'
import { createSampleIntakeUploadSession } from '@/lib/sample-intake-storage'
import { findSampleIntakeDraftByToken } from '@/lib/sample-intake-drafts'

export const runtime = 'nodejs'

interface UploadSessionRequestBody {
  fileName?: unknown
  contentType?: unknown
  draftToken?: unknown
}

function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as UploadSessionRequestBody | null
    const fileName = normalizeString(body?.fileName)
    const contentType = normalizeString(body?.contentType) || 'text/csv'
    const draftToken = normalizeString(body?.draftToken)

    if (!fileName) {
      return NextResponse.json({ error: 'File name is required.' }, { status: 400 })
    }

    if (!fileName.toLowerCase().endsWith('.csv')) {
      return NextResponse.json({ error: 'Dataset must be a .csv file.' }, { status: 400 })
    }

    const draft = draftToken ? await findSampleIntakeDraftByToken(draftToken) : null
    const session = await createSampleIntakeUploadSession({
      fileName,
      contentType,
      submissionId: draft?.submissionId,
    })

    return NextResponse.json({
      submissionId: session.submissionId,
      storageProvider: session.storageProvider,
      storageBucket: session.storageBucket,
      storageKey: session.storageKey,
      storageRegion: session.storageRegion,
      storageEndpoint: session.storageEndpoint,
      uploadTarget: {
        method: session.uploadMethod,
        url: session.uploadUrl,
        headers: session.uploadHeaders,
      },
    })
  } catch (error) {
    console.error('Sample upload session error:', error)
    return NextResponse.json(
      { error: 'We could not start the file upload right now. Please try again.' },
      { status: 500 }
    )
  }
}
