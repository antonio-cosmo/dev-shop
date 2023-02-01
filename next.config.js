/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns:[
      {
        protocol:'https',
        hostname : 'files.stripe.com'
      }
    ],
    
    // domains:['files.stripe.com'],
    unoptimized: true,
  }
}

module.exports = nextConfig
