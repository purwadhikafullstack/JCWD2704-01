/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "th.bing.com" }, { protocol: "http", hostname: process.env.NEXT_PUBLIC_IMAGES_HOSTNAME }],
  },
};

module.exports = nextConfig;
