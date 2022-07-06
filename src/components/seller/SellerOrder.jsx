import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './layout/Layout';
import { MetaData, Loader } from '../layouts';
import fire from '../../utils/swal';
import { getOrderDetails } from '../../redux/actions/orderActions';
import { handleRefund, processOrder } from '../../redux/actions/sellerActions';
import { PROCESS_ORDER_RESET } from '../../redux/consts';
import '../products/Home';

const MyOrders = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const { processed, loading: sellerLoading } = useSelector(
    state => state.seller
  );
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

  const isPaid =
    paymentInfo?.status === 'succeeded' || paymentInfo?.status === 'Succeeded';

  const [status, setStatus] = useState(orderStatus);

  useEffect(() => {
    if (!processed) return;

    setStatus('Delivered');

    fire('Order has been processed.', 'seccess');

    dispatch({ type: PROCESS_ORDER_RESET });
  }, [dispatch, processed]);

  useEffect(() => {
    setStatus(orderStatus);
  }, [orderStatus]);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <MetaData title="Order Details" />

      <Layout>
        {loading || sellerLoading ? (
          <Loader />
        ) : (
          <div className="row d-flex justify-content-between ml-5">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {_id}</h1>
              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {user?.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo?.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city},{' '}
                {shippingInfo?.postalCode}, {shippingInfo?.country}
              </p>
              <p>
                <b>Amount:</b> Rs. {totalPrice}
              </p>
              <hr />
              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? 'greenColor' : 'redColor'}>
                <b>{isPaid ? 'PAID' : 'NOT PAID'}</b>
              </p>
              <h4 className="my-4">Order Status:</h4>
              {status && String(status).includes('Delivered') ? (
                <p className="greenColor">{status}</p>
              ) : refund?.status === 'accepted' ? (
                <p>Cancelled</p>
              ) : (
                <p className="redColor">{status}</p>
              )}
              {/* <p
                className={
                  status && String(status).includes('Delivered')
                    ? 'greenColor'
                    : 'redColor'
                }
              >
                <b>{status}</b>
              </p> */}
              {status === 'Processing' && refund?.status !== 'accepted' && (
                <button
                  className="btn btn-warning ml-2"
                  onClick={() => dispatch(processOrder(id))}
                >
                  <i className="fa fa-check"></i> Delivered
                </button>
              )}
              <h4 className="my-4">Refund:</h4>
              {refund?.status === 'accepted' && (
                <p style={{ margin: '0' }}>
                  <b>None</b>
                </p>
              )}
              {refund?.status === 'accepted' && (
                <div className="d-flex">
                  <p className="pr-3">Status:</p>
                  <p style={{ margin: '0', color: 'green' }}>
                    <b>Refunded</b>
                  </p>
                </div>
              )}
              {refund?.status === 'requested' && (
                <>
                  <div className="d-flex">
                    <p className="pr-3">Status:</p>
                    <p style={{ margin: '0', color: 'purple' }}>
                      <b>Requested</b>
                    </p>
                  </div>
                  <br />
                  <h4>Buyer Reason For Refund:</h4>
                  <p>{refund?.message}</p>
                  <hr />
                  <h4>Reason to Reject/Accept Refund</h4>
                  <textarea
                    className="form-control mt-4 mb-3"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  ></textarea>
                  <div className="d-flex">
                    <button
                      className="btn btn-success mr-3"
                      onClick={() => {
                        dispatch(handleRefund(id));
                        dispatch(getOrderDetails(id));
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        if (!message || message === '')
                          return fire('Message is required for refund decline');

                        dispatch(
                          handleRefund(id, { message, action: 'decline' })
                        );
                        dispatch(getOrderDetails(id));
                      }}
                    >
                      Decline
                    </button>
                  </div>
                </>
              )}
              {refund?.status === 'declined' && (
                <>
                  <p style={{ margin: '0' }} className={'redColor'}>
                    <b>Declined</b>
                  </p>
                  <p>{refund?.message}</p>
                </>
              )}
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
      </Layout>
    </>
  );
};

export default MyOrders;
