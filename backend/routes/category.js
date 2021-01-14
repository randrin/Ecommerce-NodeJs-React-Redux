const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requiredSignin, isAdmin, isAuth } = require("../controllers/auth");

const {
  create,
  categoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/category");

router.get("/categories", getAllCategories);
router.get("/:categoryId/:userId", getCategoryById);
router.post("/create/:userId", requiredSignin, isAuth, isAdmin, create);
router.put(
  "/:categoryId/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  updateCategoryById
);
router.delete(
  "/:categoryId/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  deleteCategoryById
);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
