import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            <i className="fa fa-home"></i> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            <i className="fa fa-shopping-bag"></i> Shop
          </Link>
        </li>
        {!isAuthenticated() && (
          <div className="ecommerce-nav-signout">
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                <i className="fa fa-user-circle"></i> Signin
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                <i className="fa fa-user-plus"></i> Signup
              </Link>
            </li>
          </div>
        )}

        {isAuthenticated() && (
          <div className="ecommerce-nav-signout">
            {isAuthenticated().user.role === 1 ? (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/admin/dashboard")}
                  to="/admin/dashboard"
                >
                  <i className="fa fa-th"></i> Dashboard
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/user/dashboard")}
                  to="/user/dashboard"
                >
                  <i className="fa fa-th"></i> Dashboard
                </Link>
              </li>
            )}
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                <i className="fa fa-power-off"></i> Signout
              </span>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
