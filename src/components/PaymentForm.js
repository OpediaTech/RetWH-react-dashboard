// import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPayment, resetPayment } from "../app/features/cartSlice";
import CustomButton from "./controls/CustomButton";

const PaymentForm = ({ stripe }) => {
  const [value, setValue] = useState("cash");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // Redux element
  const { payment } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // React hook form data submit
  const handleClick = (data) => {
    dispatch(
      addPayment({
        payment_method: value,
      })
    );
  };

  return (
    <section className="shippingForm">
      <div className="shippingForm__form">
        <h2 className="form__title">Payment Form</h2>

        {payment?.payment_method ? (
          <div className="shipping__details">
            <div className="cartSubtotal__total">
              <span className="subtotal__text">Payment Method</span>
              <span className="subtotal__digit">{payment?.payment_method}</span>
            </div>

            {/* <div className="cartSubtotal__total">
              <span className="subtotal__text">payment Charge</span>
              <span className="subtotal__digit">${payment?.charge}</span>
            </div> */}
            {!payment?.payment_method === "stripe" && (
              <div className="cartSubtotal__total">
                <span className="subtotal__text">payment Address</span>
                <span className="subtotal__digit">{payment?.address}</span>
              </div>
            )}

            <CustomButton
              className="addDepartment__btn"
              defaultColor="error"
              text="Reset"
              onClick={() => dispatch(resetPayment())}
            />
          </div>
        ) : (
          <>
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
              </RadioGroup>
            </FormControl>

            {/* Submit button */}
            <CustomButton
              className="paymentmethod__btn"
              color="primary"
              text="Submit"
              onClick={handleClick}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default PaymentForm;
