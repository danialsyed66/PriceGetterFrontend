import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { MetaData, Loader, Navbar, Footer } from "../layouts";
import { resetPassword } from "../../redux/actions/forgotPasswordActions";
import { RESET_PASSWORD_RESET } from "../../redux/consts";
import fire from "../../utils/swal";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, isReset, error } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (isAuth) return navigate("/");

    if (isReset) {
      fire("Password reset successfully! Plaease Login.", "success");

      navigate("/login");

      dispatch({ type: RESET_PASSWORD_RESET });
    }
  }, [isReset, error, navigate, dispatch, isAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPassword(token, { password, confirmPassword }));
  };

  return (
    <>
      <MetaData title="Password Reset Page" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg">
                <h1 className="mb-3">New Password</h1>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  id="new_password_button"
                  type="submit"
                  className="btn btn-block py-3"
                  onClick={handleSubmit}
                >
                  Set Password
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

export default ResetPassword;
