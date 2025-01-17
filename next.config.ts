import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.clerk.com", "i.pravatar.cc"], // Allow images from Clerk and default avatars
  },
};

export default nextConfig;
