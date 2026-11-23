import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ACTS,
  COLORS,
  CountUp,
  Glitch,
  Pop,
  ScanBox,
  Stamp,
  captionFont,
  monoFont,
  type Act,
} from "../Series/kit";

type V = React.FC<{ act: Act }>;

const row: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
};
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Label: React.FC<{ children: React.ReactNode; top: number; color?: string; size?: number }> = ({
  children,
  top,
  color = COLORS.muted,
  size = 26,
}) => (
  <div style={{ ...row, top, fontFamily: monoFont, fontSize: size, letterSpacing: 5, color, textTransform: "uppercase" }}>
    {children}
  </div>
);

/** Силует людини без обличчя. `bag` — пакет зі сміттям в руці. */
const Person: React.FC<{ x: number; y: number; scale?: number; color?: string; bag?: boolean; rim?: string }> = ({
  x,
  y,
  scale = 1,
  color = "#0b1624",
  bag = false,
  rim = "#2b6aa3",
}) => (
  <svg
    width={260}
    height={640}
    viewBox="0 0 260 640"
    style={{ position: "absolute", left: x, top: y, transform: `scale(${scale})`, transformOrigin: "bottom center", overflow: "visible" }}
  >
    <circle cx="130" cy="70" r="52" fill={color} stroke={rim} strokeWidth="4" />
    <path d="M40 640 L55 210 Q60 150 130 140 Q200 150 205 210 L220 640 Z" fill={color} stroke={rim} strokeWidth="4" />
    {bag ? (
      <g>
        <line x1="212" y1="300" x2="232" y2="400" stroke={rim} strokeWidth="5" />
        <ellipse cx="236" cy="440" rx="36" ry="46" fill="#1b2a3a" stroke={rim} strokeWidth="4" />
      </g>
    ) : null}
  </svg>
);

const Doc: React.FC<{ w?: number; h?: number; rotate?: number; children?: React.ReactNode; style?: React.CSSProperties }> = ({
  w = 780,
  h = 900,
  rotate = -2,
  children,
  style,
}) => (
  <div
    style={{
      position: "absolute",
      left: (1080 - w) / 2,
      top: 300,
      width: w,
      height: h,
      background: "#e8eaeb",
      color: "#16202a",
      fontFamily: captionFont,
      transform: `rotate(${rotate}deg)`,
      boxShadow: "0 40px 100px #000",
      padding: 54,
      ...style,
    }}
  >
    {children}
  </div>
);

const Lines: React.FC<{ n?: number }> = ({ n = 5 }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <div key={i} style={{ height: 14, background: "#b9c0c5", margin: "30px 0", width: `${92 - i * 8}%` }} />
    ))}
  </>
);

// 1 ─ Уяви. Шоста сорок ранку.
export const V01Clock: V = ({ act }) => {
  const frame = useCurrentFrame();
  const glow = ACTS[act].accent;
  const digit = (d: string, i: number) => (
    <Pop key={i} at={i * 3 + 6} style={{ width: 170, height: 250, background: "#0d1826", border: `3px solid ${glow}55`, borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: captionFont, fontWeight: 700, fontSize: 230, color: COLORS.white, boxShadow: `0 0 50px ${glow}33` }}>
      {d}
    </Pop>
  );
  return (
    <AbsoluteFill>
      <div style={{ ...row, top: 520, gap: 14, alignItems: "center" }}>
        {digit("0", 0)}
        {digit("6", 1)}
        <div style={{ fontFamily: captionFont, fontSize: 200, color: glow, opacity: frame % 30 < 18 ? 1 : 0.2 }}>:</div>
        {digit("4", 2)}
        {digit("0", 3)}
      </div>
      <Label top={860} color={glow}>ранок · день 1</Label>
    </AbsoluteFill>
  );
};

