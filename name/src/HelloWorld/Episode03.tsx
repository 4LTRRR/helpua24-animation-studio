import React from "react";
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from "remotion";
import {Character} from "./Character";
import {Lawyer} from "./Lawyer";

const gold="#c9a575";
const panel: React.CSSProperties={position:"absolute",left:64,right:64,bottom:330,padding:"24px 28px",background:"linear-gradient(110deg,rgba(7,12,17,.96),rgba(17,24,31,.88))",borderLeft:"5px solid "+gold,borderRadius:8,boxShadow:"0 16px 50px rgba(0,0,0,.4)",fontFamily:"Arial"};
const Backdrop:React.FC<{kind:"office"|"archive"|"corridor"|"room"}>=({kind})=>{
 const f=useCurrentFrame(); const glow=interpolate(Math.sin(f/38),[-1,1],[.08,.2]);
 const wall=kind==="office"?"#29343d":kind==="archive"?"#252b2d":kind==="corridor"?"#202b30":"#303b40";
 return <AbsoluteFill style={{background:wall}}><svg width="100%" height="100%" viewBox="0 0 1080 1920">
 <defs><linearGradient id="ep3wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={wall}/><stop offset="100%" stopColor="#101619"/></linearGradient><radialGradient id="ep3glow"><stop offset="0%" stopColor="#d8b27c" stopOpacity=".4"/><stop offset="100%" stopColor="#d8b27c" stopOpacity="0"/></radialGradient></defs>
 <rect width="1080" height="1920" fill="url(#ep3wall)"/><rect y="1450" width="1080" height="470" fill="#171b1d"/>
 {kind==="office"?<><rect x="90" y="170" width="330" height="680" fill="#171d22" stroke="#72583e" strokeWidth="16"/>{Array.from({length:5},(_,i)=><g key={i}><rect x="112" y={205+i*125} width="286" height="8" fill="#806346"/><rect x={130+(i%2)*25} y={225+i*125} width="40" height="95" fill="#59636a"/></g>)}<rect x="680" y="210" width="300" height="400" fill="#526875" opacity=".35"/></>:null}
 {kind==="archive"?Array.from({length:4},(_,i)=><g key={i}><rect x={60+i*250} y="230" width="205" height="1060" fill="#171c1f" stroke="#5b4a39" strokeWidth="10"/>{Array.from({length:5},(_,j)=><rect key={j} x={78+i*250} y={270+j*195} width="170" height="145" fill={["#6b5744","#48565b","#756247"][(i+j)%3]} opacity=".75"/>)}</g>):null}
 {kind==="corridor"?<><path d="M0 0 L260 350 V1450 H0Z M1080 0 L820 350 V1450 H1080Z" fill="#151d21"/><path d="M260 350 H820 V1450 H260Z" fill="#52616a" opacity=".16"/><path d="M260 350 L540 100 L820 350" fill="none" stroke="#899398" strokeOpacity=".25" strokeWidth="12"/><rect x="430" y="500" width="220" height="650" fill="#11191d" stroke="#59636a" strokeWidth="14"/></>:null}
 {kind==="room"?<><rect x="65" y="190" width="360" height="500" fill="#11191d" stroke="#657078" strokeWidth="16"/><rect x="88" y="215" width="314" height="450" fill="#52636b"/><path d="M245 215 V665 M88 430 H402" stroke="#1b272d" strokeWidth="12"/></>:null}
 <ellipse cx="820" cy="600" rx="400" ry="500" fill="url(#ep3glow)" opacity={glow}/><rect width="1080" height="1920" fill="#070b0e" opacity=".2"/></svg></AbsoluteFill>;
};
const Soldier:React.FC<{emotion?:"worried"|"determined"|"tired";pose?:"standing"|"walking"|"talking"|"worried"}>=({emotion="worried",pose="standing"})=><AbsoluteFill><Character emotion={emotion} pose={pose} animationSpeed={.9}/></AbsoluteFill>;
const Counsel:React.FC=()=><AbsoluteFill><div style={{position:"absolute",right:"-15%",bottom:"-18%",width:"110%",height:"150%"}}><Lawyer animationSpeed={.8}/></div></AbsoluteFill>;
const Label:React.FC<{children:string}>=({children})=><div style={{position:"absolute",top:205,left:68,color:"#d8c3a4",fontFamily:"Arial",fontSize:22,fontWeight:700,letterSpacing:3}}>{children}</div>;
const Document:React.FC<{title:string;mark?:string}>=({title,mark})=><div style={{position:"absolute",left:"12%",right:"12%",bottom:"13%",height:440,background:"#e8e3d7",color:"#283137",padding:"38px 42px",boxShadow:"0 22px 70px #0009",transform:"rotate(-1deg)",fontFamily:"Arial"}}><div style={{fontSize:29,fontWeight:800,textAlign:"center",letterSpacing:2}}>{title}</div>{Array.from({length:5},(_,i)=><div key={i} style={{height:5,background:"#92958f",opacity:.65,marginTop:30,width:`${92-(i%3)*11}%`}}/>)}{mark&&<div style={{marginTop:28,textAlign:"right",color:"#923f3c",fontWeight:800,fontSize:27}}>{mark}</div>}</div>;
const Phone:React.FC<{message:string;name?:string}>=({message,name="НЕВІДОМЕ ПОВІДОМЛЕННЯ"})=><div style={{position:"absolute",right:"8%",top:"19%",width:"50%",minHeight:430,border:"12px solid #111",borderRadius:42,background:"#dce2df",boxShadow:"0 25px 80px #0009",padding:26,color:"#172027",fontFamily:"Arial",textAlign:"center"}}><div style={{fontSize:18,letterSpacing:2,color:"#53636a"}}>{name}</div><div style={{marginTop:90,fontSize:32,fontWeight:800,lineHeight:1.25}}>{message}</div></div>;

