import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
}) => {
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

  const addToCart = () => {};

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

  return (
    <div className="card">
      <div className="card-header card-header-1 name">{product.name}</div>
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

        {showAddToCartBtn(showAddToCartButton)}
      </div>
    </div>
  );
};

export default Card;
