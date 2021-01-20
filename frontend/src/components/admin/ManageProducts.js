import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteProductById, getProducts } from "../admin/ApiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    loadProducts();
  };

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setProducts(data);
      }
    });
  };

  const deleteProduct = (productId) => {
    deleteProductById(user._id, token, productId).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        loadProducts();
      }
    });
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
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Manage Products"
      description={`G'day ${user.name}, Perform CRUD on products`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">
          <ul className="list-group">
            {products.map((product, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{product.name}</strong>
                <Link to={`/admin/product/update/${product._id}`}>
                  <span className="badge badge-primary badge-pill">Update</span>
                </Link>
                <span
                  onClick={() => deleteProduct(product._id)}
                  className="badge badge-danger badge-pill cursor-pointer"
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
