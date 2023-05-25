import React, { useEffect, useReducer, useState } from 'react';
import Slider from '../components/Slider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { data } from '../data';
import Product from '../components/Product';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const HomeScreen = () => {
  // const [products,setProducts]= useState([])
  const [{ loading, products, error }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }

      // setProducts(data)
      // console.log(data)
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Grapec</title>
      </Helmet>
      <div className="">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger" className="mt-5">
            {error}
          </MessageBox>
        ) : (
          <>
            <Slider />
            <div className="container">
              <h1>Featured Products</h1>
              <Row className="  mt-3">
                {products.slice(0,8).map((product) => (
                  <Col md={4} lg={3} sm={6}>
                    <Product product={product} key={product.slug} />
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
