import React from "react";
import { atom, useRecoilState } from "recoil";
import useWindowSize from "./useWindowSize";

export const viewportState = atom({
  key: "viewportState",
  default: {
    width: "100vw",
    height: "100vh",
    zoom: 13,
    latitude: 0,
    longitude: 0,
  },
});

const useViewport = () => {
  const [viewport, setViewport] = useRecoilState(viewportState);
  const { height, width } = useWindowSize();

  React.useEffect(() => {
    if (height !== viewport.height || width !== viewport.width) {
      setViewport({ ...viewport, height, width });
    }
  }, [height, width, setViewport]);

  return [viewport, setViewport];
};

export default useViewport;
