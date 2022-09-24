import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addShipping, resetShipping } from "../app/features/cartSlice";
import { shippingSchema } from "../helpers/validation/ConnectReletedSchema";
import CustomButton from "./controls/CustomButton";

const ShippingForm = () => {
  const [value, setValue] = useState("express_delivery");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // Redux element

  const { shipping } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  // React hook form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shippingSchema),
  });

  // React hook form data submit
  const onSubmit = async (data) => {
    if (value === "store_picup") {
      dispatch(
        addShipping({
          shipping_method: "store_picup",
          charge: 0,
          address: "",
        })
      );
    }

    if (value === "express_delivery") {
      dispatch(
        addShipping({
          shipping_method: "express_delivery",
          charge: 7,
          address: data.address,
        })
      );
    }
  };

  return (
    <section className="shippingForm">
      <div className="shippingForm__form">
        <h2 className="form__title">Shipping Form</h2>

        {shipping?.shipping_method ? (
          <div className="shipping__details">
            {/* <div className="cartSubtotal__total">
              <span className="subtotal__text">Shipping Method</span>
              <span className="subtotal__digit">
                {shipping?.shipping_method}
              </span>
            </div> */}

            {/* <div className="cartSubtotal__total">
              <span className="subtotal__text">Shipping Charge</span>
              <span className="subtotal__digit">${shipping?.charge}</span>
            </div> */}
            {shipping?.shipping_method === "express_delivery" && (
              <div className="cartSubtotal__total">
                <span className="subtotal__text">Shipping Address</span>
                <span className="subtotal__digit">{shipping?.address}</span>
              </div>
            )}

            <CustomButton
              className="addDepartment__btn"
              defaultColor="error"
              text="Reset"
              onClick={() => dispatch(resetShipping())}
            />
          </div>
        ) : (
          <>
            <FormControl>
              <label className="form__label">Select shipping option</label>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                {/* <FormControlLabel
                  value="store_picup"
                  control={<Radio size="small" />}
                  label="Store Pickup (FREE)"
                /> */}
                <FormControlLabel
                  value="express_delivery"
                  control={<Radio size="small" />}
                  label="Express Delivery"
                />
              </RadioGroup>
            </FormControl>

            <form onSubmit={handleSubmit(onSubmit)}>
              {value === "express_delivery" && (
                <span className="form__group">
                  <label className="form__label">
                    Address <span className="form__required">*</span>
                  </label>
                  <input
                    className="form__control"
                    type="text"
                    placeholder="Enter your full address"
                    {...register("address")}
                  />
                  {errors?.address && (
                    <span className="form__error">
                      {errors?.address.message}
                    </span>
                  )}
                </span>
              )}

              {/* Submit button */}
              <CustomButton
                className="addDepartment__btn"
                color="primary"
                // size="small"
                text="Submit"
                type="submit"
              />
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default ShippingForm;
