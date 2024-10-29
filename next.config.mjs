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

const nextConfig = {
  ...config,
};

export default nextConfig;
