import React from "react";
import { Popup } from "react-map-gl";

const HotelPopup = ({ marker, onClose }) => {
  return (
    <Popup
      latitude={marker.coordinate.lat}
      longitude={marker.coordinate.lon}
      onClose={() => onClose(false)}
    >
      <div>{marker.name}</div>
      <div>{marker.ratePlan?.price?.current}</div>
      <img alt="hotel" src={marker.thumbnailUrl}></img>
    </Popup>
  );
};

export default HotelPopup;
