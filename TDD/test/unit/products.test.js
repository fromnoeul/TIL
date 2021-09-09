const productController = require('../../controller/products');
const ProductModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/newProduct.json');

ProductModel.create = jest.fn();

describe('Product Controller Create', () => {
  it('should have a createProduct function', () => {
    expect(typeof productController.createProduct).toBe('function');
  });

  it('should call a ProductModel.create', () => {
    let req = httpMocks.createRequest();
    let res = httpMocks.createResponse();
    let next = null;
    req.body = newProduct;

    productController.createProduct(req, res, next);
    expect(ProductModel.create).toBeCalledWith(newProduct);
  });
});
