import withPWA from "next-pwa";
/** @type {import('next').NextConfig} */
const nextConfig = {
  // devServer: {
  //   https: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.223.102",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  reactStrictMode: true, // Enable React strict mode for improved error handling
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
};

export default withPWA({
  dest: "public", // destination directory for the PWA files
  // disable: process.env.NODE_ENV === "development", // disable PWA in development
  register: true, // register the PWA service worker
  skipWaiting: true, // skip waiting for service worker activation
})(nextConfig);
