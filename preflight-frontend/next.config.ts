import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
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
