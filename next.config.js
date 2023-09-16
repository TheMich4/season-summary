/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["images-static.iracing.com"],
  },
};

module.exports = nextConfig;
