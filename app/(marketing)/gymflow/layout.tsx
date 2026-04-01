import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gymflow - AI-Powered Gym Management Software | Run Your Gym Like a Tech Company',
  description: 'All-in-one AI-powered gym management platform. Automate member management, payments, analytics, and mobile app. Start 14-day free trial.',
  keywords: 'gym management software, fitness CRM, member management, payment processing, gym analytics, fitness app, gym automation',
  metadataBase: new URL('https://signhify.vercel.app'),
  openGraph: {
    title: 'Gymflow - AI-Powered Gym Management',
    description: 'Run your gym like a tech company. All-in-one platform for modern fitness businesses. Start free trial.',
    images: ['/assets/images/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gymflow - AI-Powered Gym Management',
    description: 'All-in-one platform for modern gyms. Start free trial.',
    images: ['/assets/images/logo.png'],
  },
}

export default function GymflowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
