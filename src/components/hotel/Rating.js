import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const total = new Array(5).fill();

const Rating = ({ ratingNumber = 0 }) => {
  const stars =
    !ratingNumber && !typeof ratingNumber === "number" ? 0 : ratingNumber;

  return (
    <div className="inline-block py-2 px-1 opacity-50 bg-gray-400 rounded-lg">
      {total.map((_, i) =>
        stars >= i + 1 ? (
          stars < i + 2 && stars > i + 1 ? (
            <FontAwesomeIcon key={`star${i}`} icon={faStarHalf} color="black" />
          ) : (
            <FontAwesomeIcon key={`star${i}`} icon={faStar} color="black" pulse/>
          )
        ) : (
          <FontAwesomeIcon key={`star${i}`} icon={faStar} color="gray"/>
        )
      )}
    </div>
  );
};

export default Rating;
