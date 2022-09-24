import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51LSLDsEReRRNjOiwkXDWonvc1fkF9jKra8vGGMUkpqkY2f599LZCbzqsKjjGv1lXC4ruO5d18db3FhpUUnZyNjho00y50ELfgC"
);

const StripePayment = ({ orderData }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderData={orderData} />
    </Elements>
  );
};

export default StripePayment;
