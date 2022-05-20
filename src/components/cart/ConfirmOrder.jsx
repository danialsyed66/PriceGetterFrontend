import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MetaData from '../layouts/MetaData';
import CheckoutSteps from '../layouts/CheckoutSteps';

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const {
    user: { name },
  } = useSelector(state => state.auth);
  const {
    shippingInfo: { phoneNo, address, city, postalCode, country },
    cartItems,
  } = useSelector(state => state.cart);

  const subTotal = +cartItems.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );
  const shipping = +(subTotal > 200 ? 0 : 5).toFixed(2);
  const tax = +(0.5 * subTotal).toFixed(2);
  const total = +subTotal + shipping + tax;

  const proceedToPayment = () => {
    sessionStorage.setItem(
      'orderInfo',
      JSON.stringify({ subTotal, shipping, tax, total })
    );

    navigate('/payment');
  };

  return (
    <>
      <MetaData title="Confirm Order" />

      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {name}
          </p>
          <p>
            <b>Phone:</b> {phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b> {address}, {city}, {postalCode}, {country}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>
          {cartItems.map(({ _id, name, price, images, quantity }) => (
            <Fragment key={_id}>
              <hr />
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={images[0]?.url}
                      alt="Laptop"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${_id}`}>{name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {quantity} x Rs. {price} = <b>Rs. {quantity * price}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{' '}
              <span className="order-summary-values">Rs. {subTotal}</span>
            </p>
            <p>
              Shipping:{' '}
              <span className="order-summary-values">Rs. {shipping}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">Rs. {tax}</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">Rs. {total}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={proceedToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
