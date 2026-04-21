'use client';
import { useState, useRef, useEffect } from 'react';


function HeroSlider() {
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const slides = [
    { emoji:'🧠', title:'AI Education', sub:'for India\'s Future', desc:'STU-BRAIN teaches AI, Machine Learning, Python, and Robotics to Class 3-12 students through animated lessons and an AI doubt bot.', color:'#6C63FF', accent:'#FF6584' },
    { emoji:'🤖', title:'Real AI Lessons', sub:'Not Just Theory', desc:'Interactive slides, 10-question quizzes, XP rewards, and digital certificates. Students actually learn AI — not just read about it.', color:'#43E97B', accent:'#38BFFF' },
    { emoji:'🏆', title:'Track Every Student', sub:'Real-Time Analytics', desc:'Admins and teachers see live progress — chapters done, quiz scores, XP leaderboards. Know exactly who needs help.', color:'#FFD166', accent:'#FF9F43' },
    { emoji:'🌐', title:'Hindi + English', sub:'For Every Indian Student', desc:'Full bilingual support. Switch languages anytime. Works on mobile, tablet, desktop. Install as PWA app.', color:'#38BFFF', accent:'#6C63FF' },
  ];
  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => { setSlide(s => (s+1)%slides.length); setAnimating(false); }, 300);
    }, 4000);
    return () => clearInterval(t);
  }, []);
  const s = slides[slide];
  return (
    <section style={{padding:'80px 20px 60px',textAlign:'center',position:'relative',overflow:'hidden',background:'radial-gradient(ellipse 80% 50% at 50% 0%,rgba(108,99,255,.25),transparent)'}}>
      <div style={{maxWidth:800,margin:'0 auto'}}>
        {/* Slide indicator dots */}
        <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:32}}>
          {slides.map((_,i)=>(
            <button key={i} onClick={()=>setSlide(i)} style={{width:i===slide?24:8,height:8,borderRadius:4,background:i===slide?s.color:'rgba(255,255,255,.2)',border:'none',cursor:'pointer',transition:'all .3s'}}/>
          ))}
        </div>
        {/* 3D Floating emoji */}
        <div style={{fontSize:80,marginBottom:16,transition:'all .3s',transform:animating?'scale(0.8) rotateY(90deg)':'scale(1) rotateY(0deg)',display:'inline-block',filter:`drop-shadow(0 0 30px ${s.color}80)`}}>
          {s.emoji}
        </div>
        <div style={{display:'inline-block',background:`rgba(108,99,255,.2)`,border:`1px solid ${s.color}66`,borderRadius:50,padding:'6px 18px',fontSize:12,fontWeight:800,color:s.color,marginBottom:20,letterSpacing:1,transition:'all .3s'}}>🇮🇳 MADE IN INDIA · FOR INDIA</div>
        <h1 className="fredoka" style={{fontSize:'clamp(36px,6vw,72px)',lineHeight:1.1,marginBottom:8,transition:'opacity .3s',opacity:animating?0:1}}>
          <span style={{background:`linear-gradient(90deg,${s.color},${s.accent})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{s.title}</span><br/>
          <span style={{color:'#F0F0FF',fontSize:'0.75em'}}>{s.sub}</span>
        </h1>
        <p style={{fontSize:'clamp(15px,2vw,18px)',color:'rgba(255,255,255,.65)',maxWidth:560,margin:'0 auto 32px',lineHeight:1.7,fontWeight:600,transition:'opacity .3s',opacity:animating?0:1}}>
          {s.desc}
        </p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:48}}>
          <a href="#enquiry" className="btn-p" style={{padding:'14px 36px',fontSize:16,textDecoration:'none'}}>📞 Get Free Demo</a>
          <a href="/app" className="btn-s" style={{padding:'14px 32px',fontSize:15,textDecoration:'none'}}>▶ Try Demo Login</a>
        </div>
        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,maxWidth:700,margin:'0 auto'}}>
          {[{n:'68+',l:'AI Chapters'},{n:'3-12',l:'All Classes'},{n:'Hindi+',l:'Bilingual'},{n:'24/7',l:'AI Bot'}].map((st,i)=>(
            <div key={i} className="card" style={{padding:'16px 8px',textAlign:'center'}}>
              <div className="fredoka grad" style={{fontSize:28}}>{st.n}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.5)',fontWeight:700,marginTop:3}}>{st.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function NeuralBg() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    const resize = () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener('resize', resize);
    const COLS = ['#6C63FF','#43E97B','#38BFFF','#FFD166','#FF6584'];
    const nodes: {x:number;y:number;z:number;vx:number;vy:number;vz:number;r:number;c:string;p:number;ps:number}[] = Array.from({length:50},(_,i)=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*400+50,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.3,vz:(Math.random()-.5)*.5,r:Math.random()*4+2,c:COLS[i%5],p:Math.random()*6.28,ps:.02+Math.random()*.025}));
    const labels=['AI','ML','DL','∑','⚙','λ','∞','GPU','LLM'];
    const lbls: {x:number;y:number;z:number;vx:number;vy:number;t:string;o:number}[] = Array.from({length:20},(_,i)=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*300+100,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.2,t:labels[i%9],o:Math.random()*.12+.04}));
    const proj=(x:number,y:number,z:number)=>{const s=480/(480+z);return{px:W/2+(x-W/2)*s,py:H/2+(y-H/2)*s,s};};
    const h=(n:number)=>Math.max(0,Math.min(255,Math.floor(n))).toString(16).padStart(2,'0');
    let raf=0;
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<160){const a=(1-d/160)*0.08;const pi=proj(nodes[i].x,nodes[i].y,nodes[i].z);const pj=proj(nodes[j].x,nodes[j].y,nodes[j].z);ctx.beginPath();ctx.moveTo(pi.px,pi.py);ctx.lineTo(pj.px,pj.py);ctx.strokeStyle=nodes[i].c+h(a*255);ctx.lineWidth=pi.s*.6;ctx.stroke();}}
      for(const n of nodes){n.x+=n.vx;n.y+=n.vy;n.z+=n.vz;n.p+=n.ps;if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;if(n.z<20||n.z>500)n.vz*=-1;const{px,py,s}=proj(n.x,n.y,n.z);const r=n.r*s*(1+Math.sin(n.p)*.2);const a=Math.min(s*.4,.6);const g=ctx.createRadialGradient(px,py,0,px,py,r*4);g.addColorStop(0,n.c+h(a*130));g.addColorStop(1,n.c+'00');ctx.beginPath();ctx.arc(px,py,r*4,0,6.28);ctx.fillStyle=g;ctx.fill();ctx.beginPath();ctx.arc(px,py,r,0,6.28);ctx.fillStyle=n.c+h(a*255);ctx.fill();}
      for(const l of lbls){l.x+=l.vx;l.y+=l.vy;if(l.x<0||l.x>W)l.vx*=-1;if(l.y<0||l.y>H)l.vy*=-1;const{px,py,s}=proj(l.x,l.y,l.z);ctx.font=`800 ${Math.max(8,Math.floor(13*s))}px 'Nunito',sans-serif`;ctx.fillStyle=`rgba(108,99,255,${l.o*s})`;ctx.fillText(l.t,px,py);}
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);};
  },[]);
  return <canvas ref={ref} style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:.85}}/>;
}

export default function LandingPage() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', school:'', city:'Jaipur', students:'', message:'' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');


  async function submit() {
    if (!form.name || !form.phone) { setErr('Name and phone are required'); return; }
    setSending(true); setErr('');
    try {
      const r = await fetch('/api/enquiry', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({...form, students: parseInt(form.students)||0}) });
      const d = await r.json();
      if (d.success) setSent(true);
      else setErr(d.error || 'Error submitting');
    } catch { setErr('Network error. Please try again.'); }
    setSending(false);
  }

  const features = [
    { icon:'🧠', title:'AI-Powered Lessons', desc:'Animated, interactive lessons for every chapter. Students learn AI, ML, Robotics, Python — not just read textbooks.' },
    { icon:'📊', title:'Real-Time Progress', desc:'Admins and teachers see every student\'s progress live — chapters done, quiz scores, XP earned, last active.' },
    { icon:'🔒', title:'School-Wise Access', desc:'Every school gets its own private dashboard. Student data is isolated, secure, and fully controlled by the school admin.' },
    { icon:'🤖', title:'AI Doubt Bot', desc:'24/7 AI tutor powered by Nvidia Nemotron. Students ask any AI/ML doubt in Hindi or English — instant smart answers.' },
    { icon:'🎓', title:'Digital Certificates', desc:'Students earn downloadable certificates after completing each class. Real achievement recognition they can show everywhere.' },
    { icon:'🌐', title:'Hindi + English', desc:'Full bilingual support. Switch between Hindi and English anytime. Perfect for every kind of Indian student.' },
    { icon:'📱', title:'Works on Any Device', desc:'Mobile-first PWA — install on phone like a native app. Works on Android, iPhone, laptop, tablet.' },
    { icon:'🏆', title:'Gamified Learning', desc:'XP points, certificates, chapter leaderboards. Students compete, improve scores, and stay motivated all year.' },
  ];

  const classes = [
    { cls:'Class 3-5', badge:'🌱 Foundation', topics:'What is a Computer, Introduction to Robots, AI in Daily Life, Fun with Data', color:'#43E97B' },
    { cls:'Class 6-7', badge:'🚀 Explorer', topics:'How AI Thinks, Smart Machines, Voice Assistants, AI Games & Apps', color:'#38BFFF' },
    { cls:'Class 8', badge:'⚡ Builder', topics:'Types of AI, Machine Learning Basics, Robotics, Data & Sensors', color:'#6C63FF' },
    { cls:'Class 9', badge:'🔥 Advanced', topics:'Decision Trees, NLP, Computer Vision, Reinforcement Learning, AI in India', color:'#FF6584' },
    { cls:'Class 10', badge:'💎 Expert', topics:'Neural Networks, Backpropagation, Generative AI, Prompt Engineering', color:'#FFD166' },
    { cls:'Class 11', badge:'🧪 Pro', topics:'LLMs & ChatGPT, Python for AI, NumPy/Pandas, TensorFlow, RAG Systems', color:'#FF9F43' },
    { cls:'Class 12', badge:'🏆 Master', topics:'Agentic AI, Fine-Tuning, Advanced Python OOP, School Chatbot Project, AI Ethics', color:'#43E97B' },
  ];

  const pricing = [
    { plan:'Starter', badge:'🌱', students:'Up to 250 students', features:['All chapters & quizzes','Student dashboard','Basic progress tracking','AI Doubt Bot','Chapter-wise progress'], color:'#38BFFF', popular:false },
    { plan:'Standard', badge:'⚡', students:'Up to 600 students', features:['Everything in Starter','Teacher dashboard','Bulk enrollment','Real-time analytics','Digital certificates','School logo branding'], color:'#6C63FF', popular:true },
    { plan:'Unlimited', badge:'🚀', students:'Unlimited students', features:['Everything in Standard','Priority support','Monthly progress reports','Early access to new features','Dedicated account manager'], color:'#FF6584', popular:false },
  ];

  const stats = [
    { n:'32+', l:'Chapters' }, { n:'320+', l:'Quiz Questions' }, { n:'Class 3-12', l:'All Classes' }, { n:'Hindi+Eng', l:'Bilingual' },
  ];

  return (
    <div style={{background:'#0D0D2B',color:'#F0F0FF',fontFamily:"'Nunito',sans-serif",minHeight:'100vh',overflowX:'hidden'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .grad{background:linear-gradient(90deg,#6C63FF,#FF6584);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .fredoka{font-family:'Fredoka One','Nunito',sans-serif;}
        .card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;}
        .btn-p{background:linear-gradient(135deg,#6C63FF,#FF6584);color:#fff;border:none;border-radius:50px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:opacity .2s;}
        .btn-p:hover{opacity:.85;}
        .btn-s{background:rgba(108,99,255,.15);color:#6C63FF;border:2px solid rgba(108,99,255,.4);border-radius:50px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;}
        .inp{width:100%;padding:12px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);color:#F0F0FF;font-size:14px;font-weight:600;outline:none;font-family:'Nunito',sans-serif;}
        .inp:focus{border-color:#6C63FF;}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(108,99,255,.4)}50%{box-shadow:0 0 0 15px rgba(108,99,255,0)}}
        section{padding:80px 20px;}
        .container{max-width:1100px;margin:0 auto;}
      `}</style>

      {/* NAVBAR */}
      <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(13,13,43,.95)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,.08)',padding:'14px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div className="fredoka" style={{fontSize:22,background:'linear-gradient(90deg,#6C63FF,#FF6584)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>🧠 STU-BRAIN</div>
        <div style={{display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
          <a href="#features" style={{color:'rgba(255,255,255,.7)',fontSize:13,fontWeight:700,textDecoration:'none'}}>Features</a>
          <a href="#curriculum" style={{color:'rgba(255,255,255,.7)',fontSize:13,fontWeight:700,textDecoration:'none'}}>Curriculum</a>
          <a href="#plans" style={{color:'rgba(255,255,255,.7)',fontSize:13,fontWeight:700,textDecoration:'none'}}>Pricing</a>
          <a href="#enquiry" style={{color:'rgba(255,255,255,.7)',fontSize:13,fontWeight:700,textDecoration:'none'}}>Contact</a>
          <a href="/app" className="btn-p" style={{padding:'8px 20px',fontSize:13,textDecoration:'none',display:'inline-block'}}>Login →</a>
        </div>
      </nav>

      {/* HERO */}
      <HeroSlider/>

      {/* FEATURES */}
      <section id="features" style={{padding:'80px 20px',background:'rgba(255,255,255,.02)'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:48}}>
            <h2 className="fredoka" style={{fontSize:'clamp(28px,4vw,44px)',marginBottom:12}}>Everything a School Needs</h2>
            <p style={{color:'rgba(255,255,255,.5)',fontSize:16,fontWeight:600}}>One platform. Every feature. No extra software needed.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:20}}>
            {features.map((f,i)=>(
              <div key={i} className="card" style={{padding:24,transition:'transform .2s',cursor:'default'}}
                onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)'}
                onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='translateY(0)'}>
                <div style={{fontSize:36,marginBottom:12}}>{f.icon}</div>
                <div style={{fontWeight:900,fontSize:15,marginBottom:8}}>{f.title}</div>
                <div style={{fontSize:13,color:'rgba(255,255,255,.5)',lineHeight:1.6,fontWeight:600}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" style={{padding:'80px 20px'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:48}}>
            <h2 className="fredoka" style={{fontSize:'clamp(28px,4vw,44px)',marginBottom:12}}>Class 3 to 12 — Complete Curriculum</h2>
            <p style={{color:'rgba(255,255,255,.5)',fontSize:16,fontWeight:600}}>Age-appropriate AI education. Each class builds on the previous.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16}}>
            {classes.map((c,i)=>(
              <div key={i} className="card" style={{padding:20,borderColor:`${c.color}30`}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                  <div style={{fontWeight:900,fontSize:16}}>{c.cls}</div>
                  <span style={{background:`${c.color}20`,color:c.color,borderRadius:50,padding:'3px 10px',fontSize:11,fontWeight:800}}>{c.badge}</span>
                </div>
                <div style={{fontSize:13,color:'rgba(255,255,255,.55)',lineHeight:1.7,fontWeight:600}}>{c.topics}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:'80px 20px',background:'rgba(255,255,255,.02)'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:48}}>
            <h2 className="fredoka" style={{fontSize:'clamp(28px,4vw,44px)',marginBottom:12}}>How It Works</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:20,textAlign:'center'}}>
            {[
              ['1️⃣','School Signs Up','Principal contacts us → we set up the school account in 10 minutes'],
              ['2️⃣','Admin Adds Students','School admin uploads student list via CSV — bulk enrollment in seconds'],
              ['3️⃣','Students Learn','Students login with their ID → access animated AI lessons anytime'],
              ['4️⃣','Teachers Track','Teachers see every student\'s progress, quiz scores, and XP in real time'],
            ].map(([ic,title,desc],i)=>(
              <div key={i} style={{padding:24}}>
                <div style={{fontSize:40,marginBottom:12}}>{ic}</div>
                <div style={{fontWeight:900,fontSize:15,marginBottom:8,color:'#fff'}}>{title}</div>
                <div style={{fontSize:13,color:'rgba(255,255,255,.5)',lineHeight:1.6,fontWeight:600}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="plans" style={{padding:'80px 20px'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:48}}>
            <h2 className="fredoka" style={{fontSize:'clamp(28px,4vw,44px)',marginBottom:12}}>Simple, Transparent Pricing</h2>
            <p style={{color:'rgba(255,255,255,.5)',fontSize:16,fontWeight:600}}>Pay once per year. No per-student charges. No hidden fees.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20,maxWidth:960,margin:'0 auto'}}>
            {pricing.map((p,i)=>(
              <div key={i} className="card" style={{padding:28,position:'relative',border:p.popular?`2px solid ${p.color}`:'1px solid rgba(255,255,255,.08)',transform:p.popular?'scale(1.03)':'none'}}>
                {p.popular&&<div style={{position:'absolute',top:-14,left:'50%',transform:'translateX(-50%)',background:`linear-gradient(135deg,#6C63FF,#FF6584)`,color:'#fff',borderRadius:50,padding:'4px 18px',fontSize:11,fontWeight:800,whiteSpace:'nowrap'}}>⭐ MOST POPULAR</div>}
                <div style={{fontWeight:900,fontSize:18,marginBottom:4,color:p.color}}>{p.plan}</div>
                <div className="fredoka" style={{fontSize:22,color:'#FFD166',marginBottom:4}}>Contact for Pricing</div>
                <div style={{fontSize:12,color:p.color,fontWeight:800,marginBottom:20,background:`${p.color}15`,borderRadius:8,padding:'4px 10px',display:'inline-block'}}>{p.students}</div>
                <div style={{borderTop:'1px solid rgba(255,255,255,.08)',paddingTop:16,marginBottom:20}}>
                  {p.features.map((f,j)=>(
                    <div key={j} style={{fontSize:13,color:'rgba(255,255,255,.65)',fontWeight:600,marginBottom:8,display:'flex',gap:8}}>
                      <span style={{color:'#43E97B'}}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <a href="#enquiry" className="btn-p" style={{display:'block',textAlign:'center',padding:'12px',fontSize:14,textDecoration:'none',background:p.popular?'linear-gradient(135deg,#6C63FF,#FF6584)':`${p.color}`,borderRadius:50}}>
                  Get Started →
                </a>
              </div>
            ))}
          </div>
          <p style={{textAlign:'center',color:'rgba(255,255,255,.35)',fontSize:13,fontWeight:600,marginTop:24}}>
            All plans include 30-day free trial · Setup assistance · WhatsApp support
          </p>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section id="enquiry" style={{padding:'80px 20px',background:'rgba(108,99,255,.06)'}}>
        <div className="container" style={{maxWidth:640}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <h2 className="fredoka" style={{fontSize:'clamp(28px,4vw,44px)',marginBottom:12}}>Get a Free Demo</h2>
            <p style={{color:'rgba(255,255,255,.5)',fontSize:16,fontWeight:600}}>Fill this form — we'll call you within 24 hours to schedule a live demo for your school.</p>
          </div>
          {sent ? (
            <div style={{textAlign:'center',padding:40,background:'rgba(67,233,123,.1)',border:'2px solid rgba(67,233,123,.3)',borderRadius:20}}>
              <div style={{fontSize:60,marginBottom:16}}>🎉</div>
              <div className="fredoka" style={{fontSize:28,color:'#43E97B',marginBottom:8}}>Enquiry Submitted!</div>
              <p style={{color:'rgba(255,255,255,.65)',fontSize:15,fontWeight:600}}>We have received your request. Our team will contact you within 24 hours to schedule your free demo.</p>
            </div>
          ) : (
            <div className="card" style={{padding:32}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                <div>
                  <label style={{fontSize:11,fontWeight:800,color:'rgba(255,255,255,.4)',letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:6}}>Your Name *</label>
                  <input className="inp" placeholder="Principal / Director name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                </div>
                <div>
                  <label style={{fontSize:11,fontWeight:800,color:'rgba(255,255,255,.4)',letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:6}}>Mobile Number *</label>
                  <input className="inp" placeholder="+91 98765 43210" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
                </div>
                <div>
                  <label style={{fontSize:11,fontWeight:800,color:'rgba(255,255,255,.4)',letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:6}}>Email</label>
                  <input className="inp" placeholder="principal@school.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                </div>
                <div>
                  <label style={{fontSize:11,fontWeight:800,color:'rgba(255,255,255,.4)',letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:6}}>School Name</label>
                  <input className="inp" placeholder="Your school name" value={form.school} onChange={e=>setForm({...form,school:e.target.value})}/>
                </div>
                <div>
                  <label style={{fontSize:11,fontWeight:800,color:'rgba(255,255,255,.4)',letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:6}}>City</label>
                  <input className="inp" placeholder="Jaipur" value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/>
                </div>
                <div>
                  <label style={{fontSize:11,fontWeight:800,color:'rgba(255,255,255,.4)',letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:6}}>No. of Students</label>
                  <input className="inp" type="number" placeholder="200" value={form.students} onChange={e=>setForm({...form,students:e.target.value})}/>
                </div>
              </div>
              <div style={{marginBottom:16}}>
                <label style={{fontSize:11,fontWeight:800,color:'rgba(255,255,255,.4)',letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:6}}>Message (Optional)</label>
                <textarea className="inp" placeholder="Any specific questions or requirements..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{resize:'vertical',minHeight:80}}/>
              </div>
              {err&&<div style={{color:'#FF6584',fontSize:13,fontWeight:700,marginBottom:12,padding:'8px 12px',background:'rgba(255,101,132,.1)',borderRadius:8}}>{err}</div>}
              <button onClick={submit} disabled={sending} className="btn-p" style={{width:'100%',padding:'14px',fontSize:16,opacity:sending?.7:1}}>
                {sending ? '⏳ Submitting...' : '📞 Request Free Demo →'}
              </button>
              <p style={{textAlign:'center',fontSize:12,color:'rgba(255,255,255,.35)',marginTop:12,fontWeight:600}}>
                We typically respond within 2-4 hours · No spam · No obligations
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:'32px 20px',borderTop:'1px solid rgba(255,255,255,.08)',textAlign:'center'}}>
        <div className="fredoka grad" style={{fontSize:22,marginBottom:8}}>🧠 STU-BRAIN</div>
        <p style={{color:'rgba(255,255,255,.35)',fontSize:13,fontWeight:600,marginBottom:16}}>AI Education Platform for Class 3-12 · Made in Jaipur, India 🇮🇳</p>
        <div style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap',marginBottom:16}}>
          <a href="/app" style={{color:'#6C63FF',fontWeight:700,fontSize:13,textDecoration:'none'}}>Login to App →</a>
          <a href="#enquiry" style={{color:'#6C63FF',fontWeight:700,fontSize:13,textDecoration:'none'}}>Get Demo →</a>
          <a href="#features" style={{color:'#6C63FF',fontWeight:700,fontSize:13,textDecoration:'none'}}>Features →</a>
        </div>
        <p style={{color:'rgba(255,255,255,.2)',fontSize:11,fontWeight:600}}>© 2025 STU-BRAIN · AI Education Platform · Jaipur, Rajasthan</p>
      </footer>
    </div>
  );
}
