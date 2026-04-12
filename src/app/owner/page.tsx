'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function OwnerPage() {
  const router = useRouter();
  useEffect(() => {
    // Set role hint and redirect to app
    localStorage.setItem('sb_role_hint', 'superadmin');
    router.replace('/app?role=owner');
  }, [router]);
  return (
    <div style={{minHeight:'100vh',background:'#0D0D2B',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontFamily:'sans-serif'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:48,marginBottom:16}}>👑</div>
        <div style={{fontSize:18,fontWeight:700}}>STU-BRAIN Owner Panel</div>
        <div style={{fontSize:12,color:'rgba(255,255,255,.5)',marginTop:8}}>Redirecting...</div>
      </div>
    </div>
  );
}
