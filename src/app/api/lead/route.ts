import { NextRequest, NextResponse } from 'next/server'
import { createContactLead, updateLeadSyncState } from '@/lib/lead-store'
import { syncLeadToClose } from '@/lib/close'

interface LeadData {
  name: string
  email: string
  company: string
  role?: string
  phone?: string
  buildingType?: string
  portfolioSize?: string
  message?: string
  intent: string
}

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json()

    if (!data.name || !data.email || !data.company || !data.intent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const lead = await createContactLead(data)

    try {
      const result = await syncLeadToClose(lead)
      if (result.skipped) {
        await updateLeadSyncState(lead.id, {
          status: 'PENDING_RETRY',
          errorMessage: 'Close API key is not configured',
        })
      } else {
        await updateLeadSyncState(lead.id, {
          status: 'SUCCESS',
          externalLeadId: result.closeLeadId,
          externalContactId: result.closeContactId,
        })
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Close sync failed'
      console.error('Lead Close sync error:', error)
      await updateLeadSyncState(lead.id, {
        status: 'FAILED',
        errorMessage: message,
      })
    }

    const leadPayload = {
      ...data,
      leadId: lead.id,
      timestamp: lead.submittedAt.toISOString(),
      source: 'website',
    }

    const webhookUrl = process.env.LEAD_WEBHOOK_URL
    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leadPayload),
        })

        if (!webhookResponse.ok) {
          console.error('Webhook failed:', webhookResponse.status)
        }
      } catch (webhookError) {
        console.error('Webhook error:', webhookError)
      }
    }

    console.log('New lead:', JSON.stringify(leadPayload, null, 2))

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Lead captured successfully',
    })
  } catch (error) {
    console.error('Lead capture error:', error)
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
