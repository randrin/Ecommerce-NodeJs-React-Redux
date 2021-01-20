import React from "react";
import { Switch, Route } from "react-router-dom";
import AddCategory from "../admin/AddCategory";
import AddProduct from "../admin/AddProduct";
import Orders from "../admin/Orders";
import AdminRoute from "../auth/AdminRoute";
import PrivateRoute from "../auth/PrivateRoute";
import Cart from "../core/Cart";
import Product from "../core/Product";
import Shop from "../core/Shop";
import Home from "../store/Home";
import AdminDashboard from "../admin/AdminDashboard";
import Profile from "../user/Profile";
import Signin from "../user/Signin";
import Signup from "../user/Signup";
import UserDashboard from "../user/UserDashboard";
import ManageProducts from "../admin/ManageProducts";
import UpdateProduct from "../admin/UpdateProduct";
import Error404 from "../store/Error404";

const Routes = () => (
  <Switch>
    <Route exact path="/" strict component={Home} />
    <Route exact path="/signin" strict component={Signin} />
    <Route exact path="/signup" strict component={Signup} />
    <Route exact path="/shop" strict component={Shop} />
    <Route exact path="/cart" strict component={Cart} />
    <Route exact path="/product/:productId" strict component={Product} />
    <PrivateRoute exact path="/user/dashboard" strict component={UserDashboard} />
    <AdminRoute exact path="/admin/products" strict component={ManageProducts} />
    <PrivateRoute exact path="/profile/:userId" strict component={Profile} />
    <AdminRoute exact path="/admin/dashboard" strict component={AdminDashboard} />
    <AdminRoute exact path="/create/category" strict component={AddCategory} />
    <AdminRoute exact path="/create/product" strict component={AddProduct} />
    <AdminRoute exact path="/admin/product/update/:productId" strict component={UpdateProduct} />
    <AdminRoute exact path="/admin/orders" strict component={Orders} />
    <Route component={Error404} />
  </Switch>
);

export default Routes;
