import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import {
  Episode,
  FPS,
  type Act,
  type CaptionWord,
  type Hud,
  type SceneDef,
} from "../Series/kit";
import * as V from "./visuals";

/**
 * «Шоста сорок» — Correct Lawyer · відео про незаконну мобілізаційну затримку.
 *
 * ТАЙМІНГИ: поки немає озвучки, `seconds` і момент появи слів ОЦІНЮЮТЬСЯ з довжини тексту
 * (≈13 символів/с). Коли в public/audio/tck-6-40.mp3 зʼявиться голос:
 *   1) транскрибувати його (ElevenLabs scribe → слова з start/end),
 *   2) у SCENES задати реальні `seconds` (до початку наступної фрази),
 *   3) поставити HAS_VOICE = true.
 */
export const HAS_VOICE = false;
const VOICE_FILE = "audio/tck-6-40.mp3";

const CHARS_PER_SEC = 13;

/** "Слово *ключове* слово" → слова з таймінгом, розподіленим за довжиною */
const toWords = (text: string, seconds: number): CaptionWord[] => {
  const raw = text.split(/\s+/).filter(Boolean);
  const words = raw.map((w) => ({
    t: w.replace(/\*/g, ""),
    hot: w.includes("*"),
  }));
  const weights = words.map((w) => w.t.length + 1.5);
  const total = weights.reduce((a, b) => a + b, 0);
  const span = seconds * FPS * 0.88;
  let acc = 0;
  return words.map((w, i) => {
    const at = Math.round((acc / total) * span);
    acc += weights[i];
    return { ...w, at };
  });
};

type Draft = {
  id: string;
  act: Act;
  hud: Hud;
  text: string;
  visual: SceneDef["visual"];
  /** якщо відомо з озвучки */
  seconds?: number;
  captionY?: "low" | "mid";
};

const scene = (d: Draft): SceneDef => {
  const plain = d.text.replace(/\*/g, "");
  const seconds = d.seconds ?? Math.max(2.4, plain.length / CHARS_PER_SEC + 0.45);
  return {
    id: d.id,
    seconds,
    act: d.act,
    hud: d.hud,
    words: toWords(d.text, seconds),
    visual: d.visual,
    captionY: d.captionY,
  };
};

const D1 = "ДЕНЬ 1";
const D2 = "ДЕНЬ 2";

