// import Button from "@mui/material/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import LoadingBtn from "../../components/controls/LoadingBtn";

export default function DeleteDialog({
  deleteDialog,
  setDeleteDialog,
  onClick,
  loading,
}) {
  const handleClose = () => {
    setDeleteDialog(false);
  };

  return (
    <div>
      <Dialog
        open={deleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <HighlightOffIcon sx={{ fontSize: 80 }} color="error" />
        </div>
        <DialogTitle id="alert-dialog-title" textAlign="center">
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" textAlign="center">
            Do you really want to delete these records? This process cannot be
            undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            paddingBottom: "1.5rem",
          }}
        >
          <LoadingBtn
            text="Cancel"
            defaultColor="inherit"
            type="submit"
            onClick={handleClose}
          />

          <LoadingBtn
            text="Delete"
            defaultColor="error"
            type="submit"
            loading={loading}
            onClick={onClick}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
