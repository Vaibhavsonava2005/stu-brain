import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from '@/lib/db';
import { signToken } from '@/lib/auth';

const attempts = new Map<string, { count: number; firstAt: number; blockedUntil?: number }>();
function getIp(req: NextRequest) { return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'; }
function checkRate(ip: string) {
  const now = Date.now(), rec = attempts.get(ip);
  if (rec?.blockedUntil && now < rec.blockedUntil) return { ok: false, wait: Math.ceil((rec.blockedUntil - now) / 1000) };
  if (rec?.blockedUntil) attempts.delete(ip);
  if (rec && now - rec.firstAt > 15 * 60 * 1000) attempts.delete(ip);
  const cur = attempts.get(ip) || { count: 0, firstAt: now };
  cur.count++;
  if (cur.count > 10) { cur.blockedUntil = now + 30 * 60 * 1000; attempts.set(ip, cur); return { ok: false, wait: 1800 }; }
  attempts.set(ip, cur);
  return { ok: true };
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIp(req);
    const rate = checkRate(ip);
    if (!rate.ok) return NextResponse.json({ error: `Too many attempts. Wait ${Math.ceil((rate.wait||1800)/60)} min.` }, { status: 429 });

    const { identifier, password } = await req.json();
    if (!identifier?.trim() || !password?.trim()) return NextResponse.json({ error: 'ID and password required' }, { status: 400 });

    const loginType = req.headers.get('x-login-type') || 'user';

    const users = await sql`
      SELECT u.*, s.name as school_name, s.white_label_name, s.code as school_code,
             s.is_locked, s.is_active, s.plan, s.tier, s.trial_start, s.logo_url, s.max_students
      FROM users u
      LEFT JOIN schools s ON u.school_id = s.id
      WHERE (u.email = ${identifier.trim()} OR u.student_id = ${identifier.trim()})
      LIMIT 1`;

    if (!users.length) {
      await bcrypt.compare(password, '$2a$10$dummyhashfortiming000000000000000');
      return NextResponse.json({ error: 'Invalid credentials. Check your ID and password.' }, { status: 401 });
    }

    const u = users[0];
    const valid = await bcrypt.compare(password, u.password_hash);
    if (!valid) return NextResponse.json({ error: 'Wrong password. Please try again.' }, { status: 401 });

    // Owner/superadmin check
    if (u.role === 'superadmin' && loginType !== 'owner') {
      return NextResponse.json({ error: '👑 Use the Owner login page: /owner' }, { status: 403 });
    }
    if (u.role !== 'superadmin' && loginType === 'owner') {
      return NextResponse.json({ error: 'Not an owner account.' }, { status: 403 });
    }

    // School checks (skip for superadmin)
    if (u.role !== 'superadmin' && u.school_id) {
      // Check trial expiry using trial_start (3 days)
      if ((u.plan === 'trial' || u.tier === 'trial') && u.trial_start) {
        const trialEnd = new Date(u.trial_start);
        trialEnd.setDate(trialEnd.getDate() + 3);
        if (new Date() > trialEnd) {
          return NextResponse.json({ error: '⏰ Trial ended (3 days). Contact STU-BRAIN to upgrade your plan!', expired: true }, { status: 403 });
        }
      }
      // Check locked - but NOT for demo school
      if (u.is_locked && u.school_code !== 'DEMO01') {
        return NextResponse.json({ error: '🔒 School access locked. Contact STU-BRAIN support.', locked: true }, { status: 403 });
      }
    }

    attempts.delete(ip);
    await sql`UPDATE users SET last_active = CURRENT_DATE WHERE id = ${u.id}`;

    const token = signToken({ id: u.id, role: u.role, name: u.name, school_id: u.school_id, class_level: u.class_level });

    return NextResponse.json({
      token,
      user: {
        id: u.id, name: u.name, role: u.role,
        class_level: u.class_level, school_name: u.school_name || u.white_label_name,
        student_id: u.student_id, total_xp: u.total_xp,
        school_code: u.school_code, plan: u.plan || u.tier || 'trial',
        school_id: u.school_id, logo_url: u.logo_url || null
      }
    });
  } catch (e: unknown) {
    console.error('Login error:', e instanceof Error ? e.message.slice(0, 80) : 'err');
    return NextResponse.json({ error: 'Login failed. Please try again.' }, { status: 500 });
  }
}
