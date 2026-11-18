import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Character } from "./Character";
import { Lawyer } from "./Lawyer";

const colors = {
  ink: "#111a20",
  steel: "#34434a",
  gold: "#b78b55",
  paper: "#e8e3d7",
};

const Backdrop: React.FC<{kind: "barracks" | "office" | "archive" | "corridor"}> = ({kind}) => {
  const frame = useCurrentFrame();
  const glow = interpolate(Math.sin(frame / 34), [-1, 1], [0.08, 0.18]);
  const wall = kind === "office" ? "#29343d" : kind === "archive" ? "#252b2d" : kind === "corridor" ? "#202b30" : "#303b40";
  return <AbsoluteFill style={{background: wall}}>
    <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="wall2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={wall}/><stop offset="100%" stopColor="#101619"/></linearGradient>
        <radialGradient id="glow2"><stop offset="0%" stopColor="#d8b27c" stopOpacity="0.35"/><stop offset="100%" stopColor="#d8b27c" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#wall2)"/>
      <rect y="1450" width="1080" height="470" fill="#171b1d"/>
      {kind === "office" ? <>
        <rect x="90" y="170" width="330" height="680" fill="#171d22" stroke="#72583e" strokeWidth="16"/>
        {Array.from({length:5},(_,i)=><g key={i}><rect x="112" y={205+i*125} width="286" height="8" fill="#806346"/><rect x={130+(i%2)*25} y={225+i*125} width="40" height="95" fill="#59636a"/><rect x={185+(i%3)*20} y={235+i*125} width="38" height="85" fill="#79513d"/></g>)}
        <rect x="680" y="210" width="300" height="400" fill="#526875" opacity=".35"/>
        <path d="M0 1190 H1080" stroke="#6f523b" strokeWidth="28"/>
      </> : kind === "archive" ? <>
        {Array.from({length:4},(_,i)=><g key={i}><rect x={60+i*250} y="230" width="205" height="1060" fill="#171c1f" stroke="#5b4a39" strokeWidth="10"/>{Array.from({length:5},(_,j)=><rect key={j} x={78+i*250} y={270+j*195} width="170" height="145" fill={["#6b5744","#48565b","#756247"][((i+j)%3)]} opacity=".75"/>)}</g>)}
      </> : kind === "corridor" ? <>
        <path d="M0 0 L260 350 V1450 H0Z M1080 0 L820 350 V1450 H1080Z" fill="#151d21"/>
        <path d="M260 350 H820 V1450 H260Z" fill="#52616a" opacity=".16"/>
        <path d="M260 350 L540 100 L820 350" fill="none" stroke="#899398" strokeOpacity=".25" strokeWidth="12"/>
        <rect x="430" y="500" width="220" height="650" fill="#11191d" stroke="#59636a" strokeWidth="14"/>
      </> : <>
        <rect x="65" y="190" width="360" height="500" fill="#11191d" stroke="#657078" strokeWidth="16"/>
        <rect x="88" y="215" width="314" height="450" fill="#52636b"/>
        <path d="M245 215 V665 M88 430 H402" stroke="#1b272d" strokeWidth="12"/>
        <rect x="700" y="230" width="290" height="490" fill="#202a2e"/>
        <path d="M700 390 H990 M700 555 H990" stroke="#5e696c" strokeWidth="14"/>
      </>}
      <ellipse cx="820" cy="600" rx="400" ry="500" fill="url(#glow2)" opacity={glow}/>
      <rect width="1080" height="1920" fill="#070b0e" opacity=".18"/>
    </svg>
  </AbsoluteFill>;
};

const Soldier: React.FC<{emotion?: "neutral"|"worried"|"tired"|"determined"; pose?: "standing"|"walking"|"talking"|"worried"}> = ({emotion="worried",pose="standing"}) =>
  <AbsoluteFill><Character emotion={emotion} pose={pose} animationSpeed={0.9}/></AbsoluteFill>;

const Counsel: React.FC = () => <AbsoluteFill>
  <div style={{position:"absolute",right:"-15%",bottom:"-18%",width:"110%",height:"150%",zIndex:2}}>
    <Lawyer animationSpeed={0.8}/>
  </div>
</AbsoluteFill>;

