'use client';
import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Only show splash on first visit, not every navigation
    const seen = sessionStorage.getItem('stb_splash');
    if (seen) setShowSplash(false);
    else sessionStorage.setItem('stb_splash', '1');
  }, []);

  if (showSplash) return <SplashScreen onDone={() => setShowSplash(false)} />;
  return <>{children}</>;
}
