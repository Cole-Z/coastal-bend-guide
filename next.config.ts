import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export served by Cloudflare Workers static assets (see wrangler.jsonc).
  // No server runtime — contact is a mailto link from src/config/realtor.ts.
  // trailingSlash writes /route/index.html. html_handling auto-trailing-slash
  // serves that file at /route/.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
