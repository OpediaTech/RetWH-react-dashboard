import React from "react";
import CustomButton from "./controls/CustomButton";

const PosBillings = () => {
  return (
    <div className="posBillings">
      <CustomButton
        className="saveBills__btn"
        defaultColor="info"
        text="Save Bills"
        size="large"
      />

      <div className="posBillings__container">
        <CustomButton
          className="large__btn"
          text="Chack Recived"
          size="large"
          color="primary"
        />

        <CustomButton
          className="large__btn"
          text="Bill History (last 24 hours)"
          size="large"
          defaultColor="warning"
        />

        <form>
          <div className="btn__group">
            <CustomButton
              className="payment__btn"
              text="Cash"
              color="primary"
            />
            <CustomButton
              className="payment__btn"
              text="Card"
              defaultColor="warning"
            />
            <CustomButton
              className="payment__btn"
              text="Chack"
              defaultColor="primary"
            />
          </div>

          <span className="form__group">
            <input
              className="form__control"
              type="text"
              placeholder="Total bill"
            />
          </span>

          <span className="form__group">
            <input
              className="form__control"
              type="text"
              placeholder="Recive money"
            />
          </span>

          <span className="form__group">
            <input
              className="form__control"
              type="text"
              placeholder="Return money"
            />
          </span>

          <CustomButton
            className="large__btn"
            defaultColor="primary"
            text="Bill Print"
          />
        </form>
      </div>
    </div>
  );
};

export default PosBillings;
