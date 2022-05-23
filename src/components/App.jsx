import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./App.css";
import { Loader, NotFound } from "./layouts";
import {
  loadUser,
  clearErrors,
  socialLogin,
} from "../redux/actions/authActions";
import axios from "../utils/axios";
import fire from "../utils/swal";
import { getHome } from "../redux/actions/homeActions";
import { HANDLE_FAVOURITE_RESET } from "../redux/consts";
import Guide from "./users/Guide";
import Dashboard from "./admin/Dashboard";
const Home = lazy(() => import("./products/Home"));
const Filter = lazy(() => import("./products/Filter"));
const DetailPage = lazy(() => import("./products/DetailPage/DetailPage"));
const SELLER = lazy(() => import("./users/login-signup/SELLER"));
const Login = lazy(() => import("./users/login-signup/Login"));
const Signup = lazy(() => import("./users/login-signup/Signup"));
const ForgetPassword = lazy(() =>
  import("./users/login-signup/ForgotPassword")
);
const SetPassword = lazy(() => import("./users/login-signup/SetPassword"));
const VerifyOtp = lazy(() => import("./users/login-signup/OtpVerify"));

const ProtectedRoute = lazy(() => import("./layouts/ProtectedRoute"));
const Profile = lazy(() => import("./users/Profile"));
const UpdateProfile = lazy(() => import("./users/UpdateProfile"));
const ChangePassword = lazy(() => import("./users/ChangePassword"));
const ForgotPassword = lazy(() => import("./users/ForgotPassword"));
const ResetPassword = lazy(() => import("./users/ResetPassword"));
const Cart = lazy(() => import("./cart/Cart"));
const Shipping = lazy(() => import("./cart/Shipping"));
const ConfirmOrder = lazy(() => import("./cart/ConfirmOrder"));
const Payment = lazy(() => import("./cart/Payment"));
const Success = lazy(() => import("./cart/Success"));
const MyOrders = lazy(() => import("./order/MyOrders"));
const OrderDetails = lazy(() => import("./order/OrderDetails"));
const Forum = lazy(() => import("./forums/Forum"));
const PostPage = lazy(() => import("./forums/PostPage"));
const Wishlist = lazy(() => import("./users/Wishlist"));

const App = () => {
  const [stripeKey, setStripeKey] = useState("");
  const dispatch = useDispatch();

  const { error: productsError } = useSelector((state) => state.products);
  const { error: productDetailsError } = useSelector(
    (state) => state.productDetails
  );
  const { error: authError } = useSelector((state) => state.auth);
  const { error: userError } = useSelector((state) => state.user);
  const { error: homeError } = useSelector((state) => state.home);
  const { error: forgotPasswordError } = useSelector(
    (state) => state.forgotPassword
  );
  const { error: cartError } = useSelector((state) => state.cart);
  const { error: orderError } = useSelector((state) => state.order);
  const { error: myOrdersError } = useSelector((state) => state.myOrders);
  const { error: orderDetailsError } = useSelector(
    (state) => state.orderDetails
  );
  const { error: reviewError } = useSelector((state) => state.review);
  const { error: forumsError } = useSelector((state) => state.forums);

  const { isAuth } = useSelector((state) => state.auth);
  const { isUpdated } = useSelector((state) => state.user);

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

    if (window.location.pathname === "/wishlist") return;

    dispatch(loadUser());

    dispatch({ type: HANDLE_FAVOURITE_RESET });
  }, [dispatch, isUpdated]);

  useEffect(() => {
    const getStripeApiKey = async () => {
      try {
        const {
          data: { data },
        } = await axios.get("api/v1/payment/getStripeApiKey");

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
            <Route path="/setpassword" element={<SetPassword />} />
            <Route path="/otpverify" element={<VerifyOtp />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/password/forgot" exact element={<ForgotPassword />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/forums" exact element={<Forum />} />
            <Route path="/forums/post/:id" exact element={<PostPage />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
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
              path="/password/reset/:token"
              exact
              element={
                <ProtectedRoute>
                  <ResetPassword />
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
