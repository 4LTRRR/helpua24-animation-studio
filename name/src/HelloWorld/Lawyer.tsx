
import React from "react";
import {
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";

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

type LawyerProps = {
  animationSpeed?: number;
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
    x: start.x + (nx * startWidth) / 2,
    y: start.y + (ny * startWidth) / 2,
  };
  const b = {
    x: end.x + (nx * endWidth) / 2,
    y: end.y + (ny * endWidth) / 2,
  };
  const c = {
    x: end.x - (nx * endWidth) / 2,
    y: end.y - (ny * endWidth) / 2,
  };
  const d = {
    x: start.x - (nx * startWidth) / 2,
    y: start.y - (ny * startWidth) / 2,
  };

  return `M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y} L ${d.x} ${d.y} Z`;
};

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

    lift = 22 * smoothArc;
    spread = side * 10 * smoothArc;
    footAngle = -side * Math.sin(Math.PI * progress) * 5;
  }

  const ankle: Point = {
    x: homeX + spread,
    y: 1025 - lift,
  };

  const hip: Point = {
    x: hipX,
    y: 790,
  };

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
    thighPath: segmentPath(hip, knee, 68, 56),
    shinPath: segmentPath(knee, ankle, 52, 42),
    knee,
    ankle,
    footAngle,
    lift,
  };
};

