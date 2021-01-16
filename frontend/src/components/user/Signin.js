import React, { useState } from "react";
import Layout from "../core/Layout";
import { signin, authentificate, isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

const Signin = () => {
  const [values, setValues] = useState({
    email: "nzeukangrandrin@gmail.fr",
    password: "123456789",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authentificate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => (
    <div
      className="alert alert-info"
      style={{ display: loading ? "" : "none" }}
    >
      <h2>Loading ....</h2>
      <p>Please wait.</p>
    </div>
  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const signInForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">
            Email <span>*</span>
          </label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">
            Password <span>*</span>
          </label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  return (
    <div>
      <Layout
        title="Sign In E-commerce App"
        description="FullStack React Node MongoDB Ecommerce App"
        className="container col-md-8 offset-md-2"
      >
        {showLoading()}
        {showError()}
        {signInForm()}
        {redirectUser()}
      </Layout>
    </div>
  );
};

export default Signin;
