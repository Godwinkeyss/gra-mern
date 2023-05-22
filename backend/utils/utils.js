import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      service: process.env.SMPT_SERVICE,
      auth:{
          user: process.env.SMPT_MAIL,
          pass: process.env.SMPT_PASSWORD,
      },
  });

  const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export const payOrderEmailTemplate = (order)=>{
  return `<h1>Thanks for shopping with us</h1>
  <p>${order.user.name}</p>
  <p>We have finished processing your order</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0,10)})</h2>
  <table>
    <thead>
      <tr>
        <td><strong>Product</strong></td>
        <td><strong>Quantity</strong></td>
        <td><strong align="right">Price</strong></td>
      </tr>
    </thead>
    <tbody>
      ${order.orderItems.map((item)=>
        `
        <tr>
         <td>${item.name}</td>
         <td align="right">${item.quantity}</td>
         <td align="right">${item.price.toFixed(2)}</td>
        </tr>
        `
        )
        .join('\n')
     
      }
    </tbody>
    <tfoot>
      <tr>
          <td colspan="2">Items Price</td>
          <td align="right">$${order.itemPrice.toFixed(2)}</td>
          <td colspan="2">Shipping Price</td>
          <td align="right">$${order.shippingPrice.toFixed(2)}</td>
          <td colspan="2">Total Price</td>
          <td align="right">$${order.totalPrice.toFixed(2)}</td>
          <td colspan="2">Payment Method</td>
          <td align="right">${order.paymentMethod}</td>

      </tr>
    </tfoot>
  </table>

  <h2>Shipping Address</h2>
  <p>
  ${order.shippingAddress.fullName}<br />
  ${order.shippingAddress.address}<br />
  ${order.shippingAddress.city}<br />
  ${order.shippingAddress.country}<br />
  ${order.shippingAddress.postalCode}<br />
  </p>
   <hr />
   <p>Thanks for shopping with us.</p>
  `
}