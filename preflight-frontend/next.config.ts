import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'developers.elementor.com',
        port: '',
        pathname: '/**',

      },
    ],
  },
};

export default nextConfig;
