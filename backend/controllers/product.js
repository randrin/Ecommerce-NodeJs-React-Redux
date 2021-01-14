const Product = require("../models/product");
const { errorHandler } = require("../helpers/errorHandler");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // check for all fields
    console.log('fields: ', fields);
    const { name, description, price, category, quantity, shipping } = fields;

    if (!name || !description || !price || !category || !quantity || !shipping) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    let product = new Product(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB. Try another one!",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    } else {
        return res.status(400).json({
            error: "Image is required!",
          });
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json({ result });
    });
  });
};
