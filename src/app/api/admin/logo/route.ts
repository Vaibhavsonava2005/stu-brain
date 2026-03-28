import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || !['admin','superadmin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { logo_url, school_id } = await req.json();
  const sid = user.role === 'superadmin' ? (school_id || user.school_id) : user.school_id;
  if (!logo_url || !logo_url.startsWith('data:image')) {
    return NextResponse.json({ error: 'Valid image required' }, { status: 400 });
  }
  await sql`UPDATE schools SET logo_url = ${logo_url} WHERE id = ${sid}`;
  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const school_id = searchParams.get('school_id');
  
  // Also support auth-based lookup
  if (!school_id) {
    const auth = req.headers.get('authorization')?.replace('Bearer ', '');
    const user = verifyToken(auth || '');
    if (!user) return NextResponse.json({ logo_url: null });
    const [school] = await sql`SELECT logo_url FROM schools WHERE id = ${user.school_id}`;
    return NextResponse.json({ logo_url: school?.logo_url || null });
  }
  
  const [school] = await sql`SELECT logo_url FROM schools WHERE id = ${parseInt(school_id)}`;
  return NextResponse.json({ logo_url: school?.logo_url || null });
}
