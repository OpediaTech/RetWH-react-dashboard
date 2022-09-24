import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { decodeToken, isExpired } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../src/pages/AdminLogin";
import { loading, login, logout } from "./app/features/authSlice";
import CustomBackdrop from "./components/controls/CustomBackdrop";
import { auth } from "./firebase/Firebase.config";
import PrivateRoutes from "./helpers/private/PrivateRoutes";
import ProtectedRoutes from "./helpers/private/ProtectedRoutes";
import MyRouteRule from "./helpers/private/MyRouteRule";
import PublicRoutes from "./helpers/private/PublicRoutes";
import UserSingleProfile from "./pages/additional-pages/UserSingleProfile";
import Automation from "./pages/Automation";
import BuyProducts from "./pages/BuyProducts";
import Cart from "./pages/Cart";
import ConnectRequest from "./pages/ConnectRequest";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import DemoRequest from "./pages/DemoRequest";
import Departments from "./pages/Departments";
import DuePayments from "./pages/DuePayments";
import Features from "./pages/Features";
import Forbidden from "./pages/Forbidden";
import Mail from "./pages/Mail";
import MakeAnOrder from "./pages/MakeAnOrder";
import MakeOrderCart from "./pages/MakeOrderCart";
import Orders from "./pages/Orders";
import PageNotFound from "./pages/PageNotFound";
import PointOfSales from "./pages/PointOfSales";
import Products from "./pages/Products";
import Report from "./pages/Report";
import Retailers from "./pages/Retailers";
import Settings from "./pages/Settings";
import Shop from "./pages/Shop";
import SingleOrder from "./pages/SingleOrder";
import Stocks from "./pages/Stocks";
import Subcribers from "./pages/Subcribers";
import Users from "./pages/Users";
import UserShop from "./pages/UserShop";
import WholesalerProfile from "./pages/WholesalerProfile";

function App() {
  // redux element
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user?.getIdToken();
        const users = decodeToken(token);

        dispatch(login({ users, token }));
        dispatch(loading());

        const isTokenExpired = isExpired(token);
        if (isTokenExpired) {
          dispatch(logout());
          dispatch(loading());
        }
      } else {
        dispatch(logout());
        dispatch(loading());
      }
    });

    return () => subscribed;
  }, [dispatch]);

  return isLoading ? (
    <CustomBackdrop open={true} />
  ) : (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<PublicRoutes />}>
          <Route path="/" element={<AdminLogin />} />
          <Route path="login" element={<AdminLogin />} />
        </Route>

        {/* Private Route */}
        <Route path="/" element={<MyRouteRule />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/*=======================All Protected Rotes =========================*/}

        {/* ALL */}
        <Route
          path="/"
          element={
            <MyRouteRule />
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Wholesaler, Retailer and Admin */}
        <Route
          path="/"
          element={<MyRouteRule />}
        >
          <Route path="shop" element={<Shop />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="report" element={<Report />} />
          <Route path="stocks" element={<Stocks />} />
          <Route path="profile" element={<UserSingleProfile />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="single-order/:id" element={<SingleOrder />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Wholesaler and Admin */}
        <Route path="/" element={<MyRouteRule />}>
          <Route path="products" element={<Products />} />
          <Route path="departments" element={<Departments />} />

          <Route path="retailers" element={<Retailers />} />
        </Route>

        {/* Wholesaler and Retailer */}
        <Route
          path="/"
          element={<MyRouteRule />}
        >
          <Route path="wholesaler/:id" element={<WholesalerProfile />} />
          <Route path="shop/:id" element={<UserShop />} />
        </Route>

        {/* Retailer and Admin */}
        <Route
          path="/"
          element={<MyRouteRule />}
        ></Route>

        {/* Only Wholesaler */}
        <Route path="/" element={<MyRouteRule />}>
          <Route
            path="make-an-order/:retailerId/:shopId"
            element={<MakeAnOrder />}
          />
          <Route path="make-order-cart" element={<MakeOrderCart />} />
        </Route>

        {/* Only Retailer */}
        <Route path="/" element={<MyRouteRule />}>
          <Route path="buy-products" element={<BuyProducts />} />
          <Route path="cart" element={<Cart />} />
          <Route path="point-of-sales" element={<PointOfSales />} />
        </Route>

        {/* Only Admin */}
        <Route path="/" element={<MyRouteRule />}>
          <Route path="mail" element={<Mail />} />
          <Route path="connect-request" element={<ConnectRequest />} />
          <Route path="demo-request" element={<DemoRequest />} />
          <Route path="due-payments" element={<DuePayments />} />
          <Route path="features" element={<Features />} />
          <Route path="subcribers" element={<Subcribers />} />
          <Route path="automation" element={<Automation />} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={true} />
    </>
  );
}

export default App;
