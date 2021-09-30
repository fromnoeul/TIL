const express = require('express');
const mongoose = require('mongoose');
const productsRoutes = require('./routes.js');
require('dotenv').config();

const PORT = 5000;
const app = express();

mongoose
  .connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongodb connected...'))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/api/products', productsRoutes);
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`Running on PORT: ${PORT}`);
});

module.exports = app;
