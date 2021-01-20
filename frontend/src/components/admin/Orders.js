import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { getOrders } from "./ApiAdmin";
import moment from "moment";

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

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-5">Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger">No orders</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  return (
    <Layout
      title="All Orders"
      description={`G'day ${user.name}, you can manage all the orders orders here?`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">
          {showOrdersLength()}
          {orders.map((order, oIndex) => (
            <div
              key={oIndex}
              className="mt-5"
              style={{ borderBottom: "5px solid indigo" }}
            >
              <h2 className="mb-5">
                <span className="bg-primary">order ID : {order._id}</span>
              </h2>
              <ul className="list-group mb-2">
                <li className="list-group-item">{order.status}</li>
                <li className="list-group-item">
                  Transaction ID: {order.transaction_id}
                </li>
                <li className="list-group-item">Amount: {order.amount} €</li>
                <li className="list-group-item">Order By: {order.user.name}</li>
                <li className="list-group-item">
                  Ordered On: {moment(order.createdAt).fromNow()}
                </li>
                <li className="list-group-item">
                  Delivery address: {order.address}
                </li>
              </ul>
              <h3 className="mt-4 mb-4 font-italic">
                Total products in the order: {order.products.length}
              </h3>
              {order.products.map((p, pIndex) => (
                <div
                  className="mb-4"
                  key={pIndex}
                  style={{
                    padding: "20px",
                    border: "1px solid indigo",
                  }}
                >
                  {showInput("Product name", p.name)}
                  {showInput("Product price", p.price)}
                  {showInput("Product total", p.count)}
                  {showInput("Product Id", p._id)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
