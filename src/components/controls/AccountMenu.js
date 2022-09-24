import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/features/authSlice";
import { cartsApi } from "../../app/services/cartsApi";
import { dashboardApi } from "../../app/services/dashboardApi";
import { departmentsApi } from "../../app/services/departmentsApi";
import { posApi } from "../../app/services/posApi";
import { productsApi } from "../../app/services/productsApi";
import { reportsApi } from "../../app/services/reportsApi";
import { requestsApi } from "../../app/services/requestApi";
import { shopsApi } from "../../app/services/shopsApi";
import { usersApi } from "../../app/services/usersApi";
import { auth } from "../../firebase/Firebase.config";
import MakeAnOrderSelectForm from "../MakeAnOrderSelectForm";
import CustomButton from "./CustomButton";
import CustomModal from "./CustomModal";

const AccountMenu = ({ userInfo }) => {
  const [opens, setOpens] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  // Redux element
  const dispatch = useDispatch();

  // logout
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
    dispatch(shopsApi.util.resetApiState());
    dispatch(departmentsApi.util.resetApiState());
    dispatch(productsApi.util.resetApiState());
    dispatch(reportsApi.util.resetApiState());
    dispatch(cartsApi.util.resetApiState());
    dispatch(usersApi.util.resetApiState());
    dispatch(requestsApi.util.resetApiState());
    dispatch(posApi.util.resetApiState());
    dispatch(dashboardApi.util.resetApiState());
  };

  return (
    <>
      <Box>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 35, height: 35 }} />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: "200px",
            color: "#3d3e42",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
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
        {userInfo?.users?.role === "retailer" ? (
          <div className="account__buttons">
            <CustomButton
              className="account__btn"
              text="Point of Sales"
              color="primary"
              onClick={() => navigate("/point-of-sales")}
            />
            <CustomButton
              className="account__btn"
              text="Buy Products"
              color="primary"
              onClick={() => navigate("/buy-products")}
            />
          </div>
        ) : userInfo?.users?.role === "wholeseller" ? (
          <div className="account__buttons">
            <CustomButton
              className="account__btn"
              text="Make an Order"
              color="primary"
              onClick={() => setOpens(true)}
            />
          </div>
        ) : (
          ""
        )}
        <MenuItem onClick={() => navigate("/dashboard")}>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate("/settings")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <CustomModal open={opens} onClose={setOpens}>
        <MakeAnOrderSelectForm setOpen={setOpens} />
      </CustomModal>
    </>
  );
};

export default AccountMenu;
