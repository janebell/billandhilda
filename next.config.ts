import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // set to false if you might change it later
      },
    ];
  },
};

export default nextConfig;
