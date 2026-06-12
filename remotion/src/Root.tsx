import { Composition } from "remotion";
import { MainVideo, ARTHRO_PROPS, ZAMINO_PROPS, VideoProps } from "./MainVideo";

export const RemotionRoot = () => (
  <>
    <Composition
      id="arthroxtra"
      component={MainVideo}
      durationInFrames={390}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={ARTHRO_PROPS as VideoProps}
    />
    <Composition
      id="zaminocal"
      component={MainVideo}
      durationInFrames={390}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={ZAMINO_PROPS as VideoProps}
    />
  </>
);
