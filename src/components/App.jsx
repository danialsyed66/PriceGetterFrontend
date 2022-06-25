import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import { Loader, NotFound } from './layouts';
import axios from '../utils/axios';
import fire from '../utils/swal';
import {
  loadUser,
  clearErrors,
  socialLogin,
} from '../redux/actions/authActions';
import { getHome } from '../redux/actions/homeActions';
import { HANDLE_FAVOURITE_RESET } from '../redux/consts';

const Guide = lazy(() => import('./Guide'));
const Home = lazy(() => import('./products/Home'));
const Filter = lazy(() => import('./products/Filter'));
const DetailPage = lazy(() => import('./products/DetailPage/DetailPage'));

const SELLER = lazy(() => import('./users/login-signup/SELLER'));
const Login = lazy(() => import('./users/login-signup/Login'));
const Signup = lazy(() => import('./users/login-signup/Signup'));
const ForgotPassword = lazy(() =>
  import('./users/login-signup/ForgotPassword')
);
const ResetPassword = lazy(() => import('./users/login-signup/ResetPassword'));
const VerifyOtp = lazy(() => import('./users/login-signup/OtpVerify'));

const ProtectedRoute = lazy(() => import('./layouts/ProtectedRoute'));
const Profile = lazy(() => import('./users/Profile'));
const UpdateProfile = lazy(() => import('./users/UpdateProfile'));
const ChangePassword = lazy(() => import('./users/ChangePassword'));
const Wishlist = lazy(() => import('./users/Wishlist'));

const Cart = lazy(() => import('./cart/Cart'));
const Shipping = lazy(() => import('./cart/Shipping'));
const ConfirmOrder = lazy(() => import('./cart/ConfirmOrder'));
const Payment = lazy(() => import('./cart/Payment'));
const Success = lazy(() => import('./cart/Success'));

const MyOrders = lazy(() => import('./order/MyOrders'));
const OrderDetails = lazy(() => import('./order/OrderDetails'));
const Forum = lazy(() => import('./forums/Forum'));
const PostPage = lazy(() => import('./forums/PostPage'));

const Dashboard = lazy(() => import('./seller/Dashboard'));
const NewProduct = lazy(() => import('./seller/NewProduct'));
const UpdateProduct = lazy(() => import('./seller/UpdateProduct'));
const SellerProducts = lazy(() => import('./seller/SellerProducts'));
const SellerOrders = lazy(() => import('./seller/SellerOrders'));
const SellerOrder = lazy(() => import('./seller/SellerOrder'));

const App = () => {
  const [stripeKey, setStripeKey] = useState('');
  const dispatch = useDispatch();

  const { error: productsError } = useSelector(state => state.products);
  const { error: productDetailsError } = useSelector(
    state => state.productDetails
  );
  const { error: authError } = useSelector(state => state.auth);
  const { error: userError } = useSelector(state => state.user);
  const { error: homeError } = useSelector(state => state.home);
  const { error: forgotPasswordError } = useSelector(
    state => state.forgotPassword
  );
  const { error: cartError } = useSelector(state => state.cart);
  const { error: orderError } = useSelector(state => state.order);
  const { error: myOrdersError } = useSelector(state => state.myOrders);
  const { error: orderDetailsError } = useSelector(state => state.orderDetails);
  const { error: reviewError } = useSelector(state => state.review);
  const { error: forumsError } = useSelector(state => state.forums);
  const { error: sellerError } = useSelector(state => state.seller);

  const { isAuth } = useSelector(state => state.auth);
  const { isUpdated } = useSelector(state => state.user);

  useEffect(() => {
    if (productsError) fire(productsError);
    if (productDetailsError) fire(productDetailsError);
    if (authError) fire(authError);
    if (userError) fire(userError);
    if (homeError) fire(homeError);
    if (forgotPasswordError) fire(forgotPasswordError);
    if (cartError) fire(cartError);
    if (orderError) fire(orderError);
    if (myOrdersError) fire(myOrdersError);
    if (orderDetailsError) fire(orderDetailsError);
    if (reviewError) fire(reviewError);
    if (forumsError) fire(forumsError);
    if (sellerError) fire(sellerError);

    dispatch(clearErrors());
  }, [
    dispatch,
    productsError,
    productDetailsError,
    authError,
    userError,
    homeError,
    forgotPasswordError,
    cartError,
    orderError,
    myOrdersError,
    orderDetailsError,
    reviewError,
    forumsError,
    sellerError,
  ]);

  useEffect(() => {
    const func = async () => {
      dispatch(socialLogin());
      await Promise.all([dispatch(getHome()), dispatch(loadUser())]);
      dispatch(clearErrors());
    };
    func();
  }, [dispatch]);

  useEffect(() => {
    if (!isUpdated) return;

    if (window.location.pathname === '/wishlist') return;

    dispatch(loadUser());

    dispatch({ type: HANDLE_FAVOURITE_RESET });
  }, [dispatch, isUpdated]);

  useEffect(() => {
    const getStripeApiKey = async () => {
      try {
        const {
          data: { data },
        } = await axios.get('api/v1/payment/getStripeApiKey');

        setStripeKey(data.stripeApiKey);
      } catch (err) {
        console.log(err);
      }
    };

    if (isAuth) getStripeApiKey();
  }, [isAuth]);

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/product/:id" element={<DetailPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/seller/add" element={<SELLER />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/otpverify" element={<VerifyOtp />} />
            <Route path="/resetpassword/:otp" element={<ResetPassword />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/forums" exact element={<Forum />} />
            <Route path="/forums/post/:id" exact element={<PostPage />} />
            <Route path="/seller">
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="product"
                element={
                  <ProtectedRoute>
                    <NewProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="product/:id"
                element={
                  <ProtectedRoute>
                    <UpdateProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="products"
                element={
                  <ProtectedRoute>
                    <SellerProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <ProtectedRoute>
                    <SellerOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="orders/:id"
                element={
                  <ProtectedRoute>
                    <SellerOrder />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="/wishlist"
              exact
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shipping"
              exact
              element={
                <ProtectedRoute>
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirmOrder"
              exact
              element={
                <ProtectedRoute>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              exact
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit"
              exact
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/password/change"
              exact
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            {stripeKey ? (
              <Route
                path="/payment"
                exact
                element={
                  <Elements stripe={loadStripe(stripeKey)}>
                    <ProtectedRoute>
                      <Payment />
                    </ProtectedRoute>
                  </Elements>
                }
              />
            ) : null}
            <Route
              path="/success"
              exact
              element={
                <ProtectedRoute>
                  <Success />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              exact
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              exact
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
