import * as yup from "yup";

// Department schema
export const makeAnOrderSelectSchema = yup.object().shape({
  retailer: yup.string().required("Retailer is required."),
  shop: yup.string().required("Shop is required."),
});

// Shipping Schema
export const shippingSchema = yup.object().shape({
  address: yup.string().required("Address is required."),
});
