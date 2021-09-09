const ProductModel = require('../models/Product');

exports.createProduct = (req, res, next) => {
  const createdProduct = ProductModel.create(req.body);
  res.status(201).json(createdProduct);
};
