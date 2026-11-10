/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a verification build run alongside `next dev` without sharing .next
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  // next-intl middleware integration
  experimental: {
    // optimizePackageImports for three.js
    optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei', 'gsap'],
  },
}

export default nextConfig
