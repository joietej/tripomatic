import { atom, useRecoilState } from "recoil";

const today = new Date();
const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
const formatDate = (date) => date.toISOString().split("T")[0];

export const hotelSearchOptionsState = atom({
  key: "hotelSearchOptionsState",
  default: {
    location:'',
    lat: 0,
    lon: 0,
    checkin: formatDate(today),
    checkout: formatDate(tomorrow),
    rooms: 1,
    zooms:13
  },
});

const useHotelSearchOptions = () => {
  const [hotelSearchOptions, setHotelSearchOptions] = useRecoilState(
    hotelSearchOptionsState
  );

  return [hotelSearchOptions, setHotelSearchOptions];
};

export default useHotelSearchOptions;
