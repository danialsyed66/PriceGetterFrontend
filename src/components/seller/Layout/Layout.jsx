import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar';
import './layout.css';

export default function Layout({ children }) {
  const [active, setHandleActive] = useState(false);

  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // redirecting unAuthorized user
  useEffect(() => {
    auth === null && navigate('/');
  }, [auth, navigate]);

  // main retrun
  return (
    <div className="dashboardMainDiv">
      <Sidebar active={active} setHandleActive={setHandleActive} />
      <div className="headerSec">
        <Header active={active} setHandleActive={setHandleActive} />
        <div className="contentMainSec" id="contentSec">
          {children}
        </div>
      </div>
    </div>
  );
}
