import React from "react";
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from "remotion";
import {Character} from "./Character";
import {Lawyer} from "./Lawyer";

const C={bg:"#080d12",panel:"#14212b",orange:"#d98235",blue:"#3d9bb8",white:"#eee8dc",muted:"#aab5b8"};
const clamp={extrapolateLeft:"clamp" as const,extrapolateRight:"clamp" as const};

const Room:React.FC<{children:React.ReactNode;light?:string}>=({children,light="#263744"})=><AbsoluteFill style={{background:"radial-gradient(ellipse at 50% 35%,"+light+" 0%,#111a22 48%,#05090d 100%)",overflow:"hidden"}}>
<div style={{position:"absolute",inset:0,opacity:.22,backgroundImage:"linear-gradient(90deg,transparent 49.8%,#91a2aa 50%,transparent 50.2%),linear-gradient(0deg,transparent 49.8%,#91a2aa 50%,transparent 50.2%)",backgroundSize:"100px 100px"}}/>
<div style={{position:"absolute",left:0,right:0,bottom:0,height:"30%",background:"linear-gradient(0deg,#05080b,#101a20)"}}/>
{children}
</AbsoluteFill>;

const Caption:React.FC<{tag:string;title:string;sub:string}>=({tag,title,sub})=><>
<div style={{position:"absolute",top:65,left:55,color:C.orange,fontSize:22,fontWeight:900,letterSpacing:5,textShadow:"0 3px 14px #000"}}>{tag}</div>
<div style={{position:"absolute",top:125,left:52,right:52,color:C.white,fontSize:47,fontWeight:950,lineHeight:1.06,textShadow:"0 5px 25px #000"}}>{title}</div>
<div style={{position:"absolute",bottom:105,left:55,right:55,color:C.muted,fontSize:23,fontWeight:800,letterSpacing:2,textShadow:"0 3px 15px #000"}}>{sub}</div>
</>;

const SoldierAtUnit:React.FC=()=>{const f=useCurrentFrame();const x=interpolate(f,[0,150,300],[500,260,0],clamp);return <Room light="#27343b">
<div style={{position:"absolute",left:0,right:0,top:"38%",height:18,background:"#46545a"}}/>
<div style={{position:"absolute",left:90,top:650,width:900,height:650,background:"linear-gradient(135deg,#3b4942,#17221e)",border:"8px solid #59645a",boxShadow:"0 30px 70px #000"}}/>
<div style={{position:"absolute",left:120,top:710,color:"#d9d2c4",fontSize:28,fontWeight:900,letterSpacing:4}}>ВІЙСЬКОВА ЧАСТИНА · 08:00</div>
<div style={{position:"absolute",left:80,bottom:0,width:430,height:1050,transform:"translateX("+x+"px) scale(.9)"}}><Character pose="walking" emotion="worried" animationSpeed={1.2}/></div>
<div style={{position:"absolute",right:35,bottom:0,width:360,height:950}}><Character pose="standing" emotion="neutral" animationSpeed={.8}/></div>
<div style={{position:"absolute",right:80,top:610,width:330,height:250,background:"#ddd5c4",color:"#1a2429",padding:22,boxShadow:"0 16px 40px #000"}}><div style={{fontSize:20,fontWeight:900}}>ЖУРНАЛ ЧАСТИНИ</div><div style={{fontSize:52,fontWeight:950,marginTop:25}}>08:00</div><div style={{fontSize:22,color:"#a33b31",fontWeight:900}}>НЕ З'ЯВИВСЯ</div></div>
<Caption tag="СЦЕНА 01 · ВІЙСЬКОВА ЧАСТИНА" title="ЙОГО ВЖЕ ЗАПИСАЛИ ЯК ВІДСУТНЬОГО" sub="РАНКОВИЙ РАПОРТ · 08:00"/>
</Room>};

const Patient:React.FC=()=>{const f=useCurrentFrame();return <g transform={"translate(0 "+Math.sin(f/15)*2+")"}>
<ellipse cx="540" cy="1270" rx="420" ry="95" fill="#020609" opacity=".65"/>
<path d="M120 1080Q210 930 390 940L720 940Q900 980 970 1120L930 1390H150Z" fill="#d5d9d4" stroke="#7e8a88" strokeWidth="8"/>
<path d="M360 970Q390 820 535 820Q680 820 720 980L690 1090H390Z" fill="#c79576"/>
<path d="M385 925Q410 790 540 790Q670 800 690 930Q540 980 385 930Z" fill="#3a302c"/>
<path d="M410 925Q470 950 520 925M560 925Q610 950 660 925" stroke="#372d29" strokeWidth="12" fill="none"/>
<path d="M520 980Q540 990 560 980" stroke="#604337" strokeWidth="6" fill="none"/>
</g>};

