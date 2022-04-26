import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { MetaData, Loader } from '../layouts';

const Profile = ({ user, loading }) => {
  return (
    <>
      <MetaData title="User Profile" />

      {loading || !user ? (
        <Loader />
      ) : (
        <>
          <h2 className="mt-5 ml-5">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src={user.avatar?.url}
                  alt={user.name}
                />
              </figure>
              <Link
                to="/profile/edit"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>

              <h4>Joined On</h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>

              {user.role !== 'admin' && (
                <Link to="/orders" className="btn btn-danger btn-block mt-5">
                  My Orders
                </Link>
              )}

              <Link
                to="/profile/password/change"
                className="btn btn-primary btn-block mt-3"
              >
                Change Password
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  loading: auth.loading,
});

export default connect(mapStateToProps)(Profile);
