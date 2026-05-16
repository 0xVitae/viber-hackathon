import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "../theme";

const DISCLAIMER =
  "Not real therapy. Not FDA approved. Not licensed in any jurisdiction. Side effects may include: buyer's remorse, mild dopamine, $300 of unsolicited plastic frogs, a tactical banana you cannot return, sudden onset of warrior energy, glowing toilets, and continued emotional damage. Temu Therapist is a satirical parody. Please seek a real therapist. Also water. Drink water.";

export const Disclaimer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // gentle upward creep
  const scroll = interpolate(frame, [0, durationInFrames], [40, -160]);

  // typewriter unlock — finish within ~1.2s
  const chars = Math.min(DISCLAIMER.length, Math.floor(frame * 14));
  const visibleText = DISCLAIMER.slice(0, chars);

  const logoBob = Math.sin(frame / 8) * 4;

  return (
    <AbsoluteFill
      style={{
        background: colors.black,
        color: colors.white,
        fontFamily: fonts.body,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 50,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 140,
          color: colors.orange,
          textShadow: `8px 8px 0 ${colors.white}`,
          transform: `translateY(${logoBob}px) rotate(-2deg)`,
          textAlign: "center",
          lineHeight: 0.95,
          letterSpacing: -2,
        }}
      >
        TEMU
        <br />
        THERAPIST™
      </div>

      <div
        style={{
          background: colors.white,
          color: colors.black,
          border: `8px solid ${colors.orange}`,
          borderRadius: 22,
          padding: "22px 30px",
          fontWeight: 900,
          fontSize: 36,
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        ⚠️ LEGAL FINE PRINT ⚠️
      </div>

      <div
        style={{
          overflow: "hidden",
          height: 480,
          width: "100%",
          maxWidth: 820,
          position: "relative",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 12%, black 85%, transparent 100%)",
        }}
      >
        <div
          style={{
            transform: `translateY(${scroll}px)`,
            fontSize: 30,
            fontWeight: 700,
            lineHeight: 1.4,
            color: colors.white,
            textAlign: "center",
          }}
        >
          {visibleText}
          <span
            style={{
              opacity: (frame % fps) < fps / 2 ? 1 : 0,
            }}
          >
            ▌
          </span>
        </div>
      </div>

      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 36,
          color: colors.neon,
          letterSpacing: 1,
          textAlign: "center",
        }}
      >
        © 2026 · A SATIRICAL PARODY · GO TOUCH GRASS
      </div>
    </AbsoluteFill>
  );
};
