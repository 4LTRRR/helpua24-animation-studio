import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Character } from "./Character";
import { Lawyer } from "./Lawyer";
import { LawyerOffice } from "./LawyerOffice";

const BarracksBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const lamp = interpolate(Math.sin(frame / 38), [-1, 1], [0.12, 0.23]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#151d21" }}>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="barracksWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#344047" />
            <stop offset="100%" stopColor="#171f23" />
          </linearGradient>
          <linearGradient id="barracksFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a443b" />
            <stop offset="100%" stopColor="#171a1b" />
          </linearGradient>
          <radialGradient id="barracksLamp">
            <stop offset="0%" stopColor="#e6b77c" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#e6b77c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#barracksWall)" />
        <rect y="1450" width="1080" height="470" fill="url(#barracksFloor)" />
        <path d="M0 1450 H1080" stroke="#11191d" strokeWidth="18" />
        <rect x="70" y="180" width="330" height="510" fill="#10191e" stroke="#59636a" strokeWidth="18" />
        <rect x="92" y="202" width="286" height="466" fill="#52616a" />
        <path d="M235 202 V668 M92 430 H378" stroke="#1d2a30" strokeWidth="14" />
        <path d="M92 560 L180 475 L245 530 L315 440 L378 500 V668 H92Z" fill="#34444b" />
        <rect x="0" y="760" width="1080" height="24" fill="#0e1519" opacity="0.65" />
        <path d="M0 790 H1080 M0 1120 H1080" stroke="#6d7778" strokeOpacity="0.16" strokeWidth="4" />
        <g fill="#273238">
          <rect x="650" y="250" width="300" height="410" rx="8" />
          <rect x="670" y="275" width="260" height="100" fill="#3b4b51" />
          <rect x="670" y="395" width="260" height="100" fill="#3b4b51" />
          <rect x="670" y="515" width="260" height="120" fill="#3b4b51" />
        </g>
        <g fill="#a98b65" opacity="0.55">
          <rect x="700" y="300" width="180" height="5" />
          <rect x="700" y="420" width="155" height="5" />
          <rect x="700" y="545" width="190" height="5" />
        </g>
        <path d="M0 1510 L1080 1510" stroke="#8c785f" strokeOpacity="0.18" strokeWidth="5" />
        <ellipse cx="820" cy="760" rx="390" ry="420" fill="url(#barracksLamp)" opacity={lamp} />
        <path d="M870 0 V180 M855 180 H885" stroke="#11191d" strokeWidth="18" />
        <path d="M830 180 H910 L890 245 H850Z" fill="#b18c5d" />
        <ellipse cx="870" cy="270" rx="170" ry="210" fill="url(#barracksLamp)" opacity={lamp} />
        <rect width="1080" height="1920" fill="#080d11" opacity="0.24" />
      </svg>
    </AbsoluteFill>
  );
};

const HospitalBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame / 12), [-1, 1], [0.55, 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#17252b" }}>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="hospitalWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#71858a" />
            <stop offset="100%" stopColor="#263a40" />
          </linearGradient>
          <linearGradient id="hospitalFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#667579" />
            <stop offset="100%" stopColor="#1a272c" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#hospitalWall)" />
        <rect y="1450" width="1080" height="470" fill="url(#hospitalFloor)" />
        <rect x="70" y="190" width="420" height="470" fill="#b9c6c4" stroke="#263a40" strokeWidth="20" />
        <rect x="92" y="212" width="376" height="426" fill="#8ca4a8" />
        <path d="M280 212 V638 M92 420 H468" stroke="#435b61" strokeWidth="14" />
        <path d="M92 560 L175 470 L255 520 L345 420 L468 505 V638 H92Z" fill="#526d73" />
        <rect x="620" y="220" width="390" height="600" fill="#d0d8d4" opacity="0.12" />
        <g stroke="#d6e0dc" strokeOpacity="0.24" strokeWidth="5">
          <path d="M0 820 H1080 M0 1120 H1080 M0 1420 H1080" />
          <path d="M540 0 V1450" />
        </g>
        <rect x="780" y="300" width="190" height="130" rx="12" fill="#18262b" stroke="#b7c7c6" strokeWidth="8" />
        <path d="M800 370 L830 370 L850 330 L875 395 L900 350 L925 370 L950 370" fill="none" stroke="#73c7b4" strokeWidth="7" opacity={pulse} />
        <g fill="none" stroke="#d4dedb" strokeWidth="12">
          <path d="M160 900 V1350 M140 900 H180 M140 1350 H180" />
          <path d="M160 920 Q250 900 340 920" />
        </g>
        <g>
          <rect x="120" y="1230" width="700" height="130" rx="18" fill="#d9dfdc" />
          <rect x="145" y="1190" width="180" height="90" rx="18" fill="#edf0eb" />
          <rect x="120" y="1350" width="700" height="34" fill="#52636a" />
          <path d="M180 1384 V1500 M760 1384 V1500" stroke="#28383e" strokeWidth="22" />
          <rect x="100" y="1490" width="760" height="22" fill="#28383e" />
        </g>
        <rect width="1080" height="1920" fill="#071116" opacity="0.18" />
      </svg>
    </AbsoluteFill>
  );
};

const AdminBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const flicker = interpolate(Math.sin(frame / 5), [-1, 1], [0.04, 0.09]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#171c20" }}>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="adminWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#41484b" />
            <stop offset="100%" stopColor="#202629" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#adminWall)" />
        <rect y="1480" width="1080" height="440" fill="#252321" />
        <rect x="55" y="230" width="330" height="1080" fill="#252a2d" stroke="#111719" strokeWidth="16" />
        {Array.from({ length: 5 }, (_, i) => (
          <g key={i}>
            <rect x="78" y={260 + i * 205} width="285" height="180" fill="#343b3d" stroke="#151b1d" strokeWidth="8" />
            {Array.from({ length: 4 }, (_, j) => (
              <rect key={j} x={95 + j * 64} y={285 + i * 205} width="48" height="135" fill={["#655044", "#52604f", "#6a5b43", "#45565d"][j]} />
            ))}
          </g>
        ))}
        <rect x="650" y="260" width="360" height="550" fill="#202629" stroke="#111719" strokeWidth="16" />
        <rect x="675" y="285" width="310" height="500" fill="#303a3e" />
        <path d="M675 450 H985 M675 620 H985" stroke="#151d20" strokeWidth="16" />
        <rect x="180" y="1110" width="830" height="100" fill="#614a38" />
        <path d="M220 1210 V1580 M950 1210 V1580" stroke="#30241e" strokeWidth="35" />
        <rect x="0" y="1580" width="1080" height="22" fill="#80644b" opacity="0.35" />
        <rect x="430" y="110" width="220" height="24" fill="#e1d4b6" opacity={flicker} />
        <path d="M540 0 V110 M470 110 H610" stroke="#141a1c" strokeWidth="14" />
        <rect width="1080" height="1920" fill="#080b0d" opacity="0.2" />
      </svg>
    </AbsoluteFill>
  );
};

const SoldierLayer: React.FC<{ emotion?: "neutral" | "worried" | "tired" | "determined"; pose?: "standing" | "walking" | "talking" | "worried"; entranceFrameOffset?: number }> = ({
  emotion = "neutral",
  pose = "standing",
  entranceFrameOffset = 0,
}) => (
  <AbsoluteFill>
    <Character emotion={emotion} pose={pose} animationSpeed={0.9} entranceFrameOffset={entranceFrameOffset} />
  </AbsoluteFill>
);

const LawyerLayer: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", right: "-15%", bottom: "-18%", width: "110%", height: "150%", zIndex: 2 }}>
      <Lawyer animationSpeed={0.8} />
    </div>
  </AbsoluteFill>
);

