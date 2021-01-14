const express = require('express');
const router = express.Router();

const { userById } = require("../controllers/user");
const { requiredSignin, isAdmin, isAuth } = require("../controllers/auth");

const { create, productById, getProductById } = require("../controllers/product");

router.get('/:productId', getProductById)
router.post('/create/:userId', requiredSignin, isAuth, isAdmin, create);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;