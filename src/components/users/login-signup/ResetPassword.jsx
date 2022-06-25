import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import priceGetter from '../../../assets/PriceGetter.svg';
import { resetPassword } from '../../../redux/actions/forgotPasswordActions';
import { RESET_PASSWORD_RESET, VERIFY_OTP_RESET } from '../../../redux/consts';
import fire from '../../../utils/swal';

import { Loader, MetaData } from '../../layouts';

const ResetPassword = () => {
  const { otp } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const { loading, isReset, otpVarified } = useSelector(
    state => state.forgotPassword
  );
  const { isAuth } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuth) return navigate('/');

    if (isReset) {
      fire('Password reset successfully! Plaease Login.', 'success');

      navigate('/login');

      dispatch({ type: RESET_PASSWORD_RESET });
      dispatch({ type: VERIFY_OTP_RESET });
    }
  }, [isReset, navigate, dispatch, isAuth]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!otp || !otpVarified) {
      fire('Please verify your OTP first.');
      return navigate('/otpverify');
    }

    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword)
      return fire('Your passwords donot match');

    dispatch(resetPassword(otp, { password: newPassword, confirmPassword }));
  };

  return (
    <div>
      <MetaData title="Reset Password" />

      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid">
          <div className="row align-items-center  Background">
            <div
              className="offset-md-4 col-md-4 offset-md-3 h-100 d-flex align-items-center justify-content-center"
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
                Reset password
              </h1>

              <div
                className="d-flex justify-content-center align-items-center"
                style={{ marginTop: '10px' }}
              >
                <form
                  action=""
                  className="w-100"
                  onChange={({ target: { name, value } }) =>
                    setFormData({ ...formData, [name]: value })
                  }
                  onSubmit={handleSubmit}
                >
                  <div className="form-group mb-3">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1 w-100"
                        style={{ color: '#696969', fontWeight: 'bolder' }}
                      >
                        New Password
                      </label>

                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Password"
                        name="newPassword"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1 w-100"
                        style={{ color: '#696969', fontWeight: 'bolder' }}
                      >
                        Confirm Password
                      </label>

                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="confirm password"
                        name="confirmPassword"
                        required
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      type="submit"
                      style={{
                        width: '50%',
                        marginTop: '1rem',
                        height: '40px',
                        color: '#FFFFFF',
                        backgroundColor: ' #3EE18F',
                      }}
                      className="btn btn-light"
                    >
                      save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
