import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Fab } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { navItems } from "../helpers/routes/NavItems";

const Menu = () => {
  const [menu, setMenu] = useState(false);

  // Redux element
  const {
    userInfo: { users },
  } = useSelector((state) => state.auth);

  return (
    <>
      <aside className={menu ? "menu menuOpen" : "menu"}>
        <ul className="menu__list">
          {/* {role === "retailer" &&
            navItems?.map(
              (navItem) =>
                navItem?.whole_saler && (
                  <li className="menu__item" key={navItem?.link}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "menu__link active__link" : "menu__link"
                      }
                      to={navItem?.to}
                    >
                      <span className="menu__text">{navItem?.link}</span>
                    </NavLink>
                  </li>
                )
            )} */}

          {navItems?.map(
            (navItem) =>
              // navItem?.access?.includes(users?.role) && (
              navItem?.access && (
                <li className="menu__item" key={navItem?.link}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "menu__link active__link" : "menu__link"
                    }
                    to={navItem?.to}
                  >
                    <span className="menu__text">{navItem?.link}</span>
                  </NavLink>
                </li>
              )
          )}
        </ul>
      </aside>

      {/* Hamburger menu */}
      <div className="hamburger__menu">
        <Fab
          color="secondary"
          aria-label="menu"
          size="medium"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <CloseIcon /> : <MenuIcon />}
        </Fab>
      </div>
    </>
  );
};

export default Menu;
