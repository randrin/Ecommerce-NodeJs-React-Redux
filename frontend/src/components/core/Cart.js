import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCart, itemTotal } from "./CartHelpers";
import Card from "./Card";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = (products) => {
    return (
      <div className="my-5">
        <h2 className="text-center">Your cart has {`${itemTotal()}`} items</h2>
        <hr />
        {products.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
          />
        ))}
      </div>
    );
  };

  const notItemsMessage = () => (
    <div className="my-5">
      <h2 className="text-center">
        Your cart is empty. <br />{" "}
        <Link to="/shop" className="mt-4">
          Go shopping
        </Link>
      </h2>
    </div>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="All My Product E-commerce App"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : notItemsMessage()}
        </div>
        <div className="col-6 my-5">
          <h2 className="text-center">
            Checkout Cart
            <hr />
            <Checkout products={items} />
          </h2>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
