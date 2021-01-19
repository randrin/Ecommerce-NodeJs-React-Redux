const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requiredSignin, isAdmin, isAuth } = require("../controllers/auth");
const { getOrders, createOrder } = require("../controllers/order");

router.get("/getOrders/:userId", requiredSignin, isAuth, getOrders);
router.post("/create/:userId", requiredSignin, isAuth, createOrder);

router.param("userId", userById);

module.exports = router;