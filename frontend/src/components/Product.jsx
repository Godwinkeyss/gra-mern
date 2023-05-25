import React from 'react';
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Rating from './Rating';
const Product = ({product}) => {
  return (
    // <Col md={4} lg={3} sm={6}>
    
        <Card className="productImg">
          <Link to={`/product/${product.slug}`}>
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.name}
            className="img-"
          />
          </Link>
          <Card.Body>
            <Card.Text>
            <Link to={`/product/${product.slug}`}>
              <Card.Title>{product.name}</Card.Title>
              </Link>
               <p className='card-text d-flex fs-6 mb-0'><Rating rating={product.rating} /> <span className='mx-1'>{product.numReviews} {product.numReviews === 1 ? 'review':'reviews'}</span> </p> 
              <b>₦{product.price}</b>
            </Card.Text>
            <Button className="btnCart">Add to cart</Button>
          </Card.Body>
        </Card>
    
    // </Col>
  );
};

export default Product;
