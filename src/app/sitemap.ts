import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url

  // New static marketing pages (served from public/) + the live /start flow.
  const routes = [
    '/',
    '/platform.html',
    '/air.html',
    '/maple.html',
    '/fdd.html',
    '/reporting.html',
    '/portfolio.html',
    '/methodology.html',
    '/industries.html',
    '/results.html',
    '/about.html',
    '/contact.html',
    '/investors.html',
    '/sample-report.html',
    '/request.html',
    '/security.html',
    '/insights.html',
    '/insights-hidden-waste.html',
    '/privacy.html',
    '/terms.html',
    '/start',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }))
}
