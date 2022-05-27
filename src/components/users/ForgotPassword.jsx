import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { MetaData, Loader } from '../layouts';
import fire from '../../utils/swal';
import { forgotPassword } from '../../redux/actions/forgotPasswordActions';
import { FORGOT_PASSWORD_RESET } from '../../redux/consts';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const { loading, mailSent, message, error } = useSelector(
    state => state.forgotPassword
  );
  const { isAuth } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) return navigate('/');

    if (mailSent) {
      fire(message, 'success');

      navigate('/');

      dispatch({ type: FORGOT_PASSWORD_RESET });
    }
  }, [message, mailSent, error, navigate, dispatch, isAuth]);

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  };

  return (
    <>
      <MetaData title="Forgot Password" />

      {loading ? (
        <Loader />
      ) : (
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg">
              <h1 className="mb-3">Forgot Password</h1>
              <div className="form-group">
                <label htmlFor="email_field">Enter Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <button
                id="forgot_password_button"
                type="submit"
                className="btn btn-block py-3"
                onClick={handleSubmit}
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
