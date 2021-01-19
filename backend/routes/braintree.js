const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requiredSignin, isAdmin, isAuth } = require("../controllers/auth");
const { generateToken, processPayment } = require("../controllers/braintree");

router.get("/getToken/:userId", requiredSignin, isAuth, generateToken);
router.post("/payment/:userId", requiredSignin, isAuth, processPayment);

router.param("userId", userById);

module.exports = router;