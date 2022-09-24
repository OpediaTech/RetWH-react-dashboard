import React from "react";

const DashboardPageLayout = ({
  table,
  title,
  btnText,
  button,
  children,
  open,
  setOpen,
}) => {
  return (
    <section className="dashboardPageLayout__section">
      <div className="dashboardPageLayout__container"></div>
    </section>
  );
};

export default DashboardPageLayout;
