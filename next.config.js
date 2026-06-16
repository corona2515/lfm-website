/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Avoid runtime image optimizer dependency issues on minimal hosts.
    unoptimized: true,
    remotePatterns: [],
  },
  // Strict mode for better development experience
  reactStrictMode: true,
  // Disable x-powered-by header for security
  poweredByHeader: false,
  async redirects() {
    // Old Next.js routes -> new static .html pages. The functional routes
    // /start, /k12, /historical-report, /admin and /api are intentionally NOT
    // redirected (they remain live React/API routes in this same app).
    const moves = [
      ['/explore', '/platform.html'], ['/product', '/platform.html'], ['/onpoint', '/platform.html'],
      ['/prescriptiv', '/platform.html'], ['/how-it-works', '/platform.html'],
      ['/building-data-to-action', '/platform.html'], ['/what-we-find', '/fdd.html'],
      ['/air', '/air.html'], ['/maple', '/maple.html'], ['/results', '/results.html'],
      ['/company/about', '/about.html'], ['/investors', '/investors.html'],
      ['/powering-the-ai-economy', '/insights-hidden-waste.html'],
      ['/industries', '/industries.html'], ['/solutions', '/industries.html'],
      ['/solutions/universities', '/industries.html#higher-ed'], ['/solutions/k-12-schools', '/industries.html#k12'],
      ['/solutions/museums', '/industries.html#museums'], ['/solutions/commercial-real-estate', '/industries.html#commercial'],
      ['/solutions/hospitals', '/industries.html#healthcare'], ['/solutions/hotels', '/industries.html'],
      ['/industries/higher-education', '/industries.html#higher-ed'], ['/industries/universities', '/industries.html#higher-ed'],
      ['/industries/k12', '/industries.html#k12'], ['/industries/k-12', '/industries.html#k12'],
      ['/industries/museums', '/industries.html#museums'], ['/industries/hospitals', '/industries.html#healthcare'],
      ['/industries/offices', '/industries.html#commercial'], ['/industries/hotels', '/industries.html'],
      ['/sample-analysis', '/request.html'], ['/pricing', '/request.html'], ['/sample', '/sample-report.html'],
      ['/security', '/security.html'], ['/privacy', '/privacy.html'], ['/terms', '/terms.html'],
      ['/contact', '/contact.html'],
    ]
    return moves.map(([source, destination]) => ({ source, destination, permanent: true }))
  },
  async rewrites() {
    // Serve the new static homepage at "/" (public/index.html).
    return [{ source: '/', destination: '/index.html' }]
  },
}

module.exports = nextConfig
