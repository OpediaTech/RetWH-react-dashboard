import { Box, Chip } from "@mui/material";
import * as React from "react";

const ShippingStatus = ({ row, status, report }) => {
  let value = row?.original?.shipping_status;

  let color =
    value === "pending"
      ? "warning"
      : value === "confirmed"
      ? "secondary"
      : value === "shipped"
      ? "info"
      : value === "delivered"
      ? "success"
      : "default";

  return (
    <>
      <Box justifyContent="center" display="flex" alignItems="center">
        <Chip
          label={value}
          color={value && color}
          variant="outlined"
          style={{ width: "70%", textTransform: "capitalize" }}
        />
      </Box>
    </>
  );
};

export default ShippingStatus;
