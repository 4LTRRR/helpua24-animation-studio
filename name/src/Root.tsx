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

      {/* 3–8,2 с: військовий пише рапорт */}
      <Sequence from={90} durationInFrames={58}>
        <ReportWritingScene />
      </Sequence>

      {/* 8,2–12,7 с: очікування відповіді */}
      <Sequence from={148} durationInFrames={133}>
        <WaitingScene />
      </Sequence>

      {/* 12,7–16,6 с: стан здоров'я погіршується */}
      <Sequence from={281} durationInFrames={117}>
        <MedicalScene />
      </Sequence>

      {/* 16,6–23,0 с: у частині стверджують, що рапорт не надходив */}
      <Sequence from={398} durationInFrames={194}>
        <MissingReportScene />
      </Sequence>

      {/* 23,0–25,3 с: у військового залишається копія з номером */}
      <Sequence from={592} durationInFrames={68}>
        <ReportCopyScene />
      </Sequence>

      {/* 25,3–29,5 с: фото документа потрапляє до адвоката */}
      <Sequence from={660} durationInFrames={125}>
        <SendingReportScene />
      </Sequence>

      {/* 29,5–34,4 с: адвокат звіряє дату, підпис і шлях документа */}
      <Sequence from={785} durationInFrames={147}>
        <LawyerInvestigationScene variant="verification" />
      </Sequence>

      {/* 34,4–40,1 с: адвокат перевіряє журнал */}
      <Sequence from={932} durationInFrames={172}>
        <LawyerInvestigationScene variant="route" />
      </Sequence>

      {/* 40,1–44,2 с: у журналі виявляється інший документ */}
      <Sequence from={1104} durationInFrames={123}>
        <JournalMismatchScene />
      </Sequence>

      {/* 44,2–49,4 с: два різні документи мають один номер */}
      <Sequence from={1227} durationInFrames={156}>
        <JournalMismatchScene />
      </Sequence>

      {/* 49,4–55,2 с: військовий розуміє, що ситуація підозріла */}
      <Sequence from={1383} durationInFrames={175}>
        <MilitaryScene />
      </Sequence>

      {/* 55,2–60,2 с: надходить повідомлення з невідомого номера */}
      <Sequence from={1558} durationInFrames={149}>
        <ThreatScene />
      </Sequence>

      {/* 60,2–64,2 с: пряма погроза */}
      <Sequence from={1707} durationInFrames={121}>
        <ThreatCloseupScene />
      </Sequence>

      {/* 64,2–70,5 с: військовий телефонує адвокату */}
      <Sequence from={1828} durationInFrames={189}>
        <PhoneCallScene />
      </Sequence>

      {/* 70,5–74,2 с: адвокат повторно збільшує фото */}
      <Sequence from={2017} durationInFrames={112}>
        <LawyerInvestigationScene variant="stamp" />
      </Sequence>

      {/* 74,2–77,6 с: крупний план печатки */}
      <Sequence from={2129} durationInFrames={103}>
        <StampRevealScene variant="detail" />
      </Sequence>

      {/* 77,6–80,2 с: стає зрозуміло, що печатка чужа */}
      <Sequence from={2232} durationInFrames={77}>
        <StampRevealScene variant="foreign" />
      </Sequence>

      {/* 80,2–84,4 с: адвокат усвідомлює, що це не проста помилка */}
      <Sequence from={2309} durationInFrames={126}>
        <LawyerInvestigationScene variant="clue" />
      </Sequence>

      {/* 84,4–90 с: дзвінок із військової частини — обрив на інтригі */}
      <Sequence from={2435} durationInFrames={142}>
        <FinalCallScene />
      </Sequence>

      {/* Озвучка починається з 0:00; швидкість відтворення — оригінальна */}
      <Sequence from={0}>
        <Audio playbackRate={1} src={staticFile("audio/ElevenLabs_2026-11-17T13_40_45_Maks Tsukrenko - Confident Podcast_pvc_sp96_s50_sb100_se0_b_m2.mp3")} />
      </Sequence>

      {/* Субтитри синхронізовані з початком озвучки */}
      <EpisodeNarration />
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
          durationInFrames={2580}
          fps={30}
          width={1080}
          height={1920}
        />

        <Composition
          id="Episode-01-Raport"
          component={HELPUA24Episode01}
          durationInFrames={2580}
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
