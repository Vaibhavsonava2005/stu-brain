import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = verifyToken(auth);
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const schools = await sql`
    SELECT s.*,
      COUNT(DISTINCT u.id) FILTER (WHERE u.role = 'student') as student_count,
      COUNT(DISTINCT u.id) FILTER (WHERE u.role = 'teacher') as teacher_count,
      COUNT(DISTINCT u.id) FILTER (WHERE u.role = 'admin') as admin_count,
      COALESCE(SUM(u.total_xp) FILTER (WHERE u.role = 'student'), 0) as total_xp,
      COUNT(DISTINCT cp.id) FILTER (WHERE cp.completed = true) as chapters_completed
    FROM schools s
    LEFT JOIN users u ON u.school_id = s.id
    LEFT JOIN chapter_progress cp ON cp.user_id = u.id
    GROUP BY s.id
    ORDER BY s.created_at DESC
  `;

  const stats = await sql`
    SELECT 
      COUNT(DISTINCT s.id) as total_schools,
      COUNT(DISTINCT s.id) FILTER (WHERE s.is_active = true) as active_schools,
      COUNT(DISTINCT s.id) FILTER (WHERE s.is_locked = false) as unlocked_schools,
      COUNT(DISTINCT u.id) FILTER (WHERE u.role = 'student') as total_students,
      COALESCE(SUM(s.payment_amount) FILTER (WHERE s.payment_amount IS NOT NULL), 0) as total_revenue
    FROM schools s
    LEFT JOIN users u ON u.school_id = s.id
  `;

  return NextResponse.json({ schools, stats: stats[0] });
}

// Register a new school (from superadmin panel)
export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { name, admin_email, city, state, phone, plan, max_students } = await req.json();
  if (!name || !admin_email) return NextResponse.json({ error: 'Name and admin email required' }, { status: 400 });

  const code = name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8) + Date.now().toString().slice(-4);
  
  const bcrypt = await import('bcryptjs');
  const tempPassword = 'School@' + Math.random().toString(36).slice(2, 8).toUpperCase();
  const hash = await bcrypt.default.hash(tempPassword, 10);
  const { signToken } = await import('@/lib/auth');

  // Create school
  const school = await sql`
    INSERT INTO schools (name, code, admin_email, city, state, phone, plan, is_active, is_locked, max_students)
    VALUES (${name}, ${code}, ${admin_email}, ${city||''}, ${state||''}, ${phone||''}, ${plan||'trial'}, FALSE, TRUE, ${max_students||50})
    RETURNING *
  `;

  // Create admin user for the school
  await sql`
    INSERT INTO users (school_id, name, email, student_id, password_hash, role)
    VALUES (${school[0].id}, ${'Admin - '+name}, ${admin_email}, ${'ADM'+code}, ${hash}, 'admin')
    ON CONFLICT (email) DO UPDATE SET school_id = ${school[0].id}, password_hash = ${hash}
  `;

  return NextResponse.json({ 
    success: true, 
    school: school[0], 
    admin_email,
    temp_password: tempPassword,
    message: `School registered! Send admin: email=${admin_email} password=${tempPassword}`
  });
}

export async function PATCH(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id, name, admin_email, city, state, phone, plan, max_students } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  await sql`
    UPDATE schools SET
      name = COALESCE(${name||null}, name),
      admin_email = COALESCE(${admin_email||null}, admin_email),
      city = COALESCE(${city||null}, city),
      state = COALESCE(${state||null}, state),
      phone = COALESCE(${phone||null}, phone),
      plan = COALESCE(${plan||null}, plan),
      max_students = COALESCE(${max_students||null}, max_students)
    WHERE id = ${id}
  `;
  // Also update the admin user email if changed
  if (admin_email) {
    await sql`UPDATE users SET email = ${admin_email} WHERE school_id = ${id} AND role = 'admin'`;
  }
  return NextResponse.json({ success: true });
}
