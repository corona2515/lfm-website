import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Mono, Space_Grotesk, Instrument_Serif } from 'next/font/google'
import { AppChrome } from '@/components/layout/AppChrome'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { SITE_CONFIG } from '@/lib/constants'
import './globals.css'

// --- Thermal-cinema design fonts (dark React pages: /start, /historical-report) ---
// Display / headings — Instrument Serif via next/font.
// Geist + Geist Mono are loaded via a Google Fonts <link> below (not yet in the
// next/font catalog for this Next.js version); their CSS vars live in globals.css.
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-thermal-serif',
  display: 'swap',
})

// --- Legacy fonts (kept for the light /admin theme + existing utilities) ---
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
    'building intelligence',
    'building system data',
    'building automation system',
    'hidden building issues',
    'energy waste reduction',
    'comfort problems',
    'operating costs',
    'facility management',
    'facilities teams',
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
        alt: 'LeanFM Technologies',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${dmMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        {googleAnalyticsId ? (
          <GoogleAnalytics measurementId={googleAnalyticsId} />
        ) : null}
        <AppChrome
          contactEmail={SITE_CONFIG.contactEmail}
        >
          {children}
        </AppChrome>
      </body>
    </html>
  )
}
