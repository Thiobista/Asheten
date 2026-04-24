/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
