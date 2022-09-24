import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({
  text,
  onClick,
  className,
  size,
  startIcon,
  color,
  defaultColor,
  ...others
}) => {
  return (
    <div className={`customButton ${className} ${color}`}>
      <Button
        variant="contained"
        onClick={onClick}
        size={size}
        color={defaultColor}
        startIcon={startIcon}
        {...others}
      >
        {text}
      </Button>
    </div>
  );
};

export default CustomButton;
