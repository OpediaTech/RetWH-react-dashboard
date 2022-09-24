import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAdminUpdateUserMutation } from "../../app/services/usersApi";
import LoadingBtn from "../../components/controls/LoadingBtn";

const AdminUpdateUser = ({ setOpen, row }) => {
  // Redux element
  const [
    adminUpdateUser,
    { isLoading, isError, error, data, reset },
  ] = useAdminUpdateUserMutation();

  // React hook form
  const { handleSubmit, register, control } = useForm();

  // React hook form data submit
  const onSubmit = async (data) => {
    const userData = {
      id: row?.original?._id,
      approved: data?.active,
    };

    await adminUpdateUser(userData);
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
        <h2 className="form__title">Update User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <span className="form__group">
            <label className="form__label">Full Name</label>
            <input
              className="form__control"
              type="text"
              placeholder="Enter your full name"
              defaultValue={row?.original?.name}
              readOnly
              {...register("name")}
            />
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

          {/* Active */}
          <span className="form__group">
            <Controller
              control={control}
              name="active"
              defaultValue={row.original?.approved}
              render={({ field: { onChange, value, ...field } }) => (
                <div className="form__checkbox">
                  <Checkbox
                    size="small"
                    color="secondary"
                    onChange={onChange}
                    defaultChecked={row.original?.approved}
                    value={value}
                    {...field}
                  />
                  <span className="checkbox__text">Active</span>
                </div>
              )}
            />
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

export default AdminUpdateUser;
