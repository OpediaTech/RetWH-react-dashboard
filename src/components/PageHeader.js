import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import React from "react";
import CustomButton from "./controls/CustomButton";

const PageHeader = ({ isButton, title, btnText }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <h3 className="header__title">{title}</h3>
      {isButton && (
        <CustomButton
          text={btnText}
          color="primary"
          startIcon={<EditIcon />}
          // onClick={() => setOpen(true)}
        />
      )}
    </Box>
  );
};

export default PageHeader;
