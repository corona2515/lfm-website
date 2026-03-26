import { NextRequest, NextResponse } from 'next/server'
import { persistLocalSampleIntakeUpload } from '@/lib/sample-intake-storage'

export const runtime = 'nodejs'

function isValidStorageKey(submissionId: string, storageKey: string) {
  return storageKey.startsWith(`sample-intake/${submissionId}/`)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { submissionId: string } }
) {
  const storageKey = request.nextUrl.searchParams.get('storageKey')?.trim() || ''
  if (!storageKey || !isValidStorageKey(params.submissionId, storageKey)) {
    return NextResponse.json({ error: 'Invalid upload session.' }, { status: 400 })
  }

  const payload = await request.arrayBuffer()
  if (!payload.byteLength) {
    return NextResponse.json({ error: 'File payload is empty.' }, { status: 400 })
  }

  try {
    await persistLocalSampleIntakeUpload(storageKey, payload)
    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('Local sample upload persistence error:', error)
    return NextResponse.json(
      { error: 'We could not store the uploaded file right now. Please try again.' },
      { status: 500 }
    )
  }
}
