import React from "react";
import { Switch, Route } from "react-router-dom";
import AddCategory from "../admin/AddCategory";
import AddProduct from "../admin/AddProduct";
import AdminRoute from "../auth/AdminRoute";
import PrivateRoute from "../auth/PrivateRoute";
import Product from "../core/Product";
import Shop from "../core/Shop";
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
    <Route exact path="/shop" strict component={Shop} />
    <Route exact path="/product/:productId" strict component={Product} />
    <PrivateRoute exact path="/user/dashboard" strict component={UserDashboard} />
    <AdminRoute exact path="/admin/dashboard" strict component={AdminDashboard} />
    <AdminRoute exact path="/create/category" strict component={AddCategory} />
    <AdminRoute exact path="/create/product" strict component={AddProduct} />
  </Switch>
);

export default Routes;