const Surgeon:React.FC=()=>{const f=useCurrentFrame();const a=Math.sin(f/9)*18;const b=Math.sin(f/11+1)*14;return <g>
<ellipse cx="540" cy="1130" rx="250" ry="65" fill="#020609" opacity=".7"/>
<path d="M330 1080Q300 780 390 620Q530 500 690 620Q790 780 750 1080L690 1190H390Z" fill="#246b70" stroke="#a3c0b9" strokeWidth="7"/>
<path d="M400 650Q390 520 470 450Q550 390 640 460Q700 530 660 660L620 710H430Z" fill="#b98d70"/>
<path d="M390 540Q410 390 540 390Q680 400 690 550L650 600Q540 530 430 600Z" fill="#e4e5de"/>
<path d="M430 540Q540 500 650 540" stroke="#24323a" strokeWidth="22" fill="none"/>
<path d={"M390 720Q300 800 "+(310+a)+" 1030"} stroke="#246b70" strokeWidth="95" strokeLinecap="round" fill="none"/>
<path d={"M690 720Q790 800 "+(770+b)+" 1030"} stroke="#246b70" strokeWidth="95" strokeLinecap="round" fill="none"/>
<path d={"M310 "+(1030+a)+"L460 1110M770 "+(1030+b)+"L650 1110"} stroke="#c99678" strokeWidth="42" strokeLinecap="round" fill="none"/>
<circle cx={460+a*.3} cy="1110" r="22" fill="#c99678"/><circle cx={650+b*.3} cy="1110" r="22" fill="#c99678"/>
</g>};

const OperatingRoom:React.FC=()=>{const f=useCurrentFrame();return <Room light="#234149">
<div style={{position:"absolute",left:100,top:510,width:880,height:900,background:"linear-gradient(140deg,#657579,#1c2c32)",clipPath:"polygon(8% 0,100% 8%,92% 100%,0 90%)",boxShadow:"0 40px 90px #000"}}/>
<div style={{position:"absolute",left:120,top:590,width:820,height:680,background:"linear-gradient(135deg,#e0e2d9,#89999a)",clipPath:"polygon(8% 0,100% 8%,92% 100%,0 90%)"}}/>
<svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 1080 1920"><Patient/><Surgeon/></svg>
<div style={{position:"absolute",right:50,top:600,width:220,height:350,background:"#1a252c",border:"8px solid #82979a",borderRadius:20,padding:20,color:"#e8e9df"}}><div style={{fontSize:22,fontWeight:900}}>МОНІТОР</div><svg width="180" height="170"><path d={"M0 90L30 90L45 "+(60+Math.sin(f/5)*8)+"L60 120L80 35L98 140L115 90L180 90"} stroke="#57c6b0" strokeWidth="5" fill="none"/></svg><div style={{fontSize:30,fontWeight:900,color:"#63cdb3"}}>ПУЛЬС 78</div></div>
<Caption tag="СЦЕНА 02 · ОПЕРАЦІЙНА" title="АЛЕ В ЦЕЙ САМИЙ ЧАС ВІН БУВ ПІД НАРКОЗОМ" sub="07:55 · ЛІКАРІ ПРОВОДЯТЬ ОПЕРАЦІЮ"/>
</Room>};

const LawyerScene:React.FC=()=><Room light="#2b3038">
<div style={{position:"absolute",left:70,right:70,bottom:330,height:420,background:"linear-gradient(135deg,#614b38,#29231f)",transform:"perspective(900px) rotateX(8deg)",boxShadow:"0 40px 90px #000"}}/>
<div style={{position:"absolute",left:20,bottom:180,width:430,height:1120}}><Lawyer/></div>
<div style={{position:"absolute",left:430,top:700,width:500,height:300,background:"#e2dccd",color:"#1b252b",padding:24,boxShadow:"0 18px 50px #000"}}><div style={{fontSize:22,fontWeight:900}}>МЕДИЧНА КАРТА</div><div style={{fontSize:62,fontWeight:950,marginTop:20}}>07:55</div><div style={{height:4,background:"#87908d",marginTop:16}}/><div style={{fontSize:22,marginTop:18}}>ОПЕРАЦІЯ ТРИВАЄ</div></div>
<div style={{position:"absolute",right:45,top:1120,width:430,height:260,background:"#d7d0c0",color:"#1b252b",padding:22,boxShadow:"0 20px 50px #000"}}><div style={{fontSize:21,fontWeight:900}}>РАПОРТ ЧАСТИНИ</div><div style={{fontSize:55,fontWeight:950,marginTop:16}}>08:00</div><div style={{fontSize:22,color:"#a43d33",fontWeight:900}}>ЗАПИСАНО ВІДСУТНІМ</div></div>
<Caption tag="СЦЕНА 03 · АДВОКАТСЬКИЙ ОФІС" title="АДВОКАТ ЗІСТАВЛЯЄ ДВА ДОКУМЕНТИ" sub="ДАТИ НЕ МОЖУТЬ БУТИ ПРАВДОЮ ОДНОЧАСНО"/>
</Room>;

