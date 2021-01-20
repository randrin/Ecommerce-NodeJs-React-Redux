import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { getPurchaseOrdersUser } from "./ApiUser";
import moment from "moment";

const UserDashboard = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(false);
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    init(userId, token);
  }, []);

  const init = (userId, token) => {
    loadPurchaseOrdersUser(userId, token);
  };

  const loadPurchaseOrdersUser = (userId, token) => {
    console.log("history: ", userId, token);
    getPurchaseOrdersUser(userId, token).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setHistory(data);
      }
    });
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Informations</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (histories) => (
    <div className="card mb-5">
      <h3 className="card-header">Purchase Histories</h3>
      <ul className="list-group">
        <li className="list-group-item">
          {histories.map((h, hIndex) => (
            <>
              <div key={hIndex}>
                {h.products.map((product, pIndex) => (
                  <div key={pIndex}>
                    <h6>Product Name: {product.name}</h6>
                    <h6>Product Price: {product.price} €</h6>
                    <h6>Product Date: {moment(h.createdAt).fromNow()}</h6>
                  </div>
                ))}
              </div>
              <hr />
            </>
          ))}
        </li>
      </ul>
    </div>
  );

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/user/dashboard">
              Home
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${userId}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <Layout
        title="Dashboard E-commerce App"
        description={`Welcome ${name}`}
        className="container-fluid"
      >
        <div className="row">
          <div className="col-3">{userLinks()}</div>
          <div className="col-9">
            {userInfo()}
            {purchaseHistory(history)}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default UserDashboard;
