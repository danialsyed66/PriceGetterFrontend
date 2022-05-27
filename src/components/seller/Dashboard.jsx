import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/layouts';
import { getDashboard } from '../../redux/actions/sellerActions';
import Layout from './layout/Layout';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { dashboard, loading } = useSelector(state => state.seller);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);
  useEffect(() => {
    console.log(dashboard);
  }, [dashboard]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <div className="row p-5">
          <div className="col-12">
            <div className="row pr-4 mb-5">
              <div className="col-xl-12 col-sm-12 mb-3">
                <div className="card text-white bg-primary o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Total Amount
                      <br /> <b>Rs. {dashboard?.revenue?.total}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row pr-">
              <div className="col-xl-4 col-sm-6 mb-3">
                <div className="card text-white bg-success o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Products
                      <br /> <b>{dashboard?.productsCount}</b>
                    </div>
                  </div>
                  <Link
                    className="card-footer text-white clearfix small z-1"
                    to="/seller/products"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-4 col-sm-6 mb-3">
                <div className="card text-white bg-danger o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Orders
                      <br /> <b>{dashboard?.ordersCount}</b>
                    </div>
                  </div>
                  <Link
                    className="card-footer text-white clearfix small z-1"
                    to="/seller/orders"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-4 col-sm-6 mb-3">
                <div className="card text-white bg-warning o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Out of Stock
                      <br /> <b>{dashboard?.outOfStockProducts}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
