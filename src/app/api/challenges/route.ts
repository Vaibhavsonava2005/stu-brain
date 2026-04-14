import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user) return NextResponse.json({ challenges: [] });

  const { searchParams } = new URL(req.url);
  const class_level = searchParams.get('class_level');

  let challenges;
  if (user.role === 'student') {
    // Students see challenges for their class + school
    challenges = await sql`
      SELECT c.*, u.name as teacher_name,
        cs.id as submission_id, cs.xp_awarded, cs.submitted_at
      FROM challenges c
      LEFT JOIN users u ON u.id = c.teacher_id
      LEFT JOIN challenge_submissions cs ON cs.challenge_id = c.id AND cs.student_id = ${user.id}
      WHERE c.school_id = ${user.school_id} AND c.is_active = true
        AND (c.class_level IS NULL OR c.class_level = ${user.class_level||8})
        AND (c.due_date IS NULL OR c.due_date >= CURRENT_DATE)
      ORDER BY c.created_at DESC
    `;
  } else {
    // Teachers/admins see all challenges for their school
    const cls = class_level ? parseInt(class_level) : null;
    challenges = await sql`
      SELECT c.*, u.name as teacher_name,
        COUNT(cs.id) as submission_count,
        COUNT(cs.id) FILTER (WHERE cs.xp_awarded > 0) as awarded_count
      FROM challenges c
      LEFT JOIN users u ON u.id = c.teacher_id
      LEFT JOIN challenge_submissions cs ON cs.challenge_id = c.id
      WHERE c.school_id = ${user.school_id}
        AND (${cls}::integer IS NULL OR c.class_level = ${cls})
      GROUP BY c.id, u.name
      ORDER BY c.created_at DESC
    `;
  }
  return NextResponse.json({ challenges });
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || !['teacher','admin'].includes(user.role)) {
    return NextResponse.json({ error: 'Teachers and admins only' }, { status: 403 });
  }

  const { title, description, class_level, xp_reward, due_date } = await req.json();
  if (!title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 });

  const [challenge] = await sql`
    INSERT INTO challenges (school_id, teacher_id, title, description, class_level, xp_reward, due_date)
    VALUES (${user.school_id}, ${user.id}, ${title}, ${description||''}, ${class_level||null}, ${xp_reward||50}, ${due_date||null})
    RETURNING *
  `;
  return NextResponse.json({ success: true, challenge });
}

export async function PATCH(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || !['teacher','admin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id, title, description, class_level, xp_reward, due_date, is_active } = await req.json();
  await sql`
    UPDATE challenges SET
      title = COALESCE(${title}, title),
      description = COALESCE(${description}, description),
      class_level = ${class_level??null},
      xp_reward = COALESCE(${xp_reward}, xp_reward),
      due_date = ${due_date??null},
      is_active = COALESCE(${is_active??null}, is_active),
      updated_at = NOW()
    WHERE id = ${id} AND school_id = ${user.school_id}
  `;
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || !['teacher','admin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await req.json();
  await sql`DELETE FROM challenges WHERE id = ${id} AND school_id = ${user.school_id}`;
  return NextResponse.json({ success: true });
}
