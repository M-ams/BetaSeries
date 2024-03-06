/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'pictures.betaseries.com',
            port: '',
            pathname: '/fonds/**',
          },
        ],
      },

};

// next.config.js

  

export default nextConfig;
