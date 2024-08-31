/** @type {import('next').NextConfig} */

const config = {
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
        protocol: "http",
        hostname: new URL(process.env.NEXT_PUBLIC_GHOST_URL).hostname,
      },
    ],
  },
  typescript: {
    // Ignore TypeScript errors during the build process
    ignoreBuildErrors: true,
  },
};

export default config;
