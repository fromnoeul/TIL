const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

let firstProduct;
const updatedProduct = {
  name: 'updated name',
  description: 'updated description',
};
it('POST /api/products', async () => {
  const response = await request(app).post('/api/products').send(newProduct);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});

it('should return 500 on POST /api/products', async () => {
  const response = await request(app)
    .post('/api/products')
    .send({ name: 'phone' });
  expect(response.statusCode).toBe(500);
  expect(response.body).toStrictEqual({
    message:
      'Product validation failed: description: Path `description` is required.',
  });
});

it('GET /api/products', async () => {
  const response = await request(app).get('/api/products');
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].name).toBeDefined();
  firstProduct = response.body[0];
});

it('GET /api/products/:productId', async () => {
  const response = await request(app).get('/api/products/' + firstProduct._id);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

it('GET id doesnt exist /api/products/:productId', async () => {
  const response = await request(app).get(
    '/api/products/6152befde100634818bf15d4'
  );
  expect(response.statusCode).toBe(404);
});

it('PUT /api/products/:productId', async () => {
  const response = await request(app)
    .put('/api/products/' + firstProduct._id)
    .send(updatedProduct);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(updatedProduct.name);
  expect(response.body.description).toBe(updatedProduct.description);
});

it('should return 404 on PUT /api/products', async () => {
  const response = await request(app)
    .put('/api/products/6152befde100634818bf15d6')
    .send(updatedProduct);
  expect(response.statusCode).toBe(404);
});

it('DELETE /api/products/:productId', async () => {
  const response = await request(app)
    .delete('/api/products/' + firstProduct._id)
    .send();
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

it('should return 404 on DELETE /api/products', async () => {
  const response = await request(app)
    .delete('/api/products/6152befde100634818bf15d4')
    .send();
  expect(response.statusCode).toBe(404);
});
