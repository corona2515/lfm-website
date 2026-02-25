import type { Metadata } from 'next'
import { DM_Sans, DM_Mono, Space_Grotesk } from 'next/font/google'
import { Header, Footer } from '@/components/layout'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { SITE_CONFIG } from '@/lib/constants'
import './globals.css'

// Display font - Space Grotesk for headings (geometric, technical)
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

// Body font - DM Sans for excellent readability
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

// Mono font
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'HVAC fault detection software',
    'AFDD software',
    'fault detection',
    'building automation',
    'BAS',
    'BAS analytics',
    'HVAC',
    'energy management',
    'facility management',
    'fault diagnosis software',
    'building analytics software',
  ],
  authors: [{ name: 'LeanFM Technologies' }],
  creator: 'LeanFM Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: '/og-image.png',
        width: 1000,
        height: 667,
        alt: 'LeanFM - OnPoint Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon.svg',
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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        {googleAnalyticsId ? (
          <GoogleAnalytics measurementId={googleAnalyticsId} />
        ) : null}
        <Header />
        <main className="flex-1 pt-18">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
