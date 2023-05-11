import express from 'express';
import expressAsyncHandler from 'express-async-handler';
// const https = require('https')
import https from 'https';

const paystackRouter = express.Router();

paystackRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const params = JSON.stringify({
      email: req.query.email,
      name: req.query.name,
      amount: req.query.amount * 100,
    //   callback:
      //   currency: 'NGN',
    });

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization:
          'Bearer sk_test_d9749f6c87801c71e626edfadd3727447447abbf',
        'Content-Type': 'application/json',
      },
    };

    const reqPaystack = https
      .request(options, (resPaystack) => {
        let data = '';

        resPaystack.on('data', (chunk) => {
          data += chunk;
        });

        resPaystack.on('end', () => {
          res.send(data);
          console.log(JSON.parse(data));
        });
      })
      .on('error', (error) => {
        console.error(error);
      });

    reqPaystack.write(params);
    reqPaystack.end();
  })
);

paystackRouter.post(
  '/payverify',
  expressAsyncHandler(async (req, res) => {
    // const https = require('https')

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/verify/:reference',
      method: 'GET',
      headers: {
        Authorization:
          'Bearer sk_test_d9749f6c87801c71e626edfadd3727447447abbf',
      },
    };

    https
      .request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          console.log(JSON.parse(data));
        });
      })
      .on('error', (error) => {
        console.error(error);
      });
  })
);
export default paystackRouter;
