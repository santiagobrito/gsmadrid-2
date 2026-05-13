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
  async redirects() {
    return [
      {
        source: '/hazte-colegiado/ejercientes-libres',
        destination: '/hazte-colegiado/colegiados',
        permanent: true,
      },
      {
        source: '/hazte-colegiado/ejercientes-empresa',
        destination: '/hazte-colegiado/colegiados',
        permanent: true,
      },
      {
        source: '/hazte-colegiado/no-ejercientes',
        destination: '/hazte-colegiado/colegiados',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
