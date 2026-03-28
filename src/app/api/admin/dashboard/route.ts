import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || !['admin','superadmin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const sid = user.school_id;

  // School info
  const [school] = await sql`SELECT * FROM schools WHERE id = ${sid}`;

  // Core counts
  const [counts] = await sql`
    SELECT
      COUNT(*) FILTER (WHERE role='student') as total_students,
      COUNT(*) FILTER (WHERE role='teacher') as total_teachers,
      COUNT(*) FILTER (WHERE role='admin')   as total_admins,
      SUM(total_xp) FILTER (WHERE role='student') as total_xp,
      COUNT(*) FILTER (WHERE role='student' AND last_active >= CURRENT_DATE - INTERVAL '2 days') as active_today
    FROM users WHERE school_id = ${sid}
  `;

  // Completion rate
  const [completion] = await sql`
    SELECT
      COUNT(*) FILTER (WHERE cp.completed = true) as done,
      COUNT(*) as total
    FROM users u
    LEFT JOIN chapter_progress cp ON cp.user_id = u.id
    WHERE u.school_id = ${sid} AND u.role = 'student'
  `;
  const completionPct = completion.total > 0
    ? Math.round((Number(completion.done) / Number(completion.total)) * 100) : 0;

  // Avg quiz score
  const [quiz] = await sql`
    SELECT COALESCE(AVG(cp.quiz_score) FILTER (WHERE cp.quiz_score > 0), 0)::INTEGER as avg_quiz
    FROM users u
    JOIN chapter_progress cp ON cp.user_id = u.id
    WHERE u.school_id = ${sid} AND u.role = 'student'
  `;

  // Class-wise breakdown
  const classBrk = await sql`
    SELECT
      u.class_level,
      u.section,
      COUNT(DISTINCT u.id) as student_count,
      COALESCE(SUM(u.total_xp),0) as class_xp,
      COUNT(cp.id) FILTER (WHERE cp.completed=true) as chapters_done,
      COALESCE(AVG(cp.quiz_score) FILTER (WHERE cp.quiz_score>0),0)::INTEGER as avg_quiz,
      COUNT(DISTINCT u.id) FILTER (WHERE u.last_active >= CURRENT_DATE-INTERVAL '2 days') as active_today
    FROM users u
    LEFT JOIN chapter_progress cp ON cp.user_id = u.id
    WHERE u.school_id = ${sid} AND u.role = 'student' AND u.class_level IS NOT NULL
    GROUP BY u.class_level, u.section
    ORDER BY u.class_level, u.section
  `;

  // Top students by XP
  const topStudents = await sql`
    SELECT u.name, u.student_id, u.class_level, u.section, u.total_xp,
      COUNT(cp.id) FILTER (WHERE cp.completed=true) as chapters_done
    FROM users u
    LEFT JOIN chapter_progress cp ON cp.user_id=u.id
    WHERE u.school_id=${sid} AND u.role='student'
    GROUP BY u.id ORDER BY u.total_xp DESC LIMIT 5
  `;

  // Struggling students (low quiz avg)
  const struggling = await sql`
    SELECT u.name, u.student_id, u.class_level, u.section, u.total_xp,
      COALESCE(AVG(cp.quiz_score) FILTER (WHERE cp.quiz_score>0),0)::INTEGER as avg_quiz,
      COUNT(cp.id) FILTER (WHERE cp.completed=true) as chapters_done
    FROM users u
    LEFT JOIN chapter_progress cp ON cp.user_id=u.id
    WHERE u.school_id=${sid} AND u.role='student'
    GROUP BY u.id
    HAVING COUNT(cp.id) FILTER (WHERE cp.completed=true) > 0
      AND COALESCE(AVG(cp.quiz_score) FILTER (WHERE cp.quiz_score>0),0) < 60
    ORDER BY avg_quiz ASC LIMIT 5
  `;

  // Top class by activity
  const topClass = classBrk.length > 0
    ? (classBrk.reduce((a, b) =>
        Number(b.chapters_done) > Number(a.chapters_done) ? b : a) as {class_level:number}).class_level
    : null;

  return NextResponse.json({
    school,
    stats: {
      total_students: Number(counts.total_students) || 0,
      total_teachers: Number(counts.total_teachers) || 0,
      total_xp: Number(counts.total_xp) || 0,
      active_today: Number(counts.active_today) || 0,
      completion_pct: completionPct,
      avg_quiz: Number(quiz.avg_quiz) || 0,
      top_class: topClass,
      // School license info
      plan: school?.plan || 'trial',
      is_locked: school?.is_locked ?? true,
      max_students: school?.max_students || 50,
      license_expires: school?.license_expires || null,
    },
    class_breakdown: classBrk,
    top_students: topStudents,
    struggling,
  });
}
