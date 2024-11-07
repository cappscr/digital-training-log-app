/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  output: "export",
};

export default nextConfig;
