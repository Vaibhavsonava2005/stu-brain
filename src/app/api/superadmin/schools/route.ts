import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const schools = await sql`
    SELECT s.*,
      COUNT(DISTINCT u.id) FILTER (WHERE u.role='student') as student_count,
      COUNT(DISTINCT u.id) FILTER (WHERE u.role='teacher') as teacher_count,
      CASE 
        WHEN s.tier='trial' AND s.trial_start + INTERVAL '3 days' < CURRENT_DATE THEN true
        ELSE false
      END as trial_expired
    FROM schools s
    LEFT JOIN users u ON u.school_id = s.id
    GROUP BY s.id ORDER BY s.created_at DESC
  `;

  // Auto-lock expired trials
  await sql`
    UPDATE schools SET is_locked=true, is_active=false
    WHERE tier='trial' AND trial_start + INTERVAL '3 days' < CURRENT_DATE
    AND is_locked=false
  `;

  return NextResponse.json({ schools });
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { name, admin_email, city, state, phone, tier = 'trial' } = await req.json();
  if (!name || !admin_email) return NextResponse.json({ error: 'Name and admin email required' }, { status: 400 });

  const code = 'SCH' + Date.now().toString(36).toUpperCase();
  const maxStudents = tier === 'starter' ? 250 : tier === 'medium' ? 600 : tier === 'unlimited' ? 99999 : 50;

  const [school] = await sql`
    INSERT INTO schools (name, code, admin_email, city, state, phone, tier, plan,
      is_active, is_locked, max_students, trial_start)
    VALUES (${name}, ${code}, ${admin_email}, ${city||''}, ${state||'Rajasthan'}, ${phone||''},
      ${tier}, ${tier}, ${tier!=='trial'}, ${tier==='trial'}, ${maxStudents}, CURRENT_DATE)
    RETURNING *
  `;
  return NextResponse.json({ success: true, school });
}

export async function PATCH(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id, name, city, phone, tier, is_active, is_locked, admin_email } = await req.json();

  // Update max_students based on tier
  const maxStudents = tier === 'starter' ? 250 : tier === 'medium' ? 600 : tier === 'unlimited' ? 99999 : 
    tier === 'trial' ? 50 : null;

  await sql`
    UPDATE schools SET
      name = COALESCE(${name}, name),
      city = COALESCE(${city}, city),
      phone = COALESCE(${phone}, phone),
      admin_email = COALESCE(${admin_email}, admin_email),
      tier = COALESCE(${tier}, tier),
      plan = COALESCE(${tier}, plan),
      is_active = COALESCE(${is_active??null}, is_active),
      is_locked = COALESCE(${is_locked??null}, is_locked),
      max_students = CASE WHEN ${maxStudents}::integer IS NOT NULL THEN ${maxStudents} ELSE max_students END
    WHERE id = ${id}
  `;
  return NextResponse.json({ success: true });
}
