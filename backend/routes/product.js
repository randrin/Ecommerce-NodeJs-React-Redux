const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requiredSignin, isAdmin, isAuth } = require("../controllers/auth");

const {
  create,
  productById,
  getProductById,
  deleteProductById,
  updateProductById
} = require("../controllers/product");

router.get("/:productId", getProductById);
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

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
