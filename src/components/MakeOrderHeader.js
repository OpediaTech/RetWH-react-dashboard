import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Badge, IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import AccountMenu from "../components/controls/AccountMenu";

const MakeOrderHeader = () => {
  // navigate
  const navigate = useNavigate();

  // Redux element
  const { userInfo } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  return (
    <div className="pos__header">
      <div className="container">
        <h3 className="header__title">
          <IconButton onClick={() => navigate(-1)} size="small">
            <ArrowBackIcon color="#fff" size="small" />
          </IconButton>
          Make an order
        </h3>
        <div className="nav__items">
          <NavLink to="/make-order-cart">
            <IconButton aria-label="cart">
              <Badge badgeContent={cart?.length}>
                <LocalMallIcon />
              </Badge>
            </IconButton>
          </NavLink>

          <div className="nav__account">
            <div className="account__details">
              <span className="account__email">{userInfo?.users?.email}</span>
              <span className="account__role">{userInfo?.users?.role}</span>
            </div>
            <AccountMenu userInfo={userInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeOrderHeader;