const Paper: React.FC<{title:string; lines?:number; mark?:string}> = ({title,lines=4,mark}) => {
  const frame=useCurrentFrame();
  const rise=interpolate(frame,[0,25],[35,0],{extrapolateRight:"clamp"});
  return <div style={{position:"absolute",left:"13%",right:"13%",bottom:"13%",height:390,background:colors.paper,color:"#283137",padding:"34px 42px",boxShadow:"0 22px 70px #0009",transform:`translateY(${rise}px) rotate(-1deg)`,fontFamily:"Arial"}}>
    <div style={{fontSize:27,fontWeight:800,textAlign:"center",letterSpacing:2}}>{title}</div>
    {Array.from({length:lines},(_,i)=><div key={i} style={{height:5,background:"#92958f",opacity:.65,marginTop:26,width:`${92-(i%3)*11}%`}}/>)}
    {mark&&<div style={{marginTop:26,textAlign:"right",color:"#923f3c",fontWeight:800,fontSize:25}}>{mark}</div>}
  </div>;
};

const PhoneScreen: React.FC<{text:string; number?:string}> = ({text,number="НЕВІДОМИЙ НОМЕР"}) => <div style={{position:"absolute",right:"8%",top:"19%",width:"48%",height:430,border:"12px solid #111",borderRadius:42,background:"#dce2df",boxShadow:"0 25px 80px #0009",padding:26,color:"#172027",fontFamily:"Arial",textAlign:"center"}}>
  <div style={{fontSize:18,letterSpacing:2,color:"#53636a"}}>{number}</div>
  <div style={{marginTop:100,fontSize:31,fontWeight:800,lineHeight:1.25}}>{text}</div>
</div>;

const SceneTag: React.FC<{text:string}> = ({text}) => <div style={{position:"absolute",top:210,left:68,color:"#d8c3a4",fontFamily:"Arial",fontSize:22,fontWeight:700,letterSpacing:3}}>{text}</div>;

export const CallBackScene: React.FC = () => {
  const f=useCurrentFrame();
  const pulse=interpolate(Math.sin(f/5),[-1,1],[.96,1.04]);
  return <AbsoluteFill><Backdrop kind="barracks"/><Soldier emotion="worried" pose="talking"/><SceneTag text="03:26 · КІМНАТА ЧАСТИНИ"/><div style={{position:"absolute",right:"10%",top:"24%",fontSize:34,color:"#fff",fontWeight:800,background:"#111c",padding:24,transform:`scale(${pulse})`}}>ВХІДНИЙ ДЗВІНОК</div><PhoneScreen text="Ваш рапорт у нас. Але заберіть копію — інакше буде гірше." /></AbsoluteFill>;
};

export const RegistryScene: React.FC = () => <AbsoluteFill><Backdrop kind="archive"/><SceneTag text="АРХІВ · РАНОК"/><Paper title="ЖУРНАЛ РЕЄСТРАЦІЇ" lines={6} mark="№ 0418 · 14.11.2026"/><div style={{position:"absolute",top:"24%",left:"10%",right:"10%",color:"#f2e8d7",fontSize:34,fontWeight:800,textAlign:"center",fontFamily:"Arial"}}>У ЖУРНАЛІ Є ЗАПИС. АЛЕ НЕ ТОЙ, ЯКИЙ ШУКАЛИ.</div></AbsoluteFill>;

export const LawyerEvidenceScene: React.FC = () => <AbsoluteFill><Backdrop kind="office"/><Counsel/><Paper title="АДВОКАТСЬКИЙ ЗАПИТ" lines={5} mark="ВИХ. № 27/11"/><SceneTag text="ОФІС АДВОКАТА"/></AbsoluteFill>;

export const CorridorScene: React.FC = () => <AbsoluteFill><Backdrop kind="corridor"/><Soldier emotion="determined" pose="walking"/><SceneTag text="КОРИДОР ШТАБУ · 11:42"/><div style={{position:"absolute",top:"28%",right:"8%",width:"48%",padding:26,background:"#10191de8",borderLeft:`5px solid ${colors.gold}`,color:"#fff",fontSize:31,fontWeight:800,fontFamily:"Arial"}}>«Я особисто передавав цей документ»</div></AbsoluteFill>;

