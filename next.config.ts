import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ixmtxgziomdovygeyxtn.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
