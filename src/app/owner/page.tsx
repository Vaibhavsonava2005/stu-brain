'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OwnerLogin() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function login() {
    if (!id || !pw) { setErr('Enter ID and password'); return; }
    setLoading(true); setErr('');
    try {
      const r = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-login-type': 'owner' },
        body: JSON.stringify({ identifier: id, password: pw })
      });
      const d = await r.json();
      if (!r.ok) { setErr(d.error || 'Login failed'); setLoading(false); return; }
      localStorage.setItem('stb_tok', d.token);
      localStorage.setItem('stb_user', JSON.stringify(d.user));
      localStorage.setItem('sb_token', d.token);
      localStorage.setItem('sb_user', JSON.stringify(d.user));
      router.push('/app');
    } catch { setErr('Connection error'); }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D2B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Nunito',sans-serif", padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 400, background: '#16183A', border: '1px solid rgba(108,99,255,.3)', borderRadius: 20, padding: '40px 32px', boxShadow: '0 20px 60px rgba(0,0,0,.5)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>👑</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#FFD166', fontFamily: "'Fredoka One',sans-serif" }}>Owner Access</div>
          <div style={{ fontSize: 12, color: '#9090BB', marginTop: 4 }}>STU-BRAIN Admin Panel — Authorized Only</div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 800, color: '#9090BB', letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Owner ID</label>
          <input value={id} onChange={e => setId(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(108,99,255,.3)', background: 'rgba(255,255,255,.05)', color: '#F0F0FF', fontSize: 14, fontWeight: 600, outline: 'none', boxSizing: 'border-box', fontFamily: "'Nunito',sans-serif" }}
            placeholder="Owner ID" />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 11, fontWeight: 800, color: '#9090BB', letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Password</label>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(108,99,255,.3)', background: 'rgba(255,255,255,.05)', color: '#F0F0FF', fontSize: 14, fontWeight: 600, outline: 'none', boxSizing: 'border-box', fontFamily: "'Nunito',sans-serif" }}
            placeholder="Password" />
        </div>
        {err && <div style={{ color: '#FF6584', fontSize: 12, fontWeight: 700, marginBottom: 14, background: 'rgba(255,101,132,.1)', padding: '8px 12px', borderRadius: 8 }}>{err}</div>}
        <button onClick={login} disabled={loading}
          style={{ width: '100%', padding: 14, borderRadius: 50, background: 'linear-gradient(135deg,#FFD166,#FF9F43)', color: '#0D0D2B', fontSize: 15, fontWeight: 900, border: 'none', cursor: loading ? 'wait' : 'pointer', fontFamily: "'Nunito',sans-serif" }}>
          {loading ? '⏳ Logging in...' : '👑 Login as Owner'}
        </button>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <a href="/app" style={{ color: '#9090BB', fontSize: 12, textDecoration: 'none' }}>← Back to main login</a>
        </div>
      </div>
    </div>
  );
}
