import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows testing the application on local network devices
  allowedDevOrigins: ['192.168.0.101'],

  // Configures security headers to allow Tailwind's dynamic evaluation during development
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;