// 2 ─ Виходиш з під'їзду з пакетом
export const V02Door: V = () => {
  const frame = useCurrentFrame();
  const walk = interpolate(frame, [10, 120], [0, 240], clamp);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, top: 360, height: 760, background: "linear-gradient(#0c1522,#08101a)" }} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 60 + i * 330, top: 420, width: 150, height: 190, background: i === 1 ? "#f4c46a22" : "#0a1320", border: "3px solid #1a3550" }} />
      ))}
      <div style={{ position: "absolute", left: 600, top: 600, width: 300, height: 520, background: "linear-gradient(#f4c46a33,#f4c46a11)", border: "6px solid #1d4d7a", boxShadow: "0 0 140px #f4c46a44" }} />
      <Person x={580 - walk} y={500} bag scale={0.95} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 1120, height: 6, background: "#1d4d7a" }} />
    </AbsoluteFill>
  );
};

// 3 ─ Біля дверей стоїть бус
export const V03Van: V = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slide = spring({ frame, fps, config: { damping: 16, stiffness: 70 } });
  const x = interpolate(slide, [0, 1], [900, 140]);
  const beam = 0.5 + Math.sin(frame / 4) * 0.15;
  return (
    <AbsoluteFill>
      <Person x={60} y={430} scale={0.8} />
      <div style={{ position: "absolute", left: x, top: 620 }}>
        <svg width="780" height="420" viewBox="0 0 780 420">
          <polygon points="0,230 -380,150 -380,360" fill={COLORS.red} opacity={beam * 0.25} />
          <rect x="10" y="60" width="700" height="280" rx="46" fill="#121b27" stroke="#3a4a5c" strokeWidth="5" />
          <rect x="450" y="90" width="230" height="110" rx="18" fill="#1d2f44" />
          <rect x="60" y="100" width="340" height="80" rx="12" fill="#0a111a" />
          <circle cx="170" cy="350" r="62" fill="#05090f" stroke="#3a4a5c" strokeWidth="8" />
          <circle cx="560" cy="350" r="62" fill="#05090f" stroke="#3a4a5c" strokeWidth="8" />
          <circle cx="22" cy="235" r="16" fill="#ffe9b0" opacity={0.6 + beam * 0.4} />
        </svg>
      </div>
      <ScanBox label="ОБ'ЄКТ · БУС" x={110} y={600} w={820} h={470} />
    </AbsoluteFill>
  );
};

// 4a ─ Показуєш документи
export const V04Passport: V = () => (
  <AbsoluteFill>
    <Pop at={4}>
      <Doc w={800} h={520} rotate={-3} style={{ top: 480, background: "#dfe7ee", borderRadius: 26 }}>
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 4 }}>ДОКУМЕНТИ</div>
        <div style={{ display: "flex", gap: 40, marginTop: 30 }}>
          <div style={{ width: 200, height: 250, background: "#9fb0bf", borderRadius: 10 }} />
          <div style={{ flex: 1 }}>
            <Lines n={4} />
          </div>
        </div>
      </Doc>
    </Pop>
    <Label top={1130} color={COLORS.blue}>пред'явлено ✓</Label>
  </AbsoluteFill>
);

