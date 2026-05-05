import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'

const payloadSchema = z.object({
  email: z.string().trim().email(),
  source: z.string().trim().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = payloadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Enter a valid work email.' }, { status: 400 })
    }

    const submission = {
      ...parsed.data,
      source: parsed.data.source || 'k12_lead_magnet',
      submittedAt: new Date().toISOString(),
    }

    // TODO: pipe to Smartlead campaign 3241885 nurture variant.
    console.log('K-12 lead magnet request:', JSON.stringify(submission, null, 2))

    return NextResponse.json({
      success: true,
      pdfUrl: '/k12/k12-facilities-directors-guide.pdf',
    })
  } catch (error) {
    console.error('Lead magnet route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
