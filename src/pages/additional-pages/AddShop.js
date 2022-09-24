import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAddShopMutation } from "../../app/services/shopsApi";
import LoadingBtn from "../../components/controls/LoadingBtn";
import { shopSchema } from "../../helpers/validation/shopSchema";

const AddShop = ({ setOpen }) => {
  // Redux element
  const [addShop, { isLoading, isError, error, data }] = useAddShopMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // React hook form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shopSchema),
  });

  // React hook form data submit
  const onSubmit = async (data) => {
    await addShop(data);
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
    <section className="addShop">
      <div className="addShop__form">
        <h2 className="form__title">Add a new shop</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <span className="form__group">
            <label className="form__label">
              Email <span className="form__required">*</span>
            </label>
            <input
              className="form__control"
              type="email"
              defaultValue={userInfo?.users?.email}
              {...register("email")}
            />
            {errors?.email && (
              <span className="form__error">{errors?.email.message}</span>
            )}
          </span>

          <h3 className="form__headline">Business Information</h3>
          {/* Your Name */}
          <span className="form__group">
            <label className="form__label">
              Your Name <span className="form__required">*</span>
            </label>
            <input
              className="form__control"
              type="text"
              {...register("name")}
            />
            {errors?.name && (
              <span className="form__error">{errors?.name.message}</span>
            )}
          </span>

          {/* Company Name */}
          <span className="form__group">
            <label className="form__label">
              Company Name <span className="form__required">*</span>
            </label>
            <input
              className="form__control"
              type="text"
              {...register("companyName")}
            />
            {errors?.companyName && (
              <span className="form__error">{errors?.companyName.message}</span>
            )}
          </span>

          {/* Company Email*/}
          <span className="form__group">
            <label className="form__label">
              Company Email <span className="form__required">*</span>
            </label>
            <input
              className="form__control"
              type="email"
              {...register("companyEmail")}
            />
            {errors?.companyEmail && (
              <span className="form__error">
                {errors?.companyEmail.message}
              </span>
            )}
          </span>

          <div className="form__grid">
            {/* Company Phone */}
            <span className="form__group">
              <label className="form__label">
                Company Phone <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                {...register("companyPhone")}
              />
              {errors?.companyPhone && (
                <span className="form__error">
                  {errors?.companyPhone.message}
                </span>
              )}
            </span>
          </div>

          <h3 className="form__headline">Business Address</h3>

          {/* Address */}
          <span className="form__group">
            <label className="form__label">
              Address <span className="form__required">*</span>
            </label>
            <input
              className="form__control"
              type="text"
              {...register("streetAddress")}
            />
            {errors?.streetAddress && (
              <span className="form__error">
                {errors?.streetAddress.message}
              </span>
            )}
          </span>

          {/* City */}
          <span className="form__group">
            <label className="form__label">
              City <span className="form__required">*</span>
            </label>
            <input
              className="form__control"
              type="text"
              {...register("city")}
            />
            {errors?.city && (
              <span className="form__error">{errors?.city.message}</span>
            )}
          </span>

          <div className="form__grid">
            {/* State / Province / Region */}
            <span className="form__group">
              <label className="form__label">
                State / Province / Region{" "}
                <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                {...register("state_province_region")}
              />
              {errors?.state_province_region && (
                <span className="form__error">
                  {errors?.state_province_region.message}
                </span>
              )}
            </span>

            {/* ZIP / Postal Code */}
            <span className="form__group">
              <label className="form__label">
                ZIP / Postal Code <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                {...register("postalCode")}
              />
              {errors?.postalCode && (
                <span className="form__error">
                  {errors?.postalCode.message}
                </span>
              )}
            </span>
          </div>

          {/* Country */}
          <span className="form__group">
            <label className="form__label">
              Country <span className="form__required">*</span>
            </label>
            <select className="form__select" {...register("country")}>
              <option className="form__option" value="Bangladesh">
                Bangladesh
              </option>
              <option className="form__option" value="USA">
                USA
              </option>
            </select>
            {errors?.country && (
              <span className="form__error">{errors?.country.message}</span>
            )}
          </span>

          {/* Submit button */}
          <LoadingBtn
            className="addShop__btn"
            color="primary"
            size="large"
            text="Add Shop"
            type="submit"
            loading={isLoading}
          />
        </form>

        {/* Modal Close Button */}
        <div className="addShop__close">
          <IconButton aria-label="close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </section>
  );
};

export default AddShop;
