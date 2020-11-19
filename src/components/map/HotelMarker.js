import React from "react";
import { Marker } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

const HotelMarker = ({ marker, isSelected, onClick }) => {
  return (
    <Marker
      latitude={marker.coordinate.lat}
      longitude={marker.coordinate.lon}
    >
      <div title={marker.name} onClick={() => onClick(marker)}>
        <FontAwesomeIcon
          icon={faHotel}
          color={isSelected ? 'black': 'dimgray'} pulse={isSelected}
        ></FontAwesomeIcon>
      </div>
    </Marker>
  );
};

export default HotelMarker;
