import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const class_level = searchParams.get('class_level');
  const type = searchParams.get('type') || 'class'; // 'class' or 'school'

  if (type === 'school') {
    // Overall school leaderboard - top 10 by total XP across ALL their classes
    const rows = await sql`
      SELECT 
        u.id, u.name, u.class_level, u.section, u.student_id,
        COALESCE(SUM(cp.xp_earned) FILTER (WHERE cp.class_level = u.class_level), 0)::INTEGER as class_xp,
        u.total_xp,
        COUNT(cp.id) FILTER (WHERE cp.completed = true AND cp.class_level = u.class_level) as chapters_done
      FROM users u
      LEFT JOIN chapter_progress cp ON cp.user_id = u.id
      WHERE u.school_id = ${user.school_id} AND u.role = 'student'
      GROUP BY u.id
      ORDER BY u.total_xp DESC
      LIMIT 10
    `;
    return NextResponse.json({ leaderboard: rows, type: 'school' });
  }

  // Class-specific leaderboard — XP earned ONLY in this class
  const cls = parseInt(class_level || String(user.class_level || 8));
  const rows = await sql`
    SELECT 
      u.id, u.name, u.class_level, u.section, u.student_id,
      COALESCE(SUM(cp.xp_earned), 0)::INTEGER as class_xp,
      COUNT(cp.id) FILTER (WHERE cp.completed = true) as chapters_done,
      COALESCE(AVG(cp.quiz_score) FILTER (WHERE cp.quiz_score > 0), 0)::INTEGER as avg_quiz
    FROM users u
    LEFT JOIN chapter_progress cp ON cp.user_id = u.id AND cp.class_level = ${cls}
    WHERE u.school_id = ${user.school_id} AND u.role = 'student'
    GROUP BY u.id
    ORDER BY class_xp DESC, chapters_done DESC
    LIMIT 10
  `;
  return NextResponse.json({ leaderboard: rows, class_level: cls, type: 'class' });
}
