import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Typeahead from "../typeahead/Typeahead";
import useCitySearch from "../../hooks/citySearch";

const SearchIcon = () => (
  <>
    <span className="text-gray-100 px-2 py-2 mx-2 text-sm">Search</span>
    <FontAwesomeIcon
      icon={faSearchLocation}
      className="fill-current text-gray-100"
    ></FontAwesomeIcon>
  </>
);

const SpinnerIcon = () => (
  <>
    <span className="text-gray-100 px-2 py-2 mx-2 text-sm">Loading</span>
    <FontAwesomeIcon
      icon={faSpinner}
      className="fa-spin fill-current text-gray-100"
    ></FontAwesomeIcon>
  </>
);

const Menu = ({ searchOptions, loading, onLoadMore, onSearch }) => {
  const init = () => ({ ...searchOptions });

  const searchOptionsReducer = (state, action) => {
    switch (action.type) {
      case "location":
        return { ...state, location: action.value };
      case "checkin":
        return { ...state, checkin: action.value };
      case "checkout":
        return { ...state, checkout: action.value };
      case "rooms":
        return { ...state, rooms: action.value };
      case "latlon":
        return { ...state, lat: action.value.lat, lon: action.value.lon };
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

  const { cities, isLoading, error } = useCitySearch(newSearchOptions.location);


  const onLocationChange = (value) => {
    if (value !== newSearchOptions.location) {
      dispatch({ type: "location", value });
    }
  };

  const onLocationSelected = (city) => {
    dispatch({
      type: "latlon",
      value: { lat: city.latitude, lon: city.longitude },
    });
  };

  React.useEffect(() => dispatch({ type: "reset" }), [searchOptions]);

  return (
    <form className="rounded-lg mx-4 my-4 bg-gray-200 px-4 py-4">
      <div className="grid grid-cols-2 lg:flex lg:justify-between">
        <Typeahead
          name="location"
          options={cities || []}
          value={newSearchOptions.location || 'Near Me'}
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
            disabled={loading}
            className="ml-4 rounded border border-black bg-gray-800 hover:bg-gray-600 text-white"
            onClick={() => onSearch(newSearchOptions)}
          >
            <span className="px-4 text-center">
              {loading ? <SpinnerIcon /> : <SearchIcon />}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Menu;
