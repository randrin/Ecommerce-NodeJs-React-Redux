import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../store/Home";
import Signin from "../user/Signin";
import Signup from "../user/Signup";

const Routes = (props) => (
  <Switch>
    <Route exact path="/" strict component={Home} />
    <Route exact path="/signin" strict component={Signin} />
    <Route exact path="/signup" strict component={Signup} />
  </Switch>
);

export default Routes;
