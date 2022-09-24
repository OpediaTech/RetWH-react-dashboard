import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import CustomAlert from "../components/controls/CustomAlert";
import MakeOrderCartItem from "../components/MakeOrderCartItem";
import MakeOrderCartSubtotal from "../components/MakeOrderCartSubtotal";
import MakeOrderHeader from "../components/MakeOrderHeader";
import PaymentForm from "../components/PaymentForm";
import ShippingForm from "../components/ShippingForm";

const MakeOrderCart = () => {
  // navigate
  const navigate = useNavigate();

  // Redux element
  const { cart, makeOrders } = useSelector((state) => state.cart);

  return (
    <section className="m__section">
      <MakeOrderHeader />

      <section className="cart__section section">
        <div className="container">
          <div className="cart__header">
            <h2 className="cart__title">Cart items</h2>
            <span className="cart__backLink" onClick={() => navigate(-1)}>
              <ArrowBackIcon />
              Continue shopping
            </span>
          </div>

          <div className="cart__content makeOrderCart__content">
            <div className="cart__item">
              {!cart?.length && makeOrders?.status && (
                <CustomAlert
                  severity="success"
                  message={
                    <span>
                      Order is completed! Order Id:{" "}
                      <NavLink
                        className="order__link"
                        to={`/single-order/${makeOrders?._id}`}
                      >
                        {makeOrders?._id}
                      </NavLink>
                    </span>
                  }
                  close={true}
                />
              )}

              {cart?.length > 0 &&
                cart?.map((cartItem) => (
                  <MakeOrderCartItem
                    cartItem={cartItem}
                    key={cartItem?.product}
                  />
                ))}

              {!makeOrders?.status && cart?.length === 0 && (
                <CustomAlert
                  severity="info"
                  message="Cart is currently empty."
                />
              )}
            </div>
            <div className="cart__checkout">
              {cart?.length > 0 && (
                <>
                  <ShippingForm />

                  <PaymentForm />

                  <div className="cart__subtotal">
                    <MakeOrderCartSubtotal cartItems={cart} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default MakeOrderCart;
