import React from "react";
import ReactMapGl from "react-map-gl";

import Menu from "../search/Menu";

import HotelMarker from "./HotelMarker";
import HotelPopup from "./HotelPopup";

import useViewport from "../../hooks/viewport";
import useHotelSearch from "../../hooks/hotelSearch";
import useHotelSearchOptions from "../../hooks/hotelSearchOptions";
import useGeolocation from "../../hooks/geolocation";

const Map = () => {
  const [viewport, setViewport] = useViewport();
  const [geolocation] = useGeolocation();
  const [hotelSearchOptions, setHotelSearchOptions] = useHotelSearchOptions();
  const { data, isLoading, isError, setSize, size } = useHotelSearch(
    hotelSearchOptions
  );

  const [showPopup, setShowPopup] = React.useState(false);
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  React.useEffect(() => {
    const { latitude, longitude } = geolocation.location.coords;
    onViewportChange({ ...viewport, latitude, longitude });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geolocation]);

  const togglePopup = (value) => setShowPopup(value);

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setShowPopup(true);
  };

  const onViewportChange = (newViewport) => {
    const { latitude, longitude } = geolocation.location.coords;

    if (latitude === 0 && longitude === 0) {
      return;
    }
    setHotelSearchOptions({
      ...hotelSearchOptions,
      lat: newViewport.latitude,
      lon: newViewport.longitude,
      zoom: newViewport.zoom,
    });
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
        ) : isLoading ? (
          <div>loading...</div>
        ) : (
          data.map((m) => (
            <HotelMarker marker={m} onClick={onMarkerClick} />
          ))
        )}
        {showPopup && (
          <HotelPopup marker={selectedMarker} onClose={togglePopup} />
        )}

        <Menu
          searchOptions={hotelSearchOptions}
          onLoodMore={() => setSize(size + 1)}
          onSearch={(o) => setHotelSearchOptions(o)}
        />
      </ReactMapGl>
    </div>
  );
};

export default Map;
