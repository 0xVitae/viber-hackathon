import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, shadow } from "../theme";
import { PRODUCTS } from "../data";

const POSITIONS = [
  { x: 0.18, y: 0.30, rot: -8 },
  { x: 0.62, y: 0.26, rot: 6 },
  { x: 0.10, y: 0.55, rot: 4 },
  { x: 0.65, y: 0.58, rot: -5 },
  { x: 0.28, y: 0.78, rot: -3 },
  { x: 0.58, y: 0.82, rot: 7 },
];

export const BundleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({
    frame,
    fps,
    config: { damping: 9, stiffness: 200 },
  });
  const totalIn = spring({
    frame: frame - 50,
    fps,
    config: { damping: 8, stiffness: 240 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, ${colors.yellow} 0%, ${colors.orange} 60%, ${colors.orangeDeep} 100%)`,
      }}
    >
      {/* confetti */}
      {Array.from({ length: 60 }).map((_, i) => {
        const seed = i * 17;
        const baseX = (seed * 53) % 1080;
        const fallSpeed = 4 + ((seed * 7) % 6);
        const y = ((frame * fallSpeed + seed * 23) % 2400) - 200;
        const sway = Math.sin((frame + seed) / 8) * 30;
        const colorList = [
          colors.neon,
          colors.pink,
          colors.yellow,
          colors.white,
          colors.purple,
          colors.red,
        ];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: baseX + sway,
              top: y,
              width: 22,
              height: 36,
              background: colorList[i % colorList.length],
              border: `3px solid ${colors.black}`,
              transform: `rotate(${(frame + seed) * 6}deg)`,
            }}
          />
        );
      })}

      {/* header */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          transform: `scale(${headerIn}) rotate(-2deg)`,
        }}
      >
        <div
          style={{
            background: colors.purple,
            color: colors.white,
            border: `10px solid ${colors.black}`,
            borderRadius: 30,
            padding: "24px 40px",
            fontFamily: fonts.display,
            fontSize: 88,
            boxShadow: shadow(14),
            textAlign: "center",
            letterSpacing: -1,
          }}
        >
          THE TRAUMA BUNDLE™
        </div>
      </div>

      {/* mini cards exploding outward */}
      {PRODUCTS.slice(0, 6).map((p, i) => {
        const delay = 8 + i * 4;
        const enter = spring({
          frame: frame - delay,
          fps,
          config: { damping: 8, stiffness: 200 },
        });
        const pos = POSITIONS[i];
        const wiggle = Math.sin((frame + i * 7) / 6) * 2;
        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${pos.x * 100}%`,
              top: `${pos.y * 100}%`,
              transform: `scale(${enter * 0.55}) rotate(${pos.rot + wiggle}deg)`,
              transformOrigin: "center",
            }}
          >
            <div
              style={{
                background: colors.white,
                border: `8px solid ${colors.black}`,
                borderRadius: 24,
                padding: 18,
                width: 340,
                boxShadow: shadow(10),
                fontFamily: fonts.body,
              }}
            >
              <div
                style={{
                  background: colors.orangeLight,
                  borderRadius: 16,
                  height: 150,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 110,
                  border: `4px solid ${colors.black}`,
                  marginBottom: 10,
                }}
              >
                {p.emoji}
              </div>
              <div style={{ fontWeight: 900, fontSize: 24, color: colors.black, lineHeight: 1.1 }}>
                {p.name}
              </div>
              <div style={{ color: colors.orangeDeep, fontWeight: 900, fontSize: 28, marginTop: 4 }}>
                {p.price}
              </div>
            </div>
          </div>
        );
      })}

      {/* huge total at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          transform: `scale(${totalIn})`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.body,
            fontWeight: 900,
            fontSize: 38,
            color: colors.white,
            textDecoration: "line-through",
            textShadow: `3px 3px 0 ${colors.black}`,
          }}
        >
          $1,103.97
        </div>
        <div
          style={{
            background: colors.neon,
            color: colors.black,
            border: `10px solid ${colors.black}`,
            borderRadius: 28,
            padding: "26px 56px",
            fontFamily: fonts.display,
            fontSize: 130,
            boxShadow: shadow(16),
          }}
        >
          $12.66
        </div>
        <div
          style={{
            background: colors.black,
            color: colors.yellow,
            border: `6px solid ${colors.white}`,
            borderRadius: 18,
            padding: "12px 24px",
            fontFamily: fonts.body,
            fontWeight: 900,
            fontSize: 32,
          }}
        >
          + FREE CRYING PILLOW 😭
        </div>
      </div>
    </AbsoluteFill>
  );
};
