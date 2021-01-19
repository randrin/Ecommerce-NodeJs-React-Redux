const express = require("express");
const router = express.Router();

const { userById, addOrderToUserHistory } = require("../controllers/user");
const { requiredSignin, isAdmin, isAuth } = require("../controllers/auth");
const { getOrders, createOrder } = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.get("/getOrders/:userId", requiredSignin, isAuth, getOrders);
router.post("/create/:userId", requiredSignin, isAuth, addOrderToUserHistory, decreaseQuantity, createOrder);

router.param("userId", userById);

module.exports = router;