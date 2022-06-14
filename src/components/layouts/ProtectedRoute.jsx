import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ isAuth, loading, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuth) navigate('/login?check=true');
  }, [navigate, loading, isAuth]);

  return <>{!loading && isAuth ? children : null}</>;
};

const mapStateToProps = ({ auth }) => ({
  isAuth: auth.isAuth,
  loading: auth.loading,
});

export default connect(mapStateToProps)(ProtectedRoute);
