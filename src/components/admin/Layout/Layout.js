import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar";
import Dashboard from "../Dashboard";

import "./layout.css";

export default function Layout({ children }) {
  const [active, setHandleActive] = useState(false);

  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // redirecting unAuthorized user
  useEffect(() => {
    auth === null && navigate("/");
    return () => {};
  }, []);

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
