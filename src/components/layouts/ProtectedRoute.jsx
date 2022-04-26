import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ isAuth, loading, children }) => {
  const navigate = useNavigate();

  return <>{!loading && isAuth ? children : navigate('/login')}</>;
};

const mapStateToProps = ({ auth }) => ({
  isAuth: auth.isAuth,
  loading: auth.loading,
});

export default connect(mapStateToProps)(ProtectedRoute);
