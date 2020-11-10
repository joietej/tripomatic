import React from "react";

const Menu = ({ searchOptions, onLoadMore, onSearch }) => {
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
    <div className="roundedlg bg-gray-200 mx-4 my-4">
      <div className="md:flex md:justify-evenly">
        <div className="flex flex-1 justify-start">
          <input
            className="w-full"
            name="location"
            type="text"
            value={newSearchOptions.location || "Near Me"}
            onChange={(e) =>
              dispatch({ type: "location", value: e.target.value })
            }
          />
        </div>
        <div className="flex flex-1 justify-between">
          <div className="w-1/2 md:flex">
            <label htmlFor="checkin" className="w-full  md:text-center">
              Checkin
            </label>
            <input
              className="w-full"
              name="checkin"
              type="date"
              value={newSearchOptions.checkin}
              onChange={(e) =>
                dispatch({ type: "checkin", value: e.target.value })
              }
            />
          </div>
          <div className="w-1/2 md:flex">
            <label htmlFor="checkout" className="w-full  md:text-center">
              Checkout
            </label>
            <input
              className="w-full"
              name="checkout"
              type="date"
              value={newSearchOptions.checkout}
              onChange={(e) =>
                dispatch({ type: "checkout", value: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-1 justify-evenly">
          <div className="w-1/2 md:flex">
            <label htmlFor="rooms" className="w-full md:text-center">
              Rooms
            </label>
            <input
              className="text-right w-full"
              name="rooms"
              type="number"
              min={1}
              max={3}
              value={newSearchOptions.rooms}
              onChange={(e) =>
                dispatch({ type: "rooms", value: e.target.value })
              }
            />
          </div>
          <div className="w-1/2 flex justify-end">
            <button
              className="rounded border bg-blue-400 hover:bg-blue-800 text-white"
              onClick={() => onSearch(newSearchOptions)}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
