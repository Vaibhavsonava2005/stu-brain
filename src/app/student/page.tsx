'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { CURRICULUM } from '@/lib/curriculum';
import type { Chapter, Slide } from '@/lib/curriculum';

// ── Colors ──
const C = { bg:'#0A0A1E', card:'rgba(255,255,255,.05)', card2:'rgba(255,255,255,.03)', br:'rgba(108,99,255,.25)', p:'#6C63FF', s:'#FF6584', a:'#43E97B', y:'#FFD166', o:'#FF9F43', sky:'#38BFFF', mu:'#9090BB', text:'#F0F0FF', grad:'linear-gradient(135deg,#6C63FF,#FF6584)' };
const S: Record<string,React.CSSProperties> = {
  card:{background:C.card,border:`1px solid ${C.br}`,borderRadius:16,padding:16},
  btn:{border:'none',borderRadius:50,padding:'10px 22px',fontSize:13,fontWeight:800,cursor:'pointer',fontFamily:"'Nunito',sans-serif"},
  inp:{width:'100%',padding:'11px 14px',borderRadius:10,border:`1px solid ${C.br}`,background:'rgba(255,255,255,.06)',color:C.text,fontSize:13,fontWeight:600,outline:'none',boxSizing:'border-box' as const,fontFamily:"'Nunito',sans-serif"},
};

// ── 3D Neural Background ──
function NeuralBg({ intensity=1 }: { intensity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    const resize = () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener('resize', resize);
    const COLS = ['#6C63FF','#43E97B','#38BFFF','#FFD166','#FF6584'];
    type N = {x:number;y:number;z:number;vx:number;vy:number;vz:number;r:number;c:string;p:number;ps:number};
    const nodes: N[] = Array.from({length:Math.floor(40*intensity)},(_,i)=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*400+50,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.3,vz:(Math.random()-.5)*.5,r:Math.random()*4+2,c:COLS[i%5],p:Math.random()*6.28,ps:.02+Math.random()*.025}));
    const h=(n:number)=>Math.max(0,Math.min(255,Math.floor(n))).toString(16).padStart(2,'0');
    const proj=(x:number,y:number,z:number)=>{const s=480/(480+z);return{px:W/2+(x-W/2)*s,py:H/2+(y-H/2)*s,s};};
    let raf=0;
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<160){const a=(1-d/160)*0.08*intensity;const pi=proj(nodes[i].x,nodes[i].y,nodes[i].z);const pj=proj(nodes[j].x,nodes[j].y,nodes[j].z);ctx.beginPath();ctx.moveTo(pi.px,pi.py);ctx.lineTo(pj.px,pj.py);ctx.strokeStyle=nodes[i].c+h(a*255);ctx.lineWidth=pi.s*.6;ctx.stroke();}}
      for(const n of nodes){n.x+=n.vx;n.y+=n.vy;n.z+=n.vz;n.p+=n.ps;if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;if(n.z<20||n.z>500)n.vz*=-1;const{px,py,s}=proj(n.x,n.y,n.z);const r=n.r*s*(1+Math.sin(n.p)*.2);const a=Math.min(s*.42*intensity,.65);const g=ctx.createRadialGradient(px,py,0,px,py,r*4);g.addColorStop(0,n.c+h(a*130));g.addColorStop(1,n.c+'00');ctx.beginPath();ctx.arc(px,py,r*4,0,6.28);ctx.fillStyle=g;ctx.fill();ctx.beginPath();ctx.arc(px,py,r,0,6.28);ctx.fillStyle=n.c+h(a*255);ctx.fill();}
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);};
  },[intensity]);
  return <canvas ref={ref} style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0}}/>;
}

const INDIA_STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh','Chandigarh','Puducherry'];

type User = { id:number; name:string; email:string; role:string; class_level:number; state_name:string; city:string; total_xp:number; parent_email?:string; };
type Prog = { completed:boolean; xp_earned:number; quiz_score:number; };
type ProgMap = Record<string, Prog>;

