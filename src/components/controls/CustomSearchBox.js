import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import React from "react";

const CustomSearchBox = ({ placeholder }) => {
  return (
    <div className="customSearchBox">
      <input disabled type="text" placeholder={placeholder} />
      <IconButton size="small" disabled>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default CustomSearchBox;
