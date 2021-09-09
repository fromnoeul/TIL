const express = require('express');
const mongoose = require('mongoose');
const productsRoutes = require('./routes.js');

const PORT = 5000;
const app = express();

mongoose
  .connect(
    'mongodb+srv://fromnoeul:PcIHUXoruSZL4end@nestcluster.vr2uj.mongodb.net/tdd?authSource=admin&replicaSet=atlas-10cka6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Mongodb connected...'))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/api/products', productsRoutes);

app.listen(PORT, () => {
  console.log(`Running on PORT: ${PORT}`);
});
