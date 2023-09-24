import React from "react";
import { Route, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PrivateRouter() {
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;
  const token = window.localStorage.getItem("userInfo");
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouter;
