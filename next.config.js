/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pexels.com"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Disable SWC completely
  // swcMinify: false,
  // compiler: {
  //   // Remove SWC compiler options
  // },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://13.234.217.37:3001/test/api",
  },
};

module.exports = nextConfig;
