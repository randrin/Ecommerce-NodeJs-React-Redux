const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/errorHandler");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  // First find user by email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User with that email does nor exist. Please signup" });
    }

    // Check the email and password matched
    if (!user.authentificate(password)) {
      return res
        .status(401)
        .json({ error: "Email and Password don't matched. Try again" });
    }

    // Generate the signed web token with id and user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });

    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Sigout successfully." });
};

exports.requiredSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth.id;
  console.log('User: ', req.auth);
  if (!user) {
    return res.status(403).json({
      error: "Access denied !",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Access denied for admin resources !",
    });
  }
  next();
};
