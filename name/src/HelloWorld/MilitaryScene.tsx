
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Character } from "./Character";

export const MilitaryBackground: React.FC = () => {
  const frame = useCurrentFrame();

  const smokeShift = interpolate(frame, [0, 360], [-20, 30]);
  const lightOpacity = interpolate(
    frame,
    [0, 180, 360],
    [0.16, 0.28, 0.16],
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#101820" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1080 1920"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#101923" />
            <stop offset="55%" stopColor="#35414a" />
            <stop offset="100%" stopColor="#9a7960" />
          </linearGradient>

          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#45423c" />
            <stop offset="100%" stopColor="#171c1d" />
          </linearGradient>

          <radialGradient id="horizonGlow">
            <stop offset="0%" stopColor="#e5b58a" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#e5b58a" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="smoke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#aeb0a9" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#59636a" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="1080" height="1920" fill="url(#sky)" />

        <ellipse
          cx="550"
          cy="1030"
          rx="520"
          ry="390"
          fill="url(#horizonGlow)"
          opacity={lightOpacity}
        />

        <g fill="#252f34" opacity="0.8">
          <path d="M0 1100 L0 780 L90 780 L90 850 L150 850 L150 730 L220 730 L220 1100 Z" />
          <path d="M220 1100 L220 850 L300 850 L300 790 L390 790 L390 1100 Z" />
          <path d="M690 1100 L690 820 L770 820 L770 750 L850 750 L850 880 L930 880 L930 1100 Z" />
          <path d="M900 1100 L900 790 L970 790 L970 720 L1080 720 L1080 1100 Z" />
        </g>

        <g fill="#1c272c">
          <path d="M0 1200 L0 650 L115 650 L115 710 L190 680 L190 770 L260 745 L260 1200 Z" />
          <path d="M0 650 L45 620 L80 650 L115 610 L155 680 L190 650 L260 745 L190 770 L115 710 L80 750 L0 720 Z" />
        </g>

        <g fill="#d2a27a" opacity="0.24">
          <rect x="35" y="800" width="35" height="65" />
          <rect x="125" y="810" width="32" height="60" />
          <rect x="35" y="930" width="38" height="65" />
          <rect x="150" y="960" width="40" height="70" />
        </g>

        <g fill="#202a30">
          <path d="M820 1200 L820 760 L900 760 L900 680 L965 715 L965 640 L1080 680 L1080 1200 Z" />
          <path d="M820 760 L870 700 L900 680 L930 730 L965 640 L1015 700 L1080 680 L1080 760 Z" />
        </g>

        <g fill="#d2a27a" opacity="0.2">
          <rect x="875" y="850" width="35" height="65" />
          <rect x="990" y="825" width="38" height="70" />
          <rect x="925" y="970" width="40" height="65" />
        </g>

        <g transform={`translate(${smokeShift}, 0)`}>
          <ellipse cx="300" cy="620" rx="190" ry="110" fill="url(#smoke)" />
          <ellipse cx="420" cy="570" rx="160" ry="130" fill="url(#smoke)" />
          <ellipse cx="790" cy="650" rx="220" ry="120" fill="url(#smoke)" />
          <ellipse cx="700" cy="570" rx="150" ry="100" fill="url(#smoke)" />
        </g>

        <path
          d="M0 1320 Q250 1260 500 1320 Q800 1260 1080 1310 L1080 1920 L0 1920 Z"
          fill="url(#ground)"
        />

        <g fill="#11191b" opacity="0.8">
          <path d="M0 1510 L180 1450 L320 1510 L450 1460 L600 1530 L760 1460 L930 1510 L1080 1450 L1080 1920 L0 1920 Z" />
        </g>

        <g stroke="#827568" strokeWidth="5" opacity="0.18" fill="none">
          <path d="M0 1650 L260 1580 L420 1630" />
          <path d="M680 1660 L850 1590 L1080 1640" />
          <path d="M100 1810 L300 1760 L430 1790" />
        </g>

        <rect
          width="1080"
          height="1920"
          fill="#071018"
          opacity="0.16"
        />
      </svg>
    </AbsoluteFill>
  );
};

export const DustParticles: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: 28 }, (_, i) => ({
    left: (i * 37 + 11) % 100,
    top: (i * 53 + 17) % 100,
    size: 2 + (i % 4) * 1.5,
    speed: 0.5 + (i % 5) * 0.16,
    phase: i * 1.7,
    opacity: 0.12 + (i % 4) * 0.07,
  }));

  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((particle, i) => {
        const x = Math.sin(frame * 0.025 + particle.phase) * 14;
        const y = -((frame * particle.speed + i * 19) % 75);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              backgroundColor: "#d7c6ae",
              opacity: particle.opacity,
              filter: "blur(1px)",
              transform: `translate(${x}px, ${y}px)`,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          left: "-10%",
          bottom: "13%",
          width: "55%",
          height: 180,
          background:
            "radial-gradient(ellipse, rgba(160,145,125,0.13), transparent 70%)",
          filter: "blur(25px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "-15%",
          bottom: "18%",
          width: "60%",
          height: 150,
          background:
            "radial-gradient(ellipse, rgba(160,145,125,0.11), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1080 1920"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0 }}
      >
        <g fill="#151b1c">
          <path d="M0 1780 L0 1640 L70 1680 L115 1650 L170 1740 L220 1790 L220 1920 L0 1920 Z" />
          <path d="M1080 1720 L1020 1660 L970 1690 L920 1650 L865 1760 L830 1810 L830 1920 L1080 1920 Z" />
        </g>

        <g fill="#5a5145" opacity="0.65">
          <path d="M0 1770 L65 1690 L115 1730 L170 1810 L0 1840 Z" />
          <path d="M1080 1780 L1015 1700 L970 1740 L920 1810 L1080 1850 Z" />
        </g>

        <g fill="#252a28">
          <path d="M45 1880 L100 1815 L155 1860 L190 1920 L25 1920 Z" />
          <path d="M1030 1880 L980 1815 L925 1860 L890 1920 L1055 1920 Z" />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

// Стара сцена залишається без змін
export const MilitaryScene: React.FC = () => {
  const frame = useCurrentFrame();

  const zoom = interpolate(
    frame,
    [0, 360],
    [1, 1.055],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const cameraX = interpolate(
    frame,
    [0, 360],
    [0, -18],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const cameraY = interpolate(
    frame,
    [0, 360],
    [0, 12],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `translate(${cameraX}px, ${cameraY}px) scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        <MilitaryBackground />

        <AbsoluteFill>
          <Character
            emotion="neutral"
            pose="walking"
            animationSpeed={1}
            entranceFrameOffset={24}
          />
        </AbsoluteFill>
      </AbsoluteFill>

      <DustParticles />
    </AbsoluteFill>
  );
};
