import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investor Pitch | Gymflow - AI-Powered Gym Management',
  description: 'Investor deck for Gymflow SaaS. Digitizing the global fitness industry with AI-powered gym management software.',
  robots: { index: false, follow: true },
  metadataBase: new URL('https://signhify.vercel.app'),
  openGraph: {
    title: 'Investor Pitch - Gymflow SaaS',
    description: 'Investor deck for Gymflow. Digitizing the global fitness industry.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investor Pitch - Gymflow SaaS',
    description: 'Digitizing the global fitness industry with AI-powered gym management software.',
  },
}

export default function InvestorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
