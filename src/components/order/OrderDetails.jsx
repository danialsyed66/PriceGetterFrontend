import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MetaData, Loader, Footer, Navbar } from '../layouts';
import { getOrderDetails } from '../../redux/actions/orderActions';
import Refundmodel from './Refundmodel';
import '../products/Home';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { order, loading } = useSelector(state => state.orderDetails);
  const {
    _id,
    paymentInfo,
    orderItems,
    shippingInfo,
    totalPrice,
    orderStatus,
    user,
    refund,
  } = order;
  const { id } = useParams();

  const isPaid =
    paymentInfo?.status === 'succeeded' || paymentInfo?.status === 'Succeeded';

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);
  const [show, setShow] = useState(false);

  return (
    <>
      <MetaData title="Order Details" />

      <Navbar />

      <div
        className="container"
        onClick={() => {
          setShow(false);
        }}
      >
        <h1 className="mb-3">My Order</h1>
        <Refundmodel show={show} onClose={() => setShow(false)} id={_id} />

        {loading ? (
          <Loader />
        ) : (
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-1 order-details">
              <div className="d-flex col-md-flex-row flex-1 justify-content-between align-items-center ">
                <div>
                  <h4 className="mb-4">Shipping Info</h4>
                  <p>
                    <b>Name:</b> {user?.name}
                  </p>
                  <p>
                    <b>Phone:</b> {shippingInfo?.phoneNo}
                  </p>
                  <p className="mb-4">
                    <b>Address:</b> {shippingInfo?.address},{' '}
                    {shippingInfo?.city}, {shippingInfo?.postalCode},{' '}
                    {shippingInfo?.country}
                  </p>
                  <p>
                    <b>Amount:</b> Rs. {totalPrice}
                  </p>
                </div>
                <hr />
                <div>
                  <h4 className="my-4">Payment</h4>
                  <p
                    style={{ margin: '0' }}
                    className={isPaid ? 'greenColor' : 'redColor'}
                  >
                    <b>{isPaid ? 'PAID' : 'NOT PAID'}</b>
                  </p>

                  <h4 className="my-4">Order Status:</h4>
                  <p
                    style={{ margin: '0' }}
                    className={
                      orderStatus && String(orderStatus).includes('Delivered')
                        ? 'greenColor'
                        : 'redColor'
                    }
                  >
                    <b>
                      {refund?.status === 'accepted' &&
                      orderStatus === 'Processing'
                        ? 'Cancelled'
                        : orderStatus}
                    </b>
                  </p>

                  <hr />
                  <h4 className="my-4">Refund</h4>
                  {refund?.status === 'accepted' && (
                    <p style={{ margin: '0' }} className={'greenColor'}>
                      <b>Refunded</b>
                    </p>
                  )}
                  {refund?.status === 'requested' && (
                    <p style={{ margin: '0' }} className={'yellowColor'}>
                      <b>Requested</b>
                    </p>
                  )}
                  {refund?.status === 'declined' && (
                    <p style={{ margin: '0' }} className={'redColor'}>
                      <b>Declined</b>
                    </p>
                  )}
                  {refund?.status === 'none' && (
                    <button
                      className="btn btn-primary"
                      onClick={e => {
                        e.stopPropagation();
                        setShow(true);
                      }}
                    >
                      Claim refund
                    </button>
                  )}
                </div>
              </div>
              <h4 className="my-4">Order Items:</h4>
              <hr />
              <div className="cart-item my-1">
                {orderItems?.map(item => (
                  <div className="row my-5" key={item._id}>
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name.split(' ').splice(0, 2).join(' ')}
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-5">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>Rs. {item.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p>
                        {item.quantity} Piece{item.quantity > 1 && 's'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default MyOrders;
