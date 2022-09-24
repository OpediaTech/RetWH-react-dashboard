import { Snackbar } from "@mui/material";
import React from "react";

import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomNotification = ({ notify, setNotify }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({ ...notify, open: false });
  };
  return (
    <div className="custom__notification">
      <Snackbar
        open={notify?.open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert severity={notify?.type} onClose={handleClose}>
          {notify?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomNotification;
