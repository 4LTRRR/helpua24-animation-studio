import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadCaptionFont } from "@remotion/google-fonts/Oswald";
import { loadFont as loadMonoFont } from "@remotion/google-fonts/RobotoMono";

/**
 * HELPUA24 "serial explainer" kit — відтворює стиль референсного ролика:
 * вертикальне 9:16, темний кінематографічний фон з кольоровим градінгом за актом,
 * плоска векторна ілюстрація, HUD зверху (серія · дата · таймкод),
 * титри 1–3 слова у нижній третині синхронно з голосом.
 */

export const captionFont = loadCaptionFont("normal", {
  weights: ["600", "700"],
  subsets: ["latin", "cyrillic"],
}).fontFamily;
export const monoFont = loadMonoFont("normal", {
  weights: ["400", "500"],
  subsets: ["latin", "cyrillic"],
}).fontFamily;

export const W = 1080;
export const H = 1920;
export const FPS = 30;

/** Акти = кольоровий градінг. Холодний → тривожний червоний → бурштиновий фінал. */
export type Act = "calm" | "tense" | "crisis" | "finale";

export const ACTS: Record<
  Act,
  { bg: string; glow: string; accent: string; hud: string }
> = {
  calm: { bg: "#060b14", glow: "#0f3a63", accent: "#3fb6ff", hud: "#ff5a4d" },
  tense: { bg: "#080a12", glow: "#1b2a55", accent: "#8fb8ff", hud: "#ff5a4d" },
  crisis: { bg: "#120406", glow: "#6b0f14", accent: "#ff3b30", hud: "#ff3b30" },
  finale: { bg: "#0a0805", glow: "#4a2a08", accent: "#ffa42b", hud: "#ffa42b" },
};

export const COLORS = {
  white: "#f2f5f8",
  muted: "#7c8896",
  orange: "#ff9a1f",
  red: "#ff3b30",
  blue: "#3fb6ff",
};

// ───────────────────────── Дані сцени ─────────────────────────

export type CaptionWord = {
  /** текст (уже в UPPERCASE не потрібно — зробимо самі) */
  t: string;
  /** кадр появи ВІДНОСНО початку сцени (з транскрипції голосу) */
  at: number;
  /** ключове слово → акцентний колір */
  hot?: boolean;
};

export type Hud = {
  /** «ЭПИЗОД 03 · ETERNALBLUE» */
  episode: string;
  /** «12.05.2017» */
  date: string;
  /** стартовий таймкод «03:11:59» — далі йде в реальному часі */
  time: string;
  /** маленький підпис під таймкодом: «ЛИЧНОСТИ НЕ УСТАНОВЛЕНЫ» */
  note?: string;
};

export type SceneDef = {
  id: string;
  /** тривалість у секундах (≈4–7 с; сума = тривалість голосу) */
  seconds: number;
  act: Act;
  hud: Hud;
  words: CaptionWord[];
  /** візуал сцени — будь-який React-компонент; отримує frame відносно сцени */
  visual: React.FC<{ act: Act }>;
  /** положення титрів: low (за замовчуванням) | mid, якщо візуал займає низ */
  captionY?: "low" | "mid";
};

// ───────────────────────── Атмосфера ─────────────────────────

const parseTime = (t: string) => {
  const [h, m, s] = t.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};
const fmtTime = (sec: number) => {
  const s = Math.floor(sec) % 86400;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
};

