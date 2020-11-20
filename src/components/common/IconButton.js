import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = ({
  type = "button",
  text,
  icon,
  spin = false,
  pulse = false,
  buttonClassName = ".cursor-pointer rounded border border-black bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 inline-flex items-center",
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
