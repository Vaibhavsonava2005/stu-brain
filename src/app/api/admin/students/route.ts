import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function PATCH(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || !['admin','superadmin'].includes(user.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id, name, student_id, class_level, section, phone, email } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  await sql`
    UPDATE users SET
      name = COALESCE(${name||null}, name),
      student_id = COALESCE(${student_id||null}, student_id),
      class_level = COALESCE(${class_level||null}, class_level),
      section = COALESCE(${section||null}, section),
      phone = COALESCE(${phone||null}, phone),
      email = COALESCE(${email||null}, email)
    WHERE id = ${id} AND school_id = ${user.school_id} AND role = 'student'
  `;
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || !['admin','superadmin'].includes(user.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { student_id } = await req.json();
  await sql`DELETE FROM users WHERE id = ${student_id} AND school_id = ${user.school_id} AND role = 'student'`;
  return NextResponse.json({ success: true });
}
