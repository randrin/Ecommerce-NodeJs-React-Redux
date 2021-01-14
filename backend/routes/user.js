const express = require("express");
const router = express.Router();

const { requiredSignin, isAdmin, isAuth } = require("../controllers/auth");

const { userById, getUserProfile, updateUserProfile} = require("../controllers/user");

router.get("/secret/:userId", requiredSignin, isAuth, isAdmin, (req, res) => {
  res.json({ user: req.profile });
});

router.get("/user/:userId", requiredSignin, isAuth, getUserProfile)
router.put("/user/:userId", requiredSignin, isAuth, updateUserProfile)
router.param("userId", userById);

module.exports = router;
