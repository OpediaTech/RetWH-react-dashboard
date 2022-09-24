import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Chip, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUpdateRequestMutation } from "../../app/services/requestApi";
import LoadingBtn from "../../components/controls/LoadingBtn";

const RequestStatus = ({ row }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // redux element
  const [
    updateRequest,
    { isLoading, isError, error, data, reset },
  ] = useUpdateRequestMutation();
  // Redux element

  //  sent request
  const handleUpdate = async (type) => {
    const reqData = {
      rid: row?.original?._id,
      approved: type,
      shopId: row?.original?.shop?._id,
      subscription: row?.original?.subscription,
    };
    await updateRequest(reqData);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (data) {
      toast.success("Your request is completed!");
      reset();
    }
    if (isError) {
      toast.error(error?.data?.error);
      reset();
    }
  }, [isError, error, data, reset]);

  return (
    <>
      <Box justifyContent="space-between" display="flex" alignItems="center">
        <Chip
          variant="outlined"
          color={row?.original?.approved ? "success" : "warning"}
          size="small"
          icon={row?.original?.approved ? <DoneIcon /> : <CloseIcon />}
          label={row?.original?.approved ? "Approved" : "Pending"}
        />
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          size="small"
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0.5,
            width: "150px",
            padding: "0.5rem",
            color: "#3d3e42",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 12,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box display="flex" flexDirection="column" gap="0.5rem">
          <LoadingBtn
            style={{ width: "100%" }}
            text="Approve"
            loading={isLoading}
            variant="outlined"
            defaultColor="success"
            onClick={() => handleUpdate(true)}
          />

          <LoadingBtn
            style={{ width: "100%" }}
            text="Pending"
            loading={isLoading}
            variant="outlined"
            defaultColor="warning"
            onClick={() => handleUpdate(false)}
          />
        </Box>
      </Menu>
    </>
  );
};

export default RequestStatus;