// 4b ─ Але вони нікого не цікавлять
export const V04Ignored: V = () => {
  const frame = useCurrentFrame();
  const fall = interpolate(frame, [20, 80], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${fall * 380}px) rotate(${-3 + fall * 22}deg)`, opacity: 1 - fall * 0.7 }}>
        <Doc w={800} h={520} rotate={0} style={{ top: 480, background: "#dfe7ee", borderRadius: 26 }}>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 4 }}>ДОКУМЕНТИ</div>
          <Lines n={4} />
        </Doc>
      </div>
      <div style={{ ...row, top: 560 }}>
        <Stamp label="Ігнорують" at={18} size={86} rotate={-8} />
      </div>
    </AbsoluteFill>
  );
};

// 5 ─ Через сорок хвилин — ТЦК
export const V05Timeline: V = ({ act }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [6, 100], [0, 1], clamp);
  const c = ACTS[act].accent;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 120, right: 120, top: 760, height: 8, background: "#243445" }} />
      <div style={{ position: "absolute", left: 120, top: 760, width: 840 * p, height: 8, background: c, boxShadow: `0 0 24px ${c}` }} />
      <div style={{ position: "absolute", left: 120 + 840 * p - 22, top: 746, width: 36, height: 36, borderRadius: "50%", background: COLORS.white }} />
      <div style={{ position: "absolute", left: 100, top: 620, fontFamily: captionFont, fontWeight: 700, fontSize: 80, color: COLORS.white }}>06:40</div>
      <div style={{ position: "absolute", right: 100, top: 620, fontFamily: captionFont, fontWeight: 700, fontSize: 80, color: c }}>07:20</div>
      <div style={{ ...row, top: 900, fontFamily: captionFont, fontWeight: 700, fontSize: 130, color: COLORS.white }}>
        <CountUp to={40} start={6} seconds={3} format={(n) => `+${Math.round(n)} ХВ`} />
      </div>
      <Pop at={70} style={{ ...row, top: 1100 }}>
        <div style={{ border: `4px solid ${c}`, padding: "10px 50px", fontFamily: captionFont, fontWeight: 700, fontSize: 90, color: c, letterSpacing: 10 }}>ТЦК</div>
      </Pop>
    </AbsoluteFill>
  );
};

// 6 ─ Телефон забирають
export const V06Phone: V = () => {
  const frame = useCurrentFrame();
  const gone = interpolate(frame, [30, 70], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 340, top: 420 + gone * 700, width: 400, height: 760, borderRadius: 64, border: "14px solid #34414b", background: "#0e1824", opacity: 1 - gone * 0.8, transform: `rotate(${gone * 20}deg)` }}>
        <div style={{ ...row, top: 90, fontFamily: monoFont, fontSize: 30, color: COLORS.muted }}>06:48</div>
        <div style={{ ...row, top: 300, fontFamily: captionFont, fontSize: 60, color: COLORS.white, fontWeight: 700 }}>МАМА</div>
        <div style={{ ...row, top: 400, fontFamily: monoFont, fontSize: 24, color: COLORS.blue }}>3 пропущені</div>
      </div>
      <Pop at={50} style={{ ...row, top: 1180 }}>
        <div style={{ fontFamily: monoFont, fontSize: 36, color: COLORS.red, letterSpacing: 5, border: `3px solid ${COLORS.red}`, padding: "10px 30px" }}>НЕМАЄ ЗВ'ЯЗКУ</div>
      </Pop>
    </AbsoluteFill>
  );
};

// 7 ─ ВЛК за двадцять хвилин
export const V07Vlk: V = () => {
  const frame = useCurrentFrame();
  const left = interpolate(frame, [4, 120], [20 * 60, 0], clamp);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(Math.floor(left % 60)).padStart(2, "0");
  return (
    <AbsoluteFill>
      <Label top={470} color={COLORS.red}>ВЛК · огляд</Label>
      <div style={{ ...row, top: 540, fontFamily: captionFont, fontWeight: 700, fontSize: 280, color: COLORS.white, letterSpacing: 4 }}>
        {mm}:{ss}
      </div>
      <div style={{ position: "absolute", left: 120, right: 120, top: 920, height: 12, background: "#2a1517" }} />
      <div style={{ position: "absolute", left: 120, top: 920, height: 12, width: 840 * (1 - left / 1200), background: COLORS.red }} />
      <Pop at={60} style={{ ...row, top: 1040, fontFamily: monoFont, fontSize: 30, color: COLORS.muted, letterSpacing: 4 }}>
        час з лікарем: ≈ 0 хв
      </Pop>
    </AbsoluteFill>
  );
};

// 8 ─ Висновок: придатний
export const V08Verdict: V = () => (
  <AbsoluteFill>
    <Doc w={800} h={820} rotate={-2} style={{ top: 330 }}>
      <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: 4 }}>ВИСНОВОК ВЛК</div>
      <Lines n={4} />
      <div style={{ marginTop: 70, fontSize: 30, color: "#55606a" }}>Придатність до служби:</div>
      <div style={{ position: "absolute", right: 40, bottom: 90 }}>
        <Stamp label="Придатний" at={22} size={90} rotate={-7} />
      </div>
    </Doc>
  </AbsoluteFill>
);

// 9 ─ Законна підстава, яку ніхто не слухав
export const V09Basis: V = () => {
  const frame = useCurrentFrame();
  const mute = interpolate(frame, [70, 90], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Doc w={800} h={620} rotate={2} style={{ top: 360, background: "#0f1c2b", color: COLORS.white, border: `3px solid ${COLORS.blue}`, boxShadow: `0 0 120px ${COLORS.blue}55` }}>
        <div style={{ fontSize: 28, color: COLORS.blue, letterSpacing: 6 }}>ЗАКОННА ПІДСТАВА</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 70, lineHeight: 1 }}>ВІДСТРОЧКА</div>
        <div style={{ marginTop: 50, opacity: 0.6 }}>
          <Lines n={3} />
        </div>
      </Doc>
      <div style={{ ...row, top: 1060, opacity: mute }}>
        <div style={{ fontFamily: monoFont, fontSize: 38, color: COLORS.red, letterSpacing: 4, border: `3px solid ${COLORS.red}`, padding: "12px 34px" }}>ВИСЛУХАТИ — ВІДМОВИЛИ</div>
      </div>
    </AbsoluteFill>
  );
};

// 10 ─ Ввечері везуть у навчальний центр
export const V10Road: V = ({ act }) => {
  const frame = useCurrentFrame();
  const c = ACTS[act].accent;
  const x = interpolate(frame, [0, 150], [1000, -300]);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, top: 800, height: 260, background: "#06090e" }} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} style={{ position: "absolute", top: 925, left: ((i * 200 - frame * 9) % 1800) - 200, width: 110, height: 10, background: "#3a4a5c" }} />
      ))}
      <div style={{ position: "absolute", left: x, top: 640 }}>
        <svg width="500" height="260" viewBox="0 0 500 260">
          <rect x="10" y="30" width="450" height="170" rx="34" fill="#121b27" stroke="#3a4a5c" strokeWidth="4" />
          <rect x="40" y="55" width="220" height="55" rx="10" fill="#0a111a" />
          <circle cx="120" cy="210" r="40" fill="#05090f" stroke="#3a4a5c" strokeWidth="6" />
          <circle cx="360" cy="210" r="40" fill="#05090f" stroke="#3a4a5c" strokeWidth="6" />
          <circle cx="14" cy="140" r="12" fill="#ffe9b0" />
        </svg>
      </div>
      <Label top={480} color={c}>вечір · день 1</Label>
      <div style={{ ...row, top: 1150, fontFamily: captionFont, fontWeight: 700, fontSize: 64, color: COLORS.white, letterSpacing: 6 }}>
        → НАВЧАЛЬНИЙ ЦЕНТР
      </div>
    </AbsoluteFill>
  );
};

// 11 ─ Родина робить один дзвінок
export const V11Call: V = ({ act }) => {
  const frame = useCurrentFrame();
  const c = ACTS[act].accent;
  return (
    <AbsoluteFill>
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 20) % 60) / 60;
        return <div key={i} style={{ position: "absolute", left: 540 - 140 - t * 220, top: 700 - 140 - t * 220, width: 280 + t * 440, height: 280 + t * 440, borderRadius: "50%", border: `3px solid ${c}`, opacity: 1 - t }} />;
      })}
      <div style={{ position: "absolute", left: 540 - 140, top: 560, width: 280, height: 280, borderRadius: "50%", background: "#102a44", border: `5px solid ${c}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: captionFont, fontSize: 120, color: COLORS.white, fontWeight: 700 }}>
        ☎
      </div>
      <div style={{ ...row, top: 940, fontFamily: captionFont, fontWeight: 700, fontSize: 100, color: COLORS.white }}>РОДИНА</div>
      <Label top={1070} color={c}>вхідний дзвінок</Label>
    </AbsoluteFill>
  );
};

