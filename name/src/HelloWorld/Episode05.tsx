import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BLUE,
  GOLD,
  ORANGE,
  S10Decision,
  S11Call,
  S12Final,
  S1Position,
  S2Hospital,
  S3NoPayments,
  S4Silence,
  S5Decision,
  S6Office,
  S7Evidence,
  S8Court,
  S9Hearing,
  WHITE,
} from "./Episode05Scenes";

// Епізод 05: «Він захищав країну. А хто захистить його?»
// Сценарій: scripts/episode-viyskovi-advokat.md. Озвучка: public/audio/episode05-voice.mp3 (91,95 с).
// Межі сцен підібрані за паузами в озвучці. Щоб підправити, змініть секунди в `ends`.

export const EPISODE05_FPS = 30;
export const EPISODE05_FRAMES = 2850; // 95 с: озвучка + заставка

const ends = [6.34, 15.06, 19.84, 30.48, 38.08, 45.09, 56.12, 63.51, 71.14, 79.25, 87.54, 91.95];

type Scene = {
  ep: string;
  place: string;
  date: string; // дд.мм.рррр гг:хх:сс
  note: string;
  tone: [string, string]; // колір центру та країв фону
  Visual: React.FC<{ dur: number }>;
  subs: string[]; // *слово* виділяється помаранчевим
};

const scenes: Scene[] = [
  { ep: "01", place: "ПОЗИЦІЯ", date: "14.03.2025 05:12:40", note: "ПЕРЕДНІЙ КРАЙ", tone: ["#1c3550", "#05090f"], Visual: S1Position, subs: ["ПІВ РОКУ *НА ПОЗИЦІЇ*", "А ПОТІМ СКАЗАЛИ:", "«*НІЧОГО* НЕ НАЛЕЖИТЬ»"] },
  { ep: "02", place: "ГОСПІТАЛЬ", date: "02.04.2025 11:20:05", note: "ПОРАНЕННЯ", tone: ["#17324a", "#05090f"], Visual: S2Hospital, subs: ["*ПОРАНЕННЯ* ПІД ОБСТРІЛОМ", "ГОСПІТАЛЬ. РЕАБІЛІТАЦІЯ", "НАЙСТРАШНІШЕ *ПОЗАДУ?*"] },
  { ep: "03", place: "БЮРОКРАТІЯ", date: "09.09.2025 10:00:00", note: "ВИПЛАТИ: 0", tone: ["#3a1818", "#070709"], Visual: S3NoPayments, subs: ["ВИПЛАТ *НЕМАЄ*", "МІСЯЦЬ. ДВА. ПІВ РОКУ", "НЕ ВИСТАЧАЄ *ПАПІРЦЯ*"] },
  { ep: "04", place: "ТИША", date: "21.10.2025 14:35:12", note: "ЗВ'ЯЗКУ НЕМАЄ", tone: ["#12243a", "#05080d"], Visual: S4Silence, subs: ["КОМАНДИР *ЗМІНИВСЯ*", "СВІДКИ *РОЗСІЯЛИСЬ*", "«МИ НІЧОГО *НЕ ЗНАЄМО*»"] },
  { ep: "05", place: "РІШЕННЯ", date: "03.11.2025 23:48:30", note: "НІЧ", tone: ["#14283d", "#04070c"], Visual: S5Decision, subs: ["ЗВЕРТАЄТЬСЯ ДО *АДВОКАТА*", "НЕ ВОЮВАТИ ЗІ СВОЇМИ", "ВИХОДУ *НЕМАЄ*"] },
  { ep: "06", place: "КАБІНЕТ", date: "05.11.2025 10:15:00", note: "ПЕРША ЗУСТРІЧ", tone: ["#4a3016", "#0b0805"], Visual: S6Office, subs: ["ПОЧИНАЄ НЕ З ЗАЯВ", "А З *ПИТАННЯ*", "ХВИЛИНА ЗА ХВИЛИНОЮ"] },
  { ep: "07", place: "ДОКАЗИ", date: "12.11.2025 16:40:12", note: "ПІДТВЕРДЖЕНО", tone: ["#43301a", "#0a0806"], Visual: S7Evidence, subs: ["*РАПОРТИ*. ЖУРНАЛИ.", "ПОБРАТИМИ ПІДТВЕРДЖУЮТЬ", "КОЖЕН ФАКТ *ПІДПИСАНИЙ*"] },
  { ep: "08", place: "СУД", date: "18.12.2025 09:30:00", note: "ПОЗОВ ПОДАНО", tone: ["#3d2a14", "#090705"], Visual: S8Court, subs: ["ЗАПИТИ. СКАРГИ.", "ЯКЩО ТРЕБА — *СУД*", "НЕ ПРОСИТЬ. *ВИМАГАЄ*"] },
  { ep: "09", place: "ЗАСІДАННЯ", date: "24.12.2025 11:05:44", note: "ЗАЛ № 3", tone: ["#33250f", "#070605"], Visual: S9Hearing, subs: ["*ЗАСІДАННЯ*", "СТОРОНА *МОВЧИТЬ*", "ТИША ДОВША ЗА *ПРОМОВУ*"] },
  { ep: "10", place: "РІШЕННЯ", date: "29.01.2026 15:20:00", note: "НА КОРИСТЬ ВІЙСЬКОВОГО", tone: ["#5a4a1a", "#0a0804"], Visual: S10Decision, subs: ["РІШЕННЯ *НА КОРИСТЬ*", "ВИПЛАТИ НАРАХОВАНО", "ДОВІДКУ *ВИДАНО*"] },
  { ep: "11", place: "ПРАВО", date: "СЬОГОДНІ 00:00:00", note: "ВИ НЕ САМІ", tone: ["#4b3d17", "#070605"], Visual: S11Call, subs: ["СКІЛЬКИ ЩЕ *ТАКИХ*", "*НЕ МОВЧІТЬ*", "ЗБИРАЙТЕ ДОКУМЕНТИ"] },
  { ep: "12", place: "ФІНАЛ", date: "СЬОГОДНІ 00:00:00", note: "HELPUA24", tone: ["#5c4a18", "#060504"], Visual: S12Final, subs: ["ВИ ЗАХИЩАЄТЕ *КРАЇНУ*", "МИ ЗАХИСТИМО *ВАС*"] },
];

