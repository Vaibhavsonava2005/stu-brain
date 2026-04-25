'use client';
import { useEffect, useRef, useState } from 'react';

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'particles'|'logo'|'text'|'done'>('particles');
  const [logoScale, setLogoScale] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    // Particle burst system
    type P = { x:number;y:number;vx:number;vy:number;r:number;color:string;life:number;maxLife:number;};
    const particles: P[] = [];
    const colors = ['#6C63FF','#FF6584','#43E97B','#FFD166','#38BFFF'];
    
    // Create burst from center
    for (let i = 0; i < 120; i++) {
      const angle = (i / 120) * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      particles.push({
        x: W/2, y: H/2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 4 + 1,
        color: colors[i % colors.length],
        life: 0, maxLife: 60 + Math.random() * 40
      });
    }

    // Neural network lines
    type Node = { x:number;y:number;vx:number;vy:number; };
    const nodes: Node[] = Array.from({length:20}, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-.5)*1.5, vy: (Math.random()-.5)*1.5
    }));

    let frame = 0;
    let raf = 0;

    const draw = () => {
      ctx.fillStyle = `rgba(10,10,30,${frame < 10 ? frame/10 : 0.15})`;
      ctx.fillRect(0, 0, W, H);

      // Draw neural lines
      ctx.strokeStyle = 'rgba(108,99,255,0.15)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i+1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if (d < 200) {
            ctx.globalAlpha = (1-d/200)*0.3;
            ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y); ctx.stroke();
          }
        }
        nodes[i].x += nodes[i].vx; nodes[i].y += nodes[i].vy;
        if (nodes[i].x<0||nodes[i].x>W) nodes[i].vx*=-1;
        if (nodes[i].y<0||nodes[i].y>H) nodes[i].vy*=-1;
      }
      ctx.globalAlpha = 1;

      // Draw particles
      let alive = 0;
      for (const p of particles) {
        p.life++; p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.vx *= 0.98;
        const t = p.life / p.maxLife;
        if (t < 1) {
          alive++;
          const alpha = t < 0.3 ? t/0.3 : 1 - (t-0.3)/0.7;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * (1 - t*0.5), 0, Math.PI*2);
          ctx.fillStyle = p.color;
          ctx.fill();
          // Glow
          ctx.shadowBlur = 8; ctx.shadowColor = p.color;
          ctx.fill(); ctx.shadowBlur = 0;
        }
      }
      ctx.globalAlpha = 1;
      frame++;

      if (frame === 20) {
        setPhase('logo');
        setLogoOpacity(0); setLogoScale(0);
        // Animate logo in
        let s = 0, o = 0;
        const logoAnim = setInterval(() => {
          s = Math.min(1, s + 0.06); o = Math.min(1, o + 0.08);
          setLogoScale(s < 0.5 ? s*1.3 : 1 + (1-s)*0.3); // overshoot bounce
          setLogoOpacity(o);
          if (s >= 1) { clearInterval(logoAnim); setPhase('text'); setTextOpacity(0);
            let to = 0; const textAnim = setInterval(() => {
              to = Math.min(1, to + 0.06); setTextOpacity(to);
              if (to >= 1) { clearInterval(textAnim);
                setTimeout(() => { setFadeOut(true); setTimeout(onDone, 600); }, 1000);
              }
            }, 20);
          }
        }, 20);
      }

      if (alive > 0 || frame < 80) raf = requestAnimationFrame(draw);
      else if (frame >= 80) { raf = requestAnimationFrame(draw); } // keep neural bg
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div style={{position:'fixed',inset:0,zIndex:9999,background:'#0A0A1E',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',transition:'opacity .6s',opacity:fadeOut?0:1}}>
      <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%'}}/>
      <div style={{position:'relative',zIndex:1,textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:0}}>
        {/* Logo with bounce animation */}
        <div style={{transform:`scale(${logoScale})`,opacity:logoOpacity,transition:'none',marginBottom:16}}>
          <img src="/logo.png" alt="STU-BRAIN" style={{width:120,height:120,borderRadius:26,boxShadow:`0 0 60px rgba(108,99,255,0.8), 0 0 120px rgba(255,101,132,0.4)`,filter:'drop-shadow(0 0 20px rgba(108,99,255,0.9))'}}/>
        </div>
        {/* Text */}
        <div style={{opacity:textOpacity,transform:`translateY(${(1-textOpacity)*20}px)`,transition:'none'}}>
          <div style={{fontFamily:"'Fredoka One','Nunito',sans-serif",fontSize:36,fontWeight:900,background:'linear-gradient(135deg,#6C63FF,#FF6584)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',letterSpacing:2}}>STU-BRAIN</div>
          <div style={{fontFamily:"'Nunito',sans-serif",fontSize:13,color:'rgba(255,255,255,.5)',fontWeight:700,letterSpacing:3,marginTop:4}}>AI EDUCATION PLATFORM</div>
          <div style={{marginTop:20,display:'flex',gap:6,justifyContent:'center'}}>
            {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:'50%',background:'#6C63FF',animation:`dot ${0.8}s ${i*0.2}s ease-in-out infinite alternate`,opacity:0.8}}/>)}
          </div>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800;900&display=swap');@keyframes dot{from{transform:scale(1);opacity:.4}to{transform:scale(1.5);opacity:1}}`}</style>
    </div>
  );
}
