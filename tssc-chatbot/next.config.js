/** @type {import('next').NextConfig} */
// This standalone Success Query app is retired. The live chat is
// https://www.serialsalescommunity.co/sqdb, so every path redirects there (308).
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://www.serialsalescommunity.co/sqdb',
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig
