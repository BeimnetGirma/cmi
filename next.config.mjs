/** @type {import('next').NextConfig} */
import { config } from "dotenv";
import fs from "fs";
import path from "path";
config();

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
        protocol: process.env.NEXT_PUBLIC_GHOST_URL?.startsWith("https")
          ? "https"
          : "http",
        hostname: process.env.NEXT_PUBLIC_GHOST_URL?.replace(
          /^https?:\/\//,
          ""
        ),
        pathname: "/**", // Allow all paths under the Ghost domain
      },
    ],
  },
  typescript: {
    // Ignore TypeScript errors during the build process
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" }, // 🔥 Prevent caching issues
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      console.log("🔄 Clearing Next.js Cache...");
      const cacheDir = path.resolve(".next/cache");
      fs.rmSync(cacheDir, { recursive: true, force: true });
    }
    return config;
  },
};

export default nextConfig;
