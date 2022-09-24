import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUpdateUserMutation } from "../../app/services/usersApi";
import LoadingBtn from "../../components/controls/LoadingBtn";
import { userSchema } from "../../helpers/validation/userSchema";

const UpdateUser = ({ setOpen, row }) => {
  // Redux element
  const [
    updateUser,
    { isLoading, isError, error, data, reset },
  ] = useUpdateUserMutation();

  // React hook form
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  // React hook form data submit
  const onSubmit = async (data) => {
    await updateUser(data);
  };

  useEffect(() => {
    if (data) {
      toast.success("Successfully updated!");
      setOpen(false);
      reset();
    }
    if (isError) {
      toast.error(error?.data?.error);
      reset();
    }
  }, [isError, error, data, setOpen, reset]);

  return (
    <section className="addUser">
      <div className="addUser__form">
        <h2 className="form__title">Edit User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <span className="form__group">
            <label className="form__label">Full Name</label>
            <input
              className="form__control"
              type="text"
              placeholder="Enter your full name"
              defaultValue={row?.original?.name}
              {...register("name")}
            />
            {errors?.name && (
              <span className="form__error">{errors?.name.message}</span>
            )}
          </span>

          {/* Email */}
          <span className="form__group">
            <label className="form__label">Email</label>
            <input
              className="form__control"
              type="email"
              placeholder="Enter your email"
              defaultValue={row?.original?.email}
              readOnly
              {...register("email")}
            />
          </span>

          {/* Phone */}
          <span className="form__group">
            <label className="form__label">Phone</label>
            <input
              className="form__control"
              type="text"
              placeholder="Enter your phone"
              defaultValue={row?.original?.phone}
              {...register("phone")}
            />
            {errors?.phone && (
              <span className="form__error">{errors?.phone.message}</span>
            )}
          </span>

          {/* Role */}
          <span className="form__group">
            <label className="form__label">Select Role</label>
            <Controller
              control={control}
              name="role"
              defaultValue={row?.original?.role}
              render={({ field: { onChange, value, ...field } }) => (
                <RadioGroup row onChange={onChange} value={value} {...field}>
                  <FormControlLabel
                    value="salesman"
                    control={<Radio size="small" color="secondary" />}
                    label="Sales Man"
                  />
                  <FormControlLabel
                    value="deliveryman"
                    control={<Radio size="small" color="secondary" />}
                    label="Delivery Man"
                  />
                  <FormControlLabel
                    value="manager"
                    control={<Radio size="small" color="secondary" />}
                    label="Manager"
                  />
                </RadioGroup>
              )}
            />

            {errors?.role && (
              <span className="form__error">{errors?.role.message}</span>
            )}
          </span>

          {/* Submit button */}
          <LoadingBtn
            className="addDepartment__btn"
            color="primary"
            size="large"
            text="Update User"
            type="submit"
            loading={isLoading}
          />
        </form>

        {/* Modal Close Button */}
        <div className="addUser__close">
          <IconButton aria-label="close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </section>
  );
};

export default UpdateUser;
