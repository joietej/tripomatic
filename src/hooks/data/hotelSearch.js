import fetcher from "../../services/fetcher";
import { useSWRInfinite } from "swr";

const fixedNumber = (value, decimals) => Number(value.toFixed(decimals));

const useHotelSearch = ({
  lat = 0,
  lon = 0,
  checkin = 0,
  checkout = 0,
  zoom = 11,
  local = "en_US",
  cur = "USD",
  rooms = 1,
  limitLatLong = true,
}) => {
  const isValid = lat > 0 && lon > 0 && zoom > 10;

  if (limitLatLong) {
    lat = fixedNumber(lat, 1);
    lon = fixedNumber(lon, 1);
  }

  const url = `https://hotels-com-free.p.rapidapi.com/srle/listing/v1/brands/hotels.com?checkIn=${checkin}&checkOut=${checkout}&lat=${lat}&lon=${lon}&locale=${local}&rooms=${rooms}&currency=${cur}`;

  const getKey = (pageIndex, previousPageData) => {
    const key =
      pageIndex === 0
        ? `${url}&pageNumber=1`
        : previousPageData
        ? `${url}&pageNumber=${pageIndex + 1}`
        : null;
    return key;
  };

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
    },
  };
  const { data, size, setSize, error } = useSWRInfinite(
    isValid ? getKey : null,
    (url) => fetcher(url, options),
    {
      initialSize: 1,
      revalidateAll: false,
      persistSize: true,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 429
        if (error.status === 429) return;
      },
    }
  );

  ;

  return {
    data:
      !error && data && data.length
        ? data.flatMap((x) =>
            x && x.data ? x.data.body.searchResults.results : []
          )
        : [],
    isLoading: !error && !data && isValid,
    isError: error,
    setSize,
    size,
  };
};
export default useHotelSearch;
