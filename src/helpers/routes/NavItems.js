import AddBoxIcon from "@mui/icons-material/AddBox";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";

export const navItems = [
  {
    to: "/dashboard",
    link: "Dashboard",
    access: "admin wholeseller retailer",
    icon: <DashboardIcon />,
  },
  {
    to: "/products",
    link: "Products",
    access: "admin wholeseller",
    icon: <AddBoxIcon />,
  },
  {
    to: "/departments",
    link: "Departments",
    access: "admin wholeseller",
    icon: <CategoryIcon />,
  },
  {
    to: "/shop",
    link: "Shop",
    access: "admin wholeseller retailer",
    icon: <CategoryIcon />,
  },
  {
    to: "/orders",
    link: "Orders",
    access: "admin wholeseller retailer",
    icon: <AddShoppingCartIcon />,
  },
  {
    to: "/retailers",
    link: "Retailers",
    access: "admin wholeseller",
    icon: <GroupIcon />,
  },
  // {
  //   to: "/wholesalers",
  //   link: "Wholesalers",
  //   access: "admin",
  //   icon: <GroupIcon />,
  // },
  {
    to: "/users",
    link: "Users",
    access: "admin retailer wholeseller",
    icon: <GroupIcon />,
  },
  {
    to: "/connect-request",
    link: "Connect Request",
    access: "admin",
    icon: <GroupIcon />,
  },

  {
    to: "/stocks",
    link: "Stocks",
    access: "admin wholeseller retailer",
    icon: <GroupIcon />,
  },
  {
    to: "/mail",
    link: "Mail",
    access: "admin",
    icon: <GroupIcon />,
  },
  {
    to: "/report",
    link: "Report",
    access: "admin wholeseller retailer",
    icon: <GroupIcon />,
  },

  {
    to: "/due-payments",
    link: "Due Payments",
    access: "admin",
    icon: <GroupIcon />,
  },
  {
    to: "/demo-request",
    link: "Demo Request",
    access: "admin",
    icon: <GroupIcon />,
  },
  {
    to: "/features",
    link: "Features",
    access: "admin",
    icon: <AddBoxIcon />,
  },
  {
    to: "/subcribers",
    link: "Subcribers",
    access: "admin",
    icon: <GroupIcon />,
  },
  {
    to: "/automation",
    link: "Automation",
    access: "admin",
    icon: <GroupIcon />,
  },
  {
    to: "/contact",
    link: "Contact Us",
    access: "admin wholeseller retailer",
    icon: <GroupIcon />,
  },
  {
    to: "/settings",
    link: "Settings",
    access: "admin wholeseller retailer",
    icon: <GroupIcon />,
  },
];
