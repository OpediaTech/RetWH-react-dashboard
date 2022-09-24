import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Forbidden = () => {
  // Redux element
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.users) {
      navigate("/login");
    } else {
      // navigate("/dashboard");
    }
  }, [userInfo, navigate]);
  return (
    <>
      <Header />
      <div className="forbidden">
        <h1 className="forbidden__status">403</h1>
        <h1 className="forbidden__title">Forbidden</h1>
        <h4 className="forbidden__desc">
          You don't have permission to access on this server.
        </h4>
      </div>
    </>
  );
};

export default Forbidden;
