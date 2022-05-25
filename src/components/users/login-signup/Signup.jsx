import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Button, FormControl, IconButton } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Login.css';

import eye from '../../../assets/eye.svg';
import eyeslash from '../../../assets/eye-slash.svg';
import priceGetter from '../../../assets/PriceGetter.svg';

import { InputText } from './InputText';

import { register } from '../../../redux/actions/authActions';
import fire from '../../../utils/swal';
import { Loader, MetaData } from '../../layouts';

const SignupPage = () => {
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/default_avatar.jpg');
  const [seller, setSeller] = useState(false);

  const handleAvatarUpload = e => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState !== 2) return;
      if (!reader.result) return;

      setAvatar(reader.result);
      setAvatarPreview(reader.result);
    };

    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = ({ name, email, password }) => {
    const formData = new FormData();

    formData.set('name', name);
    formData.set('email', email);
    formData.set('password', password);
    if (seller) formData.set('role', seller);
    if (avatar) formData.set('avatar', avatar);

    dispatch(register(formData));
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter your Email'),
    password: Yup.string().required('Please enter your Password'),
    confirmpassword: Yup.string().when('password', {
      is: val => val?.length > 0,
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Your passwords donot match.'
      ),
    }),
    name: Yup.string().required('please enter the name'),
  });

  const [values, setValues] = React.useState(false);
  const handleClickShowPassword = () => setValues(!values);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const { loading, isAuth } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuth) {
      fire('User Sign In Successfully!', 'success');

      navigate('/');
    }
  }, [dispatch, navigate, isAuth]);

  return (
    <div
      className="main_div background"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MetaData title="SignUp" />

      <div style={{ textAlign: 'center' }}>
        <img
          src={priceGetter}
          style={{ width: '220px', cursor: 'pointer' }}
          alt="logo"
          onClick={() => {
            navigate('/');
          }}
        />

        <h2 className="LOGIN_PAGE_TEXT">SignUp</h2>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="p-3">
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmpassword: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="d-flex flex-column justify-content-center align-content-center mb-2">
                  <FormControl sx={{ m: 0.5, width: '40ch' }}>
                    <Field
                      placeholder="User Name"
                      name="name"
                      label="name"
                      component={InputText}
                    />
                  </FormControl>
                  <div style={{ height: '15px' }}>
                    {errors.name && touched.name ? (
                      <div
                        style={{ width: '100%', textAlign: 'center' }}
                        className="errorText mb-1"
                      >
                        {errors.name}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-content-center mb-2">
                  <FormControl sx={{ m: 0.5, width: '40ch' }}>
                    <Field
                      placeholder="email"
                      name="email"
                      label="email"
                      component={InputText}
                    />
                  </FormControl>
                  <div style={{ height: '15px' }}>
                    {errors.email && touched.email ? (
                      <div
                        style={{ width: '100%', textAlign: 'center' }}
                        className="errorText"
                      >
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="d-flex flex-column justify-content-center align-align-items-center ">
                  <FormControl sx={{ m: 1, width: '40ch' }}>
                    <Field
                      label="password"
                      name="password"
                      component={InputText}
                      type={values ? 'text' : 'password'}
                    />
                  </FormControl>
                  <IconButton
                    style={{
                      marginTop: '-35px',
                      marginLeft: '300px',
                      width: '5px',
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
                  <div style={{ height: '25px' }}>
                    {errors.password && touched.password ? (
                      <div
                        style={{ width: '100%', textAlign: 'center' }}
                        className="errorText"
                      >
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-content-center">
                  <FormControl sx={{ m: 1, width: '40ch' }}>
                    <Field
                      label=" Confirm password"
                      name="confirmpassword"
                      component={InputText}
                      type={values ? 'text' : 'password'}
                    />
                  </FormControl>
                  <IconButton
                    style={{
                      width: '5px',
                      marginTop: '-35px',
                      marginLeft: '300px',
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
                  <div style={{ height: '15px' }}>
                    {errors.confirmpassword && touched.confirmpassword ? (
                      <div
                        style={{ width: '100%', textAlign: 'center' }}
                        className="errorText"
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
                  <input
                    name="seller"
                    className="mr-5"
                    onClick={() => {
                      setSeller(!seller);
                    }}
                    type="checkbox"
                  />
                  Seller
                </label>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    className="mb-2"
                    style={{
                      margin: 'auto',
                      background: ' #3EE18F',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
                      borderRadius: '10px',
                      width: '100%',
                    }}
                    variant="contained"
                    type="submit"
                  >
                    Signup
                  </Button>
                </div>
                <div className="d-flex justify-content-between align-align-items-center">
                  <p
                    className="login_p"
                    onClick={() => {
                      navigate('/login');
                    }}
                  >
                    Already have account?
                  </p>
                  <p
                    className="login_p"
                    onClick={() => {
                      navigate('/forgetpassword');
                    }}
                  >
                    ForgetPassword
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
