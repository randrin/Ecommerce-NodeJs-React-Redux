import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./CartHelpers";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-success badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock </span>
    );
  };

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
            <i className="fa fa-eye"></i> View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const removeToCart = () => {
    removeItem(product._id, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2 card-btn-1"
        >
          <i className="fa fa-shopping-cart"></i> Add to cart
        </button>
      )
    );
  };

  const showRemoveBtn = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={removeToCart}
          className="btn btn-outline-danger mt-2 mb-2 card-btn-1"
        >
          <i className="fa fa-remove"></i> Remove to cart
        </button>
      )
    );
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group-append mb-3">
            <div className="input-group-append">
              <span className="input-group-text">Ajust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  return (
    <div className="card">
      <div className="card-header card-header-1 name">{product.name}</div>
      {shouldRedirect(redirect)}
      <Link to={`/product/${product._id}`}>
        <ShowImage item={product} url="product" />
      </Link>
      <div className="card-body">
        <p className="text-justify">
          {product.description.length > 200
            ? product.description.substring(0, 200) + " ..."
            : product.description}
        </p>
        <p>{product.price} €</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProductButton)}

        {showRemoveBtn(showRemoveProductButton)}

        {showAddToCartBtn(showAddToCartButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
