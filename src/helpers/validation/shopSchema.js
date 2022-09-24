import * as yup from "yup";

// Shop schema
export const shopSchema = yup.object().shape({
  city: yup.string().required("City is required."),
  companyName: yup.string().required("Company name is required."),
  companyEmail: yup.string().required("Company email is required."),
  companyPhone: yup.string().required("Company phone is required."),
  country: yup.string().required("Country is required."),
  email: yup.string().required("Email is required."),
  name: yup.string().required("Name is required."),
  postalCode: yup.string().required("Postal code is required."),
  state_province_region: yup.string().required("State / Region is required."),
  streetAddress: yup.string().required("Address is required."),
});
