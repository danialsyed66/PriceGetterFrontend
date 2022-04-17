import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Button, FormControl, IconButton } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import eye from "../../../assets/eye.svg";
import eyeslash from "../../../assets/eye-slash.svg";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import priceGetter from "../../../assets/PriceGetter.svg";
import vector from "../../../assets/Vectors.svg";
import { InputText } from "./InputText";
import { Checkboxmui } from "./Checkboxmui";
import { register } from "../../../redux/actions/authActions";

const SignupPage = () => {
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/default_avatar.jpg");

  const handleAvatarUpload = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState !== 2) return;
      if (!reader.result) return;

      setAvatar(reader.result);
      setAvatarPreview(reader.result);
    };

    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = ({ name, email, password, seller }) => {
    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    if (seller) formData.set("role", "seller");
    if (avatar) formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your Email"),
    password: Yup.string().required("Please enter your Password"),
    confirmpassword: Yup.string().when("password", {
      is: (val) => val?.length > 0,
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Your passwords donot match."
      ),
    }),
    name: Yup.string().required("please enter the name"),
  });

  const [values, setValues] = React.useState(false);
  const handleClickShowPassword = () => setValues(!values);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuth) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Sign In Successfully!!!",
        showConfirmButton: true,
        timer: 2000,
      });
      navigate("/");
    }
  }, [dispatch, navigate, isAuth]);

  return (
    <div
      className="main_div"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img src={priceGetter} alt="logo" />
        <h2 className="LOGIN_PAGE_TEXT">SignUp</h2>
      </div>

      <div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmpassword: "",
            seller: "false",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="d-flex flex-column justify-content-center align-content-center mb-2">
                <FormControl sx={{ m: 0.5, width: "40ch" }}>
                  <Field
                    placeholder="User Name"
                    name="name"
                    label="name"
                    component={InputText}
                  />
                </FormControl>
                <div style={{ height: "15px" }}>
                  {errors.name && touched.name ? (
                    <div
                      style={{ width: "100%", textAlign: "center" }}
                      className="errorText mb-1"
                    >
                      {errors.name}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center align-content-center mb-2">
                <FormControl sx={{ m: 0.5, width: "40ch" }}>
                  <Field
                    placeholder="email"
                    name="email"
                    label="email"
                    component={InputText}
                  />
                </FormControl>
                <div style={{ height: "15px" }}>
                  {errors.email && touched.email ? (
                    <div
                      style={{ width: "100%", textAlign: "center" }}
                      className="errorText"
                    >
                      {errors.email}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="d-flex flex-column justify-content-center align-align-items-center ">
                <FormControl sx={{ m: 1, width: "40ch" }}>
                  <Field
                    label="password"
                    name="password"
                    component={InputText}
                    type={values ? "text" : "password"}
                  />
                </FormControl>
                <IconButton
                  style={{
                    margin: "0 0 0 0",
                    padding: "0",
                    position: "relative",
                    right: "-130px",
                    bottom: "30px",
                  }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values ? (
                    <img alt="imgs" src={eye} />
                  ) : (
                    <img alt="" src={eyeslash} />
                  )}
                </IconButton>
                <div style={{ height: "15px", paddingTop: "10px" }}>
                  {errors.password && touched.password ? (
                    <div
                      className="errorText"
                      style={{ position: "relative", bottom: "25px" }}
                    >
                      {errors.password}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center align-content-center">
                <FormControl sx={{ m: 1, width: "40ch" }}>
                  <Field
                    label=" Confirm password"
                    name="confirmpassword"
                    component={InputText}
                    type={values ? "text" : "password"}
                  />
                </FormControl>
                <IconButton
                  style={{
                    margin: "0 0 0 0",
                    padding: "0",
                    position: "relative",
                    right: "-130px",
                    bottom: "30px",
                  }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values ? (
                    <img alt="iss" src={eye} />
                  ) : (
                    <img alt="" src={eyeslash} />
                  )}
                </IconButton>
                <div style={{ height: "15px" }}>
                  {errors.confirmpassword && touched.confirmpassword ? (
                    <div
                      className="errorText"
                      style={{ position: "relative", bottom: "25px" }}
                    >
                      {errors.confirmpassword}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="images/*"
                      onChange={handleAvatarUpload}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>
              <label>
                <Field name="seller" value="true" component={Checkboxmui} />
                Seller
              </label>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{
                    zIndex: "100",
                    margin: "auto",
                    background: " #3EE18F",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)",
                    borderRadius: "10px",
                    width: "100%",
                  }}
                  variant="contained"
                  type="submit"
                >
                  Signup
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <img className="LOGIN_PAGE_IMG" src={vector} alt="LOGIN_PAGE_IMG" />
    </div>
  );
};

export default SignupPage;
