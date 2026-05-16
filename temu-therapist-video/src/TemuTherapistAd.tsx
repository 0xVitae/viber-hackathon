import { AbsoluteFill, Sequence } from "remotion";
import { colors } from "./theme";
import { Hook } from "./scenes/Hook";
import { LogoReveal } from "./scenes/LogoReveal";
import { ChatScene } from "./scenes/ChatScene";
import { ChaosScene } from "./scenes/ChaosScene";
import { BundleScene } from "./scenes/BundleScene";
import { CTAScene } from "./scenes/CTAScene";
import { Disclaimer } from "./scenes/Disclaimer";

export const FPS = 30;

// Scene timing (in seconds)
const HOOK = 2.5;
const LOGO = 2.5;
const CHAT = 5.5;
const CHAOS = 3.5;
const BUNDLE = 3.5;
const CTA = 3.5;
const DISC = 2.5;

const TOTAL = HOOK + LOGO + CHAT + CHAOS + BUNDLE + CTA + DISC; // 23.5s
export const DURATION_IN_FRAMES = Math.round(TOTAL * FPS);

const s = (n: number) => Math.round(n * FPS);

export const TemuTherapistAd: React.FC = () => {
  let cursor = 0;
  const next = (dur: number) => {
    const from = cursor;
    cursor += s(dur);
    return { from, durationInFrames: s(dur) };
  };

  const hook = next(HOOK);
  const logo = next(LOGO);
  const chat = next(CHAT);
  const chaos = next(CHAOS);
  const bundle = next(BUNDLE);
  const cta = next(CTA);
  const disc = next(DISC);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.cream, overflow: "hidden" }}>
      <Sequence {...hook} premountFor={s(0.5)}>
        <Hook />
      </Sequence>
      <Sequence {...logo} premountFor={s(0.5)}>
        <LogoReveal />
      </Sequence>
      <Sequence {...chat} premountFor={s(0.5)}>
        <ChatScene />
      </Sequence>
      <Sequence {...chaos} premountFor={s(0.5)}>
        <ChaosScene />
      </Sequence>
      <Sequence {...bundle} premountFor={s(0.5)}>
        <BundleScene />
      </Sequence>
      <Sequence {...cta} premountFor={s(0.5)}>
        <CTAScene />
      </Sequence>
      <Sequence {...disc} premountFor={s(0.5)}>
        <Disclaimer />
      </Sequence>
    </AbsoluteFill>
  );
};
