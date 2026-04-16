'use client';
import { useEffect, useRef } from 'react';

export default function AIBackground3D({ intensity = 1 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    const onResize = () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener('resize', onResize);

    const COLS = ['#6C63FF','#43E97B','#38BFFF','#FFD166','#FF6584'];
    type Node = { x:number;y:number;z:number;vx:number;vy:number;vz:number;r:number;c:string;t:number;p:number;ps:number };
    type Lbl = { x:number;y:number;z:number;vx:number;vy:number;txt:string;o:number };

    const nodes: Node[] = Array.from({length:Math.floor(42*intensity)},(_,i)=>({
      x:Math.random()*W, y:Math.random()*H, z:Math.random()*400+50,
      vx:(Math.random()-.5)*.45, vy:(Math.random()-.5)*.35, vz:(Math.random()-.5)*.5,
      r:Math.random()*4+2, c:COLS[i%COLS.length], t:i%4,
      p:Math.random()*Math.PI*2, ps:.018+Math.random()*.025,
    }));

    const LTXT = ['AI','ML','DL','∑','⚙','λ','∞','σ','∇','GPU','LLM','RAG','🤖','⚡'];
    const lbls: Lbl[] = Array.from({length:16},(_,i)=>({
      x:Math.random()*W, y:Math.random()*H, z:Math.random()*300+100,
      vx:(Math.random()-.5)*.28, vy:(Math.random()-.5)*.2,
      txt:LTXT[i%LTXT.length], o:Math.random()*.12+.04,
    }));

    const proj = (x:number,y:number,z:number) => {
      const s=480/(480+z); return {px:W/2+(x-W/2)*s, py:H/2+(y-H/2)*s, s};
    };

    const hex=(n:number)=>Math.max(0,Math.min(255,Math.floor(n))).toString(16).padStart(2,'0');

    const draw = () => {
      ctx.clearRect(0,0,W,H);

      // Connections
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<155){
          const a=(1-d/155)*0.09*intensity;
          const pi=proj(nodes[i].x,nodes[i].y,nodes[i].z);
          const pj=proj(nodes[j].x,nodes[j].y,nodes[j].z);
          ctx.beginPath(); ctx.moveTo(pi.px,pi.py); ctx.lineTo(pj.px,pj.py);
          ctx.strokeStyle=nodes[i].c+hex(a*255); ctx.lineWidth=pi.s*.7; ctx.stroke();
        }
      }

      // Nodes
      for(const n of nodes){
        n.x+=n.vx; n.y+=n.vy; n.z+=n.vz; n.p+=n.ps;
        if(n.x<0||n.x>W)n.vx*=-1; if(n.y<0||n.y>H)n.vy*=-1; if(n.z<20||n.z>500)n.vz*=-1;
        const {px,py,s}=proj(n.x,n.y,n.z);
        const r=n.r*s*(1+Math.sin(n.p)*.22);
        const a=Math.min(s*.42*intensity,.65);
        // Glow
        const g=ctx.createRadialGradient(px,py,0,px,py,r*4);
        g.addColorStop(0,n.c+hex(a*140)); g.addColorStop(1,n.c+'00');
        ctx.beginPath(); ctx.arc(px,py,r*4,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
        // Shape
        ctx.beginPath();
        if(n.t===0) ctx.arc(px,py,r,0,Math.PI*2);
        else if(n.t===1){for(let k=0;k<6;k++){const a2=(k/6)*Math.PI*2;k?ctx.lineTo(px+r*Math.cos(a2),py+r*Math.sin(a2)):ctx.moveTo(px+r*Math.cos(a2),py+r*Math.sin(a2));}ctx.closePath();}
        else if(n.t===2){ctx.moveTo(px,py-r);ctx.lineTo(px+r,py+r);ctx.lineTo(px-r,py+r);ctx.closePath();}
        else ctx.rect(px-r*.75,py-r*.75,r*1.5,r*1.5);
        ctx.fillStyle=n.c+hex(a*255); ctx.fill();
      }

      // Labels
      for(const l of lbls){
        l.x+=l.vx; l.y+=l.vy;
        if(l.x<0||l.x>W)l.vx*=-1; if(l.y<0||l.y>H)l.vy*=-1;
        const {px,py,s}=proj(l.x,l.y,l.z);
        ctx.font=`800 ${Math.max(8,Math.floor(13*s))}px 'Nunito',sans-serif`;
        ctx.fillStyle=`rgba(108,99,255,${l.o*s*intensity})`;
        ctx.fillText(l.txt,px,py);
      }

      animRef.current=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{ cancelAnimationFrame(animRef.current); window.removeEventListener('resize',onResize); };
  },[intensity]);

  return <canvas ref={canvasRef} style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:.9}}/>;
}
