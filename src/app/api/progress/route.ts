import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = verifyToken(auth);
  if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

  const progress = await sql`
    SELECT chapter_id, class_level, completed, xp_earned, quiz_score, slides_seen, completed_at
    FROM chapter_progress WHERE user_id = ${user.id}
  `;
  const [u] = await sql`SELECT total_xp FROM users WHERE id = ${user.id}`;
  return NextResponse.json({ progress, total_xp: u?.total_xp || 0 });
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = verifyToken(auth);
  if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

  const { chapter_id, class_level, completed, xp_earned, quiz_score } = await req.json();

  // XP ONLY awarded for student's own enrolled class — no XP for other classes
  const studentClass = user.class_level;
  const isOwnClass = studentClass && parseInt(class_level) === studentClass;

  // Check existing to avoid double-counting XP
  const existing = await sql`
    SELECT id, completed, xp_earned FROM chapter_progress
    WHERE user_id = ${user.id} AND chapter_id = ${chapter_id}
  `;

  const wasCompleted = existing.length > 0 && existing[0].completed;
  const prevXP = existing.length > 0 ? Number(existing[0].xp_earned) : 0;

  // Upsert progress
  if (existing.length > 0) {
    await sql`
      UPDATE chapter_progress SET
        completed = ${completed},
        xp_earned = ${xp_earned || prevXP},
        quiz_score = ${quiz_score || 0},
        completed_at = ${completed ? sql`NOW()` : sql`completed_at`}
      WHERE user_id = ${user.id} AND chapter_id = ${chapter_id}
    `;
  } else {
    await sql`
      INSERT INTO chapter_progress (user_id, chapter_id, class_level, completed, xp_earned, quiz_score, completed_at)
      VALUES (${user.id}, ${chapter_id}, ${class_level}, ${completed}, ${xp_earned || 0}, ${quiz_score || 0}, ${completed ? sql`NOW()` : null})
    `;
  }

  // Update total_xp ONLY if completing own class chapter for first time
  if (completed && !wasCompleted && isOwnClass && xp_earned > 0) {
    await sql`UPDATE users SET total_xp = total_xp + ${xp_earned}, last_active = CURRENT_DATE WHERE id = ${user.id}`;
  } else {
    await sql`UPDATE users SET last_active = CURRENT_DATE WHERE id = ${user.id}`;
  }

  return NextResponse.json({ success: true, xp_awarded: (completed && !wasCompleted && isOwnClass) ? xp_earned : 0 });
}
