/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['twilio'],
  productionBrowserSourceMaps: false,
  experimental: {
    forceSwcTransforms: true,
  }
}

module.exports = nextConfig
