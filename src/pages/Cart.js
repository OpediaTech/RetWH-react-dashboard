import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useGetCartsQuery } from "../app/services/cartsApi";
import CartContent from "../components/CartContent";
import CustomAlert from "../components/controls/CustomAlert";
import Header from "../components/Header";

const Cart = () => {
  // Redux element
  const { isLoading, data } = useGetCartsQuery();
  const { cartOrders } = useSelector((state) => state.cart);

  return (
    <>
      <Header />

      <section className="cart__section section">
        <div className="container">
          <div className="cart__header">
            <h2 className="cart__title">Your cart items</h2>
            <Link className="cart__backLink" to="/buy-products">
              <ArrowBackIcon />
              Continue shopping
            </Link>
          </div>

          {cartOrders?.length > 0 &&
            cartOrders?.map((order, index) => (
              <CustomAlert
                key={index}
                message={
                  <span>
                    Order is completed! Order Id:{" "}
                    <NavLink
                      className="order__link"
                      to={`/single-order/${order?._id}`}
                    >
                      {order?._id}
                    </NavLink>
                  </span>
                }
                severity="success"
                close={true}
              />
            ))}

          {isLoading ? (
            <div className="cart__loading">
              <CircularProgress color="inherit" size={30} />
            </div>
          ) : data?.cart?.length < 1 && !cartOrders?.length ? (
            <CustomAlert
              message="Your cart is currently empty!"
              severity="info"
            />
          ) : (
            data?.cart?.length > 0 && (
              <div className="cart__content">
                {data?.cart?.map((cartData) => (
                  <CartContent cartData={cartData} key={cartData?._id} />
                ))}
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
