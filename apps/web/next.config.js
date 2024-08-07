/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "th.bing.com" }, { protocol: "https", hostname: process.env.NEXT_PUBLIC_IMAGES_HOSTNAME }],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
