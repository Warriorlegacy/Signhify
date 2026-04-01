'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function ExitIntentPopup() {
  const [shown, setShown] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (typeof document === 'undefined') return
    const hasDismissed = localStorage.getItem('gymflow_exit_dismissed')
    if (hasDismissed) return

    let timeoutId: NodeJS.Timeout
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          if (!hasDismissed) {
            setIsOpen(true)
          }
        }, 300)
      }
    }
    document.addEventListener('mouseleave', onMouseLeave)
    return () => {
      document.removeEventListener('mouseleave', onMouseLeave)
      clearTimeout(timeoutId)
    }
  }, [])

  function handleDismiss() {
    setIsOpen(false)
    setShown(true)
    localStorage.setItem('gymflow_exit_dismissed', 'true')
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      handleDismiss()
    }, 3000)
  }

  if (shown) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg mx-4 bg-dark-900 border border-dark-700 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Top gradient bar */}
            <div className="h-2 bg-gradient-to-r from-brand-500 to-blue-500" />

            <div className="p-8">
              <button
                type="button"
                onClick={handleDismiss}
                className="absolute top-6 right-6 text-dark-500 hover:text-white transition-colors text-lg"
              >
                X
              </button>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">&#127881;</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">You&apos;re in!</h3>
                  <p className="text-dark-300">We will reach out within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="text-5xl mb-4">&#128334;</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                    Get Your Gym Digitized in 7 Days
                  </h3>
                  <p className="text-dark-300 mb-6">
                    Free consultation. No commitment. See exactly how Gymflow transforms gym management.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email Address"
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="WhatsApp Number"
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold py-3 rounded-full shadow-glow hover:-translate-y-0.5 transition-all"
                    >
                      Claim Free Consultation
                    </button>
                  </form>

                  <p className="text-dark-500 text-xs text-center mt-4">No spam. Unsubscribe anytime.</p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
