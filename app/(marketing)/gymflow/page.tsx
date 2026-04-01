'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/animated-counter'


const stats = [
  { value: 10000, label: 'Members Managed', suffix: '+' },
  { value: 99.9, label: 'Uptime %', suffix: '%' },
  { value: 50, label: 'Gyms Onboarded', suffix: '+' },
  { value: 14, label: 'Day Free Trial', suffix: ' days' },
]

const features = [
  {
    icon: '👥',
    title: 'Member Management',
    description: 'Track memberships, check-ins, progress, and automate renewals. Never lose track of a member again.',
    color: 'from-green-400 to-green-600',
  },
  {
    icon: '💳',
    title: 'Payments & Subscriptions',
    description: 'Automated recurring billing with Stripe. Handle one-time payments, plans, and failed payment retries.',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'Real-time insights on revenue, churn, member engagement. Make data-driven decisions with beautiful charts.',
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: '📱',
    title: 'Mobile + Web Sync',
    description: 'Members access via iOS/Android app. Staff tools on web. Everything syncs in real-time.',
    color: 'from-orange-400 to-orange-600',
  },
  {
    icon: '🤖',
    title: 'AI Automation',
    description: 'AI-powered workout suggestions, retention alerts, churn prediction. Let AI handle the heavy lifting.',
    color: 'from-pink-400 to-pink-600',
  },
  {
    icon: '⚡',
    title: 'Instant Setup',
    description: 'Get started in minutes, not weeks. Import your existing member list and go live immediately.',
    color: 'from-cyan-400 to-cyan-600',
  },
]

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Owner, FitZone Gym Delhi',
    content: 'Gymflow cut our admin work by 70%. We went from manual Excel sheets to fully automated membership management in 3 days. Best investment we made.',
    avatar: '👨‍💼',
  },
  {
    name: 'Priya Mehta',
    role: 'Manager, Wellness Hub Mumbai',
    content: 'The mobile app is a game-changer. Our members love checking in, booking classes, and tracking progress. Our retention rate improved by 25% in 2 months.',
    avatar: '👩‍💻',
  },
  {
    name: 'Arun Kumar',
    role: 'Founder, Gold\'s Gym franchise',
    content: 'Payment collection used to be a nightmare. Now it\'s fully automated with Stripe. Cash flow improved dramatically. Worth every rupee.',
    avatar: '🧔',
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '₹999',
    period: '/month',
    description: 'Perfect for small gyms getting started',
    features: ['Up to 100 members', 'Basic analytics', 'Email support', 'Mobile app access', ' payment processing'],
    priceId: 'price_starter', // Replace with actual Stripe price ID
    popular: false,
  },
  {
    name: 'Pro',
    price: '₹2,499',
    period: '/month',
    description: 'For growing gyms ready to scale',
    features: ['Unlimited members', 'Advanced analytics', 'Priority support', 'Custom branding', 'API access', 'Automated marketing'],
    priceId: 'price_pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For multi-location chains and franchises',
    features: ['Everything in Pro', 'White-label app', 'Custom integrations', 'Dedicated account manager', 'SLA guarantee', 'On-premise option'],
    priceId: 'price_enterprise',
    popular: false,
  },
]

export default function GymflowPage() {
  return (
    <div className="min-h-screen bg-dark-950">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-sm font-semibold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              Taking 10 New Gyms This Month
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Run Your Gym{' '}
              <span className="bg-gradient-to-r from-brand-400 via-brand-500 to-blue-500 bg-clip-text text-transparent">
                Like a Tech Company
              </span>
            </h1>

            <p className="text-xl text-dark-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              All-in-one AI-powered gym management platform for modern fitness businesses.
              Automate member management, payments, analytics, and mobile app. Scale without the headache.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-glow">
                🚀 Start 14-Day Free Trial
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                📹 Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-dark-800/50 backdrop-blur border border-dark-700 rounded-2xl p-6"
                >
                  <div className="text-4xl font-bold text-brand-500 mb-2 font-mono">
                    <AnimatedCounter value={stat.value} />{stat.suffix}
                  </div>
                  <div className="text-dark-300 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-dark-900/50">
        <div className="container mx-auto">
          <div className="section-head">
            <div className="tag">Features</div>
            <h2>Everything You Need to <span className="bg-gradient-to-r from-brand-400 to-blue-500 bg-clip-text text-transparent">Scale Your Gym</span></h2>
            <p>Powerful features designed to automate operations, increase revenue, and delight your members.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-dark-300 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="section-head">
            <div className="tag">Product</div>
            <h2>See Gymflow <span className="bg-gradient-to-r from-brand-400 to-blue-500 bg-clip-text text-transparent">In Action</span></h2>
            <p>Beautiful, intuitive interface designed for gym owners and members alike.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Card className="p-8 text-center bg-gradient-to-b from-dark-800 to-dark-900 border-2 border-brand-500/20">
              <div className="text-8xl mb-6">💻📱</div>
              <h3 className="text-2xl font-bold mb-4">Interactive Demo</h3>
              <p className="text-dark-300 mb-8 max-w-2xl mx-auto">
                Experience the full power of Gymflow. Our web dashboard gives you complete control,
                while the mobile app lets members check in, book classes, and track progress on the go.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="https://gymflow-saas.vercel.app" target="_blank" rel="noopener noreferrer">
                    🌐 Open Web App
                  </a>
                </Button>
                <Button variant="outline" size="lg">
                  📱 Download APK
                </Button>
              </div>
              <p className="text-dark-400 text-sm mt-6">
                Available on web, iOS, and Android
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-dark-900/50">
        <div className="container mx-auto">
          <div className="section-head">
            <div className="tag">Pricing</div>
            <h2>Simple, Transparent <span className="bg-gradient-to-r from-brand-400 to-blue-500 bg-clip-text text-transparent">Pricing</span></h2>
            <p>Choose the plan that fits your gym. All plans include 14-day free trial.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`h-full flex flex-col relative ${
                    plan.popular
                      ? 'border-brand-500 border-2 scale-105 shadow-glow'
                      : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-dark-400">{plan.period}</span>
                    </div>
                    <p className="text-dark-300 text-sm mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <span className="text-brand-500 text-lg">✓</span>
                        <span className="text-dark-200">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.popular ? 'primary' : 'outline'}
                    size="lg"
                    onClick={() => {
                      // Redirect to Stripe checkout
                      window.location.href = `/api/stripe/checkout?priceId=${plan.priceId}`
                    }}
                  >
                    Start Free Trial
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="section-head">
            <div className="tag">Testimonials</div>
            <h2>Loved by <span className="bg-gradient-to-r from-brand-400 to-blue-500 bg-clip-text text-transparent">Gym Owners</span></h2>
            <p>Join hundreds of gyms already scaling with Gymflow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <div className="text-5xl mb-4">{testimonial.avatar}</div>
                  <p className="text-dark-200 italic mb-6">"{testimonial.content}"</p>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-dark-400 text-sm">{testimonial.role}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 via-transparent to-blue-500/20" />
        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Start Scaling Your Gym <span className="bg-gradient-to-r from-brand-400 to-blue-500 bg-clip-text text-transparent">Today</span>
            </h2>
            <p className="text-xl text-dark-300 mb-10 max-w-2xl mx-auto">
              Join 50+ gyms already using Gymflow to automate operations and increase revenue.
              14-day free trial. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-6 shadow-glow">
                🚀 Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-10 py-6" asChild>
                <a href="https://wa.me/916202442690?text=Hi! I'm interested in Gymflow demo." target="_blank" rel="noopener noreferrer">
                  💬 Book a Call
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}