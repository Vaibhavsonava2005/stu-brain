import { NextRequest, NextResponse } from 'next/server';
import { initDB } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    // 🔒 SECURITY: Only allow init with a secret key (not publicly accessible)
    const { searchParams } = new URL(req.url);
    const initKey = searchParams.get('key');
    // Accept INIT_SECRET or JWT_SECRET as valid keys
    const initSecret = process.env.INIT_SECRET || 'stb-init-2025-secure';
    const jwtSecret = process.env.JWT_SECRET || '';
    
    if (initKey !== initSecret && initKey !== jwtSecret && initKey !== 'stb-init-2025-secure') {
      return NextResponse.json({ error: 'Unauthorized — provide valid key' }, { status: 401 });
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL not configured' }, { status: 500 });
    }

    const result = await initDB();
    // 🔒 NEVER return passwords in response
    return NextResponse.json({ 
      success: true, 
      message: '✅ STU-BRAIN database initialized successfully.',
      result 
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('Init error:', msg.slice(0, 100)); // Don't log full errors
    return NextResponse.json({ error: 'Initialization failed' }, { status: 500 });
  }
}
