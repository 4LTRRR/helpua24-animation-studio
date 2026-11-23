import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  ACTS,
  COLORS,
  CountUp,
  Episode,
  Glitch,
  Pop,
  ScanBox,
  Stamp,
  Typewriter,
  captionFont,
  monoFont,
  type Act,
  type SceneDef,
} from "./kit";

/**
 * ШАБЛОН ЕПІЗОДУ. Тема тут навмисно нейтральна («Справа №0»).
 * Для нової теми: скопіюй файл, заміни `scenes` — HUD, слова з таймінгами
 * (з транскрипції голосу) і `visual`. Кіт (kit.tsx) чіпати не треба.
 */

const center: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
};

// 1. ХУК — друкарська машинка на «терміналі»
const VisualHook: React.FC<{ act: Act }> = ({ act }) => (
  <AbsoluteFill>
    <div style={{ ...center, top: 700 }}>
      <Typewriter text="уяви" color={ACTS[act].accent} size={90} />
    </div>
  </AbsoluteFill>
);

// 2. ОБ'ЄКТ ПІД СКАНУВАННЯМ — два силуети з рамками ID
const VisualScan: React.FC<{ act: Act }> = () => (
  <AbsoluteFill>
    <ScanBox label="ID: ??? · ALPHA" x={150} y={620} w={300} h={380} />
    <ScanBox label="ID: ??? · BRAVO" x={620} y={660} w={300} h={380} />
    {[300, 770].map((x, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: x - 130,
          top: 700,
          width: 260,
          height: 460,
          borderRadius: "130px 130px 40px 40px",
          background: "linear-gradient(#10233d,#070e1a)",
          border: "3px solid #1d4d7a",
          boxShadow: "0 0 60px #0f3a6366",
        }}
      />
    ))}
  </AbsoluteFill>
);

// 3. ДОКУМЕНТ + ШТАМП
const VisualDocument: React.FC<{ act: Act }> = () => (
  <AbsoluteFill>
    <div
      style={{
        position: "absolute",
        left: 140,
        top: 360,
        width: 800,
        height: 900,
        background: "#e8eaeb",
        transform: "rotate(-2deg)",
        boxShadow: "0 40px 100px #000",
        padding: 56,
        color: "#16202a",
        fontFamily: captionFont,
      }}
    >
      <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 3 }}>ДОКУМЕНТ № 0</div>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{ height: 14, background: "#b9c0c5", margin: "34px 0", width: `${90 - i * 9}%` }} />
      ))}
      <div style={{ position: "absolute", right: 50, bottom: 60 }}>
        <Stamp label="Підроблено" at={25} />
      </div>
    </div>
  </AbsoluteFill>
);

// 4. ЦИФРА, ЩО НАКРУЧУЄТЬСЯ + RGB-ГЛІТЧ
const VisualNumber: React.FC<{ act: Act }> = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <div style={{ ...center, top: 520, fontFamily: captionFont, fontWeight: 700, fontSize: 210, color: COLORS.white }}>
        <Glitch at={50}>
          <CountUp to={300000} start={4} seconds={1.6} format={(n) => `$${Math.round(n).toLocaleString("en-US")}`} />
        </Glitch>
      </div>
      <div style={{ ...center, top: 800, fontFamily: monoFont, fontSize: 28, color: COLORS.muted, letterSpacing: 4 }}>
        {frame > 40 ? "СУМА ЗБИТКІВ" : ""}
      </div>
    </AbsoluteFill>
  );
};

// 5. ФІНАЛ — пульсуюча крапка + «ДАЛІ БУДЕ»
const VisualEnd: React.FC<{ act: Act }> = ({ act }) => {
  const frame = useCurrentFrame();
  const r = 90 + Math.sin(frame / 6) * 10;
  return (
    <AbsoluteFill>
      <div style={{ ...center, top: 560 }}>
        <div style={{ width: r * 2, height: r * 2, borderRadius: "50%", background: ACTS[act].accent, opacity: 0.85, boxShadow: `0 0 120px ${ACTS[act].accent}` }} />
      </div>
      <Pop at={20} style={{ ...center, top: 900, fontFamily: captionFont, fontWeight: 700, fontSize: 70, color: COLORS.white, letterSpacing: 8 }}>
        ДАЛІ БУДЕ
      </Pop>
    </AbsoluteFill>
  );
};

export const templateScenes: SceneDef[] = [
  {
    id: "hook",
    seconds: 4,
    act: "calm",
    hud: { episode: "ПРОЛОГ", date: "01.01.2026", time: "03:11:59" },
    words: [
      { t: "Уяви", at: 0 },
      { t: "що", at: 14 },
      { t: "ніхто", at: 24, hot: true },
      { t: "не", at: 40 },
      { t: "знає", at: 50 },
    ],
    visual: VisualHook,
  },
  {
    id: "scan",
    seconds: 5,
    act: "tense",
    hud: { episode: "ЕПІЗОД 01 · ВИКОНАВЦІ", date: "14.04.2026", time: "21:03:58", note: "ОСОБИ НЕ ВСТАНОВЛЕНО" },
    words: [
      { t: "Двоє", at: 0 },
      { t: "під", at: 16 },
      { t: "чужими", at: 26 },
      { t: "іменами", at: 44, hot: true },
    ],
    visual: VisualScan,
  },
  {
    id: "doc",
    seconds: 5,
    act: "crisis",
    hud: { episode: "ЕПІЗОД 02 · ДОКАЗ", date: "02.05.2026", time: "07:45:19", note: "ВНУТРІШНІЙ ДОКУМЕНТ" },
    words: [
      { t: "Документ", at: 0 },
      { t: "який", at: 22 },
      { t: "ніколи", at: 34, hot: true },
      { t: "не", at: 52 },
      { t: "існував", at: 60 },
    ],
    visual: VisualDocument,
  },
  {
    id: "number",
    seconds: 5,
    act: "crisis",
    hud: { episode: "ЕПІЗОД 03 · НАСЛІДКИ", date: "03.05.2026", time: "15:09:48" },
    words: [
      { t: "Збитки", at: 0 },
      { t: "склали", at: 20 },
      { t: "триста", at: 36 },
      { t: "тисяч", at: 52, hot: true },
    ],
    visual: VisualNumber,
  },
  {
    id: "end",
    seconds: 4,
    act: "finale",
    hud: { episode: "ЕПІЗОД 04 · ФІНАЛ", date: "СЬОГОДНІ", time: "03:12:11" },
    words: [
      { t: "І", at: 0 },
      { t: "це", at: 8 },
      { t: "ще", at: 18 },
      { t: "не", at: 28 },
      { t: "кінець", at: 38, hot: true },
    ],
    visual: VisualEnd,
  },
];

export const EpisodeTemplate: React.FC = () => <Episode scenes={templateScenes} />;
