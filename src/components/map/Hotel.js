import React from "react";

const Hotel = ({ hotel }) => {
  return (
    <div data-testid="hotel-popup">
      <div>{hotel.name}</div>
      <div>{hotel.ratePlan?.price?.current}</div>
      <img alt={`${hotel.name}`} src={hotel.thumbnailUrl}></img>
    </div>
  );
};

export default Hotel;
