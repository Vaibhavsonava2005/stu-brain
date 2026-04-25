import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'STU-BRAIN — AI Education Platform',
  description: 'India\'s #1 AI Education Platform for Class 3-12. Learn AI, ML, Python, Robotics.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'STU-BRAIN — AI Education Platform',
    description: 'India\'s #1 AI Education Platform for Class 3-12.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png"/>
        <link rel="apple-touch-icon" href="/logo.png"/>
        <meta name="theme-color" content="#0A0A1E"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
      </head>
      <body style={{margin:0,padding:0,background:'#0A0A1E'}}>{children}</body>
    </html>
  );
}
