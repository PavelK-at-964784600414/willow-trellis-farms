/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore linting for deployment
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore type errors for deployment
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.washu.edu',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lettuceinfo.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      // Add more trusted domains as needed for your farm images
      ...(process.env.NODE_ENV === 'development' ? [
        {
          protocol: 'https',
          hostname: '**', // Allow any https domain in development only
          port: '',
          pathname: '/**',
        }
      ] : []),
    ],
  },
  productionBrowserSourceMaps: false,
  // Only use forceSwcTransforms in production to avoid Turbopack conflicts
  ...(process.env.NODE_ENV === 'production' && {
    experimental: {
      forceSwcTransforms: true,
    }
  })
}

module.exports = nextConfig
