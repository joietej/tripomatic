import React from "react";
import { Marker } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

const getColor = (rating) => {
  return rating > 4 ? "green" : rating > 3 ? "yellow" : "red";
};

const HotelMarker = ({ marker, onClick }) => {
  return (
    <Marker
      key={marker.id}
      latitude={marker.coordinate.lat}
      longitude={marker.coordinate.lon}
    >
      <div title={marker.name} onClick={() => onClick(marker)}>
        <FontAwesomeIcon
          icon={faHotel}
          style={{ color: getColor(marker.guestReviews?.rating) }}
        ></FontAwesomeIcon>
      </div>
    </Marker>
  );
};

export default HotelMarker;
