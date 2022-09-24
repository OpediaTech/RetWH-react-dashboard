import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
// import MenuItem from "@mui/material/MenuItem";
import * as React from "react";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const TableFilters = () => {
  const [currency, setCurrency] = React.useState("EUR");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div className="table__filters">
      <TextField
        label="Search"
        size="small"
        id="outlined-start-adornment"
        sx={{ width: "25ch", flexGrow: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* <TextField
        id="filled-select-currency"
        select
        value={currency}
        size="small"
        onChange={handleChange}
        sx={{ width: "20ch" }}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            Sort By
          </MenuItem>
        ))}
      </TextField> */}
    </div>
  );
};

export default TableFilters;
