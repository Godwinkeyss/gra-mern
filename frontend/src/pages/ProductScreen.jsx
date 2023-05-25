import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import { Store } from '../store';
import { getError } from '../utils';
import MessageBox from '../components/MessageBox';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return {...state, product:action.payload};
    case 'CREATE_REQUEST':
      return {...state,loadinCreateReview:true};
    case 'CREATE_SUCCESS':
      return {...state,loadinCreateReview: false};
    case 'CREATE_FAIL':
      return {...state,loadinCreateReview:false}
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const ProductScreen = () => {
  const [rating,setRating] = useState(0)
  const [comment,setComment] = useState('')
  const reviewsRef = useRef();
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, product, error,loadinCreateReview }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }

      // setProducts(data)
      // console.log(data)
    };
    fetchData();
  }, [slug]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  const submitHandler = async(e) => {
    e.preventDefault();

    if(!comment || !rating){
      toast.error('Please enter comment and rating');
      return;
    }
    try {
       const {data} = await axios.post(
        
        `/api/products/${product._id}/reviews`,
        {rating,comment,name:userInfo.name},
        {
          headers:{Authorization:`Bearer ${userInfo.token}`}
        }
       )
       dispatch({type:'CREATE_SUCCESS'})
       toast.success('Review submitted successfully');
       product.reviews.unshift(data.review)
       product.numReriews = data.numReviews;
       product.rating = data.rating;
       dispatch({type:'REFRESH_PRODUCT',payload:product})
       window.scrollTo({
        behavior:'smooth',
        top:reviewsRef.current.offsetTop,
       })
    } catch (error) {
      toast.error(getError(error))
      dispatch({type:'CREATE_FAIL'})
    }
  };

  return (
    <div className="container mt-3">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        // <MessageBox  className="mt-5"/>
        <MessageBox variant="danger" className="mt-5">
          {error}
        </MessageBox>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <img
                src={product.image}
                alt={product.name}
                className="img-large"
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  {/* <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating> */}
                    <p className='card-text d-flex fs-6 mb-0'><Rating rating={product.rating} /> <span className='mx-1'>{product.numReviews} {product.numReviews === 1 ? 'review':'reviews'}</span> </p> 
                </ListGroup.Item>
                <ListGroup.Item>Price : ₦{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  {/* <Row xs={1} md={2} className="g-2">
                {[product.image, ...product.images].map((x) => (
                  <Col key={x}>
                    <Card>
                      <Button
                        className="thumbnail"
                        type="button"
                        variant="light"
                        onClick={() => setSelectedImage(x)}
                      >
                        <Card.Img variant="top" src={x} alt="product" />
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row> */}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description:
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>₦{product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Badge bg="success">In Stock</Badge>
                          ) : (
                            <Badge bg="danger">Unavailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button
                            onClick={addToCartHandler}
                            className="btnCart"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="my-3">
            <h2 ref={reviewsRef}>Review</h2>
            <div className="mb-3">
              {product.reviews.length === 0 && (
                <MessageBox>There is no review</MessageBox>
              )}
            </div>
            <ListGroup>
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="my-3">
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <h2>Write a customer review</h2>
                  <Form.Group className="mb-3" controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                      arial-label="Rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="1">Poor</option>
                      <option value="2">Fair</option>
                      <option value="3">Good</option>
                      <option value="4">Very Good</option>
                      <option value="5">Excellent</option>
                    </Form.Select>
                  </Form.Group>
                
                    <FloatingLabel controlId='floatingTextarea' label="Comments" className="mb-3">
                      <Form.Control as="textarea" placeholder="Leave a comment here" value={comment}
                      onChange={(e)=>setComment(e.target.value)}
                      />

                      
                    </FloatingLabel>
                      <div className="mb-3">
                        <Button disabled={loadinCreateReview} type='submit'>Submit</Button>
                        {loadinCreateReview && <LoadingBox></LoadingBox>}
                      </div>
                </form>
              ) : (
                <MessageBox>
                  Please <Link to={`/signin?redirect=/product/${product.slug}`}>Sign In</Link> to write a review
                </MessageBox>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
