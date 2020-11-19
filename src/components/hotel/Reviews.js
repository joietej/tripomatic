import React from "react";

const Reviews = ({ reviews }) => {
  return (
    <div className="space-x-4">
      <span className="inline bg-gray-800 px-4 py-2 text-sm font-medium text-white sm:text-gray-500 rounded-xl uppercase">
          {reviews.badgeText || "NA"}
      </span>
      <span className="inline text-sm font-medium text-white sm:text-gray-500">
          {reviews.rating || "0"}
      </span>
      <span className="inline text-sm font-medium text-white sm:text-gray-500">
      {`(${reviews.total || "0"} reviews)`}
      </span>
      
    </div>
  );
};

export default Reviews;
