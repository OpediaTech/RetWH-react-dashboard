import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useUpdateDepartmentMutation } from "../../app/services/departmentsApi";
import { useGetShopsByEmailQuery } from "../../app/services/shopsApi";
import CustomNotification from "../../components/controls/CustomNotification";
import LoadingBtn from "../../components/controls/LoadingBtn";
import { departmentSchema } from "../../helpers/validation/departmentSchema";

const UpdateDepart = ({ setOpen, row }) => {
  // states
  const [notify, setNotify] = useState({
    open: false,
    type: "",
    message: "",
  });

  // Redux element
  const {
    userInfo: {
      users: { email },
    },
  } = useSelector((state) => state.auth);
  const { data: shopsData } = useGetShopsByEmailQuery(email);

  const [
    updateDepartment,
    { isLoading, isError, error, data },
  ] = useUpdateDepartmentMutation();

  // React hook form
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(departmentSchema),
  });

  // React hook form data submit
  const onSubmit = async (data) => {
    const departmentData = {
      ...data,
      email,
      deptID: row.original?._id,
    };
    await updateDepartment(departmentData);
  };

  useEffect(() => {
    if (data) {
      toast.success("Successfully created!");
      setOpen(false);
    }
    if (isError) {
      toast.error(error?.data?.error);
    }
  }, [isError, error, data, setOpen]);
  return (
    <section className="addDepartment">
      <div className="addDepartment__form">
        <h2 className="form__title">Update Department</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Department Name */}
          <span className="form__group">
            <label className="form__label">
              Department Name <span className="form__required">*</span>
            </label>
            <input
              className="form__control"
              type="text"
              placeholder="Enter department name"
              defaultValue={row.original?.dept_name}
              {...register("dept_name")}
            />
            {errors?.dept_name && (
              <span className="form__error">{errors?.dept_name.message}</span>
            )}
          </span>

          {/* Tax Stage*/}
          <span className="form__group">
            <label className="form__label">
              Tax Stage <span className="form__required">*</span>
            </label>
            <input
              className="form__control"
              type="text"
              placeholder="Enter tax stage"
              defaultValue={row.original?.tax_stage}
              {...register("tax_stage")}
            />
            {errors?.tax_stage && (
              <span className="form__error">{errors?.tax_stage.message}</span>
            )}
          </span>

          {/* Shop */}
          <span className="form__group">
            <label className="form__label">
              Shop <span className="form__required">*</span>
            </label>
            <select className="form__select" {...register("shop")}>
              <option className="form__option" value={row.original?.shop?._id}>
                {row.original?.shop?.name}
              </option>

              {shopsData?.shops?.map((shop) => (
                <option
                  className="form__option"
                  value={shop?._id}
                  key={shop?._id}
                >
                  {shop?.name}
                </option>
              ))}
            </select>
            {errors?.shop && (
              <span className="form__error">{errors?.shop.message}</span>
            )}
          </span>

          {/* Active */}
          <span className="form__group">
            <Controller
              control={control}
              name="active"
              render={({ field: { onChange, value, ...field } }) => (
                <div className="form__checkbox">
                  <Checkbox
                    size="small"
                    color="secondary"
                    onChange={onChange}
                    defaultChecked={row.original?.active}
                    value={value}
                    {...field}
                  />
                  <span className="checkbox__text">Active</span>
                </div>
              )}
            />

            {errors?.active && (
              <span className="form__error">{errors?.active.message}</span>
            )}
          </span>

          {/* Submit button */}
          <LoadingBtn
            className="addDepartment__btn"
            color="primary"
            size="large"
            text="Update"
            type="submit"
            loading={isLoading}
          />
        </form>

        {/* Notification */}
        <CustomNotification notify={notify} setNotify={setNotify} />

        {/* Modal Close Button */}
        <div className="addDepartment__close">
          <IconButton aria-label="close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </section>
  );
};

export default UpdateDepart;
