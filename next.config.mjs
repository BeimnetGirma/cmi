/** @type {import('next').NextConfig} */

const config = {
  images: {
    domains: [
      "localhost",
      "static.ghost.org",
      process.env.NEXT_PUBLIC_GHOST_URL,
    ],
  },
  typescript: {
    // Ignore TypeScript errors during the build process
    ignoreBuildErrors: true,
  },
};

export default config;
