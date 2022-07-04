import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';

import { MetaData, Loader, Navbar, Footer } from '../layouts';
import { getMyOrders } from '../../redux/actions/orderActions';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(state => state.myOrders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const data = {
    columns: [
      {
        label: 'Order ID',
        field: 'id',
        sort: 'asc',
      },
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
        label: 'Status',
        field: 'status',
        sort: 'asc',
      },
      {
        label: 'Refund',
        field: 'refund',
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
          <p className="yellowColor">Requested</p>
        ) : (
          <p>None</p>
        ),
      actions: (
        <>
          <Link to={`/orders/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        </>
      ),
    })),
  };

  return (
    <>
      <MetaData title="My Orders" />
      <Navbar />

      <div className="container">
        <h1 className="my-5">My Orders</h1>

        {loading ? (
          <Loader />
        ) : (
          <MDBDataTable data={data} className="px-3" bordered striped hover />
        )}
      </div>

      <Footer />
    </>
  );
};

export default MyOrders;
