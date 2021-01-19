const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helpers/errorHandler");

exports.getOrders = (req, res) => {};

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
