import React, { useState, useEfect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (category) => () => {
    const currentCategoryId = checked.indexOf(category);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(category);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    console.log(currentCategoryId)
    console.log(newCheckedCategoryId)
    setChecked(newCheckedCategoryId)
    handleFilters(newCheckedCategoryId)
  };

  return categories.map((category, index) => (
    <li key={index} className="list-unstyled">
      <input
        onChange={handleToggle(category._id)}
        type="checkbox"
        className="form-check-input"
        value={checked.indexOf(category._id === -1)}
      />
      <label>{category.name}</label>
    </li>
  ));
};

export default Checkbox;
