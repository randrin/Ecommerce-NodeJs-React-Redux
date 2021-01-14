const express = require('express');
const router = express.Router();

const { userById } = require("../controllers/user");
const { requiredSignin, isAdmin, isAuth } = require("../controllers/auth");

const { create, categoryById, getCategoryById } = require("../controllers/category");

router.get("/:categoryId/:userId", getCategoryById);
router.post('/create/:userId', requiredSignin, isAuth, isAdmin, create);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;