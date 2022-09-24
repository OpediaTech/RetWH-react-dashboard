import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addOrders } from "../../app/features/cartSlice";
import { useDeleteCartMutation } from "../../app/services/cartsApi";
import { useCreateCartSaleMutation } from "../../app/services/reportsApi";
import LoadingBtn from "../controls/LoadingBtn";
import CardSection from "./CardSection";

export default function CheckoutForm({ orderData }) {
  // states
  const [loading, setLoading] = useState();

  const dispatch = useDispatch();
  const [deleteCart] = useDeleteCartMutation();

  const stripe = useStripe();
  const elements = useElements();

  // redux elemtn
  const [
    createCartSale,
    { isLoading, error, isError, data, reset },
  ] = useCreateCartSaleMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    const cartData = {
      source: result?.token?.id,
      ...orderData,
    };

    if (result.error) {
      toast.error(result.error.message);
      setLoading(false);
    } else {
      setLoading(false);
      await createCartSale(cartData);
    }
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

      deleteCart(orderData?.cid);
      reset();
    }
    if (isError) {
      toast.error(error?.data?.error);
      reset();
    }
  }, [isError, error, data, reset, deleteCart, orderData?.cid, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <LoadingBtn
        text="PAY and Place Order"
        color="primary"
        size="large"
        disabled={!stripe}
        type="submit"
        loading={loading || isLoading}
        style={{ width: "100%" }}
      />
    </form>
  );
}
