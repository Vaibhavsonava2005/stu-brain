import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from '@/lib/db';
import { signToken } from '@/lib/auth';

// 🔒 In-memory rate limiter (per IP, resets on cold start)
const attempts = new Map<string, { count: number; firstAt: number; blockedUntil?: number }>();

function getIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
    || req.headers.get('x-real-ip') 
    || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const rec = attempts.get(ip);
  
  // If blocked, check if block expired
  if (rec?.blockedUntil) {
    if (now < rec.blockedUntil) {
      return { allowed: false, retryAfter: Math.ceil((rec.blockedUntil - now) / 1000) };
    }
    attempts.delete(ip); // Block expired, reset
  }
  
  // Reset window after 15 minutes
  if (rec && now - rec.firstAt > 15 * 60 * 1000) {
    attempts.delete(ip);
  }
  
  const current = attempts.get(ip) || { count: 0, firstAt: now };
  current.count++;
  
  // Block after 10 failed attempts for 30 minutes
  if (current.count > 10) {
    current.blockedUntil = now + 30 * 60 * 1000;
    attempts.set(ip, current);
    return { allowed: false, retryAfter: 1800 };
  }
  
  attempts.set(ip, current);
  return { allowed: true };
}

function clearAttempts(ip: string) {
  attempts.delete(ip);
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIp(req);
    
    // 🔒 Rate limit check
    const limit = checkRateLimit(ip);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: `Too many login attempts. Try again in ${Math.ceil((limit.retryAfter||1800)/60)} minutes.` },
        { 
          status: 429,
          headers: { 'Retry-After': String(limit.retryAfter || 1800) }
        }
      );
    }

    const body = await req.json();
    const { identifier, password } = body;
    
    // 🔒 Input validation - prevent injection
    if (!identifier || !password) {
      return NextResponse.json({ error: 'ID and password required' }, { status: 400 });
    }
    if (typeof identifier !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    if (identifier.length > 100 || password.length > 100) {
      return NextResponse.json({ error: 'Invalid input length' }, { status: 400 });
    }

    // Find user
    const users = await sql`
      SELECT u.*, s.name as school_name, s.white_label_name, s.code as school_code,
             s.is_locked, s.is_active, s.plan, s.trial_expires, s.license_expires,
             s.logo_url
      FROM users u
      LEFT JOIN schools s ON u.school_id = s.id
      WHERE (u.email = ${identifier} OR u.student_id = ${identifier})
      LIMIT 1
    `;

    // 🔒 Constant time response - don't reveal if user exists
    if (!users.length) {
      await bcrypt.compare(password, '$2a$10$invalidhashfortimingatk'); // Dummy compare
      return NextResponse.json({ error: 'Invalid credentials. Please check your ID and password.' }, { status: 401 });
    }

    const u = users[0];
    const valid = await bcrypt.compare(password, u.password_hash);
    
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials. Please check your ID and password.' }, { status: 401 });
    }

    // ✅ Login success - clear rate limit
    clearAttempts(ip);

    // SuperAdmin bypass school checks
    if (u.role !== 'superadmin') {
      if (u.is_locked) {
        return NextResponse.json({ 
          error: '🔒 School access pending activation. Contact STU-BRAIN support.',
          locked: true
        }, { status: 403 });
      }
      if (u.plan === 'trial' && u.trial_expires && new Date(u.trial_expires) < new Date()) {
        return NextResponse.json({ 
          error: '⏰ Trial expired. Contact STU-BRAIN to upgrade.',
          expired: true
        }, { status: 403 });
      }
    }

    await sql`UPDATE users SET last_active = CURRENT_DATE WHERE id = ${u.id}`;

    const token = signToken({ 
      id: u.id, role: u.role, name: u.name, 
      school_id: u.school_id, class_level: u.class_level 
    });

    return NextResponse.json({
      token,
      user: {
        id: u.id, name: u.name, role: u.role,
        class_level: u.class_level, 
        school_name: u.school_name || u.white_label_name,
        white_label_name: u.white_label_name, 
        student_id: u.student_id,
        total_xp: u.total_xp,
        school_code: u.school_code, 
        plan: u.plan,
        school_id: u.school_id, 
        logo_url: u.logo_url || null
        // 🔒 Never return password_hash or sensitive DB fields
      }
    });
  } catch (e: unknown) {
    // 🔒 Never expose internal errors
    console.error('Login error:', e instanceof Error ? e.message.slice(0,50) : 'unknown');
    return NextResponse.json({ error: 'Login failed. Please try again.' }, { status: 500 });
  }
}
