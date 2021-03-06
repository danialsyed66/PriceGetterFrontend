import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';

import { MetaData, Loader } from '../layouts';
import Layout from './layout/Layout';
import fire from '../../utils/swal';
import printDate from '../../utils/printDate';
import {
  getSellerOrders,
  processOrder,
} from '../../redux/actions/sellerActions';
import { PROCESS_ORDER_RESET } from '../../redux/consts';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, processed } = useSelector(state => state.seller);

  useEffect(() => {
    dispatch(getSellerOrders());
  }, [dispatch]);

  useEffect(() => {
    if (!processed) return;

    fire('Order has been processed.', 'seccess');

    dispatch({ type: PROCESS_ORDER_RESET });
  }, [dispatch, processed]);

  const data = {
    columns: [
      // {
      //   label: 'Order ID',
      //   field: 'id',
      //   sort: 'asc',
      // },
      {
        label: 'Num of Items',
        field: 'numOfItems',
        sort: 'asc',
      },
      {
        label: 'Amount',
        field: 'amount',
        sort: 'asc',
      },
      {
        label: 'Paid At',
        field: 'paidAt',
        sort: 'asc',
      },
      {
        label: 'Delivered At',
        field: 'deliveredAt',
        sort: 'asc',
      },
      {
        label: 'Refund',
        field: 'refund',
        sort: 'asc',
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
      },
      {
        label: 'Actions',
        field: 'actions',
        sort: 'asc',
      },
    ],
    rows: orders?.map(order => ({
      id: order._id,
      numOfItems: order.orderItems.length,
      amount: `Rs. ${order.totalPrice}`,
      paidAt: printDate(order.paidAt),
      deliveredAt: order.deliveredAt ? printDate(order.deliveredAt) : '-',
      status:
        order.orderStatus && String(order.orderStatus).includes('Delivered') ? (
          <p className="greenColor">{order.orderStatus}</p>
        ) : order.refund.status === 'accepted' ? (
          <p>Cancelled</p>
        ) : (
          <p className="redColor">{order.orderStatus}</p>
        ),
      refund:
        order.refund.status === 'accepted' ? (
          <p className="greenColor">Accepted</p>
        ) : order.refund.status === 'declined' ? (
          <p className="redColor">Declined</p>
        ) : order.refund.status === 'requested' ? (
          <p style={{ color: 'purple' }}>Requested</p>
        ) : (
          <p>None</p>
        ),
      actions: (
        <>
          <Link to={`/seller/orders/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
          {order.orderStatus === 'Processing' &&
            order.refund.status !== 'accepted' && (
              <button
                className="btn btn-warning ml-2"
                onClick={() => dispatch(processOrder(order._id))}
              >
                <i className="fa fa-check"></i>
              </button>
            )}
        </>
      ),
    })),
  };

  return (
    <>
      <MetaData title="My Orders" />

      <Layout>
        <div className="m-5">
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable data={data} className="px-3" bordered striped hover />
          )}
        </div>
      </Layout>
    </>
  );
};

export default MyOrders;
