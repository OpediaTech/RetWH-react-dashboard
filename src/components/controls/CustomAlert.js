import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";

const CustomAlert = ({ severity, message, close }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="custom__alert">
      {close ? (
        <Collapse in={open}>
          <Alert
            variant="filled"
            severity={severity}
            onClose={() => {
              setOpen(false);
            }}
          >
            {message}
          </Alert>
        </Collapse>
      ) : (
        <Alert variant="filled" severity={severity}>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default CustomAlert;
