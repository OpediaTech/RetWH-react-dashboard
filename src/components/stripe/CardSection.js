import { CardElement } from "@stripe/react-stripe-js";
import React from "react";
import "./CardSection.css";
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
function CardSection() {
  return (
    <span className="form__group">
      <label className="form__label">Card details</label>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </span>
  );
}
export default CardSection;
