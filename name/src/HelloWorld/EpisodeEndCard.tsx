import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const EpisodeEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [8, 30], [34, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = interpolate(Math.sin(frame / 22), [-1, 1], [0.35, 0.75]);

  return (
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse at 50% 38%, #183653 0%, #0b1728 48%, #060b14 100%)",
      color: "#f5f7fa",
      fontFamily: "Arial, sans-serif",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      opacity: fade,
    }}>
      <div style={{
        position: "absolute",
        width: 820,
        height: 820,
        borderRadius: "50%",
        border: "1px solid rgba(120,180,220,0.12)",
        boxShadow: `0 0 100px rgba(48,150,220,${pulse * 0.16})`,
      }} />
      <div style={{
        position: "absolute",
        top: 330,
        width: 108,
        height: 108,
        border: "2px solid #7db9df",
        borderRadius: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(20,42,66,0.72)",
        boxShadow: "0 0 42px rgba(54,169,232,0.18)",
      }}>
        <svg width="72" height="72" viewBox="0 0 100 100">
          <path d="M50 7 L83 20 V47 C83 68 69 84 50 94 C31 84 17 68 17 47 V20 Z" fill="none" stroke="#e5eef8" strokeWidth="5" />
          <path d="M32 51 L45 64 L69 36" fill="none" stroke="#55b9e9" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ position: "absolute", top: 500, width: "88%", textAlign: "center", transform: `translateY(${titleY}px)` }}>
        <div style={{ fontSize: 62, fontWeight: 900, letterSpacing: 5 }}>HELPUA24</div>
        <div style={{ width: 250, height: 4, margin: "26px auto 42px", background: "linear-gradient(90deg, transparent, #36a9e8, transparent)" }} />
        <div style={{ fontSize: 43, lineHeight: 1.25, fontWeight: 900, letterSpacing: 2, color: "#ffffff" }}>
          ПРОДОВЖЕННЯ
          <br />
          <span style={{ color: "#72c7f2" }}>У НАСТУПНІЙ СЕРІЇ</span>
        </div>
        <div style={{ marginTop: 46, fontSize: 25, lineHeight: 1.5, color: "#c5d3e1", letterSpacing: 1 }}>
          Очікуйте нову серію.
          <br />
          Історія ще не завершена.
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 235, width: "86%", textAlign: "center", color: "#8fa8bf", fontSize: 21, letterSpacing: 3 }}>
        ПІДПИШІТЬСЯ, ЩОБ НЕ ПРОПУСТИТИ ПРОДОВЖЕННЯ
      </div>
    </AbsoluteFill>
  );
};