const PaperOnDesk: React.FC<{ stamp?: boolean }> = ({ stamp = false }) => {
  const frame = useCurrentFrame();
  const tilt = interpolate(frame, [0, 180], [-2, 1]);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice">
        <g transform={`translate(0 0) rotate(${tilt} 550 1450)`}>
          <path d="M300 1190 L790 1160 L850 1690 L355 1720 Z" fill="#d8d2c4" stroke="#8e897d" strokeWidth="8" />
          <path d="M335 1235 L745 1210 L790 1650 L380 1675 Z" fill="#f0eee5" />
          <text x="560" y="1285" fill="#353b3c" fontSize="29" textAnchor="middle" fontWeight="700">РАПОРТ</text>
          <text x="390" y="1340" fill="#51575a" fontSize="17">Прошу направити мене на стаціонарне</text>
          <text x="390" y="1372" fill="#51575a" fontSize="17">обстеження та лікування за висновком лікаря.</text>
          <path d="M390 1415 H745 M390 1450 H745 M390 1485 H710 M390 1520 H735" stroke="#9ba0a0" strokeWidth="4" />
          <text x="390" y="1585" fill="#51575a" fontSize="17">Дата: 14.11.2026</text>
          <path d="M580 1580 Q630 1535 680 1580 Q715 1600 745 1565" fill="none" stroke="#354e73" strokeWidth="5" />
          {stamp && (
            <g transform="rotate(-13 700 1480)">
              <circle cx="700" cy="1480" r="58" fill="none" stroke="#9a3c3d" strokeWidth="8" />
              <circle cx="700" cy="1480" r="45" fill="none" stroke="#9a3c3d" strokeWidth="3" />
              <text x="700" y="1474" fill="#9a3c3d" fontSize="15" textAnchor="middle" fontWeight="700">ВХІДНИЙ</text>
              <text x="700" y="1497" fill="#9a3c3d" fontSize="18" textAnchor="middle" fontWeight="700">№ 0418</text>
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export const ReportWritingScene: React.FC = () => (
  <AbsoluteFill>
    <BarracksBackground />
    <SoldierLayer emotion="worried" pose="talking" />
    <PaperOnDesk />
    <div style={{ position: "absolute", left: "8%", top: "12%", color: "#d6c3a4", fontSize: 22, letterSpacing: 4, fontWeight: 700 }}>03:17 · КІМНАТА ЧАСТИНИ</div>
  </AbsoluteFill>
);

export const WaitingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const blink = interpolate(Math.sin(frame / 18), [-1, 1], [0.25, 1]);
  return (
    <AbsoluteFill>
      <BarracksBackground />
      <SoldierLayer emotion="tired" pose="worried" />
      <div style={{ position: "absolute", top: "16%", right: "8%", width: 250, padding: 24, borderRadius: 18, background: "rgba(13,20,25,0.92)", border: "1px solid rgba(220,225,220,0.25)", color: "white", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
        <div style={{ color: "#c9a575", fontSize: 18, letterSpacing: 3 }}>ОЧІКУВАННЯ</div>
        <div style={{ fontSize: 54, fontWeight: 700, margin: "14px 0" }}>72:00</div>
        <div style={{ fontSize: 18, color: "#aeb9bd" }}>ВІДПОВІДІ НЕМАЄ</div>
        <div style={{ height: 5, marginTop: 20, background: "#39454a", borderRadius: 5 }}>
          <div style={{ width: "76%", height: 5, background: "#b78b55", opacity: blink, borderRadius: 5 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const MedicalScene: React.FC = () => (
  <AbsoluteFill>
    <HospitalBackground />
    <SoldierLayer emotion="tired" pose="worried" />
    <div style={{ position: "absolute", top: "18%", left: "7%", padding: "18px 22px", background: "rgba(17,34,40,0.84)", borderLeft: "5px solid #76a9a2", color: "#edf3f1", fontFamily: "Arial, sans-serif" }}>
      <div style={{ fontSize: 18, letterSpacing: 3, color: "#a9c9c5" }}>МЕДИЧНИЙ ВИСНОВОК</div>
      <div style={{ fontSize: 25, fontWeight: 700, marginTop: 8 }}>СТАЦІОНАРНЕ ОБСТЕЖЕННЯ</div>
    </div>
  </AbsoluteFill>
);

export const MissingReportScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 180], [1, 1.08]);
  const missingRecordOpacity = interpolate(frame, [72, 82], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AdminBackground />
      <div style={{ position: "absolute", left: "9%", right: "9%", top: "29%", padding: 34, background: "#d7d0c0", color: "#343a3b", boxShadow: "0 25px 70px rgba(0,0,0,0.45)", transform: `scale(${zoom}) rotate(-1deg)`, transformOrigin: "center" }}>
        <div style={{ fontSize: 20, letterSpacing: 3, fontWeight: 700, textAlign: "center" }}>ЖУРНАЛ ВХІДНОЇ КОРЕСПОНДЕНЦІЇ</div>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #7e817c", padding: "20px 0 12px", fontSize: 17, fontWeight: 700 }}>
          <span>№</span><span>ДАТА</span><span>ЗМІСТ</span><span>ВІД КОГО</span>
        </div>
        {["0416 · 12.11 · Заява · штаб", "0417 · 13.11 · Наказ · відділ", "0419 · 14.11 · Запит · медслужба"].map((line, index) => {
          const rowOpacity = interpolate(frame, [8 + index * 18, 18 + index * 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return <div key={line} style={{ padding: "17px 0", borderBottom: "1px solid #a4a49b", fontSize: 18, opacity: rowOpacity }}>{line}</div>;
        })}
        <div style={{ marginTop: 18, color: "#913b3c", fontSize: 23, fontWeight: 800, textAlign: "center", letterSpacing: 2, opacity: missingRecordOpacity, transform: `translateY(${interpolate(missingRecordOpacity, [0, 1], [8, 0])}px)` }}>ЗАПИСУ № 0418 НЕМАЄ</div>
      </div>
    </AbsoluteFill>
  );
};

export const ReportCopyScene: React.FC = () => (
  <AbsoluteFill>
    <BarracksBackground />
    <SoldierLayer emotion="worried" pose="worried" />
    <PaperOnDesk stamp />
    <div style={{ position: "absolute", top: "13%", left: "8%", padding: "18px 24px", background: "rgba(12,18,23,0.9)", borderLeft: "5px solid #b78b55", color: "#fff", fontSize: 20, fontWeight: 700, letterSpacing: 2 }}>
      КОПІЯ З ВХІДНИМ НОМЕРОМ
    </div>
  </AbsoluteFill>
);

export const SendingReportScene: React.FC = () => (
  <AbsoluteFill>
    <BarracksBackground />
    <SoldierLayer emotion="worried" pose="worried" />
    <div style={{ position: "absolute", top: "16%", right: "7%", width: 300, padding: 22, borderRadius: 24, background: "rgba(15,23,29,0.96)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <div style={{ fontSize: 17, color: "#c9a575", letterSpacing: 2, marginBottom: 14 }}>ПОВІДОМЛЕННЯ АДВОКАТУ</div>
      <div style={{ background: "#e8e5dc", borderRadius: 10, padding: 12, color: "#353b3d", textAlign: "center" }}>
        <div style={{ fontSize: 19, fontWeight: 700 }}>ФОТО РАПОРТУ</div>
        <div style={{ margin: "12px auto 0", width: 110, height: 140, background: "#f8f6ed", border: "1px solid #aaa", paddingTop: 16, color: "#52585a", fontSize: 13 }}>РАПОРТ<br /><br />Дата: 14.11<br /><br />Підпис</div>
      </div>
      <div style={{ marginTop: 14, textAlign: "right", color: "#9dc7b5", fontSize: 17 }}>Надіслано ✓✓</div>
    </div>
  </AbsoluteFill>
);

type LawyerInvestigationVariant = "photo" | "verification" | "route" | "stamp" | "clue";

export const LawyerInvestigationScene: React.FC<{ variant?: LawyerInvestigationVariant }> = ({
  variant = "photo",
}) => {
  const frame = useCurrentFrame();
  const focus = variant === "verification" ? 1 : interpolate(frame, [0, 30, 180], [0.65, 1, 1]);
  const contentByVariant = {
    photo: {
      title: "ОТРИМАНО ФОТО РАПОРТУ",
      detail: "Адвокат перевіряє документ, не втрачаючи жодної деталі.",
      mark: "ВХ. № 0418",
      note: "КОПІЯ ДОКУМЕНТА",
    },
    verification: {
      title: "ДАТА. ПІДПИС. ВХІДНИЙ НОМЕР.",
      detail: "Усі реквізити на копії є. Але хто і куди передав оригінал?",
      mark: "14.11.2026",
      note: "ПІДПИС Є",
    },
    route: {
      title: "ПЕРЕВІРКА ШЛЯХУ ДОКУМЕНТА",
      detail: "У журналі за цим номером адвокат знаходить зовсім інше звернення.",
      mark: "ЖУРНАЛ · № 0418",
      note: "НЕВІДПОВІДНІСТЬ",
    },
    stamp: {
      title: "АДВОКАТ ЗБІЛЬШУЄ ПЕЧАТКУ",
      detail: "Відбиток виглядає справжнім, але його реквізити не збігаються.",
      mark: "ПЕЧАТКА",
      note: "ПЕРЕВІРИТИ ПІДРОЗДІЛ",
    },
    clue: {
      title: "ЦЕ НЕ СХОЖЕ НА ПОМИЛКУ",
      detail: "Хтось залишив у документах слід. І тепер адвокат знає, де шукати.",
      mark: "ЧУЖИЙ ВІДБИТОК",
      note: "ВАЖЛИВА ПІДКАЗКА",
    },
  }[variant];

  return (
    <AbsoluteFill>
      <LawyerOffice />
      <LawyerLayer />
      <div style={{ position: "absolute", left: "5%", top: "16%", width: "43%", padding: 22, background: "rgba(12,18,23,0.95)", border: "1px solid rgba(201,165,117,0.6)", boxShadow: "0 18px 50px rgba(0,0,0,0.4)", transform: `scale(${focus})`, transformOrigin: "left center" }}>
        <div style={{ color: "#c9a575", fontSize: 17, letterSpacing: 2, fontWeight: 700 }}>{contentByVariant.title}</div>
        <div style={{ marginTop: 14, padding: 18, background: "#e9e5da", color: "#343b3d", minHeight: 230, position: "relative" }}>
          <div style={{ textAlign: "center", fontSize: 22, fontWeight: 800 }}>РАПОРТ</div>
          <div style={{ marginTop: 24, height: 4, background: "#9da09b" }} />
          <div style={{ marginTop: 14, height: 4, width: "85%", background: "#b0b2aa" }} />
          <div style={{ marginTop: 14, height: 4, width: "92%", background: "#b0b2aa" }} />
          <div style={{ marginTop: 30, color: "#8e393a", fontSize: 20, fontWeight: 800 }}>{contentByVariant.mark}</div>
          {variant === "stamp" || variant === "clue" ? (
            <div style={{ position: "absolute", right: 14, bottom: 12, width: 92, height: 92, border: "4px solid #963b3e", borderRadius: "50%", color: "#963b3e", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontSize: 11, fontWeight: 800, transform: "rotate(-12deg)" }}>ІНШИЙ<br />ПІДРОЗДІЛ</div>
          ) : null}
        </div>
        <div style={{ marginTop: 14, color: "#e4e8e8", fontSize: 17 }}>{contentByVariant.detail}</div>
        <div style={{ marginTop: 12, color: "#d1b486", fontSize: 14, letterSpacing: 2, fontWeight: 700 }}>{contentByVariant.note}</div>
      </div>
    </AbsoluteFill>
  );
};

export const JournalMismatchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame / 9), [-1, 1], [0.25, 0.85]);
  return (
    <AbsoluteFill style={{ background: "linear-gradient(145deg, #252d31, #0e151a)" }}>
      <div style={{ position: "absolute", top: "12%", left: "8%", right: "8%", color: "#d6c3a4", fontSize: 19, letterSpacing: 4, fontWeight: 700 }}>ДОКУМЕНТИ НЕ ЗБІГАЮТЬСЯ</div>
      <div style={{ position: "absolute", top: "23%", left: "7%", width: "40%", height: "48%", background: "#e6e1d5", color: "#343a3b", padding: 24, transform: "rotate(-3deg)", boxShadow: "0 20px 55px rgba(0,0,0,0.5)" }}>
        <div style={{ textAlign: "center", fontSize: 22, fontWeight: 800 }}>РАПОРТ</div>
        <div style={{ marginTop: 35, height: 5, background: "#9da09b" }} />
        <div style={{ marginTop: 18, height: 5, width: "80%", background: "#aeb0aa" }} />
        <div style={{ marginTop: 18, height: 5, width: "90%", background: "#aeb0aa" }} />
        <div style={{ marginTop: 45, color: "#913b3c", fontSize: 26, fontWeight: 800 }}>№ 0418</div>
        <div style={{ marginTop: 12, fontSize: 16 }}>Звернення щодо лікування</div>
      </div>
      <div style={{ position: "absolute", top: "23%", right: "7%", width: "40%", height: "48%", background: "#d8d1c2", color: "#343a3b", padding: 24, transform: "rotate(3deg)", boxShadow: "0 20px 55px rgba(0,0,0,0.5)" }}>
        <div style={{ textAlign: "center", fontSize: 22, fontWeight: 800 }}>ЖУРНАЛ</div>
        <div style={{ marginTop: 35, height: 5, background: "#9da09b" }} />
        <div style={{ marginTop: 18, height: 5, width: "80%", background: "#aeb0aa" }} />
        <div style={{ marginTop: 18, height: 5, width: "90%", background: "#aeb0aa" }} />
        <div style={{ marginTop: 45, color: "#913b3c", fontSize: 26, fontWeight: 800 }}>№ 0418</div>
        <div style={{ marginTop: 12, fontSize: 16 }}>Інше звернення</div>
      </div>
      <div style={{ position: "absolute", left: "28%", right: "28%", top: "70%", padding: 18, textAlign: "center", color: "#fff", background: "rgba(137,47,50,0.9)", border: `3px solid rgba(255,210,190,${pulse})`, fontSize: 23, fontWeight: 800, letterSpacing: 2 }}>ОДИН НОМЕР. ДВА РІЗНІ ДОКУМЕНТИ.</div>
    </AbsoluteFill>
  );
};

export const SuspicionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const shadow = interpolate(Math.sin(frame / 28), [-1, 1], [0.1, 0.28]);
  return (
    <AbsoluteFill>
      <BarracksBackground />
      <SoldierLayer emotion="worried" pose="worried" />
      <div style={{ position: "absolute", right: "8%", top: "20%", width: 250, padding: 22, background: "rgba(12,18,23,0.92)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 18, boxShadow: `0 18px 55px rgba(0,0,0,${shadow})`, color: "#fff", textAlign: "center" }}>
        <div style={{ color: "#c9a575", fontSize: 17, letterSpacing: 3 }}>ТЕЛЕФОН</div>
        <div style={{ margin: "20px auto", width: 74, height: 120, borderRadius: 12, border: "5px solid #78858a", background: "#18242a", display: "flex", alignItems: "center", justifyContent: "center", color: "#b7c2c5", fontSize: 24 }}>…</div>
        <div style={{ fontSize: 17, color: "#b7c2c5" }}>ВІН ВІДЧУВАЄ, ЩО ЩОСЬ НЕ ТАК</div>
      </div>
    </AbsoluteFill>
  );
};

export const ThreatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [0, 12, 24], [0, 1, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <BarracksBackground />
      <SoldierLayer emotion="worried" pose="worried" entranceFrameOffset={24} />
      <div style={{ position: "absolute", top: "20%", left: "8%", right: "8%", padding: 30, background: "rgba(14,19,25,0.97)", border: "1px solid rgba(255,255,255,0.2)", borderLeft: "7px solid #9a3c3d", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.55)", opacity: appear, transform: `translateY(${interpolate(appear, [0, 1], [-25, 0])}px)` }}>
        <div style={{ color: "#d6b98f", fontSize: 18, letterSpacing: 3, marginBottom: 18 }}>НЕВІДОМИЙ НОМЕР</div>
        <div style={{ color: "#fff", fontSize: 34, lineHeight: 1.25, fontWeight: 700 }}>«Забери рапорт. Інакше матимеш проблеми».</div>
        <div style={{ marginTop: 20, color: "#aab4b9", fontSize: 17 }}>ЩОЙНО · SMS</div>
      </div>
    </AbsoluteFill>
  );
};

export const ThreatCloseupScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 180], [0.92, 1.12]);
  return (
    <AbsoluteFill style={{ background: "linear-gradient(145deg, #252d32, #090f14)" }}>
      <div style={{ position: "absolute", inset: "18% 8%", padding: 34, borderRadius: 28, background: "#141d24", border: "2px solid rgba(255,255,255,0.18)", boxShadow: "0 30px 90px rgba(0,0,0,0.65)", color: "#fff", transform: `scale(${zoom})` }}>
        <div style={{ color: "#d1b486", fontSize: 18, letterSpacing: 3 }}>ПОВІДОМЛЕННЯ · НЕВІДОМИЙ НОМЕР</div>
        <div style={{ marginTop: 38, padding: 28, background: "#27343d", borderRadius: 22, fontSize: 38, lineHeight: 1.3, fontWeight: 700 }}>«Забери рапорт. Інакше матимеш проблеми».</div>
        <div style={{ marginTop: 28, color: "#aab4b9", fontSize: 18 }}>ЩОЙНО · ПОВІДОМЛЕННЯ ОТРИМАНО</div>
        <div style={{ position: "absolute", right: 34, bottom: 28, color: "#a64a4c", fontSize: 16, fontWeight: 800, letterSpacing: 2 }}>НЕ ВІДПОВІДАТИ</div>
      </div>
    </AbsoluteFill>
  );
};

export const PhoneCallScene: React.FC = () => (
  <AbsoluteFill>
    <BarracksBackground />
    <SoldierLayer emotion="worried" pose="talking" />
    <div style={{ position: "absolute", top: "17%", right: "8%", padding: 22, background: "rgba(12,18,23,0.94)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.2)", color: "#fff", textAlign: "center", width: 260 }}>
      <div style={{ color: "#c9a575", fontSize: 17, letterSpacing: 3 }}>ТРИВАЄ ДЗВІНОК</div>
      <div style={{ margin: "22px auto", width: 76, height: 76, borderRadius: "50%", background: "#304b43", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>☎</div>
      <div style={{ fontSize: 23, fontWeight: 700 }}>АДВОКАТ</div>
      <div style={{ marginTop: 10, color: "#aeb9bd", fontSize: 17 }}>00:18</div>
    </div>
  </AbsoluteFill>
);

type StampRevealVariant = "detail" | "foreign";

export const StampRevealScene: React.FC<{ variant?: StampRevealVariant }> = ({
  variant = "detail",
}) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 180], [0.88, 1.12]);
  const ring = interpolate(Math.sin(frame / 8), [-1, 1], [0.35, 0.9]);
  const stampText = variant === "detail" ? "ВІДБИТОК" : "ЧУЖИЙ ПІДРОЗДІЛ";
  const heading = variant === "detail"
    ? "КРУПНИЙ ПЛАН ПЕЧАТКИ"
    : "ПЕЧАТКА НАЛЕЖИТЬ ІНШОМУ ПІДРОЗДІЛУ";
  const foreignUnitOpacity = interpolate(frame, [54, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(145deg, #30383b, #10171b)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "12% 8%", background: "#e9e5d9", padding: 44, boxShadow: "0 30px 90px rgba(0,0,0,0.55)", transform: `scale(${zoom}) rotate(-2deg)` }}>
        <div style={{ color: "#30383b", fontSize: 26, textAlign: "center", fontWeight: 800, letterSpacing: 3 }}>{heading}</div>
        <div style={{ marginTop: 60, height: 6, background: "#a8aaa4" }} />
        <div style={{ marginTop: 25, height: 6, width: "86%", background: "#b7b9b1" }} />
        <div style={{ marginTop: 25, height: 6, width: "92%", background: "#b7b9b1" }} />
        <div style={{ marginTop: 25, height: 6, width: "72%", background: "#b7b9b1" }} />
        <div style={{ position: "absolute", right: "12%", bottom: "17%", width: 220, height: 220, border: `9px solid rgba(148,52,55,${ring})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#963b3e", fontSize: 18, fontWeight: 800, textAlign: "center", transform: "rotate(-14deg)" }}>
          {stampText}
        </div>
        <div style={{ position: "absolute", left: "12%", bottom: "15%", color: "#963b3e", fontSize: 22, fontWeight: 800 }}>ВХ. № 0418</div>
        {variant === "detail" && (
          <div style={{ position: "absolute", right: "8%", bottom: "5%", padding: "12px 18px", background: "rgba(150,59,62,0.96)", color: "#fff", fontSize: 20, fontWeight: 900, letterSpacing: 2, opacity: foreignUnitOpacity, transform: `translateY(${interpolate(foreignUnitOpacity, [0, 1], [14, 0])}px)`, boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}>ЧУЖИЙ ПІДРОЗДІЛ</div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export const FinalCallScene: React.FC = () => (
  <AbsoluteFill>
    <LawyerOffice />
    <LawyerLayer />
    <div style={{ position: "absolute", top: "18%", left: "10%", right: "10%", padding: 30, background: "rgba(12,17,23,0.96)", border: "1px solid rgba(255,255,255,0.2)", borderTop: "6px solid #9a3c3d", borderRadius: 18, color: "#fff", textAlign: "center", boxShadow: "0 24px 70px rgba(0,0,0,0.5)" }}>
      <div style={{ color: "#d1b486", fontSize: 18, letterSpacing: 4 }}>ВХІДНИЙ ДЗВІНОК</div>
      <div style={{ margin: "24px auto", width: 88, height: 88, borderRadius: "50%", background: "#8f3034", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42 }}>!</div>
      <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 1 }}>ВІЙСЬКОВА ЧАСТИНА</div>
      <div style={{ marginTop: 12, color: "#c9a575", fontSize: 18, letterSpacing: 2 }}>ХТО НА ІНШОМУ КІНЦІ?</div>
    </div>
  </AbsoluteFill>
);
