/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/multi-vendor-delivery' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/multi-vendor-delivery' : '',
}

export default nextConfig