import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin();

const CSP = [
  "default-src 'self'",
  // Scripts: self + Vercel analytics + Speed Insights
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live",
  // Styles: self + inline (Tailwind JIT)
  "style-src 'self' 'unsafe-inline'",
  // Images: self + data URIs + Supabase storage
  "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in",
  // Fonts: self
  "font-src 'self'",
  // Connections: self + Supabase API + Vercel
  "connect-src 'self' https://*.supabase.co https://*.supabase.in https://va.vercel-scripts.com wss://*.supabase.co",
  // Frames: Google Maps embeds only
  "frame-src https://www.google.com https://maps.google.com",
  // Objects: none
  "object-src 'none'",
  // Base URI: self
  "base-uri 'self'",
  // Form actions: self
  "form-action 'self'",
  // Upgrade insecure requests
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control",    value: "on" },
  { key: "X-Frame-Options",           value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options",    value: "nosniff" },
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy",   value: CSP },
];

const nextConfig: NextConfig = {
  // Fix Turbopack CSS resolver escaping project boundary in workspaces without root package.json
  turbopack: {
    resolveAlias: {
      tailwindcss: path.resolve(__dirname, "node_modules/tailwindcss"),
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/blog/:path*",    destination: "/",         permanent: true },
      { source: "/de/blog/:path*", destination: "/",         permanent: true },
      { source: "/en/blog/:path*", destination: "/en",       permanent: true },
      { source: "/es/blog/:path*", destination: "/es",       permanent: true },
      { source: "/preise",         destination: "/anfrage",  permanent: true },
      { source: "/de/preise",      destination: "/anfrage",  permanent: true },
      { source: "/en/preise",      destination: "/en/anfrage", permanent: true },
      { source: "/es/preise",      destination: "/es/anfrage", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
