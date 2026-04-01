import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.trial_will_end':
        // Send trial ending email
        await handleTrialWillEnd(event.data.object as Stripe.Subscription)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerEmail = session.customer_email
  const subscription = session.subscription as Stripe.Subscription

  if (!customerEmail || !subscription) {
    console.error('Missing customer email or subscription')
    return
  }

  // Create or update customer
  const customer = await db.customer.upsert({
    where: { email: customerEmail },
    update: {
      stripeCustomerId: session.customer as string,
      name: session.customer_details?.name || null,
    },
    create: {
      email: customerEmail,
      stripeCustomerId: session.customer as string,
      name: session.customer_details?.name || null,
    },
  })

  // Get price ID
  const priceId = subscription.items.data[0].price.id

  // Create subscription record
  await db.subscription.upsert({
    where: { stripeSubscriptionId: subscription.id },
    update: {
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      canceledAt: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000)
        : null,
    },
    create: {
      stripeSubscriptionId: subscription.id,
      customerId: customer.id,
      status: subscription.status,
      priceId,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  })

  console.log(`Subscription created/updated for ${customerEmail}`)
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  await db.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      canceledAt: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000)
        : null,
    },
  })

  console.log(`Subscription updated: ${subscription.id}`)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await db.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: subscription.status,
      canceledAt: new Date(),
    },
  })

  console.log(`Subscription deleted: ${subscription.id}`)
}

async function handleTrialWillEnd(subscription: Stripe.Subscription) {
  // Get customer email
  const subscriptionRecord = await db.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
    include: { customer: true },
  })

  if (subscriptionRecord?.customer.email) {
    // TODO: Send trial ending email via Resend
    console.log(`Trial ending soon for: ${subscriptionRecord.customer.email}`)
  }
}