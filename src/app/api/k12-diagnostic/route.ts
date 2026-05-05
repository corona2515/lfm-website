import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'

const payloadSchema = z.object({
  email: z.string().trim().email(),
  district: z.string().trim().min(2),
  role: z.string().trim().min(2),
  sqft: z.number().int().positive(),
  school_count: z.number().int().positive().nullable().optional(),
  bas: z.string().trim().min(2),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = payloadSchema.safeParse(body)

    if (!parsed.success) {
      const issue = parsed.error.issues[0]
      return NextResponse.json(
        {
          error: issue?.message || 'Invalid diagnostic request.',
          field: issue?.path.join('.') || 'form',
        },
        { status: 400 }
      )
    }

    const submission = {
      ...parsed.data,
      source: 'k12_diagnostic_form',
      submittedAt: new Date().toISOString(),
    }

    // TODO: pipe to Close CRM via webhook later.
    console.log('K-12 diagnostic request:', JSON.stringify(submission, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('K-12 diagnostic route error:', error)
    return NextResponse.json({ error: 'Internal server error', field: 'form' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
