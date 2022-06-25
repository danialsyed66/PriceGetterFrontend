import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Login.css';
import priceGetter from '../../../assets/PriceGetter.svg';

import { Loader, MetaData } from '../../layouts';
import fire from '../../../utils/swal';
import { isValidEmail } from '../../../utils/validation';
import { FORGOT_PASSWORD_RESET } from '../../../redux/consts';
import { forgotPassword } from '../../../redux/actions/forgotPasswordActions';

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const { loading, mailSent, message } = useSelector(
    state => state.forgotPassword
  );
  const { isAuth } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuth) return navigate('/');

    if (mailSent) {
      fire(message, 'success');

      navigate('/otpverify');

      dispatch({ type: FORGOT_PASSWORD_RESET });
    }
  }, [message, mailSent, navigate, dispatch, isAuth]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!isValidEmail(email)) return fire('Your email is not valid.');

    dispatch(forgotPassword(email));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />

          <div>
            <div className="container-fluid">
              <div className="row align-items-center Background">
                <div
                  className="offset-md-4 col-md-4 offset-md-3 h-100  d-flex   align-items-center justify-content-center"
                  style={{ flexDirection: 'column' }}
                >
                  <img
                    src={priceGetter}
                    style={{ width: '220px', cursor: 'pointer' }}
                    alt="logo"
                    onClick={() => {
                      navigate('/');
                    }}
                  />

                  <h1
                    className="mt-3"
                    style={{
                      textAlign: 'center',
                      fontSize: '25px',
                      color: '#5A5A5A',
                      fontFamily: 'Ubuntu',
                      fontStyle: 'normal',
                      fontWeight: '900',
                    }}
                  >
                    Forgot Your Password?
                  </h1>
                  <span className="mb-4 w-75" style={{ textAlign: 'center' }}>
                    Enter your email address, and we will send you a code to
                    verify your account and reset your password.
                  </span>
                  <form className="w-75 mt-3" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label
                        htmlFor="exampleInputEmail1 w-100"
                        style={{ color: '#696969', fontWeight: 'bolder' }}
                      >
                        Email
                      </label>

                      <input
                        type="email"
                        required
                        onChange={e => {
                          setEmail(e.target.value);
                        }}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email Address"
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        marginTop: '1rem',
                        height: '40px',
                        color: '#FFFFFF',
                        backgroundColor: ' #3EE18F',
                      }}
                      className="btn btn-light mt-3"
                    >
                      Submit
                    </button>
                    {/* <div style={{ textAlign: 'center', marginTop: '20px' }}> */}
                    <div className="d-flex justify-content-between px-3 mt-4">
                      <Link
                        className="login_p"
                        to="/login "
                        style={{ color: ' #3EE18F', fontWeight: 'bolder' }}
                      >
                        Return to log In
                      </Link>
                      <Link
                        className="login_p"
                        to="/otpverify "
                        style={{ color: ' #3EE18F', fontWeight: 'bolder' }}
                      >
                        I have the OTP
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ForgotPassword;
