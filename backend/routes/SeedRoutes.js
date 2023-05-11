import data from '../data.js';
import Product from '../models/Product.js';
import express from 'express';
import User from '../models/User.js';
const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteMany({});
  const product = await Product.insertMany(data.products);
  await User.deleteMany({});
  const user = await User.insertMany(data.users);
  res.send({product, user});
});

export default seedRouter;
