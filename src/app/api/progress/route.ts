import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = verifyToken(auth);
  if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

  const { chapter_id, class_level, completed, xp_earned, quiz_score, slides_seen } = await req.json();

  // Check existing progress to avoid double-counting XP
  const existing = await sql`
    SELECT id, completed, xp_earned FROM chapter_progress
    WHERE user_id = ${user.id} AND chapter_id = ${chapter_id}
  `;

  const wasAlreadyCompleted = existing.length > 0 && existing[0].completed;
  const prevXP = existing.length > 0 ? (existing[0].xp_earned as number) : 0;

  await sql`
    INSERT INTO chapter_progress (user_id, chapter_id, class_level, completed, xp_earned, quiz_score, slides_seen, completed_at)
    VALUES (${user.id}, ${chapter_id}, ${class_level}, ${completed}, ${xp_earned}, ${quiz_score || 0}, ${slides_seen || 0}, ${completed ? sql`NOW()` : null})
    ON CONFLICT (user_id, chapter_id) DO UPDATE SET
      completed = GREATEST(chapter_progress.completed::int, EXCLUDED.completed::int)::boolean,
      xp_earned = GREATEST(chapter_progress.xp_earned, EXCLUDED.xp_earned),
      quiz_score = GREATEST(chapter_progress.quiz_score, EXCLUDED.quiz_score),
      slides_seen = GREATEST(chapter_progress.slides_seen, EXCLUDED.slides_seen),
      completed_at = COALESCE(chapter_progress.completed_at, EXCLUDED.completed_at)
  `;

  // Only add XP to user total if this is a NEW completion (not already completed)
  if (completed && xp_earned > 0 && !wasAlreadyCompleted) {
    await sql`UPDATE users SET total_xp = total_xp + ${xp_earned} WHERE id = ${user.id}`;
  }
  // If quiz score improved, update streak
  await sql`UPDATE users SET last_active = CURRENT_DATE WHERE id = ${user.id}`;

  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = verifyToken(auth);
  if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

  const progress = await sql`
    SELECT chapter_id, class_level, completed, xp_earned, quiz_score, slides_seen, completed_at
    FROM chapter_progress WHERE user_id = ${user.id}
  `;
  const userData = await sql`SELECT total_xp, streak_days FROM users WHERE id = ${user.id}`;

  return NextResponse.json({
    progress,
    total_xp: userData[0]?.total_xp || 0,
    streak: userData[0]?.streak_days || 0
  });
}
