import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyToken(auth || '');
  if (!user || user.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { school_id, action, plan, payment_amount, payment_notes, max_students } = await req.json();
  if (!school_id || !action) return NextResponse.json({ error: 'school_id and action required' }, { status: 400 });

  if (action === 'unlock') {
    const licenseMonths = plan === 'annual' ? 12 : plan === 'trial' ? 1 : 6;
    await sql`
      UPDATE schools SET
        is_active = TRUE,
        is_locked = FALSE,
        plan = ${plan || 'annual'},
        max_students = ${max_students || 500},
        payment_amount = ${payment_amount || null},
        payment_date = ${payment_amount ? 'CURRENT_DATE' : null},
        payment_notes = ${payment_notes || null},
        license_expires = CURRENT_DATE + INTERVAL '1 month' * ${licenseMonths},
        unlocked_at = NOW(),
        unlocked_by = ${user.name}
      WHERE id = ${school_id}
    `;
    return NextResponse.json({ success: true, message: `School unlocked on ${plan} plan` });
  }

  if (action === 'lock') {
    await sql`UPDATE schools SET is_locked = TRUE, is_active = FALSE WHERE id = ${school_id}`;
    return NextResponse.json({ success: true, message: 'School locked' });
  }

  if (action === 'delete') {
    await sql`DELETE FROM schools WHERE id = ${school_id}`;
    return NextResponse.json({ success: true, message: 'School deleted' });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
