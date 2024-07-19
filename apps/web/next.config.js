/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ hostname: "th.bing.com" }, { hostname: "localhost" }] },
};

module.exports = nextConfig;
