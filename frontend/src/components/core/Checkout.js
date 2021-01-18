import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

const Checkout = ({ products }) => {
  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className="btn btn-primary">
        <i className="fa fa-money"></i> Checkout
      </button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-btn-outline-primary">
          Signin to Checkout
        </button>
      </Link>
    );
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
