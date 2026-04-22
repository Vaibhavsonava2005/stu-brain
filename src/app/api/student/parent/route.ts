import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email')?.toLowerCase();
  if (!email) return NextResponse.json({ error:'Email required' },{status:400});
  try {
    const students = await sql`
      SELECT s.id,s.name,s.email,s.class_level,s.state_name,s.city,s.total_xp,s.last_active,
        COUNT(p.id) FILTER (WHERE p.completed=true) as chapters_done,
        COALESCE(AVG(p.quiz_score) FILTER (WHERE p.quiz_score>0),0)::INTEGER as avg_quiz,
        COUNT(c.id) as certificates
      FROM b2c_students s
      LEFT JOIN b2c_progress p ON p.student_id=s.id
      LEFT JOIN b2c_certificates c ON c.student_id=s.id
      WHERE s.parent_email=${email}
      GROUP BY s.id`;
    return NextResponse.json({ students });
  } catch { return NextResponse.json({ students:[] }); }
}

export async function POST(req: NextRequest) {
  // Link parent to student
  try {
    const { student_email, parent_email } = await req.json();
    if (!student_email || !parent_email) return NextResponse.json({ error:'Both emails required' },{status:400});
    const [student] = await sql`SELECT id,name FROM b2c_students WHERE email=${student_email.toLowerCase()} LIMIT 1`;
    if (!student) return NextResponse.json({ error:'Student not found' },{status:404});
    await sql`UPDATE b2c_students SET parent_email=${parent_email.toLowerCase()}, parent_linked=true WHERE id=${student.id}`;
    return NextResponse.json({ success:true, student_name:student.name });
  } catch(e:unknown) { return NextResponse.json({ error: e instanceof Error?e.message:'Error' },{status:500}); }
}
