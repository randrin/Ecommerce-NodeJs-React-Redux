const express = require('express');
const router = express.Router();

const { userById } = require("../controllers/user");
const { requiredSignin, isAdmin, isAuth } = require("../controllers/auth");

const { create } = require("../controllers/category");

router.post('/create/:userId', requiredSignin, isAdmin, create);

router.param("userId", userById);

module.exports = router;