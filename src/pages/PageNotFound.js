import React from "react";
import Header from "../components/Header";

const PageNotFound = () => {
  return (
    <>
      <Header />
      <div className="forbidden">
        <h1 className="forbidden__status">404</h1>
        <h1 className="forbidden__title">Page not found</h1>
        {/* <h4 className="forbidden__desc">
          You don't have permission to access on this server.
        </h4> */}
      </div>
    </>
  );
};

export default PageNotFound;
