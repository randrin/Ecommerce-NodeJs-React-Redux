import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getBraintreeClientToken } from "./ApiCore";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({
          ...data,
          clientToken: data.clientToken,
          success: data.success,
        });
      }
    });
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
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

  const showDropIn = () => (
    <div>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{ authorization: data.clientToken }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button className="btn btn-success" onClick={checkout()}>
            <i className="fa fa-money"></i> Checkout
          </button>
        </div>
      ) : null}
    </div>
  );

  const checkout = () => {};

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
