import React from "react";

import { faSearchLocation, faSpinner } from "@fortawesome/free-solid-svg-icons";

import LocationAutoComplete from "./LocationAutoComplete";

import useLocationSearch from "../../hooks/data/locationSearch";
import IconButton from "../common/IconButton";
import useSearchOptionsReducer from "../../hooks/store/searchOptionsReducer";

const SearchForm = ({ loading }) => {
  const {
    newSearchOptions,
    dispatch,
    setSearchOptions,
  } = useSearchOptionsReducer();

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
    setSearchOptions(newSearchOptions);
    e.preventDefault();
  };

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
          {loading ? (
            <IconButton text="Loading" type="submit" spin icon={faSpinner} />
          ) : (
            <IconButton text="Search" type="submit" icon={faSearchLocation} />
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
