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
      COUNT(DISTINCT u.id) FILTER (WHERE u.role='teacher') as teacher_count
    FROM schools s LEFT JOIN users u ON u.school_id = s.id
    GROUP BY s.id ORDER BY s.created_at DESC`;
  return NextResponse.json({ schools });
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ','');
  const user = verifyToken(auth||'');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error:'Forbidden' },{status:403});

  try {
    const body = await req.json();
    const { name, admin_email, city='', state='Rajasthan', phone='', plan='trial' } = body;
    
    if (!name?.trim()) return NextResponse.json({ error:'School name is required' },{status:400});
    if (!admin_email?.trim()) return NextResponse.json({ error:'Admin email is required' },{status:400});

    // Check email not already used
    const existing = await sql`SELECT id FROM users WHERE email = ${admin_email.trim()} LIMIT 1`;
    if (existing.length > 0) {
      return NextResponse.json({ error:`Email ${admin_email} is already registered. Use a different email.` },{status:400});
    }

    const maxStudents = plan==='unlimited'?99999:plan==='medium'?600:plan==='starter'?250:50;
    const isActive = plan !== 'trial';
    const code = 'SCH' + Math.random().toString(36).slice(2,8).toUpperCase();
    const tempPass = 'STB@' + Math.random().toString(36).slice(2,7).toUpperCase();
    const passHash = await bcrypt.hash(tempPass, 10);

    // Add trial_start column if missing
    try { await sql`ALTER TABLE schools ADD COLUMN IF NOT EXISTS trial_start DATE DEFAULT CURRENT_DATE`; } catch {}
    try { await sql`ALTER TABLE schools ADD COLUMN IF NOT EXISTS tier VARCHAR(20) DEFAULT 'trial'`; } catch {}
    try { await sql`ALTER TABLE schools ADD COLUMN IF NOT EXISTS max_students INTEGER DEFAULT 50`; } catch {}

    // Create school
    const [school] = await sql`
      INSERT INTO schools (name, code, admin_email, city, state, phone, plan, tier, is_active, is_locked, max_students, trial_start, created_at)
      VALUES (${name.trim()}, ${code}, ${admin_email.trim()}, ${city||''}, ${state||'Rajasthan'}, ${phone||''}, 
              ${plan}, ${plan}, ${isActive}, ${!isActive}, ${maxStudents}, CURRENT_DATE, NOW())
      RETURNING *`;

    // Create admin user
    await sql`
      INSERT INTO users (name, email, password_hash, role, school_id, created_at)
      VALUES (${name.trim() + ' Admin'}, ${admin_email.trim()}, ${passHash}, 'admin', ${school.id}, NOW())`;

    return NextResponse.json({
      success: true,
      school,
      admin_email: admin_email.trim(),
      temp_password: tempPass,
      school_code: code
    });

  } catch (e: unknown) {
    console.error('Add school error:', e);
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to add school: ' + msg },{status:500});
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
  } catch(e:unknown) {
    return NextResponse.json({ error: e instanceof Error?e.message:'Error' },{status:500});
  }
}
