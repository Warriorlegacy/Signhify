'use client'
import { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'


const tractionMetrics = [
  { label: 'Gyms Onboarded', value: '50+' },
  { label: 'Revenue Run Rate', value: '₹5L+' },
  { label: 'Monthly Growth', value: '30%' },
  { label: 'Customer Satisfaction', value: '95%' },
]

const roadmap = [
  { quarter: 'Q2 2025', title: 'AI Coaching Assistant', desc: 'Personalized workout & nutrition plans powered by AI' },
  { quarter: 'Q3 2025', title: 'IoT Integrations', desc: 'Connect with smart gym equipment for real-time data' },
  { quarter: 'Q4 2025', title: 'Global Expansion', desc: 'Launch in UAE, Singapore, and Middle East markets' },
  { quarter: 'Q1 2026', title: 'Enterprise Sales', desc: 'B2B partnerships with large gym chains' },
]

const team = [
  {
    name: 'Piyush Raj Singh',
    role: 'Founder & CEO',
    bio: '5 Oracle certified professional with BBA from Vinayaka Missions Sikkim University. Interned at HCLTech, Accenture UK, and Deloitte Australia simulations.',
    avatar: '👨‍💼',
    linkedin: 'https://www.linkedin.com/in/piyushraj-singh',
  },
]

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-dark-950">

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        <div className="container mx-auto relative z-10 text-center max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-sm font-semibold mb-6">
              🚀 Investor Deck
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Digitizing the <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-brand-500 bg-clip-text text-transparent">Global Fitness</span> Industry
            </h1>
            <p className="text-xl text-dark-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Gymflow is building the operating system for modern fitness businesses.
              We automate member management, payments, and analytics—helping gyms increase revenue by 30% while cutting admin work by 70%.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-10 py-6" asChild>
                <a href="https://wa.me/916202442690?text=Hi! I'm an investor interested in Gymflow." target="_blank" rel="noopener noreferrer">
                  📞 Schedule Investor Call
                </a>
              </Button>
              <Button variant="outline" size="lg" className="px-10 py-6" asChild>
                <a href="https://gymflow-saas.vercel.app" target="_blank" rel="noopener noreferrer">
                  🌐 View Live Product
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-dark-900/50">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="tag purple mb-4">The Problem</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Gym Management is <span className="text-red-400">Broken</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: '📊', text: 'Manual Excel sheets and paperwork lead to errors and lost data' },
              { icon: '💸', text: 'Missed payments and failed recurring billing cost gyms 20-30% revenue' },
              { icon: '👥', text: 'No-show clients and poor retention due to lack of automation' },
              { icon: '📱', text: 'Fragmented systems—membership, billing, and scheduling don\'t talk to each other' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="text-4xl">{item.icon}</div>
                <p className="text-dark-200 text-lg leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="tag green mb-4">The Solution</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">All-in-One <span className="text-brand-500">Automation Platform</span></h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-brand-500/10 to-purple-500/10 border border-brand-500/20 rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="text-8xl mb-6">💻📱</div>
            <h3 className="text-3xl font-bold mb-4">Gymflow Platform</h3>
            <p className="text-dark-300 text-lg mb-8 max-w-2xl mx-auto">
              One unified system that handles everything: member management, payments, analytics, mobile app, and AI-driven insights.
              Gym owners save 20+ hours per week and increase revenue by 25% on average.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
              {[
                { label: 'Time Saved', value: '70%' },
                { label: 'Revenue Increase', value: '25%' },
                { label: 'Member Retention', value: '+30%' },
              ].map((metric, i) => (
                <div key={i} className="bg-dark-800/50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-brand-500 mb-2">{metric.value}</div>
                  <div className="text-dark-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Size */}
      <section className="py-20 px-6 bg-dark-900/50">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="tag blue mb-4">Market Opportunity</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Massive <span className="text-blue-400">Underserved Market</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'TAM (Total Addressable Market)', value: '$2.8B', desc: 'Global fitness software market (2024)', color: 'from-blue-500 to-cyan-500' },
              { label: 'SAM (Serviceable Available Market)', value: '$280M', desc: 'India + US + UK fitness software market', color: 'from-brand-500 to-green-500' },
              { label: 'SOM (Serviceable Obtainable Market)', value: '$28M', desc: 'Year 1 target market share (1%)', color: 'from-purple-500 to-pink-500' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="text-center h-full">
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${item.color} text-white text-xs font-bold mb-6`}>
                    {item.label.split(' ')[0]}
                  </div>
                  <div className="text-5xl font-bold text-white mb-4 font-mono">{item.value}</div>
                  <p className="text-dark-300 mb-2">{item.label}</p>
                  <p className="text-dark-400 text-sm">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-dark-800/50 border border-dark-700 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Market Growth Projections</h3>
            <div className="text-center text-dark-300">
              <p>Global fitness market: <strong className="text-white">$96B (2024)</strong> → <strong className="text-brand-500">$125B (2028)</strong></p>
              <p className="mt-2">Fitness software segment growing at <strong className="text-brand-500">15% CAGR</strong></p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="tag orange mb-4">Business Model</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Subscription <span className="text-orange-400">SaaS</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { label: 'Pricing', value: '₹999 - ₹2,499/month' },
                { label: 'ARPU', value: '₹1,500/month' },
                { label: 'Gross Margin', value: '85%' },
                { label: 'Target LTV/CAC', value: '3:1' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl border border-dark-700"
                >
                  <span className="text-dark-300 font-medium">{item.label}</span>
                  <span className="text-xl font-bold text-brand-500 font-mono">{item.value}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-to-br from-brand-500/10 to-purple-500/10 border-brand-500/30">
                <div className="text-center">
                  <div className="text-6xl mb-4">📈</div>
                  <h3 className="text-2xl font-bold mb-4">Recurring Revenue</h3>
                  <p className="text-dark-300 leading-relaxed">
                    Monthly/annual subscriptions with 85% gross margin. High retention through AI-powered value.
                    LTV of ₹18,000 per customer over 12 months.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Traction */}
      <section className="py-20 px-6 bg-dark-900/50">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="tag green mb-4">Traction</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Early <span className="text-green-400">Momentum</span></h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tractionMetrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl font-bold text-brand-500 mb-2 font-mono">{metric.value}</div>
                <div className="text-dark-300 text-sm">{metric.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-dark-800/50 border border-dark-700 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Growth Curve</h3>
            <div className="h-48 flex items-center justify-center text-dark-500 bg-dark-900/50 rounded-xl">
              📊 Growth chart placeholder (Month-over-month: 30%)
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="tag purple mb-4">Roadmap</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What&apos;s <span className="text-purple-400">Next</span></h2>
          </motion.div>

          <div className="space-y-6">
            {roadmap.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center bg-dark-800/50 border border-dark-700 rounded-2xl p-8`}
              >
                <div className="text-brand-500 font-mono font-bold text-xl whitespace-nowrap">
                  {item.quarter}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-dark-300">{item.desc}</p>
                </div>
                <div className="text-4xl">{['🤖', '🔌', '🌍', '🏢'][i]}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 px-6 bg-dark-900/50">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="tag orange mb-4">Founder</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet the <span className="text-orange-400">Founder</span></h2>
          </motion.div>

          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="max-w-3xl mx-auto text-center p-12">
                <div className="text-8xl mb-6">{member.avatar}</div>
                <h3 className="text-3xl font-bold mb-2">{member.name}</h3>
                <div className="text-brand-500 font-medium mb-6">{member.role}</div>
                <p className="text-dark-300 leading-relaxed mb-8">{member.bio}</p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      💼 LinkedIn
                    </a>
                  </Button>
                  <Button asChild>
                    <a href="mailto:piyushrajsingh092@gmail.com">📧 Email</a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="tag mb-4">FAQ</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Common <span className="bg-gradient-to-r from-brand-400 to-blue-500 bg-clip-text text-transparent">Questions</span></h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: 'What is the tech stack?',
                a: 'Gymflow is built with React (Next.js), Node.js, PostgreSQL, and Stripe. Mobile apps built with React Native. AI features powered by Anthropic Claude and Oracle AI services.',
              },
              {
                q: 'Is the app production-ready?',
                a: 'Yes! The web app is live at gymflow-saas.vercel.app. Mobile APK is available for testing. Both are fully functional and ready for paying customers.',
              },
              {
                q: 'Who are your target customers?',
                a: 'Initially targeting independent gyms in India (Delhi NCR, Mumbai, Bangalore). Expanding to US and UK markets in Q4 2025. Both single-location and multi-gym chains.',
              },
              {
                q: 'What is your customer acquisition strategy?',
                a: 'Content marketing (SEO), direct outreach, partnerships with gym consultants, and paid ads. Current CAC: ₹3,000. Target LTV: ₹18,000.',
              },
              {
                q: 'How do you differentiate from competitors?',
                a: 'AI-first approach, simpler pricing, mobile app included for free, and 14-day trial without credit card. Built specifically for Indian market with local payment support.',
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-brand-500">{faq.q}</h3>
                  <p className="text-dark-300">{faq.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-brand-500/10 to-blue-500/20" />
        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Let&apos;s Build the Future of <span className="bg-gradient-to-r from-purple-400 to-brand-500 bg-clip-text text-transparent">Fitness Tech</span>
            </h2>
            <p className="text-xl text-dark-300 mb-10 max-w-2xl mx-auto">
              We&apos;re looking for investors who believe in the power of AI to transform traditional industries.
              Schedule a call to discuss how you can be part of our journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="px-10 py-6 text-lg shadow-glow" asChild>
                <a href="https://wa.me/916202442690?text=Hi! I'm an investor and would like to discuss Gymflow." target="_blank" rel="noopener noreferrer">
                  📞 Schedule Investor Call
                </a>
              </Button>
              <Button variant="outline" size="lg" className="px-10 py-6 text-lg" asChild>
                <a href="mailto:piyushrajsingh092@gmail.com?subject=Investment Inquiry - Gymflow">
                  📧 Send Email
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}