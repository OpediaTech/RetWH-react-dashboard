import { Box, Chip } from "@mui/material";
import React from "react";

const PaymentStatus = ({ row, status, report }) => {
  let value = row?.original?.payment_status;

  let color =
    value === "pending"
      ? "warning"
      : value === "paid"
      ? "success"
      : value === "cancelled"
      ? "error"
      : "default";

  return (
    <>
      <Box justifyContent="center" display="flex" alignItems="center">
        <Chip
          label={row?.original?.payment_status}
          color={row?.original?.payment_status && color}
          variant="outlined"
          style={{ width: "60%", textTransform: "capitalize" }}
        />
      </Box>
    </>
  );
};

export default PaymentStatus;
