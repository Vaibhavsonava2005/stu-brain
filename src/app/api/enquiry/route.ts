import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, school, city, message, students } = await req.json();
    if (!name || !phone) return NextResponse.json({ error: 'Name and phone required' }, { status: 400 });

    await sql`
      CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY, name VARCHAR(200), email VARCHAR(200),
        phone VARCHAR(20), school VARCHAR(300), city VARCHAR(100),
        message TEXT, students INTEGER DEFAULT 0,
        status VARCHAR(50) DEFAULT 'new', created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    await sql`
      INSERT INTO enquiries (name, email, phone, school, city, message, students)
      VALUES (${name}, ${email||''}, ${phone}, ${school||''}, ${city||''}, ${message||''}, ${students||0})
    `;
    return NextResponse.json({ success: true, message: 'Enquiry received! We will contact you within 24 hours.' });
  } catch (e) {
    console.error('Enquiry error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    await sql`CREATE TABLE IF NOT EXISTS enquiries (id SERIAL PRIMARY KEY, name VARCHAR(200), email VARCHAR(200), phone VARCHAR(20), school VARCHAR(300), city VARCHAR(100), message TEXT, students INTEGER DEFAULT 0, status VARCHAR(50) DEFAULT 'new', created_at TIMESTAMP DEFAULT NOW())`;
    const enquiries = await sql`SELECT * FROM enquiries ORDER BY created_at DESC`;
    return NextResponse.json({ enquiries });
  } catch (e) {
    return NextResponse.json({ enquiries: [] });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { id, status } = await req.json();
  await sql`UPDATE enquiries SET status=${status} WHERE id=${id}`;
  return NextResponse.json({ success: true });
}

