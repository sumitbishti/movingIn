import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.pexels.com", "images.unsplash.com", "www.w3schools.com"],
  },
  // experimental: {
  //   instrumentationHook: true,
  // } as any,
};

export default nextConfig;
