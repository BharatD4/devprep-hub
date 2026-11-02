/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@devprep/ui', '@devprep/api', '@devprep/db'],
  reactStrictMode: true,
};

export default nextConfig;

