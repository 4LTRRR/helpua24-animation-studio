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
 * ТАЙМІНГИ взяті з реальної озвучки public/audio/tck-6-40.mp3 (58.28 с):
 * межі фраз — по паузах у звуці (ffmpeg silencedetect), слова всередині фрази
 * розподілені пропорційно довжині. Кожен чанк = [текст, початок, кінець] у секундах аудіо.
 * Сцена починається трохи раніше за свою першу фразу й триває до початку наступної.
 */
export const HAS_VOICE = true;
const VOICE_FILE = "audio/tck-6-40.mp3";
const AUDIO_END = 58.28;
const TAIL = 1.0; // тиша після останнього слова
const LEAD = 0.12; // сцена стартує на LEAD раніше за першу фразу
const CAPTION_LEAD = 2; // кадрів: слово зʼявляється трохи раніше за звук

type Chunk = [text: string, a: number, b: number];

/** "Слово *ключове* слово" → слова; час зʼявлення (кадри від початку сцени) за довжиною слова */
const chunkWords = (chunk: Chunk, sceneStart: number): CaptionWord[] => {
  const [text, a, b] = chunk;
  const raw = text.split(/\s+/).filter(Boolean);
  const words = raw.map((w) => ({ t: w.replace(/\*/g, ""), hot: w.includes("*") }));
  const weights = words.map((w) => w.t.length + 1);
  const total = weights.reduce((x, y) => x + y, 0);
  let acc = 0;
  return words.map((w, i) => {
    const sec = a + (acc / total) * (b - a);
    acc += weights[i];
    return { ...w, at: Math.max(0, Math.round((sec - sceneStart) * FPS) - CAPTION_LEAD) };
  });
};

type Draft = {
  id: string;
  act: Act;
  hud: Hud;
  chunks: Chunk[];
  visual: SceneDef["visual"];
  captionY?: "low" | "mid";
};

/** типізований «конструктор» чернетки сцени */
const scene = (d: Draft): Draft => d;

const D1 = "ДЕНЬ 1";
const D2 = "ДЕНЬ 2";

