import React from "react";
import { Easing, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Візуали епізоду 05. Усе малюється кодом (SVG/CSS), канва 1080×1920.
// Кожна сцена отримує dur — довжину сцени в кадрах.

export const ORANGE = "#ff8a24";
export const RED = "#e0342c";
export const BLUE = "#3aa7e8";
export const GOLD = "#ffc857";
export const WHITE = "#eef2f6";
const FONT = "Arial, 'Liberation Sans', sans-serif";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const fill: React.CSSProperties = { position: "absolute", inset: 0 };

type P = { dur: number };

/* ---------- спільні елементи ---------- */

// Бюст-силует людини (військовий у касці або цивільний в піджаку)
const Bust: React.FC<{
  x: number;
  y: number;
  s?: number;
  kind: "soldier" | "lawyer" | "plain";
  color?: string;
  rim?: string;
  flip?: boolean;
}> = ({ x, y, s = 1, kind, color = "#0b121b", rim = BLUE, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <path
      d="M-230 330 Q-230 120 -70 95 L70 95 Q230 120 230 330 Z"
      fill={color}
      stroke={rim}
      strokeWidth="3"
      opacity="1"
    />
    <rect x="-34" y="40" width="68" height="75" fill={color} />
    <ellipse cx="0" cy="-20" rx="86" ry="105" fill={color} stroke={rim} strokeWidth="3" />
    {kind === "soldier" && (
      <>
        <path d="M-102 -30 Q-100 -150 0 -158 Q100 -150 102 -30 L96 -42 Q0 -70 -96 -42 Z" fill="#101a24" stroke={rim} strokeWidth="3" />
        <rect x="-60" y="-12" width="120" height="8" fill="#050a10" opacity=".7" />
      </>
    )}
    {kind === "lawyer" && (
      <>
        <path d="M-40 110 L0 230 L40 110 Z" fill="#1d2a38" />
        <path d="M-12 118 L0 150 L12 118 Z" fill={RED} />
        <path d="M-82 -62 Q-70 -130 0 -128 Q70 -130 82 -62 Q40 -92 0 -90 Q-40 -92 -82 -62 Z" fill="#05090e" />
      </>
    )}
  </g>
);

const Lamp: React.FC<{ x: number; y: number; color?: string; flicker?: number }> = ({ x, y, color = "#ffb45a", flicker = 1 }) => {
  const f = useCurrentFrame();
  const fl = 0.78 + 0.22 * Math.sin(f / 3.1) * Math.sin(f / 7.3) + (random(`fl${Math.floor(f / 2)}`) - 0.5) * 0.18 * flicker;
  return (
    <g>
      <line x1={x} y1={0} x2={x} y2={y} stroke="#2a3644" strokeWidth="4" />
      <path d={`M${x - 46} ${y + 34} L${x - 20} ${y} L${x + 20} ${y} L${x + 46} ${y + 34} Z`} fill="#1a2430" />
      <circle cx={x} cy={y + 40} r="16" fill={color} opacity={fl} />
      <circle cx={x} cy={y + 40} r="260" fill={color} opacity={0.12 * fl} />
      <circle cx={x} cy={y + 40} r="120" fill={color} opacity={0.18 * fl} />
    </g>
  );
};

const Stamp: React.FC<{ text: string; color: string; x: number; y: number; start: number; rot?: number; size?: number }> = ({
  text,
  color,
  x,
  y,
  start,
  rot = -9,
  size = 120,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame: f - start, fps, config: { damping: 9, stiffness: 160, mass: 0.6 } });
  if (f < start) return null;
  const sc = interpolate(sp, [0, 1], [3.2, 1]);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${sc})`,
        border: `${size / 12}px solid ${color}`,
        color,
        padding: `${size / 8}px ${size / 3}px`,
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: size,
        letterSpacing: 6,
        opacity: interpolate(f - start, [0, 4], [0, 0.95], clamp),
        textShadow: `0 0 30px ${color}88`,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};

const Paper: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  rot?: number;
  children?: React.ReactNode;
  bg?: string;
  appear?: number;
}> = ({ x, y, w, h, rot = 0, children, bg = "#e6e8e6", appear = 0 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame: f - appear, fps, config: { damping: 14, stiffness: 110 } });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        background: bg,
        color: "#16202a",
        fontFamily: FONT,
        padding: 28,
        boxSizing: "border-box",
        transform: `rotate(${rot}deg) scale(${interpolate(sp, [0, 1], [0.6, 1])})`,
        opacity: interpolate(sp, [0, 0.3], [0, 1], clamp),
        boxShadow: "0 30px 80px #000c",
      }}
    >
      {children}
    </div>
  );
};

const Lines: React.FC<{ n: number; w?: number; color?: string }> = ({ n, w = 100, color = "#9aa3aa" }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <div key={i} style={{ height: 8, width: `${w - ((i * 37) % 30)}%`, background: color, marginTop: 20, opacity: 0.7 }} />
    ))}
  </>
);

/* ---------- сцени ---------- */

// 1. Позиція: силует бійця, лампа, вікно із заграва, штамп «ВІДМОВЛЕНО»
export const S1Position: React.FC<P> = ({ dur }) => {
  const f = useCurrentFrame();
  const glow = 0.6 + 0.4 * Math.sin(f / 9);
  return (
    <>
      <svg viewBox="0 0 1080 1920" style={fill}>
        <defs>
          <linearGradient id="s1sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b3552" />
            <stop offset="1" stopColor="#ff8a24" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <rect x="560" y="470" width="380" height="250" fill="url(#s1sky)" opacity={glow} />
        <rect x="560" y="470" width="380" height="250" fill="none" stroke="#223244" strokeWidth="10" />
        <path d="M560 720 L650 650 L720 700 L790 620 L940 720 Z" fill="#0a111a" />
        {Array.from({ length: 8 }, (_, i) => (
          <circle key={i} cx={600 + ((i * 53) % 320)} cy={500 + ((i * 29) % 80)} r="2.5" fill="#ffd9a8" opacity={0.4 + 0.6 * random(`st${i}${Math.floor(f / 6)}`)} />
        ))}
        <Lamp x={250} y={230} />
        <Bust x={420} y={780} s={1.65} kind="soldier" rim="#ff9a40" />
        <rect x="0" y="1330" width="1080" height="12" fill="#101a24" />
      </svg>
      <Stamp text="ВІДМОВЛЕНО" color={RED} x={540} y={860} start={dur - 42} size={110} rot={-10} />
    </>
  );
};

// 2. Поранення: вибух із пікселів + госпітальний коридор
export const S2Hospital: React.FC<P> = () => {
  const f = useCurrentFrame();
  const burst = interpolate(f, [0, 36], [0, 1], clamp);
  const hosp = interpolate(f, [30, 60], [0, 1], clamp);
  const cells = Array.from({ length: 90 }, (_, i) => {
    const a = random(`a${i}`) * Math.PI * 2;
    const r = random(`r${i}`) * 520 * burst;
    return { x: 540 + Math.cos(a) * r, y: 720 + Math.sin(a) * r, s: 14 + random(`s${i}`) * 34, c: random(`c${i}`) > 0.5 ? ORANGE : RED };
  });
  const hx = Array.from({ length: 60 }, (_, i) => i);
  const beat = (x: number) => {
    const t = ((x + f * 6) % 240) / 240;
    return t > 0.45 && t < 0.5 ? -120 : t >= 0.5 && t < 0.55 ? 90 : t >= 0.55 && t < 0.58 ? -30 : 0;
  };
  return (
    <svg viewBox="0 0 1080 1920" style={fill}>
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={c.s} height={c.s} fill={c.c} opacity={(1 - burst) * 1.6 > 1 ? 1 : (1 - burst) * 1.6} />
      ))}
      <g opacity={hosp}>
        <path d="M200 460 L880 460 L1000 1150 L80 1150 Z" fill="#0e1b29" stroke="#25405a" strokeWidth="3" />
        <path d="M200 460 L400 640 L680 640 L880 460" fill="none" stroke="#25405a" strokeWidth="3" />
        <rect x="400" y="640" width="280" height="510" fill="#142536" />
        <rect x="500" y="520" width="80" height="80" fill="#e6efe9" />
        <rect x="528" y="536" width="24" height="48" fill={RED} />
        <rect x="516" y="548" width="48" height="24" fill={RED} />
        <rect x="120" y="880" width="220" height="90" rx="8" fill="#1d2f42" />
        <rect x="760" y="880" width="220" height="90" rx="8" fill="#1d2f42" />
        <line x1="240" y1="500" x2="240" y2="660" stroke="#7fb8d9" strokeWidth="4" />
        <ellipse cx="240" cy="690" rx="12" ry="22" fill={BLUE} opacity={0.5 + 0.5 * Math.sin(f / 5)} />
        <polyline
          fill="none"
          stroke="#46e08a"
          strokeWidth="5"
          points={hx.map((i) => `${60 + i * 16},${1210 + beat(i * 4)}`).join(" ")}
        />
      </g>
    </svg>
  );
};

// 3. Немає виплат: календар, що рахує місяці, і порожній аркуш
export const S3NoPayments: React.FC<P> = ({ dur }) => {
  const f = useCurrentFrame();
  const months = ["СІЧЕНЬ", "ЛЮТИЙ", "БЕРЕЗЕНЬ", "КВІТЕНЬ", "ТРАВЕНЬ", "ЧЕРВЕНЬ"];
  const idx = Math.min(5, Math.floor(interpolate(f, [10, dur * 0.75], [0, 6], clamp)));
  const flip = (f - 10) % Math.max(1, Math.floor((dur * 0.75) / 6));
  const blank = interpolate(f, [dur * 0.6, dur * 0.8], [0, 1], clamp);
  return (
    <>
      <Paper x={130} y={380} w={820} h={620} rot={-2}>
        <div style={{ background: RED, color: "#fff", fontSize: 54, fontWeight: 900, padding: "18px 28px", letterSpacing: 6 }}>
          ВИПЛАТИ · {months[idx]}
        </div>
        <div style={{ fontSize: 210, fontWeight: 900, marginTop: 50, textAlign: "center", transform: `translateY(${flip < 4 ? -10 : 0}px)` }}>
          {idx + 1}
        </div>
        <div style={{ textAlign: "center", fontSize: 40, letterSpacing: 8, color: "#55606a" }}>МІСЯЦЬ БЕЗ ВИПЛАТ</div>
      </Paper>
      <Paper x={280} y={1040} w={520} h={330} rot={4} bg="#dfe3e2" appear={dur * 0.55}>
        <div style={{ fontSize: 30, fontWeight: 900, color: "#8a949b", letterSpacing: 4 }}>ДОВІДКА</div>
        <Lines n={4} />
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: 24,
            fontSize: 120,
            color: RED,
            fontWeight: 900,
            opacity: blank,
            textShadow: `0 0 30px ${RED}`,
          }}
        >
          ?
        </div>
      </Paper>
    </>
  );
};

// 4. Тиша: карта пікселів, люди розлітаються, дзвінок без відповіді
export const S4Silence: React.FC<P> = ({ dur }) => {
  const f = useCurrentFrame();
  const spread = interpolate(f, [30, dur * 0.7], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const cells = Array.from({ length: 11 * 7 }, (_, i) => ({ x: (i % 11) * 82 + 90, y: Math.floor(i / 11) * 82 + 360, c: random(`m${i}`) }));
  const pts = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2 + 0.5;
    return { x: 540 + Math.cos(a) * 420 * spread, y: 700 + Math.sin(a) * 300 * spread };
  });
  const calls = Math.floor(f / 34) % 3;
  return (
    <>
      <svg viewBox="0 0 1080 1920" style={fill}>
        {cells.map((c, i) => (
          <rect key={i} x={c.x} y={c.y} width="64" height="64" fill={c.c > 0.85 ? "#2c4f73" : c.c > 0.4 ? "#13263a" : "#0d1a28"} opacity="0.9" />
        ))}
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="22" fill={i === 0 ? ORANGE : BLUE} />
            <circle cx={p.x} cy={p.y} r={40 + ((f + i * 7) % 40) * 0.6} fill="none" stroke={BLUE} opacity={0.4} />
            <rect x={p.x - 14} y={p.y + 22} width="28" height="40" rx="8" fill={i === 0 ? ORANGE : BLUE} />
          </g>
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 190,
          top: 1010,
          width: 700,
          height: 260,
          background: "#101c29",
          border: "2px solid #2a4560",
          fontFamily: FONT,
          padding: 30,
          boxSizing: "border-box",
        }}
      >
        <div style={{ color: BLUE, fontSize: 26, letterSpacing: 5, fontWeight: 700 }}>ВХІДНА ЛІНІЯ · ЧАСТИНА</div>
        <div style={{ color: WHITE, fontSize: 60, fontWeight: 900, marginTop: 30 }}>
          {"НЕДОСТУПНО" + ".".repeat(calls + 1)}
        </div>
      </div>
    </>
  );
};

// 5. Рішення: нічне вікно, лампа, боєць із телефоном
export const S5Decision: React.FC<P> = () => {
  const f = useCurrentFrame();
  const glow = 0.7 + 0.3 * Math.sin(f / 12);
  return (
    <>
      <svg viewBox="0 0 1080 1920" style={fill}>
        <rect x="90" y="260" width="320" height="560" fill="#0a1626" stroke="#223a55" strokeWidth="12" />
        <line x1="250" y1="260" x2="250" y2="820" stroke="#223a55" strokeWidth="8" />
        {Array.from({ length: 22 }, (_, i) => (
          <circle key={i} cx={110 + random(`sx${i}`) * 280} cy={280 + random(`sy${i}`) * 520} r="2.2" fill="#cfe6ff" opacity={0.3 + 0.7 * random(`sa${i}${Math.floor(f / 8)}`)} />
        ))}
        <Lamp x={800} y={300} />
        <Bust x={600} y={830} s={1.6} kind="soldier" rim="#ffa851" />
        <rect x="470" y="1000" width="170" height="290" rx="20" transform="rotate(-14 555 1145)" fill="#0b141f" stroke="#3aa7e8" strokeWidth="4" />
        <rect x="486" y="1025" width="138" height="240" rx="10" transform="rotate(-14 555 1145)" fill={BLUE} opacity={glow * 0.55} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 460,
          top: 1110,
          fontFamily: FONT,
          fontWeight: 900,
          color: WHITE,
          fontSize: 34,
          transform: "rotate(-14deg)",
          opacity: glow,
        }}
      >
        АДВОКАТ
      </div>
    </>
  );
};

// 6. Кабінет адвоката: тепле світло, адвокат і боєць, таймлайн подій
export const S6Office: React.FC<P> = ({ dur }) => {
  const f = useCurrentFrame();
  const nodes = [0, 1, 2, 3, 4];
  const shown = Math.floor(interpolate(f, [30, dur - 20], [0, 5], clamp));
  return (
    <>
      <svg viewBox="0 0 1080 1920" style={fill}>
        <rect x="0" y="1160" width="1080" height="760" fill="#1b130c" />
        <Lamp x={540} y={190} color="#ffc06a" flicker={0.2} />
        <Bust x={330} y={790} s={1.5} kind="lawyer" color="#0a0d12" rim="#ffbe6a" />
        <Bust x={780} y={870} s={1.3} kind="soldier" color="#0a0d12" rim="#ffbe6a" flip />
        <rect x="80" y="1120" width="920" height="26" fill="#2b1d11" />
        <rect x="150" y="1060" width="240" height="60" fill="#e6e1d6" transform="rotate(-3 270 1090)" />
        <line x1="150" y1="1700" x2="930" y2="1700" stroke="#4b3924" strokeWidth="6" />
        {nodes.map((i) => (
          <g key={i} opacity={i < shown ? 1 : 0.15}>
            <rect x={150 + i * 160} y={1660} width="40" height="40" fill={i === 4 ? ORANGE : "#ffc06a"} />
            <rect x={150 + i * 160 + 6} y={1710} width="28" height="8" fill="#7c6444" />
          </g>
        ))}
      </svg>
    </>
  );
};

// 7. Докази: картки документів падають на дошку, червоні нитки, штампи
export const S7Evidence: React.FC<P> = ({ dur }) => {
  const f = useCurrentFrame();
  const cards = [
    { x: 90, y: 330, t: "РАПОРТ", r: -4 },
    { x: 560, y: 380, t: "ЖУРНАЛ", r: 3 },
    { x: 110, y: 800, t: "ВИТЯГ", r: 2 },
    { x: 560, y: 860, t: "СВІДЧЕННЯ", r: -3 },
    { x: 320, y: 1250, t: "ВИСНОВОК", r: 1 },
  ];
  const step = (dur - 30) / cards.length;
  const lineP = interpolate(f, [step * 2, dur - 10], [0, 1], clamp);
  return (
    <>
      <svg viewBox="0 0 1080 1920" style={fill}>
        {cards.slice(1).map((c, i) => {
          const p = cards[i];
          return (
            <line
              key={i}
              x1={p.x + 210}
              y1={p.y + 130}
              x2={p.x + 210 + (c.x + 210 - p.x - 210) * lineP}
              y2={p.y + 130 + (c.y + 130 - p.y - 130) * lineP}
              stroke={RED}
              strokeWidth="5"
            />
          );
        })}
      </svg>
      {cards.map((c, i) => (
        <Paper key={i} x={c.x} y={c.y} w={420} h={290} rot={c.r} appear={i * step}>
          <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: 4 }}>{c.t}</div>
          <Lines n={4} />
        </Paper>
      ))}
      {cards.map((c, i) => (
        <Stamp key={i} text="ПІДТВЕРДЖЕНО" color="#2fb36b" x={c.x + 210} y={c.y + 230} start={i * step + 14} size={30} rot={-6} />
      ))}
    </>
  );
};

// 8. Суд: фасад із колонами, паперові запити летять до будівлі
export const S8Court: React.FC<P> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 1080 1920" style={fill}>
      <path d="M140 640 L540 400 L940 640 Z" fill="#241a10" stroke="#ffbe6a" strokeWidth="4" />
      <rect x="140" y="640" width="800" height="50" fill="#2b1f14" stroke="#ffbe6a" strokeWidth="3" />
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={190 + i * 135} y="700" width="60" height="430" fill="#33261a" stroke="#ffbe6a" strokeWidth="2" />
      ))}
      <rect x="110" y="1130" width="860" height="46" fill="#2b1f14" />
      <rect x="80" y="1176" width="920" height="46" fill="#241a10" />
      <g transform="translate(540 540)">
        <line x1="0" y1="-60" x2="0" y2="60" stroke="#ffbe6a" strokeWidth="6" />
        <line x1="-100" y1="-30" x2="100" y2="-30" stroke="#ffbe6a" strokeWidth="6" />
        <path d="M-130 20 L-70 20 L-100 -30 Z M70 20 L130 20 L100 -30 Z" fill="#ffbe6a" opacity=".9" />
      </g>
      {Array.from({ length: 5 }, (_, i) => {
        const p = interpolate(f, [i * (dur / 7), i * (dur / 7) + dur * 0.45], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
        const x = interpolate(p, [0, 1], [i % 2 ? -80 : 1160, 540]);
        const y = interpolate(p, [0, 1], [1400 + i * 90, 900]) - Math.sin(p * Math.PI) * 120;
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${(i % 2 ? 1 : -1) * 18})`} opacity={p > 0 && p < 1 ? 1 : 0}>
            <path d="M0 0 L60 20 L0 40 L12 20 Z" fill="#f1ece0" />
          </g>
        );
      })}
    </svg>
  );
};

