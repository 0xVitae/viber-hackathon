import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, shadow } from "../theme";

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flashCount = 6;
  const flash = frame < flashCount ? (frame % 2 === 0 ? 1 : 0) : 0;

  const logoIn = spring({
    frame: frame - flashCount,
    fps,
    config: { damping: 9, stiffness: 180 },
  });
  const stamp = spring({
    frame: frame - 24,
    fps,
    config: { damping: 7, stiffness: 280 },
  });
  const subIn = spring({
    frame: frame - 32,
    fps,
    config: { damping: 12 },
  });

  const wobble = Math.sin(frame / 3) * 1.2;

  return (
    <AbsoluteFill
      style={{
        background: flash ? colors.white : colors.orange,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 60,
      }}
    >
      {/* sunburst */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-conic-gradient(from 0deg, rgba(255,255,255,0.18) 0deg 8deg, transparent 8deg 16deg)",
          opacity: 0.7,
          transform: `rotate(${(frame / fps) * 18}deg)`,
        }}
      />

      <div
        style={{
          position: "relative",
          transform: `scale(${logoIn}) rotate(${wobble - 2}deg)`,
          textAlign: "center",
          padding: "44px 60px",
          background: colors.white,
          border: `12px solid ${colors.black}`,
          borderRadius: 36,
          boxShadow: shadow(20),
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 140,
            color: colors.orangeDeep,
            letterSpacing: -2,
            lineHeight: 0.95,
            textShadow: `6px 6px 0 ${colors.black}`,
          }}
        >
          TEMU
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 140,
            color: colors.black,
            letterSpacing: -2,
            lineHeight: 0.95,
          }}
        >
          THERAPIST™
        </div>

        {/* slap stamp */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -50,
            transform: `scale(${stamp}) rotate(${15 + wobble * 2}deg)`,
            background: colors.red,
            color: colors.white,
            border: `6px solid ${colors.black}`,
            borderRadius: 999,
            padding: "18px 28px",
            fontFamily: fonts.display,
            fontSize: 44,
            boxShadow: shadow(8),
          }}
        >
          74% OFF
        </div>
      </div>

      <div
        style={{
          marginTop: 60,
          transform: `scale(${subIn})`,
          fontFamily: fonts.body,
          fontWeight: 900,
          fontSize: 56,
          color: colors.white,
          background: colors.black,
          padding: "18px 32px",
          border: `6px solid ${colors.white}`,
          borderRadius: 20,
          boxShadow: shadow(12, colors.orangeDeep),
          letterSpacing: 1,
        }}
      >
        HEALING. BUT AFFORDABLE.
      </div>
    </AbsoluteFill>
  );
};
