import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { getUserInfos, updateUserInfos } from "./ApiUser";

const Profile = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const userName = isAuthenticated() && isAuthenticated().user.name;
  const { name, email, password, error, success } = user;

  useEffect(() => {
    init(props.match.params.userId);
  }, []);

  const init = (userId) => {
    console.log("userId: ", userId);
    getUserInfos(userId, token).then((data) => {
      if (data.error) {
        setUser({ ...user, error: true });
      } else {
        setUser({ ...user, name: data.name, email: data.email });
      }
    });
  };

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

  const userProfile = () => {
    return <h2>{JSON.stringify(user)}</h2>;
  };

  return (
    <div>
      <Layout
        title="Profile E-commerce App"
        description={`Welcome ${userName}`}
        className="container-fluid"
      >
        <div className="row">
          <div className="col-3">{userLinks()}</div>
          <div className="col-9">{userProfile()}</div>
        </div>
      </Layout>
    </div>
  );
};

export default Profile;
