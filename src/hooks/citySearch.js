import fetcher from "../services/fetcher";
import useSWR from "swr";

const useCitySearch = (value) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${value}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_CITY_RAPID_API_KEY,
      "x-rapidapi-host": process.env.REACT_APP_CITY_RAPID_API_HOST,
    },
  };

  const isValid = value && value.length > 3;
  const { data, error } = useSWR(
    isValid ? url : null,
    (url) => fetcher(url, options),
    {
      dedupingInterval : 20000,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 429
        if (error.status === 429) return;
      },
    }
  );

  return {
    cities: data ? data.data : [],
    isLoading: !error && !data,
    isError: error,
  };
};

export default useCitySearch;
