import React from "react";
import { atom, useRecoilState } from "recoil";

export const locationState = atom({
  key: "locationState",
  default: {
    coords: {
      latitude: 0,
      longitude: 0,
    },
  },
});

const useLocation = () => {
  const [location, setLocation] = useRecoilState(locationState);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => setLocation(location),
      (e) => console.log(e),
      { enableHighAccuracy: true }
    );
  }, [setLocation]);

  return [location, setLocation];
};

export default useLocation;
