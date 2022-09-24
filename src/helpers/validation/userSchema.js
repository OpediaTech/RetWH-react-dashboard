import * as yup from "yup";

// User schema
export const userSchema = yup.object().shape({
  name: yup.string().required("Full name field is required."),
  phone: yup.string().required("Phone number field is required."),
  role: yup.string().required("Role is required."),
});
