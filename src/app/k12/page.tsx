import type { Metadata } from 'next'
import { CaseStudy } from './components/CaseStudy'
import { ExitIntentModal } from './components/ExitIntentModal'
import { FundingPaths } from './components/FundingPaths'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { K12FAQ } from './components/K12FAQ'
import { OfferAndForm } from './components/OfferAndForm'
import { PainStrip } from './components/PainStrip'
import { StickyCTA } from './components/StickyCTA'
import { TheMath } from './components/TheMath'
import { TrustBlock } from './components/TrustBlock'
import { WhatYouGet } from './components/WhatYouGet'

const canonicalUrl = 'https://www.leanfmtech.com/k12'

export const metadata: Metadata = {
  title: {
    absolute: 'K-12 Energy Savings Software | OnPoint by LeanFM',
  },
  description: "Find hidden HVAC waste in your K-12 district's buildings using existing BAS data. Qualified 30-day pilot with a $50,000 identified-waste fee waiver.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: 'K-12 Energy Savings Software | OnPoint by LeanFM',
    description: "Find hidden HVAC waste in your K-12 district's buildings using existing BAS data. Qualified 30-day pilot with a $50,000 identified-waste fee waiver.",
    url: canonicalUrl,
    images: [
      {
        url: '/k12/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OnPoint K-12 building diagnostic dashboard',
      },
    ],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'OnPoint K-12 Building Energy Waste Audit Pilot',
  serviceType: 'Energy Audit',
  provider: {
    '@type': 'Organization',
    name: 'LeanFM Technologies',
    url: 'https://www.leanfmtech.com',
  },
  areaServed: 'United States',
  audience: {
    '@type': 'Audience',
    audienceType: 'K-12 School Districts',
  },
  url: canonicalUrl,
}

export default function K12Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="bg-white font-body text-brand-ink">
        <Hero />
        <PainStrip />
        <TheMath />
        <HowItWorks />
        <WhatYouGet />
        <CaseStudy />
        <FundingPaths />
        <K12FAQ />
        <TrustBlock />
        <OfferAndForm />
        <StickyCTA />
        <ExitIntentModal />
      </div>
    </>
  )
}
