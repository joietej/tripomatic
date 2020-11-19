import React from "react";
export const Popup = ({ children, ...rest }) => {
  return <div data-testid="map-gl-popup">{children}</div>;
};

 const ReactMapGl = ({ children, ...rest }) => {
    return <div data-testid="map-gl-map">{children}</div>;
 };

 export default ReactMapGl;
  