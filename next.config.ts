import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Hosts allowed to reach Next.js dev resources (HMR, RSC payloads).
   * The preview environment proxies this sandbox under *.e2b.app, so those
   * origins must be trusted or the live preview cannot load dev assets.
   */
  allowedDevOrigins: ["*.e2b.app", "localhost", "127.0.0.1"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
