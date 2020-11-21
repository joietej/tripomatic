import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = ({
  type = "button",
  text,
  icon,
  spin = false,
  pulse = false,
  buttonClassName = "btn inline-flex items-center",
  iconClassName = "fill-current text-gray-100 ml-2",
  ...rest
}) => {
  return (
    <button type={type} className={buttonClassName} {...rest}>
      {text}
      <FontAwesomeIcon
        icon={icon}
        spin={spin}
        pulse={pulse}
        className={iconClassName}
      ></FontAwesomeIcon>
    </button>
  );
};

export default IconButton;
