import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = verifyToken(auth);
  if (!user || !['teacher','admin','superadmin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const classFilter = searchParams.get('class');
  const sectionFilter = searchParams.get('section');
  const search = searchParams.get('search') || '';
  const ts = Date.now(); // cache-busting

  // Real-time student progress — no caching
  const students = await sql`
    SELECT
      u.id, u.name, u.student_id, u.class_level, u.section, u.phone, u.email,
      u.total_xp, u.last_active,
      COUNT(cp.id) FILTER (WHERE cp.completed = true) as chapters_done,
      COALESCE(AVG(cp.quiz_score) FILTER (WHERE cp.quiz_score > 0), 0)::INTEGER as avg_quiz,
      MAX(cp.completed_at) as last_chapter_at
    FROM users u
    LEFT JOIN chapter_progress cp ON cp.user_id = u.id
    WHERE u.school_id = ${user.school_id} AND u.role = 'student'
      AND (${classFilter||null}::text IS NULL OR u.class_level::text = ${classFilter||''})
      AND (${sectionFilter||null}::text IS NULL OR UPPER(u.section) = UPPER(${sectionFilter||''}))
      AND (${search}='' OR LOWER(u.name) LIKE ${('%'+search+'%').toLowerCase()} 
           OR LOWER(COALESCE(u.student_id,'')) LIKE ${('%'+search+'%').toLowerCase()})
    GROUP BY u.id
    ORDER BY u.class_level, u.section, u.name
  `;

  // Class + section stats (real-time)
  const classStats = await sql`
    SELECT
      u.class_level, u.section,
      COUNT(DISTINCT u.id) as student_count,
      COALESCE(AVG(u.total_xp),0)::INTEGER as avg_xp,
      COUNT(cp.id) FILTER (WHERE cp.completed=true) as chapters_done,
      COALESCE(AVG(cp.quiz_score) FILTER (WHERE cp.quiz_score>0),0)::INTEGER as avg_quiz,
      COUNT(DISTINCT u.id) FILTER (WHERE u.last_active >= CURRENT_DATE - INTERVAL '2 days') as active_today
    FROM users u
    LEFT JOIN chapter_progress cp ON cp.user_id = u.id
    WHERE u.school_id = ${user.school_id} AND u.role = 'student' AND u.class_level IS NOT NULL
    GROUP BY u.class_level, u.section ORDER BY u.class_level, u.section
  `;

  return NextResponse.json({
    students,
    classStats,
    total: students.length,
    timestamp: ts // include timestamp so client knows it's fresh
  });
}
