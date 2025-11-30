import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/chat-stats",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;