const MONO = "'Liberation Mono', 'DejaVu Sans Mono', monospace";
const SANS = "Arial, 'Liberation Sans', sans-serif";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const tick = (date: string, seconds: number): string => {
  const m = date.match(/^(.*?)(\d\d):(\d\d):(\d\d)$/);
  if (!m) return date;
  let t = Number(m[2]) * 3600 + Number(m[3]) * 60 + Number(m[4]) + seconds;
  t %= 86400;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${m[1]}${p(Math.floor(t / 3600))}:${p(Math.floor((t % 3600) / 60))}:${p(t % 60)}`;
};

const Hud: React.FC<{ s: Scene }> = ({ s }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: 70, left: 56, right: 56, fontFamily: MONO, color: "rgba(255,255,255,0.55)", fontSize: 21, letterSpacing: 3 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>ЕПІЗОД {s.ep} · {s.place}</span>
        <span>{tick(s.date, Math.floor(f / 30))}</span>
      </div>
      <div style={{ textAlign: "right", marginTop: 8, fontSize: 17, color: ORANGE, opacity: 0.8 }}>{s.note}</div>
    </div>
  );
};

const Subtitles: React.FC<{ subs: string[]; dur: number }> = ({ subs, dur }) => {
  const f = useCurrentFrame();
  const total = subs.reduce((a, c) => a + c.length, 0);
  const start = 6;
  const span = dur - start - 4;
  let acc = 0;
  let idx = 0;
  let from = start;
  for (let i = 0; i < subs.length; i++) {
    const a = start + (acc / total) * span;
    if (f >= a) {
      idx = i;
      from = a;
    }
    acc += subs[i].length;
  }
  if (f < start) return null;
  const k = interpolate(f - from, [0, 6], [0, 1], clamp);
  const parts = subs[idx].split("*");
  return (
    <div
      style={{
        position: "absolute",
        left: 50,
        right: 50,
        top: 1390,
        textAlign: "center",
        fontFamily: SANS,
        fontWeight: 900,
        fontSize: 76,
        lineHeight: 1.08,
        letterSpacing: -1,
        color: WHITE,
        textShadow: "0 6px 22px rgba(0,0,0,0.95), 0 0 3px #000",
        opacity: k,
        transform: `translateY(${(1 - k) * 18}px) scale(${0.96 + 0.04 * k})`,
      }}
    >
      {parts.map((p, i) => (
        <span key={i} style={{ color: i % 2 ? ORANGE : WHITE }}>
          {p}
        </span>
      ))}
    </div>
  );
};

const Grain: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, mixBlendMode: "overlay", opacity: 0.1 }}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed={f % 7} />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
};

const SceneView: React.FC<{ s: Scene; dur: number }> = ({ s, dur }) => {
  const f = useCurrentFrame();
  const blur = interpolate(f, [0, 12], [16, 0], clamp);
  const zoom = interpolate(f, [0, dur], [1.0, 1.07], clamp);
  const fadeOut = interpolate(f, [dur - 6, dur], [1, 0.0], clamp);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 38%, ${s.tone[0]} 0%, ${s.tone[1]} 72%)`, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, filter: `blur(${blur}px)`, opacity: 0.35 + 0.65 * fadeOut }}>
        <s.Visual dur={dur} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.75) 100%)" }} />
      <Hud s={s} />
      <Subtitles subs={s.subs} dur={dur} />
      <Grain />
    </AbsoluteFill>
  );
};

const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const a = interpolate(f, [0, 14], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: "#060a10", alignItems: "center", justifyContent: "center", opacity: a, fontFamily: SANS }}>
      <div style={{ color: WHITE, fontWeight: 900, fontSize: 96, letterSpacing: 12 }}>HELPUA24</div>
      <div style={{ color: GOLD, fontSize: 34, letterSpacing: 8, marginTop: 28 }}>ЗАХИСТ ВІЙСЬКОВИХ</div>
      <div style={{ width: interpolate(f, [10, durationInFrames], [0, 420], clamp), height: 4, background: BLUE, marginTop: 40 }} />
    </AbsoluteFill>
  );
};

export const Episode05: React.FC = () => {
  const frames = ends.map((e) => Math.round(e * EPISODE05_FPS));
  const starts = [0, ...frames.slice(0, -1)];
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {scenes.map((s, i) => (
        <Sequence key={i} from={starts[i]} durationInFrames={frames[i] - starts[i]}>
          <SceneView s={s} dur={frames[i] - starts[i]} />
        </Sequence>
      ))}
      <Sequence from={frames[frames.length - 1]}>
        <EndCard />
      </Sequence>
      <Audio src={staticFile("audio/episode05-voice.mp3")} />
    </AbsoluteFill>
  );
};
