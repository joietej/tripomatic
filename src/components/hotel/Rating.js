import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const total = new Array(5).fill();

const Rating = ({ ratingNumber = 0 }) => {
  const stars =
    !ratingNumber && !typeof ratingNumber === "number" ? 0 : ratingNumber;

  return (
    <div>
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
