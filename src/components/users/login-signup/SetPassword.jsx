import React, { useState } from 'react';
import priceGetter from '../../../assets/PriceGetter.svg';
import { useNavigate } from 'react-router-dom';
import { MetaData } from '../../layouts';

const SetPassword = ({ history }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleSubmit = async e => {
    e.preventDefault();
  };

  return (
    <div>
      <MetaData title="Set Password" />

      <div className="container-fluid">
        <div className="row align-items-center  Background">
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
                      for="exampleInputEmail1 w-100"
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
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      for="exampleInputEmail1 w-100"
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
    </div>
  );
};

export default SetPassword;
