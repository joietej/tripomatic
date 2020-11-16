import React from "react";
import { Marker } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

const HotelMarker = ({ marker, onClick }) => {
  return (
    <Marker
      latitude={marker.coordinate.lat}
      longitude={marker.coordinate.lon}
    >
      <div title={marker.name} onClick={() => onClick(marker)}>
        <FontAwesomeIcon
          icon={faHotel}
          style={{ color: 'blue' }}
        ></FontAwesomeIcon>
      </div>
    </Marker>
  );
};

export default HotelMarker;
