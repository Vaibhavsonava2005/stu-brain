'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { CURRICULUM } from '@/lib/curriculum';
import type { Chapter, Slide } from '@/lib/curriculum';
import SplashScreen from '@/components/SplashScreen';

const C = {bg:'#0A0A1E',card:'rgba(255,255,255,.05)',br:'rgba(108,99,255,.25)',p:'#6C63FF',s:'#FF6584',a:'#43E97B',y:'#FFD166',o:'#FF9F43',sky:'#38BFFF',mu:'#9090BB',text:'#F0F0FF'};
const S: Record<string,React.CSSProperties> = {
  card:{background:C.card,border:`1px solid ${C.br}`,borderRadius:16,padding:16},
  btn:{border:'none',borderRadius:50,padding:'11px 24px',fontSize:13,fontWeight:800,cursor:'pointer',fontFamily:"'Nunito',sans-serif",transition:'all .2s'},
  inp:{width:'100%',padding:'12px 14px',borderRadius:10,border:`1px solid ${C.br}`,background:'rgba(255,255,255,.06)',color:C.text,fontSize:13,fontWeight:600,outline:'none',boxSizing:'border-box' as const,fontFamily:"'Nunito',sans-serif"},
};
const INDIA_STATES=['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh','Chandigarh','Puducherry'];

function NeuralBg({intensity=1}:{intensity?:number}) {
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const ctx=canvas.getContext('2d');if(!ctx)return;
    let W=window.innerWidth,H=window.innerHeight;
    canvas.width=W;canvas.height=H;
    const resize=()=>{W=window.innerWidth;H=window.innerHeight;canvas.width=W;canvas.height=H;};
    window.addEventListener('resize',resize);
    const COLS=['#6C63FF','#43E97B','#38BFFF','#FFD166','#FF6584'];
    type N={x:number;y:number;z:number;vx:number;vy:number;vz:number;r:number;c:string;p:number;ps:number};
    const nodes:N[]=Array.from({length:Math.floor(38*intensity)},(_,i)=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*400+50,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.3,vz:(Math.random()-.5)*.5,r:Math.random()*4+2,c:COLS[i%5],p:Math.random()*6.28,ps:.02+Math.random()*.025}));
    const h=(n:number)=>Math.max(0,Math.min(255,Math.floor(n))).toString(16).padStart(2,'0');
    const proj=(x:number,y:number,z:number)=>{const s=480/(480+z);return{px:W/2+(x-W/2)*s,py:H/2+(y-H/2)*s,s};};
    let raf=0;
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<155){const a=(1-d/155)*0.08*intensity;const pi=proj(nodes[i].x,nodes[i].y,nodes[i].z);const pj=proj(nodes[j].x,nodes[j].y,nodes[j].z);ctx.beginPath();ctx.moveTo(pi.px,pi.py);ctx.lineTo(pj.px,pj.py);ctx.strokeStyle=nodes[i].c+h(a*255);ctx.lineWidth=pi.s*.6;ctx.stroke();}}
      for(const n of nodes){n.x+=n.vx;n.y+=n.vy;n.z+=n.vz;n.p+=n.ps;if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;if(n.z<20||n.z>500)n.vz*=-1;const{px,py,s}=proj(n.x,n.y,n.z);const r=n.r*s*(1+Math.sin(n.p)*.2);const a=Math.min(s*.42*intensity,.65);const g=ctx.createRadialGradient(px,py,0,px,py,r*4);g.addColorStop(0,n.c+h(a*130));g.addColorStop(1,n.c+'00');ctx.beginPath();ctx.arc(px,py,r*4,0,6.28);ctx.fillStyle=g;ctx.fill();ctx.beginPath();ctx.arc(px,py,r,0,6.28);ctx.fillStyle=n.c+h(a*255);ctx.fill();}
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);};
  },[intensity]);
  return <canvas ref={ref} style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:.85}}/>;
}

type User={id:number;name:string;email:string;class_level:number;state_name:string;city:string;total_xp:number;parent_email?:string;is_paid?:boolean;};
type Prog={completed:boolean;xp_earned:number;quiz_score:number;};
type ProgMap=Record<string,Prog>;
type Screen='landing'|'auth'|'dashboard'|'learn'|'parent'|'payment';

