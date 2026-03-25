import { NextRequest, NextResponse } from 'next/server'
import {
  SAMPLE_INTAKE_DRAFT_HEADER,
  clearSampleIntakeDraftDataset,
  serializeSampleIntakeDraft,
} from '@/lib/sample-intake-drafts'

export const runtime = 'nodejs'

function getDraftToken(request: NextRequest) {
  return request.headers.get(SAMPLE_INTAKE_DRAFT_HEADER)?.trim() || request.nextUrl.searchParams.get('draftToken')?.trim() || ''
}

export async function DELETE(request: NextRequest) {
  const draftToken = getDraftToken(request)
  if (!draftToken) {
    return NextResponse.json({ error: 'Draft token is required.' }, { status: 400 })
  }

  try {
    const draft = await clearSampleIntakeDraftDataset(draftToken)
    return NextResponse.json({
      draftToken,
      draft: serializeSampleIntakeDraft(draft),
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to remove dataset.' },
      { status: 400 }
    )
  }
}
