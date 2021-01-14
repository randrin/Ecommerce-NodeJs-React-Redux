const express = require("express");
const router = express.Router();

const { requiredSignin, isAdmin, isAuth } = require("../controllers/auth");

const { userById } = require("../controllers/user");

router.get("/secret/:userId", requiredSignin, isAuth, isAdmin, (req, res) => {
  res.json({ user: req.profile });
});

router.param("userId", userById);

module.exports = router;
