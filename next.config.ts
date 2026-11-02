import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // Lets other machines on the office network open the dev server.
  allowedDevOrigins: ["10.34.4.68", "10.34.*.*", "192.168.*.*"],
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [{ source: "/", destination: "/tr", permanent: false }];
  },
};

export default nextConfig;
