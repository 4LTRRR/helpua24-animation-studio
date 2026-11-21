import React from "react";
import {AbsoluteFill, Composition, Sequence, interpolate, useCurrentFrame} from "remotion";

const W=1080,H=1920;
const C={ink:"#080d12",navy:"#101d27",blue:"#3d9bb8",amber:"#d98235",paper:"#d8d0bd",red:"#a94438",white:"#e9e4d9",muted:"#81909a"};
const clamp={extrapolateLeft:"clamp" as const,extrapolateRight:"clamp" as const};
const Grain:React.FC=()=> <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",mixBlendMode:"soft-light",opacity:.22}} viewBox="0 0 1080 1920"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#grain)" opacity=".38"/><path d="M0 0H1080V1920H0Z" fill="none" stroke="#d5c6a6" strokeWidth="3" opacity=".18"/></svg>;
const Dust:React.FC=()=>{const f=useCurrentFrame();return <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} viewBox="0 0 1080 1920">{Array.from({length:34},(_,i)=>{const x=(i*173+Math.sin(f*.018+i)*45)%1080;const y=(i*281-f*(8+i%4)+2200)%1920;return <circle key={i} cx={x} cy={y} r={i%4===0?3:1.5} fill={i%3===0?C.amber:"#d7e0e3"} opacity={.18+(i%5)*.06}/>})}</svg>};
const Backdrop:React.FC<{tone?:string}>=({tone=C.ink})=><AbsoluteFill style={{background:tone,backgroundImage:"radial-gradient(ellipse at 50% 45%,#263746 0%,#101820 44%,#070b10 100%)"}}><div style={{position:"absolute",inset:0,opacity:.16,backgroundImage:"linear-gradient(90deg,transparent 49.8%,#7d8d98 50%,transparent 50.2%),linear-gradient(0deg,transparent 49.8%,#7d8d98 50%,transparent 50.2%)",backgroundSize:"90px 90px"}}/></AbsoluteFill>;
const Title:React.FC<{eyebrow:string;headline:string;frame:number}>=({eyebrow,headline,frame})=><><div style={{position:"absolute",top:100,left:70,color:C.amber,fontSize:23,fontWeight:900,letterSpacing:6,opacity:interpolate(frame,[0,18],[0,1],clamp)}}>{eyebrow}</div><div style={{position:"absolute",top:190,left:68,right:68,color:C.white,fontSize:55,fontWeight:950,lineHeight:1.06,letterSpacing:-2,textShadow:"0 8px 30px #000",opacity:interpolate(frame,[4,22],[0,1],clamp)}}>{headline}</div></>;
const Scratches:React.FC=()=> <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.24}} viewBox="0 0 1080 1920"><g stroke="#d2c7b4" strokeWidth="2" opacity=".5"><path d="M40 370l210 -18M760 520l230 -26M80 1380l150 -12M740 1600l260 -34M320 180l90 -8M50 1720l200 -20"/></g><g stroke="#05080b" strokeWidth="8" opacity=".5"><path d="M0 610l90 -7M900 120l180 -18M640 1880l140 -16"/></g></svg>;

const Surgeon:React.FC<{f:number}>=({f})=>{
 const arm=interpolate(Math.sin(f/13),[-1,1],[-7,7]);
 return <g>
  <ellipse cx="540" cy="1190" rx="310" ry="90" fill="#020508" opacity=".65"/>
  <path d="M330 1040 Q300 700 410 570 Q540 470 675 575 Q790 710 750 1050 L700 1200H380Z" fill="#1b5660" stroke="#78a5a3" strokeWidth="7"/>
  <path d="M405 650 Q540 560 675 655 L650 820H430Z" fill="#26777a"/>
  <path d="M420 590 Q390 480 460 420 Q540 360 620 420 Q690 490 650 600 L620 670H450Z" fill="#b7a58e"/>
  <path d="M430 500 Q540 380 650 500 L650 575 Q540 625 430 575Z" fill="#e4e1d6"/>
  <path d="M465 515 Q540 485 615 515" fill="none" stroke="#25333a" strokeWidth="16"/>
  <path d="M480 530l-12 14m140-14 12 14" stroke="#17252c" strokeWidth="8"/>
  <path d="M430 740 Q330 800 290 1010 Q275 1080 345 1090 L480 850Z" fill="#246d72" stroke="#8ab0aa" strokeWidth="5"/>
  <path d={`M650 740 Q760 800 ${770+arm} 990 Q780 1060 715 1080 L600 850Z`} fill="#246d72" stroke="#8ab0aa" strokeWidth="5"/>
  <path d="M340 1030l-28 100 80 30 55-120M735 1020l30 100-75 35-60-125" fill="#b99e83"/>
  <path d="M300 1150Q540 1080 780 1150" fill="none" stroke="#d2c7b4" strokeWidth="9" opacity=".5"/>
 </g>
};
const Patient:React.FC<{f:number}>=({f})=><g>
 <ellipse cx="540" cy="1320" rx="420" ry="120" fill="#030609" opacity=".65"/>
 <path d="M160 1160Q210 1000 390 980L690 980Q870 1010 930 1160L900 1430H180Z" fill="#d5d1c5"/>
 <path d="M220 1120Q330 1030 470 1050L680 1050Q820 1060 880 1150L850 1300H220Z" fill="#e9e5d9"/>
 <path d="M380 1010Q410 930 540 930Q675 930 700 1010L690 1100H390Z" fill="#b78f76"/>
 <path d="M415 970Q430 850 540 850Q650 850 670 970L640 1030H440Z" fill="#423c38"/>
 <path d="M430 965Q540 920 650 965" stroke="#d2b59d" strokeWidth="12" fill="none"/>
 <path d="M390 1070Q540 1110 700 1070" stroke="#9ca8a7" strokeWidth="5" fill="none"/>
 <path d="M540 870V750" stroke="#aab8bb" strokeWidth="5" opacity=".6"/>
 <path d="M540 750Q430 680 360 740M540 750Q650 680 720 740" stroke="#aab8bb" strokeWidth="4" fill="none" opacity=".55"/>
 <path d="M500 950Q540 980 580 950" stroke="#57483e" strokeWidth="5" fill="none"/>
 </g>;