export default function B2CStudentApp() {
  const [showSplash,setShowSplash]=useState(true);
  const [screen,setScreen]=useState<Screen>('landing');
  const [history,setHistory]=useState<Screen[]>([]);
  const [authMode,setAuthMode]=useState<'login'|'signup'>('login');
  const [user,setUser]=useState<User|null>(null);
  const [token,setToken]=useState('');
  const [prog,setProg]=useState<ProgMap>({});
  const [totalXP,setTotalXP]=useState(0);
  const [curClass,setCurClass]=useState(8);
  const [curChap,setCurChap]=useState<Chapter|null>(null);
  const [curSlide,setCurSlide]=useState(0);
  const [qDone,setQDone]=useState<Record<string,{answered:boolean;correct:boolean}>>({});
  const [xpPop,setXpPop]=useState<number|null>(null);
  const [err,setErr]=useState('');
  const [loading,setLoading]=useState(false);
  const [certResult,setCertResult]=useState<Record<string,unknown>|null>(null);
  const [certs,setCerts]=useState<{class_level:number;cert_id:string;issued_at:string}[]>([]);
  const [parentEmail,setParentEmail]=useState('');
  const [parentData,setParentData]=useState<Record<string,unknown>[]>([]);
  const [linkStudentEmail,setLinkStudentEmail]=useState('');
  const [linkParentEmail,setLinkParentEmail]=useState('');
  const [form,setForm]=useState({name:'',email:'',password:'',class_level:'8',state_name:'Rajasthan',city:'',parent_email:''});

  useEffect(()=>{
    const seen=sessionStorage.getItem('stb_b2c_splash');
    if(seen)setShowSplash(false);
    else sessionStorage.setItem('stb_b2c_splash','1');
  },[]);

  useEffect(()=>{
    const tok=localStorage.getItem('b2c_tok');
    const usr=localStorage.getItem('b2c_user');
    if(tok&&usr){
      const u=JSON.parse(usr);
      setToken(tok);setUser(u);setCurClass(u.class_level||8);
      setScreen('dashboard');loadProg(tok);loadCerts(tok);
    }
  },[]);

  // Navigation with history
  const goTo=useCallback((s:Screen)=>{
    setHistory(h=>[...h,screen]);
    setScreen(s);
    window.scrollTo(0,0);
  },[screen]);

  const goBack=useCallback(()=>{
    setHistory(h=>{
      if(h.length===0){setScreen('landing');return[];}
      const prev=h[h.length-1];
      setScreen(prev);
      window.scrollTo(0,0);
      return h.slice(0,-1);
    });
  },[]);

  const loadProg=useCallback(async(tok:string)=>{
    try{const r=await fetch('/api/student/progress',{headers:{authorization:`Bearer ${tok}`}});const d=await r.json();const m:ProgMap={};(d.progress||[]).forEach((p:{chapter_id:string;completed:boolean;xp_earned:number;quiz_score:number})=>{m[p.chapter_id]={completed:p.completed,xp_earned:p.xp_earned,quiz_score:p.quiz_score};});setProg(m);setTotalXP(d.total_xp||0);}catch{}
  },[]);

  const loadCerts=useCallback(async(tok:string)=>{
    try{const r=await fetch('/api/student/certificates',{headers:{authorization:`Bearer ${tok}`}});const d=await r.json();setCerts(d.certificates||[]);}catch{}
  },[]);

  async function doAuth(){
    setLoading(true);setErr('');
    try{
      const r=await fetch('/api/student/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:authMode,...form,class_level:parseInt(form.class_level)})});
      const d=await r.json();
      if(!r.ok){setErr(d.error||'Error');setLoading(false);return;}
      localStorage.setItem('b2c_tok',d.token);
      localStorage.setItem('b2c_user',JSON.stringify(d.user));
      setToken(d.token);setUser(d.user);setCurClass(d.user.class_level||8);
      await loadProg(d.token);await loadCerts(d.token);
      setScreen('dashboard');setHistory([]);
    }catch{setErr('Connection error. Try again.');}
    setLoading(false);
  }

  function logout(){localStorage.removeItem('b2c_tok');localStorage.removeItem('b2c_user');setUser(null);setToken('');setProg({});setTotalXP(0);setScreen('landing');setHistory([]);}

  async function saveProg(chapId:string,cls:number,completed:boolean,xp:number,score?:number){
    try{await fetch('/api/student/progress',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({chapter_id:chapId,class_level:user?.class_level||cls,completed,xp_earned:xp,quiz_score:score||0})});await loadProg(token);}catch{}
  }

  async function claimCert(cls:number){
    try{
      const r=await fetch('/api/student/certificates',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({class_level:cls})});
      const d=await r.json();
      if(d.success||d.cert_id){setCertResult({...d,student_name:user?.name||''});await loadCerts(token);}
      else alert('❌ '+(d.error||'Error'));
    }catch{alert('Error claiming certificate');}
  }

  function classProg(cls:number){
    const chaps=(CURRICULUM[cls]?.subjects||[]).flatMap(s=>s.chapters).filter(Boolean) as Chapter[];
    const done=chaps.filter(c=>prog[c.id]?.completed).length;
    return{done,total:chaps.length,pct:chaps.length?Math.round(done/chaps.length*100):0};
  }

  async function completeChap(){
    if(!curChap||prog[curChap.id]?.completed)return;
    const lastSlide=curChap.slides[curChap.slides.length-1];
    if(lastSlide?.type==='quiz'&&lastSlide.questions?.length){
      const si=curChap.slides.length-1,total=lastSlide.questions.length;
      const answered=lastSlide.questions.filter((_:unknown,qi:number)=>qDone[`${curChap.id}_${si}_${qi}`]?.answered).length;
      if(answered<total){alert(`📝 Answer all ${total} quiz questions first! (${answered}/${total})`);return;}
      const correct=lastSlide.questions.filter((_:unknown,qi:number)=>qDone[`${curChap.id}_${si}_${qi}`]?.correct).length;
      const score=Math.round(correct/total*100),xp=curChap.xp;
      setTotalXP(x=>x+xp);setXpPop(xp);setTimeout(()=>setXpPop(null),2500);
      setProg(p=>({...p,[curChap.id]:{completed:true,xp_earned:xp,quiz_score:score}}));
      await saveProg(curChap.id,curClass,true,xp,score);return;
    }
    const xp=curChap.xp;setTotalXP(x=>x+xp);setXpPop(xp);setTimeout(()=>setXpPop(null),2500);
    setProg(p=>({...p,[curChap.id]:{completed:true,xp_earned:xp,quiz_score:p[curChap.id]?.quiz_score||0}}));
    await saveProg(curChap.id,curClass,true,xp);
  }

  function answerQ(qi:number,oi:number){
    const slide=curChap?.slides[curSlide];if(!slide?.questions||!curChap)return;
    const key=`${curChap.id}_${curSlide}_${qi}`;if(qDone[key])return;
    setQDone(q=>({...q,[key]:{answered:true,correct:oi===slide.questions![qi].c}}));
  }

  function renderSlide(s:Slide){
    if(!s)return null;
    const speech=s.speechHi&&/[\u0900-\u097F]/.test(s.speechHi)?s.speechHi:s.speech;
    if(s.type==='teach')return(
      <div style={{padding:'20px 16px'}}>
        {s.title&&<div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:22,marginBottom:12,background:'linear-gradient(135deg,#6C63FF,#FF6584)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{s.title}</div>}
        {s.intro&&<div style={{fontSize:13,color:C.mu,fontWeight:600,marginBottom:14,lineHeight:1.6}}>{s.intro}</div>}
        {speech&&<div style={{background:'rgba(108,99,255,.08)',border:`1px solid rgba(108,99,255,.2)`,borderRadius:12,padding:16,fontSize:13,lineHeight:1.9,marginBottom:14}} dangerouslySetInnerHTML={{__html:speech}}/>}
        {s.items&&<div style={{display:'flex',flexDirection:'column',gap:8}}>{s.items.map((it:{l?:string;d?:string},i:number)=>(
          <div key={i} style={{...S.card,padding:12,display:'flex',gap:10,alignItems:'flex-start'}}>
            {it.l&&<div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:13,color:C.p,flexShrink:0,minWidth:20}}>{it.l}</div>}
            {it.d&&<div style={{fontSize:12,color:C.mu,lineHeight:1.5}}>{it.d}</div>}
          </div>
        ))}</div>}
      </div>
    );
    if(s.type==='quiz')return(
      <div style={{padding:'20px 16px'}}>
        <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:20,marginBottom:16,color:C.y}}>📝 Quiz Time!</div>
        {(s.questions||[]).map((q:{q:string;opts:string[];c:number;ex?:string},qi:number)=>{
          const key=`${curChap?.id}_${curSlide}_${qi}`;const ans=qDone[key];
          return(<div key={qi} style={{...S.card,padding:14,marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:800,marginBottom:10}}>{qi+1}. {q.q}</div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {q.opts.map((opt,oi)=>{
                const isCorrect=oi===q.c;const isSelected=ans&&oi!==q.c;
                return<button key={oi} onClick={()=>answerQ(qi,oi)} disabled={!!ans} style={{padding:'9px 14px',borderRadius:10,fontSize:12,fontWeight:700,border:`1px solid ${ans&&isCorrect?C.a:ans&&isSelected?C.s:C.br}`,background:ans&&isCorrect?'rgba(67,233,123,.15)':ans&&isSelected?'rgba(255,101,132,.1)':'rgba(255,255,255,.04)',color:ans&&isCorrect?C.a:ans&&isSelected?C.s:C.text,cursor:ans?'default':'pointer',textAlign:'left'}}>
                  {ans&&isCorrect?'✅ ':ans&&isSelected?'❌ ':''}{opt}
                </button>;
              })}
            </div>
            {ans&&q.ex&&<div style={{marginTop:8,fontSize:11,color:ans.correct?C.a:C.s,fontWeight:700,lineHeight:1.5}}>{ans.correct?'🎉 Correct! ':'❌ '}{q.ex}</div>}
          </div>);
        })}
      </div>
    );
    if(s.type==='reallife')return(
      <div style={{padding:'20px 16px'}}>
        {s.title&&<div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:22,marginBottom:16,color:C.sky}}>{s.title}</div>}
        {s.items&&<div style={{display:'flex',flexDirection:'column',gap:10}}>
          {s.items.map((it:{nm?:string;ds?:string;icon?:string},i:number)=>(
            <div key={i} style={{...S.card,padding:14,display:'flex',gap:12,alignItems:'flex-start'}}>
              <div style={{fontSize:28,flexShrink:0}}>{it.icon||'🌟'}</div>
              <div><div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:4}}>{it.nm||''}</div><div style={{fontSize:12,color:C.mu,lineHeight:1.5}}>{it.ds||''}</div></div>
            </div>
          ))}
        </div>}
      </div>
    );
    return <div style={{padding:'20px 16px'}}><div style={{fontSize:13,lineHeight:1.8}} dangerouslySetInnerHTML={{__html:speech||s.speech||''}}/></div>;
  }

  // ── SPLASH ──
  if(showSplash)return<SplashScreen onDone={()=>setShowSplash(false)}/>;

  // ── STYLES ──
  const GlobalStyle=()=><style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>;

  // ── BACK BUTTON ──
  const BackBtn=({label='← Back',onClick}:{label?:string;onClick?:()=>void})=>(
    <button onClick={onClick||goBack} style={{...S.btn,background:'rgba(255,255,255,.08)',color:C.mu,padding:'8px 16px',fontSize:12}}>
      {label}
    </button>
  );

  // ── CERTIFICATE MODAL ──
  if(certResult)return(
    <div style={{position:'fixed',inset:0,background:'rgba(7,7,26,.95)',zIndex:5000,display:'flex',alignItems:'center',justifyContent:'center',padding:16,fontFamily:"'Nunito',sans-serif"}} onClick={()=>setCertResult(null)}>
      <GlobalStyle/>
      <div onClick={e=>e.stopPropagation()} style={{background:'linear-gradient(135deg,#1a1a4e,#0d0d2b)',border:'3px solid #FFD166',borderRadius:20,padding:32,maxWidth:580,width:'100%',textAlign:'center',boxShadow:'0 0 60px rgba(255,209,102,.3)'}}>
        <div style={{fontSize:13,fontWeight:800,color:'#FFD166',letterSpacing:3,textTransform:'uppercase',marginBottom:6}}>Certificate of Completion</div>
        <div style={{fontSize:11,color:'rgba(255,255,255,.4)',letterSpacing:2,marginBottom:20}}>STU-BRAIN · AI Education Platform · India</div>
        <div style={{width:60,height:3,background:'linear-gradient(90deg,#6C63FF,#FFD166)',margin:'0 auto 20px'}}/>
        <div style={{fontSize:14,color:'rgba(255,255,255,.6)',marginBottom:8}}>This certifies that</div>
        <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:32,color:'#FFD166',marginBottom:8,textShadow:'0 0 20px rgba(255,209,102,.3)'}}>{certResult.student_name as string}</div>
        <div style={{fontSize:14,color:'rgba(255,255,255,.6)',marginBottom:6}}>has successfully completed</div>
        <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:22,color:C.a,marginBottom:4}}>Class {Number(certResult.class_level||0)} — AI &amp; Technology Program</div>
        <div style={{fontSize:12,color:'rgba(255,255,255,.4)',marginBottom:20}}>Individual Learning · STU-BRAIN Platform</div>
        <div style={{width:60,height:3,background:'linear-gradient(90deg,#FFD166,#6C63FF)',margin:'0 auto 20px'}}/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:24}}>
          <div><div style={{fontSize:9,color:'rgba(255,255,255,.35)',letterSpacing:2,marginBottom:4}}>ISSUED BY</div><div style={{fontSize:13,fontWeight:700,color:'#fff'}}>STU-BRAIN Team</div><div style={{fontSize:10,color:'rgba(255,255,255,.4)'}}>AI Education Platform</div></div>
          <div><div style={{fontSize:9,color:'rgba(255,255,255,.35)',letterSpacing:2,marginBottom:4}}>CERT ID</div><div style={{fontFamily:'monospace',fontSize:11,color:'#FFD166'}}>{String(certResult.cert_id||'')}</div><div style={{fontSize:10,color:'rgba(255,255,255,.4)',marginTop:2}}>{certResult.issued_at?new Date(String(certResult.issued_at)).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}):''}</div></div>
        </div>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={()=>{
            const html=`<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Certificate - ${String(certResult.student_name||'')}</title><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0d0d2b;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}.cert{background:linear-gradient(135deg,#1a1a4e,#0d0d2b);border:4px solid #FFD166;border-radius:20px;padding:48px;max-width:680px;width:100%;text-align:center;box-shadow:0 0 60px rgba(255,209,102,.3)}.top{font-size:16px;font-weight:800;color:#FFD166;letter-spacing:4px;text-transform:uppercase;margin-bottom:6px}.brand{font-size:12px;color:rgba(255,255,255,.4);letter-spacing:2px;margin-bottom:28px}.div{width:80px;height:3px;background:linear-gradient(90deg,#6C63FF,#FFD166);margin:0 auto 28px}.certify{font-size:14px;color:rgba(255,255,255,.6);margin-bottom:10px}.name{font-size:40px;font-weight:900;color:#FFD166;margin-bottom:10px;font-family:'Arial Black',sans-serif}.course{font-size:22px;font-weight:800;color:#43E97B;margin-bottom:6px}.school{font-size:13px;color:rgba(255,255,255,.4);margin-bottom:28px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px}.label{font-size:9px;color:rgba(255,255,255,.35);letter-spacing:2px;margin-bottom:4px}.val{font-size:14px;font-weight:700;color:#fff}.cert-id{font-family:monospace;font-size:12px;color:#FFD166}.footer{font-size:10px;color:rgba(255,255,255,.2)}</style></head><body><div class="cert"><div class="top">Certificate of Completion</div><div class="brand">STU-BRAIN · AI Education Platform · India</div><div class="div"></div><div class="certify">This certifies that</div><div class="name">${String(certResult.student_name||'')}</div><div class="certify">has successfully completed</div><div class="course">Class ${Number(certResult.class_level||0)} — AI & Technology Program</div><div class="school">Individual Learning · STU-BRAIN Platform</div><div class="div" style="background:linear-gradient(90deg,#FFD166,#6C63FF)"></div><div class="grid"><div><div class="label">ISSUED BY</div><div class="val">STU-BRAIN Team</div><div style="font-size:11px;color:rgba(255,255,255,.4)">AI Education Platform</div></div><div><div class="label">CERT ID</div><div class="cert-id">${String(certResult.cert_id||'')}</div><div style="font-size:11px;color:rgba(255,255,255,.4);margin-top:4px">${certResult.issued_at?new Date(String(certResult.issued_at)).toLocaleDateString('en-IN'):''}</div></div></div><div class="footer">stu-brain.vercel.app · AI Education for India's Future</div></div></body></html>`;
            const blob=new Blob([html],{type:'text/html'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`STU-BRAIN-Cert-Class${Number(certResult.class_level||0)}-${String(certResult.student_name||'').replace(/\s+/g,'-')}.html`;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
          }} style={{...S.btn,background:'linear-gradient(135deg,#6C63FF,#FF6584)',color:'#fff',fontSize:13}}>⬇️ Download</button>
          <button onClick={()=>setCertResult(null)} style={{...S.btn,background:'rgba(255,255,255,.1)',color:C.mu,fontSize:13}}>✕ Close</button>
        </div>
      </div>
    </div>
  );

  // ── LEARN SCREEN ──
  if(screen==='learn'&&curChap){
    const slide=curChap.slides[curSlide];
    const isOwnClass=curClass===user?.class_level;
    const isPaid=user?.is_paid;
    // Lock if not paid and not own class or chapter index > 1
    const chapIdx=(CURRICULUM[curClass]?.subjects||[]).flatMap(s=>s.chapters).filter((ch):ch is Chapter=>Boolean(ch)).findIndex(ch=>ch.id===curChap.id);
    const isLocked=!isPaid&&(curSlide>0||chapIdx>1);
    return(
      <div style={{height:'100vh',display:'flex',flexDirection:'column',overflow:'hidden',background:C.bg,color:C.text,fontFamily:"'Nunito',sans-serif"}}>
        <GlobalStyle/>
        <div style={{display:'flex',alignItems:'center',gap:8,padding:'10px 16px',background:'rgba(10,10,30,.97)',borderBottom:`1px solid ${C.br}`,flexShrink:0}}>
          <BackBtn onClick={()=>{setScreen('dashboard');setHistory(h=>h.slice(0,-1));}}/>
          <div style={{flex:1,fontFamily:"'Fredoka One',sans-serif",fontSize:14,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',marginLeft:4}}>{curChap.title}</div>
          <div style={{fontSize:10,color:C.mu,fontWeight:700,flexShrink:0}}>{curSlide+1}/{curChap.slides.length}</div>
        </div>
        <div style={{flex:1,overflowY:'auto',position:'relative'}}>
          {isLocked?(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:400,padding:24,textAlign:'center'}}>
              <div style={{fontSize:64,marginBottom:16}}>🔒</div>
              <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:24,marginBottom:8,color:C.y}}>Unlock Full Access</div>
              <div style={{fontSize:14,color:C.mu,maxWidth:320,lineHeight:1.7,marginBottom:24}}>Get access to all chapters, classes, quizzes, XP and certificates for just <span style={{color:C.a,fontWeight:900}}>₹299 one-time</span>!</div>
              <button onClick={()=>{setScreen('payment');setHistory(h=>[...h,'learn']);}} style={{...S.btn,background:'linear-gradient(135deg,#43E97B,#38F9D7)',color:'#0D0D2B',fontSize:16,padding:'14px 36px'}}>🚀 Unlock for ₹299</button>
              <button onClick={()=>{setScreen('dashboard');}} style={{...S.btn,background:'transparent',color:C.mu,fontSize:12,marginTop:12}}>← Back to chapters</button>
            </div>
          ):renderSlide(slide)}
        </div>
        {xpPop&&<div style={{position:'fixed',top:60,right:16,zIndex:999,background:'linear-gradient(135deg,#FFD166,#FF9F43)',color:'#0D0D2B',padding:'9px 18px',borderRadius:50,fontSize:15,fontWeight:800,boxShadow:'0 7px 22px rgba(255,209,102,.6)'}}>⭐ +{xpPop} XP!</div>}
        {!isLocked&&<div style={{padding:'11px 16px',background:'rgba(10,10,30,.97)',borderTop:`1px solid ${C.br}`,display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
          {curSlide>0&&<button onClick={()=>setCurSlide(s=>s-1)} style={{...S.btn,background:'rgba(255,255,255,.08)',color:C.text,padding:'10px 20px',fontSize:13}}>◀</button>}
          <span style={{fontSize:11,color:C.mu,fontWeight:700,flex:1,textAlign:'center'}}>{curSlide+1}/{curChap.slides.length}</span>
          {curSlide<curChap.slides.length-1?(
            <button onClick={()=>setCurSlide(s=>s+1)} style={{...S.btn,background:'linear-gradient(135deg,#6C63FF,#FF6584)',color:'#fff',padding:'10px 24px',fontSize:13}}>Next ▶</button>
          ):!prog[curChap.id]?.completed?(
            <button onClick={completeChap} style={{...S.btn,background:'linear-gradient(135deg,#43E97B,#38F9D7)',color:'#0D0D2B',padding:'10px 24px',fontSize:13}}>🏆 Complete!</button>
          ):(
            <div style={{display:'flex',gap:8}}>
              {isOwnClass&&curClass===user?.class_level&&classProg(curClass).done>=classProg(curClass).total&&!certs.find(c=>c.class_level===curClass)&&(
                <button onClick={()=>claimCert(curClass)} style={{...S.btn,background:'linear-gradient(135deg,#FFD166,#FF9F43)',color:'#0D0D2B',padding:'10px 20px',fontSize:12}}>🎓 Claim Cert</button>
              )}
              <button onClick={()=>setScreen('dashboard')} style={{...S.btn,background:'linear-gradient(135deg,#6C63FF,#FF6584)',color:'#fff',padding:'10px 24px',fontSize:13}}>📚 Done</button>
            </div>
          )}
        </div>}
      </div>
    );
  }

  // ── PAYMENT SCREEN ──
  if(screen==='payment')return(
    <div style={{minHeight:'100vh',background:C.bg,color:C.text,fontFamily:"'Nunito',sans-serif",position:'relative'}}>
      <NeuralBg intensity={0.7}/>
      <GlobalStyle/>
      <div style={{position:'relative',zIndex:1,maxWidth:480,margin:'0 auto',padding:24,paddingTop:40}}>
        <BackBtn/>
        <div style={{textAlign:'center',marginTop:24,marginBottom:32}}>
          <div style={{fontSize:64,marginBottom:12}}>🚀</div>
          <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:32,background:'linear-gradient(135deg,#FFD166,#FF9F43)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:8}}>Unlock STU-BRAIN</div>
          <div style={{fontSize:14,color:C.mu,lineHeight:1.7}}>One-time payment. Lifetime access to all AI chapters for your class.</div>
        </div>
        <div style={{...S.card,padding:24,marginBottom:20,border:'2px solid rgba(255,209,102,.4)',background:'linear-gradient(135deg,rgba(255,209,102,.08),rgba(255,159,67,.04))'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
            <div><div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:22,color:C.y}}>Student Plan</div><div style={{fontSize:12,color:C.mu}}>One-time · Lifetime access</div></div>
            <div style={{textAlign:'right'}}><div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:36,color:C.a}}>₹299</div><div style={{fontSize:11,color:C.mu,textDecoration:'line-through'}}>₹999</div></div>
          </div>
          {[`✅ All chapters for Class ${user?.class_level||8}`,`✅ 10-question quizzes with AI explanations`,`✅ XP rewards & digital certificates`,`✅ AI Doubt Bot (24/7)`,`✅ Parent dashboard tracking`,`✅ Lifetime access, no renewal`].map((f,i)=>(
            <div key={i} style={{fontSize:13,fontWeight:700,color:C.text,paddingBottom:8,borderBottom:i<5?`1px solid rgba(255,255,255,.06)`:'none',marginBottom:i<5?8:0}}>{f}</div>
          ))}
        </div>
        <div style={{...S.card,padding:20,marginBottom:20}}>
          <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:14,marginBottom:12,color:C.y}}>💳 Payment Instructions</div>
          <div style={{fontSize:12,color:C.mu,lineHeight:1.9}}>
            1. Send ₹299 via UPI / Google Pay / PhonePe<br/>
            2. UPI ID: <span style={{color:C.a,fontWeight:800,userSelect:'all'}}>stubrain@upi</span><br/>
            3. Screenshot WhatsApp to: <span style={{color:C.sky,fontWeight:800}}>+91-XXXXXXXXXX</span><br/>
            4. We will unlock your account within 2 hours
          </div>
        </div>
        <div style={{...S.card,padding:16,background:'rgba(67,233,123,.06)',border:'1px solid rgba(67,233,123,.2)'}}>
          <div style={{fontSize:11,color:C.a,fontWeight:700}}>📞 Need help? Contact us on WhatsApp or email hello@stubrain.online</div>
        </div>
        <button onClick={goBack} style={{...S.btn,width:'100%',marginTop:16,background:'rgba(255,255,255,.08)',color:C.mu,fontSize:13}}>← Back to Learning</button>
      </div>
    </div>
  );

  // ── PARENT SCREEN ──
  if(screen==='parent')return(
    <div style={{minHeight:'100vh',background:C.bg,color:C.text,fontFamily:"'Nunito',sans-serif",position:'relative'}}>
      <NeuralBg intensity={0.5}/>
      <GlobalStyle/>
      <div style={{position:'relative',zIndex:1,maxWidth:700,margin:'0 auto',padding:20}}>
        <div style={{display:'flex',alignItems:'center',gap:12,paddingTop:20,marginBottom:24}}>
          <BackBtn/>
          <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:22,background:'linear-gradient(135deg,#6C63FF,#FF6584)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>👨‍👩‍👦 Parent Dashboard</div>
        </div>
        {/* Search */}
        <div style={{...S.card,padding:20,marginBottom:16}}>
          <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:14,marginBottom:12}}>Track Your Child&apos;s Progress</div>
          <div style={{display:'flex',gap:10}}>
            <input style={{...S.inp,flex:1}} type="email" value={parentEmail} onChange={e=>setParentEmail(e.target.value)} placeholder="Enter your parent email address" onKeyDown={e=>e.key==='Enter'&&fetch('/api/student/parent?email='+encodeURIComponent(parentEmail)).then(r=>r.json()).then(d=>setParentData(d.students||[]))}/>
            <button onClick={()=>fetch('/api/student/parent?email='+encodeURIComponent(parentEmail)).then(r=>r.json()).then(d=>setParentData(d.students||[]))} style={{...S.btn,background:'linear-gradient(135deg,#6C63FF,#FF6584)',color:'#fff',padding:'12px 18px',fontSize:12,whiteSpace:'nowrap'}}>🔍 Search</button>
          </div>
        </div>
        {parentData.length===0&&parentEmail&&(
          <div style={{...S.card,padding:24,textAlign:'center',color:C.mu}}>
            <div style={{fontSize:32,marginBottom:8}}>👶</div>
            <div style={{fontSize:14,fontWeight:700}}>No children linked to this email</div>
            <div style={{fontSize:12,marginTop:6}}>Ask your child to add your email when signing up, or link below.</div>
          </div>
        )}
        {parentData.map((s,i)=>{
          const cp=classProg(s.class_level as number);
          return(<div key={i} style={{...S.card,padding:20,marginBottom:12,border:`1px solid rgba(108,99,255,.3)`}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
              <div style={{width:48,height:48,borderRadius:'50%',background:'linear-gradient(135deg,#6C63FF,#FF6584)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:900,color:'#fff',flexShrink:0}}>{(s.name as string)[0]?.toUpperCase()}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:18}}>{s.name as string}</div>
                <div style={{fontSize:11,color:C.mu}}>Class {s.class_level as number} · {s.state_name as string}{s.city?`, ${s.city as string}`:''}</div>
              </div>
              <div style={{textAlign:'right'}}><div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:20,color:C.y}}>⭐ {s.total_xp as number}</div><div style={{fontSize:9,color:C.mu}}>XP Earned</div></div>
            </div>
            <div style={{height:6,background:'rgba(255,255,255,.08)',borderRadius:3,overflow:'hidden',marginBottom:14}}>
              <div style={{height:'100%',background:'linear-gradient(90deg,#6C63FF,#43E97B)',borderRadius:3,width:`${cp.pct}%`,transition:'width .8s'}}/>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:12}}>
              {[{l:'Chapters',v:String(s.chapters_done||0)+'/'+(s.total_chapters||'?'),c:C.a},{l:'Quiz Avg',v:String(s.avg_quiz||0)+'%',c:C.p},{l:'Certs',v:String(s.certificates||0),c:C.y},{l:'XP',v:String(s.total_xp||0),c:C.sky}].map((stat,j)=>(
                <div key={j} style={{background:'rgba(255,255,255,.04)',borderRadius:10,padding:10,textAlign:'center'}}>
                  <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:16,color:stat.c}}>{stat.v}</div>
                  <div style={{fontSize:9,color:C.mu,marginTop:2}}>{stat.l}</div>
                </div>
              ))}
            </div>
            <div style={{fontSize:11,color:C.mu}}>Last active: {s.last_active?new Date(s.last_active as string).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}):'Never'}</div>
          </div>);
        })}
        {/* Link */}
        <div style={{...S.card,padding:20,marginTop:16}}>
          <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:14,marginBottom:12}}>🔗 Link Your Child&apos;s Account</div>
          <div style={{display:'grid',gap:10}}>
            <input style={S.inp} value={linkStudentEmail} onChange={e=>setLinkStudentEmail(e.target.value)} placeholder="Child's email address"/>
            <input style={S.inp} value={linkParentEmail} onChange={e=>setLinkParentEmail(e.target.value)} placeholder="Your (parent) email"/>
            <button onClick={async()=>{
              if(!linkStudentEmail||!linkParentEmail){alert('Both emails required');return;}
              const r=await fetch('/api/student/parent',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({student_email:linkStudentEmail,parent_email:linkParentEmail})});
              const d=await r.json();
              if(d.success)alert('✅ Linked! You can now track '+d.student_name+' with your email.');
              else alert('❌ '+(d.error||'Error'));
            }} style={{...S.btn,background:'linear-gradient(135deg,#6C63FF,#FF6584)',color:'#fff',fontSize:13}}>🔗 Link Account</button>
          </div>
        </div>
        <div style={{textAlign:'center',marginTop:24}}>
          <button onClick={()=>setScreen('landing')} style={{...S.btn,background:'rgba(255,255,255,.06)',color:C.mu,fontSize:12}}>← Back to Home</button>
        </div>
      </div>
    </div>
  );

  // ── AUTH ──
  if(screen==='auth')return(
    <div style={{minHeight:'100vh',background:C.bg,color:C.text,fontFamily:"'Nunito',sans-serif",display:'flex',alignItems:'center',justifyContent:'center',padding:20,position:'relative'}}>
      <NeuralBg intensity={0.85}/>
      <GlobalStyle/>
      <div style={{position:'relative',zIndex:1,width:'100%',maxWidth:440}}>
        <div style={{...S.card,padding:'36px 28px',boxShadow:'0 20px 60px rgba(108,99,255,.2)'}}>
          <div style={{textAlign:'center',marginBottom:24}}>
            <img src="/logo.png" alt="STU-BRAIN" style={{width:64,height:64,borderRadius:14,marginBottom:10,boxShadow:'0 0 30px rgba(108,99,255,.5)'}}/>
            <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:22,background:'linear-gradient(135deg,#6C63FF,#FF6584)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>STU-BRAIN</div>
            <div style={{fontSize:11,color:C.mu,marginTop:2}}>Individual Learning · All India</div>
          </div>
          <div style={{display:'flex',gap:0,marginBottom:20,background:'rgba(255,255,255,.04)',borderRadius:12,padding:4}}>
            {(['login','signup'] as const).map(m=>(
              <button key={m} onClick={()=>{setAuthMode(m);setErr('');}} style={{flex:1,padding:'9px',borderRadius:9,fontSize:12,fontWeight:800,border:'none',cursor:'pointer',fontFamily:"'Nunito',sans-serif",background:authMode===m?C.p:'transparent',color:authMode===m?'#fff':C.mu,transition:'all .2s'}}>
                {m==='login'?'🔑 Login':'✨ Sign Up'}
              </button>
            ))}
          </div>
          {authMode==='signup'&&(
            <div style={{marginBottom:12}}>
              <label style={{fontSize:10,fontWeight:800,color:C.mu,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:5}}>Full Name (for certificate) *</label>
              <input style={S.inp} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Your full name as on certificate"/>
            </div>
          )}
          <div style={{marginBottom:12}}>
            <label style={{fontSize:10,fontWeight:800,color:C.mu,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:5}}>Email *</label>
            <input style={S.inp} type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="your@email.com" onKeyDown={e=>e.key==='Enter'&&doAuth()}/>
          </div>
          <div style={{marginBottom:authMode==='signup'?12:16}}>
            <label style={{fontSize:10,fontWeight:800,color:C.mu,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:5}}>Password *</label>
            <input style={S.inp} type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} placeholder="Minimum 6 characters" onKeyDown={e=>e.key==='Enter'&&doAuth()}/>
          </div>
          {authMode==='signup'&&<>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:10,fontWeight:800,color:C.mu,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:5}}>Your Class *</label>
              <select style={{...S.inp}} value={form.class_level} onChange={e=>setForm(f=>({...f,class_level:e.target.value}))}>
                {[3,4,5,6,7,8,9,10,11,12].map(c=><option key={c} value={c}>Class {c}</option>)}
              </select>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
              <div>
                <label style={{fontSize:10,fontWeight:800,color:C.mu,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:5}}>State</label>
                <select style={{...S.inp,padding:'11px 8px',fontSize:11}} value={form.state_name} onChange={e=>setForm(f=>({...f,state_name:e.target.value}))}>
                  {INDIA_STATES.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:10,fontWeight:800,color:C.mu,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:5}}>City</label>
                <input style={S.inp} value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} placeholder="Your city"/>
              </div>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:10,fontWeight:800,color:C.mu,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:5}}>Parent Email (optional)</label>
              <input style={S.inp} type="email" value={form.parent_email} onChange={e=>setForm(f=>({...f,parent_email:e.target.value}))} placeholder="parent@email.com"/>
            </div>
          </>}
          {err&&<div style={{color:C.s,fontSize:12,fontWeight:700,marginBottom:12,background:'rgba(255,101,132,.1)',padding:'8px 12px',borderRadius:8}}>{err}</div>}
          <button onClick={doAuth} disabled={loading} style={{...S.btn,width:'100%',background:'linear-gradient(135deg,#6C63FF,#FF6584)',color:'#fff',fontSize:15,padding:13}}>
            {loading?'⏳ Please wait...':(authMode==='login'?'🔑 Login':'🚀 Create Account')}
          </button>
          <div style={{textAlign:'center',marginTop:16,display:'flex',flexDirection:'column',gap:8}}>
            <button onClick={()=>setScreen('landing')} style={{background:'none',border:'none',color:C.mu,fontSize:11,cursor:'pointer',fontFamily:"'Nunito',sans-serif"}}>← Back to home</button>
            <button onClick={()=>setScreen('parent')} style={{background:'none',border:'none',color:C.p,fontSize:11,cursor:'pointer',fontFamily:"'Nunito',sans-serif",fontWeight:700}}>👨‍👩‍👦 Parent? Track your child here</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── DASHBOARD ──
  if(screen==='dashboard'&&user){
    const ownCls=user.class_level;
    const myClass=CURRICULUM[curClass];
    const cp=classProg(curClass);
    const isPaid=user.is_paid;
    // Build class list: own class first, then others
    const classOrder=[ownCls,...[3,4,5,6,7,8,9,10,11,12].filter(c=>c!==ownCls)];
    const allChapsList=((CURRICULUM[curClass]?.subjects||[]).flatMap(s=>s.chapters).filter((ch): ch is Chapter => Boolean(ch)));

    return(
      <div style={{minHeight:'100vh',background:C.bg,color:C.text,fontFamily:"'Nunito',sans-serif",position:'relative'}}>
        <NeuralBg intensity={0.5}/>
        <GlobalStyle/>
        <div style={{position:'relative',zIndex:1}}>
          {/* Topnav */}
          <nav style={{padding:'12px 16px',display:'flex',alignItems:'center',gap:8,background:'rgba(10,10,30,.95)',backdropFilter:'blur(20px)',borderBottom:`1px solid ${C.br}`,position:'sticky',top:0,zIndex:100,flexWrap:'wrap'}}>
            <img src="/logo.png" alt="STU-BRAIN" style={{width:32,height:32,borderRadius:8}}/>
            <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:16,background:'linear-gradient(135deg,#6C63FF,#FF6584)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>STU-BRAIN</div>
            <div style={{fontSize:10,color:C.mu,fontWeight:600,display:'none'}}>· {user.state_name}</div>
            <div style={{marginLeft:'auto',display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
              {!isPaid&&<button onClick={()=>setScreen('payment')} style={{...S.btn,background:'linear-gradient(135deg,#FFD166,#FF9F43)',color:'#0D0D2B',padding:'5px 12px',fontSize:11}}>🔓 Unlock ₹299</button>}
              <div style={{fontSize:11,fontWeight:800,background:'rgba(255,209,102,.15)',border:'1px solid rgba(255,209,102,.3)',color:C.y,borderRadius:50,padding:'4px 10px'}}>⭐ {totalXP} XP</div>
              <button onClick={()=>{setHistory([]);goTo('parent');}} style={{...S.btn,background:'rgba(108,99,255,.15)',color:C.p,padding:'5px 10px',fontSize:11,border:`1px solid ${C.br}`}}>👨‍👩‍👦</button>
              <button onClick={logout} style={{...S.btn,background:'rgba(255,255,255,.08)',color:C.mu,padding:'5px 10px',fontSize:11}}>Logout</button>
            </div>
          </nav>
          <div style={{maxWidth:1080,margin:'0 auto',padding:'16px 16px 40px'}}>
            {/* Welcome + unlock banner */}
            {!isPaid&&(
              <div style={{background:'linear-gradient(135deg,rgba(255,209,102,.15),rgba(255,159,67,.08))',border:'2px solid rgba(255,209,102,.4)',borderRadius:16,padding:'16px 20px',marginBottom:20,display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:16,color:C.y}}>🔒 Free Preview Mode</div>
                  <div style={{fontSize:12,color:C.mu,marginTop:3}}>You can preview 2 chapters per class. Unlock all chapters, XP, certificates for just <span style={{color:C.a,fontWeight:900}}>₹299</span> one-time!</div>
                </div>
                <button onClick={()=>setScreen('payment')} style={{...S.btn,background:'linear-gradient(135deg,#FFD166,#FF9F43)',color:'#0D0D2B',fontSize:13,flexShrink:0}}>🚀 Unlock Now</button>
              </div>
            )}
            <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:20,marginBottom:2}}>Welcome, {user.name.split(' ')[0]}! 👋</div>
            <div style={{color:C.mu,fontSize:11,fontWeight:600,marginBottom:16}}>{user.city}, {user.state_name} · Class {user.class_level}</div>
            {/* Stats */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))',gap:10,marginBottom:20}}>
              {[{i:'📚',v:Object.values(prog).filter(p=>p.completed).length,l:'Chapters'},{i:'⭐',v:totalXP,l:'XP Earned'},{i:'🧩',v:Math.round((Object.values(prog).filter(p=>p.completed).reduce((a,p)=>a+(p.quiz_score||0),0)/(Math.max(Object.values(prog).filter(p=>p.completed).length,1)))),l:'Quiz %'},{i:'🎓',v:certs.length,l:'Certs'}].map((s,i)=>(
                <div key={i} style={{...S.card,padding:12,textAlign:'center'}}>
                  <div style={{fontSize:22,marginBottom:3}}>{s.i}</div>
                  <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:18,background:'linear-gradient(135deg,#6C63FF,#FF6584)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{s.v}</div>
                  <div style={{fontSize:10,color:C.mu,fontWeight:700}}>{s.l}</div>
                </div>
              ))}
            </div>
            {/* My certificates */}
            {certs.length>0&&(
              <div style={{marginBottom:20}}>
                <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:14,marginBottom:10}}>🎓 My Certificates</div>
                <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                  {certs.map((c,i)=>(
                    <div key={i} onClick={()=>claimCert(c.class_level)} style={{...S.card,padding:'10px 16px',border:'1px solid rgba(255,209,102,.4)',cursor:'pointer',display:'flex',alignItems:'center',gap:10}}>
                      <div style={{fontSize:24}}>🏆</div>
                      <div><div style={{fontSize:12,fontWeight:800,color:C.y}}>Class {c.class_level} Complete</div><div style={{fontSize:10,color:C.mu}}>{new Date(c.issued_at).toLocaleDateString('en-IN')}</div><div style={{fontSize:10,color:C.p,fontWeight:700}}>👆 View & Download</div></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Class selector */}
            <div style={{marginBottom:14}}>
              <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:14,marginBottom:10}}>📚 All Classes</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {classOrder.map(cls=>{
                  const cp2=classProg(cls);const mine=cls===ownCls;
                  return<button key={cls} onClick={()=>setCurClass(cls)} style={{padding:'6px 14px',borderRadius:50,fontSize:11,fontWeight:800,border:`1px solid ${curClass===cls?C.p:mine?'rgba(255,209,102,.4)':C.br}`,background:curClass===cls?C.p:mine?'rgba(255,209,102,.1)':'transparent',color:curClass===cls?'#fff':mine?C.y:C.mu,cursor:'pointer'}}>
                    Class {cls}{mine?' ⭐':''}{cp2.pct>0&&` ${cp2.pct}%`}
                  </button>;
                })}
              </div>
            </div>
            {/* Progress bar */}
            {myClass&&<>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:14,color:curClass===ownCls?C.y:C.text}}>{myClass.label} {curClass===ownCls?'⭐ Your Class':''}</div>
                <div style={{fontSize:11,color:C.mu,fontWeight:700}}>{cp.done}/{cp.total} chapters</div>
              </div>
              <div style={{height:6,background:'rgba(255,255,255,.08)',borderRadius:3,overflow:'hidden',marginBottom:16}}>
                <div style={{height:'100%',background:`linear-gradient(90deg,${C.p},${C.a})`,borderRadius:3,width:`${cp.pct}%`,transition:'width .8s'}}/>
              </div>
              {/* Chapter claim cert button */}
              {curClass===ownCls&&cp.done===cp.total&&cp.total>0&&!certs.find(c=>c.class_level===curClass)&&(
                <button onClick={()=>claimCert(curClass)} style={{...S.btn,background:'linear-gradient(135deg,#FFD166,#FF9F43)',color:'#0D0D2B',marginBottom:16,fontSize:13}}>🎓 Claim Class {curClass} Certificate!</button>
              )}
              {/* Chapters list */}
              {myClass.subjects.map((subj,si)=>(
                <div key={si} style={{marginBottom:16}}>
                  <div style={{fontSize:11,fontWeight:800,color:C.mu,textTransform:'uppercase',letterSpacing:1,marginBottom:8}}>{subj.name}</div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:10}}>
                    {(subj.chapters.filter(Boolean) as Chapter[]).map((ch,ci)=>{
                      const done=prog[ch.id]?.completed;
                      const chapIdx=allChapsList.findIndex(c=>c.id===ch.id);
                      const isLocked=!isPaid&&chapIdx>=2;
                      const score=prog[ch.id]?.quiz_score||0;
                      return<div key={ci} onClick={()=>{setCurChap(ch);setCurSlide(0);setQDone({});setHistory(h=>[...h,'dashboard']);setScreen('learn');}} style={{...S.card,padding:14,cursor:'pointer',border:`1px solid ${done?'rgba(67,233,123,.3)':isLocked?'rgba(255,101,132,.2)':C.br}`,background:done?'rgba(67,233,123,.06)':isLocked?'rgba(255,101,132,.03)':C.card,transition:'transform .2s',opacity:isLocked?0.7:1}}
                        onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='translateY(-2px)'}
                        onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='translateY(0)'}>
                        <div style={{display:'flex',alignItems:'center',gap:10}}>
                          <div style={{fontSize:22,flexShrink:0}}>{isLocked?'🔒':done?'✅':ch.icon||'📖'}</div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:12,fontWeight:800,color:done?C.a:isLocked?C.s:C.text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{ch.title}</div>
                            <div style={{fontSize:10,color:C.mu,marginTop:2}}>{isLocked?'🔒 Unlock ₹299':`⭐ ${ch.xp} XP${done&&score>0?` · ${score}% quiz`:''}`}</div>
                          </div>
                          <div style={{color:isLocked?C.s:C.p,fontWeight:900,fontSize:16,flexShrink:0}}>{isLocked?'🔓':'▶'}</div>
                        </div>
                      </div>;
                    })}
                  </div>
                </div>
              ))}
            </>}
          </div>
        </div>
      </div>
    );
  }

  // ── LANDING ──
  return(
    <div style={{minHeight:'100vh',background:C.bg,color:C.text,fontFamily:"'Nunito',sans-serif",position:'relative',overflowX:'hidden'}}>
      <NeuralBg intensity={0.9}/>
      <GlobalStyle/>
      <div style={{position:'relative',zIndex:1}}>
        <nav style={{padding:'14px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(10,10,30,.85)',backdropFilter:'blur(20px)',borderBottom:`1px solid ${C.br}`,position:'sticky',top:0,zIndex:100}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <img src="/logo.png" alt="STU-BRAIN" style={{width:34,height:34,borderRadius:8}}/>
            <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:18,background:'linear-gradient(135deg,#6C63FF,#FF6584)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>STU-BRAIN</div>
            <span style={{fontSize:10,color:C.mu,fontWeight:700,background:'rgba(108,99,255,.15)',border:`1px solid ${C.br}`,borderRadius:50,padding:'2px 8px'}}>Individual</span>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <button onClick={()=>{setAuthMode('login');setScreen('auth');setHistory([]);}} style={{...S.btn,background:'rgba(255,255,255,.08)',color:C.text,padding:'7px 16px',fontSize:12}}>Login</button>
            <button onClick={()=>{setAuthMode('signup');setScreen('auth');setHistory([]);}} style={{...S.btn,background:'linear-gradient(135deg,#6C63FF,#FF6584)',color:'#fff',padding:'7px 16px',fontSize:12}}>Sign Up Free</button>
          </div>
        </nav>
        {/* Hero */}
        <section style={{padding:'80px 24px 60px',textAlign:'center',maxWidth:860,margin:'0 auto'}}>
          <div style={{display:'inline-flex',background:'rgba(67,233,123,.1)',border:'1px solid rgba(67,233,123,.3)',borderRadius:50,padding:'6px 18px',fontSize:11,fontWeight:800,color:C.a,marginBottom:20,letterSpacing:1}}>🇮🇳 MADE FOR EVERY STUDENT IN INDIA</div>
          <h1 style={{fontFamily:"'Fredoka One',sans-serif",fontSize:'clamp(34px,6vw,68px)',lineHeight:1.1,marginBottom:16}}>
            <span style={{background:'linear-gradient(135deg,#6C63FF,#FF6584)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Learn AI</span><br/>from Anywhere in India
          </h1>
          <p style={{fontSize:'clamp(14px,2vw,18px)',color:'rgba(255,255,255,.6)',maxWidth:540,margin:'0 auto 36px',lineHeight:1.7,fontWeight:600}}>No school required. Students from Rajasthan to Kerala — learn AI, ML, Python and Robotics at ₹299 one-time.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:60}}>
            <button onClick={()=>{setAuthMode('signup');setScreen('auth');}} style={{...S.btn,background:'linear-gradient(135deg,#6C63FF,#FF6584)',color:'#fff',fontSize:16,padding:'14px 36px',boxShadow:'0 8px 32px rgba(108,99,255,.4)'}}>🚀 Start Learning — ₹299</button>
            <button onClick={()=>setScreen('parent')} style={{...S.btn,background:'rgba(255,255,255,.06)',border:`1px solid ${C.a}`,color:C.a,fontSize:14,padding:'14px 24px'}}>👨‍👩‍👦 Parent Dashboard</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:12,maxWidth:640,margin:'0 auto'}}>
            {[{n:'68+',l:'AI Chapters'},{n:'Class 3-12',l:'All levels'},{n:'₹299',l:'One-time only'},{n:'24/7',l:'AI Bot Help'}].map((s,i)=>(
              <div key={i} style={{...S.card,padding:'14px 8px',textAlign:'center'}}>
                <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:20,background:'linear-gradient(135deg,#6C63FF,#FF6584)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{s.n}</div>
                <div style={{fontSize:11,color:C.mu,fontWeight:700,marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>
        {/* Features */}
        <section style={{padding:'40px 24px',maxWidth:1000,margin:'0 auto'}}>
          <h2 style={{fontFamily:"'Fredoka One',sans-serif",fontSize:28,textAlign:'center',marginBottom:32,background:'linear-gradient(135deg,#6C63FF,#FF6584)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Everything to Master AI</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:14}}>
            {[{icon:'🤖',t:'AI Doubt Bot',d:'Ask AI questions 24/7 in Hindi or English. Powered by Nvidia Nemotron AI model.'},{icon:'🏆',t:'XP & Certificates',d:'Earn XP for every chapter. Get digital certificates to show in college applications.'},{icon:'👨‍👩‍👦',t:'Parent Dashboard',d:'Parents track progress in real-time — chapters done, quiz scores, certificates.'},{icon:'🔒',t:'Unlock Once',d:'One-time ₹299 payment. Lifetime access to all chapters for your class. No renewals.'},{icon:'🌐',t:'Hindi + English',d:'Every lesson in both languages. Learn in the language you are comfortable with.'},{icon:'📱',t:'Works Everywhere',d:'Phone, tablet, laptop. Works offline too. Install as PWA app on your phone.'}].map((f,i)=>(
              <div key={i} style={{...S.card,padding:20,transition:'transform .2s'}}
                onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)'}
                onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='translateY(0)'}>
                <div style={{fontSize:32,marginBottom:8}}>{f.icon}</div>
                <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:15,marginBottom:6}}>{f.t}</div>
                <div style={{fontSize:12,color:C.mu,lineHeight:1.6}}>{f.d}</div>
              </div>
            ))}
          </div>
        </section>
        {/* CTA */}
        <section style={{padding:'50px 24px 80px',textAlign:'center'}}>
          <div style={{...S.card,maxWidth:560,margin:'0 auto',padding:40,border:'2px solid rgba(108,99,255,.4)',background:'linear-gradient(135deg,rgba(108,99,255,.1),rgba(255,101,132,.05))'}}>
            <img src="/logo.png" alt="STU-BRAIN" style={{width:64,height:64,borderRadius:14,marginBottom:12}}/>
            <h2 style={{fontFamily:"'Fredoka One',sans-serif",fontSize:26,marginBottom:8}}>Join 1000s of Students Across India</h2>
            <p style={{color:C.mu,fontSize:13,marginBottom:24,lineHeight:1.6}}>One-time ₹299. Lifetime access. Start learning AI today.</p>
            <button onClick={()=>{setAuthMode('signup');setScreen('auth');}} style={{...S.btn,background:'linear-gradient(135deg,#6C63FF,#FF6584)',color:'#fff',fontSize:16,padding:'14px 40px',boxShadow:'0 8px 32px rgba(108,99,255,.4)'}}>🚀 Start for ₹299</button>
          </div>
        </section>
        <div style={{textAlign:'center',padding:'20px',color:C.mu,fontSize:11,borderTop:`1px solid ${C.br}`}}>
          © 2025 STU-BRAIN · <a href="/app" style={{color:C.p,textDecoration:'none'}}>School Login</a> · <a href="/" style={{color:C.p,textDecoration:'none'}}>Main Website</a>
        </div>
      </div>
    </div>
  );
}
