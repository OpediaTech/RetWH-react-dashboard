import AddIcon from "@mui/icons-material/Add";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneIcon from "@mui/icons-material/Done";
import React, { useState } from "react";
import { useGetRequestsQuery } from "../../app/services/requestApi";
import CustomButton from "../../components/controls/CustomButton";
import CustomModal from "../../components/controls/CustomModal";
import WholesalerConnectForm from "../../components/WholesalerConnectForm";

const RetailerAction = ({ row }) => {
  // States
  const [open, setOpen] = useState(false);

  // check exist request
  const { request } = useGetRequestsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      request: data?.requests?.find((x) => x?.user?._id === row?.original?._id),
    }),
  });

  console.log(row?.original?._id);

  console.log(request);

  return (
    <>
      {request ? (
        request?.approved ? (
          <CustomButton
            text="Connected"
            defaultColor="warning"
            size="small"
            startIcon={<DoneIcon />}
            style={{ width: "100%", pointerEvents: "none" }}
          />
        ) : (
          <CustomButton
            text="Pending"
            defaultColor="error"
            size="small"
            startIcon={<DoneIcon />}
            style={{ width: "100%", pointerEvents: "none" }}
          />
        )
      ) : (
        <CustomButton
          text="Connect"
          defaultColor="info"
          size="small"
          startIcon={<AddIcon />}
          style={{ width: "100%" }}
          onClick={() => setOpen(true)}
        />
      )}

      <CustomModal open={open} setOpen={setOpen} title="Sales Report">
        <WholesalerConnectForm row={row} setOpen={setOpen} />
      </CustomModal>
    </>
  );
};

export default RetailerAction;
