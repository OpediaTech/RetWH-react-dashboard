import * as yup from "yup";

// Product schema
export const productSchema = yup.object().shape({
  productName: yup.string().required("Product name field is required."),
  uniqueCode: yup.string().required("Unique Code field is required."),
  modifier: yup.string().required("Modifier field is required."),
  quantity: yup.string().required("Quantity field is required."),
  status: yup.string().required("Status field is required."),
  department: yup.string().required("Department is required."),
  basic: yup.string().required("Basic Price is required."),
  standard: yup.string().required("Standard Price is required."),
  premium: yup.string().required("Premium Price is required."),
  basicQty: yup.string().required("Basic quantity is required."),
  standardQty: yup.string().required("Stnaderd quantity is required."),
  premiumQty: yup.string().required("Premium quantity is required."),
  basicPrice: yup.string().required("Basic price is required."),
  buying_price: yup.string().required("Buying price is required."),
  standardPrice: yup.string().required("Stnaderd price is required."),
  premiumPrice: yup.string().required("Premium price is required."),
});
