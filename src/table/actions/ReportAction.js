import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useState } from "react";
import CustomButton from "../../components/controls/CustomButton";
import CustomModal from "../../components/controls/CustomModal";
import ReportInvoice from "../../components/ReportInvoice";

const ReportAction = ({ row }) => {
  // States
  const [open, setOpen] = useState(false);

  const handleClick = (id) => {
    setOpen(true);
  };

  return (
    <>
      <CustomButton
        text="View"
        defaultColor="info"
        size="small"
        startIcon={<VisibilityIcon />}
        style={{ width: "100%" }}
        onClick={() => handleClick(row?.original?._id)}
      />

      <CustomModal open={open} setOpen={setOpen} title="Sales Report">
        <ReportInvoice row={row} setOpen={setOpen} />
      </CustomModal>
    </>
  );
};

export default ReportAction;
