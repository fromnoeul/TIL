const ProductModel = require('../models/Product');

exports.createProduct = (req, res, next) => {
  ProductModel.create(req.body);
  res.status(201).send();
};
