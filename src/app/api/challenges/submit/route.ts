import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || user.role !== 'student') {
    return NextResponse.json({ error: 'Students only' }, { status: 403 });
  }

  const { challenge_id, answer } = await req.json();
  if (!challenge_id) return NextResponse.json({ error: 'Challenge ID required' }, { status: 400 });

  // Get challenge details
  const [challenge] = await sql`
    SELECT * FROM challenges WHERE id = ${challenge_id} AND school_id = ${user.school_id} AND is_active = true
  `;
  if (!challenge) return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });

  // Check not already submitted
  const existing = await sql`
    SELECT id FROM challenge_submissions WHERE challenge_id = ${challenge_id} AND student_id = ${user.id}
  `;
  if (existing.length > 0) return NextResponse.json({ error: 'Already submitted', already: true }, { status: 400 });

  const xp = challenge.xp_reward || 50;

  // Submit and award XP in one transaction
  await sql`
    INSERT INTO challenge_submissions (challenge_id, student_id, answer, xp_awarded)
    VALUES (${challenge_id}, ${user.id}, ${answer||'completed'}, ${xp})
  `;

  // Award XP to student — add to total_xp
  await sql`UPDATE users SET total_xp = total_xp + ${xp} WHERE id = ${user.id}`;

  return NextResponse.json({ success: true, xp_awarded: xp });
}
