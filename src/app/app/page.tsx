'use client';
import { useState, useEffect, useRef } from 'react';
import { CURRICULUM, type Chapter, type Slide } from '@/lib/curriculum';
import { t, type Lang } from '@/lib/i18n';
import AIBackground3D from '@/components/AIBackground3D';

interface User { id:number; name:string; role:'student'|'teacher'|'admin'|'superadmin'; class_level?:number; school_name?:string; student_id?:string; total_xp?:number; streak_days?:number; plan?:string; }
interface Prog { completed:boolean; xp_earned:number; quiz_score:number; }
type ProgMap = Record<string,Prog>;

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{outcome:'accepted'|'dismissed'}>;
}

// ─── DESIGN TOKENS ───
const C = {
  bg:'#0D0D2B', card:'#16183A', card2:'#1E2050',
  p:'#6C63FF', s:'#FF6584', a:'#43E97B', y:'#FFD166', o:'#FF9F43', sky:'#38BFFF',
  text:'#F0F0FF', mu:'#9090BB', br:'rgba(108,99,255,.25)'
};

// ─── STYLE HELPERS ───
const S = {
  card: { background:C.card, border:`1px solid ${C.br}`, borderRadius:18 } as React.CSSProperties,
  cardHover: { background:C.card, border:`1px solid ${C.p}`, borderRadius:18 } as React.CSSProperties,
  btnP: { background:`linear-gradient(135deg,${C.p},${C.s})`, color:'#fff', border:'none', borderRadius:50, fontWeight:800, cursor:'pointer', fontFamily:"'Nunito',sans-serif" } as React.CSSProperties,
  btnS: { background:'rgba(255,255,255,.07)', border:`1px solid ${C.br}`, color:C.mu, borderRadius:50, fontWeight:800, cursor:'pointer', fontFamily:"'Nunito',sans-serif" } as React.CSSProperties,
  btnG: { background:`linear-gradient(135deg,${C.a},${C.sky})`, color:'#0D0D2B', border:'none', borderRadius:50, fontWeight:800, cursor:'pointer', fontFamily:"'Nunito',sans-serif" } as React.CSSProperties,
  inp: { width:'100%', padding:'11px 14px', borderRadius:12, border:`1px solid ${C.br}`, background:'rgba(255,255,255,.05)', color:C.text, fontSize:14, fontWeight:600, outline:'none', boxSizing:'border-box' as const, fontFamily:"'Nunito',sans-serif" },
  grad: { background:`linear-gradient(90deg,${C.p},${C.s})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' } as React.CSSProperties,
  fredoka: { fontFamily:"'Fredoka One','Nunito',sans-serif" } as React.CSSProperties,
};

// ─── CSS STRING PARSER (for curriculum badgeStyle) ───
function parseCSSStr(css:string):React.CSSProperties{
  const obj:Record<string,string>={};
  css.split(';').forEach(rule=>{
    const [k,...v]=rule.split(':');
    if(k&&v.length){
      const key=k.trim().replace(/-([a-z])/g,(_,c)=>c.toUpperCase());
      obj[key]=v.join(':').trim();
    }
  });
  return obj as React.CSSProperties;
}

export default function App() {
  const [lang,setLang] = useState<Lang>('en');
  const [screen,setScreen] = useState<'login'|'student'|'teacher'|'admin'|'superadmin'|'learn'>('login');
  const [user,setUser] = useState<User|null>(null);
  const [navStack,setNavStack] = useState<string[]>([]);
  const [token,setToken] = useState('');
  const [loginRole,setLoginRole] = useState<'student'|'teacher'|'admin'|'owner'>('student');
  const [loginId,setLoginId] = useState('');
  const [loginPass,setLoginPass] = useState('');
  const [loginErr,setLoginErr] = useState('');
  const [prog,setProg] = useState<ProgMap>({});
  const [totalXP,setTotalXP] = useState(0);
  const [curClass,setCurClass] = useState(8); // Will be set to user's class on login
  const [curChap,setCurChap] = useState<Chapter|null>(null);
  const [curSlide,setCurSlide] = useState(0);
  const [qDone,setQDone] = useState<Record<string,{answered:boolean;correct:boolean}>>({});
  const [quizShuffle,setQuizShuffle] = useState<Record<string,number[]>>({});
  const [xpPop,setXpPop] = useState<number|null>(null);
  const [doubtOpen,setDoubtOpen] = useState(false);
  const [doubtMsgs,setDoubtMsgs] = useState<{role:'bot'|'user';text:string}[]>([{role:'bot',text:"👋 Hi! I'm your AI Doubt Bot. Ask me anything about your chapters! 🧠"}]);
  const [doubtQ,setDoubtQ] = useState('');
  const [installPrompt,setInstallPrompt] = useState<Event|null>(null);
  const [appInstalled,setAppInstalled] = useState(false);
  const [tTab,setTTab] = useState('overview');
  const [saTab,setSaTab] = useState('schools');
  const [allSchools,setAllSchools] = useState<Record<string,unknown>[]>([]);
  const [saStats,setSaStats] = useState<Record<string,unknown>|null>(null);
  const [teachers,setTeachers] = useState<Record<string,unknown>[]>([]);
  const [newTeacher,setNewTeacher] = useState({name:'',email:'',phone:''});
  const [newSchool,setNewSchool] = useState({name:'',admin_email:'',city:'',state:'',phone:'',plan:'trial',max_students:50});
  const [schoolResult,setSchoolResult] = useState<{email:string;password:string;name:string}|null>(null);
  const [editSchool,setEditSchool] = useState<Record<string,unknown>|null>(null);
  const [editTeacher,setEditTeacher] = useState<Record<string,unknown>|null>(null);
  const [editStudent,setEditStudent] = useState<Record<string,unknown>|null>(null);
  const [teacherResult,setTeacherResult] = useState<string|null>(null);
  const [students,setStudents] = useState<Record<string,unknown>[]>([]);
  const [classStats,setClassStats] = useState<Record<string,unknown>[]>([]);
  const [assignments,setAssignments] = useState<Record<string,unknown>[]>([]);
  const [adminStats,setAdminStats] = useState<Record<string,unknown>|null>(null);
  const [enrollCSV,setEnrollCSV] = useState('');
  const [enrollResult,setEnrollResult] = useState<{enrolled:number;errors:string[];students?:Record<string,unknown>[]}|null>(null);
  const [csvPreview,setCsvPreview] = useState<Record<string,string>[]>([]);
  const [csvHeaders,setCsvHeaders] = useState<string[]>([]);
  const [studentSearch,setStudentSearch] = useState('');
  const [studentClassFilter,setStudentClassFilter] = useState<number|null>(null);
  const [allStudents,setAllStudents] = useState<Record<string,unknown>[]>([]);
  const [dashStats,setDashStats] = useState<Record<string,unknown>|null>(null);
  const [classBrk,setClassBrk] = useState<Record<string,unknown>[]>([]);
  const [topStudents,setTopStudents] = useState<Record<string,unknown>[]>([]);
  const [struggling,setStruggling] = useState<Record<string,unknown>[]>([]);
  const [sectionFilter,setSectionFilter] = useState('');
  const [availClasses,setAvailClasses] = useState<{class_level:number;section:string}[]>([]);
  const [teacherResult2,setTeacherResult2] = useState<{email:string;password:string;teacher_id:string;name:string}|null>(null);
  const [showLoginPass,setShowLoginPass] = useState(false);
  const [schoolLogo,setSchoolLogo] = useState<string|null>(null);
  const [logoUploading,setLogoUploading] = useState(false);
  const [certificates,setCertificates] = useState<{cert_id:string;class_level:number;issued_at:string}[]>([]);
  const [leaderboard,setLeaderboard] = useState<Record<string,unknown>[]>([]);
  const [lbClass,setLbClass] = useState<number|null>(null);
  const [showLB,setShowLB] = useState(false);
  const [challenges,setChallenges] = useState<Record<string,unknown>[]>([]);
  const [showChallenges,setShowChallenges] = useState(false);
  const [challengeAnswer,setChallengeAnswer] = useState('');
  const [activeChallengeId,setActiveChallengeId] = useState<number|null>(null);
  const [newChallenge,setNewChallenge] = useState({title:'',description:'',class_level:'',xp_reward:50,due_date:''});
  const [editChallenge,setEditChallenge] = useState<Record<string,unknown>|null>(null);
  const [claimingCert,setClaimingCert] = useState(false);
  const [chapUnlockDates,setChapUnlockDates] = useState<Record<string,string>>({});
  const [certResult,setCertResult] = useState<{cert_id:string;student_name:string;school_name:string;class_level:number;issued_at:string}|null>(null);
  const [showPwd,setShowPwd] = useState<Record<string,boolean>>({});
  const [enquiries,setEnquiries] = useState<{id:number;name:string;phone:string;email:string;school:string;city:string;message:string;students:number;status:string;created_at:string}[]>([]);
  const [hwForm,setHwForm] = useState({class_level:9,title:'',due_date:'',instructions:''});
  const scrollRef = useRef<HTMLDivElement>(null);
  const T = t[lang];

  useEffect(()=>{
    fetch('/api/init').catch(()=>{});
    // Remember me — restore session
    const tok=localStorage.getItem('stb_tok'), usr=localStorage.getItem('stb_user');
    if(tok&&usr){
      const u=JSON.parse(usr); setToken(tok); setUser(u);
      // Set class to user's class
      if(u?.class_level) setCurClass(u.class_level);
      // Restore cached logo instantly (before API fetch)
      const cachedLogo=localStorage.getItem('sb_logo');
      if(cachedLogo) setSchoolLogo(cachedLogo);
      loadProg(tok);
      const role=u.role;
      if(role==='superadmin') setScreen('superadmin');
      else if(role==='student'){setScreen('student');setCurClass(u.class_level||8);setTimeout(()=>{loadCertificates();loadChallenges();loadLeaderboard();},800);}
      else if(role==='teacher'){setScreen('teacher');loadTeacher(tok);}
      else{setScreen('admin');loadAdmin(tok);}
    }
    // Register Service Worker (needed for PWA install)
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register('/sw.js').catch(()=>{});
    }
    // PWA install prompt
    const handler=(e:Event)=>{e.preventDefault();setInstallPrompt(e);};
    window.addEventListener('beforeinstallprompt',handler);
    window.addEventListener('appinstalled',()=>{setAppInstalled(true);setInstallPrompt(null);});
    if(window.matchMedia('(display-mode: standalone)').matches) setAppInstalled(true);
    // Back button — intercept hardware/browser back
    window.history.pushState(null,'',window.location.href);
    const handlePop=()=>{
      window.history.pushState(null,'',window.location.href);
      setNavStack(stack=>{
        if(stack.length>0){
          const prev=stack[stack.length-1];
          const newStack=stack.slice(0,-1);
          // Navigate back
          setCurChap(null);
          if(prev==='learn-chap') setCurChap(null);
          else if(prev==='learn') {setCurChap(null);}
          else if(prev==='student'||prev==='teacher'||prev==='admin'||prev==='superadmin'){
            setScreen(prev as 'student'|'teacher'|'admin'|'superadmin'|'login'|'learn');
          }
          return newStack;
        }
        return stack;
      });
    };
    window.addEventListener('popstate',handlePop);
    return()=>{
      window.removeEventListener('beforeinstallprompt',handler);
      window.removeEventListener('popstate',handlePop);
    };
  },[]);

  async function loadProg(tok:string){
    try{
      const r=await fetch('/api/progress',{headers:{authorization:`Bearer ${tok}`}});
      const d=await r.json(); const m:ProgMap={};
      (d.progress||[]).forEach((p:{chapter_id:string;completed:boolean;xp_earned:number;quiz_score:number})=>{m[p.chapter_id]={completed:p.completed,xp_earned:p.xp_earned,quiz_score:p.quiz_score};});
      setProg(m); setTotalXP(d.total_xp||0);
    }catch{}
  }
  async function saveProg(chapId:string,cls:number,completed:boolean,xp:number,score?:number){
    if(!token) return;
    const ownClass=user?.class_level||cls;
    try{await fetch('/api/progress',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({chapter_id:chapId,class_level:ownClass,completed,xp_earned:xp,quiz_score:score||0})});await loadProg(token);}catch{}
  }
  function installApp(){
    if(!installPrompt) return;
    (installPrompt as BeforeInstallPromptEvent).prompt();
    (installPrompt as BeforeInstallPromptEvent).userChoice.then(()=>{setInstallPrompt(null);});
  }
  async function loadTeacher(tok:string){
    // Load school logo - cache first
    const cachedLogoT=localStorage.getItem('sb_logo');
    if(cachedLogoT) setSchoolLogo(cachedLogoT);
    try{
      const lu=JSON.parse(localStorage.getItem('sb_user')||'{}');
      if(lu?.school_id){
        const lr=await fetch('/api/admin/logo?school_id='+lu.school_id,{headers:{authorization:`Bearer ${tok}`}});
        const ld=await lr.json();
        if(ld.logo_url){setSchoolLogo(ld.logo_url);localStorage.setItem('sb_logo',ld.logo_url);}
      }
    }catch{}
    try{const r=await fetch('/api/teacher/students',{headers:{authorization:`Bearer ${tok}`}});const d=await r.json();setStudents(d.students||[]);if(d.classStats) setClassStats(d.classStats);}catch{}
    try{const r=await fetch('/api/assignments',{headers:{authorization:`Bearer ${tok}`}});const d=await r.json();setAssignments(d.assignments||[]);}catch{}
    try{const r=await fetch('/api/admin/teachers',{headers:{authorization:`Bearer ${tok}`}});const d=await r.json();setTeachers(d.teachers||[]);}catch{}
  }
  async function loadEnquiries(tok:string){
    try{const r=await fetch('/api/enquiry',{headers:{authorization:`Bearer ${tok}`}});const d=await r.json();setEnquiries(d.enquiries||[]);}catch{}
  }
  async function loadSuperAdmin(tok:string){
    loadEnquiries(tok);
    try{const r=await fetch('/api/superadmin/schools',{headers:{authorization:`Bearer ${tok}`}});const d=await r.json();setAllSchools(d.schools||[]);setSaStats(d.stats||null);}catch{}
  }
  async function addTeacher(){
    if(!newTeacher.name||!newTeacher.email){alert('Name and email required');return;}
    try{
      const r=await fetch('/api/admin/teachers',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify(newTeacher)});
      const d=await r.json();
      if(d.success){setTeacherResult2({email:d.login_email,password:d.temp_password,teacher_id:d.teacher_id,name:newTeacher.name});setNewTeacher({name:'',email:'',phone:''});loadTeacher(token);loadAdmin(token);}
      else{setTeacherResult('❌ '+d.error);}
    }catch{setTeacherResult('❌ Error adding teacher');}
  }
  async function unlockSchool(school_id:number, action:string, plan?:string, amount?:number){
    try{
      const r=await fetch('/api/superadmin/unlock',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({school_id,action,plan:plan||'annual',payment_amount:amount})});
      const d=await r.json();
      if(d.success){alert('✅ '+d.message);loadSuperAdmin(token);}
      else alert('❌ '+d.error);
    }catch{alert('Error');}
  }
  async function updateSchool(id:number, data:Record<string,unknown>){
    try{
      const r=await fetch('/api/superadmin/schools',{method:'PATCH',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({id,...data})});
      const d=await r.json();
      if(d.success){setEditSchool(null);loadSuperAdmin(token);alert('✅ School updated!');}
      else alert('❌ '+d.error);
    }catch{alert('Error updating school');}
  }
  async function updateTeacher(id:number, data:Record<string,unknown>){
    try{
      const r=await fetch('/api/admin/teachers',{method:'PATCH',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({id,...data})});
      const d=await r.json();
      if(d.success){setEditTeacher(null);loadTeacher(token);alert('✅ Teacher updated!');}
      else alert('❌ '+d.error);
    }catch{alert('Error');}
  }
  async function updateStudent(id:number, data:Record<string,unknown>){
    try{
      const r=await fetch('/api/admin/students',{method:'PATCH',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({id,...data})});
      const d=await r.json();
      if(d.success){setEditStudent(null);token&&loadAdmin(token);alert('✅ Student updated!');}
      else alert('❌ '+d.error);
    }catch{alert('Error');}
  }
  async function resetPassword(userId:number, userType:string){
    const newPass=prompt(`New password for ${userType}:`);
    if(!newPass||newPass.length<6){alert('Password must be at least 6 characters');return;}
    try{
      const r=await fetch('/api/admin/reset-password',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({user_id:userId,new_password:newPass})});
      const d=await r.json();
      if(d.success)alert('✅ Password changed to: '+newPass);
      else alert('❌ '+d.error);
    }catch{alert('Error');}
  }
  async function addSchool(){
    if(!newSchool.name||!newSchool.admin_email){alert('School name and admin email required');return;}
    try{
      const r=await fetch('/api/superadmin/schools',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify(newSchool)});
      const d=await r.json();
      if(d.success){setSchoolResult({email:d.admin_email,password:d.temp_password,name:d.school?.name||newSchool.name});setNewSchool({name:'',admin_email:'',city:'',state:'',phone:'',plan:'trial',max_students:50});loadSuperAdmin(token);setSaTab('schools');}
      else alert('❌ '+d.error);
    }catch{alert('Error');}
  }
  async function loadAdmin(tok:string){
    try{
      const r=await fetch('/api/admin/dashboard',{headers:{authorization:`Bearer ${tok}`}});
      const d=await r.json();
      if(d.stats){setDashStats(d.stats);setAdminStats(d.stats);}
      if(d.class_breakdown) setClassBrk(d.class_breakdown);
      if(d.top_students) setTopStudents(d.top_students);
      if(d.struggling) setStruggling(d.struggling);
    }catch(e){console.error('loadAdmin',e);}
    // also load teachers
    try{const r=await fetch('/api/admin/teachers',{headers:{authorization:`Bearer ${tok}`}});const d=await r.json();setTeachers(d.teachers||[]);}catch{}
  }
  async function doLogin(oid?:string,opw?:string){
    setLoginErr(''); const id=oid||loginId, pw=opw||loginPass;
    if(!id||!pw){setLoginErr('Enter ID and password');return;}
    try{
      const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json','x-login-type':loginRole==='owner'?'owner':'user'},body:JSON.stringify({identifier:id,password:pw})});
      const d=await r.json();
      if(!r.ok){setLoginErr(d.error||'Login failed');return;}
      setUser(d.user);setToken(d.token);
      localStorage.setItem('sb_user',JSON.stringify(d.user));
      localStorage.setItem('sb_token',d.token);
      // Cache logo immediately from login response
      if(d.user?.logo_url){setSchoolLogo(d.user.logo_url);localStorage.setItem('sb_logo',d.user.logo_url);}
      else{localStorage.removeItem('sb_logo');}
      localStorage.setItem('stb_tok',d.token);localStorage.setItem('stb_user',JSON.stringify(d.user));
      await loadProg(d.token);
      const role=d.user.role;
      if(role==='superadmin'){loadSuperAdmin(d.token);setScreen('superadmin');}
      else if(role==='student'){setScreen('student');setCurClass(d.user.class_level||8);setTimeout(()=>{loadCertificates();loadChallenges();loadLeaderboard();},800);}
      else if(role==='teacher'){loadTeacher(d.token);setScreen('teacher');setTimeout(()=>loadChallenges(),500);}
      else{loadAdmin(d.token);setScreen('admin');}
    }catch{setLoginErr('Connection error — try demo login below');}
  }
  function quickLogin(role:'student'|'teacher'|'admin'){
    // Quick demo login for testing
    const demos:{[k:string]:{id:string;pw:string}}={
      student:{id:'student@demo.com',pw:'demo123'},
      teacher:{id:'teacher@demo.com',pw:'demo123'},
      admin:{id:'admin@demo.com',pw:'demo123'}
    };
    if(demos[role]){setLoginId(demos[role].id);setLoginPass(demos[role].pw);}
  }
  function logout(){setUser(null);setToken('');localStorage.clear();setScreen('login');setCurChap(null);}

  function classProg(cls:number){
    const d=CURRICULUM[cls]; if(!d) return{done:0,total:0,pct:0};
    const chs=d.subjects.flatMap(s=>s.chapters); const total=chs.length;
    const done=chs.filter(c=>c&&prog[c.id]?.completed).length;
    return{done,total,pct:total?Math.round(done/total*100):0};
  }
  function allChaps(){return(CURRICULUM[curClass]?.subjects||[]).flatMap(s=>s.chapters).filter(Boolean) as import('@/lib/curriculum').Chapter[];}
  function openClass(cls:number){
    setCurClass(cls);setCurChap(null);setCurSlide(0);
    setScreen('learn');
  }
  function shuffleArr(arr:number[]):number[]{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function openChap(ch:Chapter,chapIdx?:number){
    const allC=allChaps(); const idx=chapIdx??allC.findIndex(c=>c.id===ch.id);
    if(user?.plan==='trial'&&idx>=2){
      alert('🔒 Chapter Locked! Trial: first 2 chapters only. Ask school admin to activate!');
      return;
    }
    // Time-lock: 1 new chapter per day
    const startKey=`sb_start_${user?.id}_${curClass}`;
    let startDate=localStorage.getItem(startKey);
    if(!startDate){startDate=new Date().toISOString();localStorage.setItem(startKey,startDate);}
    const daysSince=Math.floor((Date.now()-new Date(startDate).getTime())/(86400000));
    if(idx>daysSince&&!prog[ch.id]?.completed){
      const unlock=new Date(new Date(startDate).getTime()+idx*86400000);
      alert('🔒 Unlocks on '+unlock.toLocaleDateString('en-IN',{day:'numeric',month:'short'})+'!\nStudy 1 chapter/day to unlock the next. This keeps learning strong all year! 📚');
      return;
    }
    // Shuffle quiz options
    const ns:Record<string,number[]>={};
    ch.slides.forEach((sl,si)=>{
      if(sl.type==='quiz'&&sl.questions){
        sl.questions.forEach((_:unknown,qi:number)=>{
          const k=`${ch.id}_${si}_${qi}`;
          ns[k]=shuffleArr([...Array(sl.questions![qi].opts?.length||4).keys()]);
        });
      }
    });
    setQuizShuffle(prev=>({...prev,...ns}));
    setCurChap(ch);setCurSlide(0);setQDone({});scrollRef.current?.scrollTo(0,0);}
  function goBack(){if(curChap){setCurChap(null);}else setScreen(user?.role==='student'?'student':user?.role==='teacher'?'teacher':'admin');}
  function nextSlide(){if(curChap&&curSlide<curChap.slides.length-1){setCurSlide(s=>s+1);scrollRef.current?.scrollTo(0,0);}}
  function prevSlide(){if(curSlide>0){setCurSlide(s=>s-1);scrollRef.current?.scrollTo(0,0);}}
  async function completeChap(){
    if(!curChap||prog[curChap.id]?.completed) return;
    // Check: if last slide is a quiz, student must have answered ALL questions
    const lastSlide=curChap.slides[curChap.slides.length-1];
    if(lastSlide?.type==='quiz'&&lastSlide.questions?.length){
      const slideIdx=curChap.slides.length-1;
      const totalQs=lastSlide.questions.length;
      const answeredQs=lastSlide.questions.filter((_:unknown,qi:number)=>qDone[`${curChap.id}_${slideIdx}_${qi}`]?.answered).length;
      if(answeredQs<totalQs){
        alert(`📝 Please answer all ${totalQs} quiz questions first!\n\nAnswered: ${answeredQs}/${totalQs}\n\nGo back and complete the quiz to earn your XP! 💪`);
        return;
      }
      // Calculate quiz score
      const correctQs=lastSlide.questions.filter((_:unknown,qi:number)=>qDone[`${curChap.id}_${slideIdx}_${qi}`]?.correct).length;
      const score=Math.round((correctQs/totalQs)*100);
      const xp=curChap.xp; setTotalXP(x=>x+xp); setXpPop(xp);
      setTimeout(()=>setXpPop(null),2500);
      setProg(p=>({...p,[curChap.id]:{completed:true,xp_earned:xp,quiz_score:score}}));
      await saveProg(curChap.id,curClass,true,xp,score);
      return;
    }
    const xp=curChap.xp; setTotalXP(x=>x+xp); setXpPop(xp);
    setTimeout(()=>setXpPop(null),2500);
    setProg(p=>({...p,[curChap.id]:{completed:true,xp_earned:xp,quiz_score:p[curChap.id]?.quiz_score||0}}));
    await saveProg(curChap.id,curClass,true,xp);
  }
  function retakeQuiz(){
    // Reset quiz answers for current slide so student can try again
    if(!curChap) return;
    const newQDone={...qDone};
    const slideIdx=curSlide;
    const slide=curChap.slides[slideIdx];
    if(slide?.questions){
      slide.questions.forEach((_:unknown,qi:number)=>{
        delete newQDone[`${curChap.id}_${slideIdx}_${qi}`];
      });
    }
    setQDone(newQDone);
  }
  function answerQ(qi:number,oi:number){
    const slide=curChap?.slides[curSlide]; if(!slide?.questions||!curChap) return;
    const key=`${curChap.id}_${curSlide}_${qi}`; if(qDone[key]) return;
    const shuffleKey2=`${curChap.id}_${curSlide}_${qi}`;
    const shuffleOrd=quizShuffle[shuffleKey2]||(slide.questions[qi].opts?.map((_:unknown,i:number)=>i)||[]);
    const realIdx=shuffleOrd[oi]??oi;
    const isCorrect=realIdx===slide.questions[qi].c;
    const newQDone={...qDone,[key]:{answered:true,correct:isCorrect}};
    setQDone(newQDone);
    // Auto-save quiz score when all questions answered
    const total=slide.questions.length;
    const allAnswered=slide.questions.every((_:unknown,i:number)=>newQDone[`${curChap.id}_${curSlide}_${i}`]?.answered);
    if(allAnswered&&token){
      const correct=slide.questions.filter((_:unknown,i:number)=>newQDone[`${curChap.id}_${curSlide}_${i}`]?.correct).length;
      const score=Math.round((correct/total)*100);
      // Save quiz score to DB (not completed yet, just score)
      fetch('/api/progress',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},
        body:JSON.stringify({chapter_id:curChap.id,class_level:curClass,completed:false,xp_earned:0,quiz_score:score})
      }).catch(()=>{});
      setProg(p=>({...p,[curChap.id]:{...p[curChap.id],quiz_score:score}}));
    }
  }
  async function sendDoubt(){
    if(!doubtQ.trim()) return;
    const q=doubtQ.trim(); setDoubtQ('');
    setDoubtMsgs(m=>[...m,{role:'user' as const,text:q},{role:'bot' as const,text:'🤔...'}]);
    try{
      const r=await fetch('/api/bot',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          question:q,
          lang,
          context:curChap?`Student is on: ${lang==='hi'?(curChap.titleHi||curChap.title):curChap.title} (Class ${curClass})`:`Student is on the dashboard`
        })
      });
      const d=await r.json();
      const ans=d.answer||(lang==='hi'?'⚠️ फिर से पूछें!':'⚠️ Please try again!');
      setDoubtMsgs(m=>[...m.slice(0,-1),{role:'bot' as const,text:ans}]);
    }catch{
      setDoubtMsgs(m=>[...m.slice(0,-1),{role:'bot' as const,text:lang==='hi'?'⚠️ Network error — फिर से try करें!':'⚠️ Network error — please try again!'}]);
    }
  }

  async function submitHW(){
    if(!hwForm.title){alert('Fill all fields');return;}
    try{if(token)await fetch('/api/assignments',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({...hwForm,chapter_id:'c9_1'})});}catch{}
    alert(lang==='hi'?'✅ गृहकार्य सौंपा गया!':'✅ Homework assigned!');
    setHwForm(f=>({...f,title:'',due_date:'',instructions:''}));
    if(token)loadTeacher(token);
  }
  async function loadCertificates(){
    if(!token) return;
    try{const r=await fetch('/api/certificate',{headers:{authorization:`Bearer ${token}`}});const d=await r.json();setCertificates(d.certificates||[]);}catch{}
  }
  async function loadLeaderboard(cls?:number|null){
    if(!token) return;
    const url='/api/leaderboard?type=class'+(cls?`&class_level=${cls}`:'&class_level='+(user?.class_level||8));
    try{const r=await fetch(url,{headers:{authorization:`Bearer ${token}`}});const d=await r.json();setLeaderboard(d.leaderboard||[]);setLbClass(cls||null);}catch{}
  }
  async function loadChallenges(){
    if(!token) return;
    try{const r=await fetch('/api/challenges',{headers:{authorization:`Bearer ${token}`}});const d=await r.json();setChallenges(d.challenges||[]);}catch{}
  }
  async function submitChallenge(challenge_id:number,answer:string){
    if(!token||!answer.trim()) return;
    try{
      const r=await fetch('/api/challenges/submit',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({challenge_id,answer})});
      const d=await r.json();
      if(d.success){alert(`✅ Submitted! +${d.xp_earned} XP earned!`);loadChallenges();setActiveChallengeId(null);setChallengeAnswer('');}
      else alert('❌ '+d.error);
    }catch{}
  }
  async function updateChallenge(){
    if(!token||!editChallenge) return;
    try{
      const r=await fetch('/api/challenges',{method:'PATCH',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify(editChallenge)});
      const d=await r.json();
      if(d.success){alert('✅ Challenge updated!');setEditChallenge(null);loadChallenges();}
      else alert('❌ '+(d.error||'Error'));
    }catch{alert('Error');}
  }
  async function createChallenge(){
    if(!token||!newChallenge.title||!newChallenge.description) return;
    try{
      const r=await fetch('/api/challenges',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify(newChallenge)});
      const d=await r.json();
      if(d.success){alert('✅ Challenge created!');setNewChallenge({title:'',description:'',class_level:'',xp_reward:50,due_date:''});loadChallenges();}
      else alert('❌ '+d.error);
    }catch{}
  }
  async function deleteChallenge(id:number){
    if(!token||!confirm('Delete this challenge?')) return;
    try{await fetch('/api/challenges',{method:'DELETE',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({id})});loadChallenges();}catch{}
  }
  async function saveEditChallenge(){
    if(!token||!editChallenge) return;
    try{
      const r=await fetch('/api/challenges',{method:'PATCH',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify(editChallenge)});
      const d=await r.json();
      if(d.success){setEditChallenge(null);loadChallenges();}
    }catch{}
  }
  async function claimCertificate(class_level:number){
    if(!token) return;
    setClaimingCert(true);
    try{
      const r=await fetch('/api/certificate',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({class_level})});
      const d=await r.json();
      if(d.success){setCertResult(d);loadCertificates();alert('🎓 Certificate claimed!');}
      else alert('❌ '+(d.error||'Error'));
    }catch{alert('Error');}
    setClaimingCert(false);
  }
  async function uploadLogo(file:File){
    if(file.size>600000){alert('Logo must be under 600KB. Please compress it first.');return;}
    setLogoUploading(true);
    const reader=new FileReader();
    reader.onload=async(e)=>{
      const dataUrl=e.target?.result as string;
      if(!dataUrl||!token){setLogoUploading(false);return;}
      try{
        const r=await fetch('/api/admin/logo',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({logo_url:dataUrl})});
        const d=await r.json();
        if(d.success){setSchoolLogo(dataUrl);localStorage.setItem('sb_logo',dataUrl);alert('✅ School logo saved permanently!');}
        else alert('❌ '+(d.error||'Upload failed'));
      }catch{alert('Upload error');}
      setLogoUploading(false);
    };
    reader.readAsDataURL(file);
  }

  async function loadAllStudents(cls?:number, sec?:string, search?:string){
    if(!token) return;
    try{
      const p = new URLSearchParams();
      if(cls) p.set('class', String(cls));
      if(sec) p.set('section', sec);
      if(search) p.set('search', search);
      const r = await fetch('/api/admin/enroll?'+p.toString(), {headers:{authorization:`Bearer ${token}`}});
      const d = await r.json();
      setAllStudents(d.students||[]);
    }catch(e){console.error('loadStudents',e);}
  }
  function parseCSVFile(text:string): Record<string,string>[] {
    const lines = text.trim().split(/\r?\n/).filter(l=>l.trim());
    if(!lines.length) return [];
    // Auto-detect if first row is header
    const firstRow = lines[0].split(',').map(c=>c.trim().toLowerCase());
    const hasHeader = firstRow.some(c=>['name','student','class','email','id','roll','section'].some(k=>c.includes(k)));
    let headers: string[];
    let dataLines: string[];
    if(hasHeader){
      headers = lines[0].split(',').map(c=>c.trim());
      dataLines = lines.slice(1);
    } else {
      // Auto-assign headers based on column count
      const cols = lines[0].split(',').length;
      const autoHeaders = ['name','student_id','class_level','section','email','phone'];
      headers = autoHeaders.slice(0,cols);
      dataLines = lines;
    }
    setCsvHeaders(headers);
    return dataLines.filter(l=>l.trim()).map(line=>{
      const vals = line.split(',').map(v=>v.trim().replace(/^["']|["']$/g,''));
      const row:Record<string,string> = {};
      headers.forEach((h,i)=>{ if(vals[i]) row[h.toLowerCase().replace(/\s+/g,'_')] = vals[i]; });
      return row;
    });
  }
  function handleCSVFile(file:File){
    const reader = new FileReader();
    reader.onload = (e)=>{
      const text = e.target?.result as string;
      setEnrollCSV(text);
      const rows = parseCSVFile(text);
      setCsvPreview(rows);
      setEnrollResult(null);
    };
    reader.readAsText(file);
  }
  async function bulkEnroll(){
    if(!enrollCSV.trim()&&!csvPreview.length){alert('Upload a CSV file or paste data first');return;}
    setEnrollResult(null);
    // Use parsed preview if available, else parse now
    const studs = csvPreview.length ? csvPreview : parseCSVFile(enrollCSV);
    if(!studs.length){setEnrollResult({enrolled:0,errors:['No valid rows found']});return;}
    try{
      if(token){
        const r=await fetch('/api/admin/enroll',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({students:studs})});
        const d=await r.json();
        setEnrollResult({enrolled:d.enrolled||0,errors:[...(d.errors||[])],students:d.students||[]});
        setCsvPreview([]); setEnrollCSV('');
        // Reload students list
        loadAllStudents(studentClassFilter||undefined,studentSearch||undefined);
        token&&loadAdmin(token);
      }
    }catch{setEnrollResult({enrolled:0,errors:['Connection error — check your internet']});}
  }

  // ─── SLIDE RENDERER ───
  // Check if text has actual Hindi/Devanagari characters
  function hasHindi(text?:string){return text?/[ऀ-ॿ]/.test(text):false;}
  // Get Hindi text — if no Hindi chars, return null (fall back to English)
  function hi(hiText?:string, enText?:string):string{
    if(lang==='en') return enText||'';
    return hasHindi(hiText)?hiText!:(enText||'');
  }
  function renderSlide(s:Slide){
    const title=hi(s.titleHi,s.title);
    const intro=hi(s.introHi,s.intro);
    const tag=lang==='hi'?(s.tagHi||s.tag):s.tag;
    const bots:{[k:string]:{bg:string,em:string}}={a:{bg:`linear-gradient(135deg,${C.p},${C.s})`,em:'🤖'},b:{bg:`linear-gradient(135deg,${C.a},${C.sky})`,em:'🌟'},c:{bg:`linear-gradient(135deg,${C.y},${C.o})`,em:'⚡'},d:{bg:`linear-gradient(135deg,${C.sky},${C.p})`,em:'🎯'}};
    const bot=bots[s.bot||'a'];
    const speech=hi(s.speechHi,s.speech);
    return (
      <div>
        {tag&&<div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:'uppercase',color:C.sky,marginBottom:6}}>{tag}</div>}
        {title&&<div style={{...S.fredoka,fontSize:'clamp(20px,3.5vw,26px)',lineHeight:1.2,marginBottom:6}}>{title}</div>}
        {intro&&<p style={{fontSize:13,color:C.mu,fontWeight:600,lineHeight:1.85,marginBottom:16}}>{intro}</p>}

        {s.type==='teach'&&(
          <div style={{display:'flex',gap:14,background:'linear-gradient(135deg,rgba(108,99,255,.09),rgba(255,101,132,.04))',border:`1px solid ${C.br}`,borderRadius:16,padding:16,marginBottom:14,position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${C.p},${C.s},${C.a})`}}/>
            <div style={{width:52,height:52,minWidth:52,borderRadius:'50%',background:bot.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0,animation:'botBob 2.5s ease-in-out infinite'}}>{bot.em}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:9,fontWeight:800,letterSpacing:1.5,textTransform:'uppercase',color:C.p,marginBottom:6}}>{lang==='hi'?(s.botNameHi||s.botName):s.botName}</div>
              {lang==='hi'&&!hasHindi(s.speechHi)&&<div style={{background:'rgba(255,209,102,.1)',border:'1px solid rgba(255,209,102,.3)',borderRadius:8,padding:'6px 10px',fontSize:11,fontWeight:700,color:'#FFD166',marginBottom:6}}>📚 हिंदी अनुवाद जल्द आएगा</div>}
              <div className="bot-txt" style={{fontSize:13,fontWeight:600,lineHeight:1.85}} dangerouslySetInnerHTML={{__html:speech||''}}/>
            </div>
          </div>
        )}
        {s.type==='teach'&&s.extra&&<div dangerouslySetInnerHTML={{__html:s.extra}}/>}

        {s.type==='concepts'&&(
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:10,marginBottom:14}}>
            {s.items?.map((it,i)=>(
              <div key={i} style={{background:C.card,border:`1px solid ${C.br}`,borderRadius:12,padding:12,textAlign:'center'}}>
                <div style={{fontSize:22,marginBottom:6}}>{it.em}</div>
                <div style={{fontSize:11,fontWeight:800,marginBottom:3}}>{hi(it.lHi,it.l)}</div>
                <div style={{fontSize:10,color:C.mu,fontWeight:600,lineHeight:1.5}}>{hi(it.dHi,it.d)}</div>
              </div>
            ))}
          </div>
        )}

        {s.type==='reallife'&&(
          <>
            <div style={{...S.fredoka,fontSize:16,color:C.sky,marginBottom:10}}>🌍 {hi(s.titleHi,s.title)}</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:9,marginBottom:14}}>
              {s.items?.map((it,i)=>(
                <div key={i} style={{background:C.card2,border:`1px solid ${C.br}`,borderRadius:11,padding:12}}>
                  <div style={{fontSize:20,marginBottom:5}}>{it.ic}</div>
                  <div style={{fontSize:11,fontWeight:800,marginBottom:2}}>{it.nm}</div>
                  <div style={{fontSize:10,color:C.mu,fontWeight:600,lineHeight:1.5}}>{lang==='hi'?(it.dsHi||it.ds):it.ds}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {s.type==='flow'&&(
          <div style={{background:C.card,border:`1px solid ${C.br}`,borderRadius:14,padding:16,marginBottom:14}}>
            <div style={{...S.fredoka,fontSize:14,marginBottom:12}}>⚡ Step-by-Step Flow</div>
            <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap',justifyContent:'center'}}>
              {s.nodes?.map((n,i)=>n.arrow?(
                <div key={i} style={{color:C.p,fontSize:16,fontWeight:900,animation:'arrowPulse 1.5s ease-in-out infinite'}}>→</div>
              ):(
                <div key={i} style={{textAlign:'center',padding:'9px 11px',borderRadius:10,minWidth:70,background:n.c?.includes('green')?'rgba(67,233,123,.12)':n.c?.includes('pink')?'rgba(255,101,132,.12)':n.c?.includes('yellow')?'rgba(255,209,102,.12)':n.c?.includes('sky')?'rgba(56,191,255,.12)':'rgba(108,99,255,.15)',border:n.c?.includes('green')?'1px solid rgba(67,233,123,.3)':n.c?.includes('pink')?'1px solid rgba(255,101,132,.3)':n.c?.includes('yellow')?'1px solid rgba(255,209,102,.3)':n.c?.includes('sky')?'1px solid rgba(56,191,255,.3)':'1px solid rgba(108,99,255,.3)'}}>
                  <div style={{fontSize:18,marginBottom:3}}>{n.i}</div>
                  <div style={{fontSize:10,fontWeight:800,lineHeight:1.3}}>{n.l}</div>
                  {n.s&&<div style={{fontSize:9,color:C.mu,marginTop:1,fontWeight:600}}>{n.s}</div>}
                </div>
              ))}
            </div>
            {s.extra&&<div style={{marginTop:12}} dangerouslySetInnerHTML={{__html:s.extra}}/>}
          </div>
        )}

        {s.type==='deep'&&(
          <div style={{background:C.card,border:`1px solid ${C.br}`,borderRadius:14,padding:18,marginBottom:14}}>
            {s.content?.map((c,i)=>(
              <div key={i} style={{marginBottom:i<(s.content?.length||1)-1?14:0}}>
                <div style={{...S.fredoka,fontSize:14,marginBottom:5}}>{lang==='hi'?(c.hHi||c.h):c.h}</div>
                <p style={{fontSize:12,color:C.mu,fontWeight:600,lineHeight:1.85}}>{lang==='hi'?(c.pHi||c.p):c.p}</p>
              </div>
            ))}
          </div>
        )}

        {s.type==='code'&&(
          <>
            {s.files?.map((f,fi)=>(
              <div key={fi} style={{background:'#060614',border:'1px solid rgba(108,99,255,.3)',borderRadius:12,overflow:'hidden',marginBottom:12}}>
                <div style={{display:'flex',alignItems:'center',gap:5,padding:'7px 12px',background:'rgba(108,99,255,.08)',borderBottom:'1px solid rgba(108,99,255,.2)'}}>
                  <div style={{width:8,height:8,borderRadius:'50%',background:'#FF5F57'}}/>
                  <div style={{width:8,height:8,borderRadius:'50%',background:'#FFBD2E'}}/>
                  <div style={{width:8,height:8,borderRadius:'50%',background:'#27C93F'}}/>
                  <div style={{marginLeft:'auto',fontSize:10,color:C.mu,fontWeight:700}}>{f.name}</div>
                </div>
                <div style={{padding:12,fontFamily:'monospace',fontSize:12,lineHeight:1.9,overflowX:'auto'}}>
                  {f.lines.map((l,li)=>{
                    const colors:{[k:string]:string}={c:'#6B7280',kw:'#A855F7',s:'#43E97B',fn:'#FFD166',v:'#38BFFF',num:'#FF9F43',out:'rgba(240,240,255,.8)',n:C.text};
                    if(l.t==='b') return <br key={li}/>;
                    return <span key={li} style={{display:'block',color:colors[l.t]||C.text}}>{l.t==='c'?`# ${l.v}`:l.v}</span>;
                  })}
                </div>
              </div>
            ))}
            {s.extra&&<div dangerouslySetInnerHTML={{__html:s.extra}}/>}
          </>
        )}

        {s.type==='neural'&&(
          <div style={{background:C.card,border:`1px solid ${C.br}`,borderRadius:14,padding:16,marginBottom:14}}>
            <div style={{...S.fredoka,fontSize:14,marginBottom:12}}>🧬 Neural Network — Live!</div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,flexWrap:'wrap',padding:8}}>
              {[{nodes:s.inp||[],color:C.a,label:s.labels?.[0]},{nodes:s.h1||[],color:C.p,label:s.labels?.[1]},{nodes:s.h2||[],color:C.sky,label:s.labels?.[2]},{nodes:s.out||[],color:C.s,label:s.labels?.[3]}].map((layer,li)=>(
                <div key={li} style={{display:'flex',flexDirection:'column',gap:5,alignItems:'center'}}>
                  {layer.nodes.map((n,ni)=>(
                    <div key={ni} style={{width:26,height:26,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:7,fontWeight:800,background:`${layer.color}33`,border:`2px solid ${layer.color}`,color:layer.color}}>{n}</div>
                  ))}
                  <div style={{fontSize:9,fontWeight:800,color:C.mu,marginTop:4,textAlign:'center',lineHeight:1.3}}>{layer.label}</div>
                </div>
              ))}
            </div>
            {s.extra&&<div style={{marginTop:10}} dangerouslySetInnerHTML={{__html:s.extra}}/>}
          </div>
        )}

        {s.type==='quiz'&&(
          <div style={{background:'linear-gradient(135deg,rgba(108,99,255,.08),rgba(255,101,132,.04))',border:'1px solid rgba(108,99,255,.25)',borderRadius:16,padding:18,marginBottom:14}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
              <span style={{fontSize:20}}>🧩</span>
              <span style={{...S.fredoka,fontSize:18}}>{hi(s.titleHi,s.title)}</span>
              <span style={{fontSize:10,color:C.mu,fontWeight:700,background:'rgba(255,255,255,.06)',padding:'2px 8px',borderRadius:20}}>{s.questions?.length} Qs</span>
            </div>
            {s.questions?.map((q,qi)=>{
              const key=`${curChap?.id}_${curSlide}_${qi}`;
              const answered=qDone[key]?.answered;
              const rawOpts=lang==='hi'?(q.optsHi||q.opts):q.opts;
              const shuffleKey=`${curChap?.id}_${curSlide}_${qi}`;
              const shuffleOrder=quizShuffle[shuffleKey]||(rawOpts?.map((_:unknown,i:number)=>i)||[]);
              const opts=shuffleOrder.map((i:number)=>rawOpts?.[i]||'');
              // Map correct answer through shuffle
              const correctInShuffle=shuffleOrder.indexOf(q.c);
              return(
                <div key={qi} style={{marginBottom:qi<(s.questions?.length||1)-1?18:0}}>
                  <div style={{fontSize:13,fontWeight:700,lineHeight:1.6,marginBottom:10}}>Q{qi+1}. {lang==='hi'?(q.qHi||q.q):q.q}</div>
                  <div style={{display:'flex',flexDirection:'column',gap:7}}>
                    {opts.map((o:string,oi:number)=>{
                      const isCorrect=oi===correctInShuffle, isSelected=answered;
                      let bg='rgba(255,255,255,.05)', border='1.5px solid rgba(255,255,255,.1)', color=C.text;
                      if(answered){
                        if(isCorrect){bg='rgba(67,233,123,.15)';border=`1.5px solid ${C.a}`;color=C.a;}
                        else{bg='rgba(255,255,255,.03)';border='1.5px solid rgba(255,255,255,.06)';color='rgba(144,144,187,.6)';}
                      }
                      return(
                        <button key={oi} disabled={!!isSelected} onClick={()=>answerQ(qi,oi)}
                          style={{display:'flex',alignItems:'center',gap:9,background:bg,border,borderRadius:10,padding:'9px 12px',fontSize:12,fontWeight:700,cursor:answered?'default':'pointer',textAlign:'left',color,fontFamily:"'Nunito',sans-serif",transition:'all .2s',width:'100%'}}>
                          <span style={{width:20,height:20,minWidth:20,borderRadius:5,background:'rgba(255,255,255,.08)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:800}}>{String.fromCharCode(65+oi)}</span>
                          {o}
                        </button>
                      );
                    })}
                  </div>
                  {answered&&(
                    <div style={{marginTop:9,padding:'9px 12px',borderRadius:10,fontSize:12,fontWeight:600,lineHeight:1.6,background:qDone[key]?.correct?'rgba(67,233,123,.12)':'rgba(255,101,132,.1)',border:qDone[key]?.correct?`1px solid rgba(67,233,123,.3)`:`1px solid rgba(255,101,132,.3)`,color:qDone[key]?.correct?C.a:C.s}}>
                      {qDone[key]?.correct?'🎉 ':'❌ '}{hi(q.exHi,q.ex)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ─── TOP NAV ───
  const topnav=(
    <nav style={{position:'sticky',top:0,zIndex:900,background:'rgba(13,13,43,.97)',backdropFilter:'blur(20px)',borderBottom:`1px solid ${C.br}`}}>
      {/* PWA Install Banner — shows on first visit, dismissable */}
      {!appInstalled&&installPrompt&&(
        <div style={{display:'flex',alignItems:'center',gap:10,padding:'8px 16px',background:`linear-gradient(135deg,rgba(108,99,255,.18),rgba(67,233,123,.08))`,borderBottom:`1px solid ${C.br}`,flexWrap:'wrap'}}>
          <div style={{fontSize:18}}>📲</div>
          <div style={{flex:1,fontSize:12,fontWeight:700,color:C.text}}>{lang==='hi'?'STU-BRAIN को अपने Phone पर Install करें — App जैसा Experience!':'Install STU-BRAIN on your phone — works like a native app!'}</div>
          <button onClick={installApp} style={{...S.btnP,padding:'6px 16px',fontSize:12}}>⬇️ {lang==='hi'?'Install करें':'Install App'}</button>
          <button onClick={()=>setInstallPrompt(null)} style={{background:'none',border:'none',color:C.mu,cursor:'pointer',fontSize:16,padding:'2px 6px'}}>✕</button>
        </div>
      )}
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'12px 20px',flexWrap:'wrap'}}>
        <div style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}} onClick={()=>{setCurChap(null);setScreen(user?.role==='student'?'student':user?.role==='teacher'?'teacher':'admin');}}>
          <div style={{width:38,height:38,borderRadius:11,background:`linear-gradient(135deg,${C.p},${C.s})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,animation:'orbPulse 2.5s ease-in-out infinite',flexShrink:0,overflow:'hidden'}}>
            {schoolLogo?<img src={schoolLogo} alt="Logo" style={{width:'100%',height:'100%',objectFit:'contain'}}/>:<span>🧠</span>}
          </div>
          <span style={{...S.fredoka,...S.grad,fontSize:20}}>STU-BRAIN</span>
        </div>
        <span style={{color:C.mu,fontSize:12,fontWeight:600}}> · {user?.school_name||'Demo School'}</span>
        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
          {!appInstalled&&(
            <button onClick={()=>{
              if(installPrompt){
                installApp();
              } else {
                // iOS Safari or already prompted
                const isIOS=/iPhone|iPad|iPod/.test(navigator.userAgent);
                if(isIOS){
                  alert(lang==='hi'
                    ?'📱 iPhone/iPad पर Install करें:\n\n1. नीचे Share बटन (□↑) दबाएं\n2. "Add to Home Screen" चुनें\n3. "Add" दबाएं\n\n✅ STU-BRAIN App आपकी Home Screen पर आ जाएगा!'
                    :'📱 Install on iPhone/iPad:\n\n1. Tap Share button (□↑) at the bottom\n2. Select "Add to Home Screen"\n3. Tap "Add"\n\n✅ STU-BRAIN will appear on your Home Screen!');
                } else {
                  alert(lang==='hi'
                    ?'📱 Install करें:\n\nChrome में:\nMenu (⋮) → "Add to Home Screen" या "Install App"\n\n✅ App जैसा experience मिलेगा!'
                    :'📱 To Install:\n\nIn Chrome: Menu (⋮) → "Add to Home Screen" or "Install App"\n\n✅ Works like a native app!');
                }
              }
            }} style={{...S.btnP,padding:'5px 12px',fontSize:11}}>📲 {lang==='hi'?'Install':'Install'}</button>
          )}
          <button onClick={()=>setLang(l=>l==='en'?'hi':'en')} style={{...S.btnS,padding:'5px 12px',fontSize:11}}>{lang==='en'?'🇮🇳 हिंदी':'🇬🇧 English'}</button>
          {user?.role==='student'&&<>
            <div style={{color:C.y,fontSize:11,fontWeight:800,background:'rgba(255,209,102,.15)',border:'1px solid rgba(255,209,102,.3)',padding:'4px 10px',borderRadius:50}}>⭐ {totalXP} XP</div>
            <button onClick={()=>{loadLeaderboard(user?.class_level);setShowLB(true);}} title="Leaderboard" style={{background:'rgba(255,209,102,.12)',border:'1px solid rgba(255,209,102,.3)',color:'#FFD166',borderRadius:50,padding:'4px 11px',fontSize:15,cursor:'pointer',fontFamily:"'Nunito',sans-serif",lineHeight:1}}>🏆</button>
            <button onClick={()=>{loadChallenges();setShowChallenges(true);}} title="Challenges" style={{position:'relative' as const,background:'rgba(108,99,255,.12)',border:'1px solid rgba(108,99,255,.3)',color:'#6C63FF',borderRadius:50,padding:'4px 11px',fontSize:15,cursor:'pointer',fontFamily:"'Nunito',sans-serif",lineHeight:1}}>🎯{challenges.filter((ch:Record<string,unknown>)=>!ch.submission_id).length>0&&<span style={{position:'absolute' as const,top:-3,right:-3,background:'#FF6584',color:'#fff',borderRadius:'50%',width:14,height:14,fontSize:8,fontWeight:900,display:'inline-flex',alignItems:'center',justifyContent:'center'}}>{challenges.filter((ch:Record<string,unknown>)=>!ch.submission_id).length}</span>}</button>
          </>}
          <button onClick={logout} style={{...S.btnS,padding:'5px 12px',fontSize:11}}>{T.logout}</button>
        </div>
      </div>
    </nav>
  );

  // ─── LOGIN ───
  if(screen==='login') return (
    <div style={{minHeight:'100vh',position:'relative'}}>
      <AIBackground3D intensity={0.85}/>
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:20,background:`radial-gradient(ellipse 80% 60% at 50% 30%,rgba(108,99,255,.2),transparent 70%)`}}>
      <div style={{...S.card,padding:'36px 32px',width:'100%',maxWidth:420,boxShadow:'0 20px 60px rgba(108,99,255,.22)'}}>
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:12}}>
          <button onClick={()=>setLang(l=>l==='en'?'hi':'en')} style={{...S.btnS,padding:'5px 12px',fontSize:11}}>{lang==='en'?'🇮🇳 हिंदी':'🇬🇧 English'}</button>
        </div>
        <div style={{textAlign:'center',marginBottom:22}}>
          <div style={{width:62,height:62,borderRadius:18,background:`linear-gradient(135deg,${C.p},${C.s})`,display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:28,marginBottom:8,animation:'orbPulse 2.5s ease-in-out infinite',overflow:'hidden'}}>
                {schoolLogo?<img src={schoolLogo} alt="Logo" style={{width:'100%',height:'100%',objectFit:'contain'}}/>:<span>🧠</span>}
              </div>
          <div style={{...S.fredoka,...S.grad,fontSize:26}}>STU-BRAIN</div>
          <div style={{color:C.mu,fontSize:13,fontWeight:600,marginTop:3}}>{T.tagline}</div>
        </div>
        {/* Role selector - clean cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8,marginBottom:18}}>
          {([
            ['student','🎓',T.studentRole,lang==='hi'?'Student ID से login करें':'Login with your Student ID'],
            ['teacher','👨‍🏫',T.teacherRole,lang==='hi'?'Teacher email से login करें':'Login with your teacher email'],
            ['admin','🏫',T.adminRole,lang==='hi'?'School admin login':'School admin login'],
            ['owner','👑',lang==='hi'?'Owner':'Owner',lang==='hi'?'STU-BRAIN owner login':'STU-BRAIN owner login'],
          ] as const).map(([r,ic,label,desc])=>(
            <button key={r} onClick={()=>setLoginRole(r as typeof loginRole)} style={{padding:'10px 8px',borderRadius:12,fontSize:11,fontWeight:800,border:loginRole===r?`2px solid ${C.p}`:`1px solid ${C.br}`,background:loginRole===r?'rgba(108,99,255,.15)':'rgba(255,255,255,.03)',color:loginRole===r?C.p:C.mu,cursor:'pointer',fontFamily:"'Nunito',sans-serif",textAlign:'left',lineHeight:1.4}}>
              <div style={{fontSize:18,marginBottom:2}}>{ic}</div>
              <div style={{fontWeight:900,fontSize:12,color:loginRole===r?C.p:C.text}}>{label}</div>
              <div style={{fontSize:9,color:C.mu,fontWeight:600,marginTop:1}}>{desc}</div>
            </button>
          ))}
        </div>
        <div style={{marginBottom:12}}>
          <label style={{fontSize:11,fontWeight:800,color:C.mu,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:5}}>
            {loginRole==='student'?'Student ID / Email':loginRole==='owner'?'Owner ID':'Email'}
          </label>
          <input style={S.inp} value={loginId} onChange={e=>setLoginId(e.target.value)} placeholder={loginRole==='student'?'Your Student ID or email':loginRole==='owner'?'vaibhav2005':loginRole==='teacher'?'Your teacher email':'admin@yourschool.com'} onKeyDown={e=>e.key==='Enter'&&doLogin()}/>
        </div>
        <div style={{marginBottom:12}}>
          <label style={{fontSize:11,fontWeight:800,color:C.mu,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:5}}>{T.password}</label>
          <div style={{position:'relative'}}>
            <input style={{...S.inp,paddingRight:46}} type={showLoginPass?'text':'password'} value={loginPass} onChange={e=>setLoginPass(e.target.value)} placeholder="Password" onKeyDown={e=>e.key==='Enter'&&doLogin()}/>
            <button type="button" onClick={()=>setShowLoginPass(v=>!v)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:C.mu,fontSize:16,padding:0,lineHeight:1}}>{showLoginPass?'🙈':'👁️'}</button>
          </div>
        </div>
        {loginErr&&<div style={{color:C.s,fontSize:12,fontWeight:700,marginBottom:12,padding:'9px 12px',background:'rgba(255,101,132,.1)',borderRadius:10}}>{loginErr}</div>}
        <button onClick={()=>doLogin()} style={{...S.btnP,width:'100%',padding:'13px',fontSize:15}}>{T.loginBtn}</button>
        <div style={{textAlign:'center',marginTop:10}}>
          <a href="/" style={{fontSize:11,color:C.p,fontWeight:700,textDecoration:'none'}}>← {lang==='hi'?'STU-BRAIN Homepage देखें':'View STU-BRAIN Website'}</a>
        </div>
        <div style={{...S.card,background:C.card2,padding:14,marginTop:14}}>
          <div style={{fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:1,color:C.mu,marginBottom:8}}>{lang==='hi'?'लॉगिन कैसे करें:':'How to Login:'}</div>
          {[['🎓',T.studentRole,lang==='hi'?'स्कूल से मिला Student ID + Password':'School ID + Password (given by school)'],['👨‍🏫',T.teacherRole,lang==='hi'?'Teacher Email + Password':'Email + Password (given by admin)'],['🏫',T.adminRole,lang==='hi'?'Admin Email + Password':'Admin Email + Password']].map(([ic,role,how],i)=>(
            <div key={i} style={{fontSize:11,color:C.mu,fontWeight:600,marginBottom:i<2?5:0}}>{ic} <strong style={{color:C.text}}>{role}</strong>: {how}</div>
          ))}
        </div>
      </div>
      <Styles/>
      </div>
    </div>
  );

  // ─── STUDENT DASHBOARD ───
  if(screen==='student') return (
    <div style={{minHeight:'100vh',position:'relative'}}>
      <AIBackground3D intensity={0.55}/>
      <div style={{position:'relative',zIndex:1}}>{topnav}
      <div style={{maxWidth:1080,margin:'0 auto',padding:20}}>
        <div style={{...S.fredoka,fontSize:24,marginBottom:2}}>{T.welcomeBack}, {user?.name}! 👋</div>
        <div style={{color:C.mu,fontSize:13,fontWeight:600,marginBottom:18}}>{user?.school_name} · Class {user?.class_level} · ID: {user?.student_id}</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:10,marginBottom:22}}>
          {[{i:'📚',v:Object.values(prog).filter(p=>p.completed).length,l:T.chaptersCompleted},{i:'⭐',v:totalXP,l:T.totalXP},{i:'🏆',v:certificates.length,l:lang==='hi'?'Certificates':'Certificates'},{i:'🧩',v:Math.round((Object.values(prog).filter(p=>p.completed).reduce((a,p)=>a+(p.quiz_score||0),0)/(Math.max(Object.values(prog).filter(p=>p.completed).length,1)))),l:lang==='hi'?'Avg Quiz':'Avg Quiz %'}].map((s,i)=>(
            <div key={i} style={{...S.card,padding:14,textAlign:'center',borderColor:i===3?'rgba(255,101,132,.3)':C.br,background:i===3?'rgba(255,101,132,.06)':C.card}}>
              <div style={{fontSize:24,marginBottom:4}}>{s.i}</div>
              <div style={{...S.fredoka,...S.grad,fontSize:22}}>{s.v}</div>
              <div style={{fontSize:11,color:C.mu,fontWeight:700}}>{s.l}</div>
            </div>
          ))}
        </div>
        {/* MY CLASS — PROMINENT AT TOP */}
        {(()=>{const myCls=user?.class_level||8;const d=CURRICULUM[myCls];const{done,total,pct}=classProg(myCls);return d?(
          <div style={{marginBottom:18}}>
            <div style={{...S.fredoka,fontSize:16,marginBottom:8}}>📖 {lang==='hi'?'मेरी Class':'My Class'} <span style={{fontSize:12,color:C.p,fontWeight:700}}>Class {myCls}</span></div>
            <div style={{...S.card,padding:20,border:`2px solid ${C.p}`,background:'linear-gradient(135deg,rgba(108,99,255,.12),rgba(67,233,123,.05))',cursor:'pointer',transition:'transform .2s'}}
              onClick={()=>openClass(myCls)}
              onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='translateY(-2px)'}
              onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='translateY(0)'}>
              <div style={{display:'flex',alignItems:'center',gap:14}}>
                <div style={{fontSize:48}}>{myCls===8?'🌱':myCls===9?'🚀':myCls===10?'⚡':myCls===11?'🏆':'🎓'}</div>
                <div style={{flex:1}}>
                  <div style={{...S.fredoka,fontSize:20,marginBottom:4}}>{lang==='hi'?d.labelHi:d.label}</div>
                  <div style={{height:8,background:'rgba(255,255,255,.1)',borderRadius:4,overflow:'hidden',marginBottom:6}}>
                    <div style={{height:'100%',background:`linear-gradient(90deg,${C.p},${C.a})`,borderRadius:4,width:`${pct}%`,transition:'width .8s'}}/>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:C.mu,fontWeight:700}}>
                    <span>{done}/{total} {lang==='hi'?'Chapters':'Chapters'}</span>
                    <span style={{color:pct>=80?C.a:pct>=40?C.y:C.mu}}>{pct}% Complete</span>
                  </div>
                </div>
                <button style={{...S.btnP,padding:'12px 20px',fontSize:13,whiteSpace:'nowrap'}}>{done===0?(lang==='hi'?'🚀 शुरू':'🚀 Start'):(lang==='hi'?'▶ जारी':'▶ Go!')}</button>
              </div>
            </div>
          </div>
        ):null;})()}

        {/* LEADERBOARD BUTTON */}
        <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
          <button onClick={()=>{loadLeaderboard(user?.class_level);setShowLB(true);}} style={{...S.btnP,padding:'8px 16px',fontSize:12}}>🏆 Leaderboard</button>
          <button onClick={()=>{loadChallenges();setShowChallenges(true);}} style={{...S.btnS,padding:'8px 16px',fontSize:12,position:'relative'}}>
            ⚡ Challenges
            {challenges.filter(c=>!(c as Record<string,unknown>).submission_id).length>0&&<span style={{position:'absolute',top:-4,right:-4,background:C.s,color:'#fff',borderRadius:'50%',width:16,height:16,fontSize:9,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center'}}>{challenges.filter(c=>!(c as Record<string,unknown>).submission_id).length}</span>}
          </button>

        </div>

        <div style={{...S.fredoka,fontSize:16,marginBottom:10}}>📚 {lang==='hi'?'सभी Classes':'All Classes'}</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:10,marginBottom:22}}>
          {([{cls:8,em:'🌱'},{cls:9,em:'🚀'},{cls:10,em:'⚡'},{cls:11,em:'🏆'},{cls:12,em:'🎓'}] as {cls:number;em:string}[]).map(({cls,em})=>{
            const d=CURRICULUM[cls]; const{done,total,pct}=classProg(cls); const mine=cls===(user?.class_level||8);
            if(mine) return null; // Already shown above
            return(
              <div key={cls} style={{...S.card,padding:14,cursor:'pointer',position:'relative',borderColor:mine?C.p:C.br,transition:'transform .2s',opacity:0.8}}
                onClick={()=>openClass(cls)}
                onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='translateY(-3px)'}
                onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='translateY(0)'}>
                <div style={{fontSize:28,marginBottom:6}}>{em}</div>
                <div style={{fontSize:10,textTransform:'uppercase',letterSpacing:1,fontWeight:800,color:C.mu,marginBottom:2}}>{lang==='hi'?d?.labelHi:d?.label}</div>
                <div style={{height:4,background:'rgba(255,255,255,.08)',borderRadius:2,overflow:'hidden',marginBottom:4}}>
                  <div style={{height:'100%',background:`linear-gradient(90deg,${C.p},${C.a})`,borderRadius:2,width:`${pct}%`}}/>
                </div>
                <div style={{fontSize:10,color:C.mu,fontWeight:700}}>{done}/{total} · {pct}%</div>
              </div>
            );
          })}
        </div>
        <div style={{...S.fredoka,fontSize:18,marginBottom:12}}>▶ {T.continueLearning}</div>
        <div style={{display:'flex',flexDirection:'column',gap:9}}>
          {[...(()=>{
              const cls=user?.class_level||3;
              const d=CURRICULUM[cls];
              if(!d) return [];
              const allC=d.subjects.flatMap(s=>s.chapters.filter(Boolean) as import('@/lib/curriculum').Chapter[]);
              // Next unfinished chapter for student's class
              const nextUnfinished=allC.find(c=>!prog[c.id]?.completed);
              const lastDone=allC.filter(c=>prog[c.id]?.completed).pop();
              const result=[];
              if(nextUnfinished) result.push({i:nextUnfinished.icon,t:(lang==='hi'?(nextUnfinished.titleHi||nextUnfinished.title):nextUnfinished.title),s:`Class ${cls} · Next Up`,cls,cid:nextUnfinished.id});
              if(lastDone&&lastDone.id!==nextUnfinished?.id) result.push({i:lastDone.icon,t:(lang==='hi'?(lastDone.titleHi||lastDone.title):lastDone.title),s:`Class ${cls} · Review`,cls,cid:lastDone.id});
              // Add one from next class if exists
              const nextCls=cls+1;const nextD=CURRICULUM[nextCls];
              if(nextD){const nc=nextD.subjects.flatMap(s=>s.chapters.filter(Boolean) as import('@/lib/curriculum').Chapter[])[0];if(nc) result.push({i:nc.icon,t:(hi(nc.titleHi,nc.title)),s:`Class ${nextCls} · Preview`,cls:nextCls,cid:nc.id});}
              return result.slice(0,3);
            })()].map((r,i)=>(
            <div key={i} style={{...S.card,padding:'13px 16px',display:'flex',alignItems:'center',gap:12,cursor:'pointer',transition:'all .2s'}}
              onClick={()=>{openClass(r.cls);const d=CURRICULUM[r.cls];const allC=(d?.subjects||[]).flatMap(s=>s.chapters.filter(Boolean) as import('@/lib/curriculum').Chapter[]);const idx=allC.findIndex(c=>c.id===r.cid);const ch=allC[idx];if(ch){setTimeout(()=>openChap(ch,idx),60);}}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=C.p;(e.currentTarget as HTMLDivElement).style.background='rgba(108,99,255,.07)';}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=C.br;(e.currentTarget as HTMLDivElement).style.background=C.card;}}>
              <div style={{fontSize:22}}>{r.i}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:800}}>{r.t}</div>
                <div style={{fontSize:11,color:C.mu,fontWeight:600}}>{r.s}{prog[r.cid]?.completed?' · ✅':''}</div>
              </div>
              <div style={{color:C.p,fontWeight:900,fontSize:18}}>▶</div>
            </div>
          ))}
        </div>
      </div>

        {/* ── CERTIFICATE SECTION ── */}
        {certResult&&(
          <div style={{position:'fixed',inset:0,background:'rgba(7,7,26,.9)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:16}} onClick={()=>setCertResult(null)}>
            <div id="cert-container" onClick={e=>e.stopPropagation()} style={{background:'linear-gradient(135deg,#1a1a4e,#0d0d2b)',border:'3px solid #FFD166',borderRadius:20,padding:32,maxWidth:600,width:'100%',textAlign:'center',boxShadow:'0 0 60px rgba(255,209,102,.3)'}}>
              <div style={{fontSize:13,fontWeight:800,color:'#FFD166',letterSpacing:3,textTransform:'uppercase',marginBottom:8}}>Certificate of Completion</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.5)',marginBottom:20,letterSpacing:1}}>STU-BRAIN · AI Education Platform · India</div>
              <div style={{width:60,height:3,background:'linear-gradient(90deg,#6C63FF,#FFD166)',margin:'0 auto 20px',borderRadius:2}}/>
              <div style={{fontSize:13,color:'rgba(255,255,255,.7)',marginBottom:8}}>This certifies that</div>
              <div style={{...S.fredoka,fontSize:32,background:'linear-gradient(90deg,#FFD166,#FF6584)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:8}}>{certResult.student_name}</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,.7)',marginBottom:6}}>has successfully completed</div>
              <div style={{...S.fredoka,fontSize:22,color:'#43E97B',marginBottom:4}}>Class {certResult.class_level} — AI & Technology</div>
              <div style={{fontSize:12,color:'rgba(255,255,255,.5)',marginBottom:20}}>{certResult.school_name}</div>
              <div style={{width:60,height:3,background:'linear-gradient(90deg,#FFD166,#6C63FF)',margin:'0 auto 20px',borderRadius:2}}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
                <div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,.4)',letterSpacing:1,marginBottom:4}}>ISSUED BY</div>
                  <div style={{fontSize:13,fontWeight:800,color:'#fff'}}>STU-BRAIN Owner</div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,.5)'}}>Founder, STU-BRAIN AI</div>
                </div>
                <div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,.4)',letterSpacing:1,marginBottom:4}}>CERTIFICATE ID</div>
                  <div style={{fontSize:11,fontFamily:'monospace',color:'#FFD166'}}>{certResult.cert_id}</div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,.5)'}}>{new Date(certResult.issued_at).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</div>
                </div>
              </div>
              <div style={{fontSize:10,color:'rgba(255,255,255,.3)',marginBottom:20,fontStyle:'italic'}}>Powered by STU-BRAIN · AI Education for India · stu-brain.vercel.app</div>
              <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
                <button onClick={()=>{
                  if(!certResult) return;
                  // Build a complete standalone HTML certificate and download it
                  const html=`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>STU-BRAIN Certificate - ${certResult.student_name}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#0d0d2b;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px;}
  .cert{background:linear-gradient(135deg,#1a1a4e,#0d0d2b);border:4px solid #FFD166;border-radius:20px;padding:40px;max-width:650px;width:100%;text-align:center;box-shadow:0 0 60px rgba(255,209,102,.3);}
  .top-label{font-size:14px;font-weight:800;color:#FFD166;letter-spacing:4px;text-transform:uppercase;margin-bottom:8px;}
  .brand{font-size:12px;color:rgba(255,255,255,.4);letter-spacing:2px;margin-bottom:24px;}
  .divider{width:80px;height:3px;background:linear-gradient(90deg,#6C63FF,#FFD166);margin:0 auto 24px;}
  .certify{font-size:14px;color:rgba(255,255,255,.6);margin-bottom:10px;}
  .student-name{font-size:36px;font-weight:900;color:#FFD166;margin-bottom:10px;text-shadow:0 0 20px rgba(255,209,102,.3);}
  .completed{font-size:14px;color:rgba(255,255,255,.6);margin-bottom:8px;}
  .course{font-size:24px;font-weight:800;color:#43E97B;margin-bottom:6px;}
  .school{font-size:13px;color:rgba(255,255,255,.4);margin-bottom:24px;}
  .divider2{width:80px;height:3px;background:linear-gradient(90deg,#FFD166,#6C63FF);margin:0 auto 24px;}
  .meta{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px;}
  .meta-label{font-size:10px;color:rgba(255,255,255,.35);letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;}
  .meta-val{font-size:14px;font-weight:700;color:#fff;}
  .meta-sub{font-size:11px;color:rgba(255,255,255,.4);margin-top:2px;}
  .cert-id{font-family:monospace;font-size:12px;color:#FFD166;}
  .footer{font-size:10px;color:rgba(255,255,255,.2);font-style:italic;}
  .star{color:#FFD166;font-size:20px;margin:0 4px;}
</style>
</head>
<body>
<div class="cert">
  <div class="top-label">Certificate of Completion</div>
  <div class="brand">STU-BRAIN · AI Education Platform · India</div>
  <div class="divider"></div>
  <div class="certify">This certifies that</div>
  <div class="student-name">${certResult.student_name}</div>
  <div class="completed">has successfully completed</div>
  <div class="course">Class ${certResult.class_level} — AI &amp; Technology Program</div>
  <div class="school">${certResult.school_name}</div>
  <div class="divider2"></div>
  <div class="meta">
    <div>
      <div class="meta-label">Issued By</div>
      <div class="meta-val">STU-BRAIN Team</div>
      <div class="meta-sub">Founder, STU-BRAIN AI</div>
    </div>
    <div>
      <div class="meta-label">Certificate ID</div>
      <div class="cert-id">${certResult.cert_id}</div>
      <div class="meta-sub">${new Date(certResult.issued_at).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</div>
    </div>
  </div>
  <span class="star">⭐</span><span class="star">⭐</span><span class="star">⭐</span>
  <div class="footer" style="margin-top:16px">Powered by STU-BRAIN · stu-brain.vercel.app · AI Education for India's Future</div>
</div>
</body>
</html>`;
                  const blob=new Blob([html],{type:'text/html'});
                  const url=URL.createObjectURL(blob);
                  const a=document.createElement('a');
                  a.href=url;
                  a.download=`STU-BRAIN-Certificate-Class${certResult.class_level}-${certResult.student_name.replace(/\s+/g,'-')}.html`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }} style={{...S.btnP,padding:'10px 24px',fontSize:13}}>⬇️ Download Certificate</button>
                <button onClick={()=>setCertResult(null)} style={{...S.btnS,padding:'10px 18px',fontSize:13}}>✕ Close</button>
              </div>
            </div>
          </div>
        )}

        {/* My Certificates row */}
        {certificates.length>0&&(
          <div style={{marginTop:16,marginBottom:4}}>
            <div style={{...S.fredoka,fontSize:16,marginBottom:10}}>🎓 My Certificates</div>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              {certificates.filter(c=>Number(c.class_level)===(user?.class_level||curClass)).map((c,i)=>(
                <div key={i} onClick={()=>claimCertificate(Number(c.class_level))} style={{...S.card,padding:'12px 18px',display:'flex',alignItems:'center',gap:12,border:`1px solid rgba(255,209,102,.4)`,cursor:'pointer',transition:'all .2s'}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor='#FFD166';(e.currentTarget as HTMLDivElement).style.background='rgba(255,209,102,.08)';}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor='rgba(255,209,102,.4)';(e.currentTarget as HTMLDivElement).style.background=C.card;}}>
                  <div style={{fontSize:28}}>🏆</div>
                  <div>
                    <div style={{fontSize:12,fontWeight:900,color:'#FFD166'}}>Class {c.class_level} — AI Complete</div>
                    <div style={{fontSize:10,color:C.mu,marginTop:2}}>{new Date(c.issued_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div>
                    <div style={{fontSize:10,color:C.p,fontWeight:700,marginTop:2}}>👆 Click to view &amp; download</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

            {/* ══════ LEADERBOARD MODAL ══════ */}
      {showLB&&(
        <div style={{position:'fixed',inset:0,background:'rgba(7,7,26,.92)',zIndex:2000,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'16px',overflowY:'auto'}} onClick={(e)=>{if(e.target===e.currentTarget)setShowLB(false);}}>
          <div style={{width:'100%',maxWidth:480,marginTop:16}} onClick={e=>e.stopPropagation()}>
            {/* Header */}
            <div style={{...S.card,padding:'16px 20px',marginBottom:10,display:'flex',alignItems:'center',gap:10}}>
              <div style={{fontSize:28}}>🏆</div>
              <div style={{flex:1}}>
                <div style={{...S.fredoka,fontSize:18}}>{lang==='hi'?'लीडरबोर्ड':'Leaderboard'}</div>
                <div style={{fontSize:11,color:C.mu,fontWeight:600}}>{lbClass?`Class ${lbClass} · Top 10`:`${user?.school_name} · All Classes`}</div>
              </div>
              <button onClick={()=>setShowLB(false)} style={{background:'none',border:'none',color:C.mu,fontSize:18,cursor:'pointer'}}>✕</button>
            </div>
            {/* Class selector */}
            <div style={{display:'flex',gap:6,marginBottom:10,flexWrap:'wrap'}}>
              {[null,8,9,10,11,12].map(cls=>(
                <button key={cls??'all'} onClick={()=>loadLeaderboard(cls)} style={{padding:'5px 12px',borderRadius:50,fontSize:11,fontWeight:800,border:`1px solid ${(lbClass===cls)?C.p:C.br}`,background:(lbClass===cls)?C.p:'transparent',color:(lbClass===cls)?'#fff':C.mu,cursor:'pointer'}}>
                  {cls?`Class ${cls}`:'🏫 Overall'}
                </button>
              ))}
            </div>
            {/* Leaderboard rows */}
            {leaderboard.length===0?(
              <div style={{...S.card,padding:24,textAlign:'center',color:C.mu,fontSize:13}}>No data yet. Students need to complete chapters! 📚</div>
            ):(
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {leaderboard.map((s,i)=>{
                  const isMe=s.id===user?.id;
                  const rank=i+1;
                  const medal=rank===1?'🥇':rank===2?'🥈':rank===3?'🥉':null;
                  const isTop3=rank<=3;
                  return(
                    <div key={s.id as number} style={{
                      ...S.card,padding:'14px 16px',
                      display:'flex',alignItems:'center',gap:12,
                      border:isMe?`2px solid ${C.p}`:isTop3?`1px solid rgba(255,209,102,.4)`:C.br,
                      background:rank===1?'linear-gradient(135deg,rgba(255,209,102,.12),rgba(255,159,67,.06))':rank===2?'rgba(192,192,192,.08)':rank===3?'rgba(205,127,50,.08)':isMe?'rgba(108,99,255,.08)':C.card,
                      animation:rank===1?'xpPop .4s ease':undefined,
                      transform:rank===1?'scale(1.02)':undefined,
                    }}>
                      {/* Rank */}
                      <div style={{width:32,textAlign:'center',flexShrink:0}}>
                        {medal?<span style={{fontSize:24}}>{medal}</span>:<span style={{fontSize:13,fontWeight:900,color:C.mu}}>#{rank}</span>}
                      </div>
                      {/* Avatar */}
                      <div style={{width:36,height:36,borderRadius:'50%',background:`linear-gradient(135deg,${rank===1?'#FFD166,#FF9F43':rank===2?'#C0C0C0,#A0A0A0':rank===3?'#CD7F32,#B8692A':C.p+','+C.s})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,fontWeight:800,color:'#fff',flexShrink:0}}>
                        {(s.name as string)[0]?.toUpperCase()}
                      </div>
                      {/* Name + details */}
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:800,color:rank===1?'#FFD166':isMe?C.p:C.text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                          {s.name as string}{isMe?' (You)':''}
                        </div>
                        <div style={{fontSize:10,color:C.mu,fontWeight:600}}>
                          {lbClass?`Class ${s.class_level} · Sec ${s.section||'-'}`:`Class ${s.class_level}`} · {s.chapters_done as number} chapters · {s.avg_quiz as number}% quiz
                        </div>
                      </div>
                      {/* XP */}
                      <div style={{textAlign:'right',flexShrink:0}}>
                        <div style={{fontSize:15,fontWeight:900,color:rank===1?'#FFD166':C.y}}>⭐ {s.class_xp as number}</div>
                        <div style={{fontSize:9,color:C.mu,fontWeight:600}}>XP</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div style={{height:20}}/>
          </div>
        </div>
      )}

      {/* ══════ CHALLENGES MODAL ══════ */}
      {showChallenges&&(
        <div style={{position:'fixed',inset:0,background:'rgba(7,7,26,.92)',zIndex:2000,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:16,overflowY:'auto'}} onClick={(e)=>{if(e.target===e.currentTarget)setShowChallenges(false);}}>
          <div style={{width:'100%',maxWidth:480,marginTop:16}} onClick={e=>e.stopPropagation()}>
            <div style={{...S.card,padding:'16px 20px',marginBottom:10,display:'flex',alignItems:'center',gap:10}}>
              <div style={{fontSize:28}}>⚡</div>
              <div style={{flex:1}}><div style={{...S.fredoka,fontSize:18}}>Challenges</div><div style={{fontSize:11,color:C.mu,fontWeight:600}}>Complete for bonus XP!</div></div>
              <button onClick={()=>setShowChallenges(false)} style={{background:'none',border:'none',color:C.mu,fontSize:18,cursor:'pointer'}}>✕</button>
            </div>
            {challenges.length===0?(
              <div style={{...S.card,padding:24,textAlign:'center'}}>
                <div style={{fontSize:40,marginBottom:10}}>⚡</div>
                <div style={{fontSize:14,fontWeight:700,marginBottom:6}}>{lang==='hi'?'अभी कोई Challenge नहीं':'No Challenges Yet'}</div>
                <div style={{fontSize:12,color:C.mu}}>Your teacher will post challenges soon! Check back later. 🎯</div>
              </div>
            ):(
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {challenges.map((c)=>(
                  <div key={Number(c.id)} style={{...S.card,padding:16,border:(c as Record<string,unknown>).submission_id?`1px solid rgba(67,233,123,.3)`:C.br}}>
                    <div style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:8}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:800}}>{c.title as string}</div>
                        <div style={{fontSize:11,color:C.mu,marginTop:2}}>{c.class_level?`Class ${c.class_level}`:'All Classes'}{c.due_date?` · Due ${new Date(c.due_date as string).toLocaleDateString('en-IN')}`:''}  </div>
                      </div>
                      <div style={{background:'rgba(255,209,102,.15)',border:'1px solid rgba(255,209,102,.3)',borderRadius:50,padding:'3px 10px',fontSize:11,fontWeight:800,color:C.y,flexShrink:0}}>⭐ +{c.xp_reward as number} XP</div>
                    </div>
                    <div style={{fontSize:12,color:C.text,lineHeight:1.6,marginBottom:10}}>{c.description as string}</div>
                    {(c as Record<string,unknown>).submission_id?(
                      <div style={{color:C.a,fontSize:12,fontWeight:800}}>✅ Submitted! +{Number((c as Record<string,unknown>).xp_awarded||c.xp_reward||0)} XP</div>
                    ):(
                      activeChallengeId===Number(c.id)?(
                        <div>
                          <textarea value={challengeAnswer} onChange={e=>setChallengeAnswer(e.target.value)} placeholder="Write your answer here..." style={{width:'100%',minHeight:80,padding:'8px 12px',borderRadius:10,border:`1px solid ${C.br}`,background:'rgba(255,255,255,.05)',color:C.text,fontSize:12,resize:'vertical',fontFamily:"'Nunito',sans-serif",boxSizing:'border-box'}}/>
                          <div style={{display:'flex',gap:8,marginTop:8}}>
                            <button onClick={()=>submitChallenge(Number(c.id),challengeAnswer)} style={{...S.btnP,flex:1,padding:'8px',fontSize:12}}>Submit Answer ⭐</button>
                            <button onClick={()=>setActiveChallengeId(null)} style={{...S.btnS,padding:'8px 14px',fontSize:12}}>Cancel</button>
                          </div>
                        </div>
                      ):(
                        <button onClick={()=>setActiveChallengeId(Number(c.id))} style={{...S.btnP,width:'100%',padding:'8px',fontSize:12}}>⚡ Take Challenge</button>
                      )
                    )}
                  </div>
                ))}
              </div>
            )}
            <div style={{height:20}}/>
          </div>
        </div>
      )}


      
<AiBot doubtOpen={doubtOpen} setDoubtOpen={setDoubtOpen} doubtMsgs={doubtMsgs} doubtQ={doubtQ} setDoubtQ={setDoubtQ} sendDoubt={sendDoubt} lang={lang} T={T}/>
      <Styles/>
      </div>
    </div>
  );

  // ─── TEACHER DASHBOARD ───
  if(screen==='teacher') return (
    <div style={{minHeight:'100vh'}}>{topnav}
      <div style={{maxWidth:1080,margin:'0 auto',padding:20}}>
        <div style={{...S.fredoka,fontSize:24,marginBottom:2}}>{T.teacherDashboard} 👨‍🏫</div>
        <div style={{color:C.mu,fontSize:13,fontWeight:600,marginBottom:18}}>{user?.school_name}</div>
        <div style={{display:'flex',gap:8,marginBottom:20,flexWrap:'wrap'}}>
          {[['overview','📊',T.overview],['students','👩‍🎓',T.students],['challenges','⚡','Challenges'],['assign','📋',T.assignHW],['reports','📄',T.reports]].map(([id,icon,lbl])=>(
            <button key={id} onClick={()=>setTTab(id)} style={{padding:'7px 16px',borderRadius:50,fontSize:12,fontWeight:800,border:`1px solid ${tTab===id?C.p:C.br}`,background:tTab===id?C.p:'transparent',color:tTab===id?'#fff':C.mu,cursor:'pointer',fontFamily:"'Nunito',sans-serif",transition:'all .2s'}}>{icon} {lbl}</button>
          ))}
        </div>

        {tTab==='overview'&&(
          <div>
            {/* Real stats from DB */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:10,marginBottom:18}}>
              {[
                {v:students.length||0,l:T.totalStudents,up:true,col:C.p},
                {v:students.length>0?Math.round(students.reduce((a,s)=>a+(Number(s.chapters_done)||0),0)/students.length*10):0,l:lang==='hi'?'औसत Chapters Done':'Avg Chapters Done',up:true,col:C.a},
                {v:students.length>0?Math.round(students.reduce((a,s)=>a+(Number(s.avg_quiz)||0),0)/students.length)+'%':'-',l:T.avgQuizScore,up:true,col:C.sky},
                {v:students.filter(s=>{const d=new Date(s.last_active as string);const today=new Date();return(today.getTime()-d.getTime())<86400000*2;}).length,l:T.activeToday,up:false,col:C.y}
              ].map((s,i)=>(
                <div key={i} style={{...S.card,padding:16}}>
                  <div style={{...S.fredoka,fontSize:26,color:s.col as string}}>{s.v}</div>
                  <div style={{fontSize:11,color:C.mu,fontWeight:700,marginTop:2}}>{s.l as string}</div>
                  <div style={{fontSize:10,fontWeight:800,marginTop:4,color:(s.up as boolean)?C.a:C.s}}>{(s.up as boolean)?'↑ Live data':'↓ Live data'}</div>
                </div>
              ))}
            </div>

            {/* Class-wise performance from DB */}
            {classStats.length>0&&(
              <>
                <div style={{...S.fredoka,fontSize:16,marginBottom:10}}>📊 {lang==='hi'?'Class-wise Performance':'Class-wise Performance'}</div>
                <div style={{...S.card,padding:16,marginBottom:18,overflowX:'auto'}}>
                  <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
                    <thead><tr style={{borderBottom:`1px solid ${C.br}`}}>
                      {['Class','Students','Avg Progress','Avg Quiz'].map(h=><th key={h} style={{padding:'6px 10px',textAlign:'left',fontSize:10,fontWeight:800,textTransform:'uppercase',color:C.mu}}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {(classStats as {class_level:number;student_count:number;avg_progress:number;avg_quiz:number}[]).map((cs,i)=>(
                        <tr key={i} style={{borderTop:`1px solid rgba(108,99,255,.12)`}}>
                          <td style={{padding:'8px 10px',fontWeight:800}}>Class {cs.class_level}</td>
                          <td style={{padding:'8px 10px'}}>{cs.student_count}</td>
                          <td style={{padding:'8px 10px'}}>
                            <div style={{display:'flex',alignItems:'center',gap:7}}>
                              <div style={{width:60,height:5,background:'rgba(255,255,255,.08)',borderRadius:3,overflow:'hidden'}}>
                                <div style={{height:'100%',width:`${cs.avg_progress}%`,background:`linear-gradient(90deg,${C.p},${C.a})`,borderRadius:3}}/>
                              </div>
                              <span style={{fontSize:11,fontWeight:700}}>{cs.avg_progress}%</span>
                            </div>
                          </td>
                          <td style={{padding:'8px 10px',fontWeight:700,color:cs.avg_quiz>=70?C.a:cs.avg_quiz>=50?C.y:C.s}}>{cs.avg_quiz}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <div style={{...S.fredoka,fontSize:16,marginBottom:10}}>⚠️ {lang==='hi'?'ध्यान चाहिए (quiz &lt; 60%)':'Needs Attention (quiz &lt; 60%)'}</div>
            <div style={{...S.card,padding:18}}>
              {students.filter(s=>(Number(s.avg_quiz)||0)<60).length===0?(
                <div style={{fontSize:12,color:C.a,fontWeight:700}}>🎉 {lang==='hi'?'सभी छात्र ठीक कर रहे हैं!':'All students performing well!'}</div>
              ):(
                students.filter(s=>(Number(s.avg_quiz)||0)<60).slice(0,6).map((s,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:10,marginBottom:i<5?10:0,padding:'8px 10px',background:C.card2,borderRadius:10,border:`1px solid rgba(255,101,132,.2)`}}>
                    <div style={{fontSize:20}}>⚠️</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:800}}>{s.name as string}</div>
                      <div style={{fontSize:10,color:C.mu}}>Class {s.class_level as number} · Quiz avg: {s.avg_quiz as number}% · XP: {s.total_xp as number}</div>
                    </div>
                    <span style={{fontSize:10,fontWeight:800,padding:'2px 8px',borderRadius:20,background:'rgba(255,101,132,.12)',color:C.s}}>Needs Help</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {tTab==='students'&&(
          <div>
            {/* Top controls */}
            <div style={{display:'flex',gap:10,marginBottom:14,flexWrap:'wrap',alignItems:'center'}}>
              {/* Class filter pills */}
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                <button onClick={()=>{setStudentClassFilter(null);loadAllStudents(undefined,studentSearch);}} style={{padding:'6px 14px',borderRadius:50,fontSize:12,fontWeight:800,border:`1px solid ${!studentClassFilter?C.p:C.br}`,background:!studentClassFilter?C.p:'transparent',color:!studentClassFilter?'#fff':C.mu,cursor:'pointer',fontFamily:"'Nunito',sans-serif"}}>All</button>
                {[3,4,5,6,7,8,9,10,11,12].map(cls=>(
                  <button key={cls} onClick={()=>{setStudentClassFilter(cls);loadAllStudents(cls,studentSearch);}} style={{padding:'6px 14px',borderRadius:50,fontSize:12,fontWeight:800,border:`1px solid ${studentClassFilter===cls?C.p:C.br}`,background:studentClassFilter===cls?C.p:'transparent',color:studentClassFilter===cls?'#fff':C.mu,cursor:'pointer',fontFamily:"'Nunito',sans-serif"}}>
                    Class {cls}
                  </button>
                ))}
              </div>
              {/* Search */}
              <input style={{...S.inp,maxWidth:220,padding:'7px 14px',borderRadius:50,fontSize:12}} placeholder="🔍 Search name or ID..." value={studentSearch} onChange={e=>{setStudentSearch(e.target.value);loadAllStudents(studentClassFilter||undefined,e.target.value);}}/>
              <span style={{fontSize:12,color:C.mu,fontWeight:600}}>{(allStudents.length?allStudents:students).length} students</span>
              <button onClick={()=>loadAllStudents(studentClassFilter||undefined,studentSearch)} style={{...S.btnS,padding:'6px 12px',fontSize:11,marginLeft:'auto'}}>🔄 Refresh</button>
            </div>
            {/* Students table */}
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',background:C.card,border:`1px solid ${C.br}`,borderRadius:16,overflow:'hidden',fontSize:12}}>
                <thead><tr style={{background:'rgba(108,99,255,.12)'}}>
                  {['Student','Student ID','Class','Section','Chapters','XP','Quiz','Last Active','Actions'].map(h=><th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:10,fontWeight:800,letterSpacing:.8,textTransform:'uppercase',color:C.mu,whiteSpace:'nowrap'}}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {(allStudents.length?allStudents:students).length===0?(
                    <tr><td colSpan={9} style={{padding:30,textAlign:'center',color:C.mu,fontSize:13}}>
                      {studentSearch||studentClassFilter?'No students match your search.':'No students enrolled yet. Use CSV Enroll to add students.'}
                    </td></tr>
                  ):(allStudents.length?allStudents:students).map((s,i)=>{
                    const xp=Number(s.total_xp)||0;
                    const quiz=Number(s.avg_quiz)||0;
                    const chaps=Number(s.chapters_done)||0;
                    const lastActive=s.last_active?new Date(s.last_active as string):null;
                    const daysAgo=lastActive?Math.floor((Date.now()-lastActive.getTime())/86400000):99;
                    return(
                      <tr key={i} style={{borderTop:`1px solid rgba(108,99,255,.12)`}}>
                        <td style={{padding:'9px 12px',fontWeight:800}}>{s.name as string}</td>
                        <td style={{padding:'9px 12px',fontFamily:'monospace',fontSize:11,color:C.y,fontWeight:700}}>{s.student_id as string}</td>
                        <td style={{padding:'9px 12px',fontWeight:700}}>Class {s.class_level as number}</td>
                        <td style={{padding:'9px 12px',color:C.mu}}>{s.section as string||'-'}</td>
                        <td style={{padding:'9px 12px',color:chaps>0?C.a:C.mu,fontWeight:700}}>📚 {chaps}</td>
                        <td style={{padding:'9px 12px',color:C.y,fontWeight:700}}>⭐ {xp}</td>
                        <td style={{padding:'9px 12px'}}>
                          <div style={{display:'flex',alignItems:'center',gap:5}}>
                            <div style={{width:36,height:4,background:'rgba(255,255,255,.08)',borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',width:`${quiz}%`,background:quiz>=70?C.a:quiz>=50?C.y:C.s,borderRadius:2}}/></div>
                            <span style={{fontSize:11,fontWeight:700,color:quiz>=70?C.a:quiz>=50?C.y:C.s}}>{quiz}%</span>
                          </div>
                        </td>
                        <td style={{padding:'9px 12px',fontSize:11,color:daysAgo===0?C.a:daysAgo<=3?C.y:C.mu,whiteSpace:'nowrap'}}>{daysAgo===0?'Today':daysAgo===1?'Yesterday':`${daysAgo}d ago`}</td>
                        <td style={{padding:'9px 12px'}}>
                          <div style={{display:'flex',gap:5}}>
                            <button onClick={()=>setEditStudent({...s})} style={{background:'rgba(56,191,255,.2)',color:'#38BFFF',border:'1px solid rgba(56,191,255,.4)',borderRadius:6,padding:'3px 8px',fontSize:10,fontWeight:800,cursor:'pointer'}}>✏️</button>
                            <button onClick={()=>resetPassword(s.id as number,'student: '+s.name)} style={{background:'rgba(255,209,102,.15)',color:C.y,border:`1px solid rgba(255,209,102,.3)`,borderRadius:6,padding:'3px 8px',fontSize:10,fontWeight:800,cursor:'pointer'}}>🔑</button>
                            <button onClick={()=>{if(confirm('Remove student '+s.name+'?'))fetch('/api/admin/students',{method:'DELETE',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({student_id:s.id})}).then(()=>{loadAllStudents(studentClassFilter||undefined,studentSearch);});}} style={{background:'rgba(255,101,132,.15)',color:C.s,border:`1px solid rgba(255,101,132,.3)`,borderRadius:6,padding:'3px 8px',fontSize:10,fontWeight:800,cursor:'pointer'}}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tTab==='teachers'&&(
          <div>
            {/* Credentials card shown after adding teacher */}
            {teacherResult2&&(
              <div style={{background:'rgba(67,233,123,.08)',border:'1px solid rgba(67,233,123,.4)',borderRadius:16,padding:18,marginBottom:16}}>
                <div style={{fontSize:14,fontWeight:900,color:C.a,marginBottom:12}}>✅ Teacher Added! Share these login credentials:</div>
                <div style={{background:'#0D0D2B',borderRadius:12,padding:14,marginBottom:12,fontFamily:'monospace'}}>
                  <div style={{marginBottom:8}}><div style={{fontSize:10,color:C.mu}}>TEACHER NAME</div><div style={{color:C.text,fontWeight:800,fontSize:15}}>{teacherResult2.name}</div></div>
                  <div style={{marginBottom:8}}><div style={{fontSize:10,color:C.mu}}>TEACHER ID</div><div style={{color:C.y,fontWeight:800,fontSize:14}}>{teacherResult2.teacher_id}</div></div>
                  <div style={{marginBottom:8}}><div style={{fontSize:10,color:C.mu}}>LOGIN EMAIL</div><div style={{color:C.sky,fontWeight:800,fontSize:14}}>{teacherResult2.email}</div></div>
                  <div><div style={{fontSize:10,color:C.mu}}>PASSWORD</div><div style={{color:C.s,fontWeight:900,fontSize:18,letterSpacing:2}}>{teacherResult2.password}</div></div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button onClick={()=>{navigator.clipboard.writeText('STU-BRAIN Teacher Login\nName: '+teacherResult2.name+'\nEmail: '+teacherResult2.email+'\nPassword: '+teacherResult2.password+'\nURL: https://stu-brain.netlify.app/app');alert('✅ Copied!');}} style={{...S.btnP,padding:'7px 16px',fontSize:12}}>📋 Copy Credentials</button>
                  <button onClick={()=>setTeacherResult2(null)} style={{...S.btnS,padding:'7px 14px',fontSize:12}}>✕ Close</button>
                </div>
              </div>
            )}

            {/* Add Teacher Form */}
            <div style={{...S.card,padding:18,marginBottom:14}}>
              <div style={{...S.fredoka,fontSize:16,marginBottom:14}}>👨‍🏫 {lang==='hi'?'शिक्षक जोड़ें':'Add New Teacher'}</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:12,marginBottom:12}}>
                <div>
                  <label style={{fontSize:10,fontWeight:800,color:C.mu,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:5}}>{lang==='hi'?'नाम *':'Full Name *'}</label>
                  <input style={S.inp} value={newTeacher.name} onChange={e=>setNewTeacher(t=>({...t,name:e.target.value}))} placeholder="Ms. Anjali Sharma"/>
                </div>
                <div>
                  <label style={{fontSize:10,fontWeight:800,color:C.mu,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:5}}>Email *</label>
                  <input style={S.inp} value={newTeacher.email} onChange={e=>setNewTeacher(t=>({...t,email:e.target.value}))} placeholder="anjali@school.edu.in"/>
                </div>
                <div>
                  <label style={{fontSize:10,fontWeight:800,color:C.mu,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:5}}>Phone</label>
                  <input style={S.inp} value={newTeacher.phone} onChange={e=>setNewTeacher(t=>({...t,phone:e.target.value}))} placeholder="+91 98765 43210"/>
                </div>
              </div>
              <div style={{fontSize:11,color:C.mu,marginBottom:10}}>💡 Teacher ID and password will be auto-generated. Teacher can login immediately after adding.</div>
              <button onClick={addTeacher} style={{...S.btnP,padding:'9px 22px',fontSize:13}}>👨‍🏫 Add Teacher</button>
              {teacherResult&&!teacherResult2&&<div style={{marginTop:10,fontSize:12,color:teacherResult.startsWith('✅')?C.a:C.s,fontWeight:700}}>{teacherResult}</div>}
            </div>

            {/* Teachers List */}
            <div style={{...S.card,overflow:'hidden'}}>
              <div style={{padding:'12px 16px',borderBottom:`1px solid ${C.br}`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{...S.fredoka,fontSize:15}}>{lang==='hi'?'सभी शिक्षक':'All Teachers'} ({teachers.length})</div>
                <button onClick={()=>token&&loadTeacher(token)} style={{...S.btnS,padding:'5px 12px',fontSize:11}}>🔄 Refresh</button>
              </div>
              {teachers.length===0?(
                <div style={{padding:30,textAlign:'center',color:C.mu,fontSize:13}}>
                  <div style={{fontSize:32,marginBottom:8}}>👨‍🏫</div>
                  No teachers yet. Add one above!
                </div>
              ):(
                <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
                    <thead><tr style={{background:'rgba(108,99,255,.1)'}}>
                      {['Name','Email','Teacher ID','Phone','Assignments','Actions'].map(h=>(
                        <th key={h} style={{padding:'9px 12px',textAlign:'left',fontSize:10,fontWeight:800,textTransform:'uppercase',color:C.mu,whiteSpace:'nowrap'}}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {(teachers as {id:number;name:string;email:string;teacher_id:string;phone:string;assignments_given:number}[]).map((t,i)=>(
                        <tr key={i} style={{borderTop:`1px solid rgba(108,99,255,.1)`}}>
                          <td style={{padding:'9px 12px',fontWeight:800}}>{t.name}</td>
                          <td style={{padding:'9px 12px',fontFamily:'monospace',fontSize:11,color:C.sky}}>{t.email}</td>
                          <td style={{padding:'9px 12px',fontFamily:'monospace',fontSize:11,color:C.y,fontWeight:700}}>{t.teacher_id}</td>
                          <td style={{padding:'9px 12px',color:C.mu}}>{t.phone||'—'}</td>
                          <td style={{padding:'9px 12px',color:C.a,fontWeight:700}}>📋 {t.assignments_given||0}</td>
                          <td style={{padding:'9px 12px'}}>
                            <div style={{display:'flex',gap:5}}>
                              <button onClick={()=>setEditTeacher({...t})} style={{background:'rgba(56,191,255,.2)',color:'#38BFFF',border:'1px solid rgba(56,191,255,.4)',borderRadius:6,padding:'3px 8px',fontSize:10,fontWeight:800,cursor:'pointer'}}>✏️ Edit</button>
                              <button onClick={()=>resetPassword(t.id,'teacher: '+t.name)} style={{background:'rgba(255,209,102,.15)',color:C.y,border:`1px solid rgba(255,209,102,.3)`,borderRadius:6,padding:'3px 8px',fontSize:10,fontWeight:800,cursor:'pointer'}}>🔑 Pwd</button>
                              <button onClick={()=>{if(confirm('Remove teacher '+t.name+'? This cannot be undone.'))fetch('/api/admin/teachers',{method:'DELETE',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({teacher_id:t.id})}).then(()=>{token&&loadTeacher(token);token&&loadAdmin(token);});}} style={{background:'rgba(255,101,132,.15)',color:C.s,border:`1px solid rgba(255,101,132,.3)`,borderRadius:6,padding:'3px 8px',fontSize:10,fontWeight:800,cursor:'pointer'}}>🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {tTab==='assign'&&(
          <div>
            <div style={{...S.card,padding:18,marginBottom:14}}>
              <div style={{...S.fredoka,fontSize:16,marginBottom:14}}>📋 {T.assignHW}</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
                <div>
                  <label style={{fontSize:10,textTransform:'uppercase',letterSpacing:1,fontWeight:800,color:C.mu,display:'block',marginBottom:5}}>{lang==='hi'?'कक्षा':'Class'}</label>
                  <select style={{...S.inp,padding:'9px 12px'}} value={hwForm.class_level} onChange={e=>setHwForm(f=>({...f,class_level:parseInt(e.target.value)}))}>
                    {[3,4,5,6,7,8,9,10,11,12].map(c=><option key={c} value={c}>Class {c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{fontSize:10,textTransform:'uppercase',letterSpacing:1,fontWeight:800,color:C.mu,display:'block',marginBottom:5}}>{lang==='hi'?'शीर्षक':'Title'}</label>
                  <input style={S.inp} value={hwForm.title} onChange={e=>setHwForm(f=>({...f,title:e.target.value}))} placeholder={lang==='hi'?'गृहकार्य शीर्षक':'Homework title'}/>
                </div>
                <div>
                  <label style={{fontSize:10,textTransform:'uppercase',letterSpacing:1,fontWeight:800,color:C.mu,display:'block',marginBottom:5}}>{lang==='hi'?'नियत तारीख':'Due Date'}</label>
                  <input style={S.inp} type="date" value={hwForm.due_date} onChange={e=>setHwForm(f=>({...f,due_date:e.target.value}))}/>
                </div>
                <div>
                  <label style={{fontSize:10,textTransform:'uppercase',letterSpacing:1,fontWeight:800,color:C.mu,display:'block',marginBottom:5}}>{lang==='hi'?'निर्देश':'Instructions'}</label>
                  <input style={S.inp} value={hwForm.instructions} onChange={e=>setHwForm(f=>({...f,instructions:e.target.value}))} placeholder="Complete slides + quiz"/>
                </div>
              </div>
              <button onClick={submitHW} style={{...S.btnP,padding:'9px 22px',fontSize:13}}>📤 {lang==='hi'?'सौंपें':'Assign'}</button>
            </div>
            {assignments.length>0&&<div style={{...S.card,padding:16}}>
              <div style={{...S.fredoka,fontSize:14,marginBottom:12}}>{lang==='hi'?'सक्रिय असाइनमेंट':'Active Assignments'}</div>
              {(assignments as {title:string;class_level:number;due_date:string}[]).map((a,i)=>(
                <div key={i} style={{background:C.card2,border:`1px solid rgba(108,99,255,.2)`,borderRadius:10,padding:'10px 14px',marginBottom:8,display:'flex',alignItems:'center',gap:10}}>
                  <div style={{flex:1}}><div style={{fontSize:12,fontWeight:800}}>{a.title}</div><div style={{fontSize:10,color:C.mu}}>Class {a.class_level} · Due: {a.due_date}</div></div>
                  <span style={{fontSize:10,fontWeight:800,padding:'2px 8px',borderRadius:20,background:'rgba(255,209,102,.12)',color:C.y}}>Active</span>
                </div>
              ))}
            </div>}
          </div>
        )}

        {tTab==='challenges'&&(
          <div>
            {/* Create / Edit form */}
            <div style={{...S.card,padding:18,marginBottom:14}}>
              <div style={{...S.fredoka,fontSize:16,marginBottom:14}}>⚡ {editChallenge?'Edit Challenge':'Create Challenge'}</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr',gap:10}}>
                <div>
                  <label style={{fontSize:10,textTransform:'uppercase',letterSpacing:1,fontWeight:800,color:C.mu,display:'block',marginBottom:5}}>Challenge Title *</label>
                  <input style={S.inp} value={(editChallenge?.title||newChallenge.title) as string} placeholder="e.g. Design a chatbot for Jaipur schools"
                    onChange={e=>editChallenge?setEditChallenge({...editChallenge,title:e.target.value}):setNewChallenge(n=>({...n,title:e.target.value}))}/>
                </div>
                <div>
                  <label style={{fontSize:10,textTransform:'uppercase',letterSpacing:1,fontWeight:800,color:C.mu,display:'block',marginBottom:5}}>Description *</label>
                  <textarea style={{...S.inp,minHeight:70,resize:'vertical'}} value={(editChallenge?.description||newChallenge.description) as string} placeholder="Explain what students need to do..."
                    onChange={e=>editChallenge?setEditChallenge({...editChallenge,description:e.target.value}):setNewChallenge(n=>({...n,description:e.target.value}))}/>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
                  <div>
                    <label style={{fontSize:10,textTransform:'uppercase',letterSpacing:1,fontWeight:800,color:C.mu,display:'block',marginBottom:5}}>Class</label>
                    <select style={{...S.inp,padding:'9px 12px'}} value={(editChallenge?.class_level||newChallenge.class_level) as string}
                      onChange={e=>editChallenge?setEditChallenge({...editChallenge,class_level:e.target.value}):setNewChallenge(n=>({...n,class_level:e.target.value}))}>
                      <option value="">All Classes</option>
                      {[8,9,10,11,12].map(c=><option key={c} value={c}>Class {c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{fontSize:10,textTransform:'uppercase',letterSpacing:1,fontWeight:800,color:C.mu,display:'block',marginBottom:5}}>XP Reward ⭐</label>
                    <input type="number" style={S.inp} value={(editChallenge?.xp_reward||newChallenge.xp_reward) as number} min={10} max={500}
                      onChange={e=>editChallenge?setEditChallenge({...editChallenge,xp_reward:parseInt(e.target.value)}):setNewChallenge(n=>({...n,xp_reward:parseInt(e.target.value)}))}/>
                  </div>
                  <div>
                    <label style={{fontSize:10,textTransform:'uppercase',letterSpacing:1,fontWeight:800,color:C.mu,display:'block',marginBottom:5}}>Due Date</label>
                    <input type="date" style={S.inp} value={(editChallenge?.due_date||newChallenge.due_date) as string}
                      onChange={e=>editChallenge?setEditChallenge({...editChallenge,due_date:e.target.value}):setNewChallenge(n=>({...n,due_date:e.target.value}))}/>
                  </div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button onClick={editChallenge?updateChallenge:createChallenge} style={{...S.btnP,padding:'9px 22px',fontSize:13,flex:1}}>{editChallenge?'💾 Save Changes':'🚀 Post Challenge'}</button>
                  {editChallenge&&<button onClick={()=>setEditChallenge(null)} style={{...S.btnS,padding:'9px 16px',fontSize:13}}>Cancel</button>}
                </div>
              </div>
            </div>
            {/* Existing challenges */}
            <div style={{...S.fredoka,fontSize:14,marginBottom:10,color:C.mu}}>Active Challenges ({challenges.length})</div>
            {challenges.length===0?(
              <div style={{...S.card,padding:20,textAlign:'center',color:C.mu,fontSize:13}}>No challenges yet. Create one above! ⚡</div>
            ):(
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {challenges.map(c=>(
                  <div key={Number(c.id)} style={{...S.card,padding:14}}>
                    <div style={{display:'flex',alignItems:'flex-start',gap:10}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:800}}>{c.title as string}</div>
                        <div style={{fontSize:11,color:C.mu,marginTop:2}}>{c.class_level?`Class ${c.class_level}`:'All'} · ⭐ {c.xp_reward as number} XP{c.due_date?` · Due ${new Date(c.due_date as string).toLocaleDateString('en-IN')}`:''}</div>
                        <div style={{fontSize:11,color:C.text,marginTop:4,lineHeight:1.5}}>{c.description as string}</div>
                      </div>
                      <div style={{display:'flex',gap:6,flexShrink:0}}>
                        <button onClick={()=>setEditChallenge({...c})} style={{background:'rgba(108,99,255,.15)',color:C.p,border:`1px solid rgba(108,99,255,.3)`,borderRadius:6,padding:'4px 10px',fontSize:10,fontWeight:800,cursor:'pointer'}}>✏️ Edit</button>
                        <button onClick={()=>{if(confirm('Delete this challenge?'))fetch('/api/challenges',{method:'DELETE',headers:{'Content-Type':'application/json',authorization:`Bearer ${token||''}`},body:JSON.stringify({id:c.id})}).then(()=>loadChallenges());}} style={{background:'rgba(255,101,132,.15)',color:C.s,border:`1px solid rgba(255,101,132,.3)`,borderRadius:6,padding:'4px 10px',fontSize:10,fontWeight:800,cursor:'pointer'}}>🗑️</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tTab==='reports'&&(
          <div style={{...S.card,padding:18}}>
            <div style={{...S.fredoka,fontSize:16,marginBottom:14}}>📄 {T.reports}</div>
            {[{i:'📊',t:lang==='hi'?'पूर्ण कक्षा रिपोर्ट':'Full Class Report',s:'All students · Progress + Quiz + XP'},{i:'📅',t:lang==='hi'?'मासिक सारांश':'Monthly Summary',s:'For parent-teacher meetings'},{i:'👤',t:lang==='hi'?'व्यक्तिगत रिपोर्ट':'Individual Report',s:'Chapter-wise breakdown'}].map((r,i)=>(
              <div key={i} style={{background:C.card2,border:`1px solid rgba(108,99,255,.2)`,borderRadius:12,padding:14,display:'flex',alignItems:'center',gap:12,marginBottom:i<2?10:0}}>
                <div style={{fontSize:22}}>{r.i}</div>
                <div style={{flex:1}}><div style={{fontSize:13,fontWeight:800}}>{r.t}</div><div style={{fontSize:11,color:C.mu}}>{r.s}</div></div>
                <button style={{...S.btnP,padding:'7px 14px',fontSize:12}} onClick={()=>alert(lang==='hi'?'📄 PDF तैयार!':'📄 PDF generated!')}>⬇️ PDF</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Styles/>
    </div>
  );

  // ─── SUPERADMIN PANEL ───
  if(screen==='superadmin') {
    const C2='#16183A', C3='#1E2050', SP='#FF6584', A='#43E97B', Y='#FFD166', MU='#9090BB'; const P='#6C63FF';
    return (
    <div style={{minHeight:'100vh',background:'#0D0D2B',color:'#F0F0FF',fontFamily:"'Nunito',sans-serif"}}>
      {topnav}
      <div style={{maxWidth:1200,margin:'0 auto',padding:20}}>
        {/* Header */}
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:6}}>
          <div style={{fontSize:32}}>👑</div>
          <div>
            <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:26,background:`linear-gradient(90deg,${P},${S})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Super Admin Panel</div>
            <div style={{fontSize:12,color:MU,fontWeight:600}}>STU-BRAIN Owner Dashboard</div>
          </div>
          <button onClick={()=>token&&loadSuperAdmin(token)} style={{marginLeft:'auto',...S.btnS,padding:'6px 14px',fontSize:11}}>🔄 Refresh</button>
        </div>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:10,marginBottom:20}}>
          {[
            {v:saStats?.total_schools as number||0, l:'Total Schools', col:'#6C63FF', em:'🏫'},
            {v:saStats?.unlocked_schools as number||0, l:'Active Schools', col:'#43E97B', em:'✅'},
            {v:(saStats?.total_schools as number||0)-(saStats?.unlocked_schools as number||0), l:'Pending Payment', col:'#FFD166', em:'⏳'},
            {v:saStats?.total_students as number||0, l:'Total Students', col:'#38BFFF', em:'🎓'},
            {v:(saStats?.active_schools as number||0), l:'Paying Schools', col:'#FF6584', em:'💳'},
          ].map((s,i)=>(
            <div key={i} style={{background:C2,border:`1px solid rgba(108,99,255,.25)`,borderRadius:16,padding:14,textAlign:'center'}}>
              <div style={{fontSize:24,marginBottom:4}}>{s.em}</div>
              <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:22,color:s.col as string}}>{String(s.v)}</div>
              <div style={{fontSize:10,color:MU,fontWeight:700}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:8,marginBottom:20,flexWrap:'wrap'}}>
          {[['schools','🏫','All Schools'],['add','➕','Add School'],['enquiries','📩','Enquiries']].map(([id,em,lbl])=>(
            <button key={id} onClick={()=>setSaTab(id)} style={{padding:'7px 16px',borderRadius:50,fontSize:12,fontWeight:800,border:`1px solid ${saTab===id?'#6C63FF':'rgba(108,99,255,.25)'}`,background:saTab===id?'#6C63FF':'transparent',color:saTab===id?'#fff':MU,cursor:'pointer',fontFamily:"'Nunito',sans-serif"}}>
              {em} {lbl}
            </button>
          ))}
        </div>

        {/* Schools List */}
        {saTab==='schools'&&(
          <div>
            <div style={{overflowX:'auto'}}>
              {allSchools.length===0?(
                <div style={{background:C2,border:`1px solid rgba(108,99,255,.25)`,borderRadius:16,padding:40,textAlign:'center',color:MU}}>
                  <div style={{fontSize:40,marginBottom:12}}>🏫</div>
                  <div style={{fontSize:16,fontWeight:700,marginBottom:8}}>No schools yet</div>
                  <div style={{fontSize:13}}>Click "Add School" to register your first school!</div>
                </div>
              ):(
              <table style={{width:'100%',borderCollapse:'collapse',background:C2,border:`1px solid rgba(108,99,255,.25)`,borderRadius:16,overflow:'hidden',fontSize:12}}>
                <thead><tr style={{background:'rgba(108,99,255,.15)'}}>
                  {['School','Admin Email','City','Students','Plan','Status','Revenue','Actions'].map(h=>(
                    <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:10,fontWeight:800,textTransform:'uppercase',color:MU}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {(allSchools as {id:number;name:string;admin_email:string;city:string;plan:string;is_locked:boolean;is_active:boolean;student_count:number;payment_amount:number|null;trial_expires:string;license_expires:string}[]).map((sc,i)=>(
                    <tr key={i} style={{borderTop:'1px solid rgba(108,99,255,.12)'}}>
                      <td style={{padding:'9px 12px',fontWeight:800}}>{sc.name}</td>
                      <td style={{padding:'9px 12px',color:MU,fontFamily:'monospace',fontSize:11}}>{sc.admin_email}</td>
                      <td style={{padding:'9px 12px',color:MU}}>{sc.city||'-'}</td>
                      <td style={{padding:'9px 12px',color:A,fontWeight:700}}>👥 {sc.student_count||0}</td>
                      <td style={{padding:'9px 12px'}}>
                        <span style={{fontSize:10,fontWeight:800,padding:'2px 8px',borderRadius:20,background:sc.plan==='annual'?'rgba(108,99,255,.2)':sc.plan==='trial'?'rgba(255,209,102,.15)':'rgba(56,191,255,.15)',color:sc.plan==='annual'?P:sc.plan==='trial'?Y:'#38BFFF'}}>{sc.plan||'trial'}</span>
                      </td>
                      <td style={{padding:'9px 12px'}}>
                        <span style={{fontSize:10,fontWeight:800,padding:'2px 8px',borderRadius:20,...(!sc.is_locked&&sc.is_active?{background:'rgba(67,233,123,.15)',color:A}:sc.is_locked?{background:'rgba(255,101,132,.12)',color:SP}:{background:'rgba(255,209,102,.12)',color:Y})}}>
                          {!sc.is_locked&&sc.is_active?'🟢 Active':sc.is_locked?'🔴 Locked':'⏳ Pending'}
                        </span>
                      </td>
                      <td style={{padding:'9px 12px',color:Y,fontWeight:700}}>{sc.payment_amount?'₹'+Number(sc.payment_amount).toLocaleString():'-'}</td>
                      <td style={{padding:'9px 12px'}}>
                        <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                          {sc.is_locked?(
                            <button onClick={()=>{const amt=prompt('Payment received (₹):');if(amt)unlockSchool(sc.id,'unlock','annual',parseFloat(amt));}} style={{background:'#43E97B',color:'#0D0D2B',border:'none',borderRadius:6,padding:'3px 8px',fontSize:10,fontWeight:800,cursor:'pointer'}}>🔓 Unlock</button>
                          ):(
                            <button onClick={()=>{if(confirm('Lock this school?'))unlockSchool(sc.id,'lock');}} style={{background:'#FF6584',color:'#fff',border:'none',borderRadius:6,padding:'3px 8px',fontSize:10,fontWeight:800,cursor:'pointer'}}>🔒 Lock</button>
                          )}
                          <button onClick={()=>setEditSchool({...sc})} style={{background:'rgba(56,191,255,.25)',color:'#38BFFF',border:'1px solid rgba(56,191,255,.4)',borderRadius:6,padding:'3px 8px',fontSize:10,fontWeight:800,cursor:'pointer'}}>✏️ Edit</button>
                          <button onClick={()=>{const p=prompt('New password for '+sc.name+' admin:');if(p&&p.length>=4){fetch('/api/admin/reset-password',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({school_id:sc.id,new_password:p})}).then(r=>r.json()).then(d=>alert(d.success?'✅ Password changed for admin: '+d.updated?.email:'❌ '+(d.error||'Error')));} else if(p)alert('Min 4 chars');}} style={{background:'rgba(255,209,102,.2)',color:'#FFD166',border:'1px solid rgba(255,209,102,.4)',borderRadius:6,padding:'3px 8px',fontSize:10,fontWeight:800,cursor:'pointer'}}>🔑 Pwd</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )}
            </div>
          </div>
        )}

        {/* Add New School */}
        {saTab==='add'&&(
          <div style={{background:C2,border:`1px solid rgba(108,99,255,.25)`,borderRadius:18,padding:24,maxWidth:620}}>
            <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:20,marginBottom:16}}>🏫 Register New School</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
              {[
                {l:'School Name *',k:'name',ph:'Delhi Public School'},
                {l:'Admin Email *',k:'admin_email',ph:'principal@dps.edu.in'},
                {l:'City',k:'city',ph:'Delhi'},
                {l:'State',k:'state',ph:'Delhi'},
                {l:'Phone',k:'phone',ph:'+91 98765 43210'},
              ].map(({l,k,ph})=>(
                <div key={k}>
                  <label style={{fontSize:10,fontWeight:800,color:MU,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:4}}>{l}</label>
                  <input style={{width:'100%',padding:'9px 12px',borderRadius:10,border:`1px solid rgba(108,99,255,.25)`,background:'rgba(255,255,255,.05)',color:'#F0F0FF',fontSize:13,fontWeight:600,outline:'none',boxSizing:'border-box' as const,fontFamily:"'Nunito',sans-serif"}} placeholder={ph}
                    value={newSchool[k as keyof typeof newSchool] as string}
                    onChange={e=>setNewSchool(s=>({...s,[k]:e.target.value}))}/>
                </div>
              ))}
              <div>
                <label style={{fontSize:10,fontWeight:800,color:MU,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:4}}>Plan</label>
                <select style={{width:'100%',padding:'9px 12px',borderRadius:10,border:`1px solid rgba(108,99,255,.25)`,background:'#1E2050',color:'#F0F0FF',fontSize:13,fontWeight:600,outline:'none',fontFamily:"'Nunito',sans-serif"}} value={newSchool.plan} onChange={e=>setNewSchool(s=>({...s,plan:e.target.value}))}>
                  <option value="trial">🕐 Free Trial — 3 days, up to 50 students</option>
                  <option value="starter">🌱 Starter Plan — up to 250 students</option>
                  <option value="medium">⚡ Medium Plan — up to 600 students + School Logo</option>
                  <option value="unlimited">🚀 Unlimited Plan — Unlimited students + All features</option>
                </select>
              </div>
            </div>
            <div style={{background:'rgba(255,209,102,.08)',border:'1px solid rgba(255,209,102,.3)',borderRadius:10,padding:12,marginBottom:14,fontSize:12,color:'#FFD166',fontWeight:600}}>
              ⚠️ School will be <strong>LOCKED by default</strong>. After you receive payment, click 🔓 Unlock in the schools list to activate their access.
            </div>
            {schoolResult&&(
              <div style={{background:'rgba(67,233,123,.1)',border:'1px solid rgba(67,233,123,.4)',borderRadius:14,padding:18,marginBottom:14}}>
                <div style={{fontSize:14,fontWeight:900,color:'#43E97B',marginBottom:12}}>✅ School Registered! Share these credentials:</div>
                <div style={{background:'#0D0D2B',borderRadius:10,padding:14,marginBottom:10,fontFamily:'monospace'}}>
                  <div style={{fontSize:13,marginBottom:6}}><span style={{color:'#9090BB',fontSize:11}}>SCHOOL NAME</span><br/><span style={{color:'#F0F0FF',fontWeight:800,fontSize:15}}>{schoolResult.name}</span></div>
                  <div style={{fontSize:13,marginBottom:6}}><span style={{color:'#9090BB',fontSize:11}}>ADMIN EMAIL (LOGIN ID)</span><br/><span style={{color:'#38BFFF',fontWeight:800,fontSize:15}}>{schoolResult.email}</span></div>
                  <div style={{fontSize:13}}><span style={{color:'#9090BB',fontSize:11}}>TEMPORARY PASSWORD</span><br/><span style={{color:'#FFD166',fontWeight:900,fontSize:18,letterSpacing:2}}>{schoolResult.password}</span></div>
                </div>
                <div style={{fontSize:11,color:'#9090BB',marginBottom:10}}>📱 Send these to the school principal. They can change password after first login.</div>
                <div style={{display:'flex',gap:8}}>
                  <button onClick={()=>{navigator.clipboard.writeText('STU-BRAIN Login\nSchool: '+schoolResult.name+'\nEmail: '+schoolResult.email+'\nPassword: '+schoolResult.password+'\nURL: https://stu-brain.netlify.app/app');alert('✅ Copied to clipboard!');}} style={{background:'#6C63FF',color:'#fff',border:'none',borderRadius:8,padding:'7px 16px',fontSize:12,fontWeight:800,cursor:'pointer'}}>📋 Copy Credentials</button>
                  <button onClick={()=>setSchoolResult(null)} style={{background:'rgba(255,255,255,.1)',color:'#9090BB',border:'1px solid rgba(255,255,255,.15)',borderRadius:8,padding:'7px 14px',fontSize:12,fontWeight:700,cursor:'pointer'}}>✕ Close</button>
                </div>
              </div>
            )}
            <button onClick={addSchool} style={{background:'linear-gradient(135deg,#6C63FF,#FF6584)',color:'#fff',border:'none',borderRadius:50,padding:'10px 28px',fontSize:14,fontWeight:800,cursor:'pointer',fontFamily:"'Nunito',sans-serif"}}>🏫 Register School</button>
          </div>
        )}
      </div>
      {/* ── EDIT SCHOOL MODAL ── */}
      {editSchool&&(
        <div style={{position:'fixed',inset:0,background:'rgba(7,7,26,.85)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}} onClick={e=>{if(e.target===e.currentTarget)setEditSchool(null);}}>
          <div style={{background:'#16183A',border:'1px solid rgba(108,99,255,.3)',borderRadius:20,padding:28,width:'100%',maxWidth:520,boxShadow:'0 20px 60px rgba(0,0,0,.6)'}}>
            <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:20,marginBottom:18}}>✏️ Edit School</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
              {[{l:'School Name',k:'name'},{l:'Admin Email',k:'admin_email'},{l:'City',k:'city'},{l:'State',k:'state'},{l:'Phone',k:'phone'}].map(({l,k})=>(
                <div key={k}>
                  <label style={{fontSize:10,fontWeight:800,color:'#9090BB',textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:4}}>{l}</label>
                  <input style={{width:'100%',padding:'9px 12px',borderRadius:10,border:'1px solid rgba(108,99,255,.25)',background:'rgba(255,255,255,.05)',color:'#F0F0FF',fontSize:13,fontWeight:600,outline:'none',boxSizing:'border-box' as const}} value={String(editSchool[k]||'')} onChange={e=>setEditSchool(s=>({...s,[k]:e.target.value}))}/>
                </div>
              ))}
              <div>
                <label style={{fontSize:10,fontWeight:800,color:'#9090BB',textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:4}}>Plan</label>
                <select style={{width:'100%',padding:'9px 12px',borderRadius:10,border:'1px solid rgba(108,99,255,.25)',background:'#1E2050',color:'#F0F0FF',fontSize:13,outline:'none'}} value={String(editSchool.plan||'trial')} onChange={e=>setEditSchool(s=>({...s,plan:e.target.value}))}>
                  <option value="trial">🕐 Free Trial (3 days)</option>
                  <option value="starter">🌱 Starter (max 250 students)</option>
                  <option value="medium">⚡ Medium (max 600 + Logo)</option>
                  <option value="unlimited">🚀 Unlimited (all features)</option>
                </select>
              </div>
            </div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>updateSchool(editSchool.id as number,editSchool)} style={{background:'linear-gradient(135deg,#6C63FF,#FF6584)',color:'#fff',border:'none',borderRadius:50,padding:'9px 24px',fontSize:13,fontWeight:800,cursor:'pointer'}}>💾 Save Changes</button>
              <button onClick={()=>setEditSchool(null)} style={{background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.15)',color:'#9090BB',borderRadius:50,padding:'9px 18px',fontSize:13,fontWeight:700,cursor:'pointer'}}>Cancel</button>
              <button onClick={()=>{const p=prompt('New password for school admin:');if(p&&p.length>=4){fetch('/api/admin/reset-password',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({school_id:editSchool.id,new_password:p})}).then(r=>r.json()).then(d=>alert(d.success?'✅ Password changed! Admin email: '+d.updated?.email:'❌ '+(d.error||'Error')));} else if(p)alert('Min 4 chars');}} style={{background:'rgba(255,209,102,.15)',border:'1px solid rgba(255,209,102,.4)',color:'#FFD166',borderRadius:50,padding:'9px 18px',fontSize:13,fontWeight:700,cursor:'pointer'}}>🔑 Reset Pwd</button>
            </div>
          </div>
        </div>
      )}

        {saTab==='enquiries'&&(
          <div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
              <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:20,color:'#F0F0FF'}}>📩 Demo Enquiries <span style={{fontSize:13,color:MU}}>({enquiries.length})</span></div>
              <button onClick={()=>token&&loadEnquiries(token)} style={{background:'rgba(108,99,255,.15)',border:'1px solid rgba(108,99,255,.3)',color:'#6C63FF',borderRadius:8,padding:'5px 12px',fontSize:11,fontWeight:800,cursor:'pointer',fontFamily:"'Nunito',sans-serif"}}>🔄 Refresh</button>
            </div>
            {enquiries.length===0?(
              <div style={{background:C2,border:'1px solid rgba(108,99,255,.2)',borderRadius:16,padding:32,textAlign:'center'}}>
                <div style={{fontSize:40,marginBottom:12}}>📩</div>
                <div style={{fontSize:15,fontWeight:700,color:'#F0F0FF',marginBottom:6}}>No enquiries yet</div>
                <div style={{fontSize:12,color:MU}}>Schools that fill your website contact form will appear here.</div>
              </div>
            ):(
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {enquiries.map((e,i)=>(
                  <div key={i} style={{background:C2,border:`1px solid ${e.status==='new'?'rgba(255,209,102,.4)':'rgba(108,99,255,.25)'}`,borderRadius:14,padding:16}}>
                    <div style={{display:'flex',alignItems:'flex-start',gap:12}}>
                      <div style={{width:42,height:42,borderRadius:'50%',background:'linear-gradient(135deg,#6C63FF,#FF6584)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>🏫</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:900,fontSize:14,color:'#F0F0FF'}}>{e.name as string}</div>
                        <div style={{fontSize:12,color:MU,marginBottom:4}}>{e.school as string}{e.city?` · ${e.city as string}`:''}</div>
                        <div style={{fontSize:12,color:'#38BFFF'}}>📞 {e.phone as string}{e.email?` · ✉️ ${e.email as string}`:''}</div>
                        {Boolean(e.message)&&<div style={{fontSize:11,color:MU,marginTop:6,fontStyle:'italic'}}>"{e.message as string}"</div>}
                        <div style={{display:'flex',gap:8,marginTop:8,flexWrap:'wrap'}}>
                          <span style={{background:'rgba(56,191,255,.12)',color:'#38BFFF',borderRadius:20,padding:'2px 10px',fontSize:10,fontWeight:800}}>👥 {Number(e.students||0)} students</span>
                          <span style={{background:e.status==='new'?'rgba(255,209,102,.15)':'rgba(67,233,123,.1)',color:e.status==='new'?Y:A,borderRadius:20,padding:'2px 10px',fontSize:10,fontWeight:900}}>{e.status==='new'?'🆕 New':'✅ Contacted'}</span>
                          <span style={{fontSize:10,color:MU}}>{new Date(e.created_at as string).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>
                        </div>
                      </div>
                      {e.status==='new'&&(
                        <button onClick={()=>{fetch('/api/enquiry',{method:'PATCH',headers:{'Content-Type':'application/json',authorization:`Bearer ${token||''}`},body:JSON.stringify({id:e.id,status:'contacted'})}).then(()=>{if(token)loadEnquiries(token);});}} style={{background:'rgba(67,233,123,.15)',border:'1px solid rgba(67,233,123,.4)',color:A,borderRadius:8,padding:'7px 14px',fontSize:11,fontWeight:800,cursor:'pointer',flexShrink:0,fontFamily:"'Nunito',sans-serif"}}>✅ Contacted</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      <Styles/>
    </div>
  );}

  // ─── ADMIN DASHBOARD ───
  if(screen==='admin') return (
    <div style={{minHeight:'100vh'}}>{topnav}
      <div style={{maxWidth:1100,margin:'0 auto',padding:20}}>

        {/* Header */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18,flexWrap:'wrap',gap:8}}>
          <div>
            <div style={{...S.fredoka,fontSize:24,marginBottom:2}}>{T.adminPanel} 🏫</div>
            <div style={{color:C.mu,fontSize:13,fontWeight:600}}>{user?.school_name}</div>
          </div>
          <button onClick={()=>{token&&loadAdmin(token);token&&loadAllStudents(studentClassFilter||undefined,sectionFilter||undefined,studentSearch||undefined);}} style={{...S.btnS,padding:'7px 16px',fontSize:12}}>🔄 Refresh All Data</button>
        </div>

        {/* ── REAL ANALYTICS ── */}
        {/* School Logo Upload */}
        <div style={{...S.card,padding:16,marginBottom:16,display:'flex',alignItems:'center',gap:14,flexWrap:'wrap'}}>
          {schoolLogo?<img src={schoolLogo} alt="Logo" style={{height:56,width:56,borderRadius:10,objectFit:'contain',background:'rgba(255,255,255,.9)',padding:4,border:`1px solid ${C.br}`}}/>:<div style={{width:56,height:56,borderRadius:10,background:'rgba(108,99,255,.1)',border:`2px dashed ${C.br}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>🏫</div>}
          <div>
            <div style={{fontSize:13,fontWeight:800,marginBottom:4}}>School Logo</div>
            <label style={{...S.btnP,padding:'6px 14px',fontSize:11,cursor:'pointer',display:'inline-block',opacity:logoUploading?0.7:1}}>
              {logoUploading?'⏳ Uploading...':'📷 '+(schoolLogo?'Change Logo':'Upload Logo')}
              <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>{const f=e.target.files?.[0];if(f)uploadLogo(f);(e.target as HTMLInputElement).value='';}} disabled={logoUploading}/>
            </label>
            <div style={{fontSize:10,color:C.mu,marginTop:3}}>PNG/JPG max 600KB · Shown to all students &amp; teachers</div>
          </div>
        </div>
        <div style={{...S.fredoka,fontSize:16,marginBottom:10}}>📊 {lang==='hi'?'School Analytics (Live)':'School Analytics (Live)'}</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:10,marginBottom:16}}>
          {([
            {em:'🎓', v:String(dashStats?.total_students||0),        l:lang==='hi'?'कुल छात्र':'Total Students',   col:C.p},
            {em:'👨‍🏫', v:String(dashStats?.total_teachers||0),       l:lang==='hi'?'शिक्षक':'Teachers',            col:C.sky},
            {em:'📚', v:(dashStats?.completion_pct||0)+'%',          l:lang==='hi'?'Completion':'Completion',       col:C.a},
            {em:'🧩', v:(dashStats?.avg_quiz||0)+'%',                l:lang==='hi'?'Avg Quiz':'Avg Quiz',           col:C.y},
            {em:'🔥', v:String(dashStats?.active_today||0),          l:lang==='hi'?'Active Today':'Active Today',   col:C.s},
            {em:'⭐', v:Number(dashStats?.total_xp||0).toLocaleString(), l:'Total XP',                              col:'#FFD166'},
          ] as {em:string,v:string,l:string,col:string}[]).map((s,i)=>(
            <div key={i} style={{...S.card,padding:14,textAlign:'center'}}>
              <div style={{fontSize:22,marginBottom:4}}>{s.em}</div>
              <div style={{...S.fredoka,fontSize:22,color:s.col}}>{s.v}</div>
              <div style={{fontSize:10,color:C.mu,fontWeight:700,marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Class+Section breakdown — real data */}
        {classBrk.length>0&&(
          <div style={{...S.card,padding:14,marginBottom:16,overflowX:'auto'}}>
            <div style={{...S.fredoka,fontSize:14,marginBottom:10}}>📈 {lang==='hi'?'Class & Section Performance':'Class & Section Performance'}</div>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
              <thead><tr style={{background:'rgba(108,99,255,.1)'}}>
                {['Class','Sec','Students','Chapters Done','Avg Quiz','Active Today','Total XP'].map(h=>(
                  <th key={h} style={{padding:'7px 10px',textAlign:'left',fontSize:10,fontWeight:800,color:C.mu,textTransform:'uppercase',whiteSpace:'nowrap'}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {(classBrk as {class_level:number;section:string;student_count:number;chapters_done:number;avg_quiz:number;active_today:number;class_xp:number}[]).map((r,i)=>{
                  const q=Number(r.avg_quiz);
                  const status=q>=70?{bg:'rgba(67,233,123,.15)',col:C.a,lbl:'Excellent'}:q>=50?{bg:'rgba(255,209,102,.12)',col:C.y,lbl:'Good'}:{bg:'rgba(255,101,132,.12)',col:C.s,lbl:'Needs Help'};
                  return(
                    <tr key={i} style={{borderTop:`1px solid rgba(108,99,255,.1)`}}>
                      <td style={{padding:'7px 10px',fontWeight:800}}>Class {r.class_level}</td>
                      <td style={{padding:'7px 10px'}}><span style={{background:'rgba(108,99,255,.15)',color:C.p,borderRadius:6,padding:'1px 8px',fontSize:11,fontWeight:800}}>{r.section}</span></td>
                      <td style={{padding:'7px 10px',fontWeight:700,color:C.text}}>{r.student_count}</td>
                      <td style={{padding:'7px 10px',color:C.a,fontWeight:700}}>{r.chapters_done}</td>
                      <td style={{padding:'7px 10px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:6}}>
                          <div style={{width:50,height:5,background:'rgba(255,255,255,.08)',borderRadius:3,overflow:'hidden'}}><div style={{height:'100%',width:`${r.avg_quiz}%`,background:status.col,borderRadius:3}}/></div>
                          <span style={{fontSize:11,fontWeight:800,color:status.col}}>{r.avg_quiz}%</span>
                        </div>
                      </td>
                      <td style={{padding:'7px 10px',color:C.y,fontWeight:700}}>{r.active_today}</td>
                      <td style={{padding:'7px 10px',color:'#FFD166',fontWeight:700}}>⭐{Number(r.class_xp).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {classBrk.length===0&&dashStats&&(
          <div style={{...S.card,padding:20,textAlign:'center',color:C.mu,marginBottom:16,fontSize:13}}>
            📭 No students enrolled yet. Use CSV Enroll below to add students.
          </div>
        )}

        {/* Top + Struggling — real data */}
        {(topStudents.length>0||struggling.length>0)&&(
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
            <div style={{...S.card,padding:14}}>
              <div style={{...S.fredoka,fontSize:13,color:C.a,marginBottom:10}}>🏆 Top Students</div>
              {topStudents.length===0?<div style={{color:C.mu,fontSize:12}}>No data yet</div>:
              (topStudents as {name:string;student_id:string;class_level:number;section:string;total_xp:number;chapters_done:number}[]).map((s,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,marginBottom:i<topStudents.length-1?8:0,padding:'6px 8px',background:'rgba(67,233,123,.05)',borderRadius:8}}>
                  <div style={{fontSize:16}}>{['🥇','🥈','🥉','4️⃣','5️⃣'][i]}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:800,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.name}</div>
                    <div style={{fontSize:10,color:C.mu}}>Cl.{s.class_level}{s.section} · 📚{s.chapters_done}</div>
                  </div>
                  <div style={{color:C.y,fontWeight:800,fontSize:11,flexShrink:0}}>⭐{s.total_xp}</div>
                </div>
              ))}
            </div>
            <div style={{...S.card,padding:14}}>
              <div style={{...S.fredoka,fontSize:13,color:C.s,marginBottom:10}}>⚠️ Needs Attention</div>
              {struggling.length===0?<div style={{color:C.a,fontSize:12}}>🎉 All students doing well!</div>:
              (struggling as {name:string;class_level:number;section:string;avg_quiz:number}[]).map((s,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,marginBottom:i<struggling.length-1?8:0,padding:'6px 8px',background:'rgba(255,101,132,.05)',borderRadius:8}}>
                  <div style={{fontSize:16}}>⚠️</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:800}}>{s.name}</div>
                    <div style={{fontSize:10,color:C.mu}}>Class {s.class_level}{s.section}</div>
                  </div>
                  <div style={{color:C.s,fontWeight:800,fontSize:11}}>{s.avg_quiz}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ADD TEACHER ── */}
        <div style={{...S.fredoka,fontSize:16,marginBottom:10}}>👨‍🏫 {lang==='hi'?'शिक्षक जोड़ें':'Add Teacher'}</div>

        {/* Teacher credential result card */}
        {teacherResult2&&(
          <div style={{background:'rgba(67,233,123,.08)',border:'1px solid rgba(67,233,123,.4)',borderRadius:14,padding:18,marginBottom:14}}>
            <div style={{fontSize:14,fontWeight:900,color:C.a,marginBottom:12}}>✅ Teacher Added! Share these credentials:</div>
            <div style={{background:'#0D0D2B',borderRadius:10,padding:14,marginBottom:12,fontFamily:'monospace'}}>
              <div style={{marginBottom:7}}><div style={{fontSize:9,color:C.mu,textTransform:'uppercase',letterSpacing:1}}>Name</div><div style={{color:C.text,fontWeight:800,fontSize:14}}>{teacherResult2.name}</div></div>
              <div style={{marginBottom:7}}><div style={{fontSize:9,color:C.mu,textTransform:'uppercase',letterSpacing:1}}>Teacher ID</div><div style={{color:C.y,fontWeight:900,fontSize:15}}>{teacherResult2.teacher_id}</div></div>
              <div style={{marginBottom:7}}><div style={{fontSize:9,color:C.mu,textTransform:'uppercase',letterSpacing:1}}>Login Email</div><div style={{color:C.sky,fontWeight:800,fontSize:14}}>{teacherResult2.email}</div></div>
              <div><div style={{fontSize:9,color:C.mu,textTransform:'uppercase',letterSpacing:1}}>Password</div><div style={{color:C.s,fontWeight:900,fontSize:20,letterSpacing:3}}>{teacherResult2.password}</div></div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button onClick={()=>{navigator.clipboard.writeText('STU-BRAIN Login\nName: '+teacherResult2.name+'\nEmail: '+teacherResult2.email+'\nPassword: '+teacherResult2.password+'\nURL: https://stu-brain.netlify.app/app');alert('✅ Copied!');}} style={{...S.btnP,padding:'7px 16px',fontSize:12}}>📋 Copy & Share</button>
              <button onClick={()=>setTeacherResult2(null)} style={{...S.btnS,padding:'7px 14px',fontSize:12}}>✕</button>
            </div>
          </div>
        )}

        {/* Add teacher form */}
        <div style={{...S.card,padding:18,marginBottom:18}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))',gap:12,marginBottom:12}}>
            <div>
              <label style={{fontSize:10,fontWeight:800,color:C.mu,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:5}}>Full Name *</label>
              <input style={S.inp} value={newTeacher.name} onChange={e=>setNewTeacher(t=>({...t,name:e.target.value}))} placeholder="Ms. Anjali Sharma"/>
            </div>
            <div>
              <label style={{fontSize:10,fontWeight:800,color:C.mu,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:5}}>Email *</label>
              <input style={S.inp} value={newTeacher.email} onChange={e=>setNewTeacher(t=>({...t,email:e.target.value}))} placeholder="anjali@school.edu.in"/>
            </div>
            <div>
              <label style={{fontSize:10,fontWeight:800,color:C.mu,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:5}}>Phone</label>
              <input style={S.inp} value={newTeacher.phone} onChange={e=>setNewTeacher(t=>({...t,phone:e.target.value}))} placeholder="+91 98765 43210"/>
            </div>
          </div>
          <div style={{fontSize:11,color:C.mu,marginBottom:10}}>💡 Teacher ID &amp; password auto-generated. Teacher can login immediately.</div>
          <button onClick={addTeacher} style={{...S.btnP,padding:'9px 22px',fontSize:13}}>➕ Add Teacher</button>
          {teacherResult&&!teacherResult2&&<div style={{marginTop:10,fontSize:12,color:teacherResult.startsWith('✅')?C.a:C.s,fontWeight:700}}>{teacherResult}</div>}
        </div>

        {/* Teachers list */}
        <div style={{...S.card,overflow:'hidden',marginBottom:18}}>
          <div style={{padding:'12px 16px',borderBottom:`1px solid ${C.br}`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div style={{...S.fredoka,fontSize:15}}>All Teachers ({teachers.length})</div>
            <button onClick={()=>token&&loadTeacher(token)} style={{...S.btnS,padding:'5px 12px',fontSize:11}}>🔄</button>
          </div>
          {teachers.length===0?(
            <div style={{padding:24,textAlign:'center',color:C.mu,fontSize:13}}>No teachers yet — add one above!</div>
          ):(
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
                <thead><tr style={{background:'rgba(108,99,255,.1)'}}>
                  {['Name','Email','Teacher ID','Phone','Default Pass','Actions'].map(h=>(
                    <th key={h} style={{padding:'9px 12px',textAlign:'left',fontSize:10,fontWeight:800,textTransform:'uppercase',color:C.mu,whiteSpace:'nowrap'}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {(teachers as {id:number;name:string;email:string;teacher_id:string;phone:string}[]).map((t,i)=>(
                    <tr key={i} style={{borderTop:`1px solid rgba(108,99,255,.1)`}}>
                      <td style={{padding:'9px 12px',fontWeight:800}}>{t.name}</td>
                      <td style={{padding:'9px 12px',fontFamily:'monospace',fontSize:11,color:C.sky}}>{t.email}</td>
                      <td style={{padding:'9px 12px',fontFamily:'monospace',color:C.y,fontWeight:700}}>{t.teacher_id}</td>
                      <td style={{padding:'9px 12px',color:C.mu}}>{t.phone||'—'}</td>
                      <td style={{padding:'9px 12px'}}>
                        <div style={{display:'flex',gap:5}}>
                          <button onClick={()=>setEditTeacher({...t})} style={{background:'rgba(56,191,255,.2)',color:'#38BFFF',border:'1px solid rgba(56,191,255,.4)',borderRadius:6,padding:'4px 8px',fontSize:10,fontWeight:800,cursor:'pointer'}}>✏️ Edit</button>
                          <button onClick={()=>resetPassword(t.id,'teacher: '+t.name)} style={{background:'rgba(255,209,102,.15)',color:C.y,border:`1px solid rgba(255,209,102,.3)`,borderRadius:6,padding:'4px 8px',fontSize:10,fontWeight:800,cursor:'pointer'}}>🔑 Pwd</button>
                          <button onClick={()=>{if(confirm('Remove '+t.name+'?'))fetch('/api/admin/teachers',{method:'DELETE',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({teacher_id:t.id})}).then(()=>{token&&loadTeacher(token);token&&loadAdmin(token);});}} style={{background:'rgba(255,101,132,.15)',color:C.s,border:`1px solid rgba(255,101,132,.3)`,borderRadius:6,padding:'4px 8px',fontSize:10,fontWeight:800,cursor:'pointer'}}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── STUDENTS (Class + Section Filter) ── */}
        <div style={{...S.fredoka,fontSize:16,marginBottom:10}}>🎓 {lang==='hi'?'Students':'Students'}</div>
        <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap',alignItems:'center'}}>
          <button onClick={()=>{setStudentClassFilter(null);setSectionFilter('');loadAllStudents(undefined,undefined,studentSearch||undefined);}} style={{padding:'6px 14px',borderRadius:50,fontSize:12,fontWeight:800,border:`1px solid ${!studentClassFilter?C.p:C.br}`,background:!studentClassFilter?C.p:'transparent',color:!studentClassFilter?'#fff':C.mu,cursor:'pointer',fontFamily:"'Nunito',sans-serif"}}>All</button>
          {[3,4,5,6,7,8,9,10,11,12].map(cls=>(
            <button key={cls} onClick={()=>{setStudentClassFilter(cls);setSectionFilter('');loadAllStudents(cls,undefined,studentSearch||undefined);}} style={{padding:'6px 14px',borderRadius:50,fontSize:12,fontWeight:800,border:`1px solid ${studentClassFilter===cls?C.p:C.br}`,background:studentClassFilter===cls?C.p:'transparent',color:studentClassFilter===cls?'#fff':C.mu,cursor:'pointer',fontFamily:"'Nunito',sans-serif"}}>Class {cls}</button>
          ))}
          {/* Section filter — only show sections that exist for selected class */}
          {studentClassFilter&&Array.from(new Set((allStudents.length?allStudents:students).filter(s=>s.class_level===studentClassFilter).map(s=>s.section as string))).sort().map(sec=>(
            <button key={sec} onClick={()=>{setSectionFilter(sectionFilter===sec?'':sec);loadAllStudents(studentClassFilter,sectionFilter===sec?undefined:sec,studentSearch||undefined);}} style={{padding:'5px 12px',borderRadius:50,fontSize:11,fontWeight:800,border:`1px solid ${sectionFilter===sec?C.sky:C.br}`,background:sectionFilter===sec?C.sky:'transparent',color:sectionFilter===sec?'#0D0D2B':C.mu,cursor:'pointer',fontFamily:"'Nunito',sans-serif"}}>Sec {sec}</button>
          ))}
          <input style={{...S.inp,maxWidth:200,padding:'7px 14px',borderRadius:50,fontSize:12}} placeholder="🔍 Search..." value={studentSearch} onChange={e=>{setStudentSearch(e.target.value);loadAllStudents(studentClassFilter||undefined,sectionFilter||undefined,e.target.value);}}/>
          <span style={{fontSize:11,color:C.mu,fontWeight:600,marginLeft:'auto'}}>{(allStudents.length?allStudents:students).length} students</span>
          <button onClick={()=>loadAllStudents(studentClassFilter||undefined,sectionFilter||undefined,studentSearch||undefined)} style={{...S.btnS,padding:'5px 12px',fontSize:11}}>🔄</button>
        </div>
        <div style={{overflowX:'auto',marginBottom:18}}>
          <table style={{width:'100%',borderCollapse:'collapse',background:C.card,border:`1px solid ${C.br}`,borderRadius:16,overflow:'hidden',fontSize:12}}>
            <thead><tr style={{background:'rgba(108,99,255,.12)'}}>
              {['Name','Login ID','Password','Cl','Sec','Chapters','XP','Actions'].map(h=>(
                <th key={h} style={{padding:'9px 10px',textAlign:'left',fontSize:10,fontWeight:800,textTransform:'uppercase',color:C.mu,whiteSpace:'nowrap'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {(allStudents.length?allStudents:students).length===0?(
                <tr><td colSpan={9} style={{padding:30,textAlign:'center',color:C.mu,fontSize:13}}>
                  No students found. Enroll students using CSV below.
                </td></tr>
              ):(allStudents.length?allStudents:students).map((s,i)=>{
                const xp=Number(s.total_xp)||0, quiz=Number(s.avg_quiz)||0, chaps=Number(s.chapters_done)||0;
                const la=s.last_active?new Date(s.last_active as string):null;
                const days=la?Math.floor((Date.now()-la.getTime())/86400000):99;
                return(
                  <tr key={i} style={{borderTop:`1px solid rgba(108,99,255,.12)`}}>
                    <td style={{padding:'8px 10px',fontWeight:800}}>{s.name as string}</td>
                    <td style={{padding:'8px 10px',fontFamily:'monospace',fontSize:11,color:C.y,fontWeight:700}}>{s.student_id as string}</td>
                    <td style={{padding:'8px 10px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:4}}>
                        <span style={{fontFamily:'monospace',fontSize:10,color:C.mu}}>{showPwd[`s${s.id}`]?'demo123':'••••••'}</span>
                        <button onClick={()=>setShowPwd(p=>({...p,[`s${s.id}`]:!p[`s${s.id}`]}))} style={{background:'none',border:'none',cursor:'pointer',fontSize:11,padding:'0 2px',color:C.mu}}>{showPwd[`s${s.id}`]?'🙈':'👁️'}</button>
                      </div>
                    </td>
                    <td style={{padding:'8px 10px',fontWeight:600}}>{s.class_level as number}</td>
                    <td style={{padding:'8px 10px'}}><span style={{background:'rgba(108,99,255,.15)',color:C.p,borderRadius:4,padding:'1px 6px',fontSize:10,fontWeight:800}}>{s.section as string}</span></td>
                    <td style={{padding:'8px 10px',color:chaps>0?C.a:C.mu,fontWeight:700}}>{chaps}</td>
                    <td style={{padding:'8px 10px',color:C.y,fontWeight:700}}>{xp}</td>
                    <td style={{padding:'8px 10px'}}>
                      <span style={{fontSize:11,fontWeight:800,color:quiz>=70?C.a:quiz>=50?C.y:C.s}}>{quiz}%</span>
                    </td>
                    <td style={{padding:'8px 10px',fontSize:10,color:days===0?C.a:days<=3?C.y:C.mu}}>{days===0?'Today':days===1?'1d ago':`${days}d`}</td>
                    <td style={{padding:'8px 10px'}}>
                      <div style={{display:'flex',gap:4}}>
                        <button onClick={()=>setEditStudent({...s})} style={{background:'rgba(56,191,255,.2)',color:'#38BFFF',border:'1px solid rgba(56,191,255,.4)',borderRadius:5,padding:'3px 7px',fontSize:10,fontWeight:800,cursor:'pointer'}}>✏️</button>
                        <button onClick={()=>resetPassword(s.id as number,'student')} style={{background:'rgba(255,209,102,.15)',color:C.y,border:`1px solid rgba(255,209,102,.3)`,borderRadius:5,padding:'3px 7px',fontSize:10,fontWeight:800,cursor:'pointer'}}>🔑</button>
                        <button onClick={()=>{if(confirm('Delete '+s.name+'?'))fetch('/api/admin/students',{method:'DELETE',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({student_id:s.id})}).then(()=>loadAllStudents(studentClassFilter||undefined,sectionFilter||undefined,studentSearch||undefined));}} style={{background:'rgba(255,101,132,.15)',color:C.s,border:`1px solid rgba(255,101,132,.3)`,borderRadius:5,padding:'3px 7px',fontSize:10,fontWeight:800,cursor:'pointer'}}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── CSV BULK ENROLL ── */}
        <div style={{...S.fredoka,fontSize:16,marginBottom:10}}>📤 {lang==='hi'?'Bulk Enroll (CSV)':'Bulk Enroll Students (CSV)'}</div>
        <div style={{...S.card,padding:18,marginBottom:18}}>
          <div style={{fontSize:11,color:C.mu,marginBottom:10,padding:'10px 14px',background:'rgba(56,191,255,.06)',border:'1px solid rgba(56,191,255,.2)',borderRadius:10,lineHeight:1.8}}>
            <div style={{fontWeight:800,color:C.sky,marginBottom:4}}>📋 CSV Format: <span style={{fontFamily:'monospace',fontSize:10,color:C.text}}>Name, StudentID(optional), Class(8-12), Section, Email(optional), Phone(optional)</span></div>
            <div style={{fontFamily:'monospace',fontSize:10,color:C.text}}>
              Ravi Kumar, , 9, A, ravi@school.com<br/>
              Priya Sharma, STU002, 10, B<br/>
              Anjali Singh, , 8, A
            </div>
            <div style={{marginTop:5,fontSize:10,color:C.mu}}>✅ StudentID optional — auto-generated · ✅ Header row auto-detected · ✅ Default password: Student@123</div>
          </div>
          {/* Drag & drop */}
          <div style={{border:`2px dashed ${C.br}`,borderRadius:14,padding:20,textAlign:'center',marginBottom:10,cursor:'pointer',transition:'border-color .2s'}}
            onDragOver={e=>{e.preventDefault();(e.currentTarget as HTMLDivElement).style.borderColor=C.p;}}
            onDragLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=C.br;}}
            onDrop={e=>{e.preventDefault();(e.currentTarget as HTMLDivElement).style.borderColor=C.br;const f=e.dataTransfer.files[0];if(f)handleCSVFile(f);}}
            onClick={()=>document.getElementById('csvFileInput')?.click()}>
            <input id="csvFileInput" type="file" accept=".csv,.txt" style={{display:'none'}} onChange={e=>{const f=e.target.files?.[0];if(f)handleCSVFile(f);(e.target as HTMLInputElement).value='';}}/>
            <div style={{fontSize:32,marginBottom:6}}>📂</div>
            <div style={{fontSize:13,fontWeight:800}}>Drop CSV file here or click to upload</div>
            <div style={{fontSize:11,color:C.mu}}>Accepts .csv and .txt</div>
          </div>
          <div style={{fontSize:11,color:C.mu,textAlign:'center',marginBottom:8,fontWeight:600}}>— or paste CSV text —</div>
          <textarea style={{...S.inp,height:72,borderRadius:12,resize:'vertical',fontFamily:'monospace',fontSize:11}}
            placeholder={'Ravi Kumar, , 9, A\nPriya Sharma, STU002, 10, B'}
            value={enrollCSV}
            onChange={e=>{setEnrollCSV(e.target.value);setEnrollResult(null);if(e.target.value.trim())setCsvPreview(parseCSVFile(e.target.value));else setCsvPreview([]);}}/>
          {/* Preview */}
          {csvPreview.length>0&&(
            <div style={{marginTop:10,background:C.card2,borderRadius:12,border:`1px solid ${C.br}`,overflow:'hidden'}}>
              <div style={{padding:'8px 14px',borderBottom:`1px solid ${C.br}`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{fontSize:12,fontWeight:800,color:C.a}}>👁️ Preview — {csvPreview.length} students ready to enroll</div>
                <button onClick={()=>{setCsvPreview([]);setEnrollCSV('');}} style={{background:'none',border:'none',color:C.mu,cursor:'pointer',fontSize:14}}>✕</button>
              </div>
              <div style={{overflowX:'auto',maxHeight:180,overflowY:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:11}}>
                  <thead><tr style={{background:'rgba(108,99,255,.08)'}}>
                    {['#','Name','ID (auto if blank)','Class','Sec','Email'].map(h=><th key={h} style={{padding:'5px 10px',textAlign:'left',fontSize:9,fontWeight:800,color:C.mu,textTransform:'uppercase'}}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {csvPreview.slice(0,10).map((row,i)=>(
                      <tr key={i} style={{borderTop:`1px solid rgba(108,99,255,.08)`}}>
                        <td style={{padding:'4px 10px',color:C.mu}}>{i+1}</td>
                        <td style={{padding:'4px 10px',fontWeight:700,color:row.name?C.text:C.s}}>{row.name||'⚠️ Missing'}</td>
                        <td style={{padding:'4px 10px',fontFamily:'monospace',color:C.y,fontSize:10}}>{row.student_id||row.id||<span style={{color:C.mu,fontStyle:'italic'}}>auto</span>}</td>
                        <td style={{padding:'4px 10px',color:![8,9,10,11,12].includes(parseInt(row.class_level||row.class||'0'))?C.s:C.a}}>{row.class_level||row.class||'⚠️'}</td>
                        <td style={{padding:'4px 10px',color:C.mu}}>{row.section||'A'}</td>
                        <td style={{padding:'4px 10px',color:C.mu,fontSize:10}}>{row.email||'auto'}</td>
                      </tr>
                    ))}
                    {csvPreview.length>10&&<tr><td colSpan={6} style={{padding:'5px 10px',color:C.mu,textAlign:'center',fontSize:10}}>...+{csvPreview.length-10} more students</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div style={{display:'flex',alignItems:'center',gap:10,marginTop:12,flexWrap:'wrap'}}>
            <button style={{...S.btnP,padding:'9px 22px',fontSize:13}} onClick={bulkEnroll}>
              📤 Enroll {csvPreview.length>0?csvPreview.length+' Students':'Students'}
            </button>
            {enrollResult&&<button style={{...S.btnS,padding:'5px 12px',fontSize:11}} onClick={()=>setEnrollResult(null)}>✕ Clear</button>}
          </div>
          {enrollResult&&(
            <div style={{marginTop:12,padding:14,borderRadius:12,background:enrollResult.enrolled>0?'rgba(67,233,123,.07)':'rgba(255,101,132,.07)',border:`1px solid ${enrollResult.enrolled>0?'rgba(67,233,123,.3)':'rgba(255,101,132,.3)'}`}}>
              <div style={{fontSize:14,fontWeight:900,color:enrollResult.enrolled>0?C.a:C.s,marginBottom:6}}>
                {enrollResult.enrolled>0?`✅ ${enrollResult.enrolled} students enrolled successfully!`:'⚠️ No students enrolled'}
              </div>
              {enrollResult.enrolled>0&&(
                <div style={{fontSize:11,color:C.mu,padding:'6px 10px',background:'rgba(255,255,255,.04)',borderRadius:8,marginBottom:6}}>
                  📋 Students login with: <strong style={{color:C.text}}>Student ID</strong> + password <strong style={{color:C.text,fontFamily:'monospace'}}>Student@123</strong>
                </div>
              )}
              {(enrollResult.errors||[]).map((e,i)=><div key={i} style={{fontSize:11,color:C.s,fontWeight:600,marginTop:3}}>⚠️ {e}</div>)}
            </div>
          )}
        </div>

        {/* ── LICENSE INFO (from real school data) ── */}
        <div style={{...S.card,background:'linear-gradient(135deg,rgba(108,99,255,.08),rgba(67,233,123,.04))',padding:16}}>
          <div style={{...S.fredoka,fontSize:14,marginBottom:10}}>📜 {T.annualLicense}</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))',gap:10}}>
            {([
              {l:'Plan', v:String(dashStats?.plan||'trial').toUpperCase(), c:C.a},
              {l:'Max Students', v:String(dashStats?.max_students||50), c:C.text},
              {l:'Status', v:dashStats?.is_locked?'🔒 Locked':'✅ Active', c:dashStats?.is_locked?C.s:C.a},
            ] as {l:string,v:string,c:string}[]).map((r,i)=>(
              <div key={i}><div style={{fontSize:10,color:C.mu,fontWeight:700,textTransform:'uppercase',letterSpacing:1}}>{r.l}</div><div style={{fontSize:13,fontWeight:800,color:r.c,marginTop:3}}>{r.v}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EDIT TEACHER MODAL ── */}
      {editTeacher&&(
        <div style={{position:'fixed',inset:0,background:'rgba(7,7,26,.88)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}} onClick={e=>{if(e.target===e.currentTarget)setEditTeacher(null);}}>
          <div style={{background:'#16183A',border:`1px solid ${C.br}`,borderRadius:20,padding:28,width:'100%',maxWidth:460,boxShadow:'0 20px 60px rgba(0,0,0,.6)'}}>
            <div style={{...S.fredoka,fontSize:20,marginBottom:18}}>✏️ Edit Teacher</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
              {([{l:'Full Name',k:'name'},{l:'Email',k:'email'},{l:'Teacher ID',k:'teacher_id'},{l:'Phone',k:'phone'}] as {l:string,k:string}[]).map(({l,k})=>(
                <div key={k}>
                  <label style={{fontSize:10,fontWeight:800,color:C.mu,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:4}}>{l}</label>
                  <input style={{...S.inp,padding:'9px 12px'}} value={String(editTeacher[k]||'')} onChange={e=>setEditTeacher(s=>({...s,[k]:e.target.value}))}/>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              <button onClick={()=>updateTeacher(editTeacher.id as number,{name:editTeacher.name,email:editTeacher.email,teacher_id:editTeacher.teacher_id,phone:editTeacher.phone})} style={{...S.btnP,padding:'9px 24px',fontSize:13}}>💾 Save</button>
              <button onClick={()=>setEditTeacher(null)} style={{...S.btnS,padding:'9px 18px',fontSize:13}}>Cancel</button>
              <button onClick={()=>resetPassword(editTeacher.id as number,'teacher')} style={{background:'rgba(255,209,102,.15)',border:`1px solid rgba(255,209,102,.4)`,color:C.y,borderRadius:50,padding:'9px 18px',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:"'Nunito',sans-serif"}}>🔑 Reset Pwd</button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT STUDENT MODAL ── */}
      {editStudent&&(
        <div style={{position:'fixed',inset:0,background:'rgba(7,7,26,.88)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}} onClick={e=>{if(e.target===e.currentTarget)setEditStudent(null);}}>
          <div style={{background:'#16183A',border:`1px solid ${C.br}`,borderRadius:20,padding:28,width:'100%',maxWidth:500,boxShadow:'0 20px 60px rgba(0,0,0,.6)'}}>
            <div style={{...S.fredoka,fontSize:20,marginBottom:18}}>✏️ Edit Student</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
              {([{l:'Full Name',k:'name'},{l:'Student ID',k:'student_id'},{l:'Email',k:'email'},{l:'Phone',k:'phone'},{l:'Section',k:'section'}] as {l:string,k:string}[]).map(({l,k})=>(
                <div key={k}>
                  <label style={{fontSize:10,fontWeight:800,color:C.mu,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:4}}>{l}</label>
                  <input style={{...S.inp,padding:'9px 12px'}} value={String(editStudent[k]||'')} onChange={e=>setEditStudent(s=>({...s,[k]:e.target.value}))}/>
                </div>
              ))}
              <div>
                <label style={{fontSize:10,fontWeight:800,color:C.mu,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:4}}>Class</label>
                <select style={{...S.inp,padding:'9px 12px'} as React.CSSProperties} value={String(editStudent.class_level||9)} onChange={e=>setEditStudent(s=>({...s,class_level:parseInt(e.target.value)}))}>
                  {[3,4,5,6,7,8,9,10,11,12].map(c=><option key={c} value={c}>Class {c}</option>)}
                </select>
              </div>
            </div>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              <button onClick={()=>updateStudent(editStudent.id as number,{name:editStudent.name,student_id:editStudent.student_id,email:editStudent.email,phone:editStudent.phone,section:editStudent.section,class_level:editStudent.class_level})} style={{...S.btnP,padding:'9px 24px',fontSize:13}}>💾 Save Changes</button>
              <button onClick={()=>setEditStudent(null)} style={{...S.btnS,padding:'9px 18px',fontSize:13}}>Cancel</button>
              <button onClick={()=>resetPassword(editStudent.id as number,'student')} style={{background:'rgba(255,209,102,.15)',border:`1px solid rgba(255,209,102,.4)`,color:C.y,borderRadius:50,padding:'9px 18px',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:"'Nunito',sans-serif"}}>🔑 Reset Password</button>
            </div>
          </div>
        </div>
      )}
      <Styles/>
    </div>
  );


  // ─── LEARN SCREEN ───
  const classData=CURRICULUM[curClass];
  const {done:clDone,total:clTotal,pct:clPct}=classProg(curClass);
  const allChapsList=allChaps();

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',overflow:'hidden'}}>
      {/* Learn top bar */}
      <div style={{display:'flex',alignItems:'center',gap:8,padding:'10px 16px',background:'rgba(13,13,43,.98)',borderBottom:`1px solid ${C.br}`,flexShrink:0,flexWrap:'wrap'}}>
        <button onClick={goBack} style={{...S.btnS,padding:'7px 14px',fontSize:12}}>{curChap?`← ${T.allChapters}`:'← Home'}</button>
        <div style={{...S.fredoka,fontSize:15}}>{lang==='hi'?classData?.labelHi:classData?.label}</div>
        <div style={{fontSize:10,fontWeight:800,padding:'3px 10px',borderRadius:50,...parseCSSStr(classData?.badgeStyle||'')}}>{lang==='hi'?classData?.badgeHi:classData?.badge}</div>
        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
          <div style={{width:72,height:5,background:'rgba(255,255,255,.08)',borderRadius:3,overflow:'hidden'}}><div style={{height:'100%',background:`linear-gradient(90deg,${C.p},${C.a})`,borderRadius:3,width:`${clPct}%`,transition:'width .5s'}}/></div>
          <div style={{fontSize:10,fontWeight:800,color:C.a}}>{clPct}%</div>
          <div style={{color:C.y,fontSize:10,fontWeight:800,background:'rgba(255,209,102,.15)',border:'1px solid rgba(255,209,102,.3)',padding:'3px 10px',borderRadius:50}}>⭐ {totalXP}</div>
          <button onClick={()=>setLang(l=>l==='en'?'hi':'en')} style={{...S.btnS,padding:'4px 10px',fontSize:10}}>{lang==='en'?'हिं':'EN'}</button>
        </div>
      </div>

      <div style={{display:'flex',flex:1,overflow:'hidden',minHeight:0}}>
        {/* Sidebar */}
        <div style={{width:220,minWidth:220,background:C.card,borderRight:`1px solid ${C.br}`,overflowY:'auto',flexShrink:0,padding:12,display:'none'}} id="learnSidebar" className="learnSidebar">
          <div style={{fontSize:9,letterSpacing:2,textTransform:'uppercase',color:C.mu,fontWeight:800,padding:'4px 2px 8px'}}>📚 {lang==='hi'?'अध्याय':'Chapters'}</div>
          {classData?.subjects.map(subj=>(
            <div key={subj.id}>
              <div style={{fontSize:11,fontWeight:800,color:C.mu,background:'rgba(108,99,255,.08)',padding:'7px 10px',borderRadius:9,marginBottom:3}}>{subj.icon} {lang==='hi'?subj.nameHi:subj.name}</div>
              <div style={{paddingLeft:8}}>
                {(subj.chapters.filter(Boolean) as import('@/lib/curriculum').Chapter[]).map((ch,chIdx)=>{
                  const done=prog[ch.id]?.completed; const act=curChap?.id===ch.id;
                  return (
                    <button key={ch.id} onClick={()=>openChap(ch,chIdx)} style={{display:'flex',alignItems:'center',gap:6,width:'100%',padding:'7px 8px',borderRadius:8,fontSize:11,fontWeight:600,border:'none',background:act?'rgba(67,233,123,.1)':done?'transparent':'transparent',color:act?C.a:done?'rgba(67,233,123,.6)':C.mu,cursor:'pointer',textAlign:'left',marginBottom:1,fontFamily:"'Nunito',sans-serif"}}>
                      {ch.icon} <span style={{flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{hi(ch.titleHi,ch.title)}</span>
                      <span style={{fontSize:9,color:C.y,fontWeight:800,background:'rgba(255,209,102,.1)',padding:'1px 5px',borderRadius:20,flexShrink:0}}>{ch.xp}</span>
                      {done&&<span style={{color:C.a,fontSize:10,flexShrink:0}}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div style={{marginTop:10,padding:10,background:C.card2,borderRadius:10,border:`1px solid ${C.br}`}}>
            {[{l:'Done',v:`${clDone}/${clTotal}`},{l:'XP',v:`⭐${totalXP}`},{l:'%',v:`${clPct}%`}].map((r,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:10,fontWeight:700,marginBottom:i<2?4:0}}>
                <span style={{color:C.mu}}>{r.l}</span><span style={{color:C.y,fontWeight:800}}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',minWidth:0}}>
          {!curChap?(
            /* Chapter select */
            <div style={{flex:1,overflowY:'auto',padding:20}}>
              <div style={{...S.fredoka,fontSize:24,marginBottom:4}}>{lang==='hi'?classData?.labelHi:classData?.label}</div>
              <p style={{color:C.mu,fontSize:13,fontWeight:600,marginBottom:20,lineHeight:1.6}}>{lang==='hi'?'"▶ अभी शुरू करें" दबाएं — animated lesson शुरू!':'Click "▶ Start Now" to begin your animated lesson!'}</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:14}}>
                {allChapsList.map((ch,idx)=>{
                  const done=prog[ch.id]?.completed;
                  return (
                    <div key={ch.id} style={{...S.card,padding:18,transition:'transform .2s',opacity:user?.plan==='trial'&&idx>=2?0.65:1,position:'relative'}}
                      onMouseEnter={e=>{if(!(user?.plan==='trial'&&idx>=2))(e.currentTarget as HTMLDivElement).style.transform='translateY(-3px)';}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform='translateY(0)';}}>
                      {user?.plan==='trial'&&idx>=2&&<div style={{position:'absolute',inset:0,background:'rgba(10,10,40,.75)',borderRadius:12,zIndex:5,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',backdropFilter:'blur(3px)'}}><div style={{fontSize:32,marginBottom:6}}>🔒</div><div style={{fontSize:11,fontWeight:800,color:'#fff',textAlign:'center',padding:'0 12px',lineHeight:1.5}}>Trial Account<br/><span style={{fontSize:10,color:'rgba(255,255,255,.7)'}}>Ask admin to unlock</span></div></div>}
                      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                        <div style={{fontSize:28}}>{ch.icon}</div>
                        <div>
                          <div style={{...S.fredoka,fontSize:15,lineHeight:1.2}}>{hi(ch.titleHi,ch.title)}</div>
                          <div style={{fontSize:10,color:C.mu,fontWeight:700}}>Ch. {idx+1}</div>
                        </div>
                      </div>
                      <div style={{display:'flex',gap:7,marginBottom:14,flexWrap:'wrap'}}>
                        <span style={{fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:20,background:'rgba(255,255,255,.06)',color:C.mu,border:'1px solid rgba(255,255,255,.08)'}}>📖 {ch.slides.length} slides</span>
                        <span style={{fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:20,background:'rgba(255,255,255,.06)',color:C.mu,border:'1px solid rgba(255,255,255,.08)'}}>⭐ {ch.xp} XP</span>
                        {done&&<span style={{fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:20,background:'rgba(67,233,123,.15)',color:C.a}}>✅ {lang==='hi'?'पूर्ण':'Done'}</span>}
                      </div>
                      <button style={{...(done?S.btnG:S.btnP),width:'100%',padding:'12px',fontSize:14}} onClick={()=>openChap(ch)}>
                        {done?`🔁 ${lang==='hi'?'दोबारा देखें':'Review'}`:`▶ ${lang==='hi'?'अभी शुरू करें':'Start Now'}`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ):(
            /* Slide view */
            <div style={{display:'flex',flexDirection:'column',flex:1,overflow:'hidden'}}>
              <div style={{flex:1,overflowY:'auto',padding:20,maxWidth:860,margin:'0 auto',width:'100%'}} ref={scrollRef}>
                {/* Progress dots */}
                <div style={{display:'flex',gap:3,marginBottom:14,alignItems:'center'}}>
                  {curChap.slides.map((_,i)=>(
                    <div key={i} onClick={()=>{setCurSlide(i);scrollRef.current?.scrollTo(0,0);}}
                      style={{height:5,borderRadius:3,cursor:'pointer',transition:'all .3s',flex:i===curSlide?2:1,background:i<curSlide?C.a:i===curSlide?C.p:'rgba(255,255,255,.1)'}}/>
                  ))}
                  <span style={{fontSize:10,color:C.mu,fontWeight:700,marginLeft:6,whiteSpace:'nowrap'}}>{curSlide+1}/{curChap.slides.length}</span>
                </div>
                {renderSlide(curChap.slides[curSlide])}
              </div>

              {/* Nav bar */}
              <div style={{position:'sticky',bottom:0,background:'rgba(13,13,43,.97)',borderTop:`1px solid ${C.br}`,padding:'11px 16px',display:'flex',alignItems:'center',gap:10,flexShrink:0,flexWrap:'wrap'}}>
                {curSlide>0&&<button onClick={prevSlide} style={{...S.btnS,padding:'10px 20px',fontSize:13}}>◀ {T.prev}</button>}
                <span style={{fontSize:11,color:C.mu,fontWeight:700,flex:1,textAlign:'center'}}>{curSlide+1} / {curChap.slides.length}</span>
                {curSlide<curChap.slides.length-1?(
                  <button onClick={nextSlide} style={{...S.btnP,padding:'10px 24px',fontSize:13}}>{T.next} ▶</button>
                ):!prog[curChap.id]?.completed?(
                  <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
                    {curChap.slides[curSlide]?.type==='quiz'&&(()=>{
                      const slide=curChap.slides[curSlide];
                      const total=slide.questions?.length||0;
                      const answered=slide.questions?.filter((_:unknown,qi:number)=>qDone[`${curChap.id}_${curSlide}_${qi}`]?.answered).length||0;
                      const correct=slide.questions?.filter((_:unknown,qi:number)=>qDone[`${curChap.id}_${curSlide}_${qi}`]?.correct).length||0;
                      if(answered>0&&answered<total) return <span style={{fontSize:11,color:C.y,fontWeight:700}}>{answered}/{total} answered</span>;
                      if(answered===total&&total>0) return <><span style={{fontSize:11,color:correct/total>=0.6?C.a:C.s,fontWeight:800}}>{correct}/{total} correct ({Math.round(correct/total*100)}%)</span><button onClick={retakeQuiz} style={{...S.btnS,padding:'7px 14px',fontSize:11}}>🔄 Retry</button></>;
                      return null;
                    })()}
                    <button onClick={completeChap} style={{...S.btnG,padding:'10px 24px',fontSize:13}}>🏆 {T.completeChapter}</button>
                  </div>
                ):(
                  <button onClick={()=>setCurChap(null)} style={{...S.btnP,padding:'10px 24px',fontSize:13}}>📚 {T.allChapters}</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* XP Popup */}
      {xpPop&&<div style={{position:'fixed',top:72,right:16,zIndex:9999,background:`linear-gradient(135deg,${C.y},${C.o})`,color:'#0D0D2B',padding:'9px 18px',borderRadius:50,fontSize:15,fontWeight:800,boxShadow:'0 7px 22px rgba(255,209,102,.6)',animation:'xpPop .4s cubic-bezier(.34,1.56,.64,1)'}}>⭐ +{xpPop} XP!</div>}

      {/* Completion */}
      {prog[curChap?.id||'']?.completed&&curSlide===(curChap?.slides?.length||1)-1&&(
        <div style={{position:'fixed',inset:0,background:'rgba(7,7,26,.85)',zIndex:850,display:'flex',alignItems:'center',justifyContent:'center',padding:20}} onClick={(e)=>{if(e.target===e.currentTarget)setCurChap(null);}}>
          <div style={{...S.card,padding:36,maxWidth:440,width:'100%',textAlign:'center',boxShadow:'0 20px 60px rgba(0,0,0,.6)'}}>
            <div style={{fontSize:68,marginBottom:12,animation:'trophyPop .5s cubic-bezier(.34,1.56,.64,1)'}}>🏆</div>
            <div style={{...S.fredoka,fontSize:28,background:`linear-gradient(135deg,${C.y},${C.o})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{T.chapterComplete}</div>
            <p style={{color:C.mu,fontSize:13,fontWeight:600,margin:'8px 0 16px',lineHeight:1.7}}>
              {lang==='hi'?`"${curChap?.titleHi||curChap?.title}" पूरा किया! 🚀`:`"${curChap?.title}" complete! 🚀`}
            </p>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,rgba(255,209,102,.2),rgba(255,159,67,.1))',border:'1px solid rgba(255,209,102,.4)',padding:'10px 22px',borderRadius:50,fontSize:18,fontWeight:800,color:C.y,marginBottom:16}}>⭐ +{curChap?.xp} {T.xpEarned}</div>
            <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:16}}>
              {[0,150,300].map(d=><span key={d} style={{fontSize:24,animation:`starPop .4s cubic-bezier(.34,1.56,.64,1) ${d}ms both`,display:'inline-block'}}>⭐</span>)}
            </div>
            {(()=>{const idx=allChapsList.findIndex(c=>c&&c.id===curChap?.id);const next=allChapsList[idx+1];return next?<button style={{...S.btnP,padding:'11px 24px',fontSize:13,marginBottom:9,width:'100%'}} onClick={()=>openChap(next)}>▶ {lang==='hi'?'अगला अध्याय':'Next Chapter'}: {hi(next.titleHi,next.title)}</button>:null;})()}
            {(()=>{
              const cls=curClass||user?.class_level||8;
              const cp=classProg(cls);
              const hasCert=certificates.find(c=>Number(c.class_level)===cls);
              // Only show certificate button on the LAST chapter of the class
              const isLastChap=!allChapsList[allChapsList.findIndex(c=>c&&c.id===curChap?.id)+1];
              const allDone=cp.done>=cp.total&&cp.total>0;
              // Only show cert for student's OWN class
              const isOwnClass=cls===(user?.class_level||curClass);
              if((allDone||hasCert)&&isLastChap&&isOwnClass) return(
                <button style={{...S.btnG,padding:'11px 24px',fontSize:13,marginBottom:9,width:'100%',background:hasCert?'linear-gradient(135deg,#FFD166,#FF9F43)':'linear-gradient(135deg,#43E97B,#38F9D7)'}} onClick={()=>claimCertificate(cls)} disabled={claimingCert}>
                  {claimingCert?'⏳ Generating...':(hasCert?`🎓 View Class ${cls} Certificate`:`🏆 Claim Full Class ${cls} Certificate!`)}
                </button>
              );
              return null;
            })()}
            <button style={{...S.btnS,padding:'11px 24px',fontSize:13,width:'100%'}} onClick={()=>setCurChap(null)}>📚 {T.allChapters}</button>
          </div>
        </div>
      )}

<AiBot doubtOpen={doubtOpen} setDoubtOpen={setDoubtOpen} doubtMsgs={doubtMsgs} doubtQ={doubtQ} setDoubtQ={setDoubtQ} sendDoubt={sendDoubt} lang={lang} T={T}/>
      <Styles/>
    </div>
  );
}

function AiBot({doubtOpen,setDoubtOpen,doubtMsgs,doubtQ,setDoubtQ,sendDoubt,lang,T}:{doubtOpen:boolean;setDoubtOpen:(v:boolean)=>void;doubtMsgs:{role:'bot'|'user';text:string}[];doubtQ:string;setDoubtQ:(v:string)=>void;sendDoubt:()=>void;lang:string;T:Record<string,string>}){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},[doubtMsgs]);
  return(
    <>
      <button onClick={()=>setDoubtOpen(!doubtOpen)} title="AI Doubt Bot" style={{position:'fixed',bottom:90,right:16,width:48,height:48,borderRadius:'50%',border:'2px solid rgba(108,99,255,.4)',background:`linear-gradient(135deg,#6C63FF,#FF6584)`,fontSize:20,boxShadow:'0 6px 20px rgba(108,99,255,.6)',zIndex:800,cursor:'pointer',animation:'orbPulse 2.5s ease-in-out infinite',display:'flex',alignItems:'center',justifyContent:'center'}}>🤖</button>
      {doubtOpen&&(
        <div style={{position:'fixed',bottom:148,right:16,width:300,maxWidth:'calc(100vw - 32px)',background:'#16183A',border:'1px solid rgba(108,99,255,.25)',borderRadius:18,boxShadow:'0 16px 44px rgba(0,0,0,.55)',zIndex:800,display:'flex',flexDirection:'column',overflow:'hidden',maxHeight:400}}>
          <div style={{padding:'11px 14px',borderBottom:'1px solid rgba(108,99,255,.2)',display:'flex',alignItems:'center',gap:9,background:'#1E2050'}}>
            <div style={{width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,#6C63FF,#FF6584)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>🤖</div>
            <div><div style={{fontSize:12,fontWeight:800}}>{T.aiDoubtBot}</div><div style={{fontSize:10,color:'#9090BB',fontWeight:600}}>{lang==='hi'?'Claude AI द्वारा':'By Claude AI'}</div></div>
            <button onClick={()=>setDoubtOpen(false)} style={{marginLeft:'auto',background:'none',border:'none',color:'#9090BB',fontSize:14,cursor:'pointer'}}>✕</button>
          </div>
          <div ref={ref} style={{flex:1,overflowY:'auto',padding:12,display:'flex',flexDirection:'column',gap:8}}>
            {doubtMsgs.map((m,i)=>{const ms=m.role==='bot'?{background:'rgba(108,99,255,.12)',border:'1px solid rgba(108,99,255,.2)',alignSelf:'flex-start' as const}:{background:'linear-gradient(135deg,#6C63FF,#FF6584)',color:'#fff',alignSelf:'flex-end' as const};return<div key={i} style={{fontSize:12,fontWeight:600,lineHeight:1.5,padding:'8px 11px',borderRadius:11,maxWidth:'90%',...ms}}>{m.text}</div>;})}
          </div>
          <div style={{padding:8,borderTop:'1px solid rgba(108,99,255,.2)',display:'flex',gap:6,background:'#1E2050'}}>
            <input style={{flex:1,padding:'7px 11px',borderRadius:50,border:'1px solid rgba(108,99,255,.25)',background:'rgba(255,255,255,.06)',color:'#F0F0FF',fontSize:11,fontWeight:600,outline:'none',fontFamily:"'Nunito',sans-serif"}} value={doubtQ} onChange={e=>setDoubtQ(e.target.value)} placeholder={T.askAnything} onKeyDown={e=>e.key==='Enter'&&sendDoubt()}/>
            <button onClick={sendDoubt} style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#6C63FF,#FF6584)',color:'#fff',fontSize:13,border:'none',cursor:'pointer'}}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

function Styles(){return(
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');
    *{font-family:'Nunito',sans-serif;box-sizing:border-box}
    @keyframes orbPulse{0%,100%{box-shadow:0 0 0 0 rgba(108,99,255,.5)}50%{box-shadow:0 0 0 10px transparent}}
    @keyframes botBob{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-9px) rotate(4deg)}}
    @keyframes arrowPulse{0%,100%{opacity:.4;transform:translateX(-2px)}50%{opacity:1;transform:translateX(2px)}}
    @keyframes xpPop{from{opacity:0;transform:translateY(-16px) scale(.85)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes trophyPop{from{transform:scale(0) rotate(-20deg)}to{transform:scale(1) rotate(0)}}
    @keyframes starPop{from{opacity:0;transform:scale(0) rotate(-30deg)}to{opacity:1;transform:scale(1) rotate(0)}}
    .bot-txt .hi{color:#43E97B;font-weight:800}
    .bot-txt .em{color:#FFD166;font-weight:800}
    .bot-txt .hot{color:#FF6584;font-weight:800}
    .bot-txt .cool{color:#38BFFF;font-weight:800}
    .callout{display:flex;gap:9px;padding:11px 13px;border-radius:11px;margin:10px 0;font-size:12px;font-weight:600;line-height:1.6;align-items:flex-start}
    .cal-tip{background:rgba(255,209,102,.08);border-left:3px solid #FFD166}
    .cal-info{background:rgba(56,191,255,.07);border-left:3px solid #38BFFF}
    .cal-warn{background:rgba(255,101,132,.07);border-left:3px solid #FF6584}
    .cal-ic{font-size:14px;flex-shrink:0;margin-top:1px}
    @media(min-width:640px){.learnSidebar{display:block!important}}
    ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#16183A}::-webkit-scrollbar-thumb{background:#6C63FF;border-radius:3px}
    select option{background:#1E2050;color:#F0F0FF}
  `}</style>
);}