export const Lawyer = ({
  animationSpeed = 1,
}: LawyerProps) => {
  const gradientPrefix = React.useId().replace(/:/g, "");
  const frame = useCurrentFrame();
  const t = frame * animationSpeed;

  // Ноги зафіксовані — адвокат не ходить
  const phase = 0;

  const leftLegPose = getLegPose(
    phase,
    -1,
    225,
    205,
  );

  const rightLegPose = getLegPose(
    phase + Math.PI,
    1,
    280,
    300,
  );

  // Ледь помітне дихання та погойдування корпусу
  const breathing = Math.sin(t * 0.07) * 2;
  const bodySwayX = Math.sin(t * 0.035) * 3;
  const bodySwayY = Math.sin(t * 0.07) * 1.2;
  const bodyLean = Math.sin(t * 0.035) * 0.8;

  // Кліпання
  const blink = [48, 49, 50, 151, 152].includes(
    Math.floor(t) % 190,
  );
  const eyeHeight = blink ? 1 : 7;

  // Природні рухи голови
  const headTilt = Math.sin(t * 0.025) * 2;
  const headNod = Math.sin(t * 0.045) * 2;

  // Плавний цикл жесту правою рукою
  const gesture = interpolate(
    t % 210,
    [0, 35, 65, 90, 115, 145, 175, 210],
    [0, 0, 0.45, 1, 0.8, 0.35, 0, 0],
    {
      easing: Easing.inOut(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const shoulderRotation = -2.5 * gesture;
  const forearmBend = 112 * gesture;
  const handRotation = -8 * gesture;

  // Ліва рука залишається біля теки
  const leftArmRotation = Math.sin(t * 0.035) * 0.8;

  // Імітація розмови
  const mouthOpen =
    Math.max(0, Math.sin(t * 0.32)) * 8 +
    Math.max(0, Math.sin(t * 0.17)) * 2;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 500 1100"
      preserveAspectRatio="xMidYMax meet"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`${gradientPrefix}-suit`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#263444" />
          <stop offset="50%" stopColor="#182534" />
          <stop offset="100%" stopColor="#101923" />
        </linearGradient>

        <linearGradient id={`${gradientPrefix}-shirt`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dce2e7" />
        </linearGradient>

        <linearGradient id={`${gradientPrefix}-skin`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e5b99a" />
          <stop offset="100%" stopColor="#bd896d" />
        </linearGradient>

        <linearGradient id={`${gradientPrefix}-leather`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#76533b" />
          <stop offset="100%" stopColor="#392a23" />
        </linearGradient>
      </defs>

      <g transform="translate(40 150) scale(0.84 0.86)">
        <g
          transform={`translate(${bodySwayX} ${breathing + bodySwayY}) rotate(${bodyLean} 250 600)`}
        >
          {/* Ліва нога — нерухома */}
          <path
            d={leftLegPose.thighPath}
            fill="#172332"
            stroke="#101923"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          <path
            d={leftLegPose.shinPath}
            fill="#172332"
            stroke="#101923"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          <path
            d={`M ${leftLegPose.knee.x - 22} ${leftLegPose.knee.y}
                Q ${leftLegPose.knee.x} ${leftLegPose.knee.y - 12}
                  ${leftLegPose.knee.x + 22} ${leftLegPose.knee.y}`}
            stroke="#405064"
            strokeWidth="3"
            opacity="0.5"
            fill="none"
          />

          <g
            transform={`translate(${leftLegPose.ankle.x} ${leftLegPose.ankle.y}) rotate(${leftLegPose.footAngle}) scale(-1 1)`}
          >
            <path
              d="M-30 -10 L15 -10 L30 0 Q38 12 25 18 L-28 18 Q-38 14 -30 4Z"
              fill="#10151b"
              stroke="#090d12"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M-23 17 Q0 24 30 16"
              stroke="#343c45"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M-8 -6 L8 5 M-12 0 L5 10"
              stroke="#68717b"
              strokeWidth="2"
            />
          </g>

          {/* Права нога — нерухома */}
          <path
            d={rightLegPose.thighPath}
            fill="#1c2938"
            stroke="#101923"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          <path
            d={rightLegPose.shinPath}
            fill="#1c2938"
            stroke="#101923"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          <path
            d={`M ${rightLegPose.knee.x - 22} ${rightLegPose.knee.y}
                Q ${rightLegPose.knee.x} ${rightLegPose.knee.y - 12}
                  ${rightLegPose.knee.x + 22} ${rightLegPose.knee.y}`}
            stroke="#405064"
            strokeWidth="3"
            opacity="0.5"
            fill="none"
          />

          <g
            transform={`translate(${rightLegPose.ankle.x} ${rightLegPose.ankle.y}) rotate(${rightLegPose.footAngle})`}
          >
            <path
              d="M-30 -10 L15 -10 L30 0 Q38 12 25 18 L-28 18 Q-38 14 -30 4Z"
              fill="#10151b"
              stroke="#090d12"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M-23 17 Q0 24 30 16"
              stroke="#343c45"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M-8 -6 L8 5 M-12 0 L5 10"
              stroke="#68717b"
              strokeWidth="2"
            />
          </g>

          {/* Корпус */}
          <path
            d="M195 340 Q170 350 158 410 L145 675 Q138 735 165 785 L195 815 L305 815 L335 785 Q362 735 355 675 L342 410 Q330 350 305 340 Z"
            fill="url(#${gradientPrefix}-suit)"
            stroke="#101923"
            strokeWidth="5"
          />

          {/* Сорочка */}
          <path
            d="M225 330 L250 390 L275 330 L290 405 L282 785 L218 785 L210 405 Z"
            fill="url(#${gradientPrefix}-shirt)"
          />

          {/* Комір */}
          <path
            d="M225 330 L250 390 L232 445 L205 375 Z"
            fill="#f3f5f6"
            stroke="#c7cfd5"
            strokeWidth="3"
          />
          <path
            d="M275 330 L250 390 L268 445 L295 375 Z"
            fill="#e4e9ed"
            stroke="#c7cfd5"
            strokeWidth="3"
          />

          {/* Краватка */}
          <path
            d="M238 385 L250 405 L262 385 L275 430 L250 480 L225 430 Z"
            fill="#8b3438"
          />
          <path
            d="M250 480 L275 430 L285 775 L250 805 L215 775 L225 430 Z"
            fill="#762b32"
          />

          {/* Лацкани */}
          <path
            d="M195 345 L225 330 L250 390 L225 515 L175 410 Z"
            fill="#26384b"
            stroke="#101923"
            strokeWidth="3"
          />
          <path
            d="M305 345 L275 330 L250 390 L275 515 L325 410 Z"
            fill="#26384b"
            stroke="#101923"
            strokeWidth="3"
          />

          {/* Кишені */}
          <path
            d="M155 610 L195 622 L190 675 L150 663 Z"
            fill="#1c2a39"
            stroke="#405064"
            strokeWidth="3"
          />
          <path
            d="M305 622 L345 610 L350 663 L310 675 Z"
            fill="#1c2a39"
            stroke="#405064"
            strokeWidth="3"
          />

          {/* Ґудзики */}
          <circle cx="290" cy="590" r="5" fill="#a9aeb4" />
          <circle cx="290" cy="650" r="5" fill="#a9aeb4" />
          <circle cx="290" cy="710" r="5" fill="#a9aeb4" />

          {/* Ліва рука та тека */}
          <g transform={`rotate(${leftArmRotation} 165 405)`}>
            <g transform="translate(42 535) rotate(-12 100 90)">
              <path
                d="M30 12 L145 4 L160 175 L45 185 Z"
                fill="url(#${gradientPrefix}-leather)"
                stroke="#30231d"
                strokeWidth="5"
              />
              <path
                d="M38 4 L151 -2 L158 151 L46 162 Z"
                fill="#d8d9d5"
                stroke="#9da3a3"
                strokeWidth="2"
              />
              <path
                d="M32 0 L145 -8 L152 143 L40 154 Z"
                fill="#f5f3ed"
                stroke="#bfc2c0"
                strokeWidth="2"
              />

              <g stroke="#aeb5b7" strokeWidth="2" opacity="0.8">
                <path d="M52 32 L125 27" />
                <path d="M54 45 L132 40" />
                <path d="M55 58 L120 54" />
                <path d="M58 78 L130 73" />
                <path d="M60 91 L120 87" />
                <path d="M61 104 L135 99" />
              </g>

              <path
                d="M125 0 L143 -2 L146 35 L135 28 L127 38 Z"
                fill="#913b40"
              />
              <path
                d="M72 10 L105 8 L108 20 L74 22 Z"
                fill="#aeb5b7"
                stroke="#747d82"
                strokeWidth="2"
              />
              <path
                d="M42 145 L155 135 L158 175 L45 185 Z"
                fill="#483226"
                opacity="0.8"
              />
              <circle
                cx="101"
                cy="158"
                r="9"
                fill="none"
                stroke="#c4a77d"
                strokeWidth="2"
              />
            </g>

            <path
              d="M165 405 Q140 420 135 475 L110 650 Q105 690 125 705 Q145 710 155 675 L185 495 Z"
              fill="#1d2b3b"
              stroke="#101923"
              strokeWidth="4"
            />
            <path
              d="M110 650 Q100 685 115 715 Q130 740 150 715 L155 675 Z"
              fill="url(#${gradientPrefix}-skin)"
            />

            <path
              d="M113 670 Q125 662 138 674 L145 696 Q142 706 132 700 L120 691 Z"
              fill="#d5a58a"
              stroke="#a87962"
              strokeWidth="2"
            />
            <path
              d="M121 690 Q135 683 145 695 L150 710 Q145 718 136 710 L123 703 Z"
              fill="#c99175"
              stroke="#a87962"
              strokeWidth="2"
            />
          </g>

          {/* Права рука */}
          <g transform={`rotate(${shoulderRotation} 335 405)`}>
            <path
              d="M335 405 Q360 420 365 465 L375 515 Q360 530 340 520 L315 495 Z"
              fill="#1d2b3b"
              stroke="#101923"
              strokeWidth="4"
            />

            <g transform={`rotate(${forearmBend} 365 510)`}>
              <path
                d="M345 495 Q365 490 380 515 L400 650 Q405 685 385 705 Q365 710 355 680 L335 525 Z"
                fill="#1d2b3b"
                stroke="#101923"
                strokeWidth="4"
              />

              <g transform={`rotate(${handRotation} 380 680)`}>
                <path
                  d="M390 650 Q400 685 385 715 Q370 740 350 715 L345 675 Z"
                  fill="url(#${gradientPrefix}-skin)"
                  stroke="#a87962"
                  strokeWidth="2"
                />

                <path
                  d="M365 696 Q380 690 390 705 L390 721 Q382 729 374 718 Z"
                  fill="#d5a58a"
                  stroke="#a87962"
                  strokeWidth="2"
                />
                <path
                  d="M353 704 Q363 698 372 708 L375 724 Q369 731 362 722 Z"
                  fill="#c99175"
                  stroke="#a87962"
                  strokeWidth="2"
                />
              </g>
            </g>
          </g>

          {/* Шия */}
          <path
            d="M220 275 L220 350 Q250 380 280 350 L280 275 Z"
            fill="url(#${gradientPrefix}-skin)"
          />

          {/* Голова */}
          <g
            transform={`translate(0 ${headNod}) rotate(${headTilt} 250 215)`}
          >
            <path
              d="M180 145 Q180 75 250 75 Q320 75 320 145 L310 255 Q300 320 250 325 Q200 320 190 255 Z"
              fill="url(#${gradientPrefix}-skin)"
              stroke="#9c6d56"
              strokeWidth="3"
            />

            {/* Вуха */}
            <ellipse cx="182" cy="210" rx="15" ry="26" fill="#c58f73" />
            <ellipse cx="318" cy="210" rx="15" ry="26" fill="#c58f73" />

            {/* Волосся */}
            <path
              d="M180 175 Q160 105 200 70 Q235 35 295 65 Q340 95 320 180 L305 145 Q280 125 255 125 Q220 130 195 155 Z"
              fill="#292522"
            />
            <path
              d="M195 115 Q225 65 275 80 Q300 85 315 115 Q280 100 255 105 Q220 100 195 140 Z"
              fill="#3b302a"
            />

            {/* Брови */}
            <path
              d="M195 185 Q215 172 235 184"
              fill="none"
              stroke="#49352d"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M265 184 Q285 172 305 185"
              fill="none"
              stroke="#49352d"
              strokeWidth="7"
              strokeLinecap="round"
            />

            {/* Очі */}
            <ellipse
              cx="215"
              cy="207"
              rx="11"
              ry={eyeHeight}
              fill="#30251f"
            />
            <ellipse
              cx="285"
              cy="207"
              rx="11"
              ry={eyeHeight}
              fill="#30251f"
            />
            <circle cx="218" cy="204" r="3" fill="#ffffff" />
            <circle cx="288" cy="204" r="3" fill="#ffffff" />

            {/* Ніс */}
            <path
              d="M248 205 L240 250 Q250 260 262 250"
              fill="none"
              stroke="#a97860"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Рот */}
            <path
              d={`M225 280 Q250 ${280 + mouthOpen} 275 280`}
              fill="none"
              stroke="#70483d"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Легка щетина */}
            <path
              d="M200 270 Q210 315 250 315 Q290 315 300 270"
              fill="none"
              stroke="#76594b"
              strokeWidth="8"
              opacity="0.22"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
