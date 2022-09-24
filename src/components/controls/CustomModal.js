import { Modal } from "@mui/material";
import React from "react";

const CustomModal = ({ open, setOpen, children }) => {
  return (
    <div className="customModal">
      <Modal open={open} onClose={() => setOpen(false)}>
        <>{children}</>
      </Modal>
    </div>
  );
};

export default CustomModal;
