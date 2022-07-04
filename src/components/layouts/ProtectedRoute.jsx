import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import NotFound from './notfound/NotFound';

const ProtectedRoute = ({ isAuth, loading, role, children, isSeller }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuth) navigate('/login?check=true');
  }, [navigate, loading, isAuth]);

  // useEffect(() => {
  //   if (isAuth && isSeller && role !== 'seller') navigate('/');
  // }, [navigate, isAuth, isSeller, role]);

  // return <>{!loading && isAuth ? children : null}</>;
  return (
    <>
      {!loading && isAuth ? (
        isSeller ? (
          role === 'seller' ? (
            children
          ) : (
            <NotFound forSeller />
          )
        ) : (
          children
        )
      ) : null}
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  isAuth: auth.isAuth,
  loading: auth.loading,
  role: auth.user?.role,
});

export default connect(mapStateToProps)(ProtectedRoute);
