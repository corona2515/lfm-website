import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { INDUSTRY_SLUGS } from '@/lib/industry-pages'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url

  const routes = [
    '/',
    '/sample-analysis',
    '/how-it-works',
    '/what-we-find',
    '/results',
    '/solutions/k-12-schools',
    '/solutions/commercial-real-estate',
    '/solutions/universities',
    '/solutions/museums',
    '/start',
    '/company/about',
    '/investors',
    '/contact',
    '/building-data-to-action',
    '/privacy',
    ...INDUSTRY_SLUGS
      .filter((slug) => slug !== 'k-12')
      .map((slug) => `/industries/${slug}`),
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
}
