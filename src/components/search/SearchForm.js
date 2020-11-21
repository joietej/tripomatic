import React from "react";

import { faSearchLocation, faSpinner } from "@fortawesome/free-solid-svg-icons";

import LocationAutoComplete from "./LocationAutoComplete";

import useLocationSearch from "../../hooks/data/locationSearch";
import IconButton from "../common/IconButton";
import { useForm } from "react-hook-form";
import useSearchOptions from "../../hooks/state/searchOptions";

const SearchForm = ({ loading }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [searchOptions, setSearchOptions] = useSearchOptions();
  const [searchLocationQuery, setSearchLocationQuery] = React.useState(null);
  const { locations, isLoading, error } = useLocationSearch(
    searchLocationQuery
  );
  const [selectedLocation, setSelectedLocation] = React.useState({
    lat: searchOptions.lat,
    lon: searchOptions.lon,
  });

  const onLocationChange = (value) => {
    if (value && value.length > 2) {
      setSearchLocationQuery(value);
    }
  };

  const onLocationSelected = ({ lat, lon }) => {
    setSelectedLocation({ lat, lon });
  };

  const onFormSumbit = ({ checkin, checkout, rooms }) => {
    const { lat, lon } = selectedLocation;
    setSearchOptions({ checkin, checkout, rooms, lat, lon });
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSumbit)}
      className="frm mx-4 my-4"
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
            className="frm-ctrl"
            name="checkin"
            type="date"
            defaultValue={searchOptions.checkin}
            ref={register}
          />
        </div>
        <div className="col-span-1 lg:flex lg:flex-1 lg:justify-evenly">
          <label htmlFor="checkout" className="w-full  lg:text-center">
            Check-out
          </label>
          <input
            className="frm-ctrl"
            name="checkout"
            type="date"
            defaultValue={searchOptions.checkout}
            ref={register}
          />
        </div>
        <div className="col-span-1 lg:flex lg:flex-1 lg:justify-evenly">
          <label htmlFor="rooms" className="w-full lg:w-auto lg:text-center">
            Rooms
          </label>
          <input
            className="frm-ctrl lg:w-auto"
            name="rooms"
            type="number"
            min={1}
            max={3}
            defaultValue={searchOptions.rooms}
            ref={register}
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
