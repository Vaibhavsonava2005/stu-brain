import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false, // 🔒 Hide Next.js fingerprint
  compress: true,
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // 🔒 Prevent clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },
          // 🔒 Prevent MIME sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // 🔒 XSS protection
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // 🔒 Referrer control
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // 🔒 Prevent caching of sensitive pages
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, private' },
          // 🔒 Permissions policy - disable unnecessary browser features
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          // 🔒 Content Security Policy - prevent XSS injection
          { 
            key: 'Content-Security-Policy', 
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://openrouter.ai https://*.neon.tech https://api.anthropic.com",
              "frame-ancestors 'none'",
            ].join('; ')
          },
          // 🔒 HSTS - force HTTPS
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      {
        // 🔒 API routes - strict no-cache + block external indexing
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0, private' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
};

export default nextConfig;
