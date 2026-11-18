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

      {/* 22,7–29,2 с: у військового залишається копія з вхідним номером */}
      <Sequence from={682} durationInFrames={193}>
        <ReportCopyScene />
      </Sequence>

      {/* 29,2–37,3 с: фото документа потрапляє до адвоката */}
      <Sequence from={870} durationInFrames={229}>
        <SendingReportScene />
      </Sequence>

      {/* 37,3–43,9 с: адвокат звіряє дату, підпис і шлях документа */}
      <Sequence from={1099} durationInFrames={188}>
        <LawyerInvestigationScene variant="verification" />
      </Sequence>

      {/* 43,9–49,2 с: адвокат перевіряє журнал */}
      <Sequence from={1287} durationInFrames={148}>
        <LawyerInvestigationScene variant="route" />
      </Sequence>

      {/* 49,2–55 с: у журналі виявляється інший документ */}
      <Sequence from={1435} durationInFrames={165}>
        <JournalMismatchScene />
      </Sequence>

      {/* 55–58,7 с: два різні документи мають один номер */}
      <Sequence from={1600} durationInFrames={104}>
        <JournalMismatchScene />
      </Sequence>

      {/* 58,7–64 с: військовий розуміє, що ситуація підозріла */}
      <Sequence from={1704} durationInFrames={151}>
        <MilitaryScene />
      </Sequence>

      {/* 64–70,4 с: надходить повідомлення з невідомого номера */}
      <Sequence from={1855} durationInFrames={180}>
        <ThreatScene />
      </Sequence>

      {/* 70,3–72,3 с: пряма погроза */}
      <Sequence from={2035} durationInFrames={55}>
        <ThreatCloseupScene />
      </Sequence>

      {/* 72,3–75,5 с: військовий телефонує адвокату */}
      <Sequence from={2090} durationInFrames={93}>
        <PhoneCallScene />
      </Sequence>

      {/* 75,5–80,1 с: адвокат повторно збільшує фото */}
      <Sequence from={2183} durationInFrames={129}>
        <LawyerInvestigationScene variant="stamp" />
      </Sequence>

      {/* 80,1–82,2 с: крупний план печатки */}
      <Sequence from={2312} durationInFrames={59}>
        <StampRevealScene variant="detail" />
      </Sequence>

      {/* 82,2–84,3 с: стає зрозуміло, що печатка чужа */}
      <Sequence from={2371} durationInFrames={59}>
        <StampRevealScene variant="foreign" />
      </Sequence>

      {/* 84,3–86,3 с: адвокат усвідомлює, що це не проста помилка */}
      <Sequence from={2430} durationInFrames={57}>
        <LawyerInvestigationScene variant="clue" />
      </Sequence>

      {/* 86,3–88,4 с: дзвінок із військової частини — обрив на інтригі */}
      <Sequence from={2487} durationInFrames={164}>
        <FinalCallScene />
      </Sequence>

      {/* Фінальна заставка після сюжетного обриву */}
      <Sequence from={2651} durationInFrames={199}>
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
