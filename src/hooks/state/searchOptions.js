import { selector, useRecoilState, DefaultValue } from "recoil";
import { locationState } from "./location";

const today = new Date();
const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
const formatDate = (date) => date.toISOString().split("T")[0];

export const defaultSearchOptions = {
  checkin: formatDate(today),
  checkout: formatDate(tomorrow),
  rooms: 1,
  adults: 2,
  children: 0,
};

export const searchOptionsState = selector({
  key: "searchOptionsState",
  get: ({ get }) => {
    const { coords } = get(locationState);
    return {
      ...defaultSearchOptions,
      lat: coords.latitude,
      lon: coords.longitude,
    };
  },
  set: ({ set }, newValue) => {
    set(
      locationState,
      newValue instanceof DefaultValue
        ? newValue
        : {
            coords: {
              latitude: newValue.lat,
              longitude: newValue.lon,
            },
          }
    );
  },
});

const useSearchOptions = () => {
  const [searchOptions, setSearchOptions] = useRecoilState(searchOptionsState);

  return [searchOptions, setSearchOptions];
};

export default useSearchOptions;
