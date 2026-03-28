import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || !['admin','superadmin','teacher'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const sid = user.role === 'teacher' ? user.school_id : user.school_id;
  const teachers = await sql`
    SELECT u.id, u.name, u.email, u.student_id as teacher_id, u.phone, u.created_at,
      COUNT(DISTINCT a.id) as assignments_given,
      COUNT(DISTINCT s.id) as students_count
    FROM users u
    LEFT JOIN assignments a ON a.teacher_id = u.id
    LEFT JOIN users s ON s.school_id = u.school_id AND s.role = 'student'
    WHERE u.school_id = ${sid} AND u.role = 'teacher'
    GROUP BY u.id ORDER BY u.name
  `;
  return NextResponse.json({ teachers });
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || !['admin','superadmin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { name, email, phone, teacher_id, password } = await req.json();
  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
  }

  // Auto-generate teacher ID if not provided
  const schoolCode = String(user.school_id).padStart(3,'0');
  const count = await sql`SELECT COUNT(*) as c FROM users WHERE school_id=${user.school_id} AND role='teacher'`;
  const autoId = teacher_id?.trim() || `TCH${schoolCode}${String(Number(count[0].c)+1).padStart(3,'0')}`;

  const tempPass = password?.trim() || 'Teacher@' + Math.random().toString(36).slice(2,6).toUpperCase();
  const bcrypt = await import('bcryptjs');
  const hash = await bcrypt.default.hash(tempPass, 10);

  try {
    const result = await sql`
      INSERT INTO users (school_id, name, email, student_id, password_hash, role, phone)
      VALUES (${user.school_id}, ${name.trim()}, ${email.trim()}, ${autoId}, ${hash}, 'teacher', ${phone?.trim()||null})
      RETURNING id, name, email, student_id as teacher_id
    `;
    return NextResponse.json({
      success: true,
      teacher: result[0],
      teacher_id: autoId,
      temp_password: tempPass,
      login_email: email.trim(),
      message: `Teacher added! Login: ${email.trim()} / ${tempPass}`
    });
  } catch {
    return NextResponse.json({ error: 'Email already exists for another teacher' }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || !['admin','superadmin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { id, name, email, phone, teacher_id } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await sql`
    UPDATE users SET
      name = COALESCE(${name||null}, name),
      email = COALESCE(${email||null}, email),
      phone = COALESCE(${phone||null}, phone),
      student_id = COALESCE(${teacher_id||null}, student_id)
    WHERE id = ${id} AND school_id = ${user.school_id} AND role = 'teacher'
  `;
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || !['admin','superadmin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { teacher_id } = await req.json();
  await sql`DELETE FROM users WHERE id=${teacher_id} AND school_id=${user.school_id} AND role='teacher'`;
  return NextResponse.json({ success: true });
}