export const Backdrop: React.FC<{ act: Act }> = ({ act }) => {
  const frame = useCurrentFrame();
  const c = ACTS[act];
  // повільний «дихаючий» глоу
  const breathe = 0.85 + Math.sin(frame / 38) * 0.15;
  return (
    <AbsoluteFill style={{ background: c.bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 80% 55% at 50% 42%, ${c.glow} 0%, transparent 70%)`,
          opacity: breathe,
        }}
      />
    </AbsoluteFill>
  );
};

export const Particles: React.FC<{ act: Act; count?: number }> = ({
  act,
  count = 28,
}) => {
  const frame = useCurrentFrame();
  const c = ACTS[act];
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }, (_, i) => {
        const x = random(`px${i}`) * W;
        const y0 = random(`py${i}`) * H;
        const speed = 0.15 + random(`ps${i}`) * 0.5;
        const y = (y0 - frame * speed + H) % H;
        const size = 3 + random(`pz${i}`) * 7;
        const o = 0.12 + random(`po${i}`) * 0.35;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + Math.sin(frame / 40 + i) * 14,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: c.accent,
              opacity: o,
              filter: "blur(1.5px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Віньєтка + тонка плівкова зернистість + скан-лінії */
export const Vignette: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 90% 75% at 50% 48%, transparent 45%, rgba(0,0,0,0.78) 100%)",
      }}
    />
    <AbsoluteFill
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 4px)",
      }}
    />
  </AbsoluteFill>
);

// ───────────────────────── HUD ─────────────────────────

export const HudBar: React.FC<{
  hud: Hud;
  act: Act;
  /** секунди від старту ВСЬОГО відео — щоб таймкод тік безперервно */
  elapsed: number;
}> = ({ hud, act, elapsed }) => {
  const frame = useCurrentFrame();
  const c = ACTS[act];
  const blink = Math.floor(frame / 15) % 2 === 0;
  const fade = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 64,
        left: 56,
        right: 56,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        fontFamily: monoFont,
        opacity: fade,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 22,
          letterSpacing: 2,
          color: COLORS.muted,
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: c.hud,
            opacity: blink ? 1 : 0.25,
            boxShadow: `0 0 12px ${c.hud}`,
          }}
        />
        {hud.episode}
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 30, color: "#aab4c0", letterSpacing: 1 }}>
          {hud.date}&nbsp;&nbsp;{fmtTime(parseTime(hud.time) + elapsed)}
        </div>
        {hud.note ? (
          <div
            style={{
              fontSize: 17,
              color: c.hud,
              letterSpacing: 2,
              marginTop: 6,
              textTransform: "uppercase",
            }}
          >
            {hud.note}
          </div>
        ) : null}
      </div>
    </div>
  );
};

// ───────────────────────── Титри ─────────────────────────

/**
 * Караоке-титри: слова накопичуються у «фразу» і зникають, коли починається
 * наступна (група = слова, між якими пауза < gap кадрів і ≤ maxWords).
 * Ключові слова (`hot`) — акцентним кольором.
 */
export const Captions: React.FC<{
  words: CaptionWord[];
  y?: "low" | "mid";
  maxWords?: number;
}> = ({ words, y = "low", maxWords = 3 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // групуємо
  const groups: CaptionWord[][] = [];
  words.forEach((w) => {
    const g = groups[groups.length - 1];
    if (g && g.length < maxWords) g.push(w);
    else groups.push([w]);
  });

  let active = -1;
  groups.forEach((g, i) => {
    if (frame >= g[0].at) active = i;
  });
  if (active < 0) return null;
  const group = groups[active];
  const appear = spring({
    frame: frame - group[0].at,
    fps,
    config: { damping: 18, stiffness: 220, mass: 0.6 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 150, // правий нижній кут — безпечна зона під водяні знаки платформи
        top: y === "low" ? 1480 : 1180,
        fontFamily: captionFont,
        fontWeight: 700,
        fontSize: 78,
        lineHeight: 1.05,
        textTransform: "uppercase",
        letterSpacing: 1,
        color: COLORS.white,
        textShadow: "0 6px 22px rgba(0,0,0,0.85), 0 0 2px rgba(0,0,0,0.9)",
        transform: `translateY(${(1 - appear) * 26}px) scale(${0.94 + appear * 0.06})`,
        transformOrigin: "left bottom",
        opacity: Math.min(1, appear * 1.4),
      }}
    >
      {group.map((w, i) => {
        const shown = frame >= w.at;
        return (
          <span
            key={i}
            style={{
              color: w.hot ? COLORS.orange : COLORS.white,
              opacity: shown ? 1 : 0.0,
              marginRight: 18,
              display: "inline-block",
            }}
          >
            {w.t}
          </span>
        );
      })}
    </div>
  );
};

// ───────────────────────── Сцена та епізод ─────────────────────────

/** Повільний push-in (Ken Burns) на візуал — тримає кадр «живим» */
export const PushIn: React.FC<{
  children: React.ReactNode;
  from?: number;
  to?: number;
  durationInFrames: number;
}> = ({ children, from = 1, to = 1.07, durationInFrames }) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [0, durationInFrames], [from, to], {
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ transform: `scale(${s})` }}>{children}</AbsoluteFill>;
};

const SceneShell: React.FC<{
  scene: SceneDef;
  frames: number;
  elapsed: number;
}> = ({ scene, frames, elapsed }) => {
  const frame = useCurrentFrame();
  const V = scene.visual;
  // «удар» на склейці: 3 кадри легкого спалаху/зсуву — жорстка склейка як в оригіналі
  const hit = interpolate(frame, [0, 3], [1, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Backdrop act={scene.act} />
      <Particles act={scene.act} />
      <PushIn durationInFrames={frames}>
        <V act={scene.act} />
      </PushIn>
      <Vignette />
      <HudBar hud={scene.hud} act={scene.act} elapsed={elapsed} />
      <Captions words={scene.words} y={scene.captionY} />
      <AbsoluteFill
        style={{ background: "#fff", opacity: hit * 0.16, pointerEvents: "none" }}
      />
    </AbsoluteFill>
  );
};

export const sceneFrames = (s: SceneDef) => Math.round(s.seconds * FPS);
export const totalFrames = (scenes: SceneDef[]) =>
  scenes.reduce((a, s) => a + sceneFrames(s), 0);

/** Збирає епізод: жорсткі склейки, безперервний таймкод у HUD. */
export const Episode: React.FC<{ scenes: SceneDef[] }> = ({ scenes }) => {
  let cursor = 0;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {scenes.map((s) => {
        const frames = sceneFrames(s);
        const from = cursor;
        cursor += frames;
        return (
          <Sequence key={s.id} from={from} durationInFrames={frames} layout="none">
            <SceneShell scene={s} frames={frames} elapsed={from / FPS} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

// ───────────────────────── Анімаційні примітиви ─────────────────────────

/** Друкарська машинка з курсором («> представь▌») */
export const Typewriter: React.FC<{
  text: string;
  start?: number;
  cps?: number;
  color?: string;
  size?: number;
}> = ({ text, start = 0, cps = 14, color = COLORS.blue, size = 64 }) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.floor(((frame - start) / FPS) * cps));
  const cursor = Math.floor(frame / 8) % 2 === 0 ? "▌" : " ";
  return (
    <div
      style={{
        fontFamily: monoFont,
        fontSize: size,
        color,
        textShadow: `0 0 24px ${color}`,
      }}
    >
      {"> "}
      {text.slice(0, n)}
      {cursor}
    </div>
  );
};

/** Штамп, що «ляпає» на документ */
export const Stamp: React.FC<{
  label: string;
  at: number;
  color?: string;
  rotate?: number;
  size?: number;
}> = ({ label, at, color = COLORS.red, rotate = -9, size = 56 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - at,
    fps,
    config: { damping: 9, stiffness: 260, mass: 0.7 },
  });
  if (frame < at) return null;
  return (
    <div
      style={{
        display: "inline-block",
        fontFamily: captionFont,
        fontWeight: 700,
        fontSize: size,
        color,
        border: `7px solid ${color}`,
        padding: "6px 22px",
        letterSpacing: 3,
        textTransform: "uppercase",
        transform: `rotate(${rotate}deg) scale(${2.4 - p * 1.4})`,
        opacity: Math.min(1, p * 1.6) * 0.92,
        mixBlendMode: "screen",
      }}
    >
      {label}
    </div>
  );
};

/** Число, що «накручується» (гроші, лічильник жертв, роки) */
export const CountUp: React.FC<{
  to: number;
  from?: number;
  start?: number;
  seconds?: number;
  format?: (n: number) => string;
  style?: React.CSSProperties;
}> = ({ to, from = 0, start = 0, seconds = 1.5, format, style }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [start, start + seconds * FPS], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = 1 - Math.pow(1 - t, 3);
  const v = from + (to - from) * eased;
  return (
    <span style={style}>
      {format ? format(v) : Math.round(v).toLocaleString("uk-UA")}
    </span>
  );
};

/** Поява елемента: пружинний «поп» знизу */
export const Pop: React.FC<{
  at?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ at = 0, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - at,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  return (
    <div
      style={{
        opacity: Math.min(1, p * 1.5),
        transform: `translateY(${(1 - p) * 60}px) scale(${0.85 + p * 0.15})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** RGB-глітч для тексту/логотипу на «ударних» моментах */
export const Glitch: React.FC<{
  children: React.ReactNode;
  at: number;
  frames?: number;
}> = ({ children, at, frames = 10 }) => {
  const frame = useCurrentFrame();
  const on = frame >= at && frame < at + frames;
  const dx = on ? (random(`g${frame}`) - 0.5) * 26 : 0;
  return (
    <div style={{ position: "relative" }}>
      {on ? (
        <>
          <div style={{ position: "absolute", inset: 0, transform: `translateX(${dx}px)`, color: "#ff2a2a", mixBlendMode: "screen", opacity: 0.8 }}>
            {children}
          </div>
          <div style={{ position: "absolute", inset: 0, transform: `translateX(${-dx}px)`, color: "#2affff", mixBlendMode: "screen", opacity: 0.8 }}>
            {children}
          </div>
        </>
      ) : null}
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
};

/** Рамка «розпізнавання» з кутами — для персонажів/об'єктів, що «скануються» */
export const ScanBox: React.FC<{
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
}> = ({ label, x, y, w, h, color = COLORS.red }) => {
  const k = 34;
  const corner = (pos: React.CSSProperties): React.CSSProperties => ({
    position: "absolute",
    width: k,
    height: k,
    borderColor: color,
    borderStyle: "solid",
    borderWidth: 0,
    ...pos,
  });
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h }}>
      <div style={{ ...corner({ left: 0, top: 0 }), borderLeftWidth: 4, borderTopWidth: 4 }} />
      <div style={{ ...corner({ right: 0, top: 0 }), borderRightWidth: 4, borderTopWidth: 4 }} />
      <div style={{ ...corner({ left: 0, bottom: 0 }), borderLeftWidth: 4, borderBottomWidth: 4 }} />
      <div style={{ ...corner({ right: 0, bottom: 0 }), borderRightWidth: 4, borderBottomWidth: 4 }} />
      <div style={{ position: "absolute", left: 0, top: -34, fontFamily: monoFont, fontSize: 20, color, letterSpacing: 2 }}>
        {label}
      </div>
    </div>
  );
};
