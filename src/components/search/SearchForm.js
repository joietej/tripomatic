import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation, faSpinner } from "@fortawesome/free-solid-svg-icons";

import LocationAutoComplete from "./LocationAutoComplete";
import useSearchOptions from "../../hooks/state/searchOptions";

import useLocationSearch from "../../hooks/data/locationSearch";

const SearchIcon = () => (
  <FontAwesomeIcon
    icon={faSearchLocation}
    className="fill-current text-gray-100"
  ></FontAwesomeIcon>
);

const SpinnerIcon = () => (
  <FontAwesomeIcon
    icon={faSpinner}
    className="fa-spin fill-current text-gray-100"
  ></FontAwesomeIcon>
);

const SearchForm = ({ loading }) => {
  const [searchOptions, setSearchOptions] = useSearchOptions();
  const init = () => ({ ...searchOptions });

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
        return init();
      default:
        return state;
    }
  };

  const [newSearchOptions, dispatch] = React.useReducer(
    searchOptionsReducer,
    searchOptions,
    init
  );

  const [searchLocation, setSearchLocation] = React.useState(null);

  const { locations, isLoading, error } = useLocationSearch(searchLocation);

  const onLocationChange = (value) => {
    if (value && value.length > 2) {
      setSearchLocation(value);
    }
  };

  const onLocationSelected = (city) => {
    dispatch({
      type: "latlon",
      value: {
        lat: city.lat,
        lon: city.lon,
      },
    });
  };

  const onFormSumbit = (e) => {
    e.preventDefault();
    setSearchOptions(newSearchOptions);
  };

  React.useEffect(() => dispatch({ type: "reset" }), [searchOptions]);

  return (
    <form
      onSubmit={onFormSumbit}
      className="rounded-lg mx-4 my-4 bg-gray-200 px-4 py-4"
    >
      <div className="grid grid-cols-2 lg:flex lg:justify-between">
        <LocationAutoComplete
          name="location"
          locations={locations || []}
          onValueChange={onLocationChange}
          onSelection={onLocationSelected}
        />

        <div className="col-span-1  lg:flex lg:flex-1 lg:justify-evenly">
          <label htmlFor="checkin" className="w-full lg:text-center">
            Check-in
          </label>
          <input
            className="w-full bg-gray-200 border-b-2 border-black"
            name="checkin"
            type="date"
            value={newSearchOptions.checkin}
            onChange={(e) =>
              dispatch({ type: "checkin", value: e.target.value })
            }
          />
        </div>
        <div className="col-span-1 lg:flex lg:flex-1 lg:justify-evenly">
          <label htmlFor="checkout" className="w-full  lg:text-center">
            Check-out
          </label>
          <input
            className="w-full bg-gray-200 border-b-2 border-black"
            name="checkout"
            type="date"
            value={newSearchOptions.checkout}
            onChange={(e) =>
              dispatch({ type: "checkout", value: e.target.value })
            }
          />
        </div>
        <div className="col-span-1 lg:flex lg:flex-1 lg:justify-evenly">
          <label htmlFor="rooms" className="w-full lg:w-auto lg:text-center">
            Rooms
          </label>
          <input
            className="w-full lg:w-auto bg-gray-200 border-b-2 border-black"
            name="rooms"
            type="number"
            min={1}
            max={3}
            value={newSearchOptions.rooms}
            onChange={(e) => dispatch({ type: "rooms", value: e.target.value })}
          />
        </div>
        <div className="col-span-1 flex justify-end items-end">
          <button
            type="submit"
            className=".cursor-pointer ml-4 rounded border border-black bg-gray-800 hover:bg-gray-600 text-white inline-flex items-center"
          >
            {loading
              ? (<span>Search</span>)(<SpinnerIcon />)
              : (<span>Loading</span>)(<SearchIcon />)}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
