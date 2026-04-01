'use client'

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"

export function LeadCaptureForm() {
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [leadLoading, setLeadLoading] = useState(false)

  async function handleLeadSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLeadLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      business: formData.get("business") as string,
      message: formData.get("message") as string,
      source: "gymflow-landing",
    }
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } catch (_) {
      // API error is fine - fallback to WhatsApp
    }
    const msg = "New Gymflow Lead:\nName: " + data.name + "\nEmail: " + data.email + "\nPhone: " + data.phone + "\nBusiness: " + data.business + "\nMessage: " + data.message
    window.open("https://wa.me/916202442690?text=" + encodeURIComponent(msg), "_blank")
    form.reset()
    setLeadLoading(false)
    setLeadSubmitted(true)
  }

  if (leadSubmitted) {
    return (
      <Card className="p-8 bg-dark-900/80 border border-brand-500/30 text-center">
        <div className="text-6xl mb-4">{"\ud83c\udf89"}</div>
        <h3 className="text-2xl font-bold mb-3">You are all set!</h3>
        <p className="text-dark-300 mb-6">We will get back to you within 24 hours. Check your email and WhatsApp for a confirmation.</p>
        <Button asChild>
          <a href="https://wa.me/916202442690?text=Hi, I signed up for Gymflow demo." target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
        </Button>
      </Card>
    )
  }

  return (
    <Card className="p-8 bg-dark-900/80 border border-dark-700/50">
      <form onSubmit={handleLeadSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            required
            className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
          />
          <input
            type="text"
            name="business"
            placeholder="Gym / Business Name"
            className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            required
            className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
          />
          <input
            type="tel"
            name="phone"
            placeholder="WhatsApp Number"
            className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
          />
        </div>
        <textarea
          name="message"
          placeholder="Tell us about your gym (members, locations, challenges...)"
          rows={4}
          className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none mb-6"
        />
        <Button type="submit" size="lg" className="w-full text-base shadow-glow" isLoading={leadLoading}>
          {leadLoading ? "Submitting..." : "Get Free Consultation"}
        </Button>
        <p className="text-dark-500 text-xs text-center mt-4">No spam. We will respond within 24 hours.</p>
      </form>
    </Card>
  )
}
