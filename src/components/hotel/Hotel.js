import React from "react";
import Rating from "./Rating";
import Reviews from "./Reviews";

const Hotel = ({ hotel }) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 sm:px-4 sm:py-4 sm:gap-x-2 md:py-8"
      data-testid="hotel-popup"
    >
      <div className="relative z-10 col-start-1 sm:col-start-2 row-start-1 px-4 pt-20 pb-2 bg-gradient-to-t from-black sm:bg-none sm:">
        <div>
          <Rating ratingNumber={hotel.starRating} />
        </div>
        <p className="text-md font-medium text-white sm:text-xl md:text-2xl sm:text-gray-500">
          {hotel.ratePlan?.price?.current}
        </p>
        <h2 className="text-xl font-semibold text-white sm:text-gray-500 sm:text-2xl md:text-3xl">
          {hotel.name}
        </h2>
        <h3 className="text-xs font-medium text-white sm:text-gray-500">
          {hotel.address?.streetAddress || ""}
        </h3>
        <div className="pt-4">
          {hotel.guestReviews && <Reviews reviews={hotel.guestReviews} />}
        </div>
      </div>
      <div className="relative col-start-1 row-start-1 sm:row-span-2">
        <img
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          alt={hotel.name}
          src={hotel.thumbnailUrl}
        ></img>
      </div>
    </div>
  );
};

export default Hotel;
