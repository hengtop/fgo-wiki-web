/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'fgo-cdn.vgtime.com',
        port: '',
        pathname: '/media/fgo/servant/head/**',
      },
      {
        protocol: 'http',
        hostname: 'fgo-cdn.vgtime.com',
        port: '',
        pathname: '/media/fgo/servant/card/**',
      },
      {
        protocol: 'http',
        hostname: 'fgo-cdn.vgtime.com',
        port: '',
        pathname: '/media/fgo/equip/head/**',
      },
    ],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `http://fgo-service.vgtime.com/:path*`,
        },
        {
          source: '/active',
          destination: 'https://fgo.wiki/w/%E9%A6%96%E9%A1%B5',
        },
      ],
    };
  },
};

module.exports = nextConfig;
