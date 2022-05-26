import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';

import { MetaData, Loader } from '../layouts';
import Layout from './layout/Layout';
import { getSellerProducts } from '../../redux/actions/sellerActions';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.seller);

  useEffect(() => {
    dispatch(getSellerProducts());
  }, [dispatch]);

  const data = {
    columns: [
      // {
      //   label: 'Product ID',
      //   field: 'id',
      //   sort: 'asc',
      // },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
      },
      {
        label: 'Price',
        field: 'price',
        sort: 'asc',
      },
      {
        label: 'Discount',
        field: 'discount',
        sort: 'asc',
      },
      {
        label: 'Rating',
        field: 'rating',
        sort: 'asc',
      },
      {
        label: 'Actions',
        field: 'actions',
        sort: 'asc',
      },
    ],
    rows: products?.map(product => ({
      id: product._id,
      name: product.name,
      price: `Rs. ${product.price}`,
      discount: `${product.discount || 0}%`,
      rating: product.rating,
      actions: (
        <>
          <Link to={`/product/${product._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
          <Link
            to={`/seller/product/${product._id}`}
            className="btn btn-warning ml-2"
          >
            <i className="fa fa-pencil"></i>
          </Link>
        </>
      ),
    })),
  };

  return (
    <>
      <MetaData title="My Products" />

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
