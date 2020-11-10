import React from "react";
import { atom, useRecoilState } from "recoil";

const windowSizeState = atom({
  key: "windowSizeState",
  default: { height: window.innerHeight, width: window.innerWidth },
});

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useRecoilState(windowSizeState);

  React.useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
      window.addEventListener("resize", handleResize);
    
      return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
