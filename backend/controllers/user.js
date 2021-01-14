const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user;
    next();
  });
};

exports.getUserProfile = (req, res) => {
  req.profile.hashed_password = undefined; // Don't pass the hashed_password to the response
  req.profile.salt = undefined; // Don't pass the salt to the response
  return res.json(req.profile);
};

exports.updateUserProfile = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorizd to perform this actions.",
        });
      }
      user.hashed_password = undefined; // Don't pass the hashed_password to the response
      user.salt = undefined; // Don't pass the salt to the response
      res.json(user);
    }
  );
};
