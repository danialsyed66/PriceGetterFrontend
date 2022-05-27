import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Button, FormControl, IconButton, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';

import './Login.css';

import eye from '../../../assets/eye.svg';
import eyeslash from '../../../assets/eye-slash.svg';
import Facebook from '../../../utils/Facebook';
import Twitter from '../../../utils/Twitter';
import Google from '../../../utils/Google';
import Done from '../../../utils/Done';

import priceGetter from '../../../assets/PriceGetter.svg';
import { InputText } from './InputText';
import { login } from '../../../redux/actions/authActions';
import { SERVER_URI } from '../../../redux/consts';
import fire from '../../../utils/swal';
import { Loader, MetaData } from '../../layouts';

const LoginPage = () => {
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter the Email'),
    password: Yup.string().required('please enter the password'),
  });

  const handleFacebook = () => {
    window.open(`${SERVER_URI}/api/v1/auth/facebook`, '_self');
  };
  const handleGoogle = () => {
    window.open(`${SERVER_URI}/api/v1/auth/google`, '_self');
  };
  const handleTwitter = () => {
    window.open(`${SERVER_URI}/api/v1/auth/twitter`, '_self');
  };

  const [values, setValues] = React.useState(false);
  const handleClickShowPassword = () => setValues(!values);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const check = useQuery().get('check');

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const { isAuth, loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuth) {
      if (check) return navigate(`/?redirect=true`);

      fire('User Sign In Successfully!', 'success');

      navigate('/');
    }
  }, [isAuth, navigate, check]);

  return (
    <div
      className="main_div background "
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <MetaData title="Login" />

      <div style={{ textAlign: 'center' }} className="mb-4">
        <img
          src={priceGetter}
          style={{ width: '220px', cursor: 'pointer' }}
          alt="logo"
          onClick={() => {
            navigate('/');
          }}
        />

        <h2 className="LOGIN_PAGE_TEXT">Login In</h2>
      </div>

      {loading ? (
        <Loader />
      ) : (
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
                    {values ? (
                      <img alt="imgs" src={eye} />
                    ) : (
                      <img alt="imgs" src={eyeslash} />
                    )}
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
                    startIcon={<Done style={{ color: 'Green' }} />}
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
                      margin: '2rem auto 1rem auto ',
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
                <p
                  className="login_p"
                  onClick={() => {
                    navigate('/forgetpassword');
                  }}
                >
                  ForgetPassword
                </p>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
