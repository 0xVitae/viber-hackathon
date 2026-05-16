import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, shadow } from "../theme";
import { Popup } from "../components/Popup";
import { POPUPS } from "../data";

export const ChaosScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // shake the whole scene
  const intensity = interpolate(frame, [0, 30, 90], [0, 4, 10], {
    extrapolateRight: "clamp",
  });
  const shakeX = (Math.random() - 0.5) * intensity * 0;
  const shakeY = Math.sin(frame * 1.7) * intensity * 0.3;

  const bg = interpolate(frame, [0, 30], [0, 1]);
  const flash = Math.floor(frame / 4) % 2 === 0 ? colors.orange : colors.yellow;

  // Spin wheel
  const wheelRot = (frame / fps) * 720;
  const wheelIn = spring({
    frame: frame - 6,
    fps,
    config: { damping: 9, stiffness: 200 },
  });

  // countdown
  const totalSec = 12;
  const sec = Math.max(0, totalSec - Math.floor(frame / fps));
  const countPop = (frame % fps) < 6 ? 1.15 : 1;

  const popupSchedule = [
    { delay: 0, life: 60, x: 60, y: 280, rotate: -6, color: colors.yellow },
    { delay: 14, life: 60, x: 580, y: 200, rotate: 4, color: colors.pink },
    { delay: 28, life: 55, x: 90, y: 1280, rotate: 5, color: colors.neon },
    { delay: 42, life: 55, x: 540, y: 1380, rotate: -3, color: colors.orange },
    { delay: 56, life: 50, x: 50, y: 720, rotate: -2, color: colors.purple },
    { delay: 70, life: 45, x: 540, y: 1100, rotate: 6, color: colors.red },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.orangeDeep} 0%, ${flash} 100%)`,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* moving sale ticker top */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          background: colors.red,
          borderTop: `6px solid ${colors.black}`,
          borderBottom: `6px solid ${colors.black}`,
          padding: "16px 0",
          overflow: "hidden",
          opacity: bg,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 80,
            whiteSpace: "nowrap",
            transform: `translateX(${-((frame * 14) % 2000)}px)`,
            fontFamily: fonts.display,
            fontSize: 56,
            color: colors.white,
            letterSpacing: 1,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>FLASH SALE · 74% OFF · ENDS NOW · HEALING DEPT ·</span>
          ))}
        </div>
      </div>

      {/* countdown */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: colors.black,
            color: colors.red,
            border: `8px solid ${colors.white}`,
            borderRadius: 28,
            padding: "20px 40px",
            fontFamily: fonts.display,
            fontSize: 110,
            transform: `scale(${countPop})`,
            boxShadow: shadow(12, colors.red),
            minWidth: 280,
            textAlign: "center",
          }}
        >
          00:{sec.toString().padStart(2, "0")}
        </div>
      </div>

      {/* spin wheel center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${wheelIn})`,
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: 680,
              height: 680,
              borderRadius: "50%",
              border: `14px solid ${colors.black}`,
              boxShadow: shadow(16),
              transform: `rotate(${wheelRot}deg)`,
              background: `conic-gradient(${colors.orange} 0deg 45deg, ${colors.yellow} 45deg 90deg, ${colors.neon} 90deg 135deg, ${colors.pink} 135deg 180deg, ${colors.purple} 180deg 225deg, ${colors.red} 225deg 270deg, ${colors.green} 270deg 315deg, ${colors.gold} 315deg 360deg)`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {[
              "$0.99",
              "50% OFF",
              "FREE 🦐",
              "BUNDLE",
              "TRY AGAIN",
              "🎁",
              "VIP",
              "FREE 🐸",
            ].map((label, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${i * 45 + 22.5}deg) translate(0, -240px) rotate(-90deg)`,
                  transformOrigin: "0 0",
                  fontFamily: fonts.display,
                  fontSize: 42,
                  color: colors.black,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </div>
            ))}
          </div>
          {/* center hub */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: colors.white,
              border: `10px solid ${colors.black}`,
              boxShadow: shadow(8),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.display,
              fontSize: 42,
            }}
          >
            SPIN
          </div>
          {/* pointer */}
          <div
            style={{
              position: "absolute",
              top: -40,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "30px solid transparent",
              borderRight: "30px solid transparent",
              borderTop: `60px solid ${colors.black}`,
            }}
          />
        </div>
      </div>

      {/* SPIN NOW button (bottom) */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: colors.red,
            color: colors.white,
            border: `8px solid ${colors.black}`,
            borderRadius: 999,
            padding: "26px 60px",
            fontFamily: fonts.display,
            fontSize: 70,
            transform: `rotate(${Math.sin(frame / 4) * 3}deg)`,
            boxShadow: shadow(14),
            letterSpacing: 1,
          }}
        >
          SPIN NOW!!!
        </div>
      </div>

      {/* popups */}
      {popupSchedule.map((p, i) => (
        <Popup
          key={i}
          text={POPUPS[i % POPUPS.length]}
          color={p.color}
          delay={p.delay}
          life={p.life}
          x={p.x}
          y={p.y}
          rotate={p.rotate}
        />
      ))}
    </AbsoluteFill>
  );
};
