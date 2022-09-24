import * as yup from "yup";

// Department schema
export const departmentSchema = yup.object().shape({
  dept_name: yup.string().required("Department name is required."),
  // tax_stage: yup.string().required("Tax field is required."),
  shop: yup.string().required("Shop field is required."),
  //   active: yup.string().required("Active status is required."),
});