const Reveal:React.FC=()=>{const f=useCurrentFrame();const pulse=interpolate(Math.sin(f/5),[-1,1],[.98,1.02]);return <AbsoluteFill><Backdrop kind="room"/><Soldier/><Phone name="ПОВІДОМЛЕННЯ" message="Запитайте, хто наказав переписати рапорт."/><div style={{position:"absolute",top:"66%",left:"12%",right:"12%",textAlign:"center",color:"#fff",fontSize:34,fontWeight:800,fontFamily:"Arial",transform:`scale(${pulse})`}}>ІМ'Я: НАЧАЛЬНИК ШТАБУ</div><Label>СПРАВА № 01 · ФІНАЛ</Label></AbsoluteFill>};
const LawyerPlan:React.FC=()=> <AbsoluteFill><Backdrop kind="office"/><Counsel/><Document title="АДВОКАТСЬКИЙ ЗАПИТ" mark="ВИМОГА ПРО ПРОВЕДЕННЯ ПЕРЕВІРКИ"/><Label>ОФІС АДВОКАТА</Label></AbsoluteFill>;
const Archive:React.FC=()=> <AbsoluteFill><Backdrop kind="archive"/><Document title="ЖУРНАЛ РЕЄСТРАЦІЇ" mark="№ 0418 · ЗМІСТ НЕ ВІДПОВІДАЄ РАПОРТУ"/><Label>ДОКАЗИ · РЕЄСТРАЦІЯ</Label><div style={{position:"absolute",top:"22%",left:"10%",right:"10%",textAlign:"center",fontSize:34,color:"#fff",fontWeight:800,fontFamily:"Arial"}}>ОДИН НОМЕР. ДВА РІЗНІ ДОКУМЕНТИ.</div></AbsoluteFill>;
const Witness:React.FC=()=> <AbsoluteFill><Backdrop kind="corridor"/><Soldier emotion="determined" pose="talking"/><Label>СВІДОК · ПІДТВЕРДЖЕННЯ ПЕРЕДАЧІ</Label><div style={{position:"absolute",top:"27%",right:"8%",width:"52%",padding:28,background:"#10191de8",borderLeft:"5px solid "+gold,color:"#fff",fontSize:34,fontWeight:800,fontFamily:"Arial"}}>«Я ОСОБИСТО ПЕРЕДАВАВ ОРИГІНАЛ»</div></AbsoluteFill>;
const PhoneCall:React.FC=()=> <AbsoluteFill><Backdrop kind="room"/><Soldier emotion="worried" pose="talking"/><Phone name="ВХІДНИЙ ДЗВІНОК · ЧАСТИНА" message="Приїжджайте. Є офіційна відповідь."/><Label>ЧЕРЕЗ КІЛЬКА ДНІВ</Label></AbsoluteFill>;
const Outcome:React.FC=()=> <AbsoluteFill><Backdrop kind="office"/><Counsel/><Document title="ОФІЦІЙНА ВІДПОВІДЬ" mark="РАПОРТ ПРИЙНЯТО ДО РОЗГЛЯДУ"/><Label>РЕЗУЛЬТАТ РОБОТИ З ДОКУМЕНТАМИ</Label></AbsoluteFill>;
const EndCard:React.FC=()=> <AbsoluteFill style={{background:"#0b1115",justifyContent:"center",alignItems:"center",fontFamily:"Arial",color:"#fff",textAlign:"center"}}><div style={{fontSize:26,letterSpacing:7,color:gold,marginBottom:34}}>HELPUA24</div><div style={{fontSize:54,fontWeight:900,lineHeight:1.15,maxWidth:900}}>ДОКУМЕНТИ МОЖНА ПЕРЕПИСАТИ.<br/>ФАКТИ — НІ.</div><div style={{marginTop:52,fontSize:26,letterSpacing:4,color:"#d8c3a4"}}>КІНЕЦЬ СПРАВИ № 01</div><div style={{marginTop:90,fontSize:24,color:"#b8c0c4"}}>ЮРИДИЧНА ДОПОМОГА ВІЙСЬКОВИМ</div></AbsoluteFill>;

type Cue={start:number;end:number;text:string};
const cues:Cue[]=[
{start:0,end:180,text:"Ім’я в повідомленні було знайоме. Це був не той, хто приймав рапорт."},
{start:180,end:360,text:"Це був той, хто, за словами автора повідомлення, наказав змінити його зміст."},
{start:360,end:570,text:"Адвокат зрозумів: звинувачувати навмання не можна. Потрібні докази."},
{start:570,end:780,text:"Вони зібрали копію первинного рапорту, підтвердження передачі та витяг із журналу."},
{start:780,end:960,text:"Номер був той самий. Але зміст документа — зовсім інший."},
{start:960,end:1170,text:"Адвокат направив офіційні звернення з вимогою провести перевірку та встановити, хто змінив запис."},
{start:1170,end:1380,text:"Окремо попросив зберегти оригінал журналу й записи камер за відповідну дату."},
{start:1380,end:1560,text:"За кілька днів із частини зателефонували. Тепер уже запросили отримати офіційну відповідь."},
{start:1560,end:1770,text:"Рапорт прийняли до розгляду. А обставини можливої підміни документа мали перевірити окремо."},
{start:1770,end:1980,text:"Військовий думав, що його рапорт просто загубили. Але історія виявилася значно серйознішою."},
{start:1980,end:2160,text:"Документи можуть переписати. Факти — ні. Це була справа номер один. Кінець."},
];
const Subtitles:React.FC=()=>{const frame=useCurrentFrame();const cue=cues.find(c=>frame>=c.start&&frame<c.end);return <AbsoluteFill style={{pointerEvents:"none",zIndex:40}}><div style={{position:"absolute",top:86,left:68,padding:"12px 18px",background:"rgba(8,13,18,.68)",borderLeft:"4px solid "+gold,color:"rgba(255,255,255,.88)",fontFamily:"Arial",fontSize:22,fontWeight:700,letterSpacing:3}}>HELPUA24 / СПРАВА № 01</div>{cue&&<div style={{...panel}}><div style={{marginBottom:10,color:gold,fontSize:15,fontWeight:700,letterSpacing:2}}>ТОЙ, ХТО ВІДДАВ НАКАЗ · ФІНАЛ</div><div style={{color:"#fff",fontSize:34,lineHeight:1.22,fontWeight:700}}>{cue.text}</div></div>}</AbsoluteFill>};

export const Episode03:React.FC=()=> <AbsoluteFill>
<Sequence durationInFrames={360}><Reveal/></Sequence>
<Sequence from={360} durationInFrames={420}><LawyerPlan/></Sequence>
<Sequence from={780} durationInFrames={390}><Archive/></Sequence>
<Sequence from={1170} durationInFrames={210}><Witness/></Sequence>
<Sequence from={1380} durationInFrames={180}><PhoneCall/></Sequence>
<Sequence from={1560} durationInFrames={420}><Outcome/></Sequence>
<Sequence from={1980} durationInFrames={180}><EndCard/></Sequence>
<Sequence><Subtitles/></Sequence>
</AbsoluteFill>;
