import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts, shadow } from "../theme";

type Props = {
  text: string;
  color?: string;
  delay?: number;
  life?: number;
  x: number;
  y: number;
  rotate?: number;
};

export const Popup: React.FC<Props> = ({
  text,
  color = colors.yellow,
  delay = 0,
  life = 90,
  x,
  y,
  rotate = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;
  if (local < 0 || local > life) return null;

  const enter = spring({
    frame: local,
    fps,
    config: { damping: 9, stiffness: 220 },
  });
  const exit = interpolate(local, [life - 8, life], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = enter * (1 - exit);
  const scale = enter * (1 - exit);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        opacity,
      }}
    >
      <div
        style={{
          background: color,
          border: `5px solid ${colors.black}`,
          color: colors.black,
          padding: "14px 22px",
          borderRadius: 18,
          fontFamily: fonts.body,
          fontWeight: 900,
          fontSize: 28,
          maxWidth: 540,
          boxShadow: shadow(8),
          lineHeight: 1.1,
        }}
      >
        {text}
      </div>
    </div>
  );
};
