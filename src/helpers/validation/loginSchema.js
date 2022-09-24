import * as Yup from "yup";

// Login schema
export const loginSchema = Yup.object({
  email: Yup.string()
    .required("Email field can not be empty.")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Please type a valid email address."
    ),
  password: Yup.string()
    .required("Password field can not be empty.")
    .min(6, "Password must contain at least 6 characters."),
});
