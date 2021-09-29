const ProductModel = require('../models/Product');

exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await ProductModel.create(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const allProducts = await ProductModel.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
};
