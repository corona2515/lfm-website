import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { INDUSTRY_SLUGS } from '@/lib/industry-pages'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url

  const routes = [
    '/',
    '/start',
    '/company/about',
    '/contact',
    '/building-data-to-action',
    '/powering-the-ai-economy',
    '/privacy',
    ...INDUSTRY_SLUGS.map((slug) => `/industries/${slug}`),
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
}
