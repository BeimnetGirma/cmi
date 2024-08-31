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
        hostname: process.env.NEXT_PUBLIC_GHOST_URL,
      },
    ],
  },
  typescript: {
    // Ignore TypeScript errors during the build process
    ignoreBuildErrors: true,
  },
};
console.log(config.images);
export default config;
