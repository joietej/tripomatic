import React from "react";
import { RecoilRoot } from "recoil";
import Map from "../components/map/Map";

import "./app.css";
import "mapbox-gl/dist/mapbox-gl.css";
import RecoilDebugger from "../components/RecoilDebugger";

const App = () => {
  
  return (
    <RecoilRoot>
      <RecoilDebugger />
      <Map />
    </RecoilRoot>
  );
};

export default App;
