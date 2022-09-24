import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";



const MyRouteRule = () => {
  // Firebase element
  const { userInfo } = useSelector((state) => state.auth);

  const location = useLocation();


  return userInfo && userInfo?.users ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};

export default MyRouteRule;


//Delower Hasan created this group