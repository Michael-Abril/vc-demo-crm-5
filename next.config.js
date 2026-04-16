/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  productionBrowserSourceMaps: false,
  webpack: (config, { isServer, dev }) => {
    // Suppress spurious peer-dep warning from async-storage
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@react-native-async-storage/async-storage': false,
    };
    // Force production devtool to avoid 35MB eval-source-map chunks
    if (!dev && !isServer) {
      config.devtool = false;
    }
    return config;
  },
};

module.exports = nextConfig;
