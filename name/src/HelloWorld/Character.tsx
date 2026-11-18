
import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type CharacterEmotion = "neutral" | "worried" | "tired" | "determined";
type CharacterPose = "standing" | "walking" | "talking" | "worried";

type CharacterProps = {
  emotion?: CharacterEmotion;
  pose?: CharacterPose;
  animationSpeed?: number;
  entranceFrameOffset?: number;
};

type Point = {
  x: number;
  y: number;
};

type LegPose = {
  thighPath: string;
  shinPath: string;
  knee: Point;
  ankle: Point;
  footAngle: number;
  lift: number;
};

const segmentPath = (
  start: Point,
  end: Point,
  startWidth: number,
  endWidth: number,
): string => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.max(1, Math.sqrt(dx * dx + dy * dy));

  const nx = -dy / length;
  const ny = dx / length;

  const a = {
    x: start.x + nx * startWidth / 2,
    y: start.y + ny * startWidth / 2,
  };
  const b = {
    x: end.x + nx * endWidth / 2,
    y: end.y + ny * endWidth / 2,
  };
  const c = {
    x: end.x - nx * endWidth / 2,
    y: end.y - ny * endWidth / 2,
  };
  const d = {
    x: start.x - nx * startWidth / 2,
    y: start.y - ny * startWidth / 2,
  };

  return `M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y} L ${d.x} ${d.y} Z`;
};

// Розрахунок окремої ноги з фазами опори та перенесення
const getLegPose = (
  angle: number,
  side: number,
  hipX: number,
  homeX: number,
): LegPose => {
  const cycle = ((angle / (Math.PI * 2)) % 1 + 1) % 1;

  const stanceDuration = 0.62;
  let lift = 0;
  let spread = 0;
  let footAngle = 0;

  if (cycle >= stanceDuration) {
    const progress = (cycle - stanceDuration) / (1 - stanceDuration);
    const smoothArc = Math.pow(Math.sin(Math.PI * progress), 2);

    lift = 11 * smoothArc;
    spread = side * 5 * smoothArc;
    footAngle = -side * Math.sin(Math.PI * progress) * 5;
  }

  // Стопа залишається нерухомою під час опори
  const ankle: Point = {
    x: homeX + spread,
    y: 453 - lift,
  };

  const hip: Point = {
    x: hipX,
    y: 326,
  };

  // Коліно рухається плавно, не перетинаючи протилежну ногу
  const bend = lift * 0.7;

  const knee: Point = {
    x:
      hip.x +
      (ankle.x - hip.x) * 0.56 +
      side * bend * 0.25,
    y:
      hip.y +
      (ankle.y - hip.y) * 0.58 -
      bend * 0.15,
  };

  return {
    thighPath: segmentPath(hip, knee, 34, 27),
    shinPath: segmentPath(knee, ankle, 25, 19),
    knee,
    ankle,
    footAngle,
    lift,
  };
};

