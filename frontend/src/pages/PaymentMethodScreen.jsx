import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import CheckoutSteps from '../components/CheckoutSteps'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Store } from '../store'
import { useNavigate } from 'react-router-dom'


export const PaymentMethodScreen = () => {
    const navigate = useNavigate()
    const {state,dispatch:ctxDispatch} = useContext(Store)
    const {
        cart:{shippingAddress,paymentMethod}
    } = state;
    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'COD')
    useEffect(()=>{
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    },[navigate,shippingAddress])
    const submitHandler = (e) =>{
        e.preventDefault();
        ctxDispatch({type:'SAVE_PAYMENT_METHOD', payload:paymentMethodName})
        localStorage.setItem('paymentMethod',paymentMethodName)
        navigate('/placeorder')
    }
  return (
    <div>
         <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <div className="container small-container">
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>

      <Form onSubmit={submitHandler}>
          <Form.Check 
            type="radio"
            id="paypal"
            label="PayPal"
            value="PayPal"
            checked={paymentMethodName === 'PayPal'}
            onChange={(e)=>setPaymentMethod(e.target.value)}

          />
          <Form.Check 
            type="radio"
            id="Stripe"
            label="Stripe"
            value="Stripe"
            checked={paymentMethodName === 'Stripe'}
            onChange={(e)=>setPaymentMethod(e.target.value)}

          />
          <Form.Check 
            type="radio"
            id="Paystack"
            label="Paystack (Africa)"
            value="Paystack"
            checked={paymentMethodName === 'Paystack'}
            onChange={(e)=>setPaymentMethod(e.target.value)}

          />
          <Form.Check 
            type="radio"
            id="COD"
            label="Cash on Delivery(Nigeria only)"
            value="COD"
            checked={paymentMethodName === 'COD'}
            onChange={(e)=>setPaymentMethod(e.target.value)}

          />
          <div className="mb-3">
            <Button className='btnCart' type="submit">Continue</Button>
          </div>
      </Form>
      </div>
    </div>
  )
}
