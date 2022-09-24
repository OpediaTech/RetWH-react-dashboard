import React from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboardLayout">
      <Header />
      <div className="dashboarLayout__container">
        <Menu />
        <div className="dashboardLayout__pages">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
