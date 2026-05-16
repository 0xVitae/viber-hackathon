import { Composition } from "remotion";
import { TemuTherapistAd, FPS, DURATION_IN_FRAMES } from "./TemuTherapistAd";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TemuTherapistAd"
      component={TemuTherapistAd}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
