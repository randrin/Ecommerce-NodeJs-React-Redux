import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./ApiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name *</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <div className="mt-4">
        <button className="btn btn-outline-primary">
          <i className="fa fa-check-circle"></i> Create Category
        </button>
      </div>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created successfully.</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return (
        <h3 className="text-danger">
          Category is already created. Try another one !!!
        </h3>
      );
    }
  };

  const goBack = () => (
    <div className="mb-5">
      <Link to="/admin/dashboard" className="text-warning">
        <i className="fa fa-angle-left"></i> Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add a new category"
      description={`G'day ${user.name}, ready to add a new category?`}
      className="container col-md-8 offset-md-2"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {goBack()}
          {showSuccess()}
          {showError()}
          {newCategoryFom()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
