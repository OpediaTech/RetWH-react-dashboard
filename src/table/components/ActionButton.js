import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Stack } from "@mui/material";
import React from "react";

const ActionButton = ({ handleClick, onClick, row, view, isDisabled }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="center"
    >
      {isDisabled ? (
        <IconButton color="info" onClick={handleClick}>
          {view ? (
            <VisibilityIcon fontSize="small" />
          ) : (
            <ModeEditIcon fontSize="small" />
          )}
        </IconButton>
      ) : (
        <>
          <IconButton color="info" onClick={handleClick}>
            {view ? (
              <VisibilityIcon fontSize="small" />
            ) : (
              <ModeEditIcon fontSize="small" />
            )}
          </IconButton>

          <IconButton color="error" onClick={onClick} disabled={isDisabled}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </Stack>
  );
};

export default ActionButton;
