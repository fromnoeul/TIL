const productController = require('../../controller/products');
const ProductModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const allProducts = require('../data/all-products.json');

ProductModel.create = jest.fn();
ProductModel.find = jest.fn();
ProductModel.findById = jest.fn();
ProductModel.updateProduct = jest.fn();

jest.setTimeout(60000);

const PRODUCT_ID = '6152befde100634818bf15d5';
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

  it('should call ProductModel.create', async () => {
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

describe('Product Controller Get', () => {
  it('should have a getProducts function', () => {
    expect(typeof productController.getProducts).toBe('function');
  });

  it('should call ProductModel.find({})', async () => {
    await productController.getProducts(req, res, next);
    expect(ProductModel.find).toHaveBeenCalledWith({});
  });

  it('should return 200 response', async () => {
    await productController.getProducts(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  });

  it('should return json body in response', async () => {
    ProductModel.find.mockReturnValue(allProducts);
    await productController.getProducts(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allProducts);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Error finding product data' };
    const rejectedPromise = Promise.reject(errorMessage);
    ProductModel.find.mockReturnValue(rejectedPromise);
    await productController.getProducts(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe('Product Controller GetById', () => {
  it('should have a getProductById', () => {
    expect(typeof productController.getProductById).toBe('function');
  });

  it('should call ProductModel.findById', async () => {
    req.params.productId = PRODUCT_ID;
    await productController.getProductById(req, res, next);
    expect(ProductModel.findById).toBeCalledWith(PRODUCT_ID);
  });

  it('should return json body and response code 200', async () => {
    ProductModel.findById.mockReturnValue(newProduct);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newProduct);
    expect(res._isEndCalled).toBeTruthy();
  });

  it('should return 404 when item doesnt exist', async () => {
    ProductModel.findById.mockReturnValue(null);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled).toBeTruthy();
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'error' };
    const rejectedPromise = Promise.reject(errorMessage);
    ProductModel.findById.mockReturnValue(rejectedPromise);
    await productController.getProductById(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe('Product Controller Update', () => {
  it('should have an updateProduct function', () => {
    expect(typeof productController.updateProduct).toBe('function');
  });

  it('should call ProductModel.findByIdAndUpdate', async () => {
    req.params.productId = PRODUCT_ID;
    req.body = { name: 'updated name', description: 'updated description' };

    await productController.updateProduct(req, res, next);
    expect(ProductModel.findByIdAndUpdate).toBeCalledWith(
      PRODUCT_ID,
      { name: 'updated name', description: 'updated description' },
      { new: true }
    );
  });
});
