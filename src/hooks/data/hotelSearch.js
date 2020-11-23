import { useDebugValue } from "react";
import fetcher from "../../services/fetcher";
import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { zoomState } from "../state/viewport";
import { searchOptionsState } from "../state/searchOptions";

const fixedNumber = (value, decimals) => Number(value.toFixed(decimals));

const useHotelSearch = () => {
  const zoom = useRecoilValue(zoomState);
  let {
    lat,
    lon,
    checkin,
    checkout,
    local = "en_US",
    cur = "USD",
    rooms,
    limitLatLong = true,
    pageNumber = 1,
  } = useRecoilValue(searchOptionsState);

  const isValid = lat > 0 && lon > 0 && zoom > 10;

  if (limitLatLong) {
    lat = fixedNumber(lat, 1);
    lon = fixedNumber(lon, 1);
  }

  const url = `https://hotels-com-free.p.rapidapi.com/srle/listing/v1/brands/hotels.com?checkIn=${checkin}&checkOut=${checkout}&lat=${lat}&lon=${lon}&locale=${local}&rooms=${rooms}&currency=${cur}&pageNumber=${pageNumber}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
    },
  };
  const { data, error } = useSWR(
    isValid ? url : null,
    (url) => fetcher(url, options),
    {
      dedupingInterval: 20000,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 429
        if (error.status === 429) return;
      },
    }
  );

  const hasData = data && data.data && data.data.body;

  const total = hasData ? data.data.body.searchResults.totalCount : 0;

  useDebugValue({ lat, lon, pageNumber, total });

  return {
    data: !error && hasData ? data.data.body.searchResults.results : [],
    isLoading: !error && !data && isValid,
    error,
    total,
  };
};
export default useHotelSearch;