// 12 ─ О двадцять другій справу отримує адвокат
export const V12Case: V = ({ act }) => {
  const c = ACTS[act].accent;
  return (
    <AbsoluteFill>
      <Pop at={2} style={{ ...row, top: 440, fontFamily: captionFont, fontWeight: 700, fontSize: 240, color: COLORS.white }}>22:00</Pop>
      <Pop at={22} style={{ position: "absolute", left: 250, top: 800, width: 580, height: 360 }}>
        <div style={{ width: 580, height: 360, background: "#13273d", border: `4px solid ${c}`, borderRadius: "0 24px 24px 24px", padding: 40, boxShadow: `0 0 80px ${c}33` }}>
          <div style={{ fontFamily: captionFont, fontWeight: 700, fontSize: 66, color: COLORS.white, letterSpacing: 6 }}>СПРАВА</div>
          <div style={{ fontFamily: monoFont, fontSize: 26, color: c, marginTop: 24, letterSpacing: 4 }}>ПРИЙНЯТО ДО РОБОТИ</div>
        </div>
      </Pop>
    </AbsoluteFill>
  );
};

// 13 ─ Запити. Скарги. Позов до суду.
export const V13Docs: V = ({ act }) => {
  const c = ACTS[act].accent;
  const items = [
    { t: "ЗАПИТ", at: 2 },
    { t: "СКАРГА", at: 32 },
    { t: "ПОЗОВ", at: 62 },
  ];
  return (
    <AbsoluteFill>
      {items.map((it, i) => (
        <Pop key={it.t} at={it.at} style={{ position: "absolute", left: 140 + i * 40, top: 360 + i * 270, width: 780 }}>
          <div style={{ height: 230, background: "#e8eaeb", color: "#16202a", transform: `rotate(${(i - 1) * 2.5}deg)`, boxShadow: "0 30px 80px #000", padding: "34px 44px", fontFamily: captionFont }}>
            <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: 6 }}>{it.t}</div>
            <div style={{ height: 12, background: c, width: "45%", marginTop: 14 }} />
            <div style={{ height: 12, background: "#b9c0c5", width: "80%", marginTop: 16 }} />
          </div>
        </Pop>
      ))}
    </AbsoluteFill>
  );
};

