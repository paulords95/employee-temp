import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import StoreTemperature from "./pages/StoreTemperature/StoreTemperature";
import TemperatureList from "./pages/TemperaturesList/TemperatureList";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={StoreTemperature} />
      <Route path="/temperaturas" component={TemperatureList} />
    </BrowserRouter>
  );
};

export default Routes;
