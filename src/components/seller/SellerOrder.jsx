import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MetaData, Loader } from '../layouts';
import { getOrderDetails } from '../../redux/actions/orderActions';
import Layout from './layout/Layout';
import { PROCESS_ORDER_RESET } from '../../redux/consts';
import { processOrder } from '../../redux/actions/sellerActions';
import fire from '../../utils/swal';

const MyOrders = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

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
  } = order;

  const isPaid = paymentInfo?.status === 'succeeded';

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
              <p
                className={
                  status && String(status).includes('Delivered')
                    ? 'greenColor'
                    : 'redColor'
                }
              >
                <b>{status}</b>
              </p>

              {status === 'Processing' && (
                <button
                  className="btn btn-warning ml-2"
                  onClick={() => dispatch(processOrder(id))}
                >
                  <i className="fa fa-check"></i> Delivered
                </button>
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