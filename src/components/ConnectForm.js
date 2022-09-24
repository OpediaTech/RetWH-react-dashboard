import CloseIcon from "@mui/icons-material/Close";
import { IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAddRequestMutation } from "../app/services/requestApi";
import LoadingBtn from "./controls/LoadingBtn";

const ConnectForm = ({ setOpen, shopId }) => {
  const [subscription, setSubscription] = useState("basic");

  const handleChange = (event, newAlignment) => {
    setSubscription(newAlignment);
  };

  // redux element
  const [
    addRequest,
    { isLoading, isError, error, data },
  ] = useAddRequestMutation();

  //  sent request
  const handleRequest = async () => {
    await addRequest({ shopId, subscription });
  };

  useEffect(() => {
    if (data) {
      toast.success("Request is send!");
      setOpen(false);
    }
    if (isError) {
      toast.error(error?.data?.error);
    }
  }, [isError, error, data, setOpen]);
  return (
    <section className="connect">
      <div className="connect__form">
        <h2 className="form__title">Select your plan</h2>

        <ToggleButtonGroup
          //   color="secondary"
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
          text="Sent Request"
          size="large"
          onClick={handleRequest}
          color="primary"
          style={{ width: "100%", marginTop: "1.5rem" }}
        />

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

export default ConnectForm;
