/** @type {import('next').NextConfig} */

const config = {
  images: {
    domains: ["localhost", "static.ghost.org"],
  },
  typescript: {
    // Ignore TypeScript errors during the build process
    ignoreBuildErrors: true,
  },
};
export default config;