// 14 ─ Кожне порушення зафіксоване
export const V14Checklist: V = ({ act }) => {
  const c = ACTS[act].accent;
  const items = ["Документи проігноровано", "Телефон вилучено", "ВЛК за 20 хвилин", "Підставу не почули"];
  return (
    <AbsoluteFill>
      {items.map((t, i) => (
        <Pop key={t} at={4 + i * 22} style={{ position: "absolute", left: 90, right: 90, top: 400 + i * 190 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 30, background: "#0e1c2c", border: `2px solid ${c}55`, padding: "30px 36px", fontFamily: captionFont, fontSize: 52, color: COLORS.white, fontWeight: 600 }}>
            <span style={{ color: c, fontSize: 64 }}>✔</span>
            {t}
          </div>
        </Pop>
      ))}
      <Label top={1200} color={c}>зафіксовано</Label>
    </AbsoluteFill>
  );
};

// 15 ─ Суд визнає дії протиправними
export const V15Court: V = ({ act }) => {
  const c = ACTS[act].accent;
  return (
    <AbsoluteFill>
      <Doc w={800} h={800} rotate={-2} style={{ top: 340 }}>
        <div style={{ ...row, position: "relative", fontSize: 44, fontWeight: 700, letterSpacing: 8 }}>РІШЕННЯ СУДУ</div>
        <div style={{ marginTop: 40 }}>
          <Lines n={4} />
        </div>
        <svg width="200" height="140" viewBox="0 0 200 140" style={{ position: "absolute", left: 60, bottom: 50 }}>
          <line x1="100" y1="10" x2="100" y2="120" stroke="#16202a" strokeWidth="6" />
          <line x1="20" y1="30" x2="180" y2="30" stroke="#16202a" strokeWidth="6" />
          <path d="M20 30 L0 80 H40 Z M180 30 L160 80 H200 Z" fill="none" stroke="#16202a" strokeWidth="5" />
          <rect x="60" y="120" width="80" height="10" fill="#16202a" />
        </svg>
        <div style={{ position: "absolute", right: 30, bottom: 70 }}>
          <Stamp label="Протиправно" at={20} size={60} rotate={-7} color={c} />
        </div>
      </Doc>
    </AbsoluteFill>
  );
};

