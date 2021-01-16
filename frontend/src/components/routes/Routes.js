import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminRoute from "../auth/AdminRoute";
import PrivateRoute from "../auth/PrivateRoute";
import Home from "../store/Home";
import AdminDashboard from "../user/AdminDashboard";
import Signin from "../user/Signin";
import Signup from "../user/Signup";
import UserDashboard from "../user/UserDashboard";

const Routes = () => (
  <Switch>
    <Route exact path="/" strict component={Home} />
    <Route exact path="/signin" strict component={Signin} />
    <Route exact path="/signup" strict component={Signup} />
    <PrivateRoute exact path="/user/dashboard" strict component={UserDashboard} />
    <AdminRoute exact path="/admin/dashboard" strict component={AdminDashboard} />
  </Switch>
);

export default Routes;
