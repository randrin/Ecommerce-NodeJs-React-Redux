import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="my-5 text-center">
      <h2>Error 404</h2>
      <p>Page Not Found !!!!</p>
      <div className="my-3">
        <Link to="/"><i className="fa fa-angle-left"></i> Back to Home</Link>
      </div>
    </div>
  );
};

export default Error404;
