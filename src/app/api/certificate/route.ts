import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || user.role !== 'student') {
    return NextResponse.json({ error: 'Students only' }, { status: 403 });
  }

  const { class_level } = await req.json();
  const cls = Number(class_level);
  if (![8,9,10,11,12].includes(cls)) {
    return NextResponse.json({ error: 'Invalid class' }, { status: 400 });
  }

  // Check already claimed
  const existing = await sql`
    SELECT id, cert_id, issued_at FROM certificates
    WHERE user_id = ${user.id} AND class_level = ${cls}
  `;
  if (existing.length > 0) {
    // Return existing cert instead of error
    const [studentInfo] = await sql`
      SELECT u.name, s.name as school_name FROM users u
      LEFT JOIN schools s ON s.id = u.school_id WHERE u.id = ${user.id}
    `;
    return NextResponse.json({
      success: true,
      already_claimed: true,
      cert_id: existing[0].cert_id,
      student_name: studentInfo?.name || 'Student',
      school_name: studentInfo?.school_name || 'STU-BRAIN',
      class_level: cls,
      issued_at: existing[0].issued_at,
    });
  }

  // Count completed chapters for this class
  const done = await sql`
    SELECT COUNT(*) as cnt FROM chapter_progress
    WHERE user_id = ${user.id} AND class_level = ${cls} AND completed = true
  `;
  const doneCount = Number(done[0]?.cnt || 0);

  // Need at least 2 chapters done (flexible for new accounts)
  if (doneCount < 2) {
    return NextResponse.json({
      error: `Complete at least 2 chapters of Class ${cls} first! You have completed ${doneCount} chapter(s).`,
      done: doneCount
    }, { status: 400 });
  }

  // Create certificate
  const certId = `STB-CL${cls}-${String(user.id).padStart(4,'0')}-${Date.now().toString(36).toUpperCase()}`;
  
  await sql`
    INSERT INTO certificates (user_id, school_id, class_level, cert_id, issued_at)
    VALUES (${user.id}, ${user.school_id || 1}, ${cls}, ${certId}, NOW())
    ON CONFLICT (user_id, class_level) DO NOTHING
  `;

  const [studentInfo] = await sql`
    SELECT u.name, s.name as school_name FROM users u
    LEFT JOIN schools s ON s.id = u.school_id WHERE u.id = ${user.id}
  `;

  return NextResponse.json({
    success: true,
    cert_id: certId,
    student_name: studentInfo?.name || 'Student',
    school_name: studentInfo?.school_name || 'STU-BRAIN',
    class_level: cls,
    issued_at: new Date().toISOString(),
  });
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user) return NextResponse.json({ certificates: [] });

  const certs = await sql`
    SELECT cert_id, class_level, issued_at FROM certificates
    WHERE user_id = ${user.id} ORDER BY class_level
  `;
  return NextResponse.json({ certificates: certs });
}
