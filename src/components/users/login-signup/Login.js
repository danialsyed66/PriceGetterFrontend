import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Button, FormControl, IconButton, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import {
  Facebook,
  Visibility,
  VisibilityOff,
  Google,
  Twitter,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';

import './Login.css';
import priceGetter from '../../../assets/PriceGetter.svg';
import vector from '../../../assets/Vectors.svg';
import { InputText } from './InputText';
import { login } from '../../../redux/actions/authActions';

const LoginPage = () => {
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter the Email'),
    password: Yup.string().required('please enter the password'),
  });

  const handleFacebook = () => {
    window.open(
      'https://price-getter-backend.herokuapp.com/api/v1/auth/facebook',
      '_self'
    );
  };
  const handleGoogle = () => {
    window.open(
      'https://price-getter-backend.herokuapp.com/api/v1/auth/google',
      '_self'
    );
  };
  const handleTwitter = () => {
    window.open(
      'https://price-getter-backend.herokuapp.com/api/v1/auth/twitter',
      '_self'
    );
  };

  const [values, setValues] = React.useState(false);
  const handleClickShowPassword = () => setValues(!values);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const { isAuth } = useSelector(state => state.auth);
  useEffect(() => {
    if (isAuth) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User Sign In Successfully!!!',
        showConfirmButton: true,
        timer: 2000,
      });
      navigate('/');
    }
  }, [navigate, isAuth]);

  return (
    <div
      className="main_div"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }} className="mb-4">
        <img src={priceGetter} alt="logo" />
        <h2 className="LOGIN_PAGE_TEXT">Login In</h2>
      </div>

      <div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => dispatch(login(values))}
        >
          {({ errors, touched }) => (
            <Form>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
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
                      className="errorText mb-2"
                    >
                      {errors.email}
                    </div>
                  ) : null}
                </div>
              </Stack>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 2 }}
              >
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
                    margin: '0 0 0 0',
                    position: 'relative',
                    right: '-130px',
                    bottom: '30px',
                    padding: '0',
                  }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <div style={{ height: '15px' }}>
                  {errors.password && touched.password ? (
                    <div
                      className="errorText"
                      style={{ position: 'relative', bottom: '18px' }}
                    >
                      {errors.password}
                    </div>
                  ) : null}
                </div>
              </Stack>
              <div className="d-flex justify-content-center align-content-center mb-2">
                <Button
                  style={{ width: '45%', margin: 'auto' }}
                  variant="outlined"
                  startIcon={<Facebook />}
                  onClick={handleFacebook}
                >
                  Facebook
                </Button>
                <Button
                  sx={{ color: 'red', borderColor: 'red' }}
                  style={{ width: '45%', margin: 'auto' }}
                  variant="outlined"
                  startIcon={<Google style={{ color: 'red' }} />}
                  onClick={handleGoogle}
                >
                  Google
                </Button>
              </div>
              <div className="d-flex justify-content-center align-content-center mb-2 ">
                <Button
                  style={{ width: '45%', margin: 'auto' }}
                  variant="outlined"
                  startIcon={<Twitter />}
                  onClick={handleTwitter}
                >
                  Twitter
                </Button>
                <Button
                  sx={{ color: 'green', borderColor: 'green' }}
                  style={{ width: '45%', margin: 'auto' }}
                  variant="outlined"
                  startIcon={<DoneIcon style={{ color: 'Green' }} />}
                  onClick={() => {
                    navigate('/register');
                  }}
                >
                  Register
                </Button>
              </div>

              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  style={{
                    zIndex: '100',
                    margin: '2rem auto auto auto ',
                    background: ' #3EE18F',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    width: '100%',
                  }}
                  variant="contained"
                  type="submit"
                >
                  Login
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

export default LoginPage;