export const Character: React.FC<CharacterProps> = ({
  emotion = "neutral",
  pose = "standing",
  animationSpeed = 1,
  entranceFrameOffset = 0,
}) => {
  const gradientPrefix = React.useId().replace(/:/g, "");
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame * animationSpeed;

  const entrance = spring({
    frame: frame + entranceFrameOffset,
    fps,
    config: { damping: 18, stiffness: 75 },
  });

  const isWalking = pose === "walking";
  const isTalking = pose === "talking";
  const isWorried = pose === "worried" || emotion === "worried";
  const isTired = emotion === "tired";
  const isDetermined = emotion === "determined";

  // НОВИЙ ЦИКЛ ХОДЬБИ
  // Повний цикл приблизно 1,5 секунди при 30 FPS
  const phase = t * 0.14;

  const leftLegPose = getLegPose(
    isWalking ? phase : 0,
    -1,
    115,
    109,
  );

  const rightLegPose = getLegPose(
    isWalking ? phase + Math.PI : 0,
    1,
    185,
    191,
  );

  // РУХ ТІЛА
  // Під час ходьби стопи не повинні рухатися разом із корпусом
  const weightShift = isWalking ? 0 : 0;

  const breathing = isWalking
    ? 0
    : isTired
      ? Math.sin(t / 25) * 0.8
      : Math.sin(t / 18) * 1.3;

  const bodySway = isWalking
    ? 0
    : isWorried
      ? Math.sin(t / 13) * 0.5
      : isTired
        ? Math.sin(t / 35) * 0.5
        : Math.sin(t / 45) * 0.35;

  const bodyRotation = isWalking
    ? 0
    : isWorried
      ? 1.5
      : isTired
        ? 2
        : 0;

  // ГОЛОВА
  const headRotation = isWalking
    ? Math.sin(phase * 2) * 0.7
    : isWorried
      ? -5 + Math.sin(t / 22) * 1.5
      : isTired
        ? 5 + Math.sin(t / 35)
        : isTalking
          ? Math.sin(t / 14) * 2
          : Math.sin(t / 55) * 0.8;

  const headNod = isWalking
    ? Math.sin(phase * 2) * 0.5
    : isWorried
      ? 4 + Math.sin(t / 18)
      : isTired
        ? 7 + Math.sin(t / 30) * 1.5
        : isTalking
          ? Math.sin(t / 8) * 2
          : 0;

  // МОРГАННЯ
  const blinkCycle = t % (isTired ? 90 : 145);
  const blink =
    blinkCycle > 2 && blinkCycle < 7
      ? interpolate(blinkCycle, [2, 4.5, 7], [1, 0.08, 1])
      : 1;

  // ПОГЛЯД
  const eyeLookX = isWorried
    ? Math.sin(t / 10) * 4
    : isTired
      ? Math.sin(t / 35)
      : isTalking
        ? Math.sin(t / 18) * 1.5
        : Math.sin(t / 55);

  const eyeLookY = isWorried
    ? Math.sin(t / 12) * 1.5
    : isTired
      ? 2.5
      : 0;

  // РУКИ — ПРОТИЛЕЖНИЙ РУХ ДО НІГ
  const leftArm = isWalking
    ? -Math.sin(phase + Math.PI) * 11
    : isTalking
      ? Math.sin(t / 9) * 10
      : isWorried
        ? -8 + Math.sin(t / 20) * 1.5
        : isTired
          ? 7 + Math.sin(t / 30)
          : Math.sin(t / 45) * 0.5;

  const rightArm = isWalking
    ? -Math.sin(phase) * 11
    : isTalking
      ? -Math.abs(Math.sin(t / 9)) * 15
      : isWorried
        ? 8 + Math.sin(t / 18) * 1.5
        : isTired
          ? -7 + Math.sin(t / 30)
          : Math.sin(t / 45) * 0.5;

  const leftElbow = isWalking
    ? -(8 + Math.max(0, Math.sin(phase + Math.PI)) * 4)
    : isTalking
      ? -(10 + Math.sin(t / 9) * 8)
      : isWorried
        ? -10
        : -4;

  const rightElbow = isWalking
    ? 8 + Math.max(0, Math.sin(phase)) * 4
    : isTalking
      ? 18 + Math.sin(t / 9) * 8
      : isWorried
        ? 10
        : 4;

  const leftWrist = isWalking
    ? Math.sin(phase + 0.7) * 3
    : 0;

  const rightWrist = isWalking
    ? Math.sin(phase + Math.PI + 0.7) * 3
    : 0;

  const mouthOpen = isTalking
    ? 1.5 + Math.max(0, Math.sin(t * 0.38)) * 5
    : 0.8;

  const brows = isWorried
    ? "M119 104 Q130 94 141 106 M159 106 Q170 94 181 104"
    : isDetermined
      ? "M119 108 L141 99 M159 99 L181 108"
      : isTired
        ? "M119 105 Q130 111 141 108 M159 108 Q170 111 181 105"
        : "M119 104 Q130 102 141 105 M159 105 Q170 102 181 104";

  const eyeHeight = isTired ? 3 : 6;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        left: "50%",
        width: 650,
        height: 1100,
        transform: `translateX(-50%) translateY(${interpolate(
          entrance,
          [0, 1],
          [180, 0],
        )}px)`,
        opacity: entrance,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 300 500" fill="none">
        <defs>
          <linearGradient id={`${gradientPrefix}-uniform`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#657653" />
            <stop offset="0.5" stopColor="#43543B" />
            <stop offset="1" stopColor="#29382D" />
          </linearGradient>

          <linearGradient id={`${gradientPrefix}-vest`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#59644B" />
            <stop offset="1" stopColor="#27352B" />
          </linearGradient>

          <linearGradient id={`${gradientPrefix}-skin`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D9A17E" />
            <stop offset="1" stopColor="#A96F55" />
          </linearGradient>

          <linearGradient id={`${gradientPrefix}-helmet`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#627354" />
            <stop offset="1" stopColor="#303F30" />
          </linearGradient>
        </defs>

        {/* ТІНЬ ПІД НОГАМИ */}
        <ellipse
          cx="150"
          cy="478"
          rx="100"
          ry="12"
          fill="#000"
          opacity="0.3"
        />

        <ellipse
          cx={leftLegPose.ankle.x}
          cy="475"
          rx={20 - leftLegPose.lift * 0.4}
          ry="4"
          fill="#000"
          opacity={0.22 - leftLegPose.lift * 0.012}
        />

        <ellipse
          cx={rightLegPose.ankle.x}
          cy="475"
          rx={20 - rightLegPose.lift * 0.4}
          ry="4"
          fill="#000"
          opacity={0.22 - rightLegPose.lift * 0.012}
        />

        <g
          transform={`translate(${weightShift} ${breathing}) rotate(${bodySway + bodyRotation} 150 280)`}
        >
          {/* ЛІВА НОГА — ДИНАМІЧНА ГЕОМЕТРІЯ */}
          <path
            d={leftLegPose.thighPath}
            fill={`url(#${gradientPrefix}-uniform)`}
            stroke="#263328"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          <path
            d={`M ${leftLegPose.knee.x - 12} ${leftLegPose.knee.y - 5}
                Q ${leftLegPose.knee.x} ${leftLegPose.knee.y - 15}
                  ${leftLegPose.knee.x + 12} ${leftLegPose.knee.y - 5}`}
            stroke="#839071"
            strokeWidth="2"
            opacity="0.5"
            fill="none"
          />

          <path
            d={leftLegPose.shinPath}
            fill="#26342C"
            stroke="#151F19"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          <ellipse
            cx={leftLegPose.knee.x}
            cy={leftLegPose.knee.y}
            rx="14"
            ry="10"
            fill="#354733"
            stroke="#1F2D22"
            strokeWidth="3"
          />

          <path
            d={`M ${leftLegPose.knee.x - 8} ${leftLegPose.knee.y}
                L ${leftLegPose.knee.x + 8} ${leftLegPose.knee.y}`}
            stroke="#899477"
            strokeWidth="2"
          />

          <g
            transform={`translate(${leftLegPose.ankle.x} ${leftLegPose.ankle.y}) rotate(${leftLegPose.footAngle})`}
          >
            <path
              d="M-12 -13 L12 -13 L19 0 L23 11 Q24 20 11 20 L-19 20 Q-25 17 -22 8Z"
              fill="#1D2925"
              stroke="#101915"
              strokeWidth="5"
            />
            <path
              d="M-10 -4 L12 6 M-12 3 L10 13"
              stroke="#A0A18C"
              strokeWidth="2.5"
            />
            <path
              d="M-21 15 Q0 23 22 15"
              stroke="#0C1512"
              strokeWidth="5"
            />
          </g>

          {/* ПРАВА НОГА — ДИНАМІЧНА ГЕОМЕТРІЯ */}
          <path
            d={rightLegPose.thighPath}
            fill={`url(#${gradientPrefix}-uniform)`}
            stroke="#263328"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          <path
            d={`M ${rightLegPose.knee.x - 12} ${rightLegPose.knee.y - 5}
                Q ${rightLegPose.knee.x} ${rightLegPose.knee.y - 15}
                  ${rightLegPose.knee.x + 12} ${rightLegPose.knee.y - 5}`}
            stroke="#839071"
            strokeWidth="2"
            opacity="0.5"
            fill="none"
          />

          <path
            d={rightLegPose.shinPath}
            fill="#26342C"
            stroke="#151F19"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          <ellipse
            cx={rightLegPose.knee.x}
            cy={rightLegPose.knee.y}
            rx="14"
            ry="10"
            fill="#354733"
            stroke="#1F2D22"
            strokeWidth="3"
          />

          <path
            d={`M ${rightLegPose.knee.x - 8} ${rightLegPose.knee.y}
                L ${rightLegPose.knee.x + 8} ${rightLegPose.knee.y}`}
            stroke="#899477"
            strokeWidth="2"
          />

          <g
            transform={`translate(${rightLegPose.ankle.x} ${rightLegPose.ankle.y}) rotate(${rightLegPose.footAngle})`}
          >
            <path
              d="M-12 -13 L12 -13 L19 0 L23 11 Q24 20 11 20 L-19 20 Q-25 17 -22 8Z"
              fill="#1D2925"
              stroke="#101915"
              strokeWidth="5"
            />
            <path
              d="M-10 -4 L12 6 M-12 3 L10 13"
              stroke="#A0A18C"
              strokeWidth="2.5"
            />
            <path
              d="M-21 15 Q0 23 22 15"
              stroke="#0C1512"
              strokeWidth="5"
            />
          </g>

          {/* КОРПУС */}
          <path
            d="M105 178 Q150 160 195 178 L219 337 Q150 365 81 337Z"
            fill={`url(#${gradientPrefix}-uniform)`}
            stroke="#263529"
            strokeWidth="7"
          />

          <g stroke="#839071" strokeWidth="2" opacity="0.35">
            <path d="M102 211 L115 236 L108 263" />
            <path d="M198 211 L185 236 L192 263" />
            <path d="M104 320 L126 331" />
            <path d="M196 320 L174 331" />
          </g>

          {/* КОМІР */}
          <path
            d="M121 171 L150 202 L179 171 L190 186 L150 224 L110 186Z"
            fill="#29392E"
            stroke="#1C2A20"
            strokeWidth="4"
          />
          <path
            d="M132 183 L150 205 L168 183"
            stroke="#7D896E"
            strokeWidth="2"
          />

          {/* ЛІВА РУКА */}
          <g transform={`rotate(${leftArm} 100 190)`}>
            <path
              d="M105 185 Q81 176 73 207 L65 249 L91 260 L111 223Z"
              fill={`url(#${gradientPrefix}-uniform)`}
              stroke="#263529"
              strokeWidth="6"
            />
            <path
              d="M70 215 L95 220 L91 244 L67 239Z"
              fill="#43543B"
              stroke="#273529"
              strokeWidth="2"
            />
            <path d="M72 221 L92 225" stroke="#9AA185" strokeWidth="2" />

            <g transform={`rotate(${leftElbow} 78 257)`}>
              <path
                d="M65 246 L91 255 L86 286 L62 278Z"
                fill="#354633"
                stroke="#1E2C22"
                strokeWidth="3"
              />
              <path
                d="M63 272 L89 282 L85 302 L59 292Z"
                fill="#29382D"
                stroke="#18251C"
                strokeWidth="3"
              />

              <g transform={`rotate(${leftWrist} 74 300)`}>
                <path
                  d="M60 292 Q74 284 86 300 L91 316 L80 328 L58 315Z"
                  fill="#303B32"
                  stroke="#17231B"
                  strokeWidth="3"
                />
                <path
                  d="M65 302 L81 310 M63 309 L77 317"
                  stroke="#78806B"
                  strokeWidth="2"
                />
              </g>
            </g>
          </g>

          {/* ПРАВА РУКА */}
          <g transform={`rotate(${rightArm} 200 190)`}>
            <path
              d="M195 185 Q219 176 227 207 L235 249 L209 260 L189 223Z"
              fill={`url(#${gradientPrefix}-uniform)`}
              stroke="#263529"
              strokeWidth="6"
            />
            <path
              d="M205 215 L230 220 L233 239 L209 244Z"
              fill="#43543B"
              stroke="#273529"
              strokeWidth="2"
            />

            <g transform={`rotate(${rightElbow} 222 257)`}>
              <path
                d="M234 246 L209 255 L214 286 L238 278Z"
                fill="#354633"
                stroke="#1E2C22"
                strokeWidth="3"
              />
              <path
                d="M211 272 L237 282 L241 302 L215 292Z"
                fill="#29382D"
                stroke="#18251C"
                strokeWidth="3"
              />

              <g transform={`rotate(${rightWrist} 226 300)`}>
                <path
                  d="M214 292 Q226 284 240 300 L242 315 L220 328 L209 316Z"
                  fill="#303B32"
                  stroke="#17231B"
                  strokeWidth="3"
                />
                <path
                  d="M219 302 L236 310 M218 309 L231 317"
                  stroke="#78806B"
                  strokeWidth="2"
                />
              </g>
            </g>
          </g>

          {/* ПЛЕЧОВІ ВСТАВКИ */}
          <path
            d="M104 184 Q87 179 77 195 L88 212 L112 202Z"
            fill="#657653"
            stroke="#29392D"
            strokeWidth="3"
          />
          <path
            d="M196 184 Q213 179 223 195 L212 212 L188 202Z"
            fill="#657653"
            stroke="#29392D"
            strokeWidth="3"
          />

          {/* БРОНЕЖИЛЕТ */}
          <path
            d="M111 187 L189 187 L207 337 Q150 354 93 337Z"
            fill={`url(#${gradientPrefix}-vest)`}
            stroke="#1D2A21"
            strokeWidth="7"
          />

          <path
            d="M126 204 Q150 195 174 204 L181 319 Q150 332 119 319Z"
            fill="#3D4D3B"
            stroke="#202D24"
            strokeWidth="4"
          />
          <path
            d="M132 211 L168 211 L173 310 L127 310Z"
            stroke="#75816A"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* РЕМЕНІ */}
          <path
            d="M111 188 L133 214 L124 327 M189 188 L167 214 L176 327"
            stroke="#829071"
            strokeWidth="10"
          />
          <path
            d="M111 188 L133 214 L124 327 M189 188 L167 214 L176 327"
            stroke="#344334"
            strokeWidth="4"
          />
          <path d="M150 205 L150 325" stroke="#778268" strokeWidth="4" />

          {/* ПІДСУМКИ */}
          <rect
            x="98"
            y="238"
            width="31"
            height="45"
            rx="4"
            fill="#657653"
            stroke="#1D2A21"
            strokeWidth="3"
          />
          <path
            d="M102 248 L125 248 M102 255 L125 255"
            stroke="#A1A98A"
            strokeWidth="2"
          />
          <rect x="102" y="261" width="23" height="5" fill="#354333" />

          <rect
            x="171"
            y="238"
            width="31"
            height="45"
            rx="4"
            fill="#657653"
            stroke="#1D2A21"
            strokeWidth="3"
          />
          <path
            d="M175 248 L198 248 M175 255 L198 255"
            stroke="#A1A98A"
            strokeWidth="2"
          />
          <rect x="175" y="261" width="23" height="5" fill="#354333" />

          <rect
            x="135"
            y="278"
            width="30"
            height="37"
            rx="4"
            fill="#536448"
            stroke="#1D2A21"
            strokeWidth="3"
          />
          <path
            d="M140 286 L160 286 M140 293 L160 293"
            stroke="#9CA687"
            strokeWidth="2"
          />

          {/* АПТЕЧКА */}
          <rect
            x="91"
            y="292"
            width="31"
            height="35"
            rx="4"
            fill="#4A5741"
            stroke="#1A271E"
            strokeWidth="3"
          />
          <path
            d="M106 299 L106 320 M96 310 L116 310"
            stroke="#D4D4C0"
            strokeWidth="5"
          />

          {/* РАЦІЯ */}
          <rect
            x="179"
            y="290"
            width="25"
            height="42"
            rx="4"
            fill="#202B27"
            stroke="#101A16"
            strokeWidth="3"
          />
          <path
            d="M190 290 L194 278 L198 278"
            stroke="#202B27"
            strokeWidth="3"
          />
          <circle cx="191" cy="300" r="3" fill="#A5B18E" />
          <path
            d="M185 309 L198 309 M185 315 L198 315"
            stroke="#87917B"
            strokeWidth="2"
          />

          {/* НАШИВКА */}
          <rect
            x="133"
            y="218"
            width="34"
            height="19"
            rx="2"
            fill="#25342A"
            stroke="#9AA487"
            strokeWidth="1.5"
          />
          <path
            d="M139 228 L150 221 L161 228"
            stroke="#D7DDC9"
            strokeWidth="2.5"
          />

          {/* ШИЯ */}
          <rect
            x="130"
            y="143"
            width="40"
            height="49"
            rx="10"
            fill={`url(#${gradientPrefix}-skin)`}
            stroke="#704B3B"
            strokeWidth="3"
          />

          {/* ГОЛОВА */}
          <g transform={`translate(0 ${headNod}) rotate(${headRotation} 150 120)`}>
            <ellipse cx="94" cy="119" rx="10" ry="16" fill="#B98163" />
            <ellipse cx="206" cy="119" rx="10" ry="16" fill="#B98163" />
            <ellipse cx="95" cy="119" rx="4" ry="8" fill="#85563F" />
            <ellipse cx="205" cy="119" rx="4" ry="8" fill="#85563F" />

            {/* ОБЛИЧЧЯ */}
            <path
              d="M98 84 Q98 47 150 44 Q202 47 202 84 L198 137 Q191 169 150 178 Q109 169 102 137Z"
              fill={`url(#${gradientPrefix}-skin)`}
              stroke="#704B3B"
              strokeWidth="3"
            />

            {/* ВОЛОССЯ */}
            <path
              d="M98 93 Q91 50 150 43 Q209 50 202 93 L187 79 Q150 67 113 79Z"
              fill="#342A25"
            />

            {/* ШОЛОМ */}
            <path
              d="M84 89 Q80 22 150 14 Q220 22 216 89 L226 101 L74 101Z"
              fill={`url(#${gradientPrefix}-helmet)`}
              stroke="#202E24"
              strokeWidth="6"
            />
            <path
              d="M91 76 Q150 48 209 76"
              stroke="#829071"
              strokeWidth="5"
            />
            <path
              d="M77 98 Q150 108 223 98"
              stroke="#1C2A20"
              strokeWidth="6"
            />

            {/* КРІПЛЕННЯ ШОЛОМА */}
            <path
              d="M99 96 L105 151 M201 96 L195 151"
              stroke="#354333"
              strokeWidth="4"
            />
            <rect x="83" y="87" width="15" height="12" rx="3" fill="#26372A" />
            <rect x="202" y="87" width="15" height="12" rx="3" fill="#26372A" />

            {/* ОЧІ */}
            <g
              style={{
                transformOrigin: "150px 119px",
                transform: `scaleY(${blink})`,
              }}
            >
              <g transform={`translate(${eyeLookX} ${eyeLookY})`}>
                <path
                  d="M117 117 Q130 106 142 117"
                  stroke="#49352C"
                  strokeWidth="3"
                />
                <path
                  d="M158 117 Q170 106 183 117"
                  stroke="#49352C"
                  strokeWidth="3"
                />

                <ellipse cx="130" cy="119" rx="7" ry={eyeHeight} fill="#F1E5D7" />
                <ellipse cx="170" cy="119" rx="7" ry={eyeHeight} fill="#F1E5D7" />

                <circle cx="131" cy="119" r="3.5" fill="#342820" />
                <circle cx="171" cy="119" r="3.5" fill="#342820" />
                <circle cx="132" cy="117" r="1.2" fill="#FFFFFF" />
                <circle cx="172" cy="117" r="1.2" fill="#FFFFFF" />
              </g>
            </g>

            {/* БРОВИ */}
            <path
              d={brows}
              stroke="#49352C"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* НІС */}
            <path
              d="M150 119 L144 139 Q150 145 157 139"
              stroke="#9B684F"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* ЩЕТИНА */}
            <path
              d="M112 148 Q116 165 150 171 Q184 165 188 148"
              stroke="#49352C"
              strokeWidth="4"
              opacity="0.55"
              fill="none"
            />
            <g fill="#49352C" opacity="0.5">
              <circle cx="119" cy="153" r="1.2" />
              <circle cx="126" cy="161" r="1.2" />
              <circle cx="135" cy="165" r="1.2" />
              <circle cx="165" cy="165" r="1.2" />
              <circle cx="174" cy="161" r="1.2" />
              <circle cx="181" cy="153" r="1.2" />
            </g>

            {/* РОТ */}
            {isWorried ? (
              <path
                d="M138 158 Q150 151 162 158"
                stroke="#542C2A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            ) : isTired ? (
              <path
                d="M139 158 Q150 154 161 158"
                stroke="#542C2A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            ) : isTalking ? (
              <ellipse cx="150" cy="153" rx="7" ry={mouthOpen} fill="#542C2A" />
            ) : (
              <path
                d="M140 154 Q150 157 160 154"
                stroke="#713F37"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* ПІДБОРІДДЯ */}
            <path
              d="M127 166 Q150 179 173 166"
              stroke="#A87559"
              strokeWidth="2"
              opacity="0.6"
              fill="none"
            />
          </g>

          {/* ДОДАТКОВІ РЕМЕНІ */}
          <path
            d="M105 192 L91 218 M195 192 L209 218"
            stroke="#879174"
            strokeWidth="4"
          />
          <rect x="144" y="330" width="12" height="7" rx="2" fill="#A0A18C" />
        </g>
      </svg>
    </div>
  );
};
