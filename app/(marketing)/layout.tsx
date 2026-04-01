import { Inter } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Chatbot } from '@/components/chatbot'
import { ExitIntentPopup } from '@/components/exit-intent'
import { StickyCta } from '@/components/sticky-cta'

const inter = Inter({ subsets: ['latin'] })

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Chatbot />
      <ExitIntentPopup />
      <StickyCta />
    </div>
  )
}
