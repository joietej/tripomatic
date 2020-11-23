import React from "react";
import ReactMapGl, { Popup } from "react-map-gl";

import SearchForm from "../search/SearchForm";
import HotelMarker from "./HotelMarker";
import Hotel from "../hotel/Hotel";

import useViewport from "../../hooks/state/viewport";
import useLocation from "../../hooks/state/location";
import useHotelSearch from "../../hooks/data/hotelSearch";
import Pager from "../common/Pager";
import useSearchOptions from "../../hooks/state/searchOptions";

const Map = () => {
  useLocation();
  const [viewport, setViewport] = useViewport();
  const { data, isLoading: isDataLoading, error, total } = useHotelSearch();
  const [showPopup, setShowPopup] = React.useState(false);
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [searchOptions, setSearchOptions] = useSearchOptions();

  const togglePopup = (value) => {
    setShowPopup(value);
    if (!value) {
      setSelectedMarker(null);
    }
  };

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setShowPopup(true);
  };

  const onViewportChange = (newViewport) => {
    setViewport(newViewport);
  };

  const onPageSelected = (pageNumber) => {
    setSearchOptions({ ...searchOptions, pageNumber });
  };

  const hasLocation = viewport.latitude && viewport.longitude;

  return (
    <div>
      {hasLocation && (
        <ReactMapGl
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={onViewportChange}
        >
          {error ? (
            <pre className="text-red-600">{error.message}</pre>
          ) : (
            data.map((m) => (
              <HotelMarker
                key={m.id}
                marker={m}
                onClick={onMarkerClick}
                isSelected={m.id === selectedMarker?.id}
              />
            ))
          )}
          {showPopup && (
            <Popup
              className="opacity-80"
              latitude={selectedMarker.coordinate.lat}
              longitude={selectedMarker.coordinate.lon}
              onClose={() => togglePopup(false)}
            >
              <Hotel hotel={selectedMarker} />
            </Popup>
          )}

          <SearchForm isDataLoading={isDataLoading} />

          {total && (
            <Pager
              currentPage={searchOptions.pageNumber}
              total={total}
              data-testid="map-more-button"
              className="absolute my-8 mx-8 bottom-0 left-0"
              onPageSelected={onPageSelected}
            ></Pager>
          )}
        </ReactMapGl>
      )}
      <span className="absolute font-extrabold text-9xl text-gray-800 right-0 bottom-0 mb-8 mr-8">
        Tripomatic
      </span>
    </div>
  );
};

export default Map;
