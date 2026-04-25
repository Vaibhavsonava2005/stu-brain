import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ','');
  const user = verifyToken(auth||'');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error:'Forbidden' },{status:403});
  try {
    const students = await sql`
      SELECT s.id,s.name,s.email,s.class_level,s.state_name,s.city,s.total_xp,s.is_paid,s.paid_at,s.created_at,s.last_active,s.parent_email,
        COUNT(p.id) FILTER (WHERE p.completed=true) as chapters_done,
        COUNT(c.id) as certificates
      FROM b2c_students s
      LEFT JOIN b2c_progress p ON p.student_id=s.id
      LEFT JOIN b2c_certificates c ON c.student_id=s.id
      GROUP BY s.id ORDER BY s.created_at DESC`;
    return NextResponse.json({ students });
  } catch { return NextResponse.json({ students:[] }); }
}

export async function PATCH(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ','');
  const user = verifyToken(auth||'');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error:'Forbidden' },{status:403});
  try {
    const { id, is_paid } = await req.json();
    await sql`UPDATE b2c_students SET is_paid=${is_paid}, paid_at=${is_paid?sql`NOW()`:null} WHERE id=${id}`;
    return NextResponse.json({ success:true });
  } catch(e:unknown) { return NextResponse.json({ error: e instanceof Error?e.message:'Error' },{status:500}); }
}

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ','');
  const user = verifyToken(auth||'');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error:'Forbidden' },{status:403});
  try {
    const { id } = await req.json();
    await sql`DELETE FROM b2c_certificates WHERE student_id=${id}`;
    await sql`DELETE FROM b2c_progress WHERE student_id=${id}`;
    await sql`DELETE FROM b2c_students WHERE id=${id}`;
    return NextResponse.json({ success:true });
  } catch(e:unknown) { return NextResponse.json({ error: e instanceof Error?e.message:'Error' },{status:500}); }
}
