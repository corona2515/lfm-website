import { NextRequest, NextResponse } from 'next/server'

interface LeadData {
  name: string
  email: string
  company: string
  role?: string
  buildingType?: string
  portfolioSize?: string
  message?: string
  intent: string
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.company || !data.intent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Prepare lead payload
    const lead = {
      ...data,
      timestamp: new Date().toISOString(),
      source: 'website',
    }

    // If webhook URL is configured, forward the lead
    const webhookUrl = process.env.LEAD_WEBHOOK_URL

    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(lead),
        })

        if (!webhookResponse.ok) {
          console.error('Webhook failed:', webhookResponse.status)
          // Still return success to user - we'll handle webhook failures internally
        }
      } catch (webhookError) {
        console.error('Webhook error:', webhookError)
        // Still return success to user - we'll handle webhook failures internally
      }
    }

    // Always log to server console for backup
    console.log('New lead:', JSON.stringify(lead, null, 2))

    return NextResponse.json({
      success: true,
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

// Return 405 for other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
