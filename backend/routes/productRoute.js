import express from 'express';
import Product from '../models/Product.js';
import data from '../data.js';

const ProductRouter = express.Router();
ProductRouter.get('/', async (req, res) => {
  const product = await Product.find();
  res.send(product);
});

// ProductRouter.get('/',async(req,res)=>{
//     const product =await Product.create(req.params)

//     res.send(product)

// })

ProductRouter.get('/slug/:slug', async (req, res) => {
  // const product = data.products.find((x) => x.slug === req.params.slug);
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});
ProductRouter.get('/:id',async (req, res) => {
  const product =await Product.findById( req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
export default ProductRouter;
