import React from "react";

import { selector, useRecoilState, DefaultValue } from "recoil";
import { locationState } from "./location";

import useWindowSize from "../windowSize";

const defaultViewport = {
  width: "100vw",
  height: "100vh",
  zoom: 11,
};

const viewportState = selector({
  key: "viewportState",
  get: ({ get }) => {
    const { coords } = get(locationState);
    return {
      ...defaultViewport,
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  },
  set: ({ set }, newValue) => {
    set(
      locationState,
      newValue instanceof DefaultValue
        ? newValue
        : {
            coords: {
              latitude: newValue.latitude,
              longitude: newValue.longitude,
            },
          }
    );
  },
});

const useViewport = () => {
  const [viewport, setViewport] = useRecoilState(viewportState);
  const { height, width } = useWindowSize();

  React.useEffect(() => {
    setViewport((current) => ({ ...current, height, width }));
  }, [height, width, setViewport]);

  return [viewport, setViewport];
};

export default useViewport;
