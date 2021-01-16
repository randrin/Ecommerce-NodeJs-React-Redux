import React, { useState } from "react";
import Layout from "../core/Layout";
import { API } from "../../config";

const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    sucess: false
  });

  const { email, password, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signInForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Email <span>*</span></label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password <span>*</span></label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
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
        {signInForm()}
      </Layout>
    </div>
  );
};

export default Signin;
