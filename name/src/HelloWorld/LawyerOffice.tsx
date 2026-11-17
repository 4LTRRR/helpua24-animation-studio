
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const LawyerOffice: React.FC = () => {
  const frame = useCurrentFrame();

  const light = interpolate(
    Math.sin(frame / 45),
    [-1, 1],
    [0.08, 0.18],
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#15191f" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="officeWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#343b43" />
            <stop offset="100%" stopColor="#20262d" />
          </linearGradient>

          <linearGradient id="officeFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#40352f" />
            <stop offset="100%" stopColor="#171719" />
          </linearGradient>

          <linearGradient id="windowLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9eb5c2" />
            <stop offset="55%" stopColor="#536b7b" />
            <stop offset="100%" stopColor="#293d4b" />
          </linearGradient>

          <linearGradient id="deskWood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#684a37" />
            <stop offset="100%" stopColor="#30231e" />
          </linearGradient>

          <linearGradient id="shelfWood" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#211b19" />
            <stop offset="50%" stopColor="#49352b" />
            <stop offset="100%" stopColor="#211b19" />
          </linearGradient>

          <radialGradient id="windowGlow">
            <stop offset="0%" stopColor="#d4e1e5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#9bb5c5" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="vignette" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#05070a" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#05070a" stopOpacity="0" />
            <stop offset="100%" stopColor="#05070a" stopOpacity="0.55" />
          </linearGradient>

          <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {/* Стіна та підлога */}
        <rect width="1920" height="1080" fill="url(#officeWall)" />
        <rect x="0" y="820" width="1920" height="260" fill="url(#officeFloor)" />

        <path
          d="M0 0 H1920 V820 H0 Z"
          fill="none"
          stroke="#59616a"
          strokeOpacity="0.18"
          strokeWidth="5"
        />
        <path
          d="M470 0 V820 M1450 0 V820"
          stroke="#10151a"
          strokeOpacity="0.25"
          strokeWidth="5"
        />
        <path d="M0 810 H1920" stroke="#111519" strokeWidth="14" />

        {/* Вікно */}
        <rect x="650" y="105" width="650" height="570" rx="5" fill="#111a21" />
        <rect x="668" y="123" width="614" height="534" fill="url(#windowLight)" />
        <rect
          x="668"
          y="123"
          width="614"
          height="534"
          fill="#d6e5eb"
          opacity={light}
        />

        {/* Міський силует за вікном */}
        <path
          d="M668 480 L730 420 L780 455 L840 365 L900 430 L965 385 L1020 455 L1080 395 L1145 445 L1205 380 L1282 445 V657 H668 Z"
          fill="#344957"
          opacity="0.9"
        />
        <path
          d="M668 535 L740 490 L800 520 L875 465 L940 520 L1010 475 L1080 520 L1150 470 L1210 515 L1282 480 V657 H668 Z"
          fill="#253946"
        />
        <path d="M668 590 H1282 V657 H668 Z" fill="#1d303c" />

        {/* Рами вікна */}
        <rect
          x="668"
          y="123"
          width="614"
          height="534"
          fill="none"
          stroke="#171d22"
          strokeWidth="18"
        />
        <path
          d="M975 123 V657 M668 390 H1282"
          stroke="#1b252c"
          strokeWidth="15"
        />
        <path
          d="M990 123 V657 M683 405 H1267"
          stroke="#82919a"
          strokeOpacity="0.15"
          strokeWidth="2"
        />

        {/* Світло від вікна */}
        <ellipse
          cx="970"
          cy="710"
          rx="420"
          ry="100"
          fill="url(#windowGlow)"
          opacity="0.45"
          filter="url(#softShadow)"
        />

        {/* Книжкова шафа */}
        <rect
          x="65"
          y="95"
          width="405"
          height="720"
          fill="url(#shelfWood)"
          stroke="#171311"
          strokeWidth="12"
        />
        <rect x="85" y="120" width="365" height="180" fill="#17191b" />
        <rect x="85" y="320" width="365" height="205" fill="#17191b" />
        <rect x="85" y="545" width="365" height="235" fill="#17191b" />

        {/* Полиці */}
        <rect x="75" y="295" width="385" height="18" fill="#76553d" />
        <rect x="75" y="520" width="385" height="18" fill="#76553d" />
        <rect x="75" y="775" width="385" height="18" fill="#76553d" />

        {/* Книги на верхній полиці */}
        <g>
          <rect x="105" y="165" width="34" height="128" rx="3" fill="#75443b" />
          <rect x="145" y="145" width="42" height="148" rx="3" fill="#344b54" />
          <rect x="193" y="178" width="31" height="115" rx="3" fill="#a17a4d" />
          <rect x="230" y="155" width="45" height="138" rx="3" fill="#4b3931" />
          <rect x="281" y="135" width="36" height="158" rx="3" fill="#52604d" />
          <rect x="323" y="170" width="38" height="123" rx="3" fill="#8b5542" />
          <rect x="367" y="150" width="48" height="143" rx="3" fill="#34404c" />
          <path
            d="M110 180 H134 M151 162 H181 M236 171 H269 M288 151 H310 M374 166 H407"
            stroke="#d2b68b"
            strokeOpacity="0.45"
            strokeWidth="4"
          />
        </g>

        {/* Книги на середній полиці */}
        <g>
          <rect x="105" y="375" width="43" height="143" fill="#4b5b4c" />
          <rect x="154" y="355" width="35" height="163" fill="#89523d" />
          <rect x="195" y="390" width="48" height="128" fill="#394b5b" />
          <rect x="250" y="365" width="36" height="153" fill="#a17a4d" />
          <rect x="293" y="382" width="42" height="136" fill="#5c4140" />
          <rect x="343" y="350" width="35" height="168" fill="#47584f" />
          <rect x="385" y="390" width="43" height="128" fill="#3e4a59" />
        </g>

        {/* Нижня полиця та папки */}
        <g>
          <rect x="105" y="600" width="48" height="173" fill="#5c3c34" />
          <rect x="160" y="620" width="42" height="153" fill="#3f5260" />
          <rect x="210" y="585" width="45" height="188" fill="#786044" />
          <rect x="263" y="610" width="42" height="163" fill="#435344" />
          <rect x="313" y="595" width="50" height="178" fill="#754b3d" />
          <rect x="371" y="625" width="47" height="148" fill="#3b4652" />
        </g>

        {/* Дипломи та рамки */}
        <rect
          x="1390"
          y="145"
          width="290"
          height="205"
          rx="4"
          fill="#171a1d"
          stroke="#92734e"
          strokeWidth="9"
        />
        <rect x="1408" y="163" width="254" height="169" fill="#d4c7a9" />
        <rect x="1430" y="185" width="210" height="7" fill="#76664d" opacity="0.65" />
        <rect x="1450" y="208" width="170" height="5" fill="#76664d" opacity="0.5" />
        <rect x="1465" y="230" width="140" height="5" fill="#76664d" opacity="0.5" />
        <circle
          cx="1535"
          cy="280"
          r="25"
          fill="none"
          stroke="#9a7948"
          strokeWidth="4"
        />
        <path
          d="M1522 280 L1532 290 L1550 267"
          fill="none"
          stroke="#9a7948"
          strokeWidth="4"
        />

        <rect
          x="1710"
          y="145"
          width="145"
          height="205"
          rx="4"
          fill="#171a1d"
          stroke="#806343"
          strokeWidth="8"
        />
        <rect x="1726" y="161" width="113" height="173" fill="#6a777b" />
        <path d="M1735 310 L1778 235 L1828 310 Z" fill="#3e5158" />
        <circle cx="1780" cy="205" r="22" fill="#b3a17c" opacity="0.8" />

        {/* Низька тумба */}
        <rect x="1370" y="690" width="485" height="130" fill="#30241f" />
        <rect x="1355" y="680" width="515" height="22" fill="#76553d" />
        <path
          d="M1400 705 V810 M1585 705 V810 M1770 705 V810"
          stroke="#171412"
          strokeWidth="8"
        />
        <circle cx="1495" cy="750" r="5" fill="#a88a5d" />
        <circle cx="1680" cy="750" r="5" fill="#a88a5d" />

        {/* Настільна лампа */}
        <path d="M1785 675 L1805 565 L1840 565 L1820 675" fill="#25292c" />
        <path d="M1788 565 L1760 515 L1850 515 L1838 565 Z" fill="#9b7950" />
        <ellipse cx="1805" cy="680" rx="55" ry="12" fill="#17191a" />
        <ellipse
          cx="1805"
          cy="585"
          rx="95"
          ry="120"
          fill="#e5b978"
          opacity="0.07"
          filter="url(#softShadow)"
        />

        {/* Стіл на задньому плані — без документів та предметів */}
        <path
          d="M260 820 H1370 L1320 895 H310 Z"
          fill="url(#deskWood)"
          stroke="#211915"
          strokeWidth="8"
        />
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

        {/* Кінематографічне тонування */}
        <rect width="1920" height="1080" fill="url(#vignette)" />
        <rect width="1920" height="1080" fill="#101820" opacity="0.08" />
      </svg>
    </AbsoluteFill>
  );
};
