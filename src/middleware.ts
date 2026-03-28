import { NextRequest, NextResponse } from 'next/server';

// 🔒 Paths that should NEVER be publicly accessible
const BLOCKED_PATHS = [
  '/.env',
  '/.env.local', 
  '/.env.production',
  '/api/init', // Handled by its own secret key check
  '/_next/static/chunks', // Block direct chunk access that could reveal source
];

// 🔒 Block common attack patterns in query strings
const ATTACK_PATTERNS = [
  /(<script|javascript:|data:text\/html|vbscript:)/i, // XSS
  /(union\s+select|drop\s+table|insert\s+into|delete\s+from)/i, // SQL injection  
  /(\.\.\/|\.\.\\)/,  // Path traversal
  /(%00|%0a|%0d)/i,   // Null bytes / CRLF
];

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

  // 🔒 Block .env and sensitive file access
  if (pathname.includes('.env') || pathname.includes('.git') || pathname.endsWith('.sql')) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // 🔒 Block attack patterns in URL
  const fullUrl = pathname + search;
  for (const pattern of ATTACK_PATTERNS) {
    if (pattern.test(fullUrl)) {
      console.warn(`[SECURITY] Blocked attack from ${ip}: ${fullUrl.slice(0, 100)}`);
      return new NextResponse('Bad Request', { status: 400 });
    }
  }

  // 🔒 Block requests with suspicious headers
  const userAgent = req.headers.get('user-agent') || '';
  const suspiciousAgents = ['sqlmap', 'nikto', 'nmap', 'masscan', 'zgrab', 'python-requests/2.', 'curl/'];
  // Only block known scanner tools, not curl in general
  const isScannerBot = ['sqlmap', 'nikto', 'nmap', 'masscan', 'zgrab'].some(s => userAgent.toLowerCase().includes(s));
  if (isScannerBot) {
    console.warn(`[SECURITY] Blocked scanner from ${ip}: ${userAgent}`);
    return new NextResponse('Forbidden', { status: 403 });
  }

  // 🔒 Add security headers to all responses
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Powered-By', ''); // Remove fingerprint
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon-|manifest.json|logo.svg).*)',
  ],
};
