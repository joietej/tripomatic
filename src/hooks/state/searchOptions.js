import { atom, selector, useRecoilState, DefaultValue } from "recoil";
import { locationState } from "./location";
import { zoomState } from "./viewport";

const today = new Date();
const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
const formatDate = (date) => date.toISOString().split("T")[0];

const setStateValue = (set, state, newValue, value) =>
  set(state, newValue instanceof DefaultValue ? newValue : value);

export const defaultSearchOptions = {
  checkin: formatDate(today),
  checkout: formatDate(tomorrow),
  rooms: 1,
  adults: 2,
  children: 0,
};

export const optionsState = atom({
  key: "optionsState",
  default: defaultSearchOptions,
});

export const searchOptionsState = selector({
  key: "searchOptionsState",
  get: ({ get }) => {
    const { coords } = get(locationState);
    const options = get(optionsState);
    return {
      ...options,
      lat: coords.latitude,
      lon: coords.longitude,
    };
  },
  set: ({ set }, newValue) => {
    setLocationState(set, newValue);
    setOptionsState(set, newValue);
    setZoomState(set, newValue);
  },
});

const setZoomState = (set, newValue) =>
  setStateValue(set, zoomState, newValue, 11);

const setOptionsState = (set, newValue) =>
  setStateValue(set, optionsState, newValue, {
    checkin: newValue.checkin,
    checkout: newValue.checkout,
    rooms: newValue.rooms,
  });

const setLocationState = (set, newValue) =>
  setStateValue(set, locationState, newValue, {
    coords: {
      latitude: newValue.lat,
      longitude: newValue.lon,
    },
  });

const useSearchOptions = () => {
  const [searchOptions, setSearchOptions] = useRecoilState(searchOptionsState);

  return [searchOptions, setSearchOptions];
};

export default useSearchOptions;
