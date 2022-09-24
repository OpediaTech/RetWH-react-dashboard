// import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUpdateStatusMutation } from "../../app/services/reportsApi";
import LoadingBtn from "../../components/controls/LoadingBtn";

const UpdateOrderStatus = ({ setOpen, row, paymentStatus, shippingStatus }) => {
  // redux element
  const [
    updateStatus,
    { isLoading, isError, error, data, reset },
  ] = useUpdateStatusMutation();

  // React hook form
  const { handleSubmit, register } = useForm();

  //  sent request
  const onSubmit = async (data) => {
    const updateData = {
      paid_amount: data?.paid_amount,
      shipping_status: data?.shipping_status,
      shipping_address: data?.shipping_address,
      payment_status: data?.payment_status,
      payment_method: row?.original?.payment_method,
      sid: row?.original?._id,
    };

    await updateStatus(updateData);
  };

  // console.log(row?.original);

  useEffect(() => {
    if (data) {
      toast.success("Order is updated!");
      setOpen(false);
      reset();
    }
    if (isError) {
      toast.error(error?.data?.error);
      reset();
    }
  }, [isError, error, data, reset, setOpen]);

  return (
    <section className="connect">
      <div className="connect__form">
        <h2 className="form__title">Order status update</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Paid Amount*/}
          <span className="form__group">
            <label className="form__label">
              Paid Amount<span className="form__required">*</span>
            </label>
            <input
              className="form__control"
              type="number"
              placeholder="Enter amount"
              defaultValue={row.original?.paid_amount}
              {...register("paid_amount")}
            />
          </span>

          {/* Payment method
          <span className="form__group">
            <label className="form__label">
              Payment Method<span className="form__required">*</span>
            </label>
            <input
              className="form__control"
              type="text"
              // placeholder="Enter amount"
              defaultValue={row.original?.payment_method}
              {...register("payment_method")}
            />
          </span> */}

          <div className="form__grid">
            {/* Payment status */}
            <span className="form__group">
              <label className="form__label">Payment Status</label>
              <select className="form__select" {...register("payment_status")}>
                <option
                  className="form__option"
                  value={row?.original?.payment_status}
                >
                  {row?.original?.payment_status}
                </option>

                {paymentStatus?.map((status, index) => (
                  <option
                    className="form__option"
                    value={status?.text?.toLowerCase()}
                    key={index + 1}
                  >
                    {status?.text?.toLowerCase()}
                  </option>
                ))}
              </select>
            </span>

            {/* Shipping Status */}
            <span className="form__group">
              <label className="form__label">Shipping Status</label>
              <select className="form__select" {...register("shipping_status")}>
                <option
                  className="form__option"
                  value={row?.original?.shipping_status}
                >
                  {row?.original?.shipping_status}
                </option>

                {shippingStatus?.map((status, index) => (
                  <option
                    className="form__option"
                    value={status?.toLowerCase()}
                    key={index + 3}
                  >
                    {status?.toLowerCase()}
                  </option>
                ))}
              </select>
            </span>
          </div>

          {/* Shipping Address*/}
          <span className="form__group">
            <label className="form__label">
              Shipping Address<span className="form__required">*</span>
            </label>
            <input
              className="form__control"
              type="text"
              // placeholder="Enter amount"
              defaultValue={row.original?.shipping_address}
              {...register("shipping_address")}
            />
          </span>

          <LoadingBtn
            loading={isLoading}
            variant="contained"
            text="Update"
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

export default UpdateOrderStatus;
