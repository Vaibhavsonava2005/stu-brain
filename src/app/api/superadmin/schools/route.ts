import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ','');
  const user = verifyToken(auth||'');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error:'Forbidden' },{status:403});

  // Auto-lock expired trials
  try {
    await sql`UPDATE schools SET is_locked=true, is_active=false
      WHERE (tier='trial' OR plan='trial')
      AND trial_start IS NOT NULL
      AND trial_start + INTERVAL '3 days' < CURRENT_DATE
      AND is_locked=false`;
  } catch {}

  const schools = await sql`
    SELECT s.*,
      COUNT(DISTINCT u.id) FILTER (WHERE u.role='student') as student_count,
      COUNT(DISTINCT u.id) FILTER (WHERE u.role='teacher') as teacher_count,
      COUNT(DISTINCT u.id) FILTER (WHERE u.role='admin') as admin_count
    FROM schools s
    LEFT JOIN users u ON u.school_id = s.id
    GROUP BY s.id
    ORDER BY s.created_at DESC NULLS LAST`;

  const stats = {
    total_schools: schools.length,
    active_schools: schools.filter((s: Record<string,unknown>) => s.is_active && !s.is_locked).length,
    locked_schools: schools.filter((s: Record<string,unknown>) => s.is_locked).length,
    total_students: schools.reduce((a: number, s: Record<string,unknown>) => a + Number(s.student_count||0), 0),
  };

  return NextResponse.json({ schools, stats });
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ','');
  const user = verifyToken(auth||'');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error:'Forbidden' },{status:403});

  try {
    const { name, admin_email, city='', state='Rajasthan', phone='', plan='trial' } = await req.json();
    if (!name?.trim()) return NextResponse.json({ error:'School name is required' },{status:400});
    if (!admin_email?.trim()) return NextResponse.json({ error:'Admin email is required' },{status:400});

    const existing = await sql`SELECT id FROM users WHERE email = ${admin_email.trim()} LIMIT 1`;
    if (existing.length > 0) return NextResponse.json({ error:`Email ${admin_email} already registered.` },{status:400});

    const maxStudents = plan==='unlimited'?99999:plan==='medium'?600:plan==='starter'?250:50;
    const code = 'SCH' + Math.random().toString(36).slice(2,8).toUpperCase();
    const tempPass = 'STB@' + Math.random().toString(36).slice(2,7).toUpperCase();
    const passHash = await bcrypt.hash(tempPass, 10);

    // Ensure columns exist
    try { await sql`ALTER TABLE schools ADD COLUMN IF NOT EXISTS trial_start DATE DEFAULT CURRENT_DATE`; } catch {}
    try { await sql`ALTER TABLE schools ADD COLUMN IF NOT EXISTS tier VARCHAR(20) DEFAULT 'trial'`; } catch {}
    try { await sql`ALTER TABLE schools ADD COLUMN IF NOT EXISTS max_students INTEGER DEFAULT 50`; } catch {}

    const [school] = await sql`
      INSERT INTO schools (name, code, admin_email, city, state, phone, plan, tier,
        is_active, is_locked, max_students, trial_start, created_at)
      VALUES (${name.trim()}, ${code}, ${admin_email.trim()}, ${city}, ${state||'Rajasthan'},
        ${phone}, ${plan}, ${plan}, ${plan!=='trial'}, ${plan==='trial'}, ${maxStudents}, CURRENT_DATE, NOW())
      RETURNING *`;

    await sql`INSERT INTO users (name, email, password_hash, role, school_id, created_at)
      VALUES (${name.trim()+' Admin'}, ${admin_email.trim()}, ${passHash}, 'admin', ${school.id}, NOW())`;

    return NextResponse.json({ success:true, school, admin_email: admin_email.trim(), temp_password: tempPass, school_code: code });
  } catch (e:unknown) {
    const msg = e instanceof Error ? e.message : 'Error';
    return NextResponse.json({ error:'Failed: '+msg },{status:500});
  }
}

export async function PATCH(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ','');
  const user = verifyToken(auth||'');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error:'Forbidden' },{status:403});
  try {
    const { id, name, city, phone, plan, is_active, is_locked, admin_email } = await req.json();
    const maxS = plan==='unlimited'?99999:plan==='medium'?600:plan==='starter'?250:plan==='trial'?50:null;
    await sql`UPDATE schools SET
      name=COALESCE(${name??null},name), city=COALESCE(${city??null},city),
      phone=COALESCE(${phone??null},phone), admin_email=COALESCE(${admin_email??null},admin_email),
      plan=COALESCE(${plan??null},plan), tier=COALESCE(${plan??null},tier),
      is_active=COALESCE(${is_active??null},is_active), is_locked=COALESCE(${is_locked??null},is_locked),
      max_students=COALESCE(${maxS??null},max_students)
      WHERE id=${id}`;
    return NextResponse.json({ success:true });
  } catch(e:unknown) { return NextResponse.json({ error: e instanceof Error?e.message:'Error' },{status:500}); }
}

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ','');
  const user = verifyToken(auth||'');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error:'Forbidden' },{status:403});
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error:'School ID required' },{status:400});
    // Delete all data for this school in order
    await sql`DELETE FROM challenge_submissions WHERE challenge_id IN (SELECT id FROM challenges WHERE school_id=${id})`;
    await sql`DELETE FROM challenges WHERE school_id=${id}`;
    await sql`DELETE FROM certificates WHERE school_id=${id}`;
    await sql`DELETE FROM chapter_progress WHERE user_id IN (SELECT id FROM users WHERE school_id=${id})`;
    await sql`DELETE FROM quiz_results WHERE user_id IN (SELECT id FROM users WHERE school_id=${id})`;
    await sql`DELETE FROM assignments WHERE school_id=${id}`;
    await sql`DELETE FROM users WHERE school_id=${id}`;
    await sql`DELETE FROM schools WHERE id=${id}`;
    return NextResponse.json({ success:true, message:'School and all data permanently deleted.' });
  } catch(e:unknown) { return NextResponse.json({ error: e instanceof Error?e.message:'Error' },{status:500}); }
}
