import { NextRequest, NextResponse } from 'next/server'
import {
  SAMPLE_INTAKE_CRON_HEADER,
  getCronToken,
  processAbandonedSampleIntakeDrafts,
} from '@/lib/sample-intake-drafts'

export const runtime = 'nodejs'

function isAuthorized(request: NextRequest) {
  const token = getCronToken()
  const headerValue = request.headers.get(SAMPLE_INTAKE_CRON_HEADER)?.trim() || request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')

  return Boolean(token && headerValue === token)
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await processAbandonedSampleIntakeDrafts()
    return NextResponse.json({
      success: true,
      ...result,
    })
  } catch (error) {
    console.error('Sample intake abandonment processor error:', error)
    return NextResponse.json(
      { error: 'Failed to process abandoned sample-intake drafts.' },
      { status: 500 }
    )
  }
}