export const tckScenes: SceneDef[] = [
  scene({ id: "s01", act: "calm", text: "*Уяви.* Шоста сорок ранку.", visual: V.V01Clock,
    hud: { episode: "ПРОЛОГ", date: D1, time: "06:39:58" } }),
  scene({ id: "s02", act: "calm", text: "Ти виходиш з під'їзду — просто *винести сміття.*", visual: V.V02Door,
    hud: { episode: "ЕПІЗОД 01 · ПІД'ЇЗД", date: D1, time: "06:40:05", note: "звичайний ранок" } }),
  scene({ id: "s03", act: "tense", text: "А біля дверей уже стоїть *бус.*", visual: V.V03Van,
    hud: { episode: "ЕПІЗОД 02 · ЗУСТРІЧ", date: D1, time: "06:41:10", note: "невідомий транспорт" } }),
  scene({ id: "s04", act: "crisis", text: "Тебе просять показати документи. Ти показуєш.", visual: V.V04Passport,
    hud: { episode: "ЕПІЗОД 03 · ДОКУМЕНТИ", date: D1, time: "06:42:30" } }),
  scene({ id: "s05", act: "crisis", text: "Але вони нікого *не цікавлять.*", visual: V.V04Ignored,
    hud: { episode: "ЕПІЗОД 03 · ДОКУМЕНТИ", date: D1, time: "06:43:15", note: "документи проігноровано" } }),
  scene({ id: "s06", act: "crisis", text: "Через сорок хвилин ти вже в *ТЦК.*", visual: V.V05Timeline,
    hud: { episode: "ЕПІЗОД 04 · ДОРОГА", date: D1, time: "06:44:00" } }),
  scene({ id: "s07", act: "crisis", text: "*Телефон* забирають.", visual: V.V06Phone,
    hud: { episode: "ЕПІЗОД 05 · ТЦК", date: D1, time: "07:21:40", note: "зв'язок обірвано" } }),
  scene({ id: "s08", act: "crisis", text: "ВЛК — за *двадцять хвилин.* Лікаря ти майже не бачив.", visual: V.V07Vlk,
    hud: { episode: "ЕПІЗОД 06 · ВЛК", date: D1, time: "08:10:00" } }),
  scene({ id: "s09", act: "crisis", text: "Висновок: *придатний.*", visual: V.V08Verdict,
    hud: { episode: "ЕПІЗОД 06 · ВЛК", date: D1, time: "08:31:12", note: "висновок видано" } }),
  scene({ id: "s10", act: "crisis", text: "А в тебе — законна підстава для *відстрочки.* Яку ніхто не захотів слухати.", visual: V.V09Basis,
    hud: { episode: "ЕПІЗОД 07 · ПІДСТАВА", date: D1, time: "08:32:00", note: "право не враховано" } }),
  scene({ id: "s11", act: "crisis", text: "Ввечері тебе вже везуть у *навчальний центр.*", visual: V.V10Road,
    hud: { episode: "ЕПІЗОД 08 · ДОРОГА", date: D1, time: "19:40:00" } }),
  scene({ id: "s12", act: "tense", text: "Але твоя родина робить *один дзвінок.*", visual: V.V11Call,
    hud: { episode: "ЕПІЗОД 09 · ДЗВІНОК", date: D1, time: "21:30:20", note: "рідні діють" } }),
  scene({ id: "s13", act: "calm", text: "О двадцять другій справу отримує *адвокат.*", visual: V.V12Case,
    hud: { episode: "ЕПІЗОД 10 · АДВОКАТ", date: D1, time: "21:59:56" } }),
  scene({ id: "s14", act: "calm", text: "*Запити.* *Скарги.* *Позов* до суду.", visual: V.V13Docs,
    hud: { episode: "ЕПІЗОД 11 · ЗАХИСТ", date: D1, time: "22:40:00" } }),
  scene({ id: "s15", act: "calm", text: "Кожне порушення — *зафіксоване.*", visual: V.V14Checklist,
    hud: { episode: "ЕПІЗОД 11 · ЗАХИСТ", date: D1, time: "23:30:00", note: "докази зібрано" } }),
  scene({ id: "s16", act: "calm", text: "І суд визнає дії ТЦК *протиправними.*", visual: V.V15Court,
    hud: { episode: "ЕПІЗОД 12 · СУД", date: "ПІЗНІШЕ", time: "10:00:00", note: "рішення ухвалено" } }),
  scene({ id: "s17", act: "finale", text: "А наступного ранку, о шостій сорок, ти знову виходиш з під'їзду. Тільки тепер — *спокійно.*", visual: V.V16Morning,
    hud: { episode: "ЕПІЛОГ", date: D2, time: "06:39:55", note: "ранок · день 2" } }),
  scene({ id: "s18", act: "finale", text: "*Correct Lawyer.* Ми працюємо без обману.", visual: V.V17Brand,
    hud: { episode: "CORRECT LAWYER", date: "—", time: "06:40:30" } }),
  scene({ id: "s19", act: "finale", text: "Напиши «*плюс*» у коментарях — і отримай *безкоштовну* первинну консультацію.", visual: V.V18Cta,
    captionY: "low",
    hud: { episode: "CORRECT LAWYER", date: "—", time: "06:40:35" } }),
];

export const tckFrames = tckScenes.reduce((a, s) => a + Math.round(s.seconds * FPS), 0);

export const EpisodeTck: React.FC = () => (
  <AbsoluteFill>
    <Episode scenes={tckScenes} />
    {HAS_VOICE ? <Audio src={staticFile(VOICE_FILE)} /> : null}
  </AbsoluteFill>
);
