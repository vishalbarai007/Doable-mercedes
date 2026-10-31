/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "spyker.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "spykercars.com",
      },
    ],
  },
};

export default nextConfig;
