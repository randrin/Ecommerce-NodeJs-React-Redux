import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { getUserInfos, updateUserInfos, updateProfileUser } from "./ApiUser";

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

  const updateUserProfile = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name *</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email *</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password *</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const handleChange = (name) => (e) => {
    setUser({ ...user, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    updateUserInfos(props.match.params.userId, token, {
      name,
      email,
      password,
    }).then((data) => {
      if (data.error) {
        // console.log(data.error);
        alert(data.error);
      } else {
        updateProfileUser(data, () => {
          setUser({
            ...user,
            name: data.name,
            email: data.email,
            success: true,
          });
        });
      }
    });
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
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
          <div className="col-9">
            {updateUserProfile(name, email, password)}
            {redirectUser(success)}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Profile;
