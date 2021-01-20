import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { getOrders } from "./ApiAdmin";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const { token, user } = isAuthenticated();

  const loadOrders = () => {
    getOrders(user._id, token).then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setOrders(response);
      }
    });
  };

  const noOrders = (orders) => {
    return orders.length < 1 ? <h4>No Orders</h4> : "";
  };

  return (
    <Layout
      title="All Orders"
      description={`G'day ${user.name}, you can manage all the orders orders here?`}
      className="container col-md-8 offset-md-2"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {noOrders(orders)}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
