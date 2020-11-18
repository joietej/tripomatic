import React from "react";
import ReactMapGl from "react-map-gl";

import SearchForm from "../search/SearchForm";
import HotelMarker from "./HotelMarker";
import HotelPopup from "./HotelPopup";

import useViewport from "../../hooks/state/viewport";
import useLocation from "../../hooks/state/location";

import useHotelSearch from "../../hooks/data/hotelSearch";

const Map = () => {
  useLocation();
  const [viewport, setViewport] = useViewport();

  const { data, isLoading, isError, setSize, size } = useHotelSearch();
  const [showPopup, setShowPopup] = React.useState(false);
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  const togglePopup = (value) => setShowPopup(value);

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setShowPopup(true);
  };

  const onViewportChange = (newViewport) => {
    setViewport(newViewport);
  };

  return (
    <div>
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={onViewportChange}
      >
        {isError ? (
          <pre>Error</pre>
        ) : (
          data.map((m) => (
            <HotelMarker key={m.id} marker={m} onClick={onMarkerClick} />
          ))
        )}
        {showPopup && (
          <HotelPopup marker={selectedMarker} onClose={togglePopup} />
        )}

        <SearchForm loading={isLoading} />

        <button
          className=".cursor-pointer absolute my-8 mx-8 px-2 py-1 bottom-0 right-0 rounded border border-black bg-gray-800 hover:bg-gray-600 text-white"
          onClick={() => setSize(size + 1)}
        >
          More
        </button>
      </ReactMapGl>
    </div>
  );
};

export default Map;
