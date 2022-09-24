import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Badge, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGetCartsQuery } from "../app/services/cartsApi";
import logo from "../assets/main-logo.png";
import AccountMenu from "./controls/AccountMenu";
import CustomButton from "./controls/CustomButton";
import CustomModal from "./controls/CustomModal";
import MakeAnOrderSelectForm from "./MakeAnOrderSelectForm";

const Header = () => {
  // States
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // Redux element
  const { data } = useGetCartsQuery();
  const { userInfo } = useSelector((state) => state.auth);

  function getCartTotal(carts) {
    let total = 0;

    carts?.forEach((cart) => {
      total += cart?.items?.length;
    });

    return total;
  }

  const cartTotal = getCartTotal(data?.cart);

  return (
    <header className="header">
      <div className="container">
        <nav className="header__nav">
          <div className="nav__logo">
            <Link to="/dashboard">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          {userInfo?.users?.role === "retailer" ? (
            <div className="nav__buttons">
              <CustomButton
                className="nav__btn"
                text="Point of Sales"
                color="primary"
                size="small"
                onClick={() => navigate("/point-of-sales")}
              />
              <CustomButton
                className="nav__btn"
                text="Buy Products"
                color="primary"
                size="small"
                onClick={() => navigate("/buy-products")}
              />
            </div>
          ) : userInfo?.users?.role === "wholeseller" ? (
            <div className="nav__buttons">
              <CustomButton
                className="nav__btn"
                text="Make an Order"
                color="primary"
                size="small"
                onClick={() => setOpen(true)}
              />
            </div>
          ) : (
            <></>
          )}

          <div className="nav__items">
            {userInfo?.users?.role === "retailer" && (
              <NavLink to="/cart">
                <IconButton aria-label="cart">
                  <Badge badgeContent={cartTotal ? cartTotal : 0}>
                    <LocalMallIcon />
                  </Badge>
                </IconButton>
              </NavLink>
            )}

            <div className="nav__account">
              <div className="account__details">
                <span className="account__email">{userInfo?.users?.email}</span>
                <span className="account__role">{userInfo?.users?.role}</span>
              </div>
              <AccountMenu userInfo={userInfo} />
            </div>
          </div>
        </nav>
      </div>

      <CustomModal open={open} onClose={setOpen}>
        <MakeAnOrderSelectForm setOpen={setOpen} />
      </CustomModal>
    </header>
  );
};

export default Header;
