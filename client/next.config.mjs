/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
  
        return config;
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'pcdn.goldapple.ru',
            port: '',
            pathname: '/**',
          },
        ],
    },
};

export default nextConfig;
