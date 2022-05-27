import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';
import priceGetter from '../../../assets/PriceGetter.svg';

import { MetaData } from '../../layouts';

function ForgotPassword() {
  const [setEmail] = useState('');
  const loading = false;
  const navigate = useNavigate();

  return (
    <>
      {loading ? null : (
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
                    style={{
                      textAlign: 'center',
                      fontSize: '25px',
                      color: '#5A5A5A',
                      fontFamily: 'Ubuntu',
                      fontStyle: 'normal',
                      fontWeight: '900',
                    }}
                  >
                    Forget Your Password?
                  </h1>
                  <span className="mb-4 w-75" style={{ textAlign: 'center' }}>
                    Enter your email address, and we will send you a code to
                    verify your account and reset your password.
                  </span>
                  <form className="w-75">
                    <div className="form-group mb-3">
                      <label
                        htmlFor="exampleInputEmail1 w-100"
                        style={{ color: '#696969', fontWeight: 'bolder' }}
                      >
                        Email
                      </label>

                      <input
                        type="text"
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
                      className="btn btn-light"
                    >
                      Submit
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      <Link
                        className="login_p"
                        to="/login "
                        style={{ color: ' #3EE18F', fontWeight: 'bolder' }}
                      >
                        Return to log in
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