// 16 ─ Наступного ранку знову виходиш — спокійно
export const V16Morning: V = () => {
  const frame = useCurrentFrame();
  const sun = interpolate(frame, [0, 200], [160, -40], clamp);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, height: 900, background: "linear-gradient(#2a1a0e,#7a4313 70%,#c9741b)", opacity: 0.55, WebkitMaskImage: "linear-gradient(transparent, #000 30%, #000 70%, transparent)", maskImage: "linear-gradient(transparent, #000 30%, #000 70%, transparent)" }} />
      <div style={{ position: "absolute", left: 340, top: 520 + sun, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(#ffd27a,#ff9a1f 60%,transparent 72%)", opacity: 0.9 }} />
      <div style={{ position: "absolute", left: 600, top: 640, width: 300, height: 500, background: "#1a1008", border: "6px solid #5a3a1a", boxShadow: "0 0 120px #ffb34766" }} />
      <Person x={250} y={540} scale={0.95} color="#0a0705" rim="#ffa42b" />
      <Label top={1220} color={COLORS.orange}>06:40 · день 2</Label>
    </AbsoluteFill>
  );
};

// 17 ─ Correct Lawyer. Ми працюємо без обману.
export const V17Brand: V = ({ act }) => {
  const c = ACTS[act].accent;
  return (
    <AbsoluteFill>
      <Pop at={2} style={{ ...row, top: 420 }}>
        <svg width="240" height="280" viewBox="0 0 240 280">
          <path d="M120 10 L225 50 V140 Q225 230 120 270 Q15 230 15 140 V50 Z" fill="#1c1205" stroke={c} strokeWidth="8" />
          <path d="M70 140 L108 180 L172 100" fill="none" stroke={c} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Pop>
      <Glitch at={4}>
        <div style={{ ...row, top: 760, fontFamily: captionFont, fontWeight: 700, fontSize: 104, color: COLORS.white, letterSpacing: 4 }}>
          CORRECT LAWYER
        </div>
      </Glitch>
      <Pop at={26} style={{ ...row, top: 940, fontFamily: monoFont, fontSize: 34, color: c, letterSpacing: 6 }}>
        МИ ПРАЦЮЄМО БЕЗ ОБМАНУ
      </Pop>
    </AbsoluteFill>
  );
};

// 18 ─ CTA: «плюс» у коментарях
export const V18Cta: V = ({ act }) => {
  const frame = useCurrentFrame();
  const c = ACTS[act].accent;
  const pulse = 1 + Math.sin(frame / 5) * 0.05;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 240, top: 420, width: 600, height: 420, background: "#1a1208", border: `5px solid ${c}`, borderRadius: 50, transform: `scale(${pulse})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: captionFont, fontWeight: 700, fontSize: 340, color: c, boxShadow: `0 0 120px ${c}55` }}>
        +
      </div>
      <Pop at={20} style={{ ...row, top: 950 }}>
        <div style={{ background: c, color: "#1a1208", padding: "22px 54px", borderRadius: 60, fontFamily: captionFont, fontWeight: 700, fontSize: 52, letterSpacing: 3 }}>
          БЕЗКОШТОВНА КОНСУЛЬТАЦІЯ
        </div>
      </Pop>
    </AbsoluteFill>
  );
};
