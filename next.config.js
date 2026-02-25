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
}

module.exports = nextConfig
