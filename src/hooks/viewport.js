import { atom, useRecoilState } from "recoil";

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
  return [viewport, setViewport];
};

export default useViewport;
