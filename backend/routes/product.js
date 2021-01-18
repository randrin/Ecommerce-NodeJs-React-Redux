const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requiredSignin, isAdmin, isAuth } = require("../controllers/auth");

const {
  create,
  productById,
  getAllProducts,
  getProductById,
  getProductsRelated,
  getProductsCategories,
  getProductImage,
  getProductsBySearch,
  deleteProductById,
  updateProductById,
  productListBySearch,
} = require("../controllers/product");

router.get("/products", getAllProducts);
router.get("/products/categories", getProductsCategories);
router.get("/products/related/:productId", getProductsRelated);
router.get("/:productId", getProductById);
router.get("/image/:productId", getProductImage);
router.get("/products/search", getProductsBySearch);
router.delete(
  "/:productId/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  deleteProductById
);
router.put(
  "/:productId/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  updateProductById
);
router.post("/create/:userId", requiredSignin, isAuth, isAdmin, create);
router.post("/products/by/search", productListBySearch);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
