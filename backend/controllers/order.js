const Product = require("../models/product");
const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helpers/errorHandler");

exports.orderId = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((error, order) => {
      if (error || !order) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      req.order = order;
      next();
    });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name address")
    .sort("-created")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error),
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
      return res.status(400).json({ error: errorHandler(error) });
    }
    res.json(data);
  });
};

exports.getAllStatusOrders = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatusOrders = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: {status: req.body.status} },
    (error, order) => {
      if (error) {
        return res.status(400).json({ error: errorHandler(error) });
      }
      res.json(order);
    }
  );
};
