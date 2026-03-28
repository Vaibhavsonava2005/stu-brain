import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = verifyToken(auth);
  if (!user || user.role !== 'teacher') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { class_level, chapter_id, title, instructions, due_date } = await req.json();
  const result = await sql`
    INSERT INTO assignments (teacher_id, school_id, class_level, chapter_id, title, instructions, due_date)
    VALUES (${user.id}, ${user.school_id}, ${class_level}, ${chapter_id}, ${title}, ${instructions}, ${due_date})
    RETURNING id
  `;
  return NextResponse.json({ success: true, id: result[0].id });
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = verifyToken(auth);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const assignments = await sql`
    SELECT a.*, u.name as teacher_name,
      (SELECT COUNT(*) FROM chapter_progress cp2
       INNER JOIN users u2 ON cp2.user_id = u2.id
       WHERE cp2.chapter_id = a.chapter_id AND u2.class_level = a.class_level AND u2.school_id = a.school_id AND cp2.completed = true
      ) as submitted_count,
      (SELECT COUNT(*) FROM users u3 WHERE u3.class_level = a.class_level AND u3.school_id = a.school_id AND u3.role = 'student') as total_students
    FROM assignments a
    JOIN users u ON a.teacher_id = u.id
    WHERE a.school_id = ${user.school_id}
    ORDER BY a.created_at DESC
    LIMIT 20
  `;
  return NextResponse.json({ assignments });
}
