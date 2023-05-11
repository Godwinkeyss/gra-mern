// const express = require('express');
import express from 'express';

import path from 'path'
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRoute from './routes/SeedRoutes.js';
import ProductRoute from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';
import paystackRouter from './routes/paystackRoute.js';

// app.use(err,req,res,next)=>{

// }
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Db connected');
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', ProductRoute);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/paystack', paystackRouter);

app.use('/api/seed', seedRoute);

const  __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '/frontend/build')))
app.get('*',(req,res)=>
res.sendFile(path.join(__dirname,'/frontend/build/index.html')))


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});


app.listen(5000, () => {
  console.log('server is running on http://localhost:5000');
});
