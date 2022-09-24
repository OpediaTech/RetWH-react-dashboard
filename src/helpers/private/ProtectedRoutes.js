import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ roles }) => {
  // Redux element
  const { userInfo } = useSelector((state) => state.auth);

  const location = useLocation();

  return userInfo && roles?.includes(userInfo?.users?.role) ? (
    <Outlet />
  ) : !userInfo?.users?.role && userInfo ? (
    <Navigate to="forbidden" state={{ from: location }} replace />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
