'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function StickyCta() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-dark-950/95 backdrop-blur-xl border-t border-dark-700/50 py-3 px-4 sm:hidden"
        >
          <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
            <div>
              <div className="text-white text-sm font-semibold">Gymflow</div>
              <div className="text-dark-400 text-xs">14-day free trial. No CC required.</div>
            </div>
            <div className="flex gap-2">
              <a href="#pricing" className="px-4 py-2 border border-dark-700 rounded-full text-white text-sm font-medium">Pricing</a>
              <a href="https://gymflow-saas.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-brand-500 to-brand-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-glow">Free Trial</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
