import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'

export async function GET() {
  try {
    // Check database
    await db.$queryRaw`SELECT 1`

    // Check Stripe
    await stripe.customers.list({ limit: 1 })

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      stripe: 'connected',
      environment: process.env.NODE_ENV,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}