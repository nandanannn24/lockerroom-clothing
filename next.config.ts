import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow larger body size for image uploads via Server Actions
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  // Transpile Three.js packages for proper ESM handling
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
