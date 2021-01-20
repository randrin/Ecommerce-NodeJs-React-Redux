const express = require("express");
const router = express.Router();

const { userById, addOrderToUserHistory } = require("../controllers/user");
const { requiredSignin, isAdmin, isAuth } = require("../controllers/auth");
const {
  orderId,
  getAllOrders,
  createOrder,
  getAllStatusOrders,
  updateStatusOrders,
} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.get("/orders/:userId", requiredSignin, isAuth, isAdmin, getAllOrders);
router.get(
  "/status/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  getAllStatusOrders
);
router.post(
  "/create/:userId",
  requiredSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  createOrder
);
router.put(
  "/:orderId/status/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  updateStatusOrders
);

router.param("userId", userById);
router.param("orderId", orderId);

module.exports = router;
