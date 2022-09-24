import DateRangeIcon from "@mui/icons-material/DateRange";
import "flatpickr/dist/themes/material_blue.css";
import React from "react";
import Flatpickr from "react-flatpickr";

const CustomInput = ({ value, defaultValue, inputRef, ...props }) => {
  return (
    <div className="customInput">
      <input
        defaultValue={defaultValue}
        // value={value}
        ref={inputRef}
        placeholder="Select Date"
        {...props}
      />

      <DateRangeIcon />
    </div>
  );
};

const DateFilters = ({ setFilterDate }) => {
  return (
    <Flatpickr
      options={{
        mode: "range",
        dateFormat: "Y-m-d",
        maxDate: "today",
      }}
      onChange={(date) => {
        setFilterDate({ startDate: date[0], endDate: date[1] });
      }}
      render={({ defaultValue, value, ...props }, ref) => {
        return (
          <CustomInput
            defaultValue={defaultValue}
            value={value}
            inputRef={ref}
          />
        );
      }}
    />
  );
};

export default DateFilters;
