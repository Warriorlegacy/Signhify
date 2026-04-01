import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, business, source } = body

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Check for existing lead
    const existing = await db.lead.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json(
        { message: 'Lead already exists', lead: existing },
        { status: 200 }
      )
    }

    // Get metadata from headers
    const userAgent = request.headers.get('user-agent')
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')

    // Create lead
    const lead = await db.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        business: business || null,
        source: source || 'unknown',
        metadata: {
          userAgent,
          ip,
          timestamp: new Date().toISOString(),
        },
      },
    })

    // TODO: Send WhatsApp notification via Twilio
    // await sendWhatsAppNotification(lead)

    // TODO: Send confirmation email via Resend
    // await sendConfirmationEmail(lead)

    return NextResponse.json(
      { success: true, message: 'Lead captured successfully', lead },
      { status: 201 }
    )
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}