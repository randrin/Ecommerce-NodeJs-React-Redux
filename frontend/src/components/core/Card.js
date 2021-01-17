import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header card-header-1 ">{product.name}</div>
        <ShowImage item={product} url="product" />
        <div className="card-body">
          <p>{product.description}</p>
          <p>{product.price} €</p>
          <Link to="/" className="mr-2">
            <button className="btn btn-outline-primary mt-2 mb-2">
              <i className="fa fa-eye"></i> View Product
            </button>
          </Link>
          <button className="btn btn-outline-warning mt-2 mb-2">
            <i className="fa fa-shopping-cart"></i> Add to card
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
