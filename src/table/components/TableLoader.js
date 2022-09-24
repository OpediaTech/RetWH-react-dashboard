import { CircularProgress } from "@mui/material";
import React from "react";

const TableLoader = () => {
  return (
    <div className="table__loader">
      <CircularProgress color="inherit" size={30} />
    </div>
  );
};

export default TableLoader;
