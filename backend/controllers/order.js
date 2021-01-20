const Product = require("../models/product");
const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helpers/errorHandler");

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name address")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      res.status(500).json({ error: errorHandler(error) });
    }
    res.json(data);
  });
};
