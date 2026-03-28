import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

// Generate unique student ID: SCH001-9A-001
async function genStudentId(schoolId: number, classLevel: number, section: string): Promise<string> {
  const sch = String(schoolId).padStart(3,'0');
  const prefix = `S${sch}-${classLevel}${section.toUpperCase()}`;
  const existing = await sql`
    SELECT student_id FROM users
    WHERE school_id=${schoolId} AND role='student'
      AND student_id LIKE ${prefix+'%'}
    ORDER BY student_id DESC LIMIT 1
  `;
  if (existing.length === 0) return `${prefix}-001`;
  const last = existing[0].student_id as string;
  const num = parseInt(last.split('-').pop() || '0') + 1;
  return `${prefix}-${String(num).padStart(3,'0')}`;
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || !['admin','superadmin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { students } = await req.json();
  if (!students?.length) return NextResponse.json({ error: 'No students provided' }, { status: 400 });

  const defaultPassHash = await bcrypt.hash('Student@123', 10);
  let enrolled = 0;
  const errors: string[] = [];
  const enrolled_list: Record<string, unknown>[] = [];

  for (const s of students) {
    try {
      const name = (s.name || s.Name || '').trim();
      if (!name) { errors.push('Row skipped: missing name'); continue; }

      const cls = parseInt(s.class_level || s.class || s.Class || s.CLASS || '9');
      if (![8,9,10,11,12].includes(cls)) {
        errors.push(`${name}: invalid class "${s.class_level||s.class}" (use 8-12)`);
        continue;
      }

      const section = (s.section || s.Section || s.SECTION || 'A').trim().toUpperCase();
      const phone = (s.phone || s.Phone || '').trim() || null;
      const customPass = (s.password || s.Password || '').trim();
      const passHash = customPass ? await bcrypt.hash(customPass, 10) : defaultPassHash;

      // Auto-generate student ID if not provided
      let studentId = (s.student_id || s.id || s.roll || s.StudentID || '').trim();
      if (!studentId) {
        studentId = await genStudentId(user.school_id, cls, section);
      }

      // Auto-generate email from student ID
      const emailInput = (s.email || s.Email || '').trim();
      const email = emailInput || `${studentId.toLowerCase().replace(/[^a-z0-9]/g,'')}@s${user.school_id}.local`;

      const result = await sql`
        INSERT INTO users (school_id, name, email, student_id, password_hash, role, class_level, section, phone)
        VALUES (${user.school_id}, ${name}, ${email}, ${studentId}, ${passHash}, 'student', ${cls}, ${section}, ${phone})
        ON CONFLICT (email) DO UPDATE SET
          name = EXCLUDED.name,
          student_id = EXCLUDED.student_id,
          class_level = EXCLUDED.class_level,
          section = EXCLUDED.section,
          phone = COALESCE(EXCLUDED.phone, users.phone),
          password_hash = CASE WHEN ${!!customPass} THEN EXCLUDED.password_hash ELSE users.password_hash END
        RETURNING id, name, student_id, class_level, section, email
      `;

      if (result.length) { enrolled++; enrolled_list.push(result[0]); }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      errors.push(`${s.name||'Row'}: ${msg.includes('unique')?'Duplicate student ID':msg.slice(0,60)}`);
    }
  }

  return NextResponse.json({
    success: true, enrolled, errors,
    students: enrolled_list,
    message: `✅ ${enrolled} students enrolled! Default password: Student@123`
  });
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || !['admin','superadmin','teacher'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const classFilter = searchParams.get('class');
  const sectionFilter = searchParams.get('section');
  const search = searchParams.get('search') || '';

  const students = await sql`
    SELECT u.id, u.name, u.email, u.student_id, u.class_level, u.section, u.phone,
           u.total_xp, u.streak_days, u.last_active, u.created_at,
           COUNT(cp.id) FILTER (WHERE cp.completed = true) as chapters_done,
           COALESCE(AVG(cp.quiz_score) FILTER (WHERE cp.quiz_score > 0), 0)::INTEGER as avg_quiz
    FROM users u
    LEFT JOIN chapter_progress cp ON cp.user_id = u.id
    WHERE u.school_id = ${user.school_id} AND u.role = 'student'
      AND (${classFilter||null}::text IS NULL OR u.class_level = ${classFilter?parseInt(classFilter):0}::int OR ${classFilter||null}::text IS NULL)
      AND (${sectionFilter||null}::text IS NULL OR UPPER(u.section) = UPPER(${sectionFilter||''}))
      AND (${search} = '' OR LOWER(u.name) LIKE ${('%'+search+'%').toLowerCase()} OR LOWER(u.student_id) LIKE ${('%'+search+'%').toLowerCase()})
    GROUP BY u.id ORDER BY u.class_level, u.section, u.name
  `;

  return NextResponse.json({ students, total: students.length });
}
