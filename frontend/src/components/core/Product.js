import React, { useState, useEffect } from "react";
import { getProductById, getProductsRelatedById } from "../admin/ApiAdmin";
import Card from "./Card";
import Layout from "./Layout";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    getProductById(productId).then((data) => {
      if (data.error) {
        setError(data.errror);
      } else {
        setProduct(data);
        loadRelatedProducts(data._id);
      }
    });
  };

  const loadRelatedProducts = (productId) => {
    getProductsRelatedById(productId).then((data) => {
      if (data.error) {
        setError(data.errror);
      } else {
        setRelatedProduct(data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product.name}
      description={
        product && product.description && product.description.length > 100
          ? product.description.substring(0, 100) + " ..."
          : product.description
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6 mb-3">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-6">
          <h4 className="text-center">Related Products</h4>
          <div className="row">
            {relatedProduct.map((product, i) => (
              <div className="col-md-4">
                <Card key={i} product={product} showViewProductButton={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
