import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, shadow } from "../theme";

const LINES = [
  { text: "Feeling sad?", color: colors.orange, emoji: "😢" },
  { text: "Burnt out?", color: colors.red, emoji: "🔥" },
  { text: "Lonely?", color: colors.purple, emoji: "🥺" },
  { text: "Empty inside?", color: colors.black, emoji: "🕳️" },
];

const SLOT = 18; // frames per line

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // background pulse
  const pulse = 0.5 + 0.5 * Math.sin((frame / fps) * Math.PI * 4);
  const bg = `radial-gradient(circle at 50% 40%, ${colors.orange} 0%, ${colors.orangeDeep} ${50 + pulse * 10}%, #2a1500 100%)`;

  const outAnim = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 200 },
    durationInFrames: 12,
  });

  return (
    <AbsoluteFill style={{ background: bg, opacity: 1 - outAnim }}>
      {/* floating emoji background */}
      {["💸", "🛒", "📦", "🦐", "😭", "🐸", "🦆", "🎁"].map((e, i) => {
        const t = (frame / fps + i * 0.3) % 3;
        const opacity = interpolate(t, [0, 0.5, 2.5, 3], [0, 0.5, 0.5, 0]);
        const left = (i * 137) % 100;
        const top = 20 + ((i * 53) % 70);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top - t * 8}%`,
              fontSize: 90,
              opacity,
              transform: `rotate(${(i * 27) % 40 - 20}deg)`,
            }}
          >
            {e}
          </div>
        );
      })}

      {/* center stack */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: 80,
        }}
      >
        {LINES.map((line, i) => {
          const localStart = i * SLOT;
          const enter = spring({
            frame: frame - localStart,
            fps,
            config: { damping: 8, stiffness: 220 },
          });
          const visible = frame >= localStart;
          const wiggle = visible
            ? Math.sin((frame - localStart) / 2) * 1.5
            : 0;
          return (
            <div
              key={line.text}
              style={{
                transform: `scale(${enter}) rotate(${wiggle}deg)`,
                opacity: visible ? 1 : 0,
                background: colors.white,
                border: `8px solid ${colors.black}`,
                borderRadius: 28,
                padding: "22px 44px",
                boxShadow: shadow(12),
                display: "flex",
                alignItems: "center",
                gap: 22,
              }}
            >
              <span style={{ fontSize: 88 }}>{line.emoji}</span>
              <span
                style={{
                  fontFamily: fonts.display,
                  fontSize: 96,
                  color: line.color,
                  letterSpacing: -1,
                }}
              >
                {line.text}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
