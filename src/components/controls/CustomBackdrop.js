import { CircularProgress } from "@mui/material";
import React from "react";

const CustomBackdrop = ({ open, handleClose }) => {
  return (
    <div className="customBackdrop">
      <CircularProgress color="inherit" />
    </div>
  );
};

export default CustomBackdrop;
