import React, { useEffect } from 'react';
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// import { MDBDataTable } from "mdbreact";

import { MetaData, Loader } from '../layouts';
import { getMyOrders } from '../../redux/actions/orderActions';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { /* orders, */ loading } = useSelector(state => state.myOrders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  // const data = {
  //   columns: [
  //     {
  //       label: "Order ID",
  //       field: "id",
  //       sort: "asc",
  //     },
  //     {
  //       label: "Num of Items",
  //       field: "numOfItems",
  //       sort: "asc",
  //     },
  //     {
  //       label: "Amount",
  //       field: "amount",
  //       sort: "asc",
  //     },
  //     {
  //       label: "Status",
  //       field: "status",
  //       sort: "asc",
  //     },
  //     {
  //       label: "Actions",
  //       field: "actions",
  //       sort: "asc",
  //     },
  //   ],
  //   rows: orders?.map((order) => ({
  //     id: order._id,
  //     numOfItems: order.orderItems.length,
  //     amount: `$${order.totalPrice}`,
  //     status:
  //       order.orderStatus && String(order.orderStatus).includes("Delivered") ? (
  //         <p style={{ color: "green" }}>{order.orderStatus}</p>
  //       ) : (
  //         <p style={{ color: "red" }}>{order.orderStatus}</p>
  //       ),
  //     actions: (
  //       <Link to={`/orders/${order._id}`} className="btn btn-primary">
  //         <i className="fa fa-eye"></i>
  //       </Link>
  //     ),
  //   })),
  // };

  return (
    <>
      <MetaData title="My Orders" />

      <h1 className="my-5">My Orders</h1>

      {loading ? (
        <Loader />
      ) : (
        // <MDBDataTable data={data} className="px-3" bordered striped hover />
        <></>
      )}
    </>
  );
};

export default MyOrders;
