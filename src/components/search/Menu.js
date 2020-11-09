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
    <div className="rounded bg-gray-100 mx-4 my-4">
      <div className="md:flex md:justify-between space-x-2">
        <div className="space-x-2">
          <input
            name="location"
            type="text"
            value={newSearchOptions.location || "Near Me"}
            onChange={(e) =>
              dispatch({ type: "location", value: e.target.value })
            }
          />
        </div>
        <div className="space-x-2">
          <label htmlFor="checkin">Checkin</label>
          <input
            name="checkin"
            type="date"
            value={newSearchOptions.checkin}
            onChange={(e) =>
              dispatch({ type: "checkin", value: e.target.value })
            }
          />
        </div>
        <div className="space-x-2">
          <label htmlFor="checkout">Checkout</label>
          <input
            name="checkout"
            type="date"
            value={newSearchOptions.checkout}
            onChange={(e) =>
              dispatch({ type: "checkout", value: e.target.value })
            }
          />
        </div>
        <div className="space-x-2">
          <label htmlFor="rooms">Rooms</label>
          <input
            name="rooms"
            type="number"
            min={1}
            max={3}
            value={newSearchOptions.rooms}
            onChange={(e) => dispatch({ type: "rooms", value: e.target.value })}
          />
        </div>
        <div className="space-x-2">
          <button
            className="rounded bg-blue-100 hover:bg-blue-200"
            onClick={() => onSearch(newSearchOptions)}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
