'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'bot', content: 'Hi! I am the Gymflow AI assistant. Ask me about features, pricing, or our free trial.' }
  ])
  const [inputValue, setInputValue] = useState('')

  const botResponses: Record<string, string> = {
    hello: 'Hello! How can I help you today?',
    hi: 'Hi there! Welcome to Gymflow. What would you like to know?',
    price: 'Pricing: Starter 999/month, Pro 2499/month, Enterprise custom. All include 14-day free trial.',
    pricing: 'We have three tiers: Starter, Pro, and Enterprise. Visit our pricing section for details.',
    feature: 'Gymflow offers member management, payment processing, analytics dashboards, mobile app sync, and AI automation.',
    demo: 'Try our live demo at gymflow-saas.vercel.app or schedule a personalized walkthrough!',
    trial: 'Yes - 14-day free trial, no credit card required. Sign up and start immediately.',
    default: 'Thanks for your question! Email us at piyushrajsingh092@gmail.com for more information.'
  }

  function handleSend() {
    if (!inputValue.trim()) return
    const userMsg = inputValue.trim().toLowerCase()
    const newMessages = [...messages, { role: 'user', content: inputValue }]
    setMessages(newMessages)
    setInputValue('')
    const response = botResponses[userMsg] || botResponses.default
    setTimeout(function () {
      setMessages(function (prev) {
        return [...prev, { role: 'bot', content: response }]
      })
    }, 500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <div className="mb-4 w-80 sm:w-96 bg-dark-900 border border-dark-600 rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-brand-500 to-brand-600 p-4 flex justify-between items-center">
              <span className="text-white font-semibold">Gymflow Assistant</span>
              <button type="button" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-full p-1 transition">
                X
              </button>
            </div>
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map(function (msg: { role: string; content: string }, i: number) {
                const isUser = msg.role === 'user'
                const bgClass = isUser
                  ? 'bg-brand-500/20 text-white rounded-br-none border border-brand-500/30'
                  : 'bg-dark-800 text-dark-200 rounded-bl-none border border-dark-700'
                return (
                  <div key={i} className={isUser ? 'flex justify-end' : 'flex justify-start'}>
                    <div className={bgClass + ' p-3 rounded-xl text-sm max-w-[80%]'}>
                      {msg.content}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="p-3 border-t border-dark-700 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSend()
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 bg-dark-800 border border-dark-600 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
              />
              <button type="button" onClick={handleSend} className="bg-brand-500 hover:bg-brand-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition">
                {'\u27a4'}
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
      <button type="button" onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-brand-500 to-brand-600 w-14 h-14 rounded-full shadow-glow flex items-center justify-center text-2xl hover:scale-110 transition-transform"
      >
        {'\ud83d\udcac'}
      </button>
    </div>
  )
}
