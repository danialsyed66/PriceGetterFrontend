import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';

import MetaData from '../layouts/MetaData';
import CheckoutSteps from '../layouts/CheckoutSteps';
import { createOrder } from '../../redux/actions/orderActions';

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const options = {
    style: {
      base: { fontSize: '16px', backgroundColor: 'white' },
      invalid: { color: 'red' },
    },
  };

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  const paymentData = { amount: Math.round(orderInfo.total * 100) };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (document.getElementById('pay_btn'))
        document.getElementById('pay_btn').disabled = true;

      const { data } = await axios.post('/api/v1/payment/process', paymentData);

      const { clientSecret } = data.data;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: result.error.message,
          showConfirmButton: true,
          timer: 2000,
        });

        if (document.getElementById('pay_btn'))
          document.getElementById('pay_btn').disabled = false;

        return;
      }

      if (result.paymentIntent.status === 'succeeded') {
        const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

        const order = {
          orderItems: cartItems,
          shippingInfo,
          itemsPrice: orderInfo?.subTotal,
          taxPrice: orderInfo?.tax,
          shippingPrice: orderInfo?.shipping,
          totalPrice: orderInfo?.total,
          paymentInfo: {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          },
        };

        dispatch(createOrder(order));
        navigate('/success');

        return;
      }

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'There is some error while payment processing',
        showConfirmButton: true,
        timer: 2000,
      });
    } catch (err) {
      if (document.getElementById('pay_btn'))
        document.getElementById('pay_btn').disabled = false;
      console.log(err);
      console.log(err?.response?.data?.message);
    }
  };

  return (
    <>
      <MetaData title={'Payment Page'} />

      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay {` - ${orderInfo?.total} PKR`}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
