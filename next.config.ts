import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages: git-connected static hosting, including PR previews.
  // No server runtime — contact is a mailto link from src/config/realtor.ts.
  // trailingSlash writes /route/index.html, which Pages serves cleanly.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
