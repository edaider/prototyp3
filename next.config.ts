import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Se till att dessa inte är aktiva eller sätt dem till false:
  // cacheComponents: false, 
  // partialPrefetching: false,
  experimental: {
    agentFeedback: true,
    // PPR måste vara avstängt för statisk export:
    ppr: false, 
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
