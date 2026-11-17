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

      {/* 3–10 с: військовий пише рапорт */}
      <Sequence from={90} durationInFrames={154}>
        <ReportWritingScene />
      </Sequence>

      {/* 10–16 с: очікування відповіді */}
      <Sequence from={244} durationInFrames={133}>
        <WaitingScene />
      </Sequence>

      {/* 16–22 с: стан здоров'я погіршується */}
      <Sequence from={377} durationInFrames={132}>
        <MedicalScene />
      </Sequence>

      {/* 22–28 с: у частині стверджують, що рапорт не надходив */}
      <Sequence from={509} durationInFrames={132}>
        <MissingReportScene />
      </Sequence>

      {/* 28–33 с: у військового залишається копія з номером */}
      <Sequence from={641} durationInFrames={111}>
        <ReportCopyScene />
      </Sequence>

      {/* 33–40 с: фото документа потрапляє до адвоката */}
      <Sequence from={752} durationInFrames={154}>
        <SendingReportScene />
      </Sequence>

      {/* 40–47 с: адвокат звіряє дату, підпис і шлях документа */}
      <Sequence from={906} durationInFrames={154}>
        <LawyerInvestigationScene variant="verification" />
      </Sequence>

      {/* 47–54 с: адвокат перевіряє журнал */}
      <Sequence from={1060} durationInFrames={155}>
        <LawyerInvestigationScene variant="route" />
      </Sequence>

      {/* 54–60 с: у журналі виявляється інший документ */}
      <Sequence from={1215} durationInFrames={132}>
        <JournalMismatchScene />
      </Sequence>

      {/* 60–67 с: два різні документи мають один номер */}
      <Sequence from={1347} durationInFrames={154}>
        <JournalMismatchScene />
      </Sequence>

      {/* 67–74 с: військовий розуміє, що ситуація підозріла */}
      <Sequence from={1501} durationInFrames={155}>
        <MilitaryScene />
      </Sequence>

      {/* 74–80 с: надходить повідомлення з невідомого номера */}
      <Sequence from={1656} durationInFrames={132}>
        <ThreatScene />
      </Sequence>

      {/* 80–86 с: пряма погроза */}
      <Sequence from={1788} durationInFrames={132}>
        <ThreatCloseupScene />
      </Sequence>

      {/* 86–92 с: військовий телефонує адвокату */}
      <Sequence from={1920} durationInFrames={133}>
        <PhoneCallScene />
      </Sequence>

      {/* 92–99 с: адвокат повторно збільшує фото */}
      <Sequence from={2053} durationInFrames={154}>
        <LawyerInvestigationScene variant="stamp" />
      </Sequence>

      {/* 99–106 с: крупний план печатки */}
      <Sequence from={2207} durationInFrames={154}>
        <StampRevealScene variant="detail" />
      </Sequence>

      {/* 106–113 с: стає зрозуміло, що печатка чужа */}
      <Sequence from={2361} durationInFrames={155}>
        <StampRevealScene variant="foreign" />
      </Sequence>

      {/* 113–118 с: адвокат усвідомлює, що це не проста помилка */}
      <Sequence from={2516} durationInFrames={110}>
        <LawyerInvestigationScene variant="clue" />
      </Sequence>

      {/* 118–120 с: дзвінок із військової частини — обрив на інтригі */}
      <Sequence from={2626} durationInFrames={44}>
        <FinalCallScene />
      </Sequence>

      {/* Звук і субтитри зміщені на 9 кадрів (0,3 с), швидкість відтворення — оригінальна */}
      <Sequence from={99}>
        <Audio playbackRate={1} src={staticFile("audio/ElevenLabs_2026-11-17T13_40_45_Maks Tsukrenko - Confident Podcast_pvc_sp96_s50_sb100_se0_b_m2.mp3")} />
      </Sequence>

      {/* Субтитри зміщені на ті самі 9 кадрів для синхронізації з озвучкою */}
      <Sequence from={9}>
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
          durationInFrames={2670}
          fps={30}
          width={1080}
          height={1920}
        />

        <Composition
          id="Episode-01-Raport"
          component={HELPUA24Episode01}
          durationInFrames={2670}
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
