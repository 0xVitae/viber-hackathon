import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, shadow } from "../theme";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS } from "../data";

const USER_TEXT = "i feel empty inside";
const AI_TEXT = "Empty? You need stuff. Lots of stuff.\nAdding to your cart now ↓";

const typed = (text: string, frame: number, startFrame: number, charsPerFrame = 0.6) => {
  const chars = Math.max(0, Math.floor((frame - startFrame) * charsPerFrame));
  return text.slice(0, Math.min(text.length, chars));
};

export const ChatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const userStart = 6;
  const userTypingEnd = userStart + Math.ceil(USER_TEXT.length / 0.6);
  const aiBubbleStart = userTypingEnd + 6;
  const aiTypingStart = aiBubbleStart + 4;

  const userBubble = spring({
    frame: frame - userStart,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const aiBubble = spring({
    frame: frame - aiBubbleStart,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // products appear staggered AFTER AI bubble lands
  const productStart = aiTypingStart + 28;

  const userVisibleText = typed(USER_TEXT, frame, userStart);
  const aiVisibleText = typed(AI_TEXT, frame, aiTypingStart, 0.7);

  return (
    <AbsoluteFill style={{ background: colors.cream, padding: 0 }}>
      {/* phone bezel */}
      <div
        style={{
          position: "absolute",
          inset: 30,
          background: colors.black,
          borderRadius: 70,
          padding: 18,
        }}
      >
        <div
          style={{
            background: `linear-gradient(180deg, ${colors.cream} 0%, #ffe8d2 100%)`,
            borderRadius: 56,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* notch */}
          <div
            style={{
              alignSelf: "center",
              width: 200,
              height: 36,
              background: colors.black,
              borderRadius: 24,
              marginTop: 8,
            }}
          />

          {/* header */}
          <div
            style={{
              background: colors.orange,
              borderBottom: `6px solid ${colors.black}`,
              padding: "22px 28px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 48,
                  color: colors.white,
                  textShadow: `4px 4px 0 ${colors.black}`,
                  lineHeight: 1,
                }}
              >
                Temu Therapist
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 900,
                  fontSize: 20,
                  color: colors.yellow,
                  marginTop: 4,
                }}
              >
                Healing. But affordable.
              </div>
            </div>
            <div
              style={{
                background: colors.white,
                border: `4px solid ${colors.black}`,
                borderRadius: 999,
                padding: "8px 16px",
                fontFamily: fonts.body,
                fontWeight: 900,
                fontSize: 24,
              }}
            >
              🛒 0
            </div>
          </div>

          {/* messages */}
          <div style={{ flex: 1, padding: 30, position: "relative" }}>
            {/* AI welcome */}
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 20 }}>
              <Bubble role="assistant">
                Welcome to Temu Therapist™. I'm not licensed, but I AM 74% off.
              </Bubble>
            </div>

            {/* user message */}
            {frame >= userStart && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: 20,
                  transform: `scale(${userBubble})`,
                  transformOrigin: "bottom right",
                }}
              >
                <Bubble role="user">{userVisibleText || " "}</Bubble>
              </div>
            )}

            {/* AI typing indicator before bubble */}
            {frame >= userTypingEnd + 1 && frame < aiBubbleStart && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 20 }}>
                <TypingDots />
              </div>
            )}

            {/* AI reply */}
            {frame >= aiBubbleStart && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: 24,
                  transform: `scale(${aiBubble})`,
                  transformOrigin: "bottom left",
                }}
              >
                <Bubble role="assistant" highlight>
                  {aiVisibleText || " "}
                </Bubble>
              </div>
            )}

            {/* product cards slide in */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18,
                marginTop: 10,
              }}
            >
              {PRODUCTS.slice(0, 4).map((p, i) => {
                const delay = productStart + i * 8;
                const enter = spring({
                  frame: frame - delay,
                  fps,
                  config: { damping: 9, stiffness: 200 },
                });
                const slide = interpolate(enter, [0, 1], [120, 0]);
                if (frame < delay) return <div key={p.id} />;
                return (
                  <div
                    key={p.id}
                    style={{
                      transform: `translateY(${slide}px) scale(${0.55 * enter})`,
                      transformOrigin: "top left",
                      opacity: enter,
                    }}
                  >
                    <ProductCard product={p} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* input bar */}
          <div
            style={{
              borderTop: `6px solid ${colors.black}`,
              background: colors.white,
              padding: 22,
              display: "flex",
              gap: 14,
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: 1,
                border: `5px solid ${colors.black}`,
                borderRadius: 18,
                padding: "16px 20px",
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: 26,
                color: "#777",
              }}
            >
              Describe your emotional damage…
            </div>
            <div
              style={{
                background: colors.neon,
                border: `5px solid ${colors.black}`,
                borderRadius: 18,
                padding: "16px 24px",
                fontFamily: fonts.body,
                fontWeight: 900,
                fontSize: 28,
                boxShadow: shadow(6),
              }}
            >
              HEAL ▶
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Bubble: React.FC<{ role: "user" | "assistant"; children: React.ReactNode; highlight?: boolean }> = ({
  role,
  children,
  highlight,
}) => {
  const isUser = role === "user";
  return (
    <div
      style={{
        maxWidth: "78%",
        background: isUser ? colors.orange : highlight ? colors.yellow : colors.orangeLight,
        color: isUser ? colors.white : colors.black,
        border: `5px solid ${colors.black}`,
        borderRadius: 24,
        borderBottomRightRadius: isUser ? 6 : 24,
        borderBottomLeftRadius: isUser ? 24 : 6,
        padding: "18px 24px",
        fontFamily: fonts.body,
        fontWeight: 800,
        fontSize: 32,
        lineHeight: 1.2,
        whiteSpace: "pre-wrap",
        boxShadow: shadow(6),
      }}
    >
      {!isUser && (
        <div
          style={{
            fontSize: 16,
            color: colors.orangeDeep,
            fontWeight: 900,
            marginBottom: 4,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          🧠 AI Therapist (not real)
        </div>
      )}
      {children}
    </div>
  );
};

const TypingDots: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        background: colors.orangeLight,
        border: `5px solid ${colors.black}`,
        borderRadius: 24,
        borderBottomLeftRadius: 6,
        padding: "20px 26px",
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      {[0, 1, 2].map((i) => {
        const t = (frame - i * 3) / 6;
        const y = Math.sin(t) * 8 - 4;
        return (
          <div
            key={i}
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: colors.orangeDeep,
              transform: `translateY(${y}px)`,
            }}
          />
        );
      })}
    </div>
  );
};
