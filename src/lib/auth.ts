import jwt from 'jsonwebtoken';

// 🔒 Strong secret required in production
const SECRET = process.env.JWT_SECRET || 'dev-only-stubrain-secret-min-32-chars-placeholder!!';

export function signToken(payload: { id: number; role: string; name: string; school_id: number; class_level?: number }) {
  return jwt.sign(payload, SECRET, { 
    expiresIn: '24h',  // 🔒 Reduced from 7d to 24h
    algorithm: 'HS256',
    issuer: 'stu-brain',
    audience: 'stu-brain-app'
  });
}

export function verifyToken(token: string): { id: number; role: string; name: string; school_id: number; class_level?: number } | null {
  if (!token || typeof token !== 'string' || token.length > 2000) return null;
  try {
    const payload = jwt.verify(token, SECRET, {
      algorithms: ['HS256'],
      issuer: 'stu-brain',
      audience: 'stu-brain-app'
    });
    return payload as { id: number; role: string; name: string; school_id: number; class_level?: number };
  } catch {
    return null; // 🔒 Never expose JWT errors
  }
}
