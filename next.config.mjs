/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  env: {
    NEXT_PUBLIC_GHOST_URL: process.env.NEXT_PUBLIC_GHOST_URL,
    NEXT_PUBLIC_GHOST_CONTENT_API_KEY:
      process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "static.ghost.org",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        protocol: "http",
        hostname: String(process.env.NEXT_PUBLIC_GHOST_URL).replace(
          "http://",
          ""
        ),
      },
    ],
  },
  typescript: {
    // Ignore TypeScript errors during the build process
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
