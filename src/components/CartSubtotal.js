import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrders } from "../app/features/cartSlice";
import { useDeleteCartMutation } from "../app/services/cartsApi";
import { useCreateCartSaleMutation } from "../app/services/reportsApi";
import LoadingBtn from "./controls/LoadingBtn";
import StripePayment from "./stripe/StripePayment";

const CartSubtotal = ({ cartItems, cartId, cartNetTotal }) => {
  // states
  const [value, setValue] = useState("cash");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const dispatch = useDispatch();

  const { shipping } = useSelector((state) => state.cart);

  const [
    createCartSale,
    { isLoading, error, isError, data, reset },
  ] = useCreateCartSaleMutation();

  const [deleteCart] = useDeleteCartMutation();

  // price object
  const amount = {
    items: cartItems?.length,
    subtotal: cartNetTotal?.toFixed(2),
    tax: 0.0,
    shipping: shipping?.shipping_method === "store_picup" ? 0.0 : 0.0,
  };

  // calculetue total amount
  let total = Number(cartNetTotal + amount?.shipping + amount?.tax)?.toFixed(2);

  // navigate
  const navigate = useNavigate();

  // required data
  const cartData = {
    paid_amount: total,
    shipping_address: shipping?.address,
    payment_method: value,
    cid: cartId,
  };

  // Store amount and change route
  const handlePlaceOrder = async () => {
    await createCartSale(cartData);
  };

  useEffect(() => {
    if (data) {
      toast.success("Successfully submitted!");
      dispatch(
        addOrders({
          _id: data?.saleReport?._id,
          status: true,
        })
      );

      deleteCart(cartId);
      reset();
    }
    if (isError) {
      toast.error(error?.data?.error);
      reset();
    }
  }, [isError, error, data, navigate, reset, deleteCart, cartId, dispatch]);

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
          ${shipping?.shipping_method === "store_picup" ? 0.0 : 0.0}
        </span>
      </div>

      <div className="cartSubtotal__total">
        <span className="subtotal__text">Total</span>
        <span className="subtotal__digit">${total}</span>
      </div>

      <hr />

      <FormControl>
        <label className="form__label">Select payment method</label>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="cash"
            control={<Radio size="small" />}
            label="Cash"
          />
          <FormControlLabel
            value="check"
            control={<Radio size="small" />}
            label="Check"
          />

          <FormControlLabel
            value="card"
            control={<Radio size="small" />}
            label="Card (Online Payment)"
          />
        </RadioGroup>
      </FormControl>

      {value === "card" ? (
        <StripePayment orderData={cartData} />
      ) : (
        <LoadingBtn
          className="paymentmethod__btn"
          color="primary"
          text="Place Order"
          size="large"
          style={{ width: "100%" }}
          onClick={handlePlaceOrder}
          loading={isLoading}
        />
      )}
    </div>
  );
};

export default CartSubtotal;
