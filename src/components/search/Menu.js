import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation, faSpinner } from "@fortawesome/free-solid-svg-icons";

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

  React.useEffect(() => dispatch({ type: "reset" }), [searchOptions]);

  return (
    <div className="rounded-lg mx-4 my-4 bg-gray-200 px-4 py-4">
      <div className="grid grid-cols-2 md:flex md:justify-between">
        <input
          className="col-span-2 bg-gray-200 border-b-2 border-black"
          name="location"
          type="text"
          value={newSearchOptions.location || "Near Me"}
          onChange={(e) =>
            dispatch({ type: "location", value: e.target.value })
          }
        />

        <div className="col-span-1  md:flex md:flex-1 md:justify-evenly">
          <label htmlFor="checkin" className="w-full md:text-center">
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
        <div className="col-span-1 md:flex md:flex-1 md:justify-evenly">
          <label htmlFor="checkout" className="w-full  md:text-center">
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
        <div className="col-span-1 md:flex md:flex-1 md:justify-evenly">
          <label htmlFor="rooms" className="w-full md:text-center">
            Rooms
          </label>
          <input
            className="w-full bg-gray-200 border-b-2 border-black"
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
            className="ml-4 rounded border border-black bg-gray-800 hover:bg-gray-600 text-white"
            onClick={() => onSearch(newSearchOptions)}
          >
            <span className="px-4 text-center">
              {loading ? <SpinnerIcon /> : <SearchIcon />}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
