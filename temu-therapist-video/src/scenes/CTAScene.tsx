import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, shadow } from "../theme";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({
    frame,
    fps,
    config: { damping: 9, stiffness: 220 },
  });
  const subIn = spring({
    frame: frame - 14,
    fps,
    config: { damping: 11, stiffness: 200 },
  });
  const btnIn = spring({
    frame: frame - 26,
    fps,
    config: { damping: 7, stiffness: 240 },
  });
  const urlIn = spring({
    frame: frame - 50,
    fps,
    config: { damping: 14 },
  });

  const btnPulse = 1 + Math.sin(frame / 4) * 0.04;
  const arrowBounce = Math.sin(frame / 3) * 8;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.orange} 0%, ${colors.orangeDeep} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        gap: 60,
      }}
    >
      {/* sunburst */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-conic-gradient(from 0deg, rgba(255,255,255,0.14) 0deg 10deg, transparent 10deg 20deg)",
          transform: `rotate(${(frame / fps) * 24}deg)`,
        }}
      />

      <div
        style={{
          transform: `scale(${titleIn}) rotate(-2deg)`,
          fontFamily: fonts.display,
          fontSize: 180,
          color: colors.white,
          textShadow: `10px 10px 0 ${colors.black}`,
          textAlign: "center",
          lineHeight: 0.95,
          letterSpacing: -2,
        }}
      >
        HEAL
        <br />
        YOURSELF
      </div>

      <div
        style={{
          transform: `scale(${subIn})`,
          background: colors.yellow,
          color: colors.black,
          border: `8px solid ${colors.black}`,
          borderRadius: 24,
          padding: "18px 36px",
          fontFamily: fonts.body,
          fontWeight: 900,
          fontSize: 48,
          boxShadow: shadow(12),
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        15 products under $10
        <br />
        delivered in 8–47 days
      </div>

      <div
        style={{
          transform: `scale(${btnIn * btnPulse})`,
          background: colors.neon,
          color: colors.black,
          border: `12px solid ${colors.black}`,
          borderRadius: 999,
          padding: "32px 70px",
          fontFamily: fonts.display,
          fontSize: 96,
          boxShadow: shadow(18),
          letterSpacing: -1,
        }}
      >
        ADD ALL TO CART
      </div>

      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 64,
          color: colors.white,
          textShadow: `5px 5px 0 ${colors.black}`,
          transform: `translateY(${arrowBounce}px) scale(${urlIn})`,
        }}
      >
        ↓
      </div>

      <div
        style={{
          transform: `scale(${urlIn})`,
          background: colors.black,
          color: colors.neon,
          border: `6px solid ${colors.white}`,
          borderRadius: 20,
          padding: "18px 32px",
          fontFamily: fonts.display,
          fontSize: 56,
          letterSpacing: 1,
        }}
      >
        temu-therapist.app
      </div>
    </AbsoluteFill>
  );
};
