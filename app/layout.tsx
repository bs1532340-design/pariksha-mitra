import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ClientForge - AI-powered proposal generator',
  description: 'AI-powered proposal generator for freelancers, agencies, and startups.',
  openGraph: {
    title: 'ClientForge',
    description: 'AI-powered proposal generator for freelancers, agencies, and startups.',
    type: 'website',
    url: 'https://getclientforge.xyz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClientForge',
    description: 'AI-powered proposal generator for freelancers, agencies, and startups.',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}

