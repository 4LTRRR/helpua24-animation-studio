import React from "react";
import { Audio, Composition, Folder, Sequence, staticFile } from "remotion";

import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import { Character } from "./HelloWorld/Character";
import { Lawyer } from "./HelloWorld/Lawyer";
import { DialogueScene } from "./HelloWorld/DialogueScene";
import { MilitaryScene } from "./HelloWorld/MilitaryScene";
import { EpisodeNarration } from "./HelloWorld/EpisodeNarration";
import { EpisodeEndCard } from "./HelloWorld/EpisodeEndCard";
import {
  ReportWritingScene,
  WaitingScene,
  MedicalScene,
  MissingReportScene,
  ReportCopyScene,
  SendingReportScene,
  LawyerInvestigationScene,
  JournalMismatchScene,
  ThreatScene,
  ThreatCloseupScene,
  PhoneCallScene,
  StampRevealScene,
  FinalCallScene,
} from "./HelloWorld/EpisodeScenes";

// Перша серія: «Рапорт, якого ніхто не бачить»
// Кожен важливий момент історії має окремий візуальний кадр.
const HELPUA24Episode01: React.FC = () => {
  return (
    <>
      {/* 0–3 с: вступ і назва серії */}
      <Sequence durationInFrames={90}>
        <HelloWorld titleText="HELPUA24" titleColor="#FFFFFF" />
      </Sequence>

      {/* 3–8 с: військовий пише рапорт */}
      <Sequence from={90} durationInFrames={150}>
        <ReportWritingScene />
      </Sequence>

      {/* 8–12,5 с: очікування відповіді */}
      <Sequence from={240} durationInFrames={135}>
        <WaitingScene />
      </Sequence>

      {/* 12,5–18,4 с: стан здоров'я погіршується; рапорт без резолюції */}
      <Sequence from={375} durationInFrames={178}>
        <MedicalScene />
      </Sequence>

      {/* 18,4–22,7 с: у частині стверджують, що рапорт не надходив */}
      <Sequence from={553} durationInFrames={129}>
        <MissingReportScene />
      </Sequence>

      {/* 22,7–27 с: копія рапорту з вхідним номером */}
      <Sequence from={682} durationInFrames={128}>
        <ReportCopyScene />
      </Sequence>

      {/* 27–32 с: військовий надсилає фото адвокату */}
      <Sequence from={810} durationInFrames={150}>
        <SendingReportScene />
      </Sequence>

      {/* 32–38 с: адвокат звіряє дату, підпис і шлях документа */}
      <Sequence from={960} durationInFrames={180}>
        <LawyerInvestigationScene variant="verification" />
      </Sequence>

      {/* 38–42,5 с: адвокат перевіряє шлях документа */}
      <Sequence from={1140} durationInFrames={135}>
        <LawyerInvestigationScene variant="route" />
      </Sequence>

      {/* 42,5–48,4 с: порівняння рапорту та журналу; до 43 с початок сцени не змінений */}
      <Sequence from={1275} durationInFrames={177}>
        <JournalMismatchScene />
      </Sequence>

      {/* Далі всі візуальні сцени зсунуті на 18 кадрів (0,6 с) раніше */}
      {/* 48,4–49,4 с: військовий усвідомлює загрозу */}
      <Sequence from={1452} durationInFrames={30}>
        <MilitaryScene />
      </Sequence>

      {/* 49,4–54,4 с: надходить повідомлення з невідомого номера */}
      <Sequence from={1482} durationInFrames={150}>
        <ThreatScene />
      </Sequence>

      {/* 54,4–59,4 с: крупний план тексту погрози */}
      <Sequence from={1632} durationInFrames={150}>
        <ThreatCloseupScene />
      </Sequence>

      {/* 59,4–62,4 с: військовий телефонує адвокату */}
      <Sequence from={1782} durationInFrames={90}>
        <PhoneCallScene />
      </Sequence>

      {/* 62,4–68,4 с: адвокат повторно збільшує фото */}
      <Sequence from={1872} durationInFrames={180}>
        <LawyerInvestigationScene variant="stamp" />
      </Sequence>

      {/* 68,4–71,4 с: крупний план печатки */}
      <Sequence from={2052} durationInFrames={90}>
        <StampRevealScene variant="detail" />
      </Sequence>

      {/* 71,4–74,4 с: стає зрозуміло, що печатка чужа */}
      <Sequence from={2142} durationInFrames={90}>
        <StampRevealScene variant="foreign" />
      </Sequence>

      {/* 74,4–78,4 с: адвокат знаходить підказку */}
      <Sequence from={2232} durationInFrames={120}>
        <LawyerInvestigationScene variant="clue" />
      </Sequence>

      {/* 78,4–87,8 с: дзвінок із військової частини — обрив на інтригі */}
      <Sequence from={2352} durationInFrames={281}>
        <FinalCallScene />
      </Sequence>

      {/* Фінальна заставка; тривалість збільшена, щоб загальна довжина ролика не змінилася */}
      <Sequence from={2633} durationInFrames={217}>
        <EpisodeEndCard />
      </Sequence>

      {/* Озвучка починається з першої сюжетної сцени; обрізано 4 кадри тиші в MP3 */}
      <Sequence from={90}>
        <Audio playbackRate={1} startFrom={4} src={staticFile("audio/ElevenLabs_2026-11-17T13_40_45_Maks Tsukrenko - Confident Podcast_pvc_sp96_s50_sb100_se0_b_m2.mp3")} />
      </Sequence>

      {/* Субтитри починаються разом з озвучкою після заставки */}
      <Sequence from={90}>
        <EpisodeNarration />
      </Sequence>
    </>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />

        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            titleText: "HELPUA24",
            titleColor: "#FFFFFF",
          }}
        />

      </Folder>

      <Folder name="HELPUA24">
        <Composition
          id="HELPUA24-Intro"
          component={HelloWorld}
          durationInFrames={300}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            titleText: "HELPUA24",
            titleColor: "#FFFFFF",
          }}
        />

        <Composition
          id="HELPUA24-Story"
          component={HELPUA24Episode01}
          durationInFrames={2850}
          fps={30}
          width={1080}
          height={1920}
        />

        <Composition
          id="Episode-01-Raport"
          component={HELPUA24Episode01}
          durationInFrames={2850}
          fps={30}
          width={1080}
          height={1920}
        />

        <Composition
          id="Dialogue-Scene"
          component={DialogueScene}
          durationInFrames={360}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="Characters">
        <Composition
          id="Soldier-Standing"
          component={Character}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            emotion: "neutral",
            pose: "standing",
            animationSpeed: 1,
          }}
        />

        <Composition
          id="Soldier-Walking"
          component={Character}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            emotion: "neutral",
            pose: "walking",
            animationSpeed: 1,
          }}
        />

        <Composition
          id="Soldier-Talking"
          component={Character}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            emotion: "determined",
            pose: "talking",
            animationSpeed: 1,
          }}
        />

        <Composition
          id="Soldier-Worried"
          component={Character}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            emotion: "worried",
            pose: "worried",
            animationSpeed: 1,
          }}
        />

        <Composition
          id="Soldier-Tired"
          component={Character}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            emotion: "tired",
            pose: "standing",
            animationSpeed: 0.7,
          }}
        />

        <Composition
          id="Lawyer-Standing"
          component={Lawyer}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            animationSpeed: 1,
          }}
        />
      </Folder>
    </>
  );
};
