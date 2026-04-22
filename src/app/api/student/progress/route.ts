import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ','');
  const user = verifyToken(auth||'');
  if (!user || user.role !== 'b2c_student') return NextResponse.json({ progress:[], total_xp:0 });
  try {
    const progress = await sql`SELECT chapter_id,class_level,completed,xp_earned,quiz_score FROM b2c_progress WHERE student_id=${user.id}`;
    const [s] = await sql`SELECT total_xp FROM b2c_students WHERE id=${user.id}`;
    return NextResponse.json({ progress, total_xp: s?.total_xp||0 });
  } catch { return NextResponse.json({ progress:[], total_xp:0 }); }
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ','');
  const user = verifyToken(auth||'');
  if (!user || user.role !== 'b2c_student') return NextResponse.json({ error:'Unauthorized' },{status:401});
  try {
    const { chapter_id, class_level, completed, xp_earned, quiz_score } = await req.json();
    const isOwnClass = user.class_level && parseInt(class_level) === user.class_level;
    const existing = await sql`SELECT id,completed,xp_earned FROM b2c_progress WHERE student_id=${user.id} AND chapter_id=${chapter_id}`;
    const wasCompleted = existing.length > 0 && existing[0].completed;
    if (existing.length > 0) {
      await sql`UPDATE b2c_progress SET completed=${completed}, xp_earned=${xp_earned||existing[0].xp_earned}, quiz_score=${quiz_score||0}, completed_at=${completed?sql`NOW()`:sql`completed_at`} WHERE student_id=${user.id} AND chapter_id=${chapter_id}`;
    } else {
      await sql`INSERT INTO b2c_progress (student_id,chapter_id,class_level,completed,xp_earned,quiz_score,completed_at) VALUES (${user.id},${chapter_id},${class_level},${completed},${xp_earned||0},${quiz_score||0},${completed?sql`NOW()`:null})`;
    }
    if (completed && !wasCompleted && isOwnClass && xp_earned > 0) {
      await sql`UPDATE b2c_students SET total_xp=total_xp+${xp_earned},last_active=CURRENT_DATE WHERE id=${user.id}`;
    }
    return NextResponse.json({ success:true });
  } catch(e:unknown) { return NextResponse.json({ error: e instanceof Error?e.message:'Error' },{status:500}); }
}
