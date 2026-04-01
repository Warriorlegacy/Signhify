'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/Button'
import { useState, useEffect } from 'react'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={"fixed top-0 left-0 right-0 z-50 transition-all duration-300 " + (scrolled ? 'bg-dark-950/90 backdrop-blur-xl border-b border-dark-700/50' : 'bg-dark-950/75 backdrop-blur-2xl')}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/agency" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Signhify
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/agency" className="text-dark-300 hover:text-white transition-colors text-sm font-medium">
              Agency
            </Link>
            <Link href="#features" className="text-dark-300 hover:text-white transition-colors text-sm font-medium">
              Features
            </Link>
            <Link href="#pricing" className="text-dark-300 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </Link>
            <Link href="#demo" className="text-dark-300 hover:text-white transition-colors text-sm font-medium">
              Demo
            </Link>
            <Link href="/investors" className="text-dark-300 hover:text-white transition-colors text-sm font-medium">
              Investors
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-dark-800 border border-dark-700 hover:border-brand-500 transition-colors text-sm"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <Button size="sm" asChild>
                <a href="https://gymflow-saas.vercel.app" target="_blank" rel="noopener noreferrer">
                  Start Free Trial
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white text-2xl"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <div className="flex flex-col gap-4 text-dark-300">
              <Link href="/agency" className="hover:text-white transition-colors text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Agency
              </Link>
              <Link href="#features" className="hover:text-white transition-colors text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Features
              </Link>
              <Link href="#pricing" className="hover:text-white transition-colors text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Pricing
              </Link>
              <Link href="#demo" className="hover:text-white transition-colors text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Demo
              </Link>
              <Link href="/investors" className="hover:text-white transition-colors text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Investors
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" asChild>
                <a href="https://gymflow-saas.vercel.app" target="_blank" rel="noopener noreferrer">
                  Start Free Trial
                </a>
              </Button>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-dark-800 border border-dark-700 text-sm"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}