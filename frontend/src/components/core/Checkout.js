import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getBraintreeClientToken, getBraintreeProcessPayment } from "./ApiCore";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./CartHelpers";

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
          clientToken: data.clientToken,
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

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your payment was successful!
    </div>
  );

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{ authorization: data.clientToken }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button className="btn btn-success btn-block" onClick={pay}>
            <i className="fa fa-money"></i> Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const pay = () => {
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data);
        nonce = data.nonce;
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        // and also total to be charged
        // console.log(
        //   "Send nonce and total to process: ",
        //   nonce,
        //   getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };
        getBraintreeProcessPayment(userId, token, paymentData).then((data) => {
          if (data.error) {
            // console.log("Payment error: ", data);
            setData({ ...data, error: data.error });
          } else {
            // console.log("Payment success: ", data);
            setData({
              ...data,
              success: data.success,
            });
            emptyCart(() => {
                console.log("Payment success and empty cart...")
            });
          }
        });
      })
      .catch((error) => {
        // console.log("DropIn error: ", error);
        setData({ ...data, error: error.message });
      });
  };

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
