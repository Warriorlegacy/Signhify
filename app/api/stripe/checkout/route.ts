import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { priceId, customerEmail, successUrl, cancelUrl } = await request.json()

    if (!priceId || !customerEmail) {
      return NextResponse.json(
        { error: 'priceId and customerEmail are required' },
        { status: 400 }
      )
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${request.headers.get('origin')}/gymflow?success=true`,
      cancel_url: cancelUrl || `${request.headers.get('origin')}/gymflow?canceled=true`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      locale: 'en',
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}