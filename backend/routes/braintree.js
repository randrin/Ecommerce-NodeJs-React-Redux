const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requiredSignin, isAdmin, isAuth } = require("../controllers/auth");
const { generateToken } = require("../controllers/braintree");

router.get("/getToken/:userId", requiredSignin, isAuth, generateToken);

router.param("userId", userById);

module.exports = router;