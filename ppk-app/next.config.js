/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Habilita el App Router
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
