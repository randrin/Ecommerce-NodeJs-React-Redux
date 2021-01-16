import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./components/core/Menu";
import Routes from "./components/routes/Routes";

const EcommerceApp = () => {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Route component={Routes} />
      </BrowserRouter>
    </>
  );
};

export default EcommerceApp;
