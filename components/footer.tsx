import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-dark-700/50 bg-dark-900/50 py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-dark-300 text-sm">
              © {new Date().getFullYear()} Gymflow. Built with AI precision.
            </p>
            <p className="text-dark-500 text-xs mt-1">
              All-in-one gym management platform
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#features" className="text-dark-400 hover:text-brand-500 text-sm transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-dark-400 hover:text-brand-500 text-sm transition-colors">
              Pricing
            </Link>
            <Link href="/investors" className="text-dark-400 hover:text-brand-500 text-sm transition-colors">
              Investors
            </Link>
            <a href="mailto:piyushrajsingh092@gmail.com" className="text-dark-400 hover:text-brand-500 text-sm transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}