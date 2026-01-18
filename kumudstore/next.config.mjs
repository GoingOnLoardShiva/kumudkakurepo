/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  // Add this section to allow Supabase images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lzqcmgutfwdgieqgjaaf.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;