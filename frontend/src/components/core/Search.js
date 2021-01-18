import React, { useState, useEffect } from "react";
import { getCategories } from "../admin/ApiAdmin";
import { listProductsBySearch } from "./ApiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  const searchSubmit = (event) => {
    event.preventDefault();
    searchData();
  };

  const searchData = () => {
    console.log(category, search);
    if (search) {
      listProductsBySearch({
        search: search || undefined,
        category: category,
      }).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setData({
            ...data,
            results: data,
            searched: true,
            categories: categories,
          });
        }
      });
    }
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
    console.log("data.category: ", data);
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">
            <i className="fa fa-search"></i> <span>Search</span>
          </button>
        </div>
      </span>
    </form>
  );

  const searchedProducts = (products = []) => (
    <div className="">
      <h2 className="mt-4 mb-4 text-center">{searchMessage(searched, results)}</h2>
      <div className="row">
        {products.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </div>
  );

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return "Not products found. Try again !!!";
    }
  };

  return (
    <div className="row my-5">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
