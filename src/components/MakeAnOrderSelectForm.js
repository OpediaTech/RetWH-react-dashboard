import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetShopsByEmailQuery } from "../app/services/shopsApi";
import { useGetUserByRoleQuery } from "../app/services/usersApi";
import { makeAnOrderSelectSchema } from "../helpers/validation/ConnectReletedSchema";
import LoadingBtn from "./controls/LoadingBtn";

const MakeAnOrderSelectForm = ({ setOpen, shopId }) => {
  // redux element
  const { userInfo } = useSelector((state) => state.auth);
  const { data: shopsData } = useGetShopsByEmailQuery(userInfo?.users?.email);

  const sort = 1;
  const pageIndex = 0;

  const pathname = `user/all?sort=${sort}&page=${pageIndex}&role=retailer`;

  const { data: usersData } = useGetUserByRoleQuery(pathname);

  const navigate = useNavigate();

  // React hook form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(makeAnOrderSelectSchema),
  });

  //  sent request
  const onSubmit = async (data) => {
    if (data) {
      navigate(`/make-an-order/${data.retailer}/${data.shop}`);
    }
  };

  return (
    <section className="connect">
      <div className="connect__form">
        <h2 className="form__title">Select Form</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Shop */}
          <span className="form__group">
            <label className="form__label">
              Select Your Shop <span className="form__required">*</span>
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

          {/* Retailer */}
          <span className="form__group">
            <label className="form__label">
              Select Retailer <span className="form__required">*</span>
            </label>
            <select className="form__select" {...register("retailer")}>
              <option className="form__option" value="">
                Select Retailer
              </option>

              {usersData?.users?.map((user) => (
                <option
                  className="form__option"
                  value={user?._id}
                  key={user?._id}
                >
                  {user?.name}
                </option>
              ))}
            </select>
            {errors?.retailer && (
              <span className="form__error">{errors?.retailer.message}</span>
            )}
          </span>

          <LoadingBtn
            loading={false}
            variant="contained"
            text="Continue"
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

export default MakeAnOrderSelectForm;
