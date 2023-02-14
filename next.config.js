/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{ 
    ignoreBuildErrors: true,
    ignoreDeploymentErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['cdn.dribbble.com', 'lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig
