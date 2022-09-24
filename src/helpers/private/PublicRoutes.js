import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoutes = () => {
  // Redux element
  const { userInfo } = useSelector((state) => state.auth);

  const location = useLocation();

  return userInfo ? (
    <Navigate to="dashboard" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoutes;
