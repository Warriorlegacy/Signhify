import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Signhify Agency — Scale Your Brand With Performance Marketing',
  description: 'Signhify builds profit machines, not just campaigns. Performance marketing, AI-powered strategies, and conversion-focused landing pages that scale your business.',
  keywords: 'SaaS developer, AI agency, gym management software, performance marketing, digital marketing agency, lead generation, web development',
  metadataBase: new URL('https://signhify.vercel.app'),
  openGraph: {
    title: 'Signhify Agency — Scale Your Brand With Performance Marketing',
    description: 'We engineer revenue machines that turn every dollar into 3, 5, or 10x. AI-powered strategies that compound.',
    type: 'website',
    url: 'https://signhify.vercel.app',
    siteName: 'Signhify',
    images: [
      {
        url: '/assets/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Signhify Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Signhify Agency — Revenue Machines',
    description: 'AI-powered performance marketing that scales. Get your free strategy call.',
    images: ['/assets/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}