const OfficerScene:React.FC=()=>{const f=useCurrentFrame();const hand=interpolate(f,[0,150,300],[0,1,0],clamp);return <Room light="#302e25">
<div style={{position:"absolute",left:15,bottom:160,width:420,height:1120}}><Character pose="talking" emotion="determined" animationSpeed={1}/></div>
<div style={{position:"absolute",right:15,bottom:160,width:420,height:1120,filter:"hue-rotate(35deg) saturate(.65)"}}><Character pose="worried" emotion="worried" animationSpeed={.7}/></div>
<div style={{position:"absolute",left:300,top:930,width:650,height:300,background:"#d7d0c0",boxShadow:"0 25px 60px #000",padding:24,color:"#19232a"}}><div style={{fontSize:22,fontWeight:900}}>АКТ ПРО ВІДСУТНІСТЬ</div><div style={{fontSize:20,marginTop:14}}>ПІДПИС ВІДПОВІДАЛЬНОЇ ОСОБИ</div><svg width="570" height="100"><path d={"M20 70Q120 "+(30+hand*15)+" 220 65T430 40T550 60"} stroke="#1c3452" strokeWidth="7" fill="none"/></svg></div>
<Caption tag="СЦЕНА 04 · КАБІНЕТ ОФІЦЕРА" title="ТОЙ, ХТО ОБІЦЯВ ДОПОМОГТИ, ПІДПИСАВ ДОКУМЕНТ" sub="ПІДПИС ПОТРІБНО ПЕРЕВІРИТИ"/>
</Room>};

const PhoneScene:React.FC=()=>{const f=useCurrentFrame();return <Room light="#182832">
<div style={{position:"absolute",left:0,bottom:170,width:430,height:1150}}><Lawyer/></div>
<div style={{position:"absolute",right:105,top:650,width:360,height:650,border:"14px solid #69777b",borderRadius:55,background:"#0a1219",boxShadow:"0 30px 90px #000",padding:20,color:C.white,textAlign:"center"}}><div style={{fontSize:22,letterSpacing:4,marginTop:45}}>ВХІДНИЙ ДЗВІНОК</div><div style={{fontSize:60,fontWeight:950,marginTop:80}}>НЕВІДОМИЙ</div><div style={{fontSize:100,color:C.orange,marginTop:55,transform:"scale("+(1+Math.sin(f/7)*.05)+")"}}>☎</div><div style={{fontSize:25,color:C.orange,fontWeight:900,marginTop:70}}>ПРИХОВАНИЙ НОМЕР</div></div>
<Caption tag="СЦЕНА 05 · НЕВІДОМИЙ ДЗВІНОК" title="«ВИ НЕ ПОВИННІ БУЛИ ЙОГО БАЧИТИ»" sub="АДВОКАТ РОЗУМІЄ: ХТОСЬ ЗНАЄ ПРО РОЗСЛІДУВАННЯ"/>
</Room>};

const RevealScene:React.FC=()=><Room light="#302c25">
<div style={{position:"absolute",left:0,bottom:170,width:410,height:1150}}><Lawyer/></div>
<div style={{position:"absolute",right:0,bottom:170,width:410,height:1120}}><Character pose="standing" emotion="worried"/></div>
<div style={{position:"absolute",left:260,top:690,width:620,height:360,background:"#e1d9c8",color:"#17222a",padding:26,boxShadow:"0 25px 60px #000"}}><div style={{fontSize:23,fontWeight:900}}>ЗБІГ ПІДПИСУ</div><div style={{fontSize:43,fontWeight:950,marginTop:40,color:"#a63f35"}}>ОФІЦЕР ЧАСТИНИ</div><div style={{fontSize:22,marginTop:25}}>ПІДПИС НА АКТІ ТА В РАПОРТІ</div></div>
<Caption tag="СЦЕНА 06 · РОЗКРИТТЯ" title="ВІН ЗНАЙШОВ ТОГО, ХТО СТОЯВ ЗА ДОКУМЕНТОМ" sub="АЛЕ ЧОМУ ОФІЦЕР ЗРОБИВ ЦЕ?"/>
</Room>;

const EndScene:React.FC=()=> <Room light="#17232c">
<div style={{position:"absolute",left:0,bottom:160,width:420,height:1150}}><Lawyer/></div>
<div style={{position:"absolute",right:0,bottom:160,width:420,height:1150}}><Character pose="worried" emotion="worried"/></div>
<div style={{position:"absolute",top:720,left:80,right:80,textAlign:"center",fontSize:64,fontWeight:950,color:C.white,textShadow:"0 6px 30px #000"}}>ЦЕ ЛИШЕ ПОЧАТОК</div>
<div style={{position:"absolute",top:840,left:80,right:80,textAlign:"center",fontSize:30,fontWeight:900,color:C.orange,letterSpacing:5}}>HELPUA24 · ПРОДОВЖЕННЯ СКОРО</div>
</Room>;

const shots=[SoldierAtUnit,OperatingRoom,LawyerScene,OfficerScene,PhoneScene,RevealScene,EndScene];
export const Episode04VisualTest:React.FC=()=><AbsoluteFill>
{shots.map((Comp,i)=><Sequence key={i} from={i*510} durationInFrames={510}><Comp/></Sequence>)}
</AbsoluteFill>;
