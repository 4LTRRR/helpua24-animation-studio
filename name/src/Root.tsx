// Episode 04 visual-test build trigger
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
import { Episode02 } from "./HelloWorld/Episode02";
import { Episode03 } from "./HelloWorld/Episode03";
import { Episode04 } from "./HelloWorld/Episode04";
import { Episode04VisualTest } from "./HelloWorld/Episode04VisualTest";
import { EpisodeTemplate, templateScenes } from "./Series/EpisodeTemplate";
import { totalFrames, FPS, W, H } from "./Series/kit";
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
  PhoneCallScene,
  StampRevealScene,
  FinalCallScene,
} from "./HelloWorld/EpisodeScenes";

// Перша серія: «Рапорт, якого ніхто не бачить»
// Кожен важливий момент історії має окремий візуальний кадр.
const HELPUA24Episode01: React.FC = () => {
  return (
    <>
      {/* 0–5 с: військовий пише рапорт — історія починається одразу */}
      <Sequence durationInFrames={150}>
        <ReportWritingScene />
      </Sequence>

      {/* 8–12,5 с: очікування відповіді */}
      <Sequence from={150} durationInFrames={135}>
        <WaitingScene />
      </Sequence>

      {/* 12,5–18,4 с: стан здоров'я погіршується; рапорт без резолюції */}
      <Sequence from={285} durationInFrames={178}>
        <MedicalScene />
      </Sequence>

      {/* 18,4–22,7 с: у частині стверджують, що рапорт не надходив */}
      <Sequence from={463} durationInFrames={129}>
        <MissingReportScene />
      </Sequence>

      {/* 22,7–27 с: копія рапорту з вхідним номером */}
      <Sequence from={592} durationInFrames={128}>
        <ReportCopyScene />
      </Sequence>

      {/* 27–32 с: військовий надсилає фото адвокату */}
      <Sequence from={720} durationInFrames={150}>
        <SendingReportScene />
      </Sequence>

      {/* 32–38 с: адвокат звіряє дату, підпис і шлях документа */}
      <Sequence from={870} durationInFrames={180}>
        <LawyerInvestigationScene variant="verification" />
      </Sequence>

      {/* 38–42 с: адвокат перевіряє шлях документа; завершуємо кадр до фрази про журнал */}
      <Sequence from={1050} durationInFrames={120}>
        <LawyerInvestigationScene variant="route" />
      </Sequence>

      {/* 42–47 с: зіставлення рапорту та запису в журналі */}
      <Sequence from={1170} durationInFrames={150}>
        <JournalMismatchScene />
      </Sequence>

      {/* 47–56 с: тримаємо військового до завершення фрази диктора */}
      <Sequence from={1320} durationInFrames={270}>
        <MilitaryScene />
      </Sequence>

      {/* 56–62 с: SMS з’являється після завершення попередньої фрази */}
      <Sequence from={1590} durationInFrames={180}>
        <ThreatScene />
      </Sequence>

      {/* 62–65 с: військовий телефонує адвокату */}
      <Sequence from={1770} durationInFrames={90}>
        <PhoneCallScene />
      </Sequence>

      {/* 65–71 с: адвокат повторно збільшує фото */}
      <Sequence from={1860} durationInFrames={180}>
        <LawyerInvestigationScene variant="stamp" />
      </Sequence>

      {/* 71–74 с: крупний план печатки */}
      <Sequence from={2040} durationInFrames={90}>
        <StampRevealScene variant="detail" />
      </Sequence>

      {/* 74–77 с: стає зрозуміло, що печатка чужа */}
      <Sequence from={2130} durationInFrames={90}>
        <StampRevealScene variant="foreign" />
      </Sequence>

      {/* 77–81 с: адвокат знаходить підказку */}
      <Sequence from={2220} durationInFrames={120}>
        <LawyerInvestigationScene variant="clue" />
      </Sequence>

      {/* 81–90,37 с: дзвінок із військової частини — обрив на інтригі */}
      <Sequence from={2340} durationInFrames={281}>
        <FinalCallScene />
      </Sequence>

      {/* Фінальна заставка; загальна довжина ролика збережена */}
      <Sequence from={2621} durationInFrames={139}>
        <EpisodeEndCard />
      </Sequence>

      {/* Озвучка починається з першого кадру; обрізано 4 кадри тиші в MP3 */}
      <Sequence>
        <Audio playbackRate={1} startFrom={4} src={staticFile("audio/ElevenLabs_2026-11-17T13_40_45_Maks Tsukrenko - Confident Podcast_pvc_sp96_s50_sb100_se0_b_m2.mp3")} />
      </Sequence>

      {/* Субтитри починаються разом з озвучкою з першого кадру */}
      <Sequence>
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
          durationInFrames={2760}
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
          id="Episode-02-Who-Registered"
          component={Episode02}
          durationInFrames={2100}
          fps={30}
          width={1080}
          height={1920}
        />

        <Composition
          id="Episode-03-Final"
          component={Episode03}
          durationInFrames={2160}
          fps={30}
          width={1080}
          height={1920}
        />

        <Composition
          id="Episode-04-Visual-Test"
          component={Episode04VisualTest}
          durationInFrames={3600}
          fps={30}
          width={1080}
          height={1920}
        />

        <Composition
          id="Episode-04-He-Could-Not-Be-There"
          component={Episode04}
          durationInFrames={2100}
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

      <Folder name="Series">
        <Composition
          id="Series-Template"
          component={EpisodeTemplate}
          durationInFrames={totalFrames(templateScenes)}
          fps={FPS}
          width={W}
          height={H}
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
