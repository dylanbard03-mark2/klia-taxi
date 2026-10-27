import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Typecheck is run separately via `tsc --noEmit`
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
