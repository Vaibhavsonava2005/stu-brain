import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STU-BRAIN – Future AI Learning Platform",
  description: "AI, ML, Robotics & Deep Learning for Classes 8-12. The complete school platform.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "STU-BRAIN",
  },
  icons: {
    icon: [
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icon-180.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/logo.svg" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#6C63FF" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="STU-BRAIN" />
        <link rel="apple-touch-icon" href="/icon-180.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}
