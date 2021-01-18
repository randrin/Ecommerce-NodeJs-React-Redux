import { API } from "../../config";
import queryString from "query-string";

export const getProducts = (sortBy) => {
  return fetch(`${API}/product/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = { limit, skip, filters };
  return fetch(`${API}/product/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const listProductsBySearch = (params) => {
  const query = queryString.stringify(params);
  console.log("Query: ", query);
  return fetch(`${API}/product/products/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