export const SignatureScene: React.FC = () => <AbsoluteFill><Backdrop kind="office"/><Counsel/><Paper title="КОПІЯ ЖУРНАЛУ" lines={3} mark="ПІДПИС: НЕ ЗБІГАЄТЬСЯ"/><div style={{position:"absolute",top:"25%",left:"10%",right:"10%",textAlign:"center",fontSize:35,color:"#fff",fontWeight:800,fontFamily:"Arial"}}>ПІДПИС У ЖУРНАЛІ НЕ НАЛЕЖИТЬ ЧЕРГОВОМУ.</div></AbsoluteFill>;

export const FinalRevealScene: React.FC = () => <AbsoluteFill><Backdrop kind="barracks"/><Soldier emotion="worried" pose="worried"/><PhoneScreen text="Не шукайте того, хто прийняв рапорт. Запитайте, хто наказав його переписати."/><SceneTag text="СПРАВА № 02 · ПРОДОВЖЕННЯ"/></AbsoluteFill>;

type Cue={start:number;end:number;text:string};
const cues:Cue[]=[
  {start:0,end:150,text:"Телефон задзвонив серед ночі. На лінії був той самий підрозділ."},
  {start:150,end:300,text:"«Ваш рапорт зареєстровано. Але приїдьте й заберіть свою копію»."},
  {start:300,end:450,text:"Військовий не повірив. Ще вчора йому казали, що документа не існує."},
  {start:450,end:600,text:"Адвокат попросив не їхати самому й нічого не підписувати."},
  {start:600,end:750,text:"Спочатку — офіційний адвокатський запит: журнал реєстрації, рух документа та копії."},
  {start:750,end:900,text:"У журналі справді був номер 0418. Але навпроти нього стояв інший зміст."},
  {start:900,end:1050,text:"Замість рапорту про лікування — звернення з кадрового питання."},
  {start:1050,end:1200,text:"Адвокат вимагав пояснити, хто і на якій підставі змінив дані."},
  {start:1200,end:1350,text:"І тоді знайшовся військовий, який сказав: «Я особисто передавав цей документ»."},
  {start:1350,end:1500,text:"Та його підпис у журналі не збігався з підписом на копії."},
  {start:1500,end:1650,text:"Це вже було не просто зникнення рапорту. Хтось міг підмінити запис."},
  {start:1650,end:1800,text:"Адвокат попросив зберегти оригінал журналу та записи камер за потрібну дату."},
  {start:1800,end:2100,text:"У цей момент військовому прийшло нове повідомлення. І цього разу воно назвало ім’я."},
];
export const Episode02Narration: React.FC = () => {
  const frame=useCurrentFrame();
  const cue=cues.find(c=>frame>=c.start&&frame<c.end);
  return <AbsoluteFill style={{pointerEvents:"none",zIndex:30}}>
    <div style={{position:"absolute",top:86,left:68,padding:"12px 18px",background:"rgba(8,13,18,.65)",borderLeft:`4px solid ${colors.gold}`,color:"rgba(255,255,255,.84)",fontFamily:"Arial",fontSize:22,fontWeight:700,letterSpacing:3}}>HELPUA24 / СПРАВА № 02</div>
    {cue&&<div style={{position:"absolute",left:64,right:100,bottom:420,padding:"22px 26px",background:"linear-gradient(110deg,rgba(7,12,17,.95),rgba(17,24,31,.86))",borderLeft:`5px solid ${colors.gold}`,borderRadius:8,boxShadow:"0 16px 50px rgba(0,0,0,.32)"}}>
      <div style={{marginBottom:8,color:"#c9a575",fontFamily:"Arial",fontSize:15,fontWeight:700,letterSpacing:2}}>ХТО ЗАРЕЄСТРУВАВ РАПОРТ?</div>
      <div style={{color:"#fff",fontFamily:"Arial",fontSize:34,lineHeight:1.22,fontWeight:700}}>{cue.text}</div>
    </div>}
  </AbsoluteFill>;
};

export const Episode02: React.FC = () => <AbsoluteFill>
  <Sequence durationInFrames={300}><CallBackScene/></Sequence>
  <Sequence from={300} durationInFrames={300}><RegistryScene/></Sequence>
  <Sequence from={600} durationInFrames={300}><LawyerEvidenceScene/></Sequence>
  <Sequence from={900} durationInFrames={300}><CorridorScene/></Sequence>
  <Sequence from={1200} durationInFrames={300}><SignatureScene/></Sequence>
  <Sequence from={1500} durationInFrames={600}><FinalRevealScene/></Sequence>
  <Sequence><Episode02Narration/></Sequence>
</AbsoluteFill>;