export default function B2CStudentPlatform() {
  const [screen, setScreen] = useState<'landing'|'auth'|'dashboard'|'learn'|'parent'>('landing');
  const [authMode, setAuthMode] = useState<'login'|'signup'>('login');
  const [user, setUser] = useState<User|null>(null);
  const [token, setToken] = useState('');
  const [prog, setProg] = useState<ProgMap>({});
  const [totalXP, setTotalXP] = useState(0);
  const [curClass, setCurClass] = useState(8);
  const [curChap, setCurChap] = useState<Chapter|null>(null);
  const [curSlide, setCurSlide] = useState(0);
  const [qDone, setQDone] = useState<Record<string,{answered:boolean;correct:boolean}>>({});
  const [xpPop, setXpPop] = useState<number|null>(null);
  const [loginErr, setLoginErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [parentEmail, setParentEmail] = useState('');
  const [parentStudents, setParentStudents] = useState<Record<string,unknown>[]>([]);
  const [linkEmail, setLinkEmail] = useState('');
  const [linkParent, setLinkParent] = useState('');

  // Form state
  const [form, setForm] = useState({ name:'', email:'', password:'', class_level:'8', state_name:'Rajasthan', city:'', parent_email:'' });

  useEffect(() => {
    const tok = localStorage.getItem('b2c_tok');
    const usr = localStorage.getItem('b2c_user');
    if (tok && usr) {
      const u = JSON.parse(usr);
      setToken(tok); setUser(u); setCurClass(u.class_level||8);
      setScreen('dashboard'); loadProg(tok);
    }
  }, []);

  const loadProg = useCallback(async (tok: string) => {
    try {
      const r = await fetch('/api/student/progress', { headers:{ authorization:`Bearer ${tok}` } });
      const d = await r.json();
      const m: ProgMap = {};
      (d.progress||[]).forEach((p:{chapter_id:string;completed:boolean;xp_earned:number;quiz_score:number}) => { m[p.chapter_id]={completed:p.completed,xp_earned:p.xp_earned,quiz_score:p.quiz_score}; });
      setProg(m); setTotalXP(d.total_xp||0);
    } catch {}
  }, []);

  async function auth() {
    setLoading(true); setLoginErr('');
    try {
      const r = await fetch('/api/student/auth', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ action:authMode, ...form, class_level:parseInt(form.class_level) }) });
      const d = await r.json();
      if (!r.ok) { setLoginErr(d.error||'Error'); setLoading(false); return; }
      localStorage.setItem('b2c_tok', d.token);
      localStorage.setItem('b2c_user', JSON.stringify(d.user));
      setToken(d.token); setUser(d.user); setCurClass(d.user.class_level||8);
      await loadProg(d.token);
      setScreen('dashboard');
    } catch { setLoginErr('Connection error'); }
    setLoading(false);
  }

  async function saveProg(chapId:string, cls:number, completed:boolean, xp:number, score?:number) {
    const ownCls = user?.class_level||cls;
    try {
      await fetch('/api/student/progress', { method:'POST', headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`}, body:JSON.stringify({chapter_id:chapId,class_level:ownCls,completed,xp_earned:xp,quiz_score:score||0}) });
      await loadProg(token);
    } catch {}
  }

  function openChap(ch: Chapter) { setCurChap(ch); setCurSlide(0); setQDone({}); setScreen('learn'); }
  function logout() { localStorage.removeItem('b2c_tok'); localStorage.removeItem('b2c_user'); setUser(null); setToken(''); setScreen('landing'); }

  function classProg(cls:number) {
    const chaps = (CURRICULUM[cls]?.subjects||[]).flatMap(s=>s.chapters).filter(Boolean) as Chapter[];
    const done = chaps.filter(c=>prog[c.id]?.completed).length;
    return { done, total:chaps.length, pct: chaps.length ? Math.round(done/chaps.length*100) : 0 };
  }

  async function completeChap() {
    if (!curChap || prog[curChap.id]?.completed) return;
    const lastSlide = curChap.slides[curChap.slides.length-1];
    if (lastSlide?.type==='quiz' && lastSlide.questions?.length) {
      const si = curChap.slides.length-1;
      const total = lastSlide.questions.length;
      const answered = lastSlide.questions.filter((_:unknown,qi:number)=>qDone[`${curChap.id}_${si}_${qi}`]?.answered).length;
      if (answered < total) { alert(`📝 Answer all ${total} quiz questions first! (${answered}/${total} done)`); return; }
      const correct = lastSlide.questions.filter((_:unknown,qi:number)=>qDone[`${curChap.id}_${si}_${qi}`]?.correct).length;
      const score = Math.round(correct/total*100);
      const xp = curChap.xp; setTotalXP(x=>x+xp); setXpPop(xp); setTimeout(()=>setXpPop(null),2500);
      setProg(p=>({...p,[curChap.id]:{completed:true,xp_earned:xp,quiz_score:score}}));
      await saveProg(curChap.id,curClass,true,xp,score); return;
    }
    const xp = curChap.xp; setTotalXP(x=>x+xp); setXpPop(xp); setTimeout(()=>setXpPop(null),2500);
    setProg(p=>({...p,[curChap.id]:{completed:true,xp_earned:xp,quiz_score:p[curChap.id]?.quiz_score||0}}));
    await saveProg(curChap.id,curClass,true,xp);
  }

  function answerQ(qi:number, oi:number) {
    const slide = curChap?.slides[curSlide]; if (!slide?.questions||!curChap) return;
    const key = `${curChap.id}_${curSlide}_${qi}`; if (qDone[key]) return;
    setQDone(q=>({...q,[key]:{answered:true,correct:oi===slide.questions![qi].c}}));
  }

  function renderSlide(s: Slide) {
    if (!s) return null;
    const speech = s.speechHi && /[\u0900-\u097F]/.test(s.speechHi) ? s.speechHi : s.speech;
    if (s.type==='teach') return (
      <div style={{padding:20}}>
        {s.title&&<div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:22,marginBottom:12,background:C.grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{s.title}</div>}
        {s.intro&&<div style={{fontSize:13,color:C.mu,fontWeight:600,marginBottom:14,lineHeight:1.6}}>{s.intro}</div>}
        {speech&&<div style={{background:'rgba(108,99,255,.08)',border:`1px solid ${C.br}`,borderRadius:12,padding:16,fontSize:13,lineHeight:1.8,marginBottom:14}} dangerouslySetInnerHTML={{__html:speech}}/>}
        {s.items&&<div style={{display:'flex',flexDirection:'column' as const,gap:8}}>
          {s.items.map((it:{l?:string;d?:string},i:number)=>(
            <div key={i} style={{...S.card,padding:12,display:'flex',gap:10}}>
              {it.l&&<div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:13,color:C.p,flexShrink:0}}>{it.l}</div>}
              {it.d&&<div style={{fontSize:12,color:C.mu,lineHeight:1.5}}>{it.d}</div>}
            </div>
          ))}
        </div>}
      </div>
    );
    if (s.type==='quiz') return (
      <div style={{padding:20}}>
        <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:20,marginBottom:16,color:C.y}}>📝 Quiz Time!</div>
        {(s.questions||[]).map((q:{q:string;opts:string[];c:number;ex?:string},qi:number)=>{
          const key=`${curChap?.id}_${curSlide}_${qi}`; const ans=qDone[key];
          return (<div key={qi} style={{...S.card,padding:14,marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:800,marginBottom:10}}>{qi+1}. {q.q}</div>
            <div style={{display:'flex',flexDirection:'column' as const,gap:6}}>
              {q.opts.map((opt,oi)=>{
                const sel=ans&&(oi===q.c?'correct':ans.answered&&oi!==q.c&&qDone[key]?'wrong':'');
                return <button key={oi} onClick={()=>answerQ(qi,oi)} style={{padding:'9px 14px',borderRadius:10,fontSize:12,fontWeight:700,border:`1px solid ${sel==='correct'?C.a:sel==='wrong'?C.s:C.br}`,background:sel==='correct'?'rgba(67,233,123,.15)':sel==='wrong'?'rgba(255,101,132,.1)':'rgba(255,255,255,.04)',color:sel==='correct'?C.a:sel==='wrong'?C.s:C.text,cursor:ans?'default':'pointer',textAlign:'left' as const}}>{opt}</button>;
              })}
            </div>
            {ans&&q.ex&&<div style={{marginTop:8,fontSize:11,color:ans.correct?C.a:C.s,fontWeight:700}}>{ans.correct?'🎉':'❌'} {q.ex}</div>}
          </div>);
        })}
      </div>
    );
    return <div style={{padding:20}}><div dangerouslySetInnerHTML={{__html:speech||s.speech||''}}/></div>;
  }

  // ── LANDING ──
  if (screen==='landing') return (
    <div style={{minHeight:'100vh',background:C.bg,color:C.text,fontFamily:"'Nunito',sans-serif",position:'relative'}}>
      <NeuralBg intensity={0.9}/>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');*{box-sizing:border-box}`}</style>
      <div style={{position:'relative',zIndex:1}}>
        {/* Nav */}
        <nav style={{padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(10,10,30,.8)',backdropFilter:'blur(20px)',borderBottom:`1px solid ${C.br}`,position:'sticky',top:0,zIndex:100}}>
          <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:22,background:C.grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>🧠 STU-BRAIN</div>
          <div style={{display:'flex',gap:10,alignItems:'center'}}>
            <span style={{fontSize:11,color:C.mu,fontWeight:700}}>Individual Learning</span>
            <button onClick={()=>{setAuthMode('login');setScreen('auth');}} style={{...S.btn,background:C.grad,color:'#fff',padding:'8px 18px',fontSize:12}}>Login</button>
            <button onClick={()=>{setAuthMode('signup');setScreen('auth');}} style={{...S.btn,background:'transparent',border:`1px solid ${C.p}`,color:C.p,padding:'8px 18px',fontSize:12}}>Sign Up Free</button>
          </div>
        </nav>
        {/* Hero */}
        <section style={{padding:'100px 24px 80px',textAlign:'center',maxWidth:800,margin:'0 auto'}}>
          <div style={{fontSize:64,marginBottom:16,animation:'pulse 2s ease-in-out infinite'}}>🧠</div>
          <h1 style={{fontFamily:"'Fredoka One',sans-serif",fontSize:'clamp(36px,6vw,64px)',lineHeight:1.1,marginBottom:16}}>
            <span style={{background:C.grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Learn AI</span> from<br/>Anywhere in India
          </h1>
          <p style={{fontSize:18,color:'rgba(255,255,255,.65)',maxWidth:540,margin:'0 auto 40px',lineHeight:1.7,fontWeight:600}}>
            No school required. Students across India — Rajasthan to Kerala — can learn AI, ML, Python and Robotics at their own pace.
          </p>
          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:60}}>
            <button onClick={()=>{setAuthMode('signup');setScreen('auth');}} style={{...S.btn,background:C.grad,color:'#fff',fontSize:16,padding:'14px 36px'}}>🚀 Start Learning Free</button>
            <button onClick={()=>setScreen('parent')} style={{...S.btn,background:'transparent',border:`1px solid ${C.a}`,color:C.a,fontSize:15,padding:'14px 28px'}}>👨‍👩‍👦 Parent Dashboard</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:14,maxWidth:700,margin:'0 auto'}}>
            {[{n:'68+',l:'AI Chapters'},{n:'Classes 3-12',l:'All levels'},{n:'Hindi + English',l:'Bilingual'},{n:'Free',l:'No school needed'}].map((s,i)=>(
              <div key={i} style={{...S.card,padding:'16px 8px',textAlign:'center'}}>
                <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:22,background:C.grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{s.n}</div>
                <div style={{fontSize:11,color:C.mu,fontWeight:700,marginTop:3}}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>
        {/* Features */}
        <section style={{padding:'60px 24px',maxWidth:1000,margin:'0 auto'}}>
          <h2 style={{fontFamily:"'Fredoka One',sans-serif",fontSize:32,textAlign:'center',marginBottom:40,background:C.grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Everything You Need to Master AI</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16}}>
            {[
              {icon:'🤖',title:'AI Doubt Bot',desc:'Ask any AI/ML doubt 24/7 in Hindi or English. Powered by Nvidia Nemotron AI.'},
              {icon:'🏆',title:'XP & Certificates',desc:'Earn XP points for every chapter. Get digital certificates to show colleges and employers.'},
              {icon:'📊',title:'Track Your Progress',desc:'See exactly which chapters you completed, your quiz scores, and how much you have learned.'},
              {icon:'👨‍👩‍👦',title:'Parent Dashboard',desc:'Parents can track their children\'s progress in real-time — chapters done, XP, and certificates.'},
              {icon:'🌐',title:'Hindi + English',desc:'Every lesson available in both languages. Learn in the language you are most comfortable with.'},
              {icon:'📱',title:'Works Everywhere',desc:'Phone, tablet, laptop — works on all devices. Install as an app on your phone.'},
            ].map((f,i)=>(
              <div key={i} style={{...S.card,padding:20}}>
                <div style={{fontSize:32,marginBottom:8}}>{f.icon}</div>
                <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:16,marginBottom:6,color:C.text}}>{f.title}</div>
                <div style={{fontSize:12,color:C.mu,lineHeight:1.6}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>
        {/* CTA */}
        <section style={{padding:'60px 24px',textAlign:'center'}}>
          <div style={{...S.card,maxWidth:600,margin:'0 auto',padding:40,border:`1px solid rgba(108,99,255,.4)`,background:'linear-gradient(135deg,rgba(108,99,255,.1),rgba(255,101,132,.05))'}}>
            <div style={{fontSize:48,marginBottom:12}}>🎓</div>
            <h2 style={{fontFamily:"'Fredoka One',sans-serif",fontSize:28,marginBottom:12}}>Start Learning Today</h2>
            <p style={{color:C.mu,fontSize:14,marginBottom:24}}>Join students from all over India learning AI for free</p>
            <button onClick={()=>{setAuthMode('signup');setScreen('auth');}} style={{...S.btn,background:C.grad,color:'#fff',fontSize:16,padding:'14px 40px'}}>🚀 Create Free Account</button>
          </div>
        </section>
        <div style={{textAlign:'center',padding:'20px',color:C.mu,fontSize:11}}>© 2025 STU-BRAIN · <a href="/app" style={{color:C.p,textDecoration:'none'}}>School Login</a> · <a href="/" style={{color:C.p,textDecoration:'none'}}>Main Website</a></div>
      </div>
      <style>{`@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}`}</style>
    </div>
  );

  // ── AUTH ──
  if (screen==='auth') return (
    <div style={{minHeight:'100vh',background:C.bg,color:C.text,fontFamily:"'Nunito',sans-serif",display:'flex',alignItems:'center',justifyContent:'center',padding:20,position:'relative'}}>
      <NeuralBg intensity={0.85}/>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');*{box-sizing:border-box}`}</style>
      <div style={{position:'relative',zIndex:1,width:'100%',maxWidth:440}}>
        <div style={{...S.card,padding:'36px 32px',boxShadow:'0 20px 60px rgba(108,99,255,.2)'}}>
          <div style={{textAlign:'center',marginBottom:24}}>
            <div style={{fontSize:48,marginBottom:8}}>🧠</div>
            <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:24,background:C.grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>STU-BRAIN</div>
            <div style={{fontSize:12,color:C.mu,marginTop:4}}>Individual Learning Platform</div>
          </div>
          <div style={{display:'flex',gap:0,marginBottom:24,background:'rgba(255,255,255,.04)',borderRadius:12,padding:4}}>
            {(['login','signup'] as const).map(m=>(
              <button key={m} onClick={()=>{setAuthMode(m);setLoginErr('');}} style={{flex:1,padding:'9px',borderRadius:9,fontSize:12,fontWeight:800,border:'none',cursor:'pointer',fontFamily:"'Nunito',sans-serif",background:authMode===m?C.p:'transparent',color:authMode===m?'#fff':C.mu,transition:'all .2s'}}>
                {m==='login'?'🔑 Login':'✨ Sign Up'}
              </button>
            ))}
          </div>

          {authMode==='signup' && <>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:10,fontWeight:800,color:C.mu,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:5}}>Full Name *</label>
              <input style={S.inp} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Your full name"/>
            </div>
          </>}

          <div style={{marginBottom:12}}>
            <label style={{fontSize:10,fontWeight:800,color:C.mu,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:5}}>Email *</label>
            <input style={S.inp} type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="your@email.com" onKeyDown={e=>e.key==='Enter'&&auth()}/>
          </div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:10,fontWeight:800,color:C.mu,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:5}}>Password *</label>
            <input style={S.inp} type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} placeholder="Min 6 characters" onKeyDown={e=>e.key==='Enter'&&auth()}/>
          </div>

          {authMode==='signup' && <>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:10,fontWeight:800,color:C.mu,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:5}}>Your Class *</label>
              <select style={{...S.inp,padding:'11px 14px'}} value={form.class_level} onChange={e=>setForm(f=>({...f,class_level:e.target.value}))}>
                {[3,4,5,6,7,8,9,10,11,12].map(c=><option key={c} value={c}>Class {c}</option>)}
              </select>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
              <div>
                <label style={{fontSize:10,fontWeight:800,color:C.mu,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:5}}>State</label>
                <select style={{...S.inp,padding:'11px 10px',fontSize:12}} value={form.state_name} onChange={e=>setForm(f=>({...f,state_name:e.target.value}))}>
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
              <input style={S.inp} type="email" value={form.parent_email} onChange={e=>setForm(f=>({...f,parent_email:e.target.value}))} placeholder="parent@email.com — so they can track your progress"/>
            </div>
          </>}

          {loginErr && <div style={{color:C.s,fontSize:12,fontWeight:700,marginBottom:14,background:'rgba(255,101,132,.1)',padding:'8px 12px',borderRadius:8}}>{loginErr}</div>}
          <button onClick={auth} disabled={loading} style={{...S.btn,width:'100%',background:C.grad,color:'#fff',fontSize:15,padding:13}}>
            {loading?'⏳ Please wait...':(authMode==='login'?'🔑 Login':'🚀 Create Account')}
          </button>
          <div style={{textAlign:'center',marginTop:16,display:'flex',flexDirection:'column' as const,gap:8}}>
            <button onClick={()=>setScreen('landing')} style={{background:'none',border:'none',color:C.mu,fontSize:11,cursor:'pointer',fontFamily:"'Nunito',sans-serif"}}>← Back to home</button>
            <button onClick={()=>setScreen('parent')} style={{background:'none',border:'none',color:C.p,fontSize:11,cursor:'pointer',fontFamily:"'Nunito',sans-serif",fontWeight:700}}>👨‍👩‍👦 Parent? Track your child here</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── PARENT DASHBOARD ──
  if (screen==='parent') return (
    <div style={{minHeight:'100vh',background:C.bg,color:C.text,fontFamily:"'Nunito',sans-serif",position:'relative'}}>
      <NeuralBg intensity={0.6}/>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');*{box-sizing:border-box}`}</style>
      <div style={{position:'relative',zIndex:1,maxWidth:700,margin:'0 auto',padding:20}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24,paddingTop:20}}>
          <button onClick={()=>setScreen('landing')} style={{...S.btn,background:'rgba(255,255,255,.08)',color:C.text,padding:'8px 14px',fontSize:12}}>←</button>
          <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:24,background:C.grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>👨‍👩‍👦 Parent Dashboard</div>
        </div>
        <div style={{...S.card,padding:24,marginBottom:16}}>
          <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:16,marginBottom:14}}>Track Your Child</div>
          <div style={{display:'flex',gap:10}}>
            <input style={{...S.inp,flex:1}} type="email" value={parentEmail} onChange={e=>setParentEmail(e.target.value)} placeholder="Enter your email (parent email)" onKeyDown={async e=>{if(e.key==='Enter'){const r=await fetch('/api/student/parent?email='+encodeURIComponent(parentEmail));const d=await r.json();setParentStudents(d.students||[]);}}}/>
            <button onClick={async()=>{const r=await fetch('/api/student/parent?email='+encodeURIComponent(parentEmail));const d=await r.json();setParentStudents(d.students||[]);}} style={{...S.btn,background:C.grad,color:'#fff',padding:'11px 18px',fontSize:12,whiteSpace:'nowrap'}}>🔍 Find</button>
          </div>
        </div>
        {parentStudents.length===0 && parentEmail && (
          <div style={{...S.card,padding:24,textAlign:'center',color:C.mu}}>
            <div style={{fontSize:32,marginBottom:8}}>👶</div>
            No children linked to this email. Ask your child to add your email during signup.
          </div>
        )}
        {parentStudents.map((s,i)=>(
          <div key={i} style={{...S.card,padding:20,marginBottom:12,border:`1px solid rgba(108,99,255,.3)`}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
              <div style={{width:48,height:48,borderRadius:'50%',background:C.grad,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:900,color:'#fff',flexShrink:0}}>
                {(s.name as string)[0]?.toUpperCase()}
              </div>
              <div>
                <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:18,color:C.text}}>{s.name as string}</div>
                <div style={{fontSize:11,color:C.mu}}>Class {s.class_level as number} · {s.state_name as string} · {s.city as string}</div>
              </div>
              <div style={{marginLeft:'auto',textAlign:'right'}}>
                <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:20,color:C.y}}>⭐ {s.total_xp as number}</div>
                <div style={{fontSize:10,color:C.mu}}>Total XP</div>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
              {[
                {label:'Chapters Done',value:String(s.chapters_done||0),color:C.a},
                {label:'Avg Quiz %',value:String(s.avg_quiz||0)+'%',color:C.p},
                {label:'Certificates',value:String(s.certificates||0),color:C.y},
              ].map((stat,j)=>(
                <div key={j} style={{background:'rgba(255,255,255,.04)',borderRadius:10,padding:12,textAlign:'center'}}>
                  <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:18,color:stat.color}}>{stat.value}</div>
                  <div style={{fontSize:10,color:C.mu,marginTop:2}}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:12,fontSize:11,color:C.mu}}>Last active: {s.last_active ? new Date(s.last_active as string).toLocaleDateString('en-IN') : 'Never'}</div>
          </div>
        ))}
        <div style={{...S.card,padding:20,marginTop:16}}>
          <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:14,marginBottom:12}}>🔗 Link Your Child</div>
          <div style={{display:'grid',gap:10}}>
            <input style={S.inp} value={linkEmail} onChange={e=>setLinkEmail(e.target.value)} placeholder="Child's email address"/>
            <input style={S.inp} value={linkParent} onChange={e=>setLinkParent(e.target.value)} placeholder="Your (parent) email address"/>
            <button onClick={async()=>{
              if(!linkEmail||!linkParent){alert('Both emails required');return;}
              const r=await fetch('/api/student/parent',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({student_email:linkEmail,parent_email:linkParent})});
              const d=await r.json();
              if(d.success)alert('✅ Linked! You can now track '+d.student_name);
              else alert('❌ '+(d.error||'Error'));
            }} style={{...S.btn,background:C.grad,color:'#fff',fontSize:13}}>🔗 Link Account</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── LEARN SCREEN ──
  if (screen==='learn' && curChap) {
    const slide = curChap.slides[curSlide];
    return (
      <div style={{height:'100vh',display:'flex',flexDirection:'column',overflow:'hidden',background:C.bg,color:C.text,fontFamily:"'Nunito',sans-serif"}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');*{box-sizing:border-box}`}</style>
        <div style={{display:'flex',alignItems:'center',gap:8,padding:'10px 16px',background:'rgba(10,10,30,.97)',borderBottom:`1px solid ${C.br}`,flexShrink:0}}>
          <button onClick={()=>setScreen('dashboard')} style={{...S.btn,background:'rgba(255,255,255,.08)',color:C.text,padding:'7px 14px',fontSize:12}}>← Back</button>
          <div style={{flex:1,fontFamily:"'Fredoka One',sans-serif",fontSize:14,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{curChap.title}</div>
          <div style={{fontSize:11,color:C.mu,fontWeight:700}}>{curSlide+1}/{curChap.slides.length}</div>
        </div>
        <div style={{flex:1,overflowY:'auto'}}>{renderSlide(slide)}</div>
        {xpPop&&<div style={{position:'fixed',top:60,right:16,zIndex:999,background:`linear-gradient(135deg,${C.y},${C.o})`,color:'#0D0D2B',padding:'9px 18px',borderRadius:50,fontSize:15,fontWeight:800,boxShadow:'0 7px 22px rgba(255,209,102,.6)'}}>⭐ +{xpPop} XP!</div>}
        <div style={{padding:'11px 16px',background:'rgba(10,10,30,.97)',borderTop:`1px solid ${C.br}`,display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
          {curSlide>0&&<button onClick={()=>setCurSlide(s=>s-1)} style={{...S.btn,background:'rgba(255,255,255,.08)',color:C.text,padding:'10px 20px',fontSize:13}}>◀ Prev</button>}
          <span style={{fontSize:11,color:C.mu,fontWeight:700,flex:1,textAlign:'center'}}>{curSlide+1} / {curChap.slides.length}</span>
          {curSlide<curChap.slides.length-1?(
            <button onClick={()=>setCurSlide(s=>s+1)} style={{...S.btn,background:C.grad,color:'#fff',padding:'10px 24px',fontSize:13}}>Next ▶</button>
          ):!prog[curChap.id]?.completed?(
            <button onClick={completeChap} style={{...S.btn,background:'linear-gradient(135deg,#43E97B,#38F9D7)',color:'#0D0D2B',padding:'10px 24px',fontSize:13}}>🏆 Complete</button>
          ):(
            <button onClick={()=>setScreen('dashboard')} style={{...S.btn,background:C.grad,color:'#fff',padding:'10px 24px',fontSize:13}}>📚 Back</button>
          )}
        </div>
      </div>
    );
  }

  // ── DASHBOARD ──
  const myClass = CURRICULUM[curClass];
  const cp = classProg(curClass);
  return (
    <div style={{minHeight:'100vh',background:C.bg,color:C.text,fontFamily:"'Nunito',sans-serif",position:'relative'}}>
      <NeuralBg intensity={0.5}/>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');*{box-sizing:border-box}`}</style>
      <div style={{position:'relative',zIndex:1}}>
        {/* Nav */}
        <nav style={{padding:'12px 20px',display:'flex',alignItems:'center',gap:10,background:'rgba(10,10,30,.95)',backdropFilter:'blur(20px)',borderBottom:`1px solid ${C.br}`,position:'sticky',top:0,zIndex:100,flexWrap:'wrap'}}>
          <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:18,background:C.grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>🧠 STU-BRAIN</div>
          <div style={{fontSize:11,color:C.mu,fontWeight:600}}>Individual · {user?.state_name}</div>
          <div style={{marginLeft:'auto',display:'flex',gap:8,alignItems:'center'}}>
            <div style={{fontSize:11,fontWeight:800,background:'rgba(255,209,102,.15)',border:'1px solid rgba(255,209,102,.3)',color:C.y,borderRadius:50,padding:'4px 10px'}}>⭐ {totalXP} XP</div>
            <button onClick={()=>setScreen('parent')} style={{...S.btn,background:'rgba(108,99,255,.15)',color:C.p,padding:'5px 12px',fontSize:11,border:`1px solid ${C.br}`}}>👨‍👩‍👦</button>
            <button onClick={logout} style={{...S.btn,background:'rgba(255,255,255,.08)',color:C.mu,padding:'5px 12px',fontSize:11}}>Logout</button>
          </div>
        </nav>
        <div style={{maxWidth:1080,margin:'0 auto',padding:20}}>
          {/* Welcome */}
          <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:22,marginBottom:4}}>Welcome back, {user?.name?.split(' ')[0]}! 👋</div>
          <div style={{color:C.mu,fontSize:12,fontWeight:600,marginBottom:20}}>{user?.city}, {user?.state_name} · Class {user?.class_level}</div>
          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:10,marginBottom:20}}>
            {[
              {i:'📚',v:Object.values(prog).filter(p=>p.completed).length,l:'Chapters Done'},
              {i:'⭐',v:totalXP,l:'Total XP'},
              {i:'🧩',v:Math.round((Object.values(prog).filter(p=>p.completed).reduce((a,p)=>a+(p.quiz_score||0),0)/(Math.max(Object.values(prog).filter(p=>p.completed).length,1)))),l:'Avg Quiz %'},
              {i:'🎯',v:cp.pct+'%',l:'Class Progress'},
            ].map((s,i)=>(
              <div key={i} style={{...S.card,padding:14,textAlign:'center'}}>
                <div style={{fontSize:24,marginBottom:4}}>{s.i}</div>
                <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:20,background:C.grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{s.v}</div>
                <div style={{fontSize:10,color:C.mu,fontWeight:700}}>{s.l}</div>
              </div>
            ))}
          </div>
          {/* Class selector */}
          <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap'}}>
            {[3,4,5,6,7,8,9,10,11,12].map(cls=>{
              const cp2=classProg(cls); const mine=cls===user?.class_level;
              return <button key={cls} onClick={()=>setCurClass(cls)} style={{padding:'6px 14px',borderRadius:50,fontSize:11,fontWeight:800,border:`1px solid ${curClass===cls?C.p:C.br}`,background:curClass===cls?C.p:'transparent',color:curClass===cls?'#fff':mine?C.y:C.mu,cursor:'pointer',position:'relative' as const}}>
                Class {cls}{mine&&' ⭐'}{cp2.pct>0&&!mine&&<span style={{fontSize:9}}> {cp2.pct}%</span>}
              </button>;
            })}
          </div>
          {/* Chapters */}
          {myClass && (
            <div>
              <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:16,marginBottom:12}}>📚 {myClass.label} — {cp.done}/{cp.total} chapters</div>
              <div style={{height:6,background:'rgba(255,255,255,.08)',borderRadius:3,overflow:'hidden',marginBottom:16}}>
                <div style={{height:'100%',background:`linear-gradient(90deg,${C.p},${C.a})`,borderRadius:3,width:`${cp.pct}%`,transition:'width .8s'}}/>
              </div>
              {myClass.subjects.map((subj,si)=>(
                <div key={si} style={{marginBottom:16}}>
                  <div style={{fontSize:12,fontWeight:800,color:C.mu,textTransform:'uppercase',letterSpacing:1,marginBottom:8}}>{subj.name}</div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:10}}>
                    {(subj.chapters.filter(Boolean) as Chapter[]).map((ch,ci)=>{
                      const done=prog[ch.id]?.completed; const score=prog[ch.id]?.quiz_score||0;
                      return <div key={ci} onClick={()=>openChap(ch)} style={{...S.card,padding:14,cursor:'pointer',border:`1px solid ${done?'rgba(67,233,123,.3)':C.br}`,background:done?'rgba(67,233,123,.06)':C.card,transition:'transform .2s'}}
                        onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='translateY(-2px)'}
                        onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='translateY(0)'}>
                        <div style={{display:'flex',alignItems:'center',gap:10}}>
                          <div style={{fontSize:24}}>{done?'✅':ch.icon||'📖'}</div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:12,fontWeight:800,color:done?C.a:C.text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{ch.title}</div>
                            <div style={{fontSize:10,color:C.mu,marginTop:2}}>⭐ {ch.xp} XP{done&&score>0?` · ${score}% quiz`:''}</div>
                          </div>
                          <div style={{color:C.p,fontWeight:900,fontSize:16}}>▶</div>
                        </div>
                      </div>;
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
