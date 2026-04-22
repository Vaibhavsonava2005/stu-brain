import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from '@/lib/db';
import { signToken } from '@/lib/auth';

async function ensureTables() {
  await sql`CREATE TABLE IF NOT EXISTS b2c_students (
    id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL, password_hash VARCHAR(300) NOT NULL,
    class_level INTEGER NOT NULL, state_name VARCHAR(100), city VARCHAR(100),
    parent_email VARCHAR(200), parent_linked BOOLEAN DEFAULT FALSE,
    total_xp INTEGER DEFAULT 0, created_at TIMESTAMP DEFAULT NOW(), last_active DATE DEFAULT CURRENT_DATE
  )`;
  await sql`CREATE TABLE IF NOT EXISTS b2c_progress (
    id SERIAL PRIMARY KEY, student_id INTEGER REFERENCES b2c_students(id) ON DELETE CASCADE,
    chapter_id VARCHAR(50) NOT NULL, class_level INTEGER NOT NULL,
    completed BOOLEAN DEFAULT FALSE, xp_earned INTEGER DEFAULT 0,
    quiz_score INTEGER DEFAULT 0, completed_at TIMESTAMP,
    UNIQUE(student_id, chapter_id)
  )`;
  await sql`CREATE TABLE IF NOT EXISTS b2c_certificates (
    id SERIAL PRIMARY KEY, student_id INTEGER REFERENCES b2c_students(id) ON DELETE CASCADE,
    class_level INTEGER NOT NULL, cert_id VARCHAR(100) UNIQUE NOT NULL,
    issued_at TIMESTAMP DEFAULT NOW(), UNIQUE(student_id, class_level)
  )`;
}

export async function POST(req: NextRequest) {
  try {
    const { action, name, email, password, class_level, parent_email, state_name, city } = await req.json();

    if (action === 'signup') {
      if (!name?.trim() || !email?.trim() || !password?.trim() || !class_level) {
        return NextResponse.json({ error:'Name, email, password and class are required' },{status:400});
      }
      await ensureTables();
      const existing = await sql`SELECT id FROM b2c_students WHERE email=${email.trim().toLowerCase()} LIMIT 1`;
      if (existing.length > 0) return NextResponse.json({ error:'Email already registered. Please login.' },{status:400});
      const hash = await bcrypt.hash(password, 10);
      const [student] = await sql`
        INSERT INTO b2c_students (name,email,password_hash,class_level,state_name,city,parent_email)
        VALUES (${name.trim()},${email.trim().toLowerCase()},${hash},${parseInt(class_level)},${state_name||''},${city||''},${parent_email||null})
        RETURNING id,name,email,class_level,state_name,city,total_xp,parent_email`;
      const token = signToken({ id:student.id, role:'b2c_student', name:student.name, school_id:null, class_level:student.class_level });
      return NextResponse.json({ success:true, token, user:{...student, role:'b2c_student'} });
    }

    if (action === 'login') {
      if (!email?.trim() || !password?.trim()) return NextResponse.json({ error:'Email and password required' },{status:400});
      try { await sql`SELECT 1 FROM b2c_students LIMIT 1`; } catch { return NextResponse.json({ error:'No account found. Please sign up first.' },{status:404}); }
      const [student] = await sql`SELECT * FROM b2c_students WHERE email=${email.trim().toLowerCase()} LIMIT 1`;
      if (!student) return NextResponse.json({ error:'Email not found. Please sign up first.' },{status:401});
      const valid = await bcrypt.compare(password, student.password_hash);
      if (!valid) return NextResponse.json({ error:'Wrong password. Please try again.' },{status:401});
      await sql`UPDATE b2c_students SET last_active=CURRENT_DATE WHERE id=${student.id}`;
      const token = signToken({ id:student.id, role:'b2c_student', name:student.name, school_id:null, class_level:student.class_level });
      return NextResponse.json({ success:true, token, user:{ id:student.id, name:student.name, email:student.email, role:'b2c_student', class_level:student.class_level, state_name:student.state_name, city:student.city, total_xp:student.total_xp, parent_email:student.parent_email } });
    }
    return NextResponse.json({ error:'Invalid action' },{status:400});
  } catch(e:unknown) { return NextResponse.json({ error: e instanceof Error?e.message:'Server error' },{status:500}); }
}
