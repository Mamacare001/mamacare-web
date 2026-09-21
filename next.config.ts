import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90], // 90 is used for hero-scale photos, 75 for cards
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }], // Google profile photos
  },
};

export default nextConfig;
