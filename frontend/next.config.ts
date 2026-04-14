import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gsmadrid-2-wordpress.a7lflv.easypanel.host',
      },
      {
        protocol: 'https',
        hostname: '**.gravatar.com',
      },
    ],
  },
};

export default nextConfig;
