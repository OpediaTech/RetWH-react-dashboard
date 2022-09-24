import CloseIcon from "@mui/icons-material/Close";
import { IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useWholesalerRequestMutation } from "../app/services/requestApi";
import { useGetShopsByEmailQuery } from "../app/services/shopsApi";
import LoadingBtn from "./controls/LoadingBtn";

const WholesalerConnectForm = ({ setOpen, row }) => {
  const [subscription, setSubscription] = useState("basic");

  const handleChange = (event, newAlignment) => {
    setSubscription(newAlignment);
  };

  // redux element
  const { userInfo } = useSelector((state) => state.auth);
  const { data: shopsData } = useGetShopsByEmailQuery(userInfo?.users?.email);

  const [
    wholesalerRequest,
    { isLoading, isError, error, data },
  ] = useWholesalerRequestMutation();

  // React hook form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //  sent request
  const onSubmit = async (data) => {
    const request = {
      approved: true,
      user: row?.original?._id,
      shopId: data.shop,
      subscription,
    };

    await wholesalerRequest(request);
  };

  useEffect(() => {
    if (data) {
      toast.success("Retailer is connected!");
      setOpen(false);
    }
    if (isError) {
      toast.error(error?.data?.error);
    }
  }, [isError, error, data, setOpen]);
  return (
    <section className="connect">
      <div className="connect__form">
        <h2 className="form__title">Select retailers plan</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Shop */}
          <span className="form__group">
            <label className="form__label">
              Shop <span className="form__required">*</span>
            </label>
            <select className="form__select" {...register("shop")}>
              <option className="form__option" value="">
                Select a Shop
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

          <ToggleButtonGroup
            value={subscription}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            fullWidth
            size="large"
          >
            <ToggleButton value="basic">Basic</ToggleButton>
            <ToggleButton value="standard">Standard</ToggleButton>
            <ToggleButton value="premium">Premium</ToggleButton>
          </ToggleButtonGroup>

          <LoadingBtn
            loading={isLoading}
            variant="contained"
            text="Connect Retailer"
            size="large"
            type="submit"
            color="primary"
            style={{ width: "100%", marginTop: "1.5rem" }}
          />
        </form>
        {/* Modal Close Button */}
        <div className="connect__close">
          <IconButton aria-label="close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </section>
  );
};

export default WholesalerConnectForm;
