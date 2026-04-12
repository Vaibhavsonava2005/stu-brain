'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function SchoolPage() {
  const router = useRouter();
  useEffect(() => {
    localStorage.setItem('sb_role_hint', 'admin');
    router.replace('/app?role=admin');
  }, [router]);
  return (
    <div style={{minHeight:'100vh',background:'#0D0D2B',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontFamily:'sans-serif'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:48,marginBottom:16}}>🏫</div>
        <div style={{fontSize:18,fontWeight:700}}>School Admin Login</div>
        <div style={{fontSize:12,color:'rgba(255,255,255,.5)',marginTop:8}}>Loading STU-BRAIN...</div>
      </div>
    </div>
  );
}
