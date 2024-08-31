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
// Log the configuration to the console
console.log("Next.js Configuration:", config);
console.log("NEXT_PUBLIC_GHOST_URL:", process.env.NEXT_PUBLIC_GHOST_URL);

export default config;
