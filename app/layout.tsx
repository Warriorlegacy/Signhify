import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const BASE_URL = 'https://signhify.vercel.app'

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Signhify Agency",
  "url": BASE_URL,
  "logo": `${BASE_URL}/signhify-logo-new.png`,
  "description": "Performance marketing and SaaS development agency. We engineer revenue machines that turn every dollar into 10x using AI-powered strategies.",
  "founder": {
    "@type": "Person",
    "name": "Piyush Raj Singh",
    "url": "https://linkedin.com/in/piyushraj-singh",
    "alumniOf": "University of Delhi (2022-2026)",
    "knowsAbout": ["Performance Marketing", "SaaS Development", "AI Analytics", "Meta Ads", "Google Ads", "Next.js"]
  },
  "sameAs": [
    "https://linkedin.com/in/piyushraj-singh",
    "https://wa.me/916202442690",
    "https://gymflow-saas.vercel.app",
    "https://sewarthpathsansthanam.vercel.app"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-62024-42690",
    "contactType": "sales",
    "availableLanguage": ["English", "Hindi"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "areaServed": "Worldwide",
  "knowsAbout": ["Digital Marketing", "SaaS Development", "AI Analytics", "Lead Generation", "Conversion Optimization", "Performance Advertising"],
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Signhify Agency",
  "image": `${BASE_URL}/signhify-logo-new.png`,
  "url": BASE_URL,
  "description": "Performance marketing and SaaS development agency with Oracle-certified experts delivering 10x ROI.",
  "telephone": "+91-62024-42690",
  "email": "piyushrajsingh092@gmail.com",
  "priceRange": "₹5,999 - ₹9,999/mo",
  "areaServed": {"@type": "Place", "name": "Worldwide"},
  "serviceType": ["Performance Marketing", "SaaS Development", "AI Analytics", "Lead Generation", "Web Development", "SEO"]
}

export const metadata: Metadata = {
  title: 'Signhify Agency — Performance Marketing & SaaS Development Agency',
  description: 'Signhify builds profit machines, not just campaigns. Expert performance marketing (Meta & Google Ads), AI-powered strategies, and custom SaaS development that delivers 10x ROI. Oracle-certified team.',
  keywords: 'SaaS development agency, performance marketing agency, AI marketing, Meta Ads management, Google Ads agency, web development company, gym management software, lead generation, conversion optimization, Next.js development, digital marketing India',
  metadataBase: new URL(BASE_URL),
  authors: [{ name: 'Piyush Raj Singh', url: 'https://linkedin.com/in/piyushraj-singh' }],
  creator: 'Piyush Raj Singh',
  publisher: 'Signhify Agency',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Signhify Agency',
    title: 'Signhify Agency — Performance Marketing & SaaS Development',
    description: 'We engineer revenue machines that turn every dollar into 3, 5, or 10x. AI-powered performance marketing + custom SaaS development by Oracle-certified experts.',
    images: [
      {
        url: '/signhify-logo-new.png',
        width: 1200,
        height: 630,
        alt: 'Signhify Agency - Performance Marketing & SaaS Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@signhifyagency',
    creator: '@piyushraj_singh',
    title: 'Signhify Agency — Revenue Machines Built With AI',
    description: 'Performance marketing + SaaS development that delivers 10x ROI. Meta Ads, Google Ads, AI strategies, and custom web applications.',
    images: ['/signhify-logo-new.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: 'Business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#030305" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="google-site-verification" content="google-site-verification-code-here" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      </head>
      <body className={inter.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}