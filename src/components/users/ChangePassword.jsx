import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { MetaData, Loader, Navbar, Footer } from '../layouts';
import fire from '../../utils/swal';
import { changePassword } from '../../redux/actions/userActions';
import { loadUser } from '../../redux/actions/authActions';
import { CHANGE_PASSWORD_RESET } from '../../redux/consts';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isUpdated, loading, error } = useSelector(state => state.user);

  useEffect(() => {
    if (isUpdated) {
      fire('Password changed successfully!', 'success');

      dispatch(loadUser());

      navigate('/');

      dispatch({ type: CHANGE_PASSWORD_RESET });
    }
  }, [error, isUpdated, dispatch, navigate]);

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(changePassword({ oldPassword, password, confirmPassword }));
  };

  return (
    <>
      <MetaData title="Change Password" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={handleSubmit}>
                <h1 className="mt-2 mb-5">Update Password</h1>
                <div className="form-group">
                  <label htmlFor="old_password_field">Old Password</label>
                  <input
                    type="password"
                    id="old_password_field"
                    className="form-control"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new_password_field">New Password</label>
                  <input
                    type="password"
                    id="new_password_field"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirm_password_field">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm_password_field"
                    className="form-control"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: 'lightgrey', borderColor: 'white' }}
                  className="btn update-btn btn-block mt-4 mb-3"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default ChangePassword;
