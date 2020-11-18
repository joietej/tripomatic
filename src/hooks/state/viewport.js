import React from "react";

import { atom, selector, useRecoilState, DefaultValue } from "recoil";
import { locationState } from "./location";

import useWindowSize from "../windowSize";

const defaultViewport = {
  width: "100vw",
  height: "100vh",
};

export const zoomState = atom({key:'zoomState', default: 11});

const viewportState = selector({
  key: "viewportState",
  get: ({ get }) => {
    const { coords } = get(locationState);
    const zoom = get(zoomState);
    return {
      ...defaultViewport,
      latitude: coords.latitude,
      longitude: coords.longitude,
      zoom
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
    set(
      zoomState,
      newValue instanceof DefaultValue
        ? newValue
        : newValue.zoom
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
