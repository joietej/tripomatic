import React from "react";
import { atom, useRecoilState } from "recoil";

export const geoLocationState = atom({
  key: "geoLocationState",
  default: { 
    location: { 
      coords: { 
        latitude: 0,
        longitude: 0 
      } 
    }, 
    error: "" },
});

const useGeolocation = () => {
  const [geolocation, setGeolocation] = useRecoilState(geoLocationState);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => setGeolocation({ ...geolocation, location }),
      (e) => setGeolocation({ ...geolocation, error: e.message }),
      { enableHighAccuracy: true }
    );
  }, []);

  return [geolocation];
};

export default useGeolocation;
