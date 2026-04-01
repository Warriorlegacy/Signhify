import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Signhify Agency — Scale Your Brand With Performance Marketing',
  description: 'Signhify builds profit machines, not just campaigns. Performance marketing, AI-powered strategies, and conversion-focused landing pages that scale your business.',
  keywords: 'SaaS developer, AI agency, gym management software, performance marketing, digital marketing agency, lead generation, web development',
  openGraph: {
    title: 'Signhify Agency — Scale Your Brand With Performance Marketing',
    description: 'We engineer revenue machines that turn every dollar into 3, 5, or 10x. AI-powered strategies that compound.',
    url: 'https://signhify.vercel.app',
    siteName: 'Signhify',
    images: [{ url: 'https://signhify.vercel.app/assets/images/logo.png' }],
  },
}

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return children
}
