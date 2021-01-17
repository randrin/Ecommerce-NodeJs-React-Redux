import React, { useState, useEfect } from "react";

const Radiobox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
  };

  return prices.map((price, index) => (
    <div key={index}>
      <input
        onChange={handleChange}
        type="radio"
        name={price}
        className="mr-2"
        value={`${price._id}`}
      />
      <label>{price.name}</label>
    </div>
  ));
};

export default Radiobox;
