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
    return [
      {
        source: '/industries/hospitals',
        destination: '/sample-analysis',
        permanent: false,
      },
      {
        source: '/industries/hotels',
        destination: '/sample-analysis',
        permanent: false,
      },
      {
        source: '/industries/k-12',
        destination: '/solutions/k-12-schools',
        permanent: false,
      },
      {
        source: '/industries/museums',
        destination: '/solutions/museums',
        permanent: false,
      },
      {
        source: '/industries/universities',
        destination: '/solutions/universities',
        permanent: false,
      },
      {
        source: '/industries/offices',
        destination: '/solutions/commercial-real-estate',
        permanent: false,
      },
      {
        source: '/solutions/hospitals',
        destination: '/sample-analysis',
        permanent: false,
      },
      {
        source: '/solutions/hotels',
        destination: '/sample-analysis',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
