import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  // Firebase element
  const { userInfo } = useSelector((state) => state.auth);

  const location = useLocation();

  return userInfo && !userInfo?.users?.role ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
