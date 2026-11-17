
import React from "react";
import { AbsoluteFill } from "remotion";

import { LawyerOffice } from "./LawyerOffice";
import { Lawyer } from "./Lawyer";

const OfficeDeskForeground: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 5 }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="foregroundDeskWood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#684a37" />
            <stop offset="100%" stopColor="#30231e" />
          </linearGradient>
        </defs>

        {/* Стільниця */}
        <path
          d="M260 820 H1370 L1320 895 H310 Z"
          fill="url(#foregroundDeskWood)"
          stroke="#211915"
          strokeWidth="8"
        />

        {/* Документи — тільки на поверхні столу */}
        <g transform="rotate(-4 650 858)">
          <rect
            x="500"
            y="840"
            width="300"
            height="42"
            fill="#d0c7b4"
            stroke="#a79d8b"
            strokeWidth="2"
          />
          <path
            d="M515 850 H785 M515 860 H735 M515 870 H760"
            stroke="#777168"
            strokeWidth="3"
            opacity="0.55"
          />
        </g>

        <g transform="rotate(3 950 860)">
          <rect
            x="840"
            y="842"
            width="220"
            height="38"
            fill="#b8ae9a"
            stroke="#918775"
            strokeWidth="2"
          />
          <path
            d="M855 852 H1045 M855 862 H1010 M855 872 H1030"
            stroke="#625e56"
            strokeWidth="3"
            opacity="0.5"
          />
        </g>

        {/* Папка */}
        <path
          d="M1080 842 L1250 835 L1280 880 L1110 885 Z"
          fill="#3d4140"
          stroke="#171c1c"
          strokeWidth="5"
        />
        <path
          d="M1100 850 L1235 844"
          stroke="#9b8059"
          strokeWidth="3"
        />

        {/* Кавова чашка */}
        <ellipse cx="430" cy="870" rx="36" ry="10" fill="#171615" />
        <path
          d="M395 840 Q430 828 465 840 L458 868 Q430 881 402 868 Z"
          fill="#b9b4a9"
        />
        <ellipse cx="430" cy="840" rx="35" ry="9" fill="#d8d0c0" />
        <ellipse cx="430" cy="841" rx="25" ry="5" fill="#30251e" />
        <path
          d="M464 847 Q500 842 485 865 Q477 875 460 867"
          fill="none"
          stroke="#b9b4a9"
          strokeWidth="9"
        />

        {/* Передня частина столу — перекриває нижню частину адвоката */}
        <path
          d="M310 895 H1320 V1080 H310 Z"
          fill="#2a201c"
        />
        <path
          d="M355 895 V1080 M1270 895 V1080"
          stroke="#171311"
          strokeWidth="18"
        />
        <path
          d="M310 920 H1320"
          stroke="#866348"
          strokeOpacity="0.35"
          strokeWidth="5"
        />

        {/* Передній край стільниці */}
        <path
          d="M260 820 H1370 L1320 895 H310 Z"
          fill="none"
          stroke="#98704d"
          strokeOpacity="0.6"
          strokeWidth="5"
        />
      </svg>
    </AbsoluteFill>
  );
};

export const DialogueScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <LawyerOffice />

      {/* Значно збільшений адвокат */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            right: "-15%",
            bottom: "-18%",
            width: "110%",
            height: "150%",
            zIndex: 2,
          }}
        >
          <Lawyer animationSpeed={0.8} />
        </div>
      </AbsoluteFill>

      {/* Стіл та предмети на передньому плані */}
      <OfficeDeskForeground />
    </AbsoluteFill>
  );
};