const OperatingRoom:React.FC=()=>{const f=useCurrentFrame();const zoom=interpolate(f,[0,240],[1.04,1.19],clamp);return <AbsoluteFill style={{overflow:"hidden"}}><Backdrop/><div style={{position:"absolute",inset:0,transform:`scale(${zoom})`}}>
 <div style={{position:"absolute",left:-90,top:430,width:1260,height:28,background:"#91a3a5",transform:"rotate(-7deg)",boxShadow:"0 0 40px #8db6c7"}}/>
 <div style={{position:"absolute",left:90,top:500,width:900,height:750,background:"linear-gradient(135deg,#c3c9c4,#52636a 50%,#18242a)",clipPath:"polygon(8% 0,100% 8%,92% 100%,0 90%)",boxShadow:"0 40px 100px #000"}}/>
 <div style={{position:"absolute",left:160,top:590,width:760,height:580,background:"linear-gradient(135deg,#e2dfd4,#a5ada8)",clipPath:"polygon(8% 0,100% 8%,92% 100%,0 90%)"}}/>
 <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 1080 1920"><Patient f={f}/><Surgeon f={f}/></svg>
 <div style={{position:"absolute",left:85,top:1350,width:910,height:245,background:"#d7d0bd",color:"#202a2e",padding:28,transform:"rotate(-3deg)",boxShadow:"0 30px 70px #000"}}><div style={{fontSize:22,fontWeight:900,letterSpacing:3}}>КАРТА АНЕСТЕЗІЇ · СТАЦІОНАР</div><div style={{fontSize:35,fontWeight:900,marginTop:28}}>07:55 — ЗАГАЛЬНА АНЕСТЕЗІЯ</div><div style={{fontSize:28,marginTop:14}}>СТАН ПАЦІЄНТА: ПІД НАРКОЗОМ</div><div style={{position:"absolute",right:24,bottom:15,border:"5px solid #a94438",color:"#a94438",padding:"7px 14px",fontSize:22,fontWeight:900,transform:"rotate(-8deg)"}}>МЕДИЧНИЙ ЗАПИС</div></div>
 <div style={{position:"absolute",right:70,top:650,color:"#f2e6cf",fontSize:140,fontWeight:950,textShadow:"0 0 40px #d98235"}}>08:00</div>
 <div style={{position:"absolute",right:90,top:815,width:320,height:8,background:C.amber,boxShadow:"0 0 25px #d98235"}}/>
 </div><div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#05080b99,transparent 60%),linear-gradient(0deg,#05080b 0%,transparent 30%,transparent 75%,#05080b99 100%)"}}/><Title eyebrow="ДОКАЗ №01 · ЛІКАРНЯ" headline="О 08:00 ВІН БУВ ПІД НАРКОЗОМ" frame={f}/><Grain/><Dust/><Scratches/></AbsoluteFill>};

const LawyerFigure:React.FC<{f:number}>=({f})=><g>
 <ellipse cx="520" cy="1450" rx="360" ry="85" fill="#020406" opacity=".8"/>
 <path d="M300 1430Q310 1120 390 1000Q520 900 650 1000Q740 1130 760 1430Z" fill="#202a33" stroke="#71808a" strokeWidth="7"/>
 <path d="M390 1010Q390 830 510 790Q650 780 680 940L650 1090H390Z" fill="#c3a18a"/>
 <path d="M380 940Q370 760 520 735Q680 760 690 930L650 900Q620 830 520 840Q430 830 405 950Z" fill="#202326"/>
 <path d="M445 930Q480 900 510 930M550 930Q590 900 620 930" stroke="#19242b" strokeWidth="10" fill="none"/>
 <path d="M520 960l-15 55 30 8" stroke="#8c6957" strokeWidth="6" fill="none"/>
 <path d="M470 1050Q530 1080 590 1045" stroke="#493b37" strokeWidth="7" fill="none"/>
 <path d="M400 1100L520 1280L650 1090" fill="#e2ddd1"/>
 <path d="M520 1280L480 1450L580 1450Z" fill="#a94438"/>
 <path d={`M350 1190Q270 ${1250+Math.sin(f/15)*20} 240 1380L330 1410 460 1260Z`} fill="#27343d"/>
 <path d="M690 1180Q790 1260 830 1350L760 1410 620 1260Z" fill="#27343d"/>
</g>;
const LawyerDesk:React.FC=()=>{const f=useCurrentFrame();const pan=interpolate(f,[0,240],[0,-95],clamp);return <AbsoluteFill style={{overflow:"hidden"}}><Backdrop tone="#0b1117"/><div style={{position:"absolute",inset:0,transform:`translateY(${pan}px) scale(1.12)`}}>
 <div style={{position:"absolute",left:0,right:0,top:470,height:980,background:"linear-gradient(135deg,#26333b,#10171d 65%,#070b0f)"}}/>
 <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 1080 1920"><LawyerFigure f={f}/></svg>
 <div style={{position:"absolute",left:80,top:1210,width:920,height:500,background:"linear-gradient(145deg,#5b4937,#2b2925)",transform:"perspective(900px) rotateX(7deg)",boxShadow:"0 45px 90px #000"}}/>
 <div style={{position:"absolute",left:125,top:1150,width:560,height:410,background:"#d7d0bd",color:"#172129",padding:32,transform:"rotate(-5deg)",boxShadow:"0 30px 55px #000"}}><div style={{fontSize:24,fontWeight:900,letterSpacing:3}}>ЗАПИТ НА ДОКУМЕНТИ</div><div style={{height:3,background:"#707b7b",margin:"25px 0"}}/><div style={{fontSize:29,fontWeight:900}}>АКТ ПРО ВІДСУТНІСТЬ</div>{[0,1,2,3,4].map(i=><div key={i} style={{height:8,width:390-i*28,background:"#9ca19a",marginTop:25,opacity:.8}}/>)}<div style={{position:"absolute",right:22,bottom:24,color:"#a94438",border:"5px solid #a94438",padding:"6px 12px",fontSize:24,fontWeight:900,transform:"rotate(-9deg)"}}>ОРИГІНАЛ!</div></div>
 <div style={{position:"absolute",left:710,top:1320,width:230,height:300,background:"linear-gradient(135deg,#bcc2bf,#626d70)",transform:"rotate(9deg)",boxShadow:"0 20px 50px #000"}}><div style={{margin:25,color:"#1a252c",fontSize:23,fontWeight:900}}>08:00</div><div style={{margin:25,color:"#a94438",fontSize:34,fontWeight:900}}>ПІДПИС?</div><div style={{margin:25,width:140,height:5,background:"#263747",transform:"rotate(-8deg)"}}/></div>
 </div><div style={{position:"absolute",left:0,right:0,bottom:0,height:540,background:"linear-gradient(0deg,#070b10,transparent)"}}/><Title eyebrow="ДОКАЗ №02 · РОБОЧИЙ СТІЛ АДВОКАТА" headline="ДВА ДОКУМЕНТИ. ОДИН НЕМОЖЛИВИЙ ЧАС." frame={f}/><div style={{position:"absolute",right:80,top:830,fontSize:24,color:C.blue,letterSpacing:4,transform:"rotate(90deg)",transformOrigin:"right"}}>ПЕРЕВІРКА ФАКТІВ</div><Grain/><Dust/><Scratches/></AbsoluteFill>};

const Officer:React.FC<{f:number}>=({f})=><g>
 <ellipse cx="540" cy="1490" rx="340" ry="85" fill="#020406" opacity=".8"/>
 <path d="M290 1470Q320 1100 420 1020Q540 950 680 1030Q770 1160 800 1470Z" fill="#3a443b" stroke="#889078" strokeWidth="6"/>
 <path d="M410 1040Q390 900 450 820Q540 740 630 820Q700 900 660 1050L620 1100H430Z" fill="#b18f78"/>
 <path d="M400 880Q420 720 550 720Q680 740 690 890L640 850 600 800 470 820Z" fill="#31312c"/>
 <path d="M395 820Q540 680 690 820L710 860H380Z" fill="#4b5547" stroke="#9a9b7b" strokeWidth="8"/>
 <path d="M520 760L550 680L580 760" fill="#4b5547"/>
 <path d="M460 930h45m65 0h45" stroke="#1c292b" strokeWidth="12"/>
 <path d="M520 970l-8 48 28 8" stroke="#795f51" strokeWidth="6" fill="none"/>
 <path d="M470 1050Q540 1080 610 1045" stroke="#423b34" strokeWidth="7" fill="none"/>
 <path d={`M390 1160Q470 1230 ${500+Math.sin(f/12)*18} 1300L610 1290 570 1170Z`} fill="#65705a"/>
 <path d="M690 1160Q760 1230 790 1390L700 1430 590 1260Z" fill="#65705a"/>
 <path d="M520 1200l70 110 55-100" fill="none" stroke="#c3bba2" strokeWidth="7"/>
 </g>;
const SignatureReveal:React.FC=()=>{const f=useCurrentFrame();const hand=interpolate(f,[60,130],[0,180],clamp);return <AbsoluteFill style={{overflow:"hidden"}}><Backdrop tone="#0b1014"/><div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 55%,#3c3227 0%,#121719 58%,#070a0d 100%)"}}/>
 <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 1080 1920"><Officer f={f}/></svg>
 <div style={{position:"absolute",left:85,top:1170,width:910,height:500,background:"linear-gradient(135deg,#ddd5c3,#a9a18f)",transform:"rotate(-4deg)",boxShadow:"0 40px 90px #000",color:"#182027",padding:35}}><div style={{fontSize:24,fontWeight:900,letterSpacing:3}}>АКТ · ВІЙСЬКОВА ЧАСТИНА</div><div style={{fontSize:34,fontWeight:900,marginTop:45}}>ВІДПОВІДАЛЬНА ОСОБА</div><div style={{height:2,background:"#777d79",marginTop:50}}/><div style={{fontSize:25,marginTop:28}}>ПІДПИС / ПОГОДЖЕНО</div><svg style={{position:"absolute",left:70,top:250}} width="700" height="150"><path d={`M10 100 Q80 20 150 80 T300 80 T450 30 T650 75`} fill="none" stroke="#1d3450" strokeWidth="9" strokeLinecap="round" strokeDasharray="900" strokeDashoffset={900-hand*4}/></svg><div style={{position:"absolute",right:35,bottom:30,color:"#a94438",fontSize:26,fontWeight:900,border:"5px solid #a94438",padding:"7px 15px",transform:"rotate(-8deg)"}}>ПІДПИС</div></div>
 <div style={{position:"absolute",left:80,right:80,top:870,height:4,background:C.amber,boxShadow:"0 0 35px #d98235",transform:"rotate(-2deg)"}}/>
 <Title eyebrow="ДОКАЗ №03 · ПІДПИС" headline="ЦЕЙ ОФІЦЕР ОБІЦЯВ ДОПОМОГТИ З ЛІКУВАННЯМ" frame={f}/><div style={{position:"absolute",left:80,bottom:130,color:C.amber,fontSize:28,fontWeight:900,letterSpacing:4,opacity:interpolate(f,[110,155],[0,1],clamp)}}>ІМ'Я ЗБІГАЄТЬСЯ.</div><Grain/><Dust/><Scratches/></AbsoluteFill>};

const Transition:React.FC<{children:React.ReactNode;index:number}>=({children,index})=>{const f=useCurrentFrame();const enter=interpolate(f,[0,16],[0,1],clamp);const exit=interpolate(f,[220,240],[1,0],clamp);return <AbsoluteFill style={{opacity:Math.min(enter,exit),transform:`translateX(${(1-enter)*90}px)`}}>{children}<div style={{position:"absolute",left:0,top:0,bottom:0,width:8,background:index===1?C.blue:C.amber,opacity:.85}}/></AbsoluteFill>};
export const Episode04VisualTest:React.FC=()=> <AbsoluteFill>
 <Sequence from={0} durationInFrames={240}><Transition index={0}><OperatingRoom/></Transition></Sequence>
 <Sequence from={240} durationInFrames={240}><Transition index={1}><LawyerDesk/></Transition></Sequence>
 <Sequence from={480} durationInFrames={240}><Transition index={2}><SignatureReveal/></Transition></Sequence>
 <div style={{position:"absolute",left:55,right:55,bottom:48,height:3,background:"#64727b66"}}/>
 </AbsoluteFill>;
export const Episode04VisualTestComposition:React.FC=()=> <Episode04VisualTest/>;
