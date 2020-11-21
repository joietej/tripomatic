import React from "react";
import useSearchOptions from "../state/searchOptions";

const useSearchOptionsReducer = () => {
  const [searchOptions, setSearchOptions] = useSearchOptions();

  const searchOptionsReducer = (state, action) => {
    switch (action.type) {
      case "checkin":
        return { ...state, checkin: action.value };
      case "checkout":
        return { ...state, checkout: action.value };
      case "rooms":
        return { ...state, rooms: action.value };
      case "latlon":
        return {
          ...state,
          lat: action.value.lat,
          lon: action.value.lon,
        };
      case "reset":
        return { ...searchOptions };
      default:
        return state;
    }
  };

  React.useEffect(() => dispatch({ type: "reset" }), [searchOptions]);

  const [newSearchOptions, dispatch] = React.useReducer(
    searchOptionsReducer,
    searchOptions
  );

  return { newSearchOptions, dispatch, setSearchOptions };
};

export default useSearchOptionsReducer;
