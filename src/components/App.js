import React, { lazy, Suspense, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Swal from "sweetalert2";

import "./App.css";

import { getHome } from "../redux/actions/homeActions";
import {
  loadUser,
  clearErrors,
  socialLogin,
} from "../redux/actions/authActions";
import { Loader } from "./layouts";
const Filter = lazy(() => import("./products/Filter"));
const Home = lazy(() => import("./products/Home"));
const SELLER = lazy(() => import("./users/login-signup/SELLER"));
const Signup = lazy(() => import("./users/login-signup/Signup"));
const Login = lazy(() => import("./users/login-signup/Login"));
const ForgetPassword = lazy(() =>
  import("./users/login-signup/ForgotPassword")
);
const SetPassword = lazy(() => import("./users/login-signup/SetPassword"));
const VerifyOpt = lazy(() => import("./users/login-signup/OptVerify"));

const DetailPage = lazy(() => import("./products/DetailPage/DetailPage"));
const App = () => {
  const dispatch = useDispatch();

  const { error: productsError } = useSelector((state) => state.products);
  const { error: productDetailsError } = useSelector(
    (state) => state.productDetails
  );
  const { error: authError } = useSelector((state) => state.auth);
  const { error: userError } = useSelector((state) => state.user);
  const { error: homeError } = useSelector((state) => state.home);
  // const { error: forgotPasswordError } = useSelector(
  //   state => state.forgotPassword
  // );
  // const { error: cartError } = useSelector(state => state.cart);

  const fire = (error) =>
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error,
      showConfirmButton: true,
      timer: 2000,
    });

  useEffect(() => {
    if (productsError) fire(productsError);
    if (productDetailsError) fire(productDetailsError);
    if (authError) fire(authError);
    if (userError) fire(userError);
    if (homeError) fire(homeError);
    // if (forgotPasswordError) fire(forgotPasswordError);
    // if (cartError) fire(cartError);

    dispatch(clearErrors());
  }, [
    dispatch,
    productsError,
    productDetailsError,
    authError,
    userError,
    homeError,
  ]);

  useEffect(() => {
    const func = async () => {
      dispatch(socialLogin());
      await Promise.all([dispatch(getHome()), dispatch(loadUser())]);
      dispatch(clearErrors());
    };
    func();
  }, [dispatch]);

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/setpassword" element={<SetPassword />} />
            <Route path="/optverify" element={<VerifyOpt />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/detailProduct" element={<DetailPage />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/seller/add" element={<SELLER />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