const defs: Draft[] = [
  scene({ id: "s01", act: "calm", visual: V.V01Clock,
    chunks: [["*Уяви.*", 0, 0.49], ["Шоста сорок ранку.", 0.88, 2.23]],
    hud: { episode: "ПРОЛОГ", date: D1, time: "06:39:58" } }),
  scene({ id: "s02", act: "calm", visual: V.V02Door,
    chunks: [["Ти виходиш з під'їзду —", 2.58, 3.75], ["просто *винести сміття.*", 3.97, 5.22]],
    hud: { episode: "ЕПІЗОД 01 · ПІД'ЇЗД", date: D1, time: "06:40:05", note: "звичайний ранок" } }),
  scene({ id: "s03", act: "tense", visual: V.V03Van,
    chunks: [["А біля дверей уже стоїть *бус.*", 5.63, 7.66]],
    hud: { episode: "ЕПІЗОД 02 · ЗУСТРІЧ", date: D1, time: "06:41:10", note: "невідомий транспорт" } }),
  scene({ id: "s04", act: "crisis", visual: V.V04Passport,
    chunks: [["Тебе просять показати документи.", 8.02, 9.74], ["Ти показуєш.", 10.1, 10.86]],
    hud: { episode: "ЕПІЗОД 03 · ДОКУМЕНТИ", date: D1, time: "06:42:30" } }),
  scene({ id: "s05", act: "crisis", visual: V.V04Ignored,
    chunks: [["Але вони нікого *не цікавлять.*", 11.19, 12.86]],
    hud: { episode: "ЕПІЗОД 03 · ДОКУМЕНТИ", date: D1, time: "06:43:15", note: "документи проігноровано" } }),
  scene({ id: "s06", act: "crisis", visual: V.V05Timeline,
    chunks: [["Через сорок хвилин ти вже в *ТЦК.*", 13.22, 15.33]],
    hud: { episode: "ЕПІЗОД 04 · ДОРОГА", date: D1, time: "06:44:00" } }),
  scene({ id: "s07", act: "crisis", visual: V.V06Phone,
    chunks: [["*Телефон* забирають.", 15.61, 16.6]],
    hud: { episode: "ЕПІЗОД 05 · ТЦК", date: D1, time: "07:21:40", note: "зв'язок обірвано" } }),
  scene({ id: "s08", act: "crisis", visual: V.V07Vlk,
    chunks: [["ВЛК — за *двадцять хвилин.*", 16.92, 18.67], ["Лікаря ти майже не бачив.", 19.03, 20.57]],
    hud: { episode: "ЕПІЗОД 06 · ВЛК", date: D1, time: "08:10:00" } }),
  scene({ id: "s09", act: "crisis", visual: V.V08Verdict,
    chunks: [["Висновок:", 20.87, 21.43], ["*придатний.*", 21.7, 22.28]],
    hud: { episode: "ЕПІЗОД 06 · ВЛК", date: D1, time: "08:31:12", note: "висновок видано" } }),
  scene({ id: "s10", act: "crisis", visual: V.V09Basis,
    chunks: [["А в тебе — законна підстава для *відстрочки.*", 22.64, 25.4], ["Яку ніхто не захотів слухати.", 25.64, 27.48]],
    hud: { episode: "ЕПІЗОД 07 · ПІДСТАВА", date: D1, time: "08:32:00", note: "право не враховано" } }),
  scene({ id: "s11", act: "crisis", visual: V.V10Road,
    chunks: [["Ввечері тебе вже везуть у *навчальний центр.*", 27.87, 30.34]],
    hud: { episode: "ЕПІЗОД 08 · ДОРОГА", date: D1, time: "19:40:00" } }),
  scene({ id: "s12", act: "tense", visual: V.V11Call,
    chunks: [["Але твоя родина робить *один дзвінок.*", 30.6, 32.76]],
    hud: { episode: "ЕПІЗОД 09 · ДЗВІНОК", date: D1, time: "21:30:20", note: "рідні діють" } }),
  scene({ id: "s13", act: "calm", visual: V.V12Case,
    chunks: [["О двадцять другій справу отримує *адвокат.*", 33.11, 35.49]],
    hud: { episode: "ЕПІЗОД 10 · АДВОКАТ", date: D1, time: "21:59:56" } }),
  scene({ id: "s14", act: "calm", visual: V.V13Docs,
    chunks: [["*Запити.* *Скарги.*", 35.78, 37.13], ["*Позов* до суду.", 37.44, 38.29]],
    hud: { episode: "ЕПІЗОД 11 · ЗАХИСТ", date: D1, time: "22:40:00" } }),
  scene({ id: "s15", act: "calm", visual: V.V14Checklist,
    chunks: [["Кожне порушення — *зафіксоване.*", 38.71, 40.62]],
    hud: { episode: "ЕПІЗОД 11 · ЗАХИСТ", date: D1, time: "23:30:00", note: "докази зібрано" } }),
  scene({ id: "s16", act: "calm", visual: V.V15Court,
    chunks: [["І суд визнає дії ТЦК *протиправними.*", 40.96, 43.62]],
    hud: { episode: "ЕПІЗОД 12 · СУД", date: "ПІЗНІШЕ", time: "10:00:00", note: "рішення ухвалено" } }),
  scene({ id: "s17", act: "finale", visual: V.V16Morning,
    chunks: [
      ["А наступного ранку, о шостій сорок,", 44.02, 46.18],
      ["ти знову виходиш з під'їзду.", 46.48, 48.13],
      ["Тільки тепер —", 48.46, 49.15],
      ["*спокійно.*", 49.36, 50.06],
    ],
    hud: { episode: "ЕПІЛОГ", date: D2, time: "06:39:55", note: "ранок · день 2" } }),
  scene({ id: "s18", act: "finale", visual: V.V17Brand,
    chunks: [["*Correct Lawyer.*", 50.55, 51.43], ["Ми працюємо без обману.", 51.67, 53.33]],
    hud: { episode: "CORRECT LAWYER", date: "—", time: "06:40:30" } }),
  scene({ id: "s19", act: "finale", visual: V.V18Cta,
    chunks: [["Напиши «*плюс*» у коментарях — і отримай *безкоштовну* первинну консультацію.", 53.66, 58.04]],
    hud: { episode: "CORRECT LAWYER", date: "—", time: "06:40:35" } }),
];

/** межі сцен у кадрах: початок першої фрази − LEAD; остання сцена — до кінця аудіо + TAIL */
const startsSec = defs.map((d, i) => (i === 0 ? 0 : Math.max(0, d.chunks[0][1] - LEAD)));
const startFrames = startsSec.map((t) => Math.round(t * FPS));
const endFrames = [...startFrames.slice(1), Math.round((AUDIO_END + TAIL) * FPS)];

export const tckScenes: SceneDef[] = defs.map((d, i) => ({
  id: d.id,
  // ціле число кадрів: кіт множить на FPS і округлює, тож накопичення похибки немає
  seconds: (endFrames[i] - startFrames[i]) / FPS,
  act: d.act,
  hud: d.hud,
  words: d.chunks.flatMap((c) => chunkWords(c, startsSec[i])),
  visual: d.visual,
  captionY: d.captionY,
}));

export const tckFrames = endFrames[endFrames.length - 1];

export const EpisodeTck: React.FC = () => (
  <AbsoluteFill>
    <Episode scenes={tckScenes} />
    {HAS_VOICE ? <Audio src={staticFile(VOICE_FILE)} /> : null}
  </AbsoluteFill>
);
