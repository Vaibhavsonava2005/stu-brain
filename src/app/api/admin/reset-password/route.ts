import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || !['admin','superadmin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { user_id, school_id, new_password } = await req.json();
  if (!new_password) return NextResponse.json({ error: 'new_password required' }, { status: 400 });
  if (new_password.length < 4) return NextResponse.json({ error: 'Password must be at least 4 characters' }, { status: 400 });

  const hash = await bcrypt.hash(new_password, 10);

  if (user.role === 'superadmin') {
    if (school_id) {
      // Reset the admin of a specific school (using school_id)
      const result = await sql`
        UPDATE users SET password_hash = ${hash}
        WHERE school_id = ${school_id} AND role = 'admin'
        RETURNING id, name, email
      `;
      if (!result.length) return NextResponse.json({ error: 'No admin found for this school' }, { status: 404 });
      return NextResponse.json({ success: true, updated: result[0] });
    } else if (user_id) {
      // Reset any user by ID
      await sql`UPDATE users SET password_hash = ${hash} WHERE id = ${user_id}`;
      return NextResponse.json({ success: true });
    }
  } else {
    // Admin can reset any user in their school
    if (user_id) {
      await sql`
        UPDATE users SET password_hash = ${hash}
        WHERE id = ${user_id} AND school_id = ${user.school_id}
      `;
      return NextResponse.json({ success: true });
    }
  }

  return NextResponse.json({ error: 'user_id or school_id required' }, { status: 400 });
}
