import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ','');
  const user = verifyToken(auth||'');
  if (!user || user.role !== 'b2c_student') return NextResponse.json({ certificates:[] });
  try {
    const certs = await sql`SELECT cert_id,class_level,issued_at FROM b2c_certificates WHERE student_id=${user.id} ORDER BY class_level`;
    return NextResponse.json({ certificates: certs });
  } catch { return NextResponse.json({ certificates:[] }); }
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ','');
  const user = verifyToken(auth||'');
  if (!user || user.role !== 'b2c_student') return NextResponse.json({ error:'Unauthorized' },{status:401});
  try {
    const { class_level } = await req.json();
    const cls = Number(class_level);
    if (cls !== user.class_level) return NextResponse.json({ error:`Certificate only available for your enrolled class (Class ${user.class_level})` },{status:400});

    // Check already claimed
    const existing = await sql`SELECT cert_id,issued_at FROM b2c_certificates WHERE student_id=${user.id} AND class_level=${cls}`;
    if (existing.length > 0) {
      const [s] = await sql`SELECT name FROM b2c_students WHERE id=${user.id}`;
      return NextResponse.json({ success:true, already_claimed:true, cert_id:existing[0].cert_id, student_name:s?.name||'Student', class_level:cls, issued_at:existing[0].issued_at });
    }

    // Check enough chapters done
    const [done] = await sql`SELECT COUNT(*) as cnt FROM b2c_progress WHERE student_id=${user.id} AND class_level=${cls} AND completed=true`;
    if (Number(done?.cnt||0) < 2) return NextResponse.json({ error:`Complete at least 2 chapters of Class ${cls} first!` },{status:400});

    const certId = `STBI-CL${cls}-${String(user.id).padStart(4,'0')}-${Date.now().toString(36).toUpperCase()}`;
    await sql`INSERT INTO b2c_certificates (student_id,class_level,cert_id) VALUES (${user.id},${cls},${certId}) ON CONFLICT DO NOTHING`;
    const [s] = await sql`SELECT name FROM b2c_students WHERE id=${user.id}`;
    return NextResponse.json({ success:true, cert_id:certId, student_name:s?.name||'Student', class_level:cls, issued_at:new Date().toISOString() });
  } catch(e:unknown) { return NextResponse.json({ error: e instanceof Error?e.message:'Error' },{status:500}); }
}
