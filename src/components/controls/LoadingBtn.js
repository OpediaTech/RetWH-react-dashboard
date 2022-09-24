import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingBtn = ({
  onClick,
  className,
  color,
  defaultColor,
  loading,
  size,
  text,
  startIcon,
  ...others
}) => {
  return (
    <div className={`loadingBtn ${className} ${color}`}>
      <LoadingButton
        size={size}
        onClick={onClick}
        loading={loading}
        color={defaultColor}
        variant="contained"
        startIcon={startIcon}
        loadingIndicator={<CircularProgress color="inherit" size={22} />}
        {...others}
      >
        {text}
      </LoadingButton>
    </div>
  );
};

export default LoadingBtn;
