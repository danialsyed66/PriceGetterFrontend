import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { MetaData, Loader, Navbar, Footer } from "../layouts";

const Profile = ({ user, loading }) => {
  return (
    <>
      <MetaData title="User Profile" />

      {loading || !user ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <h2 className="mt-5 ml-5">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3 d-flex justify-content-center flex-column align-items-center">
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
                className="btn btn-primary my-5"
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
              <div className="d-flex flex-column justify-content-center align-items-start">
                {user.role !== "admin" && (
                  <Link to="/orders" className="btn btn-danger mt-5 w-25">
                    My Orders
                  </Link>
                )}

                <Link
                  to="/profile/password/change"
                  className="btn btn-primary mt-3 w-25"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </div>
          <Footer />
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
