import React from "react";
import ReactMapGl from "react-map-gl";

import SearchForm from "../search/SearchForm";

import HotelMarker from "./HotelMarker";
import HotelPopup from "./HotelPopup";

import useViewport from "../../hooks/viewport";
import useHotelSearch from "../../hooks/hotelSearch";
import useHotelSearchOptions from "../../hooks/hotelSearchOptions";
import useGeolocation from "../../hooks/geolocation";

const Map = () => {
  const [geolocation] = useGeolocation();
  const [viewport, setViewport] = useViewport();
  const [hotelSearchOptions, setHotelSearchOptions] = useHotelSearchOptions();
  const { data, isLoading, isError, setSize, size } = useHotelSearch(
    hotelSearchOptions
  );
  const [showPopup, setShowPopup] = React.useState(false);
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  React.useEffect(() => {
    const { latitude, longitude } = geolocation.location.coords;

    if (latitude === 0 && longitude === 0) {
      return;
    }
    setHotelSearchOptions((current) => ({
      ...current,
      lat: latitude,
      lon: longitude,
      limitLatLong: false,
    }));

    setViewport((current) => ({ ...current, latitude, longitude }));
  }, [geolocation, setViewport, setHotelSearchOptions]);

  const togglePopup = (value) => setShowPopup(value);

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setShowPopup(true);
  };

  const onSearch = (options) => {
    setHotelSearchOptions(options);
    setViewport({ ...viewport, latitude: options.lat, longitude: options.lon });
  };

  const onViewportChange = (newViewport) => {
    setHotelSearchOptions((current) => ({
      ...current,
      lat: newViewport.latitude,
      lon: newViewport.longitude,
      zoom: newViewport.zoom,
    }));

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

        <SearchForm
          loading={isLoading}
          searchOptions={hotelSearchOptions}
          onSearch={onSearch}
        />

        <button className="absolute my-8 mx-8 px-2 py-1 bottom-0 right-0 rounded border border-black bg-gray-800 hover:bg-gray-600 text-white" onClick={() => setSize(size + 1)}>More</button>
      </ReactMapGl>
    </div>
  );
};

export default Map;
