import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMakeOrders } from "../app/features/cartSlice";
import { useMakeAnOrderMutation } from "../app/services/reportsApi";
import LoadingBtn from "./controls/LoadingBtn";

const MakeOrderCartSubtotal = ({ cartItems }) => {
  // states
  const [receive, setReceive] = useState();

  const dispatch = useDispatch();

  const { shipping, cart, payment, customer } = useSelector(
    (state) => state.cart
  );

  const [
    makeAnOrder,
    { isLoading, error, isError, data },
  ] = useMakeAnOrderMutation();

  // subtotal price
  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item?.price * item?.quantity,
    0
  );

  // price object
  const amount = {
    items: cartItems?.length,
    subtotal: Number(subtotal)?.toFixed(2),
    tax: 0.0,
    shipping: shipping?.shipping_method === "store_picup" ? 0.0 : 0.0,
  };

  // total amount
  let total = Number(subtotal + amount?.shipping + amount?.tax)?.toFixed(2);

  // navigate
  const navigate = useNavigate();

  // Store amount and change route
  const handleCheckout = async (event) => {
    event.preventDefault();

    const orderData = {
      method: payment?.payment_method,
      saleData: {
        items: cart,
        sold_to: customer?._id,
        net_total: total,
        tax: amount?.tax,
        payment_method: payment?.payment_method,
        paid_amount: receive,
        return_amount: total < receive ? (receive - total)?.toFixed(2) : 0.0,
        name: customer?.name,
        shipping_address: shipping?.address,
      },
    };

    await makeAnOrder(orderData);
  };

  useEffect(() => {
    if (data) {
      toast.success("Successfully submitted!");
      dispatch(
        addMakeOrders({
          status: true,
          _id: data?.saleReport?._id,
        })
      );
    }
    if (isError) {
      toast.error(error?.data?.error);
    }
  }, [isError, error, data, navigate, dispatch]);

  return (
    <div className="cartSubtotal">
      <h3 className="cartSubtotal__title">Order Summery</h3>
      <div className="cartSubtotal__subtotal">
        <span className="subtotal__text">
          Subtotal ( {amount?.items} • items )
        </span>
        <span className="subtotal__digit">${amount?.subtotal}</span>
      </div>

      <div className="cartSubtotal__total">
        <span className="subtotal__text">Tax</span>
        <span className="subtotal__digit">${amount?.tax}</span>
      </div>

      <div className="cartSubtotal__shipping">
        <span className="subtotal__text">Shipping</span>
        <span className="subtotal__digit">
          ${shipping?.shipping_method === "store_picup" ? 0 : 0}
        </span>
      </div>

      <div className="cartSubtotal__total">
        <span className="subtotal__text">Total</span>
        <span className="subtotal__digit">${total}</span>
      </div>

      <form onSubmit={handleCheckout}>
        <span className="form__group">
          <label className="form__label">
            Recive Money <span className="form__required">*</span>
          </label>
          <input
            className="form__control"
            type="text"
            placeholder="Recive money"
            // defaultValue={receive}
            onChange={(e) => setReceive(e.target.value)}
          />
        </span>

        <span className="form__group">
          <label className="form__label">
            Return Money <span className="form__required">*</span>
          </label>
          <input
            className="form__control"
            type="text"
            placeholder="Return money"
            readOnly
            value={total < receive ? (receive - total)?.toFixed(2) : 0}
          />
        </span>

        <LoadingBtn
          text="Proceed to checkout"
          type="submit"
          color="primary"
          size="large"
          loading={isLoading}
          style={{ width: "100%" }}
        />
      </form>
    </div>
  );
};

export default MakeOrderCartSubtotal;
