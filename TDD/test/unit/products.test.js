const productController = require('../../controller/products');
const ProductModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/newProduct.json');

ProductModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('Product Controller Create', () => {
  beforeEach(() => {
    req.body = newProduct;
  });

  it('should have a createProduct function', () => {
    expect(typeof productController.createProduct).toBe('function');
  });

  it('should call a ProductModel.create', async () => {
    await productController.createProduct(req, res, next);
    expect(ProductModel.create).toBeCalledWith(newProduct);
  });

  it('should return 201 response code', async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    ProductModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'description property missing' };
    const rejectedPromise = Promise.reject(errorMessage);
    ProductModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
