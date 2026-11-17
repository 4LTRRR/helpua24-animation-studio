
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type HelloWorldProps = {
  readonly titleText: string;
  readonly titleColor: string;
};

export const HelloWorld: React.FC<HelloWorldProps> = ({
  titleText,
  titleColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame: frame - 12,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const titleOpacity = interpolate(
    frame,
    [35, 55],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const titleY = interpolate(
    frame,
    [35, 60],
    [55, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const lineWidth = interpolate(
    frame,
    [25, 65],
    [0, 420],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const glow = interpolate(
    frame,
    [0, 30, 90],
    [0, 0.8, 0.35],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#080D18",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Фонове світіння */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 43%, rgba(25, 73, 115, ${glow}), transparent 55%)`,
        }}
      />

      {/* Декоративні лінії */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "50%",
          transform: `scale(${1 + frame * 0.001})`,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 650,
          height: 650,
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "50%",
        }}
      />

      {/* Центральний знак */}
      <div
        style={{
          position: "absolute",
          top: 570,
          width: 170,
          height: 170,
          borderRadius: 38,
          border: "3px solid #D9E7F5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${logoScale}) rotate(${interpolate(frame, [0, 35], [-12, 0], { extrapolateRight: "clamp" })}deg)`,
          boxShadow: "0 0 55px rgba(42, 144, 220, 0.25)",
          backgroundColor: "#101C2D",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 100 100">
          <path
            d="M50 7 L83 20 V47 C83 68 69 84 50 94 C31 84 17 68 17 47 V20 Z"
            fill="none"
            stroke="#E5EEF8"
            strokeWidth="4"
          />
          <path
            d="M32 51 L45 64 L69 36"
            fill="none"
            stroke="#55B9E9"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Назва */}
      <div
        style={{
          position: "absolute",
          top: 800,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            letterSpacing: 5,
            color: titleColor,
          }}
        >
          {titleText}
        </div>

        <div
          style={{
            height: 4,
            width: lineWidth,
            backgroundColor: "#36A9E8",
            margin: "25px auto",
          }}
        />

        <div
          style={{
            fontSize: 27,
            letterSpacing: 8,
            color: "#B8C8D9",
            fontWeight: 600,
          }}
        >
          ІСТОРІЇ. ПРАВО. ДОПОМОГА.
        </div>
      </div>

      {/* Нижній напис */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          fontSize: 20,
          letterSpacing: 5,
          color: "#62758C",
          opacity: interpolate(frame, [80, 110], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        HELPUA24 ORIGINAL SERIES
      </div>
    </AbsoluteFill>
  );
};