// 9. Засідання: молоток, пульс стихає, годинник сповільнюється
export const S9Hearing: React.FC<P> = ({ dur }) => {
  const f = useCurrentFrame();
  const swing = Math.max(0, Math.sin(f / 18)) * 28;
  const calm = interpolate(f, [0, dur], [1, 0.05], clamp);
  const pts = Array.from({ length: 60 }, (_, i) => {
    const t = ((i * 4 + f * 5) % 200) / 200;
    const peak = t > 0.5 && t < 0.54 ? -120 * calm : t >= 0.54 && t < 0.58 ? 90 * calm : 0;
    return `${40 + i * 16},${1240 + peak}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 1080 1920" style={fill}>
      <g transform={`translate(540 760) rotate(${-30 + swing})`}>
        <rect x="-190" y="-70" width="300" height="130" rx="22" fill="#4a2f18" stroke="#ffbe6a" strokeWidth="4" />
        <rect x="100" y="-14" width="230" height="30" fill="#6b4524" />
      </g>
      <ellipse cx="540" cy="1000" rx="320" ry="52" fill="#2a1b0e" stroke="#ffbe6a" strokeWidth="3" />
      <circle cx="880" cy="320" r="120" fill="none" stroke="#6b5338" strokeWidth="8" />
      <line x1="880" y1="320" x2="880" y2="230" stroke="#ffbe6a" strokeWidth="8" transform={`rotate(${f * 0.5} 880 320)`} />
      <line x1="880" y1="320" x2="940" y2="320" stroke="#ffbe6a" strokeWidth="6" />
      <polyline points={pts} fill="none" stroke="#46e08a" strokeWidth="5" />
    </svg>
  );
};

// 10. Рішення: штамп «ВІДМОВЛЕНО» тріскає і відкриває «ЗАДОВОЛЕНО»
export const S10Decision: React.FC<P> = ({ dur }) => {
  const f = useCurrentFrame();
  const crack = interpolate(f, [8, 34], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const sum = Math.round(interpolate(f, [30, dur - 30], [0, 100], clamp));
  const glow = interpolate(f, [20, 50], [0, 1], clamp);
  return (
    <>
      <svg viewBox="0 0 1080 1920" style={fill}>
        <circle cx="540" cy="820" r="520" fill={GOLD} opacity={0.16 * glow} />
        <circle cx="540" cy="820" r="300" fill={GOLD} opacity={0.18 * glow} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 540,
          top: 820,
          transform: "translate(-50%,-50%)",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 108,
          letterSpacing: 6,
          color: "#35d27d",
          border: "12px solid #35d27d",
          padding: "10px 40px",
          textShadow: "0 0 40px #35d27d88",
          opacity: glow,
        }}
      >
        ЗАДОВОЛЕНО
      </div>
      <div style={{ position: "absolute", left: 0, top: 700, width: "100%", height: 240, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 540 - crack * 420, top: 120, transform: "translate(-50%,-50%) rotate(-6deg)", clipPath: "inset(0 50% 0 0)", opacity: 1 - crack }}>
          <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 108, color: RED, border: `12px solid ${RED}`, padding: "10px 40px", whiteSpace: "nowrap" }}>ВІДМОВЛЕНО</span>
        </div>
        <div style={{ position: "absolute", left: 540 + crack * 420, top: 120, transform: "translate(-50%,-50%) rotate(-6deg)", clipPath: "inset(0 0 0 50%)", opacity: 1 - crack }}>
          <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 108, color: RED, border: `12px solid ${RED}`, padding: "10px 40px", whiteSpace: "nowrap" }}>ВІДМОВЛЕНО</span>
        </div>
      </div>
      <div style={{ position: "absolute", top: 1030, width: "100%", textAlign: "center", fontFamily: FONT, color: GOLD, fontWeight: 900, fontSize: 90, letterSpacing: 4 }}>
        ВИПЛАТИ: {sum}%
      </div>
      <div style={{ position: "absolute", top: 1150, width: "100%", textAlign: "center", fontFamily: FONT, color: "#e8d9b0", fontSize: 34, letterSpacing: 7 }}>
        ДОВІДКУ ВИДАНО
      </div>
    </>
  );
};

// 11. Заклик: ряди силуетів, світло загоряється по черзі
export const S11Call: React.FC<P> = ({ dur }) => {
  const f = useCurrentFrame();
  const total = 5 * 4;
  const lit = Math.floor(interpolate(f, [10, dur - 20], [0, total], clamp));
  return (
    <svg viewBox="0 0 1080 1920" style={fill}>
      {Array.from({ length: total }, (_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 190 + col * 235 + (row % 2) * 40;
        const y = 480 + row * 150;
        const on = i < lit;
        return (
          <g key={i}>
            {on && <circle cx={x} cy={y} r="120" fill={GOLD} opacity=".12" />}
            <circle cx={x} cy={y - 22} r="30" fill={on ? GOLD : "#16222f"} />
            <path d={`M${x - 52} ${y + 70} Q${x - 52} ${y + 14} ${x} ${y + 10} Q${x + 52} ${y + 14} ${x + 52} ${y + 70} Z`} fill={on ? "#e6b24a" : "#16222f"} />
          </g>
        );
      })}
    </svg>
  );
};

// 12. Фінал: терези та логотип
export const S12Final: React.FC<P> = ({ dur }) => {
  const f = useCurrentFrame();
  const a = interpolate(f, [0, 20], [0, 1], clamp);
  const tilt = Math.sin(f / 18) * 3 * interpolate(f, [0, dur], [1, 0.2], clamp);
  return (
    <>
      <svg viewBox="0 0 1080 1920" style={{ ...fill, opacity: a }}>
        <circle cx="540" cy="760" r="420" fill={GOLD} opacity=".1" />
        <path d="M540 430 L760 520 L760 760 Q760 940 540 1040 Q320 940 320 760 L320 520 Z" fill="#101c2b" stroke={GOLD} strokeWidth="8" />
        <g transform={`rotate(${tilt} 540 640)`}>
          <line x1="540" y1="560" x2="540" y2="880" stroke={GOLD} strokeWidth="8" />
          <line x1="400" y1="640" x2="680" y2="640" stroke={GOLD} strokeWidth="8" />
          <path d="M380 740 L440 740 L410 650 Z M640 740 L700 740 L670 650 Z" fill={GOLD} />
        </g>
      </svg>
      <div style={{ position: "absolute", top: 1130, width: "100%", textAlign: "center", fontFamily: FONT, color: WHITE, fontWeight: 900, fontSize: 64, letterSpacing: 10, opacity: a }}>
        HELPUA24
      </div>
    </>
  );
};
